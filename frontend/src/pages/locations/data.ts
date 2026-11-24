export interface LocationEntry {
  name: string;
  slug: string;
  /** Keys into REGION_CONTENT in ./regionContent.ts. */
  region: string;
  /** Per-city prose. Unique for every entry — this is the page's differentiator. */
  localContext: string;
  image: string;
  description: string;
  zipCodes: string[];
  county: string;
  challenges: string[];
  /** Real reviews only. See data/googleReviews.ts — never fabricate these. */
  testimonials: unknown[];
  /**
   * What the crews actually find in this city: system types that recur, access
   * quirks, what the local conditions do in practice. Optional, and empty on most
   * entries today.
   *
   * This is the highest-value field on the record and the only one that cannot be
   * derived from geography or produced from a template. Measured on the built
   * output, a city page is 961 words of which ~278 are unique to it; everything
   * else is shared with the other 53. Google indexes a page when it is worth its
   * own slot, so that ratio is the single thing holding these pages back.
   *
   * Two or three sentences of genuine observation here is worth more than any
   * amount of rephrasing the template. Run `npm run locations:report` to see which
   * cities are still missing it.
   */
  fieldNotes?: string;
  /**
   * Researched profile of the area and what its conditions mean for a duct system.
   *
   * Drawn from public record — development history, HPOZ designations, documented
   * fire history, the 1999 Adaptive Reuse Ordinance, terrain and climate. It is
   * deliberately written in the third person about the AREA, never as a first-person
   * claim about jobs we have done: that distinction is what separates this from the
   * 54 invented per-city testimonials that had to be removed from this site once
   * already (see data/googleReviews.ts).
   *
   * `fieldNotes` is the complement to this — the crew's own observations, which no
   * amount of research can substitute for.
   */
  localProfile?: string;
}

export const locationData: LocationEntry[] = [
  {
    "name": "Santa Monica",
    slug: "santa-monica",
    "region": "coastal",
    "localContext": "For a Santa Monica condo or apartment, confirm whether the equipment and dryer exhaust belong to your unit or the building. Ask management about shared-system access, parking and approved appointment hours before requesting a final scope.",
    "image": "/images/locations/santa-monica.jpg",
    "description": "Coastal air duct & dryer vent cleaning for homes and businesses in Santa Monica.",
    "zipCodes": [
      "90401",
      "90402",
      "90403",
      "90404",
      "90405"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Identify the HVAC units and the spaces they serve.",
      "Report visible moisture or equipment damage for assessment.",
      "Confirm roof, attic or mechanical-room access.",
      "List dryer exhaust separately if it also needs service."
    ],
    "testimonials": []
  },
  {
    "name": "Beverly Hills",
    slug: "beverly-hills",
    "region": "westside",
    "localContext": "For a Beverly Hills property with several air handlers, list each system and the spaces it serves. Tell us about additions, separate guest spaces and finishes that need protection so the estimate can reflect the actual layout.",
    "image": "/images/locations/beverly-hills.jpg",
    "description": "Premium air duct cleaning for luxury estates and commercial properties in Beverly Hills.",
    "zipCodes": [
      "90210",
      "90211",
      "90212"
    ],
    "county": "Los Angeles",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "testimonials": []
  },
  {
    "name": "Glendale",
    slug: "glendale",
    "region": "foothill",
    "localContext": "For a Glendale home with equipment in more than one location, identify each access point before the visit. For a mixed-use property, separate residential systems from the commercial equipment and confirm who can authorize each part of the work.",
    "image": "/images/locations/glendale.jpg",
    "description": "Expert HVAC and air duct cleaning services for residential and commercial clients in Glendale.",
    "zipCodes": [
      "91201",
      "91202",
      "91203",
      "91204",
      "91205",
      "91206",
      "91207",
      "91208",
      "91209",
      "91210",
      "91214",
      "91221",
      "91222",
      "91224",
      "91225",
      "91226"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Describe vehicle and equipment access.",
      "Identify each unit and any detached spaces.",
      "Document the event or condition that prompted the call.",
      "Confirm the proposed work and any separate assessment."
    ],
    "testimonials": []
  },
  {
    "name": "Malibu",
    slug: "malibu",
    "region": "coastal",
    "localContext": "When planning a Malibu appointment, include gate instructions, parking arrangements and the location of the equipment. If access involves a hillside, roof or detached building, discuss the arrangement with the estimator rather than assuming it is included.",
    "image": "/images/locations/malibu.jpg",
    "description": "Specialized air quality solutions for coastal homes and properties in Malibu.",
    "zipCodes": [
      "90263",
      "90264",
      "90265"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Identify the HVAC units and the spaces they serve.",
      "Report visible moisture or equipment damage for assessment.",
      "Confirm roof, attic or mechanical-room access.",
      "List dryer exhaust separately if it also needs service."
    ],
    "testimonials": []
  },
  {
    "name": "Century City",
    slug: "century-city",
    "region": "urban-core",
    "localContext": "For a Century City building, establish whether the proposed service covers a tenant system or central equipment. Coordinate contractor documents, service elevators and mechanical-room access with the authorized property contact.",
    "image": "/images/locations/century-city.jpg",
    "description": "Professional ventilation cleaning for high-rise offices and residences in Century City.",
    "zipCodes": [
      "90067"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "testimonials": []
  },
  {
    "name": "Hollywood",
    slug: "hollywood",
    "region": "urban-core",
    "localContext": "For a Hollywood studio, workplace or home, describe the hours when the space is in use and any equipment that needs protection. If filming, rehearsals or other activities affect access, include those constraints when planning the service window.",
    "image": "/images/locations/hollywood.jpg",
    "description": "Full-service air duct cleaning for production studios and homes in historic Hollywood.",
    "zipCodes": [
      "90027",
      "90028",
      "90029",
      "90038",
      "90068"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "testimonials": []
  },
  {
    "name": "Downtown LA",
    slug: "downtown-la",
    "region": "urban-core",
    "localContext": "For a Downtown LA building, check loading-dock and service-elevator arrangements before selecting a work date. Identify tenant-controlled systems separately from common equipment and nominate a building contact who can authorize access.",
    "image": "/images/locations/downtown-la.jpg",
    "description": "Comprehensive air quality services for the diverse businesses and lofts of Downtown LA.",
    "zipCodes": [
      "90012",
      "90013",
      "90014",
      "90015",
      "90017",
      "90021",
      "90071"
    ],
    "county": "Los Angeles",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "testimonials": []
  },
  {
    "name": "Ventura",
    slug: "ventura",
    "region": "coastal",
    "localContext": "PAC can discuss service for Ventura properties as part of its selected surrounding-area coverage. Confirm the service address, equipment count and crew availability before planning access or notifying tenants.",
    "challenges": [
      "Identify the HVAC units and the spaces they serve.",
      "Report visible moisture or equipment damage for assessment.",
      "Confirm roof, attic or mechanical-room access.",
      "List dryer exhaust separately if it also needs service."
    ],
    "image": "/images/locations/ventura.jpg",
    "description": "Reliable air duct and dryer vent cleaning for the Ventura coastal community.",
    "zipCodes": [
      "93001",
      "93003",
      "93004"
    ],
    "county": "Ventura",
    "testimonials": []
  },
  {
    "name": "Pasadena",
    slug: "pasadena",
    "region": "foothill",
    "localContext": "For a Pasadena property with older finishes or remodeled rooms, identify where equipment and access panels are located. Tell us about areas that must remain protected and ask how the proposed tools suit the duct material.",
    "challenges": [
      "Describe vehicle and equipment access.",
      "Identify each unit and any detached spaces.",
      "Document the event or condition that prompted the call.",
      "Confirm the proposed work and any separate assessment."
    ],
    "image": "/images/locations/pasadena.jpg",
    "description": "Quality air quality maintenance for the beautiful homes and landmarks of Pasadena.",
    "zipCodes": [
      "91101",
      "91103",
      "91104",
      "91105",
      "91106",
      "91107"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Burbank",
    slug: "burbank",
    "region": "san-fernando-valley",
    "localContext": "For a Burbank office or production-related space, include operating hours and room-access restrictions in the request. For a house, note whether additions or detached spaces have separate systems that need their own scope.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/burbank.jpg",
    "description": "Professional cleaning for studios and family homes in the Media Capital, Burbank.",
    "zipCodes": [
      "91501",
      "91502",
      "91504",
      "91505",
      "91506"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Studio City",
    slug: "studio-city",
    "region": "san-fernando-valley",
    "localContext": "For a Studio City property, tell us whether the system serves one living space or several zones. Include parking and equipment-access details, and identify any guest unit or converted space with independent heating and cooling.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/studio-city.jpg",
    "description": "Top-rated air duct and HVAC cleaning services in the heart of Studio City.",
    "zipCodes": [
      "91604"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Encino",
    slug: "encino",
    "region": "san-fernando-valley",
    "localContext": "For an Encino home with more than one HVAC unit, keep the equipment count separate from the room count. Ask the estimator to identify the ductwork and components covered by each system’s quoted scope.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/encino.jpg",
    "description": "Expert air duct and HVAC cleaning for residents and businesses in the Encino area.",
    "zipCodes": [
      "91316",
      "91436"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Tarzana",
    slug: "tarzana",
    "region": "san-fernando-valley",
    "localContext": "For a Tarzana property with an addition or renovation history, describe which rooms were changed and whether equipment was added. This helps the assessment focus on the current layout rather than assumptions based on the original home.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/tarzana.jpg",
    "description": "Professional air quality services tailored for the unique homes of Tarzana.",
    "zipCodes": [
      "91356"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Reseda",
    slug: "reseda",
    "region": "san-fernando-valley",
    "localContext": "For a Reseda rental or multifamily property, confirm access to each unit and identify who can approve the work. Shared laundry exhaust should be listed separately from individual heating and cooling systems.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/reseda.jpg",
    "description": "Reliable and efficient air duct cleaning for the Reseda community.",
    "zipCodes": [
      "91335"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Canoga Park",
    slug: "canoga-park",
    "region": "san-fernando-valley",
    "localContext": "For a Canoga Park restaurant, retail space or home, identify the ventilation system involved before comparing quotes. PAC’s project library includes a local restaurant HVAC scope; cooking exhaust and comfort-air ductwork should still be specified separately.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/canoga-park.jpg",
    "description": "High-quality ventilation and air duct cleaning in Canoga Park.",
    "zipCodes": [
      "91303",
      "91304",
      "91306",
      "91307"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Woodland Hills",
    slug: "woodland-hills",
    "region": "san-fernando-valley",
    "localContext": "For a Woodland Hills office or home, provide the number of systems and the equipment locations. If the property needs work outside its usual operating hours, confirm a suitable window and authorized access before booking.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/woodland-hills.jpg",
    "description": "Premium HVAC maintenance and air duct cleaning for Woodland Hills properties.",
    "zipCodes": [
      "91364",
      "91367"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Calabasas",
    slug: "calabasas",
    "region": "canyon",
    "localContext": "For a Calabasas appointment, arrange any gate or community access requirements in advance. List separate systems, guest spaces and mechanical areas so the crew and property contact can plan a realistic visit.",
    "challenges": [
      "Provide entry, parking and equipment-route details.",
      "List systems serving separate parts of the property.",
      "Identify difficult access without opening sealed equipment.",
      "Ask how inaccessible areas will be documented."
    ],
    "image": "/images/locations/calabasas.jpg",
    "description": "Discreet and professional air quality services for luxury homes in Calabasas.",
    "zipCodes": [
      "91302"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Valley Village",
    slug: "valley-village",
    "region": "san-fernando-valley",
    "localContext": "For a Valley Village duplex, apartment or house, establish whether each space has its own equipment. Keep tenant permissions, common-area access and any shared dryer exhaust within the planning conversation.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/valley-village.jpg",
    "description": "Trusted local experts for all your air duct cleaning needs in Valley Village.",
    "zipCodes": [
      "91607"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Van Nuys",
    slug: "van-nuys",
    "region": "san-fernando-valley",
    "localContext": "For a Van Nuys commercial property, begin with an equipment list and the areas each unit serves. Roof access, loading and occupied work zones should be discussed alongside the cleaning scope rather than left until arrival.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/van-nuys.jpg",
    "description": "Efficient and thorough air duct cleaning for homes and businesses in Van Nuys.",
    "zipCodes": [
      "91401",
      "91403",
      "91405",
      "91406",
      "91411",
      "91423"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Panorama City",
    slug: "panorama-city",
    "region": "san-fernando-valley",
    "localContext": "For a Panorama City apartment or commercial building, identify the authorized manager and how access to individual spaces will be arranged. Ask which ventilation components are shared before requesting work on a single unit.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/panorama-city.jpg",
    "description": "Improving indoor air quality for the Panorama City community through expert cleaning.",
    "zipCodes": [
      "91402"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Northridge",
    slug: "northridge",
    "region": "san-fernando-valley",
    "localContext": "For a Northridge rental home or shared household, coordinate a visit that allows access to the agreed vents and equipment. Name one contact to confirm the scope, entry arrangements and approval of any additional work.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/northridge.jpg",
    "description": "Specialized HVAC system and air duct cleaning services in Northridge.",
    "zipCodes": [
      "91324",
      "91325",
      "91326",
      "91330"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Sun Valley",
    slug: "sun-valley",
    "region": "san-fernando-valley",
    "localContext": "For a Sun Valley workshop or business, distinguish comfort HVAC from process exhaust or dust collection. Describe the system’s purpose and the materials involved so an ordinary duct-cleaning scope is not mistaken for specialized industrial work.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/sun-valley.jpg",
    "description": "Expert air duct and dryer vent cleaning for homes and workshops in Sun Valley.",
    "zipCodes": [
      "91352"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Central LA",
    slug: "central-la",
    "region": "urban-core",
    "localContext": "For a Central LA property, share the service address and the actual building layout when requesting an estimate. In a mixed residential and commercial building, identify which equipment serves each use and who controls it.",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "image": "/images/locations/central-la.jpg",
    "description": "Reliable air quality solutions for residential and commercial buildings across Central LA.",
    "zipCodes": [
      "90004",
      "90005",
      "90006",
      "90010",
      "90019",
      "90020",
      "90026",
      "90036",
      "90057"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Pacific Palisades",
    slug: "pacific-palisades",
    "region": "coastal",
    "localContext": "For a Pacific Palisades property affected by renovation, smoke or another event, describe what happened and whether access has been cleared. Discuss the actual system condition and any restoration needs before choosing a cleaning scope.",
    "challenges": [
      "Identify the HVAC units and the spaces they serve.",
      "Report visible moisture or equipment damage for assessment.",
      "Confirm roof, attic or mechanical-room access.",
      "List dryer exhaust separately if it also needs service."
    ],
    "image": "/images/locations/pacific-palisades.jpg",
    "description": "Expert air duct and HVAC cleaning for coastal properties in Pacific Palisades.",
    "zipCodes": [
      "90272"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Brentwood",
    slug: "brentwood",
    "region": "westside",
    "localContext": "For a Brentwood house or condo, identify the equipment and confirm whether any ventilation is shared. PAC’s local project history includes studio dryer exhaust; the right service for your property still depends on its own systems.",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "image": "/images/locations/brentwood.jpg",
    "description": "Discreet and thorough air quality services for the estates and homes of Brentwood.",
    "zipCodes": [
      "90049"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Los Feliz",
    slug: "los-feliz",
    "region": "historic",
    "localContext": "For a Los Feliz property with original finishes or later additions, discuss access and duct material before approving the work. Identify areas that require special care and avoid assuming that every room connects to the same system.",
    "challenges": [
      "Describe renovations or layout changes.",
      "Identify finishes and areas requiring protection.",
      "Ask about tool suitability for the duct material.",
      "Confirm the included systems and access limitations."
    ],
    "image": "/images/locations/los-feliz.jpg",
    "description": "Professional ventilation cleaning for the character homes and businesses of Los Feliz.",
    "zipCodes": [
      "90027",
      "90039"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Culver City",
    slug: "culver-city",
    "region": "westside",
    "localContext": "For a Culver City studio, office or home, list HVAC equipment and any laundry exhaust separately. Include operating hours, tenant requirements and access arrangements so the service plan matches the way the space is used.",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "image": "/images/locations/culver-city.jpg",
    "description": "Reliable air duct cleaning for production studios and residences in Culver City.",
    "zipCodes": [
      "90230",
      "90231",
      "90232",
      "90233"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "West Hollywood",
    slug: "west-hollywood",
    "region": "historic",
    "localContext": "For a West Hollywood office or apartment, begin with the equipment count and the person responsible for access. PAC’s office project record shows how four systems can be listed individually within one written scope.",
    "challenges": [
      "Describe renovations or layout changes.",
      "Identify finishes and areas requiring protection.",
      "Ask about tool suitability for the duct material.",
      "Confirm the included systems and access limitations."
    ],
    "image": "/images/locations/west-hollywood.jpg",
    "description": "Expert air quality maintenance for the vibrant apartments and shops of West Hollywood.",
    "zipCodes": [
      "90046",
      "90069"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Chatsworth",
    slug: "chatsworth",
    "region": "san-fernando-valley",
    "localContext": "For a Chatsworth property with a workshop, warehouse or detached structure, identify which systems are part of the request. A separate building or process-exhaust system may require a different assessment from the main property’s comfort HVAC.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/chatsworth.jpg",
    "description": "Expert air duct and HVAC cleaning for homes and industrial properties in Chatsworth.",
    "zipCodes": [
      "91311"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Laurel Canyon",
    slug: "laurel-canyon",
    "region": "canyon",
    "localContext": "For a Laurel Canyon appointment, describe parking, steps and the route to the equipment. If the ductwork is difficult to reach, ask the estimator how access limitations will be handled and recorded before work begins.",
    "challenges": [
      "Provide entry, parking and equipment-route details.",
      "List systems serving separate parts of the property.",
      "Identify difficult access without opening sealed equipment.",
      "Ask how inaccessible areas will be documented."
    ],
    "image": "/images/locations/laurel-canyon.jpg",
    "description": "Reducing dust and allergens for the unique canyon homes of Laurel Canyon.",
    "zipCodes": [
      "90046"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Fairfax",
    slug: "fairfax",
    "region": "historic",
    "localContext": "For a Fairfax storefront with residential or office space nearby, clarify whether the systems are separate. Coordinate the proposed work window with the landlord and identify shared access points before requesting a final estimate.",
    "challenges": [
      "Describe renovations or layout changes.",
      "Identify finishes and areas requiring protection.",
      "Ask about tool suitability for the duct material.",
      "Confirm the included systems and access limitations."
    ],
    "image": "/images/locations/fairfax.jpg",
    "description": "Professional air quality solutions for the historic apartments and homes of Fairfax.",
    "zipCodes": [
      "90036"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Larchmont",
    slug: "larchmont",
    "region": "historic",
    "localContext": "For a Larchmont house or small business, include any restrictions on equipment movement and protection of interior finishes. Ask the provider to explain the proposed access method and which components can be reached.",
    "challenges": [
      "Describe renovations or layout changes.",
      "Identify finishes and areas requiring protection.",
      "Ask about tool suitability for the duct material.",
      "Confirm the included systems and access limitations."
    ],
    "image": "/images/locations/larchmont.jpg",
    "description": "High-quality air duct cleaning for the charming residences of Larchmont Village.",
    "zipCodes": [
      "90004"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Koreatown",
    slug: "koreatown",
    "region": "urban-core",
    "localContext": "For a Koreatown managed building, confirm the rules for contractor entry, service elevators and common equipment. Individual apartment ductwork and central systems should have clearly defined boundaries in the proposed scope.",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "image": "/images/locations/koreatown.jpg",
    "description": "Improving indoor air quality for the high-density residences and offices of Koreatown.",
    "zipCodes": [
      "90005",
      "90006",
      "90010",
      "90020"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "West LA",
    slug: "west-la",
    "region": "westside",
    "localContext": "For a West LA home or workplace, note whether a recent fit-out or remodel changed the ventilation layout. Supply and return ductwork, equipment components and any dryer exhaust should be identifiable as separate parts of the estimate.",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "image": "/images/locations/west-la.jpg",
    "description": "Trusted local experts for air duct and HVAC cleaning throughout West LA.",
    "zipCodes": [
      "90025",
      "90064"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Westwood",
    slug: "westwood",
    "region": "westside",
    "localContext": "For a Westwood condo or office suite, ask management who controls the HVAC equipment and how contractors reach it. Confirm appointment hours and any tenant-notification requirements before setting a date.",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "image": "/images/locations/westwood.jpg",
    "description": "Professional air quality solutions for the Westwood and UCLA residential areas.",
    "zipCodes": [
      "90024"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "North of Montana",
    slug: "north-of-montana",
    "region": "coastal",
    "localContext": "For a North of Montana property, identify separate air handlers or systems serving additions before the appointment. Share parking and equipment-access arrangements and specify interior areas that need protection.",
    "challenges": [
      "Identify the HVAC units and the spaces they serve.",
      "Report visible moisture or equipment damage for assessment.",
      "Confirm roof, attic or mechanical-room access.",
      "List dryer exhaust separately if it also needs service."
    ],
    "image": "/images/locations/north-of-montana.jpg",
    "description": "Specialized air quality services for premium estates North of Montana.",
    "zipCodes": [
      "90402"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Sawtelle",
    slug: "sawtelle",
    "region": "westside",
    "localContext": "For a Sawtelle shop, restaurant or apartment, establish which ventilation system is involved and whether the landlord must approve access. Laundry and cooking exhaust should not be assumed to fall within a general HVAC quote.",
    "challenges": [
      "List separate systems and any recently added equipment.",
      "Identify tenant-controlled and shared ventilation.",
      "Share renovation or operating concerns without assuming the cause.",
      "Arrange parking and approved work hours."
    ],
    "image": "/images/locations/sawtelle.jpg",
    "description": "Efficient air duct cleaning for the diverse homes and businesses of Sawtelle.",
    "zipCodes": [
      "90025"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Beverly Glen",
    slug: "beverly-glen",
    "region": "canyon",
    "localContext": "For a Beverly Glen property, describe the route from the available parking area to the equipment. Discuss any stairs, gates or difficult access and ask how unreachable duct sections would be reported.",
    "challenges": [
      "Provide entry, parking and equipment-route details.",
      "List systems serving separate parts of the property.",
      "Identify difficult access without opening sealed equipment.",
      "Ask how inaccessible areas will be documented."
    ],
    "image": "/images/locations/beverly-glen.jpg",
    "description": "Expert ventilation and air duct cleaning for the homes of Beverly Glen.",
    "zipCodes": [
      "90077"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Mid-Wilshire",
    slug: "mid-wilshire",
    "region": "urban-core",
    "localContext": "For a Mid-Wilshire office or residential building, identify the tenant spaces and common systems included in the project. A coordinated access plan helps turn a broad building request into an equipment-specific scope.",
    "challenges": [
      "Confirm the manager authorized to approve the work.",
      "Separate tenant equipment from common systems.",
      "Arrange loading, service elevators and mechanical-room access.",
      "Identify the completion records the building needs."
    ],
    "image": "/images/locations/mid-wilshire.jpg",
    "description": "Comprehensive air quality solutions for Mid-Wilshire's businesses and residences.",
    "zipCodes": [
      "90010",
      "90036"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Sherman Oaks",
    slug: "sherman-oaks",
    "region": "san-fernando-valley",
    "localContext": "For a Sherman Oaks home with several temperature-control zones, identify the actual equipment serving them. A zone does not necessarily mean a separate unit, so confirm the system count before comparing estimates.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/sherman-oaks.jpg",
    "description": "Expert air duct and dryer vent cleaning for residents of Sherman Oaks.",
    "zipCodes": [
      "91403",
      "91423"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Encino Village",
    slug: "encino-village",
    "region": "san-fernando-valley",
    "localContext": "For an Encino Village home, note equipment added during any remodeling and the location of accessible vents. Ask whether the estimate includes the current full layout or only the original system.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/encino-village.jpg",
    "description": "Trusted air quality services for the homes and neighborhoods of Encino Village.",
    "zipCodes": [
      "91316"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Lake Balboa",
    slug: "lake-balboa",
    "region": "san-fernando-valley",
    "localContext": "For a Lake Balboa appointment, record the concern that prompted the call and any recent equipment changes. Make the thermostat, agreed vents and accessible equipment available for the planned visit.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/lake-balboa.jpg",
    "description": "Reliable air duct cleaning for the Lake Balboa community and surrounding parks.",
    "zipCodes": [
      "91406"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Valley Glen",
    slug: "valley-glen",
    "region": "san-fernando-valley",
    "localContext": "For a Valley Glen duplex or home with a converted space, establish which rooms connect to each HVAC system. Confirm access with all affected occupants and identify any equipment outside the main residence.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/valley-glen.jpg",
    "description": "Professional HVAC and air duct cleaning services in the heart of Valley Glen.",
    "zipCodes": [
      "91401",
      "91405"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Magnolia Park",
    slug: "magnolia-park",
    "region": "san-fernando-valley",
    "localContext": "For a Magnolia Park home or storefront, discuss opening hours, interior protection and the route to the equipment. If the building has more than one use, distinguish each system before agreeing on the scope.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/magnolia-park.jpg",
    "description": "High-quality air quality solutions for the residences of Magnolia Park.",
    "zipCodes": [
      "91505"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Toluca Lake",
    slug: "toluca-lake",
    "region": "san-fernando-valley",
    "localContext": "For a Toluca Lake property, include any separate guest space or independent system when describing the building. Ask the estimator to keep equipment, ductwork and optional services clearly identified in the quote.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/toluca-lake.jpg",
    "description": "Discreet and professional air duct cleaning for the homes of Toluca Lake.",
    "zipCodes": [
      "91602"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Sherwood Forest",
    slug: "sherwood-forest",
    "region": "san-fernando-valley",
    "localContext": "For a Sherwood Forest home with detached spaces or multiple air handlers, make a simple equipment list. Confirm which buildings and systems are included so the crew can plan access and the time needed.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/sherwood-forest.jpg",
    "description": "Expert ventilation and air duct cleaning for Sherwood Forest properties.",
    "zipCodes": [
      "91325"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Winnetka",
    slug: "winnetka",
    "region": "san-fernando-valley",
    "localContext": "For a Winnetka rental or family home, identify who can approve the work and provide access. Describe whether the concern involves HVAC ducts or dryer exhaust; the two services need different scopes.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/winnetka.jpg",
    "description": "Thorough air duct cleaning services for the residents and businesses of Winnetka.",
    "zipCodes": [
      "91306"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Granada Hills",
    slug: "granada-hills",
    "region": "foothill",
    "localContext": "For a Granada Hills property, discuss attic or other equipment access and any changes made during remodeling. A photograph of an accessible equipment label can help the estimator understand the system without opening panels.",
    "challenges": [
      "Describe vehicle and equipment access.",
      "Identify each unit and any detached spaces.",
      "Document the event or condition that prompted the call.",
      "Confirm the proposed work and any separate assessment."
    ],
    "image": "/images/locations/granada-hills.jpg",
    "description": "Improving indoor air quality for homes in the scenic Granada Hills area.",
    "zipCodes": [
      "91344"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Mission Hills",
    slug: "mission-hills",
    "region": "san-fernando-valley",
    "localContext": "For a Mission Hills home or small business, record the unit locations and any recent operating concerns. Ask which parts need cleaning, which need maintenance and whether another assessment is required.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/mission-hills.jpg",
    "description": "Professional air quality solutions for the Mission Hills community.",
    "zipCodes": [
      "91345"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Porter Ranch",
    slug: "porter-ranch",
    "region": "foothill",
    "localContext": "For a Porter Ranch property, confirm any community entry arrangements and the route to the mechanical equipment. Include each independent system and discuss work-hour restrictions before an appointment is agreed.",
    "challenges": [
      "Describe vehicle and equipment access.",
      "Identify each unit and any detached spaces.",
      "Document the event or condition that prompted the call.",
      "Confirm the proposed work and any separate assessment."
    ],
    "image": "/images/locations/porter-ranch.jpg",
    "description": "Trusted HVAC maintenance and air duct cleaning for the Porter Ranch community.",
    "zipCodes": [
      "91326"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "North Hollywood",
    slug: "north-hollywood",
    "region": "san-fernando-valley",
    "localContext": "For a North Hollywood studio, retail space or residence, identify hours when access is available and equipment that needs protection. Separate HVAC cleaning from specialized ventilation or laundry exhaust in the request.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/north-hollywood.jpg",
    "description": "Reliable and efficient air duct cleaning for the NoHo Arts District area.",
    "zipCodes": [
      "91601",
      "91602",
      "91605",
      "91606",
      "91607"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Sepulveda Basin",
    slug: "sepulveda-basin",
    "region": "san-fernando-valley",
    "localContext": "For a property in the Sepulveda Basin service area, provide the exact address and access instructions when requesting a quote. Confirm the building type and system count so the service request is matched to the actual property.",
    "challenges": [
      "Record the equipment count and locations.",
      "Note additions, detached structures or converted spaces.",
      "Describe changes noticed at the vents or equipment.",
      "Keep HVAC and laundry exhaust scopes separate."
    ],
    "image": "/images/locations/sepulveda-basin.jpg",
    "description": "Expert air quality maintenance for properties around the Sepulveda Basin.",
    "zipCodes": [
      "91406",
      "91436"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Hidden Hills",
    slug: "hidden-hills",
    "region": "canyon",
    "localContext": "For a Hidden Hills property, arrange community and gate access before the visit. Identify separate structures and HVAC systems, then confirm which are included in the written estimate.",
    "challenges": [
      "Provide entry, parking and equipment-route details.",
      "List systems serving separate parts of the property.",
      "Identify difficult access without opening sealed equipment.",
      "Ask how inaccessible areas will be documented."
    ],
    "image": "/images/locations/hidden-hills.jpg",
    "description": "Discreet and thorough air duct cleaning for the exclusive Hidden Hills estates.",
    "zipCodes": [
      "91302"
    ],
    "county": "Los Angeles",
    "testimonials": []
  },
  {
    "name": "Deer Lake Highlands",
    slug: "deer-lake-highlands",
    "region": "canyon",
    "localContext": "For a Deer Lake Highlands appointment, describe vehicle access, parking and the route to the equipment. If access is limited, discuss those constraints while the work is being scoped rather than after a date is selected.",
    "challenges": [
      "Provide entry, parking and equipment-route details.",
      "List systems serving separate parts of the property.",
      "Identify difficult access without opening sealed equipment.",
      "Ask how inaccessible areas will be documented."
    ],
    "image": "/images/locations/deer-lake-highlands.jpg",
    "description": "High-quality air duct cleaning for the quiet community of Deer Lake Highlands.",
    "zipCodes": [
      "91352"
    ],
    "county": "Los Angeles",
    "testimonials": []
  }
];
