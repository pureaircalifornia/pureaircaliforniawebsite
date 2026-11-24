export type PageHeroStory={image:string;alt:string;eyebrow:string;caption:string;position?:string};
const stories:Record<string,PageHeroStory>={
  "/services": {
    "image": "/images/pac/hvac.webp",
    "alt": "Technicians working on HVAC equipment",
    "eyebrow": "Air duct, dryer vent & HVAC care",
    "caption": "The systems behind your everyday comfort."
  },
  "/services/residential-air-duct-cleaning": {
    "image": "/images/pac/residential.webp",
    "alt": "Technician cleaning a ceiling ventilation opening",
    "eyebrow": "A little care for the place you call home",
    "caption": "Thoughtful service. From the inside out."
  },
  "/services/commercial-air-duct-cleaning": {
    "image": "/images/pac/commercial.webp",
    "alt": "Technician inspecting commercial metal ductwork",
    "eyebrow": "Big spaces. Personal attention.",
    "caption": "Care for the systems that keep your business moving."
  },
  "/services/residential-dryer-vent-cleaning": {
    "image": "/images/pac/dryerAppliance.webp",
    "alt": "Dryer and exhaust connection in a laundry area",
    "eyebrow": "Small vent. An important job.",
    "caption": "A clearer exhaust path starts with a closer look."
  },
  "/services/commercial-dryer-vent-cleaning": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Laundry machines and overhead exhaust ductwork",
    "eyebrow": "Laundry operations, looked after",
    "caption": "Plan the work around the way your property runs."
  },
  "/services/residential-electrostatic-filter": {
    "image": "/images/pac/filter.webp",
    "alt": "Metal electrostatic collector cells removed for servicing",
    "eyebrow": "The details make a difference",
    "caption": "The right filter. The right fit. The right care."
  },
  "/services/commercial-electrostatic-filter": {
    "image": "/images/pac/commercialFilter.webp",
    "alt": "Electrostatic collector cells from the PAC field-photo library",
    "eyebrow": "Keep your building’s filter care on track",
    "caption": "Maintenance that fits your equipment and operation."
  },
  "/services/dryer-vent-maintenance-program": {
    "image": "/images/pac/dryer.webp",
    "alt": "Lint at a dryer exhaust connection",
    "eyebrow": "A good routine begins with a clear plan",
    "caption": "Understand your exhaust system. Plan its care."
  },
  "/services/hvac-system-cleaning": {
    "image": "/images/pac/hvac.webp",
    "alt": "Technicians working on HVAC equipment",
    "eyebrow": "Look after the whole system",
    "caption": "From equipment to airflow, every detail matters."
  },
  "/services/air-duct-sanitizing": {
    "image": "/images/pac/cleanDuct.webp",
    "alt": "Inside a clean metal air duct",
    "eyebrow": "Start with the condition of your system",
    "caption": "Clear advice before any treatment."
  },
  "/services/laundromat-dryer-vent-cleaning": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Laundry machines and overhead exhaust ductwork",
    "eyebrow": "For the dryers that work all day",
    "caption": "Exhaust care for busy laundry spaces."
  },
  "/industries": {
    "image": "/images/pac/commercial.webp",
    "alt": "Technician inspecting commercial metal ductwork",
    "eyebrow": "For every kind of business",
    "caption": "Your operation matters. So does the work behind it."
  },
  "/industries/commercial-real-estate": {
    "image": "/images/pac/building.webp",
    "alt": "Commercial building exterior viewed from below",
    "eyebrow": "Behind every great building",
    "caption": "Coordinate access, protect schedules, care for the property."
  },
  "/industries/healthcare": {
    "image": "/images/pac/healthcare.webp",
    "alt": "Ventilation in a healthcare facility corridor",
    "eyebrow": "Care for the spaces where people receive care",
    "caption": "Coordinate the work with your facility team."
  },
  "/industries/hospitality": {
    "image": "/images/pac/hotel.webp",
    "alt": "Welcoming hotel guest room",
    "eyebrow": "Comfort your guests can settle into",
    "caption": "Thoughtful service behind a welcoming stay."
  },
  "/industries/restaurants": {
    "image": "/images/pac/restaurant.webp",
    "alt": "Ventilation cleaning in a commercial kitchen",
    "eyebrow": "Keep service moving",
    "caption": "Plan ventilation care around the kitchen and dining room."
  },
  "/industries/education": {
    "image": "/images/pac/cleanDuct.webp",
    "alt": "Inside a clean metal air duct",
    "eyebrow": "Better cared-for spaces to learn",
    "caption": "Practical ventilation care for education facilities."
  },
  "/industries/retail": {
    "image": "/images/pac/office.webp",
    "alt": "Open workplace with visible ventilation ductwork",
    "eyebrow": "Ready to welcome people in",
    "caption": "Care for the systems behind your customer experience."
  },
  "/industries/manufacturing": {
    "image": "/images/pac/industrial.webp",
    "alt": "Industrial ventilation and workshop equipment",
    "eyebrow": "Built around the way you work",
    "caption": "Industrial ventilation starts with a site-specific plan."
  },
  "/about": {
    "image": "/images/pac/residential.webp",
    "alt": "Technician cleaning a ceiling ventilation opening",
    "eyebrow": "Meet your PAC team",
    "caption": "Friendly people. Hands-on care. Los Angeles roots."
  },
  "/contact": {
    "image": "/images/pac/consultation.webp",
    "alt": "A service professional discussing paperwork with a homeowner",
    "eyebrow": "A real conversation. A clear next step.",
    "caption": "Tell us about the space you look after."
  },
  "/quote": {
    "image": "/images/pac/consultation.webp",
    "alt": "A service professional discussing paperwork with a homeowner",
    "eyebrow": "Good service starts with understanding",
    "caption": "A clear scope before the work begins."
  },
  "/pricing": {
    "image": "/images/pac/filter.webp",
    "alt": "Metal electrostatic collector cells removed for servicing",
    "eyebrow": "Clear expectations. No guesswork.",
    "caption": "Understand the factors behind your estimate."
  },
  "/locations": {
    "image": "/images/pac/losAngeles.webp",
    "alt": "Los Angeles skyline beyond Griffith Observatory",
    "eyebrow": "Los Angeles is our place, too",
    "caption": "From homes in the hills to businesses across the city."
  },
  "/locations/los-angeles": {
    "image": "/images/pac/losAngeles.webp",
    "alt": "Los Angeles skyline beyond Griffith Observatory",
    "eyebrow": "Made for life in Los Angeles",
    "caption": "Air care for the places where LA lives and works."
  },
  "/property-managers": {
    "image": "/images/pac/building.webp",
    "alt": "Commercial building exterior viewed from below",
    "eyebrow": "One property or a whole portfolio",
    "caption": "A practical partner for the buildings you look after."
  },
  "/partners": {
    "image": "/images/pac/commercial.webp",
    "alt": "Technician inspecting commercial metal ductwork",
    "eyebrow": "Good people working together",
    "caption": "Bring your customers a service you can discuss with confidence."
  },
  "/case-studies": {
    "image": "/images/pac/realEquipment.webp",
    "alt": "Cleaning equipment from the PAC field-photo library",
    "eyebrow": "A closer look at the work",
    "caption": "Property-specific scopes. Practical coordination."
  },
  "/case-studies/apartment-community-42-units": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright living room with natural light",
    "eyebrow": "Care across a shared community",
    "caption": "The planning behind service in an occupied property."
  },
  "/case-studies/nonprofit-housing-office-hvac": {
    "image": "/images/pac/office.webp",
    "alt": "Open workplace with visible ventilation ductwork",
    "eyebrow": "Shared spaces, thoughtfully maintained",
    "caption": "HVAC care planned around the people who use the building."
  },
  "/blog": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright living room with natural light",
    "eyebrow": "The PAC air care journal",
    "caption": "Helpful answers for the spaces you care about."
  },
  "/health-benefits": {
    "image": "/images/pac/family.webp",
    "alt": "A couple relaxing together at home",
    "eyebrow": "A little clarity about indoor air",
    "caption": "Good information belongs in a comfortable home."
  },
  "/air-quality-calculator": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright living room with natural light",
    "eyebrow": "Get to know your system",
    "caption": "A practical checklist, one question at a time."
  },
  "/privacy-policy": {
    "image": "/images/pac/sky.webp",
    "alt": "Blue sky and clouds",
    "eyebrow": "Your information, treated with care",
    "caption": "Clear information from Pure Air California."
  },
  "/terms-of-service": {
    "image": "/images/pac/coast.webp",
    "alt": "California coastline",
    "eyebrow": "Clear expectations from the start",
    "caption": "The details of working with Pure Air California."
  },
  "/dryer-safety": {
    "image": "/images/pac/dryer.webp",
    "alt": "Lint at a dryer exhaust connection",
    "eyebrow": "Look beyond the lint screen",
    "caption": "Plan the care your exhaust system needs."
  },
  "/compare": {
    "image": "/images/pac/consultation.webp",
    "alt": "A service professional discussing paperwork with a homeowner",
    "eyebrow": "Choose your service with confidence",
    "caption": "Ask good questions. Understand the scope."
  },
  "/commercial-services": {
    "image": "/images/pac/commercial.webp",
    "alt": "Technician inspecting commercial metal ductwork",
    "eyebrow": "The right plan for your property",
    "caption": "Professional care for your business’s ventilation."
  },
  "/blog/air-duct-cleaning-faq": {
    "image": "/images/pac/residential.webp",
    "alt": "Technician cleaning a ceiling ventilation opening",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/dryer-vent-safety-guide": {
    "image": "/images/pac/dryer.webp",
    "alt": "Lint at a dryer exhaust connection",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/commercial-indoor-air-quality-guide": {
    "image": "/images/pac/office.webp",
    "alt": "Open workplace with visible ventilation ductwork",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/health-benefits-air-duct-cleaning": {
    "image": "/images/pac/family.webp",
    "alt": "A couple relaxing together at home",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/importance-of-regular-air-duct-cleaning": {
    "image": "/images/pac/filter.webp",
    "alt": "Metal electrostatic collector cells removed for servicing",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/clean-air-ducts-allergy-relief": {
    "image": "/images/pac/homeInterior.webp",
    "alt": "Bright living room with natural light",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/signs-air-ducts-need-cleaning": {
    "image": "/images/pac/dirtyDuct.webp",
    "alt": "Ductwork with accumulated debris",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/residential-air-duct-cleaning-los-angeles": {
    "image": "/images/pac/residential.webp",
    "alt": "Technician cleaning a ceiling ventilation opening",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/commercial-air-duct-cleaning-los-angeles-businesses": {
    "image": "/images/pac/commercial.webp",
    "alt": "Technician inspecting commercial metal ductwork",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/industrial-air-duct-cleaning-safety-efficiency": {
    "image": "/images/pac/industrial.webp",
    "alt": "Industrial ventilation and workshop equipment",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/hospital-healthcare-air-duct-cleaning": {
    "image": "/images/pac/healthcare.webp",
    "alt": "Ventilation in a healthcare facility corridor",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/restaurant-kitchen-air-duct-cleaning": {
    "image": "/images/pac/restaurant.webp",
    "alt": "Ventilation cleaning in a commercial kitchen",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/laundromat-dryer-vent-cleaning-safety": {
    "image": "/images/pac/laundromat.webp",
    "alt": "Laundry machines and overhead exhaust ductwork",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/hotel-air-quality-guest-satisfaction": {
    "image": "/images/pac/hotel.webp",
    "alt": "Welcoming hotel guest room",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/air-duct-cleaning-cost-los-angeles": {
    "image": "/images/pac/consultation.webp",
    "alt": "A service professional discussing paperwork with a homeowner",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/air-duct-cleaning-after-wildfire-los-angeles": {
    "image": "/images/pac/losAngeles.webp",
    "alt": "Los Angeles skyline beyond Griffith Observatory",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/signs-los-angeles-air-ducts-need-cleaning-2026": {
    "image": "/images/pac/dirtyDuct.webp",
    "alt": "Ductwork with accumulated debris",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/is-air-duct-cleaning-worth-it": {
    "image": "/images/pac/cleanDuct.webp",
    "alt": "Inside a clean metal air duct",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  },
  "/blog/avoid-air-duct-cleaning-scams-los-angeles": {
    "image": "/images/pac/consultation.webp",
    "alt": "A service professional discussing paperwork with a homeowner",
    "eyebrow": "The PAC air care journal",
    "caption": "Practical guidance for homes and businesses."
  }
};
export function getPageHero(pathname:string):PageHeroStory {const key=pathname.replace(/\/$/,'');return stories[key]||{image:'/images/pac/losAngeles.webp',alt:'Los Angeles cityscape',eyebrow:'Local care. One PAC team.',caption:'Caring for homes, businesses and the people inside.'};}
