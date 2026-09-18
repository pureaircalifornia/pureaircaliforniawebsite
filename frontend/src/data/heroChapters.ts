import type { PageHeroStory } from './pageHeroes';

export type HeroChapter = { image: string; alt: string; label: string; text: string; position?: string };
const photo = (name: string, alt: string, label: string, text: string): HeroChapter => ({ image: `/images/pac/${name}.webp`, alt, label, text });
const inside = () => photo('realInspection', 'PAC field photograph looking inside a ventilation opening', 'Inspect', 'Ductwork · Condition · Access');
const equipment = () => photo('realEquipment', 'Portable air-system cleaning equipment and hoses', 'Clean', 'Equipment · Debris removal · Care');
const home = () => photo('homeInterior', 'Bright furnished home interior', 'Enjoy your space', 'Everyday comfort · Ongoing care');
const planning = () => photo('consultation', 'A service professional discussing paperwork with a homeowner', 'Plan together', 'Clear scope · Your schedule · Free estimate');
const hvac = () => photo('hvac', 'Technicians working on HVAC equipment', 'System care', 'Air paths · Equipment · Maintenance');

/** Short visual chapters, preserving the route's own opening photograph. */
export function getHeroChapters(pathname: string, opening: PageHeroStory): HeroChapter[] {
  const path = pathname.replace(/\/$/, '');
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
  const chapters: HeroChapter[] = [{ ...opening, label, text }, ...next];
  const used = new Set<string>();
  const alternatives = [inside(), equipment(), planning(), hvac(), home()];
  return chapters.map(chapter => {
    const unique = used.has(chapter.image) ? alternatives.find(item => !used.has(item.image))! : chapter;
    used.add(unique.image);
    return unique;
  });
}
