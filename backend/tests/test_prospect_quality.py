import pytest

from app.models.prospect import BusinessCategory
from app.services import prospect_quality as pq


@pytest.mark.parametrize("email,domain,source,expected", [
    ("maria.lopez@acme.com", "acme.com", "homepage", "named"),
    ("facilities@acme.com", "acme.com", "homepage", "buyer_role"),
    ("maintenance.la@acme.com", "acme.com", "homepage", "buyer_role"),
    ("info@acme.com", "acme.com", "homepage", "role"),
    ("acmehoa@gmail.com", "acme.com", "homepage", "free_mail"),
    ("info@acme.com", "acme.com", "pattern guess", "guessed"),
    ("noreply@acme.com", "acme.com", "homepage", "invalid"),
    ("careers@acme.com", "acme.com", "homepage", "invalid"),
    ("designer@webstudio.com", "acme.com", "homepage", "other_domain"),
    ("not-an-email", "acme.com", "homepage", "invalid"),
    ("a..b@acme.com", "acme.com", "homepage", "invalid"),
    (None, "acme.com", "homepage", "invalid"),
])
def test_grade_email(email, domain, source, expected):
    assert pq.grade_email(email, domain, source) == expected


def test_surname_starting_with_a_short_role_is_a_person():
    # "gmartinez" must not be read as the "gm" role inbox.
    assert pq.grade_email("gmartinez@acme.com", "acme.com") == "named"
    assert pq.grade_email("opsahl@acme.com", "acme.com") == "named"


def test_subdomain_mailbox_counts_as_the_business():
    assert pq.grade_email("jane@mail.acme.com", "acme.com") == "named"


def test_best_email_prefers_a_named_person_and_never_a_guess():
    candidates = [
        {"email": "info@acme.com", "source": "homepage", "confidence": 99},
        {"email": "jane@acme.com", "source": "homepage", "confidence": 50},
    ]
    assert pq.best_email(candidates, "acme.com")["email"] == "jane@acme.com"
    guesses = [{"email": "info@acme.com", "source": "pattern guess", "confidence": 10}]
    assert pq.best_email(guesses, "acme.com") is None


@pytest.mark.parametrize("raw,expected", [
    ("(310) 555-0142", "+13105550142"),
    ("1-310-555-0142", "+13105550142"),
    ("555-0142", None),
    ("(011) 555-0142", None),
    (None, None),
])
def test_normalize_phone(raw, expected):
    assert pq.normalize_phone(raw) == expected


@pytest.mark.parametrize("raw,expected", [
    ("Sunset Villas HOA, Inc.", "Sunset Villas HOA"),
    ("Acme Property Management LLC", "Acme Property Management"),
    ("The Grand Hotel - Downtown Los Angeles", "The Grand Hotel"),
    ("Plain Name", "Plain Name"),
])
def test_clean_business_name(raw, expected):
    assert pq.clean_business_name(raw) == expected


@pytest.mark.parametrize("raw,expected", [
    ("Maria Lopez", "Maria"), ("maria", "Maria"), ("Hiring Manager", None),
    ("Office", None), ("", None), (None, None), ("J", None), ("O'Neil Smith", "O'Neil"),
])
def test_first_name(raw, expected):
    assert pq.first_name(raw) == expected


def test_normalize_domain():
    assert pq.normalize_domain("https://www.Acme.com/contact") == "acme.com"
    assert pq.normalize_domain("acme.com") == "acme.com"
    assert pq.normalize_domain(None) is None


def test_score_rewards_reachability_and_fit():
    bare, _ = pq.score_prospect(BusinessCategory.retail)
    rich, reasons = pq.score_prospect(
        BusinessCategory.hoa, website="https://x.com", phone="(310) 555-0142",
        total_ratings=250, email_grade="named", has_contact_name=True)
    assert rich > bare
    assert rich <= 100
    assert "Named contact email" in reasons


def test_closed_business_scores_zero():
    score, reasons = pq.score_prospect(
        BusinessCategory.hotel, website="https://x.com", business_status="CLOSED_PERMANENTLY")
    assert score == 0
    assert reasons == ["Not operational on Google Maps"]
