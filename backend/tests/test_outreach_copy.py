"""
Guards on the outreach copy itself. These exist because an email that makes an
unverifiable claim, runs long, or looks like bulk mail costs replies and
sender reputation, and nobody rereads 72 emails by hand after an edit.
"""
import re

import pytest

from app.models.prospect import BusinessCategory
from app.services import outreach_composer as oc
from app.services.outreach_playbooks import PERSONAS, PLAYBOOKS, get_playbook, persona_for_title

# Claims that are unverified for this business, or that no cold email can
# honestly make about a property it has never seen.
BANNED = [
    r"nadca", r"certif", r"\d+\s?%", r"guarantee", r"#1", r"\bbest\b", r"award",
    r"years? (of|in) (experience|business)", r"since (19|20)\d\d", r"5[- ]star",
    r"save (you )?(money|energy)", r"energy (cost|bill|saving)", r"risk[- ]free",
    r"limited time", r"act now", r"urgent", r"\bre:", r"\bfwd?:", r"hiring manager",
    r"i noticed", r"i saw (that )?your", r"hood", r"kitchen exhaust",
]

ALL_CATEGORIES = list(BusinessCategory)


def _prospect(category: BusinessCategory, **overrides) -> dict:
    base = {"id": f"id-{category.value}", "business_name": "Acme Plaza, LLC",
            "business_category": category.value, "contact_name": "Maria Lopez",
            "public_token": "tok_abcdefghijklmnop"}
    return {**base, **overrides}


@pytest.mark.parametrize("category", ALL_CATEGORIES)
def test_every_category_has_a_playbook(category):
    playbook = get_playbook(category)
    assert playbook.subjects and playbook.no_asks
    if category is not BusinessCategory.other:
        assert category in PLAYBOOKS, f"{category.value} falls back to the generic playbook"


@pytest.mark.parametrize("category", ALL_CATEGORIES)
@pytest.mark.parametrize("step", range(oc.TOTAL_STEPS))
def test_email_is_short_honest_and_well_formed(category, step):
    email = oc.compose_step(_prospect(category), step)
    text = f"{email['subject']}\n{email['body']}"
    lowered = text.lower()

    for pattern in BANNED:
        assert not re.search(pattern, lowered), f"banned phrase /{pattern}/ in {email['template_id']}"

    assert "{" not in text and "}" not in text, "unfilled placeholder"
    assert text.isascii(), "non-ASCII characters (emoji, smart quotes) hurt deliverability"
    assert len(email["body"].split()) <= 150, "cold emails over 150 words stop getting read"
    assert 3 <= len(email["subject"]) <= 60
    assert not email["subject"].isupper()
    assert len(re.findall(r"https?://", email["body"])) == 1, "exactly one link"
    assert "/free-inspection/?t=tok_abcdefghijklmnop" in email["body"]
    assert "(213) 792-4145" in email["body"]
    assert email["body"].startswith("Hi Maria,")
    assert "Acme Plaza" in text and "LLC" not in text


@pytest.mark.parametrize("category", ALL_CATEGORIES)
def test_each_touch_does_a_different_job(category):
    sequence = oc.compose_sequence(_prospect(category))
    playbook = get_playbook(category)
    assert [e["step"] for e in sequence] == [0, 1, 2, 3]
    assert len({e["subject"] for e in sequence}) == 4
    assert playbook.pain_label in sequence[0]["body"]          # label
    assert "free inspection" in sequence[0]["body"]            # the offer
    assert playbook.calibrated in sequence[1]["body"]          # calibrated question
    assert playbook.inspection in sequence[2]["body"]          # what they get
    assert playbook.breakup in sequence[3]["body"]             # break-up
    assert "not write again" in sequence[3]["body"]
    # The first and third touch both end on an ask; it must not be the same one.
    asks = [next(a for a in playbook.no_asks if a in sequence[i]["body"]) for i in (0, 2)]
    if len(playbook.no_asks) > 1:
        assert asks[0] != asks[1]


def test_composition_is_stable_so_preview_matches_send():
    prospect = _prospect(BusinessCategory.hotel)
    assert oc.compose_step(prospect, 0) == oc.compose_step(prospect, 0)


def test_subject_variants_are_spread_across_prospects():
    variants = {oc.compose_step(_prospect(BusinessCategory.hoa, id=f"p{i}"), 0)["variant"]
                for i in range(40)}
    assert variants == {0, 1, 2}


def test_no_name_gets_a_neutral_greeting():
    for name in (None, "", "Hiring Manager", "Office"):
        body = oc.compose_step(_prospect(BusinessCategory.gym, contact_name=name), 0)["body"]
        assert body.startswith("Hello,")


def test_a_personal_note_replaces_the_stock_opener():
    note = "Congratulations on opening the second building on Wilshire."
    body = oc.compose_step(_prospect(BusinessCategory.property_manager, personal_note=note), 0)["body"]
    assert note in body
    assert get_playbook(BusinessCategory.property_manager).audit not in body


@pytest.mark.parametrize("title,expected", [
    ("HOA Board President", "board"),
    ("Director of Facilities", "facilities"),
    ("Chief Engineer", "facilities"),
    ("Community Association Manager", "property"),
    ("Regional Manager", "property"),
    ("Office Manager", "office"),
    ("Owner", "owner"),
    ("General Manager", "executive"),
    ("Executive Director", "executive"),
    ("", None), (None, None), ("Barista", None),
])
def test_job_title_maps_to_the_right_persona(title, expected):
    persona = persona_for_title(title)
    assert (persona.key if persona else None) == expected


def test_persona_changes_the_third_touch():
    board = oc.compose_step(_prospect(BusinessCategory.hoa, contact_title="Board President"), 2)
    manager = oc.compose_step(_prospect(BusinessCategory.hoa, contact_title="Community Manager"), 2)
    unknown = oc.compose_step(_prospect(BusinessCategory.hoa), 2)
    assert PERSONAS["board"].line in board["body"]
    assert PERSONAS["property"].line in manager["body"]
    assert board["persona"] == "board" and unknown["persona"] is None
    assert not any(p.line in unknown["body"] for p in PERSONAS.values())


def test_unknown_category_falls_back_instead_of_crashing():
    email = oc.compose_step({"id": "x", "business_name": "Acme", "business_category": "spaceport"}, 0)
    assert email["template_id"].startswith("general.")


def test_step_out_of_range_is_rejected():
    with pytest.raises(ValueError):
        oc.compose_step(_prospect(BusinessCategory.hoa), 4)


@pytest.mark.parametrize("address,city", [
    ("123 Main St, Santa Monica, CA 90401, USA", "Santa Monica"),
    ("123 Main St, Los Angeles, CA 90012", "Los Angeles"),
    ("Los Angeles", None), ("", None), (None, None),
])
def test_extract_city(address, city):
    assert oc.extract_city(address) == city


@pytest.mark.parametrize("category", ALL_CATEGORIES)
def test_call_script_follows_the_same_method(category):
    script = oc.call_script(_prospect(category, contact_title="Owner"))
    labels = [line["label"] for line in script["lines"]]
    assert any("accusation audit" in label.lower() for label in labels)
    assert "Calibrated question" in labels and "No-oriented ask" in labels
    assert script["persona"] == "Owner / principal"
    spoken = " ".join(line["say"] for line in script["lines"]).lower()
    for pattern in BANNED:
        assert not re.search(pattern, spoken), f"banned phrase /{pattern}/ in call script"
