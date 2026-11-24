export interface LocalGuide {
  name: string;
  municipality: string;
  summary: string;
  home: string;
  commercial: string;
  planning: string[];
  source: { label: string; url: string };
  project?: { text: string; path: string };
  faqs: { question: string; answer: string }[];
}

// Service-area guides describe where PAC works, not additional PAC offices.
export const localGuides: Record<string, LocalGuide> = {
  brentwood: {
    name: 'Brentwood', municipality: 'Los Angeles',
    summary: 'Pure Air California provides air duct, HVAC system and dryer vent cleaning in Brentwood, Los Angeles, for homeowners, condo associations and businesses. Tell us the property type, number of systems and access arrangements so we can prepare a useful written estimate.',
    home: 'For a Brentwood house, start with the number of heating and cooling systems and where they can be accessed. For a condominium, ask management which ducts serve your unit and which belong to the building before booking.',
    commercial: 'For studios, offices and storefronts, we plan the service scope around the equipment and your operating hours. Laundry exhaust is a separate system from air-conditioning ductwork and should be identified separately in the estimate.',
    planning: ['Confirm attic, closet or roof access for each HVAC unit.', 'Share parking or loading restrictions before the appointment.', 'For shared buildings, arrange management approval for common equipment.', 'Tell us about renovation dust, visible buildup or dryer exhaust concerns.'],
    source: { label: 'Brentwood–Pacific Palisades community plan', url: 'https://planning.lacity.gov/plans-policies/community-plan-area/brentwood-pacific-palisades' },
    project: { text: 'Our past work includes dryer exhaust duct cleaning for the SoulCycle Brentwood studio, documented in a January 2019 service invoice.', path: '/case-studies/soulcycle-westside-dryer-vents/' },
    faqs: [
      { question: 'Do you mean Brentwood in Los Angeles?', answer: 'Yes. This page covers the Brentwood neighborhood on the Westside of Los Angeles, including the 90049 service area. It does not describe service in the Northern California city of Brentwood.' },
      { question: 'Can you clean air ducts in a Brentwood condo?', answer: 'Yes. We first need to establish which equipment serves your unit, how to access it and whether the HOA or building manager must approve the work. Shared ventilation and individual-unit ductwork may need different service scopes.' },
      { question: 'Have you worked with businesses in Brentwood?', answer: 'Yes. PAC’s records include dryer exhaust duct cleaning for the SoulCycle Brentwood studio in January 2019. That project was dryer-vent work; commercial air duct and HVAC cleaning are separately quoted services.' },
    ],
  },
  'culver-city': {
    name: 'Culver City', municipality: 'Culver City',
    summary: 'Pure Air California offers residential and commercial air duct cleaning in Culver City, together with HVAC component and dryer vent cleaning. From a home laundry vent to a studio or office system, the estimate starts with the equipment, access and the work your property actually needs.',
    home: 'For a house, apartment or condo, let us know whether the HVAC equipment is dedicated to your home or shared. Dryer vent length, bends and the location of the exterior outlet help us plan the right access.',
    commercial: 'Culver City’s mix of workplaces includes the Hayden Tract area. For offices, creative spaces and fitness studios, tell us about tenant access, production or opening hours, roof access and any laundry equipment so we can separate the systems in the scope.',
    planning: ['List HVAC units and dryer exhaust runs as separate systems.', 'Coordinate with the landlord when roof or mechanical-room access is needed.', 'Share business hours and appointment windows that suit your team.', 'Ask for the ducts, plenums, blowers and coils included in your written estimate.'],
    source: { label: 'City of Culver City: Hayden Tract planning', url: 'https://www.culvercity.org/City-Hall/City-Departments/Planning-and-Development/Advance-Planning-Division/Hayden-Tract-Specific-Plan' },
    project: { text: 'A July 2018 service invoice documents PAC dryer exhaust duct cleaning for the SoulCycle Culver City studio.', path: '/case-studies/soulcycle-westside-dryer-vents/' },
    faqs: [
      { question: 'Do you work with Culver City businesses as well as homes?', answer: 'Yes. We quote duct and HVAC cleaning for homes, offices, studios and other commercial properties. For businesses, share the equipment count, access rules and operating hours when requesting an estimate.' },
      { question: 'Is commercial dryer vent cleaning included in air duct cleaning?', answer: 'It is a separate service. Dryer exhaust carries laundry air and lint; HVAC ducts distribute heating and cooling air. PAC’s July 2018 SoulCycle Culver City invoice records dryer exhaust cleaning specifically. Tell us if your property needs both systems serviced.' },
      { question: 'What should a Culver City property manager send for an estimate?', answer: 'Send the property type, approximate size, number of HVAC units, dryer vent count if relevant, and access requirements. Photos of the equipment and exterior exhaust outlets can help us determine whether an on-site assessment is needed.' },
    ],
  },
  'century-city': {
    name: 'Century City', municipality: 'Los Angeles',
    summary: 'Pure Air California provides air duct and HVAC cleaning for Century City homes, condominiums and commercial properties. In a managed building, we help define the service scope around tenant systems, shared equipment and the access approved by building management.',
    home: 'For a Century City condo, begin with your building manager: identify equipment assigned to your unit, service access panels and rules for contractor visits. A unit’s dryer exhaust may connect to a common system that needs separate coordination.',
    commercial: 'For office suites and larger properties, clarify whether the work covers a tenant space, common areas or central equipment. Provide any contractor documentation, loading dock, service elevator and after-hours access requirements before scheduling.',
    planning: ['Confirm the boundary between tenant equipment and building systems.', 'Ask management about contractor documentation and service elevator bookings.', 'Identify mechanical rooms, roof access and approved work hours.', 'Request a written scope that names each system and component to be cleaned.'],
    source: { label: 'City of Los Angeles: West Los Angeles community plan', url: 'https://planning.lacity.gov/plans-policies/community-plan-area/west-los-angeles' },
    faqs: [
      { question: 'Do you clean air ducts in Century City high-rise buildings?', answer: 'We can assess duct and HVAC cleaning for managed residential and commercial buildings. Access and the proposed scope must be coordinated with building management, especially where equipment or ventilation is shared.' },
      { question: 'Can a tenant book cleaning for an entire office building?', answer: 'A tenant should first confirm what equipment they control under their lease. Common-area or central HVAC work generally requires the property manager’s authorization. We can help prepare a scope for the authorized contact to review.' },
      { question: 'Can Century City work be scheduled outside office hours?', answer: 'Tell us your preferred work window when you request an estimate. We will confirm crew availability, expected duration and building access before agreeing on an appointment; after-hours access is not assumed.' },
    ],
  },
};
