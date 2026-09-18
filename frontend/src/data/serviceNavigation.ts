export const serviceGroups = [
 {id:'home',title:'For your home',intro:'Care for the systems you live with every day.',image:'/images/pac/residential.webp',alt:'Technician cleaning a ceiling duct opening in a home',items:[
  {label:'Residential air duct cleaning',path:'/services/residential-air-duct-cleaning/',detail:'Supply and return ductwork'},
  {label:'Residential dryer vent cleaning',path:'/services/residential-dryer-vent-cleaning/',detail:'Lint removal and exhaust care'},
  {label:'Home electrostatic filters',path:'/services/residential-electrostatic-filter/',detail:'Reusable filter inspection and care'}]},
 {id:'business',title:'For your business',intro:'A clear scope. A plan around your operation.',image:'/images/pac/commercial.webp',alt:'Technician inspecting commercial metal ventilation ductwork',items:[
  {label:'Commercial air duct cleaning',path:'/services/commercial-air-duct-cleaning/',detail:'Offices, facilities and shared buildings'},
  {label:'Commercial dryer vent cleaning',path:'/services/commercial-dryer-vent-cleaning/',detail:'Hotels and shared laundry rooms'},
  {label:'Commercial electrostatic filters',path:'/services/commercial-electrostatic-filter/',detail:'Collector-cell inspection and maintenance'},
  {label:'Laundromat dryer vent cleaning',path:'/services/laundromat-dryer-vent-cleaning/',detail:'Dedicated commercial laundry exhaust'}]},
 {id:'system-care',title:'Complete system care',intro:'Specialized cleaning and ongoing attention.',image:'/images/pac/hvac.webp',alt:'Technicians working on HVAC system equipment',items:[
  {label:'HVAC system cleaning',path:'/services/hvac-system-cleaning/',detail:'Equipment, components and connections'},
  {label:'Dryer vent maintenance',path:'/services/dryer-vent-maintenance-program/',detail:'An ongoing plan for your property'},
  {label:'Air duct sanitizing',path:'/services/air-duct-sanitizing/',detail:'Treatment options after assessment'}]},
] as const;
export const commercialMarkets = [
 {label:'Property managers & HOAs',detail:'Apartments and shared communities',path:'/property-managers/'},
 {label:'Offices & commercial real estate',detail:'Workplaces and managed buildings',path:'/industries/commercial-real-estate/'},
 {label:'Hotels & hospitality',detail:'Guestrooms, common areas and laundry',path:'/industries/hospitality/'},
 {label:'Restaurants',detail:'Dining areas and ventilation systems',path:'/industries/restaurants/'},
 {label:'Healthcare',detail:'Clinics, medical offices and facilities',path:'/industries/healthcare/'},
 {label:'Schools & education',detail:'Classrooms and campus buildings',path:'/industries/education/'},
 {label:'Manufacturing',detail:'Industrial facilities and equipment',path:'/industries/manufacturing/'},
 {label:'Retail',detail:'Stores, showrooms and shopping spaces',path:'/industries/retail/'},
] as const;
