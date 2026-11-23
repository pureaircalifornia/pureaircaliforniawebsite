"""
Outreach playbooks: what to say to each kind of business, and to each kind of
person inside it.

Copy rules, enforced by tests in tests/test_outreach_copy.py:

* Nothing here may claim a certification, a savings percentage, a review
  count, years in business, or any result for a specific property. Those claims
  are either unverified or untrue for a given prospect. The only promises made
  are ones Pure Air California controls: a free inspection, photos of what is
  found, a plain answer, a written price before any work, and insurance / W-9
  paperwork on request.
* Statements about the prospect's world are general and true of that property
  type (dryers in a hotel laundry run most of the day), never invented
  observations about the specific business.
* The voice follows Chris Voss's "Never Split the Difference":
    - accusation audit   name the objection before they think it
    - label              "It seems like...", describing their situation, not ours
    - no-oriented ask    a question that is safe to answer "no" to
    - calibrated ask     "How...?" / "What...?" that hands them control
    - breakup            "Have you given up on...?"
  and always leaves them a comfortable way to decline.
"""
from dataclasses import dataclass
from typing import Dict, Optional, Tuple

from ..models.prospect import BusinessCategory


@dataclass(frozen=True)
class Playbook:
    key: str
    label: str                    # shown in the admin UI
    buyer: str                    # who usually decides, for the person doing outreach
    place: str                    # how to refer to their property in a sentence
    systems: str                  # what we would inspect there
    audit: str                    # accusation audit (opens touch 1)
    pain_label: str               # Voss label (touch 1)
    why: str                      # a true, general reason it matters (touch 2)
    calibrated: str               # calibrated question (touch 2)
    inspection: str               # what the free inspection gives them (touch 3)
    no_asks: Tuple[str, ...]      # no-oriented closing questions
    breakup: str                  # "Have you given up on ..." (touch 4)
    subjects: Tuple[str, ...]     # touch-1 subject lines, rotated for A/B
    call_question: str            # calibrated question for a phone call


@dataclass(frozen=True)
class Persona:
    key: str
    label: str
    # One sentence about what the inspection means for this person's job.
    line: str


PERSONAS: Dict[str, Persona] = {
    "board": Persona(
        "board", "Board member",
        "For the board, it means a dated, photographed record of what condition the "
        "vents are in, to put in front of the association whichever way you decide.",
    ),
    "owner": Persona(
        "owner", "Owner / principal",
        "As the owner you'd get a straight answer and a written price before anything "
        "is done, and no pressure to go ahead.",
    ),
    "executive": Persona(
        "executive", "General manager / director",
        "I'd plan it around your operation so it doesn't cost you a busy hour, and you'd "
        "have the findings in writing to pass along.",
    ),
    "facilities": Persona(
        "facilities", "Facilities / maintenance",
        "I know this lands on your list with everything else. We plan the access with "
        "you and leave you photos of each area for your records.",
    ),
    "property": Persona(
        "property", "Property / community manager",
        "We can send our certificate of insurance and W-9 before we set foot on site, "
        "and we work out resident or tenant notice with you.",
    ),
    "office": Persona(
        "office", "Office / practice manager",
        "If someone else decides this, I'd be grateful if you pointed me to them.",
    ),
}

# Order matters: the first group with a matching keyword wins, so "HOA board
# president" is a board member before it is a president.
_PERSONA_KEYWORDS: Tuple[Tuple[str, Tuple[str, ...]], ...] = (
    ("board", ("board", "hoa president", "treasurer", "trustee", "association president")),
    ("facilities", ("facilit", "maintenance", "engineer", "operations", "plant", "custodial")),
    ("property", ("property manager", "community manager", "community association",
                  "portfolio", "asset manager", "regional manager", "leasing",
                  "resident manager", "building manager")),
    ("office", ("office manager", "practice manager", "administrative", "assistant",
                "coordinator", "receptionist", "front desk", "secretary")),
    ("owner", ("owner", "founder", "principal", "partner", "ceo", "president", "proprietor")),
    ("executive", ("general manager", "executive director", "administrator", "director",
                   "gm", "pastor", "head of school", "manager")),
)


def persona_for_title(title: Optional[str]) -> Optional[Persona]:
    """Map a free-text job title to a persona, or None when it is unknown."""
    if not title:
        return None
    lowered = title.lower()
    for key, keywords in _PERSONA_KEYWORDS:
        if any(keyword in lowered for keyword in keywords):
            return PERSONAS[key]
    return None


_GENERIC_NO_ASKS = (
    "Would it be a bad idea to have us take a look?",
    "Are you against me stopping by for a look one morning next week?",
)

PLAYBOOKS: Dict[BusinessCategory, Playbook] = {
    BusinessCategory.hoa: Playbook(
        key="hoa",
        label="HOAs & condo associations",
        buyer="Board president or the community association manager",
        place="the community",
        systems="dryer vents and any common-area ductwork",
        audit="You probably hear from more vendors than you have board meetings, and this is one more.",
        pain_label=("It seems like dryer vents are one of those things that sit between the "
                    "owners and the association until something goes wrong."),
        why=("In attached homes the dryer vents often run a long way through shared walls "
             "or up to the roof, and lint collects where nobody can see it. The U.S. Fire "
             "Administration lists failure to clean as the leading cause of home dryer fires."),
        calibrated="How does the association decide when the vents were last looked at?",
        inspection=("We check a sample of vents and the common-area ductwork, photograph what "
                    "we find, and write it up so it can go straight into a board packet."),
        no_asks=(
            "Would it be a bad idea to have us inspect a few units at no charge before your next meeting?",
            "Are you against a free look at the vents so the board has something to go on?",
        ),
        breakup="Have you given up on getting the dryer vents looked at this year?",
        subjects=("dryer vents at {business}", "{business}: whose job are the vents?",
                  "free vent inspection for the board"),
        call_question="How does the association handle the dryer vents today?",
    ),
    BusinessCategory.property_manager: Playbook(
        key="property_manager",
        label="Property management companies",
        buyer="Property manager, regional manager or maintenance supervisor",
        place="your buildings",
        systems="dryer vents and common-area ductwork",
        audit="You probably get pitched by a new vendor every day, so I'll keep this to a few lines.",
        pain_label=("It sounds like the vents only come up when a resident complains that the "
                    "dryer takes three cycles, and by then it's a work order with a deadline."),
        why=("Slow drying is usually lint in the vent run rather than the machine. Across a "
             "building it turns into repeat service calls, and the U.S. Fire Administration "
             "lists failure to clean as the leading cause of home dryer fires."),
        calibrated="How do you currently decide which buildings get their vents cleaned, and when?",
        inspection=("We walk one building with your maintenance lead, photograph each area, and "
                    "send you a written scope and price you can forward to the owner as is."),
        no_asks=(
            "Would it be a bad idea to have us look at one building, free, so you can compare?",
            "Are you against a no-cost inspection of whichever property gets the most dryer complaints?",
        ),
        breakup="Have you given up on adding a vent and duct vendor this year?",
        subjects=("dryer vents across {business}", "{business}: one building, free inspection",
                  "the dryer complaints at your buildings"),
        call_question="How do you handle dryer vent complaints when they come in today?",
    ),
    BusinessCategory.building_management: Playbook(
        key="building_management",
        label="Building management",
        buyer="Building manager or chief engineer",
        place="the building",
        systems="common-area ductwork and dryer vents",
        audit="I know an unsolicited vendor email is the last thing a building manager needs.",
        pain_label=("It seems like ductwork gets attention only when a tenant calls about dust "
                    "or a stuffy floor, and then it can't wait."),
        why=("Ducts collect construction dust after every build-out and never get rid of it "
             "on their own, so what tenants notice is usually years in the making."),
        calibrated="How do you find out what shape the ductwork is in right now?",
        inspection=("We inspect the accessible ductwork and vents, photograph each area, and give "
                    "you a written scope before anyone asks you for a purchase order."),
        no_asks=_GENERIC_NO_ASKS,
        breakup="Have you given up on having the building's ductwork looked at?",
        subjects=("ductwork at {business}", "{business}: free duct inspection",
                  "what's in the ducts at {business}"),
        call_question="How do you find out today what condition the ductwork is in?",
    ),
    BusinessCategory.hotel: Playbook(
        key="hotel",
        label="Hotels",
        buyer="Chief engineer, director of engineering or general manager",
        place="the hotel",
        systems="laundry dryer vents and guest-floor ductwork",
        audit="You probably hear from vendors all week and have a property to run.",
        pain_label=("It seems like the laundry dryers and the guest-room vents only get noticed "
                    "when a load won't dry or a guest mentions the air in a review."),
        why=("Hotel laundry dryers run most of the day, so their vents load up with lint far "
             "faster than a household's, and a room vent with visible dust is one of the few "
             "things a guest can see from the bed."),
        calibrated="How does engineering decide when the laundry vents are due?",
        inspection=("We inspect the laundry vent runs and a sample of guest-floor ducts, work "
                    "around occupancy, and give you photos and a written scope."),
        no_asks=(
            "Would it be a bad idea to have us inspect the laundry vents, free, on a quiet morning?",
            "Are you against a no-cost look before your busy season?",
        ),
        breakup="Have you given up on getting the laundry vents inspected?",
        subjects=("laundry dryer vents at {business}", "{business}: free vent inspection",
                  "the vents guests can see"),
        call_question="How does engineering keep track of the laundry dryer vents today?",
    ),
    BusinessCategory.senior_living: Playbook(
        key="senior_living",
        label="Senior & assisted living",
        buyer="Executive director, administrator or maintenance director",
        place="the community",
        systems="laundry dryer vents and common-area ductwork",
        audit="I know your day belongs to your residents, not to vendor emails.",
        pain_label=("It sounds like the laundry runs from morning to night, and the vents behind "
                    "it are the kind of thing nobody has time to think about."),
        why=("On-site laundry that runs daily fills a vent with lint quickly, and built-up lint "
             "is a fire hazard, which matters more in a building where residents can't leave "
             "quickly."),
        calibrated="How do you currently keep track of when the laundry vents were last cleaned?",
        inspection=("We inspect the laundry vents and common-area ducts quietly, around resident "
                    "routines, and give you photos and a dated written record for your files."),
        no_asks=(
            "Would it be a bad idea to have us inspect the laundry vents at no charge?",
            "Are you against a free look, scheduled around your residents' day?",
        ),
        breakup="Have you given up on having the laundry vents checked?",
        subjects=("laundry vents at {business}", "{business}: free vent inspection",
                  "a dated record of your dryer vents"),
        call_question="How do you keep track of the laundry dryer vents today?",
    ),
    BusinessCategory.medical: Playbook(
        key="medical",
        label="Medical & outpatient facilities",
        buyer="Practice administrator or facilities manager",
        place="the facility",
        systems="ductwork and supply vents",
        audit="I realize a vendor email is not what a medical office needs more of.",
        pain_label=("It seems like the ductwork is easy to put off because there's never a day "
                    "when the building is empty."),
        why=("Supply vents sit above waiting rooms and exam rooms, so dust on them is something "
             "patients and staff look at every day."),
        calibrated="What would have to be true for a duct inspection not to disrupt your schedule?",
        inspection=("We inspect after hours or on a closed day, photograph what we find, and give "
                    "you a written scope with nothing done until you approve it."),
        no_asks=(
            "Would it be a bad idea to have us inspect after hours, at no charge?",
            "Are you against a free look on a day the office is closed?",
        ),
        breakup="Have you given up on having the ductwork inspected?",
        subjects=("ductwork at {business}", "{business}: after-hours duct inspection",
                  "the vents over your waiting room"),
        call_question="What would make a duct inspection workable around your patient schedule?",
    ),
    BusinessCategory.dental: Playbook(
        key="dental",
        label="Dental offices",
        buyer="Practice owner or office manager",
        place="the office",
        systems="ductwork and supply vents",
        audit="You probably get more vendor mail than patient mail, so I'll be brief.",
        pain_label=("It seems like the vents are the one part of the office that never makes it "
                    "onto the cleaning list."),
        why="Patients spend the whole appointment looking up, and a dusty ceiling vent is right there.",
        calibrated="What would make an inspection easy to fit around your patient days?",
        inspection=("We inspect on a day you're closed, photograph the vents and ducts, and give "
                    "you a written price before anything is done."),
        no_asks=(
            "Would it be a bad idea to have us take a free look on a day you're closed?",
            "Are you against a no-cost inspection outside patient hours?",
        ),
        breakup="Have you given up on getting the vents looked at?",
        subjects=("the ceiling vents at {business}", "{business}: free duct inspection",
                  "what patients see looking up"),
        call_question="What would make an inspection easy to fit around your patient days?",
    ),
    BusinessCategory.restaurant: Playbook(
        key="restaurant",
        label="Restaurants",
        buyer="Owner or general manager",
        place="the restaurant",
        systems="dining-room ductwork and supply vents",
        audit="I know you're pitched all day and working all night.",
        pain_label=("It seems like the dining-room vents are something everyone sees and nobody "
                    "owns, right up until a guest points at one."),
        why="A supply vent over a table is in every guest's line of sight, and dust on it reads as a dirty room.",
        calibrated="How do the dining-room vents get looked after now?",
        inspection=("We inspect before you open, photograph the vents and ducts, and give you a "
                    "written price. No work, no charge, unless you want it done."),
        no_asks=(
            "Would it be a bad idea to have us look before opening one morning, at no charge?",
            "Are you against a free inspection on a day you're closed?",
        ),
        breakup="Have you given up on getting the dining-room vents looked at?",
        subjects=("the vents over your tables", "{business}: free duct inspection",
                  "dining-room vents at {business}"),
        call_question="How do the dining-room vents get looked after today?",
    ),
    BusinessCategory.office_building: Playbook(
        key="office_building",
        label="Office buildings",
        buyer="Property manager or building engineer",
        place="the building",
        systems="ductwork across tenant and common areas",
        audit="I know you hear from vendors constantly and have tenants to keep happy.",
        pain_label=("It sounds like ductwork only comes up when a tenant complains about dust or "
                    "a stuffy suite, and then it's your problem that week."),
        why=("Every tenant build-out sends construction dust into the ducts, and it stays there "
             "until someone removes it."),
        calibrated="How do you currently know which floors are due?",
        inspection=("We inspect the accessible ductwork floor by floor, photograph each area, and "
                    "send a written scope you can attach to a budget request."),
        no_asks=(
            "Would it be a bad idea to have us inspect one floor at no charge?",
            "Are you against a free look at whichever suite complains the most?",
        ),
        breakup="Have you given up on having the ductwork inspected this year?",
        subjects=("ductwork at {business}", "{business}: one floor, free inspection",
                  "after the last build-out at {business}"),
        call_question="How do you know today which floors' ductwork is due?",
    ),
    BusinessCategory.school: Playbook(
        key="school",
        label="Schools & colleges",
        buyer="Facilities director or business manager",
        place="the campus",
        systems="classroom and common-area ductwork",
        audit="I know the school year leaves no room for vendor emails.",
        pain_label=("It seems like duct work can only happen during a break, and breaks fill up "
                    "with everything else first."),
        why="Classroom vents are in use every school day, so the only practical window is a break, and those book early.",
        calibrated="How do you decide what facilities work gets a slot over the next break?",
        inspection=("We inspect after dismissal, photograph each building, and give you a written "
                    "scope early enough to schedule the work for a break."),
        no_asks=(
            "Would it be a bad idea to have us inspect one building, free, after dismissal?",
            "Are you against a no-cost inspection ahead of the next break?",
        ),
        breakup="Have you given up on getting the ductwork inspected before the next break?",
        subjects=("ductwork before the next break", "{business}: free duct inspection",
                  "classroom vents at {business}"),
        call_question="How do you decide what facilities work gets done over a break?",
    ),
    BusinessCategory.daycare: Playbook(
        key="daycare",
        label="Daycares & preschools",
        buyer="Director or owner",
        place="the center",
        systems="ductwork, supply vents and the laundry dryer vent",
        audit="I know your day is spoken for from drop-off to pick-up.",
        pain_label=("It seems like the vents are easy to put off when every hour of the day "
                    "already belongs to the children."),
        why=("Parents notice dusty vents at pick-up, and a center that washes bedding daily runs "
             "its dryer far more than a household does."),
        calibrated="What time of day would an inspection be least in your way?",
        inspection=("We inspect after closing, photograph the vents and the dryer vent, and give "
                    "you a written price with nothing done until you say so."),
        no_asks=(
            "Would it be a bad idea to have us take a free look after closing one evening?",
            "Are you against a no-cost inspection on a day you're closed?",
        ),
        breakup="Have you given up on having the vents checked?",
        subjects=("the vents at {business}", "{business}: free vent inspection",
                  "your dryer vent and the nap-room vents"),
        call_question="What time of day would an inspection be least in your way?",
    ),
    BusinessCategory.gym: Playbook(
        key="gym",
        label="Gyms & fitness studios",
        buyer="Owner or general manager",
        place="the gym",
        systems="ductwork and the towel-laundry dryer vents",
        audit="I know you're pitched constantly and you have a floor to run.",
        pain_label=("It seems like the air is the first thing members notice and the last thing "
                    "that gets a line in the budget."),
        why=("A gym that washes towels runs its dryers all day, and a room full of people "
             "breathing hard notices the air sooner than any other kind of business."),
        calibrated="How do members let you know when the air isn't right?",
        inspection=("We inspect before you open, photograph the ducts and dryer vents, and give "
                    "you a written price before anything is done."),
        no_asks=(
            "Would it be a bad idea to have us take a free look before you open one morning?",
            "Are you against a no-cost inspection during your slowest hour?",
        ),
        breakup="Have you given up on getting the ducts and dryer vents looked at?",
        subjects=("the air at {business}", "{business}: free duct inspection",
                  "towel dryers at {business}"),
        call_question="How do members let you know when the air isn't right?",
    ),
    BusinessCategory.salon: Playbook(
        key="salon",
        label="Salons & spas",
        buyer="Owner",
        place="the salon",
        systems="the towel dryer vent and ductwork",
        audit="You probably get more sales emails than bookings some days.",
        pain_label=("It seems like the towel dryer runs all day and its vent is the last thing "
                    "anyone thinks about."),
        why=("A dryer that runs load after load fills its vent with lint quickly, and the "
             "first sign is towels that take two cycles."),
        calibrated="How long are your towels taking to dry these days?",
        inspection=("We check the dryer vent and the ducts on a day you're closed, show you photos, "
                    "and give you a written price first."),
        no_asks=(
            "Would it be a bad idea to have us take a free look on a day you're closed?",
            "Are you against a no-cost check of the dryer vent?",
        ),
        breakup="Have you given up on getting the dryer vent checked?",
        subjects=("the towel dryer at {business}", "{business}: free dryer vent check",
                  "towels taking two cycles?"),
        call_question="How long are your towels taking to dry these days?",
    ),
    BusinessCategory.laundromat: Playbook(
        key="laundromat",
        label="Laundromats",
        buyer="Owner",
        place="the laundromat",
        systems="the dryer exhaust runs",
        audit="I know you're pitched by every equipment and chemical rep in the county.",
        pain_label=("It sounds like when dry times creep up, customers blame the machines and "
                    "feed them more quarters, or go down the street."),
        why=("Dryers are the business, and lint in the exhaust run is what stretches dry "
             "times. Built-up lint is also a fire hazard."),
        calibrated="How do you tell today whether slow drying is the machine or the vent?",
        inspection=("We inspect the exhaust runs behind and above the dryers, show you photos of "
                    "what's in them, and give you a written price before any work."),
        no_asks=(
            "Would it be a bad idea to have us inspect the exhaust runs, free, during a slow hour?",
            "Are you against a no-cost look behind the dryers?",
        ),
        breakup="Have you given up on getting the dryer exhaust inspected?",
        subjects=("dry times at {business}", "{business}: free exhaust inspection",
                  "what's behind your dryers"),
        call_question="How do you tell today whether slow drying is the machine or the vent?",
    ),
    BusinessCategory.retail: Playbook(
        key="retail",
        label="Shopping centers & retail",
        buyer="Property manager or operations manager",
        place="the center",
        systems="common-area and tenant-space ductwork",
        audit="I know you hear from vendors every day and have tenants to answer to.",
        pain_label=("It seems like ductwork only comes up at tenant turnover, when the last "
                    "build-out's dust is still in it."),
        why="Every tenant build-out puts construction dust into the ducts, and the next tenant inherits it.",
        calibrated="How is ductwork handled today when a space turns over?",
        inspection=("We inspect the accessible ductwork, photograph each space, and give you a "
                    "written scope you can build into a turnover budget."),
        no_asks=_GENERIC_NO_ASKS,
        breakup="Have you given up on having the ductwork looked at?",
        subjects=("ductwork at {business}", "{business}: free duct inspection",
                  "ducts at tenant turnover"),
        call_question="How is ductwork handled today when a space turns over?",
    ),
    BusinessCategory.warehouse: Playbook(
        key="warehouse",
        label="Warehouses & industrial",
        buyer="Operations or facilities manager",
        place="the facility",
        systems="ductwork serving the offices and work areas",
        audit="I know a vendor email is noise on a shipping day.",
        pain_label=("It seems like the ductwork is the last line on the maintenance list in a "
                    "building that makes dust for a living."),
        why="Warehouse air carries far more dust than an office, and it ends up in the ducts that feed the offices.",
        calibrated="How do you know today what's built up in the ductwork?",
        inspection=("We inspect around your shifts, photograph what's in the ducts, and give you a "
                    "written scope and price."),
        no_asks=_GENERIC_NO_ASKS,
        breakup="Have you given up on having the ductwork inspected?",
        subjects=("ductwork at {business}", "{business}: free duct inspection",
                  "dust in the office ducts"),
        call_question="How do you know today what's built up in the ductwork?",
    ),
    BusinessCategory.church: Playbook(
        key="church",
        label="Churches & houses of worship",
        buyer="Facilities committee chair, administrator or pastor",
        place="the building",
        systems="sanctuary and classroom ductwork",
        audit="I know an email from a contractor is the last thing a church office is short of.",
        pain_label=("It seems like the building is looked after by a few generous people with "
                    "limited hours, and the ductwork never reaches the top of the list."),
        why=("A sanctuary system that sits idle most of the week and then runs for a full room "
             "pushes out whatever has settled in the ducts since last time."),
        calibrated="How does the facilities committee decide what gets done each year?",
        inspection=("We inspect midweek when the building is quiet, photograph what we find, and "
                    "write it up so the committee can decide in its own time."),
        no_asks=(
            "Would it be a bad idea to have us inspect midweek, at no charge?",
            "Are you against a free look so the committee has something to go on?",
        ),
        breakup="Have you given up on having the ductwork looked at?",
        subjects=("ductwork at {business}", "{business}: free inspection for the committee",
                  "the sanctuary vents"),
        call_question="How does the facilities committee decide what gets done each year?",
    ),
    BusinessCategory.other: Playbook(
        key="general",
        label="Other businesses",
        buyer="Owner or facilities contact",
        place="your building",
        systems="ductwork and dryer vents",
        audit="You probably get a dozen vendor emails a week, and this is one more.",
        pain_label="It seems like ductwork is easy to put off because nobody can see inside it.",
        why="Ducts and dryer vents collect dust and lint out of sight, so the first sign is usually a complaint.",
        calibrated="How do you find out today what shape the ducts are in?",
        inspection=("We inspect, photograph what we find, and give you a written price. Nothing "
                    "is done, and nothing is charged, unless you want it."),
        no_asks=_GENERIC_NO_ASKS,
        breakup="Have you given up on having the ducts looked at?",
        subjects=("ductwork at {business}", "{business}: free duct inspection",
                  "what's in the ducts at {business}"),
        call_question="How do you find out today what shape the ducts are in?",
    ),
}


def get_playbook(category: BusinessCategory) -> Playbook:
    return PLAYBOOKS.get(category, PLAYBOOKS[BusinessCategory.other])
