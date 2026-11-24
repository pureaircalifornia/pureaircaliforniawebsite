"""
Outreach composer: turns a prospect and a playbook into the four emails of a
sequence, plus a phone script.

Emails are short plain text on purpose. Short, personal-looking mail with one
link and no images is what reaches the primary inbox and gets answered; the
compliance footer (postal address + unsubscribe) is added by the sender so it
cannot be edited out.
"""
import hashlib
import re
from typing import Dict, List, Optional
from urllib.parse import quote

from ..config import get_settings
from ..models.prospect import BusinessCategory
from .outreach_playbooks import Playbook, get_playbook, persona_for_title
from .prospect_quality import clean_business_name, first_name

# Days to wait after the previous touch. Touch 1 goes on day 0, then day 3,
# day 7 and day 14.
STEP_GAP_DAYS = (0, 3, 4, 7)
TOTAL_STEPS = len(STEP_GAP_DAYS)
STEP_NAMES = ("Opener", "Reason", "What you get", "Break-up")

BOOKING_PATH = "/free-inspection/"


def extract_city(address: Optional[str]) -> Optional[str]:
    """'123 Main St, Santa Monica, CA 90401, USA' -> 'Santa Monica'."""
    if not address:
        return None
    parts = [part.strip() for part in address.split(",") if part.strip()]
    if parts and parts[-1].upper() in ("USA", "US", "UNITED STATES"):
        parts = parts[:-1]
    # ... , City, "CA 90401"
    if len(parts) >= 2 and re.match(r"^[A-Z]{2}(\s+\d{5}(-\d{4})?)?$", parts[-1]):
        city = parts[-2]
        if not re.search(r"\d", city):
            return city
    return None


def pick_variant(prospect_id: str, step: int, count: int) -> int:
    """Stable choice so a preview, the send, and the stats all agree."""
    if count <= 1:
        return 0
    digest = hashlib.sha256(f"{prospect_id}:{step}".encode("utf-8")).hexdigest()
    return int(digest, 16) % count


def booking_url(public_token: Optional[str]) -> str:
    base = get_settings().PUBLIC_SITE_URL.rstrip("/") + BOOKING_PATH
    return f"{base}?t={quote(public_token)}" if public_token else base


def _signature() -> str:
    settings = get_settings()
    return f"{settings.OUTREACH_SENDER_FIRST_NAME}\nPure Air California"


def _greeting(prospect: dict) -> str:
    name = first_name(prospect.get("contact_name"))
    return f"Hi {name}," if name else "Hello,"


def _booking_line(prospect: dict) -> str:
    phone = get_settings().OUTREACH_PHONE
    return (f"Pick a time here: {booking_url(prospect.get('public_token'))}\n"
            f"Or call me directly: {phone}")


def _subject(playbook: Playbook, prospect: dict, step: int, variant: int, business: str) -> str:
    if step == 0:
        template = playbook.subjects[variant % len(playbook.subjects)]
    elif step == 1:
        template = ("a question about {business}", "{business}: how is this handled?")[variant % 2]
    elif step == 2:
        template = ("what the free inspection covers", "{business}: what you'd get")[variant % 2]
    else:
        template = ("should I close your file?", "closing the loop on {business}")[variant % 2]
    return template.format(business=business)


def compose_step(prospect: dict, step: int) -> Dict:
    """
    Compose one touch of the sequence for a prospect.

    Returns {subject, body, step, step_name, variant, template_id, persona}.
    `body` is plain text with real newlines and no footer.
    """
    if not 0 <= step < TOTAL_STEPS:
        raise ValueError(f"step must be 0..{TOTAL_STEPS - 1}")

    try:
        category = BusinessCategory(prospect.get("business_category", "other"))
    except ValueError:
        category = BusinessCategory.other
    playbook = get_playbook(category)
    persona = persona_for_title(prospect.get("contact_title"))
    business = clean_business_name(prospect.get("business_name", "")) or "your property"
    prospect_id = str(prospect.get("id") or prospect.get("business_name") or "")

    variant = pick_variant(prospect_id, step, 2 if step else len(playbook.subjects))
    # Touch 1 and touch 3 both close on a no-oriented question; use a different
    # one each time so the third email does not repeat the first.
    first_ask = pick_variant(prospect_id, 10, len(playbook.no_asks))
    ask = playbook.no_asks[(first_ask + (1 if step == 2 else 0)) % len(playbook.no_asks)]
    greeting = _greeting(prospect)
    me = get_settings().OUTREACH_SENDER_FIRST_NAME
    # Not "if the answer is no": the question above is built so that "no" means yes.
    decline = "If it's not for you, just say so and I won't write again."

    if step == 0:
        note = (prospect.get("personal_note") or "").strip()
        opener = note if note else playbook.audit
        paragraphs = [
            greeting,
            f"{opener} I'm {me}, I own Pure Air California, a duct and dryer vent "
            f"cleaning company here in Los Angeles.",
            playbook.pain_label,
            f"I'd like to offer {business} a free inspection of {playbook.systems}. We look, "
            f"take photos, and tell you plainly what we find. If nothing needs doing, I'll say so.",
            ask,
        ]
    elif step == 1:
        paragraphs = [
            greeting,
            f"One more note on {business}, and then I'll leave it with you.",
            playbook.why,
            playbook.calibrated,
            "If it's already handled, that's a good answer too. I'd just like to know.",
        ]
    elif step == 2:
        paragraphs = [
            greeting,
            f"In case it helps you decide, here is exactly what the free inspection at "
            f"{business} would be.",
            playbook.inspection,
        ]
        if persona:
            paragraphs.append(persona.line)
        paragraphs.append(ask)
    else:
        paragraphs = [
            greeting,
            playbook.breakup,
            "It may simply not be the right time, and that is completely fine. I don't want "
            "to keep landing in your inbox if this isn't useful.",
            f"If you'd still like the free inspection, a one-line reply is all it takes. "
            f"Otherwise I'll close the file on {business} and not write again.",
        ]

    if step == 0:
        paragraphs.append(decline)
    body = "\n\n".join(paragraphs)
    body += f"\n\n{_signature()}\n\n{_booking_line(prospect)}"

    return {
        "subject": _subject(playbook, prospect, step, variant, business),
        "body": body,
        "step": step,
        "step_name": STEP_NAMES[step],
        "variant": variant,
        "template_id": f"{playbook.key}.s{step}.v{variant}",
        "persona": persona.key if persona else None,
    }


def compose_sequence(prospect: dict) -> List[Dict]:
    """All four touches, for previewing the whole sequence."""
    return [compose_step(prospect, step) for step in range(TOTAL_STEPS)]


def call_script(prospect: dict) -> Dict:
    """A phone script for calling the prospect, in the same voice as the emails."""
    try:
        category = BusinessCategory(prospect.get("business_category", "other"))
    except ValueError:
        category = BusinessCategory.other
    playbook = get_playbook(category)
    persona = persona_for_title(prospect.get("contact_title"))
    business = clean_business_name(prospect.get("business_name", "")) or "your property"
    name = first_name(prospect.get("contact_name"))
    me = get_settings().OUTREACH_SENDER_FIRST_NAME
    phone = get_settings().OUTREACH_PHONE

    lines = [
        {"label": "If someone else answers",
         "say": f"Hi, I'm hoping you can help me. Who looks after the vents and ductwork "
                f"at {business}?",
         "why": "Asking for help, rather than for a person, gets you transferred instead of screened."},
        {"label": "Open (accusation audit)",
         "say": f"Hi{' ' + name if name else ''}, this is {me} with Pure Air California, a duct "
                f"and dryer vent company here in LA. I'm calling out of the blue, so I've "
                f"probably caught you in the middle of something.",
         "why": "Naming the interruption first takes the sting out of it. Then stop and let them answer."},
        {"label": "Label their situation",
         "say": playbook.pain_label,
         "why": "Describe their world, not your service. Wait for \"that's right.\""},
        {"label": "Calibrated question",
         "say": playbook.call_question,
         "why": "A \"how\" question hands them control and gets them talking. Don't fill the silence."},
        {"label": "Mirror",
         "say": "Repeat their last two or three words back as a question, then pause.",
         "why": "It keeps them explaining without you having to pitch."},
        {"label": "No-oriented ask",
         "say": playbook.no_asks[0],
         "why": "People feel safe saying \"no.\" \"No, that wouldn't be a bad idea\" is a yes."},
        {"label": "If they say not interested",
         "say": "It sounds like this isn't a priority right now. Would it be out of line "
                "to ask what would make it one?",
         "why": "Label the no instead of arguing with it. If it's still no, thank them and mark Not interested."},
        {"label": "Book it",
         "say": "What works better for you, a morning or an afternoon? I'll send a "
                "confirmation so you have it in writing.",
         "why": "Offer two easy options and confirm in writing the same day."},
        {"label": "Voicemail (under 20 seconds)",
         "say": f"Hi{' ' + name if name else ''}, {me} with Pure Air California. I'd like to offer "
                f"{business} a free inspection of {playbook.systems}, no obligation. "
                f"I'm at {phone}. Again, {phone}.",
         "why": "One reason, one number, said twice. Don't ask for a call back about \"a quick question.\""},
    ]
    return {
        "playbook": playbook.label,
        "buyer": playbook.buyer,
        "persona": persona.label if persona else None,
        "persona_line": persona.line if persona else None,
        "lines": lines,
    }
