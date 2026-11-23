import pytest

from app.services import email_finder as ef


def _cf_encode(email: str, key: int = 0x5A) -> str:
    return f"{key:02x}" + "".join(f"{ord(c) ^ key:02x}" for c in email)


def test_decodes_cloudflare_protected_address():
    assert ef.decode_cloudflare_email(_cf_encode("jane@acme.com")) == "jane@acme.com"
    assert ef.decode_cloudflare_email("zz") is None


def test_extracts_every_published_form_of_an_address():
    html = f"""
    <a href="mailto:Jane@Acme.com?subject=Hi">Email Jane</a>
    <a href="/cdn-cgi/l/email-protection#{_cf_encode('board@acme.com')}">[email&#160;protected]</a>
    <span data-cfemail="{_cf_encode('gm@acme.com')}"></span>
    <p>Reach maintenance [at] acme [dot] com for repairs.</p>
    <script type="application/ld+json">{{"@type":"Organization","email":"office@acme.com"}}</script>
    <img src="logo@2x.png"> <p>someone@example.com</p> <p>hero@sentry.io</p>
    """
    emails = ef.extract_emails(html)
    assert {"jane@acme.com", "board@acme.com", "gm@acme.com",
            "maintenance@acme.com", "office@acme.com"} <= set(emails)
    assert not any("example.com" in e or "sentry.io" in e or ".png" in e for e in emails)


def test_extracts_decision_makers_and_ignores_place_names():
    html = """
    <div class="card"><h4>Maria Lopez</h4><span>Property Manager</span></div>
    <li>David Kim, Chief Engineer</li>
    <p>Our Property Manager serves Santa Monica and Beverly Hills.</p>
    """
    contacts = ef.extract_contacts(html)
    names = [c["name"] for c in contacts]
    assert "Maria Lopez" in names and "David Kim" in names
    assert "Santa Monica" not in names and "Beverly Hills" not in names
    assert next(c for c in contacts if c["name"] == "Maria Lopez")["title"] == "Property Manager"


@pytest.mark.parametrize("email", ["maria@acme.com", "mlopez@acme.com", "maria.lopez@acme.com"])
def test_matches_a_mailbox_to_a_named_person(email):
    contacts = [{"name": "Maria Lopez", "title": "Property Manager", "score": 90}]
    assert ef.match_name_to_email(email, contacts)["name"] == "Maria Lopez"
    assert ef.match_name_to_email("info@acme.com", contacts) is None


@pytest.mark.parametrize("host", ["127.0.0.1", "localhost", "10.0.0.5", "169.254.169.254",
                                  "192.168.1.1", "", None])
def test_internal_hosts_are_never_fetched(host):
    assert ef.is_public_host(host) is False


def _patch_site(monkeypatch, pages: dict, mx=True):
    async def fake_fetch(client, url):
        path = url.replace("https://acme.com", "").rstrip("/") or "/"
        return pages.get(path)

    async def fake_mx(domain):
        return mx

    monkeypatch.setattr(ef, "_fetch", fake_fetch)
    monkeypatch.setattr(ef, "domain_accepts_mail", fake_mx)


async def test_named_decision_maker_beats_a_shared_inbox(monkeypatch):
    _patch_site(monkeypatch, {
        "/": '<a href="mailto:info@acme.com">info</a><a href="/team">Our Team</a>',
        "/team": '<div>Maria Lopez Property Manager <a href="mailto:maria@acme.com">email</a></div>',
    })
    result = await ef.find_emails_for_business("https://acme.com", "Acme")
    assert result["best"]["email"] == "maria@acme.com"
    assert result["best"]["grade"] == "named"
    assert result["top_contact_name"] == "Maria Lopez"
    assert result["top_contact_title"] == "Property Manager"
    assert result["domain"] == "acme.com" and result["mx_valid"] is True


async def test_guesses_are_offered_but_never_selected(monkeypatch):
    _patch_site(monkeypatch, {"/": "<p>No contact details here.</p>"})
    result = await ef.find_emails_for_business("https://acme.com", "Acme")
    assert result["best"] is None
    assert result["emails"] and all(e["grade"] == "guessed" for e in result["emails"])
    assert all(e["source"] == "pattern guess" for e in result["emails"])


async def test_domain_without_mail_yields_nothing_to_send_to(monkeypatch):
    _patch_site(monkeypatch, {"/": '<a href="mailto:info@acme.com">x</a>'}, mx=False)
    result = await ef.find_emails_for_business("https://acme.com", "Acme")
    assert result["best"] is None and result["emails"] == []


async def test_an_address_on_another_domain_is_shown_but_never_chosen(monkeypatch):
    # Could be the management company; could be the web designer. A person decides.
    _patch_site(monkeypatch, {"/": '<a href="mailto:hello@webstudio.io">Site by Web Studio</a>'})
    result = await ef.find_emails_for_business("https://acme.com", "Acme")
    grades = {e["email"]: e["grade"] for e in result["emails"]}
    assert grades["hello@webstudio.io"] == "other_domain"
    assert result["best"] is None
    assert all(g in ("other_domain", "guessed") for g in grades.values())


def test_ordinary_sentences_are_not_read_as_addresses():
    html = "<p>Visit us at www.acme.com. Find us at acme.com or call us at 555.</p>"
    assert ef.extract_emails(html) == []


def test_script_escapes_are_not_read_as_addresses():
    html = '<script>var x = "\\u003einfo@acme.com";</script><p>Hello</p>'
    assert ef.extract_emails(html) == []


def test_hostile_page_is_parsed_in_linear_time():
    import time
    start = time.time()
    for payload in ("a" * 300_000, ("a" * 60 + " ") * 5000, "ab [at] " * 30_000):
        ef.extract_emails(payload)
    assert time.time() - start < 5, "email extraction must not blow up on long runs"


@pytest.mark.parametrize("address,public", [
    ("8.8.8.8", True), ("2606:4700::1111", True),
    ("100.64.0.1", False),            # carrier-grade NAT
    ("64:ff9b::7f00:1", False),       # NAT64 wrapping 127.0.0.1
    ("::ffff:10.0.0.1", False),       # IPv4-mapped private
    ("169.254.169.254", False),       # cloud metadata
    ("not-an-ip", False),
])
def test_only_globally_routable_addresses_are_public(address, public):
    assert ef._is_public_address(address) is public


async def test_a_host_that_resolves_internally_is_never_requested(monkeypatch):
    requested = []

    class Client:
        def stream(self, *args, **kwargs):
            requested.append(args)
            raise AssertionError("must not connect")

    monkeypatch.setattr(ef, "resolve_public_ip", lambda host: None)
    assert await ef._fetch(Client(), "https://internal.example/") is None
    assert requested == []


async def test_no_website_returns_an_empty_result():
    result = await ef.find_emails_for_business(None)
    assert result["emails"] == [] and result["best"] is None and result["pages_scraped"] == 0
