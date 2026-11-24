import catalog from './businessCatalog.json';
import cityNotes from './businessLocalNotes.json';
import { locationData } from '@/pages/locations/data';

export const businessCatalog = catalog;
export type BusinessMarket = typeof catalog[number];
export const businessCities = locationData;
export const businessLocationPath = (market: BusinessMarket, citySlug: string) => `/industries/${market.slug}/${citySlug}/`;
export const findBusiness = (slug: string | undefined) => catalog.find(market => market.slug === slug);
export const regionNames: Record<string, string> = {
  coastal: 'Coastal communities', westside: 'Westside', foothill: 'Foothill communities',
  'urban-core': 'Central Los Angeles', 'san-fernando-valley': 'San Fernando Valley', canyon: 'Canyon communities', historic: 'Established neighborhoods',
};

// Planning questions, not claims of contamination or completed jobs in a city.
const regionalPlanning: Record<string, { title: string; detail: string; question: string }> = {
  coastal: { title: 'Condition before assumptions', detail: 'Proximity to the coast does not establish that a system needs cleaning. Ask for the condition of accessible components to be reviewed, and describe any visible moisture or damage separately from routine dust removal.', question: 'Which components need cleaning, and are any condition issues outside that scope?' },
  westside: { title: 'Shared access, clearly assigned', detail: 'When a property shares a building, roof or service route, confirm the equipment boundary and the person authorized to provide access. Tenant layouts and later alterations can change which spaces a system serves.', question: 'Who controls the equipment and the route needed to reach it?' },
  foothill: { title: 'Plan the equipment route', detail: 'Describe the route from the service vehicle to the building and equipment, including slopes, gates and changes in level where present. If a specific event prompted the enquiry, identify it before requesting a routine cleaning scope.', question: 'Can the crew reach every included component through the approved access route?' },
  'urban-core': { title: 'Coordinate the building, not just the room', detail: 'In a multi-tenant building, mechanical rooms, lifts, loading areas and roof access may be controlled by different contacts. Put the approved access sequence and tenant boundaries alongside the equipment list.', question: 'Are loading, lift, mechanical-room and roof arrangements confirmed for the same work window?' },
  'san-fernando-valley': { title: 'Match the work to the equipment', detail: 'Provide the equipment location and the rooms or zones it serves. Where work interrupts occupied areas, identify which equipment can be released and how the facility team will manage the work window.', question: 'Which zones can be taken out of service together without conflicting with site operations?' },
  canyon: { title: 'Make access part of the estimate', detail: 'Flag any narrow approaches, gates, parking limits or level changes at your property. Access requirements belong in the estimate, rather than being discovered after equipment arrives.', question: 'What should the crew know about vehicle access, carrying routes and equipment locations?' },
  historic: { title: 'Understand the present layout', detail: 'For a building with alterations or sensitive finishes, use current system information and identify protected surfaces. Building age alone does not determine condition, and cleaning should not be confused with repair or restoration.', question: 'Does the proposed route protect finishes and reflect the current equipment layout?' },
};

export function getBusinessLocalContent(market: BusinessMarket, city: typeof locationData[number]) {
  const planning = regionalPlanning[city.region] || regionalPlanning.westside;
  const title = `${market.service} in ${city.name}`;
  const description = `${market.shortLabel} air care in ${city.name}. Review ${market.slug === 'laundromats' ? 'dryer exhaust' : 'duct cleaning'} scope, site access and scheduling. Ask PAC for a site-specific estimate.`;
  return { title, description, planning, cityNote: cityNotes[city.slug as keyof typeof cityNotes],
    localBrief: `For ${market.label.toLowerCase()} in ${city.name}, start the discussion with your ${market.contact.toLowerCase()}. ${planning.detail}`,
    faqs: [
      { question: `How is ${market.service.toLowerCase()} in ${city.name} priced?`, answer: `The estimate follows your equipment, included components, condition and access. ${market.checklist[0]} helps establish the starting scope. Provide the ${city.name} address and any available photos; pricing and the appointment are confirmed after the project is reviewed.` },
      { question: market.question, answer: market.answer },
      { question: `What access information matters for this ${city.name} property?`, answer: `${planning.detail} The person to involve is your ${market.contact.toLowerCase()}.` },
      { question: 'What should the written scope distinguish?', answer: market.boundary },
    ],
  };
}
