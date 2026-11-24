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
    name: 'Brentwood',
    municipality: 'Los Angeles',
    summary:
      'Pure Air California provides air duct, HVAC system and dryer vent cleaning in Brentwood, Los Angeles, for homeowners, condo associations and businesses. Tell us the property type, number of systems and access arrangements so we can prepare a useful written estimate.',
    home:
      'For a Brentwood house, start with the number of heating and cooling systems and where they can be accessed. For a condominium, ask management which ducts serve your unit and which belong to the building before booking.',
    commercial:
      'For studios, offices and storefronts, we plan the service scope around the equipment and your operating hours. Laundry exhaust is a separate system from air-conditioning ductwork and should be identified separately in the estimate.',
    planning: [
      'Confirm attic, closet or roof access for each HVAC unit.',
      'Share parking or loading restrictions before the appointment.',
      'For shared buildings, arrange management approval for common equipment.',
      'Tell us about renovation dust, visible buildup or dryer exhaust concerns.',
    ],
    source: {
      label: 'Brentwood–Pacific Palisades community plan',
      url: 'https://planning.lacity.gov/plans-policies/community-plan-area/brentwood-pacific-palisades',
    },
    project: {
      text: 'Our past work includes dryer exhaust duct cleaning for the SoulCycle Brentwood studio, documented in a January 2019 service invoice.',
      path: '/case-studies/soulcycle-westside-dryer-vents/',
    },
    faqs: [
      {
        question: 'Do you mean Brentwood in Los Angeles?',
        answer:
          'Yes. This page covers the Brentwood neighborhood on the Westside of Los Angeles, including the 90049 service area. It does not describe service in the Northern California city of Brentwood.',
      },
      {
        question: 'Can you clean air ducts in a Brentwood condo?',
        answer:
          'Yes. We first need to establish which equipment serves your unit, how to access it and whether the HOA or building manager must approve the work. Shared ventilation and individual-unit ductwork may need different service scopes.',
      },
      {
        question: 'Have you worked with businesses in Brentwood?',
        answer:
          'Yes. PAC’s records include dryer exhaust duct cleaning for the SoulCycle Brentwood studio in January 2019. That project was dryer-vent work; commercial air duct and HVAC cleaning are separately quoted services.',
      },
    ],
  },
  'culver-city': {
    name: 'Culver City',
    municipality: 'Culver City',
    summary:
      'Pure Air California offers residential and commercial air duct cleaning in Culver City, together with HVAC component and dryer vent cleaning. From a home laundry vent to a studio or office system, the estimate starts with the equipment, access and the work your property actually needs.',
    home:
      'For a house, apartment or condo, let us know whether the HVAC equipment is dedicated to your home or shared. Dryer vent length, bends and the location of the exterior outlet help us plan the right access.',
    commercial:
      'Culver City’s mix of workplaces includes the Hayden Tract area. For offices, creative spaces and fitness studios, tell us about tenant access, production or opening hours, roof access and any laundry equipment so we can separate the systems in the scope.',
    planning: [
      'List HVAC units and dryer exhaust runs as separate systems.',
      'Coordinate with the landlord when roof or mechanical-room access is needed.',
      'Share business hours and appointment windows that suit your team.',
      'Ask for the ducts, plenums, blowers and coils included in your written estimate.',
    ],
    source: {
      label: 'City of Culver City: Hayden Tract planning',
      url: 'https://www.culvercity.org/City-Hall/City-Departments/Planning-and-Development/Advance-Planning-Division/Hayden-Tract-Specific-Plan',
    },
    project: {
      text: 'A July 2018 service invoice documents PAC dryer exhaust duct cleaning for the SoulCycle Culver City studio.',
      path: '/case-studies/soulcycle-westside-dryer-vents/',
    },
    faqs: [
      {
        question: 'Do you work with Culver City businesses as well as homes?',
        answer:
          'Yes. We quote duct and HVAC cleaning for homes, offices, studios and other commercial properties. For businesses, share the equipment count, access rules and operating hours when requesting an estimate.',
      },
      {
        question: 'Is commercial dryer vent cleaning included in air duct cleaning?',
        answer:
          'It is a separate service. Dryer exhaust carries laundry air and lint; HVAC ducts distribute heating and cooling air. PAC’s July 2018 SoulCycle Culver City invoice records dryer exhaust cleaning specifically. Tell us if your property needs both systems serviced.',
      },
      {
        question: 'What should a Culver City property manager send for an estimate?',
        answer:
          'Send the property type, approximate size, number of HVAC units, dryer vent count if relevant, and access requirements. Photos of the equipment and exterior exhaust outlets can help us determine whether an on-site assessment is needed.',
      },
    ],
  },
  'century-city': {
    name: 'Century City',
    municipality: 'Los Angeles',
    summary:
      'Pure Air California provides air duct and HVAC cleaning for Century City homes, condominiums and commercial properties. In a managed building, we help define the service scope around tenant systems, shared equipment and the access approved by building management.',
    home:
      'For a Century City condo, begin with your building manager: identify equipment assigned to your unit, service access panels and rules for contractor visits. A unit’s dryer exhaust may connect to a common system that needs separate coordination.',
    commercial:
      'For office suites and larger properties, clarify whether the work covers a tenant space, common areas or central equipment. Provide any contractor documentation, loading dock, service elevator and after-hours access requirements before scheduling.',
    planning: [
      'Confirm the boundary between tenant equipment and building systems.',
      'Ask management about contractor documentation and service elevator bookings.',
      'Identify mechanical rooms, roof access and approved work hours.',
      'Request a written scope that names each system and component to be cleaned.',
    ],
    source: {
      label: 'City of Los Angeles: West Los Angeles community plan',
      url: 'https://planning.lacity.gov/plans-policies/community-plan-area/west-los-angeles',
    },
    faqs: [
      {
        question: 'Do you clean air ducts in Century City high-rise buildings?',
        answer:
          'We can assess duct and HVAC cleaning for managed residential and commercial buildings. Access and the proposed scope must be coordinated with building management, especially where equipment or ventilation is shared.',
      },
      {
        question: 'Can a tenant book cleaning for an entire office building?',
        answer:
          'A tenant should first confirm what equipment they control under their lease. Common-area or central HVAC work generally requires the property manager’s authorization. We can help prepare a scope for the authorized contact to review.',
      },
      {
        question: 'Can Century City work be scheduled outside office hours?',
        answer:
          'Tell us your preferred work window when you request an estimate. We will confirm crew availability, expected duration and building access before agreeing on an appointment; after-hours access is not assumed.',
      },
    ],
  },
  'santa-monica': {
    name: 'Santa Monica',
    municipality: 'Santa Monica',
    summary:
      'Pure Air California serves Santa Monica bungalows, coastal condos, multi-unit apartments, and Silicon Beach workplaces with inspection-first air duct, HVAC component, and dryer vent cleaning.',
    home:
      'For Santa Monica homes and coastal condos, share whether your HVAC unit sits in an attic, mechanical closet, or rooftop enclosure and whether your dryer vents to an exterior wall or shared HOA roof shaft. Coastal air makes checking exterior exhaust flaps and blower housings especially helpful.',
    commercial:
      'For Montana Avenue, Wilshire, and Third Street Promenade retail, hospitality, and office spaces, confirm landlord rooftop ladder access, alley loading clearance, and quiet work windows before finalizing the scope.',
    planning: [
      'Confirm preferential residential street-parking permits or alley staging near Ocean Park and Wilshire.',
      'Separate in-unit condo HVAC equipment from building-managed common dryer risers.',
      'Check exterior coastal vent louvers for salt-air corrosion or stuck dampers.',
      'Identify vintage hardwood floors and plaster grilles in 1920s–40s bungalows.',
    ],
    source: {
      label: 'City of Santa Monica planning & building resources',
      url: 'https://www.santamonica.gov/',
    },
    faqs: [
      {
        question: 'Can you clean dryer vents in Santa Monica apartments and multi-story condos?',
        answer:
          'Yes. Many Santa Monica buildings vent laundry exhaust through long interior chases or rooftop caps. Confirm whether your HOA or landlord manages the exterior termination so we can coordinate roof or ladder access and quote the exact run.',
      },
      {
        question: 'How does Santa Monica marine air affect HVAC ductwork and exterior vents?',
        answer:
          'Coastal moisture alone does not mean your ducts need chemical sprays, but salt air can corrode exterior exhaust hoods and accelerate dust clumping on evaporator coils and blower wheels. We inspect accessible components first and clean mechanically with HEPA negative-pressure extraction.',
      },
    ],
  },
  malibu: {
    name: 'Malibu',
    municipality: 'Malibu',
    summary:
      'Hillside and coastal homes along PCH and the Santa Monica Mountains make equipment access the first planning question. Share driveway width, gate instructions, stairs, and the location of each air handler before a visit.',
    home:
      'If wildfire smoke exposure, coastal salt mist, or renovation dust is a concern, describe what you notice at the vents. An inspection distinguishes accessible dust or ash removal from damaged flex duct or broader structural restoration—cleaning is not a re-entry clearance.',
    commercial:
      'For Malibu coastal retail, hospitality, and restaurant properties, separate comfort-air HVAC systems from laundry or kitchen exhaust and agree on parking and off-peak work windows before scheduling.',
    planning: [
      'Share PCH turn-in instructions, private-road gate codes, and steep driveway clearance.',
      'List separate heating and cooling air handlers across main homes and detached guest studios.',
      'Identify roof or wall dryer outlets and check ocean-facing caps for salt corrosion.',
      'Report visible ash, debris, or known duct damage during initial scoping.',
    ],
    source: {
      label: 'City of Malibu municipal resources',
      url: 'https://www.malibucity.org/',
    },
    faqs: [
      {
        question: 'Can air duct cleaning clear wildfire smoke odor in a Malibu canyon home?',
        answer:
          'Mechanical HEPA negative-pressure cleaning removes accessible soot, ash, and dust from ductwork, plenums, and blower housings. If smoke penetrated structural insulation, framing, or soft furnishings, duct cleaning is one step alongside filtration and restoration—not a standalone clearance.',
      },
      {
        question: 'Do you handle gated Point Dume and PCH beachfront properties with limited parking?',
        answer:
          'Yes. Share gate entry procedures and whether truck staging is on a driveway, courtyard, or PCH shoulder when requesting your estimate so our technicians bring portable HEPA extraction equipment sized for the carry distance.',
      },
    ],
  },
  'beverly-hills': {
    name: 'Beverly Hills',
    municipality: 'Beverly Hills',
    summary:
      'Air duct, multi-zone HVAC component, and dryer vent care for Beverly Hills estates, Wilshire Corridor condos, and Golden Triangle businesses begins with accurate system mapping, finish protection, and discrete scheduling.',
    home:
      'For larger residences north of Sunset or in The Flats, count physical HVAC air handlers separately from thermostat zones and flag custom Venetian plaster, stone floors, or recessed linear diffusers. Tool choice always matches the actual duct material.',
    commercial:
      'For Golden Triangle hotels, boutiques, medical offices, and managed Wilshire buildings, share vendor COI paperwork, loading bay access, and off-hours work windows before confirming a proposal.',
    planning: [
      'Inventory each physical air handler, guest house unit, and conditioned basement system.',
      'Flag custom plaster ceilings, delicate wood flooring, and recessed linear slot diffusers.',
      'Arrange Beverly Hills visitor parking permits, gate codes, or concierge sign-in.',
      'Confirm COI requirements and freight-elevator reservations for commercial suites.',
    ],
    source: {
      label: 'City of Beverly Hills municipal resources',
      url: 'https://www.beverlyhills.org/',
    },
    faqs: [
      {
        question: 'How do you protect custom plaster ceilings and linear slot diffusers in Beverly Hills homes?',
        answer:
          'Before opening any register, our technicians place floor runners and corner protection and inspect how architectural slot diffusers or painted decorative grilles are fastened. We match brush stiffness and negative-pressure ports to the actual duct material so finishes remain undisturbed.',
      },
      {
        question: 'Do Beverly Hills estates with three or four thermostats count as three or four HVAC systems?',
        answer:
          'Not necessarily—multiple motorized dampers can run off a single air handler, while larger homes often house two to four separate furnaces or fan coils in attic and closet chases. We verify the physical equipment count before confirming your written scope and price.',
      },
    ],
  },
  'sherman-oaks': {
    name: 'Sherman Oaks',
    municipality: 'Los Angeles',
    summary:
      'Plan air duct, heavy-AC coil, and dryer vent care for Sherman Oaks hillside homes, classic Valley ranch properties, and Ventura Boulevard condos and offices with a written scope matched to your equipment.',
    home:
      'For a split-level hillside home south of Ventura or a mid-century ranch north of US-101, share where each air handler sits and how it is accessed. Attic clearances, crawlspace runs, and pitched-roof dryer exits all affect time and scope.',
    commercial:
      'For Ventura Boulevard offices, medical suites, and multi-unit apartments, identify tenant equipment, shared laundry shafts, and authorized management contacts before confirming the schedule.',
    planning: [
      'Verify physical HVAC unit count versus zoned thermostats in split-level hillside homes.',
      'Describe hillside driveway slopes, stairs, and attic or crawlspace access points.',
      'Separate in-unit dryer exhaust from shared HOA rooftop laundry stacks.',
      'Confirm all included trunks, returns, and optional coil or dryer vent items in writing.',
    ],
    source: {
      label: 'City of Los Angeles: Sherman Oaks–Studio City–Toluca Lake community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Why do Sherman Oaks homes near the 405 and 101 often see faster dust buildup on air vents?',
        answer:
          'Major freeway traffic combined with long Valley summer air-conditioning cycles pulls elevated fine dust toward return grilles. Checking filter fit and periodically extracting return plenums and blower wheels helps keep systems cleaner.',
      },
      {
        question: 'How much does residential air duct and dryer vent cleaning start at in Sherman Oaks?',
        answer:
          'Single-system residential air duct cleaning starts at $299 and residential dryer vent cleaning starts at $149, with final pricing confirmed in writing based on your exact system count and vent routing.',
      },
    ],
  },
  westwood: {
    name: 'Westwood',
    municipality: 'Los Angeles',
    summary:
      'Westwood air duct and dryer vent cleaning serves Wilshire Corridor high-rise condominiums, UCLA-adjacent apartments, medical offices, and Holmby Hills estates with clear HOA and building-management coordination.',
    home:
      'Before booking a Wilshire Corridor condo visit, ask building management which fan-coil equipment belongs to your unit, where access panels sit, and what contractor entry rules apply. For Little Holmby homes, list each independent HVAC system.',
    commercial:
      'For Westwood Village offices, clinics, and managed multi-unit properties, share loading dock rules, service-elevator reservations, rooftop access, and COI paperwork requirements ahead of scheduling.',
    planning: [
      'Identify unit-owned fan coils versus shared building vertical risers.',
      'Reserve service elevators and loading bays for Wilshire Corridor towers.',
      'Submit vendor insurance paperwork required by property management.',
      'Confirm approved weekday contractor hours and parking arrangements.',
    ],
    source: {
      label: 'City of Los Angeles: Westwood community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Can Pure Air California work inside Wilshire Corridor high-rise condominiums in Westwood?',
        answer:
          'Yes. Confirm with your building manager which equipment belongs to your unit, what contractor insurance paperwork is required, and approved weekday freight-elevator windows so we coordinate smoothly.',
      },
      {
        question: 'Do you clean dryer vents for Westwood Village apartments and condos?',
        answer:
          'Yes. We clear individual in-unit dryer exhaust runs (starting at $149) and partner with Westwood property managers on multi-unit building dryer vent stacks.',
      },
    ],
  },
  hollywood: {
    name: 'Hollywood',
    municipality: 'Los Angeles',
    summary:
      'Plan air duct, HVAC component, and dryer exhaust care for Hollywood Hills residences, vintage courtyard apartments, production soundstages, and Sunset Boulevard commercial venues.',
    home:
      'For 1920s–30s Beachwood Canyon or Whitley Heights homes, point out fragile painted registers, steep stairs, and older duct retrofits. For newer podium apartments, note laundry exhaust length and roof or wall exit locations.',
    commercial:
      'For production studios, theaters, and offices across the Hollywood Media District, coordinate shoot or performance calendars, equipment protection, and separate wardrobe dryer exhaust scopes.',
    planning: [
      'Provide quiet-hour work windows around studio shoots, rehearsals, or performances.',
      'Share hillside street parking or commercial loading details before arrival.',
      'Separate wardrobe and hospitality laundry exhaust from comfort-air HVAC ducts.',
      'Flag vintage plaster finishes and older rigid or flex duct transitions.',
    ],
    source: {
      label: 'City of Los Angeles: Hollywood community plan',
      url: 'https://planning.lacity.gov/',
    },
    project: {
      text: 'PAC’s records identify past projects at Sunset Bronson Studios in 2018 and The Groundlings in 2026. The client archive identifies the locations and project years.',
      path: '/industries/',
    },
    faqs: [
      {
        question: 'Do you service Hollywood Hills homes as well as apartments and studios near Sunset Boulevard?',
        answer:
          'Yes. We cover all five Hollywood ZIP codes (90027, 90028, 90029, 90038, and 90068), including Beachwood Canyon, Whitley Heights, Thai Town, and the Media District. Let us know your street parking and building access details when booking.',
      },
      {
        question: 'Why do newer Hollywood podium apartments often experience slow clothes drying?',
        answer:
          'Multi-story podium apartments frequently route laundry exhaust through long horizontal ceilings or vertical roof shafts with multiple elbows and booster fans. Lint accumulates faster at bends and rooftop screens, making periodic mechanical dryer vent clearing essential.',
      },
    ],
  },
  pasadena: {
    name: 'Pasadena',
    municipality: 'Pasadena',
    summary:
      'Pure Air California provides inspection-first air duct, foothill smoke/ash, dryer vent, and HVAC component cleaning for Pasadena Craftsman homes, condos, cafés, and commercial buildings.',
    home:
      'For early-1900s Craftsman, Spanish, or Arroyo Seco homes, share basement, raised-crawlspace, or attic access along with any original wood floors or grilles needing protection. Note any recent renovation dust or foothill wind/smoke exposure.',
    commercial:
      'A Pasadena restaurant or retail estimate distinguishes dining-room comfort HVAC from cooking grease exhaust. Our documented Pasadena café project lists ventilation, plenum, blower/furnace box, and coil cleaning.',
    planning: [
      'Flag original hardwood floors, built-ins, and vintage registers for padded masking.',
      'Identify basement, raised-foundation crawlspace, or attic air-handler access.',
      'Inspect foothill return plenums after San Gabriel Santa Ana wind or smoke events.',
      'Separate comfort-air ventilation from commercial kitchen exhaust hoods.',
    ],
    source: {
      label: 'City of Pasadena municipal resources',
      url: 'https://www.cityofpasadena.net/',
    },
    project: {
      text: 'A January 2018 PAC service record identifies ventilation and HVAC component cleaning at the Panera Bread café in Pasadena.',
      path: '/case-studies/panera-pasadena-ventilation/',
    },
    faqs: [
      {
        question: 'Is air duct cleaning safe for older Pasadena Craftsman homes with retrofitted ductwork?',
        answer:
          'Yes, when the method matches the duct construction. Before agitating any run, we inspect whether your system uses rigid sheet metal, insulated flex, or older lined plenums and adjust suction and soft-bristle tools to protect seams and historic registers.',
      },
      {
        question: 'What should Pasadena homeowners check in their HVAC system after foothill smoke or ash?',
        answer:
          'Once local air advisories clear, change disposable filters and have an inspection check the return plenum, blower wheel, and accessible trunk lines for fine ash accumulation before running the system continuously.',
      },
    ],
  },
  'los-feliz': {
    name: 'Los Feliz',
    municipality: 'Los Angeles',
    summary:
      'Air duct and dryer vent care for Los Feliz hillside residences, historic Spanish and Mid-Century Modern homes, and Hillhurst/Vermont neighborhood businesses begins with careful access and material review.',
    home:
      'Older grilles, plaster walls, Batchelder tile, later additions, and steep Griffith Park hillside stairs are valuable details to share ahead of arrival so tools and protective coverings fit your exact home.',
    commercial:
      'For Hillhurst Avenue, Vermont Avenue, and Franklin Village cafés, shops, and offices, identify the equipment you control, opening hours, and landlord roof or alley access before locking in a schedule.',
    planning: [
      'Point out fragile vintage grilles, original plaster walls, and historic floor finishes.',
      'Describe hillside stairs, street parking clearance, and mechanical-closet routes.',
      'Note remodel history or separate guest/basement heating and cooling systems.',
      'Confirm comfort-air HVAC separately from restaurant kitchen or laundry exhaust.',
    ],
    source: {
      label: 'City of Los Angeles: Hollywood–Los Feliz community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'How do you safely clean ductwork in a 1920s Los Feliz Spanish or Craftsman home?',
        answer:
          'We inspect duct material, seams, and vintage grille fasteners before starting, use drop cloths and corner guards around original plaster and tile, and match negative-pressure HEPA suction and soft agitation to the system’s actual construction.',
      },
      {
        question: 'Do you serve restaurants, cafés, and shops along Hillhurst and Vermont in Los Feliz?',
        answer:
          'Yes. We clean comfort-air HVAC ductwork and commercial dryer vents for Los Feliz businesses—scheduling around opening hours and keeping comfort ventilation clearly separated from kitchen grease hoods.',
      },
    ],
  },
  'downtown-la': {
    name: 'Downtown LA',
    municipality: 'Los Angeles',
    summary:
      'Pure Air California cleans exposed spiral loft ductwork, high-rise condo fan coils, commercial office HVAC trunks, and multi-unit dryer vents throughout Downtown Los Angeles.',
    home:
      'For Arts District, Historic Core, and South Park lofts and condos, share your ceiling height, exposed spiral-duct layout, and HOA freight-elevator or dock rules so our crew arrives rigged for urban high-rise access.',
    commercial:
      'For Financial District towers, creative studios, and retail spaces inside the I-10/US-101/I-110 freeway loop, confirm building engineering contacts, COI documentation, and after-hours access windows.',
    planning: [
      'Reserve loading docks, freight elevators, and vendor garage access ahead of arrival.',
      'Note high loft ceiling heights and exposed spiral metal ductwork.',
      'Address elevated freeway-corridor fine particulate collecting on returns and coils.',
      'Separate tenant-controlled suites from base-building central ventilation risers.',
    ],
    source: {
      label: 'City of Los Angeles: Downtown Community Plan (DTLA 2040)',
      url: 'https://planning.lacity.gov/plans-policies/community-plan-update/downtown-los-angeles-community-plan-update',
    },
    faqs: [
      {
        question: 'Can you clean exposed galvanized spiral ductwork in Arts District and Historic Core lofts?',
        answer:
          'Yes. Exposed spiral metal runs in adaptive-reuse lofts are well suited to negative-pressure HEPA vacuuming and rotary agitation. Let us know your ceiling height and loft access rules so we bring the right ladder reach and floor protection.',
      },
      {
        question: 'How does freeway proximity affect indoor ductwork in Downtown Los Angeles?',
        answer:
          'Properties near the 10, 101, and 110 freeways pull elevated levels of fine dark urban particulate whenever windows open or filter racks leak bypass air. Pairing tighter filter fit with periodic return-duct and blower cleaning helps reduce indoor dust recirculation.',
      },
    ],
  },
  glendale: {
    name: 'Glendale',
    municipality: 'Glendale',
    summary:
      'Residential foothill, hillside, and commercial Brand Corridor air duct, HVAC component, and dryer vent cleaning across all Glendale ZIP codes (91201–91226).',
    home:
      'For Verdugo Woodlands, Rossmoyne, Adams Hill, and Chevy Chase homes, share hillside driveway clearance, multi-level attic or crawlspace access, and whether seasonal Verdugo foothill winds or remodeling prompted the visit.',
    commercial:
      'For Brand Boulevard, Central Avenue, and Montrose offices and mixed-use buildings, distinguish tenant HVAC from residential units above and confirm building management roof or loading access.',
    planning: [
      'Share hillside driveway slopes and narrow street parking details before dispatch.',
      'Separate routine seasonal cleaning from post-wind or smoke-ash duct inspections.',
      'Verify attic scuttle and basement crawlspace locations in 1920s–40s hillside homes.',
      'Separate restaurant comfort-air ductwork from commercial kitchen exhaust hoods.',
    ],
    source: {
      label: 'City of Glendale community development resources',
      url: 'https://www.glendaleca.gov/',
    },
    faqs: [
      {
        question: 'Do you serve Montrose, La Crescenta-border ZIPs, and hillside areas of Glendale?',
        answer:
          'Yes. We cover Glendale across 91201 through 91226, including Rossmoyne, Adams Hill, Verdugo Woodlands, Chevy Chase Canyon, and Sparr Heights. Share your exact ZIP code and driveway access when booking so we bring appropriate portable equipment.',
      },
      {
        question: 'Why do Glendale foothill homes often need return-duct and coil checks after Santa Ana winds?',
        answer:
          'Dry downslope winds off the Verdugo Mountains push fine hillside dust and seasonal ash around attic vents and older filter racks. Inspecting return plenums, filter seals, and blower wheels verifies whether mechanical HEPA extraction is warranted.',
      },
    ],
  },
  burbank: {
    name: 'Burbank',
    municipality: 'Burbank',
    summary:
      'Inspection-led residential, hillside, and Media District studio air duct and dryer vent cleaning across Burbank (91501–91506).',
    home:
      'For post-war Burbank ranch homes, Rancho District properties, and hillside homes above Glenoaks, list your main attic unit along with any backyard ADUs or converted garages and confirm whether laundry vents exit through the wall or roof.',
    commercial:
      'For Burbank Media District studios, production offices, and downtown storefronts, share studio quiet hours, technical room restrictions, and rooftop package-unit access before quoting.',
    planning: [
      'Identify main attic air handlers plus any independent backyard ADU systems.',
      'Coordinate off-hours or quiet windows around Media District editing and soundstages.',
      'Inspect return plenums and coils loaded by prolonged eastern Valley summer cooling.',
      'Check long or roof-terminated residential and multi-unit dryer exhaust runs.',
    ],
    source: {
      label: 'City of Burbank community development resources',
      url: 'https://www.burbankca.gov/',
    },
    faqs: [
      {
        question: 'Do you clean both residential homes and commercial studios in Burbank?',
        answer:
          'Yes. We serve single-family homes, duplexes, HOAs, retail spaces, and commercial studios across 91501–91506. For commercial spaces, share equipment locations and preferred off-hours access windows when requesting a written quote.',
      },
      {
        question: 'How often should Burbank homeowners inspect air ducts and dryer vents?',
        answer:
          'Dryer vents generally benefit from annual inspection and lint clearing (starting at $149), while air ducts are cleaned based on inspection findings—typically every few years, after remodeling, or following heavy summer AC dust buildup.',
      },
    ],
  },
  'studio-city': {
    name: 'Studio City',
    municipality: 'Los Angeles',
    summary:
      'Air duct, hillside HVAC, and dryer vent cleaning for Studio City residences in Colfax Meadows, Silver Triangle, Fryman Canyon, and Ventura Boulevard condos and businesses.',
    home:
      'For Studio City homes with hillside lower levels, second-story additions, or detached guest units, list every physical air handler and share driveway slope or stair carry-ins so we arrive ready.',
    commercial:
      'For Ventura Boulevard retail plazas, offices, and multi-story condos, coordinate property-manager parking, rooftop ladder access, and shared dryer-vent riser boundaries.',
    planning: [
      'Count separate air handlers rather than thermostat zones in remodeled hillside homes.',
      'Share Fryman Canyon and Mulholland-corridor driveway or stair staging details.',
      'Inspect attic returns affected by summer Valley AC cycles and canyon tree pollen.',
      'Verify HOA roof access for multi-story Ventura Blvd condominium dryer vents.',
    ],
    source: {
      label: 'City of Los Angeles: Sherman Oaks–Studio City community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'What affects air duct cleaning pricing for a Studio City hillside home?',
        answer:
          'Single-system residential duct cleaning starts at $299, with final written pricing based on the number of separate HVAC units, register count, attic or crawlspace access, and whether HVAC coil or dryer vent cleaning is added.',
      },
      {
        question: 'Can you clean dryer vents that exit through a second-story wall or steep roof in Studio City?',
        answer:
          'Yes. Tell us where the laundry room sits and whether the exhaust exits at a side wall or pitched roof so our crew arrives prepared with the right rotary brushes, roof safety gear, and airflow gauges.',
      },
    ],
  },
  encino: {
    name: 'Encino',
    municipality: 'Los Angeles',
    summary:
      'Multi-zone estate, Valley ranch home, and Ventura Boulevard medical and professional office air duct and dryer vent cleaning in Encino (91316 & 91436).',
    home:
      'For south-of-Ventura Encino estates and remodeled north-of-Ventura homes, list every physical HVAC furnace or fan coil, guest house, and long laundry vent so your written estimate covers the complete layout.',
    commercial:
      'For Ventura Boulevard medical suites, clinics, and commercial office plazas, share building management contacts, rooftop unit locations, and off-hours work windows.',
    planning: [
      'Separate physical HVAC system counts from multi-zone thermostat controls.',
      'Inspect dual attic and garage air handlers stressed by triple-digit Valley summers.',
      'Protect fine stone flooring, custom cabinetry, and high ceilings during service.',
      'Coordinate after-hours access for Ventura Blvd medical and professional offices.',
    ],
    source: {
      label: 'City of Los Angeles: Encino–Tarzana community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Why should Encino homeowners confirm system count before comparing duct cleaning quotes?',
        answer:
          'Many south-of-Ventura Encino estates run two or three separate HVAC units for upstairs, downstairs, and guest wings. A low teaser quote covering one trunk will not reflect a multi-system home—we itemize every included unit in writing before starting.',
      },
      {
        question: 'Do you clean medical and office HVAC ductwork along Ventura Boulevard in Encino?',
        answer:
          'Yes. We provide commercial duct and HVAC component cleaning for Encino offices, clinics, and retail suites, coordinating with building management on rooftop access and off-hours work windows.',
      },
    ],
  },
  'woodland-hills': {
    name: 'Woodland Hills',
    municipality: 'Los Angeles',
    summary:
      'Heavy-cooling-season air duct, evaporator coil, and dryer vent cleaning for Woodland Hills homes, Walnut Acres estates, and Warner Center offices and luxury apartments.',
    home:
      'For Walnut Acres ranch homes and south-of-Ventura hillside properties, note attic or garage air-handler locations and heavy summer cooling runtimes so we inspect returns, blower wheels, and accessible coils thoroughly.',
    commercial:
      'For Warner Center offices, hotels, and multi-unit luxury apartments, coordinate freight elevators, COI documentation, roof exhaust terminations, and phased scheduling.',
    planning: [
      'Inspect evaporator coils and return trunks strained by extreme West Valley summer heat.',
      'Coordinate Warner Center building COI paperwork, docks, and quiet work windows.',
      'Share south-of-Ventura hillside driveway clearance and multi-level access details.',
      'Itemize separate pool-house or guest-unit HVAC systems on large Walnut Acres lots.',
    ],
    source: {
      label: 'City of Los Angeles: Warner Center 2035 & Canoga Park–Woodland Hills plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Does Woodland Hills summer heat affect air duct and HVAC coil buildup?',
        answer:
          'High summer runtimes move far more air across filters, blower wheels, and evaporator coils than coastal climates. When dust bypasses loose filters or collects on damp cooling coils, airflow drops—making periodic coil and duct inspection especially valuable in 91364 and 91367.',
      },
      {
        question: 'Do you handle multi-unit dryer vent and duct projects in Warner Center apartments and condos?',
        answer:
          'Yes. We work with Woodland Hills HOA boards and property managers to scope multi-unit dryer exhaust stacks, roof terminations, and common-area HVAC ducts with written per-building plans.',
      },
    ],
  },
  'west-hollywood': {
    name: 'West Hollywood',
    municipality: 'West Hollywood',
    summary:
      'Air duct, HOA dryer vent, and commercial HVAC cleaning for West Hollywood courtyard apartments, mid-rise condos, Norma Triangle cottages, and Sunset Strip and Melrose Design District workplaces.',
    home:
      'For West Hollywood condos and 1920s–30s courtyard apartments, confirm permit-zone visitor parking, HOA entry rules, and whether laundry exhaust runs through interior ceilings or shared roof shafts.',
    commercial:
      'For Sunset Strip hotels, Melrose showrooms, and Santa Monica Boulevard creative offices, itemize each independent air handler and schedule around guest or showroom hours.',
    planning: [
      'Arrange West Hollywood visitor parking permits, garage height clearance, or loading zones.',
      'Verify HOA vs. owner responsibility for condo rooftop dryer exhaust risers.',
      'Protect vintage woodwork, courtyard pathways, and custom showroom interiors.',
      'Itemize multi-unit office systems individually for clear closeout documentation.',
    ],
    source: {
      label: 'City of West Hollywood municipal resources',
      url: 'https://www.weho.org/',
    },
    faqs: [
      {
        question: 'Can Pure Air California service apartments and condos in West Hollywood with strict permit parking?',
        answer:
          'Yes. Let us know whether guest garage parking, loading bays, or a city visitor parking hangtag is available so we stage our HEPA equipment cleanly without risking delays.',
      },
      {
        question: 'Why do West Hollywood condos often need dryer vent cleaning even when the dryer is relatively new?',
        answer:
          'Many West Hollywood condo floor plans place laundry closets inside interior hallways with 20- to 40-foot exhaust runs and multiple 90-degree bends leading to the roof or alley wall, trapping lint far faster than short exterior runs.',
      },
    ],
  },
  koreatown: {
    name: 'Koreatown',
    municipality: 'Los Angeles',
    summary:
      'High-density apartment, condo HOA, Wilshire office, and dining-plaza air duct and dryer vent cleaning across Koreatown (90005, 90006, 90010, 90020).',
    home:
      'For Koreatown condo towers and Art Deco or mid-century apartments, confirm management contractor entry rules, garage clearance, and whether your dryer vents out an exterior wall or into a common vertical stack.',
    commercial:
      'For Wilshire Boulevard offices, retail centers, and dining plazas, separate comfort-air HVAC from commercial kitchen exhaust hoods and schedule around peak business hours.',
    planning: [
      'Confirm underground garage clearance, loading zones, and freight-elevator slots.',
      'Scope multi-unit HOA dryer vent stacks and shared laundry rooms systematically.',
      'Inspect return grilles and coils burdened by dense Wilshire and Olympic traffic dust.',
      'Keep dining-room comfort ventilation separate from commercial grease hood cleaning.',
    ],
    source: {
      label: 'City of Los Angeles: Wilshire community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Do you handle multi-unit dryer vent cleaning for Koreatown apartment buildings and HOAs?',
        answer:
          'Yes. We coordinate with Koreatown property managers and HOA boards to clean shared vertical dryer risers, roof terminations, and individual unit vents with written building scopes.',
      },
      {
        question: 'Can an individual Koreatown condo or apartment resident book air duct cleaning?',
        answer:
          'Yes, provided your unit has dedicated HVAC equipment and building management approves contractor entry and parking. Share your building’s rules when requesting a free estimate.',
      },
    ],
  },
  'pacific-palisades': {
    name: 'Pacific Palisades',
    municipality: 'Los Angeles',
    summary:
      'Inspection-first air duct, post-remodel dust, coastal HVAC, and dryer vent care across Pacific Palisades (90272), with honest scope verification separating mechanical cleaning from restoration.',
    home:
      'Confirm cleared site access and describe any remodeling dust, coastal moisture, or regional smoke exposure upfront. Our inspection verifies whether accessible HEPA source removal fits your ducts or if damaged flex lines need HVAC replacement.',
    commercial:
      'For Palisades Village and Sunset Boulevard retail and office spaces, confirm landlord mechanical access, operating hours, and separate comfort-air versus exhaust scopes.',
    planning: [
      'Confirm cleared property access and share any smoke, ash, or nearby construction context.',
      'Distinguish accessible mechanical duct cleaning from structural remediation or duct replacement.',
      'Note multi-zone hillside layouts, canyon parking clearance, and roof dryer terminations.',
      'Check ocean-facing exterior louvers and filter cabinets for salt-air wear and bypass leaks.',
    ],
    source: {
      label: 'City of Los Angeles: Brentwood–Pacific Palisades community plan',
      url: 'https://planning.lacity.gov/plans-policies/community-plan-area/brentwood-pacific-palisades',
    },
    faqs: [
      {
        question: 'Should I schedule air duct cleaning in Pacific Palisades after nearby construction or wildfire smoke?',
        answer:
          'Start with an inspection once site access and local advisories are clear. We check accessible return trunks, plenums, and blower housings for ash or fine drywall dust and tell you honestly whether mechanical HEPA cleaning fits your system or if damaged flex duct needs HVAC replacement.',
      },
      {
        question: 'Do you offer post-remodel dust extraction for newly renovated Palisades homes?',
        answer:
          'Yes. Running central HVAC during drywall sanding or wood-floor refinishing pulls fine construction dust deep into return chases. Negative-pressure HEPA extraction clears accessible ducts before move-in.',
      },
    ],
  },
  calabasas: {
    name: 'Calabasas',
    municipality: 'Calabasas',
    summary:
      'Guard-gated estate, multi-zone hillside home, and Parkway Calabasas commercial air duct and dryer vent cleaning in Calabasas (91302).',
    home:
      'For homes in The Oaks, Calabasas Park, and Mountain View Estates, arrange guard-gate vendor clearance ahead of time and list every separate air handler, guest casita, and pitched-roof dryer vent.',
    commercial:
      'For Parkway Calabasas and Commons-corridor offices, clinics, and retail suites, share property-manager rooftop access rules and preferred after-hours service windows.',
    planning: [
      'Pre-register technician vehicles and weekday contractor windows with community guard gates.',
      'Map independent upstairs, downstairs, and detached casita air handlers separately.',
      'Inspect attic return plenums for Santa Ana foothill wind dust or residual smoke odor.',
      'Verify safe access for second-story and tile-roof dryer exhaust terminations.',
    ],
    source: {
      label: 'City of Calabasas municipal resources',
      url: 'https://www.cityofcalabasas.com/',
    },
    faqs: [
      {
        question: 'Can you coordinate guard-gate entry for gated communities in Calabasas?',
        answer:
          'Yes. Let us know your community’s gate-pass procedure and approved weekday vendor hours when booking so our crew clears security smoothly and arrives on schedule.',
      },
      {
        question: 'How do you clean second-story roof dryer vents on tile-roofed Calabasas homes?',
        answer:
          'Whenever possible we clear the full exhaust path from the interior laundry connection using rotary agitation and HEPA capture, and inspect exterior roof or gable terminations safely—confirming tile-roof access limitations before starting.',
      },
    ],
  },
  'north-hollywood': {
    name: 'North Hollywood',
    municipality: 'Los Angeles',
    summary:
      'Air duct, studio-aware commercial HVAC, and multi-unit dryer vent cleaning across the NoHo Arts District and North Hollywood neighborhoods (91601–91607).',
    home:
      'For 1940s–50s single-family Valley homes and backyard ADUs, share attic-hatch locations and unit counts. For NoHo Arts District apartments and condos, confirm HOA parking and shared dryer-vent access.',
    commercial:
      'For NoHo recording studios, theaters, dance spaces, and Lankershim storefronts, schedule around session or show calendars and flag acoustic or lighting gear along equipment routes.',
    planning: [
      'Coordinate quiet windows around NoHo Arts District studio sessions and performances.',
      'Confirm HOA parking and roof-vent access for multi-story Lankershim apartments.',
      'List separate backyard ADU systems alongside primary post-war house ductwork.',
      'Inspect attic returns stressed by East Valley summer AC cycles and SR-170 dust.',
    ],
    source: {
      label: 'City of Los Angeles: North Hollywood–Valley Village community plan',
      url: 'https://planning.lacity.gov/',
    },
    faqs: [
      {
        question: 'Do you clean air ducts for recording studios and theaters in the NoHo Arts District?',
        answer:
          'Yes. We coordinate around studio bookings and performance calendars, protect sensitive audio or lighting gear along access paths, and confirm written system scopes before work begins.',
      },
      {
        question: 'Can you service multi-unit apartment dryer vents in North Hollywood?',
        answer:
          'Yes. We clean individual residential vents (starting at $149) and commercial or HOA multi-family dryer exhaust stacks across all North Hollywood ZIP codes (91601–91607).',
      },
    ],
  },
};
