import { business } from '@/config/business';
import businessCatalog from './businessCatalog.json';

export type PageHeroStory = {
  image: string;
  srcSet?: string;
  alt: string;
  eyebrow: string;
  caption: string;
  position?: string;
};

const LA_SKYLINE_SRCSET =
  '/images/coastal-v1/losAngeles-640.webp 640w, /images/coastal-v1/losAngeles-960.webp 960w, /images/coastal-v1/losAngeles-1440.webp 1440w';
const COMMERCIAL_SRCSET =
  '/images/coastal-v1/commercial-640.webp 640w, /images/coastal-v1/commercial-960.webp 960w, /images/coastal-v1/commercial-1440.webp 1440w';
const HVAC_SRCSET =
  '/images/coastal-v1/hvac-640.webp 640w, /images/coastal-v1/hvac-960.webp 960w, /images/coastal-v1/hvac-1440.webp 1440w';
const HOME_FAMILY_SRCSET =
  '/images/visual-story/home-family-640.webp 640w, /images/visual-story/home-family-1280.webp 1280w, /images/visual-story/home-family-1920.webp 1920w';
const ALLERGY_HOME_SRCSET =
  '/images/visual-story/allergy-home-640.webp 640w, /images/visual-story/allergy-home-1280.webp 1280w, /images/visual-story/allergy-home-1920.webp 1920w';
const CONSULTATION_SRCSET =
  '/images/visual-story/consultation-pac-v3-640.webp 640w, /images/visual-story/consultation-pac-v3-1280.webp 1280w, /images/visual-story/consultation-pac-v3-1920.webp 1920w';
const PROPERTY_MGMT_SRCSET =
  '/images/industry-v2/property-management-640.webp 640w, /images/industry-v2/property-management-1280.webp 1280w';
const RESTAURANTS_SRCSET =
  '/images/industry-v2/restaurants-640.webp 640w, /images/industry-v2/restaurants-1280.webp 1280w';
const EDUCATION_SRCSET =
  '/images/industry-v2/education-640.webp 640w, /images/industry-v2/education-1280.webp 1280w';
const RETAIL_SRCSET =
  '/images/industry-v2/retail-640.webp 640w, /images/industry-v2/retail-1280.webp 1280w';
const DUCT_CLEAR_SRCSET =
  '/images/coastal-v1/duct-clear-archive-v3-640.webp 640w, /images/coastal-v1/duct-clear-archive-v3-960.webp 960w, /images/coastal-v1/duct-clear-archive-v3-1440.webp 1440w';
const COAST_SRCSET =
  '/images/coastal-v1/coast-640.webp 640w, /images/coastal-v1/coast-960.webp 960w, /images/coastal-v1/coast-1440.webp 1440w';

const stories: Record<string, PageHeroStory> = {
  "/home-services": {
    "image": "/images/home-services/home-interior-960.webp",
    "srcSet": "/images/home-services/home-interior-480.webp 480w, /images/home-services/home-interior-960.webp 960w",
    "alt": "Sunlit Los Angeles living room with a clean architectural ceiling air diffuser",
    "eyebrow": "RESIDENTIAL AIR DUCT, DRYER VENT & FILTER CARE · LOS ANGELES",
    "caption": "Inspection-led air duct, dryer vent, reusable filter, and HVAC cleaning for Los Angeles homes, condos, and estates.",
    "position": "center 45%"
  },
  "/services": {
    "image": "/images/pac/rooftop-hvac-ductwork.webp",
    "alt": "California rooftop HVAC package unit and galvanized sheet-metal ductwork run under a clear blue sky",
    "eyebrow": "LOS ANGELES AIR DUCT, DRYER VENT & HVAC SERVICES",
    "caption": "Inspection-led air duct, dryer vent, and HVAC system cleaning for homes, commercial buildings, and multi-unit properties across Greater Los Angeles.",
    "position": "center 45%"
  },
  "/services/residential-air-duct-cleaning": {
    "image": "/images/visual-story/home-family-1920.webp",
    "srcSet": HOME_FAMILY_SRCSET,
    "alt": "Sunlit Los Angeles living room with clean indoor air register and family relaxing at home",
    "eyebrow": "RESIDENTIAL AIR DUCT CLEANING · LOS ANGELES",
    "caption": "Negative-pressure source removal for supply and return ductwork, room registers, and main trunk lines—verified before and after we clean.",
    "position": "center 52%"
  },
  "/services/commercial-air-duct-cleaning": {
    "image": "/images/coastal-v1/commercial-1440.webp",
    "srcSet": COMMERCIAL_SRCSET,
    "alt": "Technician inspecting gleaming commercial sheet-metal HVAC ductwork in a Los Angeles building",
    "eyebrow": "COMMERCIAL AIR DUCT CLEANING · LOS ANGELES COUNTY",
    "caption": "Building-specific HVAC and ventilation cleaning scopes scheduled around your tenants, operating hours, and facility compliance needs.",
    "position": "center 42%"
  },
  "/services/residential-dryer-vent-cleaning": {
    "image": "/images/blog/dryer-vent-safety-guide.webp",
    "srcSet": "/images/blog/dryer-vent-safety-guide-640.webp 640w, /images/blog/dryer-vent-safety-guide.webp 1024w",
    "alt": "Pure Air California technician cleaning an exterior residential dryer exhaust vent with a rotary brush",
    "eyebrow": "RESIDENTIAL DRYER VENT CLEANING · LOS ANGELES",
    "caption": "Full-path lint extraction and airflow verification from the laundry room transition connection to the exterior wall or roof termination hood.",
    "position": "center 35%"
  },
  "/services/commercial-dryer-vent-cleaning": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Commercial laundry machines with overhead stainless and galvanized dryer exhaust ductwork",
    "eyebrow": "COMMERCIAL DRYER VENT CLEANING · LOS ANGELES",
    "caption": "Scheduled dryer exhaust line, riser, and manifold clearing for multifamily laundry rooms, hotels, athletic facilities, and commercial operators.",
    "position": "center 46%"
  },
  "/services/residential-electrostatic-filter": {
    "image": "/images/visual-story/consultation-pac-v3-1920.webp",
    "srcSet": CONSULTATION_SRCSET,
    "alt": "Pure Air California technician reviewing an electrostatic HVAC air filter with a Los Angeles homeowner",
    "eyebrow": "RESIDENTIAL ELECTROSTATIC AIR FILTERS · LOS ANGELES",
    "caption": "Properly sized washable electrostatic and high-efficiency HVAC filtration matched to your return slot dimensions and system static pressure.",
    "position": "center 38%"
  },
  "/services/commercial-electrostatic-filter": {
    "image": "/images/pac/spiral-duct-diffuser.webp",
    "alt": "Gleaming commercial exposed spiral HVAC ductwork with linear supply air diffuser",
    "eyebrow": "COMMERCIAL ELECTROSTATIC FILTRATION · LOS ANGELES",
    "caption": "Scheduled collector-cell washing, filter bank maintenance, and airflow-conscious filtration upgrades for commercial and multi-unit HVAC systems.",
    "position": "center 45%"
  },
  "/services/dryer-vent-maintenance-program": {
    "image": "/images/hero/hvac-dryer-vent-realistic.webp",
    "srcSet": "/images/hero/hvac-dryer-vent-realistic-640.webp 640w, /images/hero/hvac-dryer-vent-realistic.webp 1024w",
    "alt": "Clean exterior dryer exhaust termination hood on a modern California residence",
    "eyebrow": "SCHEDULED DRYER VENT MAINTENANCE · LOS ANGELES",
    "caption": "Recurring dryer exhaust inspections, lint removal, and service logs for HOAs, apartment communities, property managers, and single-family homes.",
    "position": "center 48%"
  },
  "/services/hvac-system-cleaning": {
    "image": "/images/pac/duct-cleaning-interior-v2.webp",
    "alt": "Rotary agitation brush cleaning inside a galvanized HVAC air duct under negative pressure",
    "eyebrow": "COMPLETE HVAC SYSTEM CLEANING · LOS ANGELES",
    "caption": "Component-level cleaning for accessible evaporator coils, blower assemblies, plenums, air handlers, and connected supply and return ductwork.",
    "position": "center 50%"
  },
  "/services/air-duct-sanitizing": {
    "image": "/images/pac/duct-interior-clean-v2.webp",
    "alt": "Inside view of a spotless, clean galvanized rectangular metal HVAC air duct after source removal",
    "eyebrow": "AIR DUCT SANITIZING & ODOR CONTROL · LOS ANGELES",
    "caption": "Inspection-first assessment of duct material compatibility and targeted EPA-registered antimicrobial or odor-control treatment after mechanical cleaning.",
    "position": "center 50%"
  },
  "/services/laundromat-dryer-vent-cleaning": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Commercial laundromat dryer bank and overhead rigid galvanized exhaust manifold ductwork in Los Angeles",
    "eyebrow": "LAUNDROMAT DRYER EXHAUST CLEANING · LOS ANGELES",
    "caption": "High-volume dryer bank, common manifold trunk, booster fan, and rooftop termination cleaning planned around your store's operating hours.",
    "position": "center 46%"
  },
  "/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles": {
    "image": "/images/industry-v2/property-management-1280.webp",
    "srcSet": PROPERTY_MGMT_SRCSET,
    "alt": "Multi-unit residential and commercial property complex in Los Angeles served by Pure Air California",
    "eyebrow": "COMMERCIAL & HOA AIR DUCT + DRYER VENT CLEANING",
    "caption": "Unit-by-unit and common-area ventilation cleaning with resident notice templates, COI compliance, and photo documentation for boards and managers.",
    "position": "center 48%"
  },
  "/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles": {
    "image": "/images/cinematic/california-sky-v1.webp",
    "alt": "Los Angeles hillside homes in the Santa Monica Mountains overlooking the LA basin and coastline",
    "eyebrow": "WILDFIRE SMOKE & HILLSIDE DUCT CLEANING · LOS ANGELES",
    "caption": "Post-smoke, ash, and renovation-dust HVAC inspection, HEPA negative-pressure source removal, and filtration guidance for canyon and hillside homes.",
    "position": "center 45%"
  },
  "/project-stories": {
    "image": "/images/coastal-v1/commercial-1440.webp",
    "srcSet": COMMERCIAL_SRCSET,
    "alt": "Commercial and residential air duct cleaning case studies in Los Angeles",
    "eyebrow": "VERIFIED LOS ANGELES PROJECT STORIES",
    "caption": "Documented scopes, access coordination, and field outcomes across Los Angeles homes, HOAs, and commercial buildings.",
    "position": "center 42%"
  },
  "/industries": {
    "image": "/images/cinematic/los-angeles-v1.webp",
    "alt": "Downtown Los Angeles commercial skyline and surrounding basin at golden hour",
    "eyebrow": "COMMERCIAL & INSTITUTIONAL VENTILATION · LOS ANGELES",
    "caption": "Facility-specific air duct, dryer exhaust, and HVAC cleaning programs tailored to how your building operates.",
    "position": "center 45%"
  },
  "/industries/commercial-real-estate": {
    "image": "/images/locations/century-city.webp",
    "srcSet": "/images/locations/century-city-640.webp 640w, /images/locations/century-city.webp 1024w",
    "alt": "Century City commercial office towers and palm-lined plaza in Los Angeles",
    "eyebrow": "COMMERCIAL REAL ESTATE & OFFICE VENTILATION · LOS ANGELES",
    "caption": "Coordinate tenant access, protect operating schedules, and document HVAC and dryer exhaust care across your portfolio.",
    "position": "center 45%"
  },
  "/industries/healthcare": {
    "image": "/images/pac/healthcare.webp",
    "alt": "Clean healthcare and medical clinic corridor with ceiling HVAC ventilation registers",
    "eyebrow": "HEALTHCARE & MEDICAL FACILITY HVAC CARE · LOS ANGELES",
    "caption": "Containment-aware air duct and HVAC component cleaning coordinated with clinic and facility operations teams.",
    "position": "center 45%"
  },
  "/industries/hospitality": {
    "image": "/images/pac/hotel.webp",
    "alt": "Welcoming California hotel guest suite with clean, quiet air conditioning and ventilation",
    "eyebrow": "HOSPITALITY & HOTEL VENTILATION CLEANING · LOS ANGELES",
    "caption": "Guest-room HVAC, corridor supply, and commercial laundry exhaust maintenance planned around occupancy and turnover.",
    "position": "center 48%"
  },
  "/industries/restaurants": {
    "image": "/images/industry-v2/restaurants-1280.webp",
    "srcSet": RESTAURANTS_SRCSET,
    "alt": "Upscale Los Angeles restaurant dining room and open kitchen with clean comfort HVAC ventilation",
    "eyebrow": "RESTAURANT & DINING ROOM HVAC CARE · LOS ANGELES",
    "caption": "Dining room comfort, supply and return duct hygiene, and make-up air coordination scheduled outside peak service hours.",
    "position": "center 48%"
  },
  "/industries/education": {
    "image": "/images/industry-v2/education-1280.webp",
    "srcSet": EDUCATION_SRCSET,
    "alt": "School campus and classroom building ventilation maintenance in Los Angeles",
    "eyebrow": "SCHOOL, CAMPUS & CHILDCARE VENTILATION · LOS ANGELES",
    "caption": "Classroom, gymnasium, and administrative HVAC duct cleaning scheduled around academic calendars and break windows.",
    "position": "center 48%"
  },
  "/industries/retail": {
    "image": "/images/industry-v2/retail-1280.webp",
    "srcSet": RETAIL_SRCSET,
    "alt": "Modern retail showroom and shopping space with clean overhead HVAC ventilation",
    "eyebrow": "RETAIL & SHOWROOM AIR DUCT CLEANING · LOS ANGELES",
    "caption": "Off-hours supply register, exposed spiral duct, and rooftop package unit cleaning that keeps sales floors spotless.",
    "position": "center 48%"
  },
  "/industries/manufacturing": {
    "image": "/images/pac/industrial.webp",
    "alt": "Pure Air California industrial ventilation crew servicing high-bay overhead ductwork",
    "eyebrow": "INDUSTRIAL, WAREHOUSE & STUDIO VENTILATION · LOS ANGELES",
    "caption": "High-bay ductwork, process area ventilation, and facility HVAC cleaning built around shift schedules and safety protocols.",
    "position": "center 45%"
  },
  "/about": {
    "image": "/images/breath/living-forest-1920.webp",
    "srcSet": "/images/breath/living-forest-640.webp 640w, /images/breath/living-forest-1440.webp 1440w, /images/breath/living-forest-1920.webp 1920w",
    "alt": "Sunlit mountain meadow and evergreen forest beneath a golden California sky",
    "eyebrow": "ABOUT PURE AIR CALIFORNIA · LOS ANGELES",
    "caption": "Inspection-first air duct, dryer vent, and HVAC cleaning led by trained local technicians across Greater Los Angeles.",
    "position": "center 45%"
  },
  "/contact": {
    "image": "/images/journey-v2/la-skyline-cedric-1600.webp",
    "srcSet": "/images/journey-v2/la-skyline-cedric-480.webp 480w, /images/journey-v2/la-skyline-cedric-960.webp 960w, /images/journey-v2/la-skyline-cedric-1600.webp 1600w",
    "alt": "Golden-hour Downtown Los Angeles skyline framed by palm trees across Pure Air California's service area",
    "eyebrow": `CONTACT PURE AIR CALIFORNIA · ${business.phone}`,
    "caption": "Speak directly with our Los Angeles scheduling and technical team to plan your inspection or cleaning scope.",
    "position": "center 48%"
  },
  "/quote": {
    "image": "/images/services/residential-duct.webp",
    "srcSet": "/images/services/residential-duct-640.webp 640w, /images/services/residential-duct.webp 1024w",
    "alt": "Sunlit Los Angeles living room with architectural linear ceiling air diffuser and clean indoor airflow",
    "eyebrow": "REQUEST AN AIR DUCT OR DRYER VENT ESTIMATE",
    "caption": "Share your system count, property layout, and symptoms for a clear, itemized scope before any work begins.",
    "position": "center 42%"
  },
  "/free-inspection": {
    "image": "/images/visual-story/consultation-pac-v3-1920.webp",
    "srcSet": CONSULTATION_SRCSET,
    "alt": "Pure Air California technician reviewing ductwork access and inspection details with a Los Angeles property contact",
    "eyebrow": "ON-SITE SCOPE & INSPECTION REQUEST · LOS ANGELES",
    "caption": "Review your accessible ductwork, dryer exhaust path, and building access requirements before agreeing to a written scope.",
    "position": "center 38%"
  },
  "/booking-thank-you": {
    "image": "/images/breath/living-forest-1440.webp",
    "srcSet": "/images/breath/living-forest-640.webp 640w, /images/breath/living-forest-1440.webp 1440w",
    "alt": "Sunlit California forest landscape beneath an open sky",
    "eyebrow": "REQUEST RECEIVED · PURE AIR CALIFORNIA",
    "caption": "Our Los Angeles team reviews your property details and confirms scope, access, and scheduling with you directly.",
    "position": "center 45%"
  },
  "/pricing": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright, serene California home interior with natural light and comfortable indoor air circulation",
    "eyebrow": "TRANSPARENT AIR DUCT & DRYER VENT PRICING GUIDE",
    "caption": "See exactly how system count, register count, vent routing, and building access shape your written Los Angeles estimate.",
    "position": "center 50%"
  },
  "/locations": {
    "image": "/images/coastal-v1/losAngeles-1440.webp",
    "srcSet": LA_SKYLINE_SRCSET,
    "alt": "Griffith Observatory and the Downtown Los Angeles skyline across the service basin",
    "eyebrow": "GREATER LOS ANGELES & SOUTHERN CALIFORNIA COVERAGE",
    "caption": "Neighborhood-by-neighborhood air duct, dryer vent, and HVAC cleaning from the Westside and Valleys to the South Bay.",
    "position": "center 45%"
  },
  "/locations/los-angeles": {
    "image": "/images/coastal-v1/losAngeles-1440.webp",
    "srcSet": LA_SKYLINE_SRCSET,
    "alt": "Los Angeles skyline and hillside neighborhoods served by Pure Air California",
    "eyebrow": "LOS ANGELES AIR DUCT & DRYER VENT CLEANING",
    "caption": "Local inspection-led ventilation cleaning for hillside homes, historic residences, HOAs, and commercial buildings across LA.",
    "position": "center 45%"
  },
  "/property-managers": {
    "image": "/images/industry-v2/property-management-1280.webp",
    "srcSet": PROPERTY_MGMT_SRCSET,
    "alt": "Multifamily apartment and HOA property complex in Greater Los Angeles",
    "eyebrow": "FOR PROPERTY MANAGERS, HOAS & FACILITY TEAMS",
    "caption": "Multi-unit dryer vent stacks, common-area HVAC cleaning, COI compliance, and resident scheduling built for property portfolios.",
    "position": "center 48%"
  },
  "/partners": {
    "image": "/images/coastal-v1/hvac-1440.webp",
    "srcSet": HVAC_SRCSET,
    "alt": "Commercial rooftop HVAC condenser and ventilation equipment serviced by Pure Air California",
    "eyebrow": "TRADE, HVAC & RESTORATION PARTNERSHIPS",
    "caption": "Dedicated air duct and dryer exhaust cleaning support for mechanical contractors, restoration teams, and real estate advisors.",
    "position": "center 45%"
  },
  "/case-studies": {
    "image": "/images/coastal-v1/commercial-1440.webp",
    "srcSet": COMMERCIAL_SRCSET,
    "alt": "Technician inspecting commercial sheet-metal ductwork during a documented Los Angeles project",
    "eyebrow": "LOS ANGELES FIELD CASE STUDIES",
    "caption": "See how we scope, schedule, and document air duct and dryer vent projects in occupied residential and commercial properties.",
    "position": "center 42%"
  },
  "/case-studies/apartment-community-42-units": {
    "image": "/images/industry-v2/property-management-1280.webp",
    "srcSet": PROPERTY_MGMT_SRCSET,
    "alt": "42-unit apartment community in Los Angeles where Pure Air California completed staged dryer vent and HVAC cleaning",
    "eyebrow": "MULTIFAMILY CASE STUDY · 42-UNIT COMMUNITY",
    "caption": "Phased resident notice, roof and laundry access coordination, and unit-by-unit completion logs in an occupied property.",
    "position": "center 48%"
  },
  "/case-studies/nonprofit-housing-office-hvac": {
    "image": "/images/pac/office.webp",
    "alt": "Commercial office and housing facility interior with clean overhead HVAC ductwork",
    "eyebrow": "COMMERCIAL HVAC CASE STUDY · MIXED-USE FACILITY",
    "caption": "Multi-zone supply, return, and air-handler hygiene planned around staff schedules and resident occupancy.",
    "position": "center 48%"
  },
  "/case-studies/four-seasons-los-angeles-ventilation": {
    "image": "/images/pac/hotel.webp",
    "alt": "Luxury Los Angeles hotel suite served by quiet, well-maintained ventilation",
    "eyebrow": "HOSPITALITY PROJECT STORY · BEVERLY HILLS / LOS ANGELES",
    "caption": "Hospitality ventilation care coordinated around guest occupancy, quiet hours, and engineering team access.",
    "position": "center 46%"
  },
  "/case-studies/westchester-ymca-ventilation": {
    "image": "/images/pac/rooftop-hvac-ductwork.webp",
    "alt": "Commercial community facility rooftop HVAC and galvanized ductwork run",
    "eyebrow": "COMMUNITY FACILITY PROJECT STORY · WESTCHESTER, LA",
    "caption": "Shared-space HVAC and ventilation service scheduled around member hours and building operations.",
    "position": "center 45%"
  },
  "/case-studies/panera-pasadena-ventilation": {
    "image": "/images/industry-v2/restaurants-1280.webp",
    "srcSet": RESTAURANTS_SRCSET,
    "alt": "Restaurant dining room comfort ventilation in Pasadena",
    "eyebrow": "RESTAURANT PROJECT STORY · PASADENA",
    "caption": "Dining-room supply and return duct care scheduled outside food-prep and peak guest hours.",
    "position": "center 48%"
  },
  "/case-studies/soulcycle-westside-dryer-vents": {
    "image": "/images/pac/laundromat.webp",
    "alt": "High-volume commercial studio laundry and overhead dryer exhaust ductwork",
    "eyebrow": "COMMERCIAL DRYER VENT STORY · WESTSIDE LOS ANGELES",
    "caption": "High-cycle athletic studio dryer exhaust clearing planned around class turnover and building access.",
    "position": "center 46%"
  },
  "/case-studies/taco-bell-canoga-park-hvac": {
    "image": "/images/coastal-v1/hvac-1440.webp",
    "srcSet": HVAC_SRCSET,
    "alt": "Commercial rooftop HVAC and duct system in the San Fernando Valley",
    "eyebrow": "QUICK-SERVICE HVAC STORY · CANOGA PARK",
    "caption": "Off-hours commercial HVAC duct cleaning coordinated with store management in the San Fernando Valley.",
    "position": "center 45%"
  },
  "/case-studies/bassett-torrance-showroom": {
    "image": "/images/industry-v2/retail-1280.webp",
    "srcSet": RETAIL_SRCSET,
    "alt": "Bright retail showroom floor with clean overhead HVAC supply ventilation",
    "eyebrow": "RETAIL SHOWROOM STORY · TORRANCE / SOUTH BAY",
    "caption": "Showroom air-path cleaning with floor and merchandise protection scheduled outside trading hours.",
    "position": "center 48%"
  },
  "/blog": {
    "image": "/images/pac/duct-interior-clean-v2.webp",
    "alt": "Spotless interior of a galvanized HVAC air duct after professional source-removal cleaning",
    "eyebrow": "LOS ANGELES INDOOR AIR QUALITY & HVAC JOURNAL",
    "caption": "Practical guides on air duct cleaning costs, dryer fire prevention, wildfire smoke recovery, and commercial ventilation.",
    "position": "center 50%"
  },
  "/health-benefits": {
    "image": "/images/visual-story/allergy-home-1920.webp",
    "srcSet": ALLERGY_HOME_SRCSET,
    "alt": "Sunlit Los Angeles living room designed for cleaner indoor air and reduced dust circulation",
    "eyebrow": "INDOOR AIR QUALITY & HOME COMFORT · LOS ANGELES",
    "caption": "How removing settled duct dust, construction debris, and lint buildup supports cleaner air circulation and HVAC performance.",
    "position": "center 50%"
  },
  "/air-quality-calculator": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright, clean residential sitting room with balanced natural light and indoor airflow",
    "eyebrow": "INTERACTIVE HVAC & DRYER VENT CHECKLIST",
    "caption": "Answer a few quick questions about your home, symptoms, and system history to see whether an inspection makes sense.",
    "position": "center 48%"
  },
  "/privacy-policy": {
    "image": "/images/pac/sky.webp",
    "alt": "Clear California sky above Los Angeles",
    "eyebrow": "PRIVACY POLICY · PURE AIR CALIFORNIA",
    "caption": "How Pure Air California protects your contact details, project photos, and service records.",
    "position": "center 45%"
  },
  "/terms-of-service": {
    "image": "/images/coastal-v1/coast-1440.webp",
    "srcSet": COAST_SRCSET,
    "alt": "Southern California coastline and hillside neighborhoods at sunset",
    "eyebrow": "TERMS OF SERVICE · PURE AIR CALIFORNIA",
    "caption": "Clear terms, scope expectations, and scheduling policies for working with Pure Air California.",
    "position": "center 45%"
  },
  "/dryer-safety": {
    "image": "/images/pac/dryer.webp",
    "alt": "Rotary brush clearing compacted lint from a residential dryer exhaust vent line",
    "eyebrow": "DRYER VENT FIRE PREVENTION & AIRFLOW · LOS ANGELES",
    "caption": "Reduce overheating, cut long drying cycles, and clear hidden lint buildup along the entire exhaust run.",
    "position": "center 48%"
  },
  "/compare": {
    "image": "/images/coastal-v1/duct-clear-archive-v3-1440.webp",
    "srcSet": DUCT_CLEAR_SRCSET,
    "alt": "Illuminated clean HVAC air duct interior after source-removal cleaning",
    "eyebrow": "HOW TO COMPARE AIR DUCT CLEANING QUOTES IN LA",
    "caption": "What separates full negative-pressure source removal from low-price coupon bait-and-switch offers.",
    "position": "center 50%"
  },
  "/commercial-services": {
    "image": "/images/coastal-v1/commercial-1440.webp",
    "srcSet": COMMERCIAL_SRCSET,
    "alt": "Commercial technician inspecting galvanized HVAC ductwork in a Los Angeles facility",
    "eyebrow": "COMMERCIAL HVAC & DRYER EXHAUST CLEANING · LOS ANGELES",
    "caption": "Site-specific scopes, after-hours scheduling, COI documentation, and photo reporting for commercial properties.",
    "position": "center 42%"
  },
  "/blog/air-duct-cleaning-faq": {
    "image": "/images/pac/ceiling-supply-diffuser.webp",
    "alt": "Clean architectural overhead round HVAC supply air diffuser and insulated spiral ductwork",
    "eyebrow": "AIR DUCT CLEANING FAQ · LOS ANGELES GUIDE",
    "caption": "Straight answers on negative-pressure source removal, appointment timing, pricing factors, and what to expect on service day.",
    "position": "center 48%"
  },
  "/blog/dryer-vent-safety-guide": {
    "image": "/images/blog/dryer-vent-safety-guide.webp",
    "srcSet": "/images/blog/dryer-vent-safety-guide-640.webp 640w, /images/blog/dryer-vent-safety-guide.webp 1024w",
    "alt": "Pure Air California technician cleaning an exterior dryer exhaust vent with a rotary brush",
    "eyebrow": "DRYER VENT SAFETY GUIDE · FIRE PREVENTION",
    "caption": "Warning signs of restricted dryer exhaust lines and how often Los Angeles homes and HOAs should clean them.",
    "position": "center 35%"
  },
  "/blog/commercial-indoor-air-quality-guide": {
    "image": "/images/pac/office.webp",
    "alt": "Open commercial workplace with exposed spiral HVAC ductwork in Los Angeles",
    "eyebrow": "COMMERCIAL INDOOR AIR QUALITY GUIDE",
    "caption": "Practical ventilation hygiene, filtration, and coil maintenance strategies for Los Angeles facility managers.",
    "position": "center 48%"
  },
  "/blog/health-benefits-air-duct-cleaning": {
    "image": "/images/visual-story/allergy-home-1920.webp",
    "srcSet": ALLERGY_HOME_SRCSET,
    "alt": "Clean, sunlit Los Angeles home interior supporting cleaner indoor air circulation",
    "eyebrow": "INDOOR AIR QUALITY & HOME COMFORT GUIDE",
    "caption": "How source-removal duct cleaning reduces recirculating household dust, pet dander, and post-renovation particulate.",
    "position": "center 50%"
  },
  "/blog/importance-of-regular-air-duct-cleaning": {
    "image": "/images/pac/duct-interior-clean-v2.webp",
    "alt": "Clean interior of a residential and commercial sheet-metal HVAC duct",
    "eyebrow": "PREVENTIVE HVAC & DUCT MAINTENANCE GUIDE",
    "caption": "Why periodic inspection and source removal protect airflow, blower components, and indoor comfort over time.",
    "position": "center 50%"
  },
  "/blog/clean-air-ducts-allergy-relief": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright living room with clean air registers and natural daylight",
    "eyebrow": "SEASONAL ALLERGY & DUST CONTROL GUIDE",
    "caption": "Practical steps to reduce dust, pollen, and pet dander buildup inside your home's return and supply ductwork.",
    "position": "center 48%"
  },
  "/blog/signs-air-ducts-need-cleaning": {
    "image": "/images/pac/dirtyDuct.webp",
    "alt": "Interior of an air duct showing visible dust and debris buildup prior to cleaning",
    "eyebrow": "HOMEOWNER INSPECTION CHECKLIST",
    "caption": "How to spot visible register buildup, uneven room airflow, remodel dust, and musty odors before they worsen.",
    "position": "center 50%"
  },
  "/blog/residential-air-duct-cleaning-los-angeles": {
    "image": "/images/visual-story/home-family-1920.webp",
    "srcSet": HOME_FAMILY_SRCSET,
    "alt": "Los Angeles family relaxing in a clean, sunlit living room with fresh indoor airflow",
    "eyebrow": "LOS ANGELES HOMEOWNER DUCT CLEANING GUIDE",
    "caption": "How canyon winds, older attic trunk lines, and remodels affect Los Angeles home ductwork—and how we clean it.",
    "position": "center 52%"
  },
  "/blog/commercial-air-duct-cleaning-los-angeles-businesses": {
    "image": "/images/coastal-v1/commercial-1440.webp",
    "srcSet": COMMERCIAL_SRCSET,
    "alt": "Technician inspecting commercial sheet-metal ductwork in a Los Angeles facility",
    "eyebrow": "LOS ANGELES COMMERCIAL VENTILATION GUIDE",
    "caption": "Planning commercial air duct cleaning around tenant comfort, off-hours access, and mechanical documentation.",
    "position": "center 42%"
  },
  "/blog/industrial-air-duct-cleaning-safety-efficiency": {
    "image": "/images/pac/industrial.webp",
    "alt": "Industrial warehouse and manufacturing ventilation system",
    "eyebrow": "INDUSTRIAL VENTILATION SAFETY & EFFICIENCY",
    "caption": "High-bay particulate removal, airflow restoration, and scheduled maintenance for production and warehouse spaces.",
    "position": "center 45%"
  },
  "/blog/hospital-healthcare-air-duct-cleaning": {
    "image": "/images/pac/healthcare.webp",
    "alt": "Medical facility corridor with clean ceiling ventilation diffusers",
    "eyebrow": "HEALTHCARE & CLINIC HVAC HYGIENE",
    "caption": "Containment protocols, negative-pressure filtration, and quiet coordination for medical and outpatient facilities.",
    "position": "center 45%"
  },
  "/blog/restaurant-kitchen-air-duct-cleaning": {
    "image": "/images/industry-v2/restaurants-1280.webp",
    "srcSet": RESTAURANTS_SRCSET,
    "alt": "Commercial restaurant dining room and HVAC ventilation system maintenance",
    "eyebrow": "RESTAURANT HVAC & VENTILATION GUIDE",
    "caption": "Balancing dining room comfort, supply air cleanliness, and back-of-house airflow in busy hospitality venues.",
    "position": "center 48%"
  },
  "/blog/laundromat-dryer-vent-cleaning-safety": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Commercial laundromat dryer bank and overhead rigid exhaust ductwork",
    "eyebrow": "COMMERCIAL LAUNDRY EXHAUST SAFETY",
    "caption": "How clearing common manifolds, risers, and roof hoods lowers gas usage, shortens dry times, and prevents lint fires.",
    "position": "center 46%"
  },
  "/blog/hotel-air-quality-guest-satisfaction": {
    "image": "/images/pac/hotel.webp",
    "alt": "Clean, comfortable hotel guest room in Los Angeles",
    "eyebrow": "HOSPITALITY INDOOR AIR QUALITY GUIDE",
    "caption": "Why quiet, odor-free guest room ventilation and reliable laundry exhaust care drive better guest reviews.",
    "position": "center 48%"
  },
  "/blog/air-duct-cleaning-cost-los-angeles": {
    "image": "/images/visual-story/consultation-pac-v3-1920.webp",
    "srcSet": CONSULTATION_SRCSET,
    "alt": "Pure Air California technician reviewing an itemized Los Angeles air duct cleaning estimate",
    "eyebrow": "LOS ANGELES AIR DUCT CLEANING COST GUIDE",
    "caption": "Real-world pricing factors in Los Angeles: air handler count, register count, attic access, and full source removal.",
    "position": "center 38%"
  },
  "/blog/air-duct-cleaning-after-wildfire-los-angeles": {
    "image": "/images/cinematic/california-sky-v1.webp",
    "alt": "Los Angeles hillside neighborhoods in the Santa Monica Mountains overlooking the basin",
    "eyebrow": "POST-WILDFIRE SMOKE & ASH HVAC RECOVERY",
    "caption": "When and how to inspect, clean, and re-filter your home's ductwork after nearby wildfire smoke exposure.",
    "position": "center 45%"
  },
  "/blog/signs-los-angeles-air-ducts-need-cleaning-2026": {
    "image": "/images/pac/dirtyDuct.webp",
    "alt": "Accumulated dust and debris inside a residential air duct prior to negative-pressure extraction",
    "eyebrow": "2026 LOS ANGELES HOMEOWNER HVAC CHECKLIST",
    "caption": "Seven clear indicators that your Los Angeles air ducts or dryer exhaust line need a professional inspection.",
    "position": "center 50%"
  },
  "/blog/is-air-duct-cleaning-worth-it": {
    "image": "/images/pac/duct-interior-clean-v2.webp",
    "alt": "Clean galvanized sheet-metal air duct interior after professional cleaning",
    "eyebrow": "HONEST HOMEOWNER BUYING GUIDE",
    "caption": "When professional air duct cleaning delivers measurable value—and when a simple filter change is all you need.",
    "position": "center 50%"
  },
  "/blog/avoid-air-duct-cleaning-scams-los-angeles": {
    "image": "/images/visual-story/consultation-pac-v3-1920.webp",
    "srcSet": CONSULTATION_SRCSET,
    "alt": "Homeowner reviewing a written, transparent scope of work with a Pure Air California technician",
    "eyebrow": "CONSUMER PROTECTION GUIDE · LOS ANGELES",
    "caption": "How to spot teaser-coupon upsells, fake mold claims, and incomplete blow-and-go jobs before you book.",
    "position": "center 38%"
  }
};

export function getPageHero(pathname: string): PageHeroStory {
  const key = pathname.replace(/\/$/, '');
  if (stories[key]) {
    return stories[key];
  }
  const market = businessCatalog.find(
    (item) => item.parentPath.replace(/\/$/, '') === key || key.startsWith(`/industries/${item.slug}/`)
  );
  if (market) {
    return {
      image: market.image,
      srcSet: market.image.endsWith('-1280.webp')
        ? `${market.image.replace('-1280.webp', '-640.webp')} 640w, ${market.image} 1280w`
        : undefined,
      alt: market.alt,
      eyebrow: market.eyebrow,
      caption: market.promise,
      position: 'center 46%',
    };
  }
  return {
    image: '/images/coastal-v1/losAngeles-1440.webp',
    srcSet: LA_SKYLINE_SRCSET,
    alt: 'Los Angeles cityscape across Pure Air California service neighborhoods',
    eyebrow: 'LOS ANGELES AIR DUCT & DRYER VENT SPECIALISTS',
    caption: 'Inspection-first air duct, dryer vent, and HVAC cleaning for homes and commercial buildings across Greater Los Angeles.',
    position: 'center 45%',
  };
}
