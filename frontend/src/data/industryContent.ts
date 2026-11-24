export interface IndustryVerticalContent {
  file: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  heading: string;
  body: string;
  bullets: string[];
  complianceAndAirQuality: string;
  schedulingAndLogistics: string;
  documentationReady: string;
  maintenanceProgram: string;
  question: string;
  answer: string;
  extraFaqs: { question: string; answer: string }[];
  guide: string;
  service: string;
  project?: {
    label: string;
    path: string;
  };
}

export const industryContent: Record<
  | 'healthcare'
  | 'hospitality'
  | 'restaurants'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'commercial-real-estate',
  IndustryVerticalContent
> = {
  healthcare: {
    file: 'HealthcareFacilities',
    label: 'Healthcare',
    title: 'Healthcare & Clinic Air Duct Cleaning LA | Pure Air CA',
    description:
      'Containment-aware healthcare & medical clinic air duct cleaning in Los Angeles. Coordinate access, COI & facility documentation. Call (213) 792-4145.',
    intro:
      'Containment-aware air duct, air handler, and HVAC component cleaning for Los Angeles medical clinics, outpatient centers, dental suites, and healthcare facilities. We coordinate work windows, access protocols, and completion documentation directly with your facility and infection-prevention teams.',
    heading: 'Start with your facility’s clinical & engineering protocols',
    body: 'Identify the air handlers and clinical or administrative zones involved, then review the proposed scope with facilities and infection-prevention staff. Mechanical duct cleaning, air balancing, pressure testing, and engineering sign-offs are distinct tasks that should be identified separately before work is confirmed.',
    bullets: [
      'Air handler, VAV, and clinical-zone identifiers',
      'Authorized facility engineering and infection-prevention contacts',
      'Patient-area isolation, negative-pressure, and work-area precautions',
      'COI, vendor onboarding, and closeout records required by the facility',
    ],
    complianceAndAirQuality:
      'We follow your facility’s containment rules, negative-pressure extraction practices, and room-protection requirements while keeping comfort/supply duct cleaning clearly separated from independent air-change testing or clinical certification.',
    schedulingAndLogistics:
      'Schedule clinic and outpatient HVAC work during off-hours, weekends, or phased suite shutdowns across Los Angeles so patient care and waiting rooms are never disrupted.',
    documentationReady:
      'Receive Certificates of Insurance (COI), itemized zone-by-zone written scopes, before-and-after accessible component photos, and exception notes formatted for facility maintenance files.',
    maintenanceProgram:
      'Establish multi-clinic or annual/semi-annual air-handler, coil, and filter-bank maintenance reviews across medical office portfolios in Los Angeles County.',
    question: 'Does duct cleaning establish healthcare or infection-control compliance?',
    answer:
      'No. Cleaning is a defined mechanical maintenance activity. Your facility team and qualified engineers determine applicable regulatory requirements, pressure verification, air testing, or clinical sign-off before returning a zone to service.',
    extraFaqs: [
      {
        question: 'Can you work after clinic hours or phase work by medical suite?',
        answer:
          'Yes. Share your clinic operating hours, suite layout, and which air handlers serve each zone. We plan evening, weekend, or wing-by-wing schedules with your authorized facility contact.',
      },
      {
        question: 'Do you use chemical biocides inside healthcare ductwork automatically?',
        answer:
          'Never automatically. We prioritize mechanical negative-pressure source removal. Any proposed surface treatment must be reviewed in advance with its EPA registration label, duct-material compatibility, and approval from your facility team.',
      },
    ],
    guide: 'hospital-healthcare-air-duct-cleaning',
    service: 'Healthcare Facility Air Duct Cleaning',
  },
  hospitality: {
    file: 'Hospitality',
    label: 'Hospitality',
    title: 'Hotel Air Duct & Laundry Exhaust Cleaning LA | PAC',
    description:
      'Hotel air duct, guestroom fan-coil & commercial laundry exhaust cleaning in Los Angeles. Phased around occupancy & room turnover. Call (213) 792-4145.',
    intro:
      'Quiet, phased HVAC ductwork, guestroom fan-coil, corridor supply, and commercial laundry exhaust cleaning for Los Angeles hotels, resorts, and hospitality properties. We plan guestroom and back-of-house service around occupancy, room turnover, and engineering schedules.',
    heading: 'Define guestroom, common-area & laundry systems separately',
    body: 'Guestroom fan coils, central lobby/ballroom air handlers, and high-volume commercial laundry exhaust require distinct scopes and crew setups. Share your equipment list and coordinate room-block releases with engineering, housekeeping, and front-desk leadership.',
    bullets: [
      'Guestroom stack or floor-by-floor room-block list',
      'Lobby, corridor, meeting-room, and fitness-center HVAC units',
      'Commercial laundry dryer banks, shared manifolds, and roof risers',
      'Approved quiet hours, service-elevator rules, and COI documentation',
    ],
    complianceAndAirQuality:
      'Clean guestroom coils, quiet supply diffusers, and lint-free commercial dryer manifolds support guest comfort, odor control, and safer back-of-house laundry throughput.',
    schedulingAndLogistics:
      'We phase work by floor, wing, or checkout/check-in window and route hoses through service elevators and back corridors to stay invisible to hotel guests.',
    documentationReady:
      'COI and additional-insured certificates provided prior to arrival, with closeout logs organized by room number, air handler ID, or laundry dryer bank.',
    maintenanceProgram:
      'Combine quarterly commercial laundry exhaust maintenance with scheduled guestroom fan-coil and common-area HVAC care across your Los Angeles hospitality property.',
    question: 'Can hotel duct and fan-coil cleaning be phased around guest occupancy?',
    answer:
      'Yes. Share your preferred floor sequence and available room blocks. We review system architecture, crew availability, and access routes with chief engineering and housekeeping before confirming a phased schedule.',
    extraFaqs: [
      {
        question: 'Can you clean hotel commercial laundry dryer vents during the same project?',
        answer:
          'Yes, as a clearly itemized scope. We map each commercial tumbler, shared manifold trunk, booster fan, and roof termination and schedule cleaning during low-laundry windows.',
      },
      {
        question: 'Have you documented hospitality ventilation work in Los Angeles?',
        answer:
          'Yes. Our service archive includes a documented June 2015 two-system guestroom ventilation, blower, and interior coil cleaning record at Four Seasons Hotel Los Angeles.',
      },
    ],
    guide: 'hotel-air-quality-guest-satisfaction',
    service: 'Hotel Air Duct Cleaning',
    project: {
      label: 'Four Seasons Hotel Los Angeles guestroom ventilation record',
      path: '/case-studies/four-seasons-los-angeles-ventilation/',
    },
  },
  restaurants: {
    file: 'Restaurants',
    label: 'Restaurants',
    title: 'Restaurant HVAC & Air Duct Cleaning Los Angeles | PAC',
    description:
      'Restaurant dining-room HVAC, air duct & coil cleaning in Los Angeles. Off-hours service & clear scope separation from kitchen hoods. Call (213) 792-4145.',
    intro:
      'Keep dining rooms comfortable and supply and return ductwork clean without interrupting prep or service hours. Pure Air California coordinates restaurant comfort-air HVAC, plenum, blower, and coil cleaning across Los Angeles with clear scope separation from grease-hood exhaust work.',
    heading: 'Separate dining-room comfort HVAC from cooking grease exhaust',
    body: 'Dining-room heating and cooling ducts serve a completely different purpose from commercial cooking hoods and grease ducts (governed by NFPA 96). Identify which system needs attention so your written estimate, crew setup, and completion records match the exact equipment.',
    bullets: [
      'Dining-room rooftop package units (RTUs), plenums, coils, and blowers',
      'Supply diffusers and return grilles above seating and bar areas',
      'Early-morning or post-close work windows before kitchen prep begins',
      'Full protection for tables, booths, bar tops, and food-prep surfaces',
    ],
    complianceAndAirQuality:
      'Clearing dust-loaded dining-room diffusers, return plenums, and indoor coils helps maintain balanced comfort air and spotless overhead grilles above guest tables.',
    schedulingAndLogistics:
      'Our crews work early mornings or after closing across Los Angeles—as documented in our early-morning Canoga Park restaurant HVAC project—so your kitchen prep and dining service start on time.',
    documentationReady:
      'COI documentation for restaurant groups and shopping-center landlords, plus itemized invoice records distinguishing comfort-HVAC cleaning from NFPA 96 hood inspections.',
    maintenanceProgram:
      'Set recurring comfort-HVAC duct, coil, and filter maintenance across single venues or multi-unit Los Angeles restaurant groups.',
    question: 'Is kitchen grease-hood cleaning included in a restaurant HVAC duct quote?',
    answer:
      'Only work explicitly listed in the written scope is covered. Commercial cooking hoods and grease-exhaust ducts have separate NFPA 96 fire-protection requirements. Tell us which system you want assessed so each scope is quoted accurately.',
    extraFaqs: [
      {
        question: 'Can you clean dining-room ducts and rooftop units before morning prep starts?',
        answer:
          'Yes. Share your closing time, morning prep arrival time, and roof/key access details when requesting an estimate so we can confirm an early-morning or overnight window.',
      },
      {
        question: 'How do you protect dining tables, booths, and kitchen pass-throughs?',
        answer:
          'We cover seating, bar surfaces, and adjacent prep counters with protective sheeting, extract debris under negative pressure, and leave the dining floor ready for opening setup.',
      },
    ],
    guide: 'restaurant-kitchen-air-duct-cleaning',
    service: 'Restaurant Air Duct Cleaning',
    project: {
      label: 'Canoga Park restaurant HVAC & coil project',
      path: '/case-studies/taco-bell-canoga-park-hvac/',
    },
  },
  education: {
    file: 'Education',
    label: 'Education',
    title: 'School & Campus Air Duct Cleaning Los Angeles | PAC',
    description:
      'School, university & childcare air duct and HVAC cleaning in Los Angeles. Scheduled around academic breaks, weekends & campus access. Call (213) 792-4145.',
    intro:
      'Scheduled air duct, classroom unit, library, and gymnasium ventilation cleaning for Los Angeles K–12 schools, university campuses, and childcare facilities. We align multi-building scopes around academic breaks, weekend windows, and campus documentation requirements.',
    heading: 'Build the scope around your campus calendar & buildings',
    body: 'Map buildings, classroom wings, and the air handlers serving each zone. Discuss escort rules, key access, after-school programs, and specialty rooms (science labs, cafeterias, or gyms) so your written scope fits both your facilities budget and academic break window.',
    bullets: [
      'Building-by-building classroom, office, library, and gym equipment list',
      'Academic break, holiday, summer, or weekend work-window planning',
      'Clear separation between comfort HVAC, lab exhaust, and cafeteria hoods',
      'COI, vendor onboarding, and per-building completion documentation',
    ],
    complianceAndAirQuality:
      'Mechanical source removal across classroom supply/return ducts, unit ventilators, and accessible coils supports cleaner airflow without unapproved chemical applications.',
    schedulingAndLogistics:
      'Plan single-building or phased multi-building work over winter, spring, or summer recesses—or weekend blocks—with confirmed reopening deadlines.',
    documentationReady:
      'Organized building- and room-level completion records, accessible before-and-after photos, and COI documentation ready for school administrators and board packets.',
    maintenanceProgram:
      'Multi-year or annual campus rotation plans that cycle through academic buildings, gyms, dormitories, and shared laundry vents systematically.',
    question: 'Can school air duct cleaning be scheduled during an academic break or weekend?',
    answer:
      'Yes. Share your break dates, available buildings, and reopening deadlines when requesting a quote. We confirm crew capacity, access logistics, and a written scope that fits your window.',
    extraFaqs: [
      {
        question: 'Do you service portable classrooms, gymnasiums, and campus dorm laundry vents?',
        answer:
          'Yes. List portable classroom package units, high-ceiling gym ductwork, and residence-hall dryer exhaust stacks separately so we can plan lift/ladder access and itemize each scope.',
      },
      {
        question: 'Does classroom duct cleaning include science-lab fume hoods or kitchen hoods?',
        answer:
          'No. Laboratory fume extraction and commercial kitchen grease exhaust require specialized testing and certification outside a general comfort-HVAC duct cleaning scope.',
      },
    ],
    guide: 'commercial-indoor-air-quality-guide',
    service: 'School Air Duct Cleaning',
  },
  retail: {
    file: 'Retail',
    label: 'Retail',
    title: 'Retail & Showroom Air Duct Cleaning Los Angeles | PAC',
    description:
      'Off-hours air duct, spiral duct & rooftop HVAC cleaning for Los Angeles retail stores, boutiques & showrooms. Merchandise protection. Call (213) 792-4145.',
    intro:
      'Off-hours air duct, ceiling diffuser, exposed spiral duct, and rooftop package unit cleaning that keeps Los Angeles retail stores, boutiques, and showrooms spotless. We protect merchandise and displays while restoring clean, balanced customer-area airflow.',
    heading: 'Plan around the sales floor, displays & lease boundaries',
    body: 'List the HVAC units serving your sales floor, fitting rooms, and stockrooms, and flag delicate merchandise, lighting tracks, or high-ceiling displays along the work route. For shopping-center or multi-tenant spaces, confirm whether roof hatches and central systems require landlord sign-off.',
    bullets: [
      'Tenant-controlled RTUs vs. shopping-center common HVAC boundaries',
      'Exposed spiral ductwork, linear slot diffusers, and return plenums',
      'Full drop-cloth and sheeting protection for merchandise, racks, and cases',
      'Before-opening or after-closing work windows and mall COI compliance',
    ],
    complianceAndAirQuality:
      'Eliminate visible dust streaking on high-visibility showroom diffusers, exposed overhead spiral ducts, and return grilles where customers shop.',
    schedulingAndLogistics:
      'Scheduled before store opening or after closing—aligned with mall security, loading docks, and rooftop access rules across Los Angeles.',
    documentationReady:
      'Mall and property-manager COI compliance, itemized unit-by-unit scopes (ducts, plenums, blowers, and coils), and photo closeout verification.',
    maintenanceProgram:
      'Recurring filter, coil, and diffuser maintenance for flagship boutiques, furniture showrooms, and multi-location Los Angeles retail chains.',
    question: 'Does our retail landlord or shopping center need to approve the work?',
    answer:
      'Check your commercial lease and property-management rules. Even when a tenant pays for its own HVAC unit, rooftop access, loading docks, and after-hours security escorts typically require landlord notification and a Certificate of Insurance.',
    extraFaqs: [
      {
        question: 'Can you clean exposed overhead spiral ductwork above display floors?',
        answer:
          'Yes. Share ceiling height, floor layout, and fixture locations so we can plan ladder or lift access and full merchandise sheeting before work begins.',
      },
      {
        question: 'Have you completed full showroom HVAC projects in the Los Angeles area?',
        answer:
          'Yes. Our documented archive includes a whole-system ventilation, plenum, blower, and interior/exterior coil cleaning scope for the Bassett Furniture showroom in Torrance.',
      },
    ],
    guide: 'commercial-air-duct-cleaning-los-angeles-businesses',
    service: 'Retail Air Duct Cleaning',
    project: {
      label: 'Torrance Bassett Furniture showroom HVAC project',
      path: '/case-studies/bassett-torrance-showroom/',
    },
  },
  manufacturing: {
    file: 'Manufacturing',
    label: 'Manufacturing & Industrial',
    title: 'Industrial & Warehouse Duct Cleaning Los Angeles | PAC',
    description:
      'Industrial, warehouse & production studio HVAC and overhead duct cleaning in Los Angeles. Shift-aligned scheduling & written scopes. Call (213) 792-4145.',
    intro:
      'Site-specific HVAC and overhead ventilation cleaning for Los Angeles warehouses, soundstages, production studios, workshops, and light-industrial facilities. We review system purpose, high-bay access, and shift schedules with your facility and safety leads before preparing a written scope.',
    heading: 'Start with what the ventilation system actually handles',
    body: 'Office/warehouse comfort HVAC, general dilution ventilation, process exhaust, and combustible-dust collection are fundamentally different systems. Identify the system purpose and materials involved first, and involve your site EHS/safety contact before any cleaning method is proposed.',
    bullets: [
      'System purpose (comfort HVAC vs. general exhaust vs. process dust)',
      'High-bay ceiling heights, scissor-lift routes, and floor clearances',
      'Lockout/tagout (LOTO) and equipment shutdown responsibilities',
      'COI, site safety induction, and equipment-level closeout records',
    ],
    complianceAndAirQuality:
      'We evaluate duct material, particulate type, and OSHA-aligned safety boundaries first—never treating specialized hazardous or combustible-dust exhaust like ordinary office ductwork.',
    schedulingAndLogistics:
      'Coordinate around production shifts, studio filming schedules, loading bays, and planned maintenance shutdowns across Greater Los Angeles.',
    documentationReady:
      'COI and vendor safety packets, itemized unit/zone scopes, inaccessible-area reporting, and before-and-after photo documentation for facility engineering records.',
    maintenanceProgram:
      'Scheduled HVAC, air-handler coil, and commercial filter-bank maintenance for warehouses, distribution hubs, and production studios.',
    question: 'Can every industrial exhaust system be cleaned like ordinary comfort HVAC?',
    answer:
      'No. Comfort HVAC and specialized process or hazardous-material exhaust have very different hazard and equipment requirements. Share what the system handles first so your safety team and our estimators can confirm what belongs in scope.',
    extraFaqs: [
      {
        question: 'Can you service high-bay warehouse ductwork and studio soundstage HVAC?',
        answer:
          'Yes, for compatible comfort and general ventilation systems. Share ceiling heights, floor access for lifts, and shift windows when requesting an assessment.',
      },
      {
        question: 'Who handles equipment lockout/tagout and system restart during service?',
        answer:
          'Shutdown, isolation, and restart responsibilities are agreed in writing with your facility engineering or maintenance lead before the crew mobilizes.',
      },
    ],
    guide: 'industrial-air-duct-cleaning-safety-efficiency',
    service: 'Industrial Air Duct Cleaning',
  },
  'commercial-real-estate': {
    file: 'CommercialRealEstate',
    label: 'Commercial Real Estate',
    title: 'Office & Commercial Building Duct Cleaning LA | PAC',
    description:
      'Commercial office, multi-tenant & HOA building air duct and dryer vent cleaning in Los Angeles. COI-ready, weekend & off-hours scopes. Call (213) 792-4145.',
    intro:
      'Coordinated air duct, multi-zone air handler, and dryer exhaust cleaning for Los Angeles office buildings, mixed-use properties, HOA communities, and commercial real estate portfolios. We provide clear tenant vs. common-area scopes, COI documentation, and after-hours or weekend access.',
    heading: 'Make the building scope easy for owners, boards & tenants to review',
    body: 'Separate tenant-controlled suites from base-building air handlers, garage exhaust, and shared laundry risers. Using consistent unit and zone identifiers ensures your written estimate, vendor approval, and closeout report align line by line.',
    bullets: [
      'Suite-by-suite and base-building HVAC unit/zone inventory',
      'Property-manager authorization, COI, and additional-insured wording',
      'Freight elevator, loading dock, mechanical room, and roof-hatch logistics',
      'Owner- and board-ready completion reports with before/after photos',
    ],
    complianceAndAirQuality:
      'Support tenant comfort, post-TI (tenant improvement) turnovers, and preventative HVAC hygiene with documented source removal across ducts, plenums, blowers, and coils.',
    schedulingAndLogistics:
      'Weekend and evening scheduling—such as our April 2026 four-system West Hollywood office project—keeps weekday office operations completely uninterrupted.',
    documentationReady:
      'Prompt COI issuance with property-management endorsements, itemized multi-system proposals, and per-zone photographic closeout records.',
    maintenanceProgram:
      'Portfolio-wide annual and semi-annual maintenance schedules covering office HVAC, electrostatic filter banks, and multifamily/mixed-use dryer exhaust risers.',
    question: 'Can a commercial tenant authorize work on central building HVAC equipment?',
    answer:
      'Confirm lease authority and building rules first. Base-building air handlers, roof penetrations, and shared risers generally require property-management authorization and COI approval before work is scheduled.',
    extraFaqs: [
      {
        question: 'Can you clean a commercial office suite after a tenant build-out or remodel?',
        answer:
          'Yes. Post-build-out cleaning removes drywall dust and construction debris from supply/return ducts, plenums, blowers, and coils before staff move in.',
      },
      {
        question: 'Do you also handle mixed-use and multifamily HOA properties in your CRE portfolio?',
        answer:
          'Yes. We coordinate both commercial office HVAC and multi-unit apartment/HOA dryer vent and common-area ventilation across Greater Los Angeles.',
      },
    ],
    guide: 'commercial-indoor-air-quality-guide',
    service: 'Commercial Office Air Duct Cleaning',
    project: {
      label: 'West Hollywood four-system office HVAC project',
      path: '/case-studies/nonprofit-housing-office-hvac/',
    },
  },
};
