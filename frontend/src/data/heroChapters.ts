import type { PageHeroStory } from './pageHeroes';
import { locationData } from '@/pages/locations/data';
import businessCatalog from './businessCatalog.json';

export type HeroChapter = { image: string; alt: string; label: string; text: string; position?: string; srcSet?: string; note?: string; airflow?: boolean; fallback?: { image: string; alt: string; text: string; note?: string } };
const homeFallback = { image: '/images/pac/homeInterior.webp', alt: 'Bright furnished home interior with a blue couch', text: 'Your space. Your system. A clear plan for its care.', note: 'Illustrative home interior.' };
const photo = (name: string, alt: string, label: string, text: string): HeroChapter => ({ image: `/images/pac/${name}.webp`, alt, label, text });
const inside = () => photo('realInspection', 'PAC field photograph looking inside a ventilation opening', 'Look inside', 'We start with a closer look at the ducts that serve your space, then explain what needs attention.');
const equipment = () => photo('realEquipment', 'Portable air-system cleaning equipment and hoses', 'PAC steps in', 'Pure Air California prepares the space, agrees the scope with you, and gets to work caring for the air pathways inside.');
const home = () => photo('homeInterior', 'Bright furnished home interior', 'Back to everyday', 'The quiet moments at home. The people around the table. A space worth looking after.');
const planning = (): HeroChapter => ({ image: '/images/visual-story/consultation-pac-v3-1280.webp', srcSet: '/images/visual-story/consultation-pac-v3-640.webp 640w, /images/visual-story/consultation-pac-v3-1280.webp 1280w, /images/visual-story/consultation-pac-v3-1920.webp 1920w', alt: 'Illustrated PAC service consultation with the Pure Air California shirt logo', label: 'People first', text: 'Your equipment. Your schedule. A clear next step.', note: 'Illustrative service consultation.', fallback: homeFallback });
const hvac = () => photo('hvac', 'Technicians working on HVAC equipment', 'System care', 'Behind a comfortable room is a working system. Let’s give its ducts and components the attention they need.');
const familyHome = (): HeroChapter => ({
  image: '/images/visual-story/home-family-1280.webp',
  srcSet: '/images/visual-story/home-family-640.webp 640w, /images/visual-story/home-family-1280.webp 1280w, /images/visual-story/home-family-1920.webp 1920w',
  alt: 'Illustrated everyday family life: a baby playing safely beside a blue couch and a wall air vent',
  label: 'Life at home',
  text: 'Little moments happen close to the floor. The air pathways behind them deserve a closer look.',
  note: 'Illustrated home setting. Airflow animation shows a pathway, not measured air quality.',
  position: 'center 60%',
  airflow: true,
  fallback: homeFallback,
});
const allergyHome = (): HeroChapter => ({
  image: '/images/visual-story/allergy-home-1280.webp',
  srcSet: '/images/visual-story/allergy-home-640.webp 640w, /images/visual-story/allergy-home-1280.webp 1280w, /images/visual-story/allergy-home-1920.webp 1920w',
  alt: 'Illustrated home setting with an adult using a tissue while seated near a blue couch',
  label: 'Allergy questions',
  text: 'Sneezing at home? Start by understanding the whole indoor environment.',
  note: 'Duct cleaning has not been shown to prevent health problems or treat allergies. Filtration, ventilation and other sources matter too.',
  position: 'center',
  fallback: { ...homeFallback, text: 'Questions about indoor air? Consider ventilation, filtration and the condition of your system.', note: 'Duct cleaning has not been shown to prevent health problems or treat allergies. Filtration, ventilation and other sources matter too.' },
});

/** Short visual chapters, preserving the route's own opening photograph. */
export function getHeroChapters(pathname: string, opening: PageHeroStory, estateStory = false): HeroChapter[] {
  const path = pathname.replace(/\/$/, '');
  if (opening.image === '/images/pac/consultation.webp') {
    opening = { ...opening, image: planning().image, alt: planning().alt };
  }
  if (path === '/services/residential-air-duct-cleaning') {
    if (estateStory) return [
      { image: '/images/pac/homeInterior.webp', alt: 'Illustrative sunlit sitting room with cream seating, wood floors and tall windows', label: 'A home worth caring for', text: 'Considered care for the systems behind a beautifully kept home.', note: 'Illustrative interior; not a client property or completed PAC project.' },
      { ...inside(), text: 'From the main residence to a guest house, identify each system and agree what needs cleaning.' },
      { ...equipment(), label: 'Care around your home', text: 'Plan equipment access, work areas and protection around the finishes that matter to you.' },
      { ...planning(), label: 'Your estate team', text: 'One clear scope for the homeowner, estate manager and on-site contact.' },
    ];
    return [familyHome(), allergyHome(), { ...inside(), text: 'Look inside. Identify the buildup. Agree what needs cleaning.' }, { ...equipment(), label: 'A clear plan', text: 'Protect your home, clean the agreed ductwork, and walk through the completed work with you.' }];
  }
  if (/^\/(health-benefits|allergies)(\/|$)/.test(path) || /allerg/.test(path)) {
    return [allergyHome(), familyHome(), { ...photo('filter', 'Electrostatic filter collector cells ready for inspection', 'Check the filter', 'Filter condition, fit and regular maintenance are part of understanding your system.'), airflow: true }, inside()];
  }
  const market = businessCatalog.find(item => item.parentPath.replace(/\/$/,'') === path || path.startsWith(`/industries/${item.slug}/`));
  if (market || path === '/industries') {
    const city = locationData.find(item => path === `/industries/${market?.slug}/${item.slug}`);
    return [
      { ...opening, label: market?.label || 'Your business', text: market?.promise || opening.caption },
      { image: city?.region === 'coastal' ? '/images/breath/coastal-breath-1440.webp' : '/images/breath/living-forest-1440.webp', alt: city?.region === 'coastal' ? 'Pacific waves meeting the California coastline' : 'A meadow and evergreen trees under open skies', label: 'Room to breathe', text: 'A moment outside reminds us why the air inside deserves our attention.' },
      inside(),
      { image:'/images/pac/realEquipment.webp',alt:'Cleaning equipment photographed in the PAC field archive',label:'PAC steps in',text:city ? `A clear scope for your ${city.name} property, with access and timing agreed before work begins.` : 'An equipment-specific scope. Agreed access. Real people you can talk to.' },
    ];
  }
  let label = 'Your air path';
  let text = 'Air ducts · Inspection · Cleaning';
  let next = [inside(), equipment()];
  if (path.startsWith('/locations')) {
    label = 'Your neighborhood'; text = 'Local homes · Local businesses · PAC care';
    next = [inside(), planning()];
  } else if (/dryer|laundromat|soulcycle/.test(path)) {
    label = 'Dryer vent care'; text = 'Laundry · Lint · Exhaust paths';
    next = [photo('dryer', 'Exterior dryer exhaust vent', 'Trace the vent', 'Connections · Routing · Access'), equipment()];
  } else if (path.includes('filter')) {
    label = 'Electrostatic filters'; text = 'Collector cells · Fit · Filtration'; next = [hvac(), planning()];
  } else if (path.includes('sanitiz')) {
    label = 'Assess first'; text = 'System condition · Suitable treatment'; next = [inside(), planning()];
  } else if (/hospitality|hotel/.test(path)) {
    label = 'Guest comfort'; text = 'Guestrooms · Shared spaces · Laundry';
    next = [hvac(), photo('laundromat', 'Commercial laundry machines and exhaust ductwork', 'Laundry care', 'Dryer vents · Exhaust · Maintenance')];
  } else if (/restaurant|taco-bell/.test(path)) {
    label = 'Restaurant care'; text = 'Dining areas · HVAC · Service windows'; next = [hvac(), planning()];
  } else if (/healthcare|hospital-/.test(path)) {
    label = 'Facility care'; text = 'Patient spaces · HVAC · Coordination'; next = [hvac(), equipment()];
  } else if (/manufactur|industrial/.test(path)) {
    label = 'Your operation'; text = 'Ventilation · Equipment · Site access'; next = [hvac(), equipment()];
  } else if (path.includes('education')) {
    label = 'Campus care'; text = 'Classrooms · Shared spaces · HVAC'; next = [hvac(), planning()];
  } else if (/retail|bassett/.test(path)) {
    label = 'Welcoming spaces'; text = 'Showrooms · Customer areas · Ventilation'; next = [inside(), hvac()];
  } else if (/pricing|quote|contact|compare|cost|scams/.test(path)) {
    label = 'Your space'; text = 'Home · Business · Managed property'; next = [inside(), planning()];
  } else if (path === '/about' || path === '/partners') {
    label = 'Meet PAC'; text = 'Local people · Personal service';
    next = [photo('losAngeles', 'Los Angeles skyline beyond Griffith Observatory', 'Local roots', 'Los Angeles · Neighborhoods · Community'), equipment()];
  } else if (/privacy|terms/.test(path)) {
    label = 'Clear expectations'; text = 'Your information · Your choices'; next = [home(), planning()];
  } else if (/health-benefits|allerg|air-quality|worth-it/.test(path)) {
    label = 'Everyday comfort'; text = 'Ventilation · Filtration · System care';
    next = [photo('filter', 'Metal electrostatic collector cells removed for servicing', 'Filtration', 'Filter fit · Condition · Maintenance'), home()];
  } else if (/commercial|industries|property-managers|housing|apartment-community/.test(path)) {
    label = 'Your building'; text = 'Offices · Businesses · Managed properties'; next = [hvac(), equipment()];
  } else if (path.includes('hvac') || path === '/services') {
    label = 'Connected systems'; text = 'Air ducts · Dryer vents · HVAC · Filters'; next = [inside(), equipment()];
  } else if (path.startsWith('/case-studies')) {
    label = 'From the field'; text = 'Property · Scope · Project details'; next = [inside(), equipment()];
  } else if (path.startsWith('/blog')) {
    label = 'A closer look'; text = 'Practical advice · Clear next steps'; next = [inside(), planning()];
  }
  // Nature is a visual connection, never a promise that duct cleaning purifies air.
  let outdoors = photo('nature', 'Sunlit California valley with trees and granite mountains', 'Room to breathe', 'California gives us places to pause. Indoors, thoughtful system care helps us look after the spaces we share.');
  text = opening.caption;
  const city = locationData.find(location => path === `/locations/${location.slug}`);
  if (city) {
    text = `Home, work, and everything between. Air duct and dryer vent care for the places you love in ${city.name}.`;
    outdoors = city.region === 'coastal'
      ? photo('coast', 'California coastline, an illustration of coastal life', 'Coastal living', `From time by the water to time at home in ${city.name}, comfort starts with understanding your own building and its ventilation.`)
      : photo('nature', 'California landscape, an illustration of time outdoors', 'Outside & inside', `Life in ${city.name} moves between outdoors and indoors. We help you plan care for the air ducts and dryer vents inside.`);
    next = [inside(), { ...planning(), text: city.localContext }];
  } else if (/healthcare|hospital-/.test(path)) {
    next = [hvac(), { ...planning(), text: 'Patients, visitors, and the people caring for them come first. We coordinate access and work windows with your facility team.' }];
  } else if (/hospitality|hotel/.test(path)) {
    next = [hvac(), photo('hotel', 'Welcoming hotel guest room', 'A welcoming stay', 'A restful room, a fresh start to the day. Plan HVAC and laundry exhaust care around your guests and housekeeping team.')];
  } else if (path.includes('education')) {
    next = [hvac(), { ...planning(), text: 'For the students finding their voice and the teachers helping them grow. Plan ventilation work around the school day.' }];
  } else if (/restaurant|taco-bell/.test(path)) {
    next = [hvac(), { ...planning(), text: 'The first guests through the door. The team preparing for service. Arrange HVAC care around the rhythm of your restaurant.' }];
  } else if (/manufactur|industrial/.test(path)) {
    next = [equipment(), { ...planning(), text: 'People keep your operation moving. Coordinate equipment access and ventilation cleaning around their work.' }];
  } else if (/retail|bassett/.test(path)) {
    next = [inside(), { ...planning(), text: 'Make room for a welcoming day, from your opening team to your last customer. Plan duct care around trading hours.' }];
  } else if (/residential-air|health-benefits|allerg/.test(path)) {
    next = [inside(), photo('family', 'A couple relaxing together at home', 'For your people', 'Slow mornings. Shared meals. Time together. We care for the systems behind the home you love.')];
  }
  const chapters: HeroChapter[] = [{ ...opening, label, text }, outdoors, ...next];
  const used = new Set<string>();
  const alternatives = [inside(), equipment(), planning(), hvac(), home()];
  return chapters.map(chapter => {
    const unique = used.has(chapter.image) ? alternatives.find(item => !used.has(item.image))! : chapter;
    used.add(unique.image);
    return unique.image.startsWith('/images/visual-story/consultation-pac-v3-') ? { ...planning(), ...unique } : unique;
  });
}
