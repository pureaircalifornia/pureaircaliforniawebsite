import { Link } from '@/components/CanonicalLink';

const guides: Record<string, [string, string][]> = {
  'residential-air-duct-cleaning': [
    ['Plan a Los Angeles home duct-cleaning visit', 'residential-air-duct-cleaning-los-angeles'],
    ['5 reasons to have your air ducts inspected', 'signs-air-ducts-need-cleaning'],
    ['Air duct cleaning cost in Los Angeles: quote guide', 'air-duct-cleaning-cost-los-angeles'],
  ],
  'commercial-air-duct-cleaning': [
    ['Prepare a commercial duct-cleaning scope in LA', 'commercial-air-duct-cleaning-los-angeles-businesses'],
    ['Commercial indoor air quality: a manager’s guide', 'commercial-indoor-air-quality-guide'],
    ['How to compare written LA estimates', 'avoid-air-duct-cleaning-scams-los-angeles'],
  ],
  'commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles': [
    ['Prepare a commercial duct-cleaning scope in LA', 'commercial-air-duct-cleaning-los-angeles-businesses'],
    ['Commercial indoor air quality: a manager’s guide', 'commercial-indoor-air-quality-guide'],
    ['Laundromat & shared dryer exhaust planning', 'laundromat-dryer-vent-cleaning-safety'],
  ],
  'wildfire-smoke-hillside-air-duct-cleaning-los-angeles': [
    ['After wildfire smoke: planning HVAC assessment in LA', 'air-duct-cleaning-after-wildfire-los-angeles'],
    ['7 questions before booking duct cleaning in LA', 'signs-los-angeles-air-ducts-need-cleaning-2026'],
    ['Is air duct cleaning worth it? Decide from the scope', 'is-air-duct-cleaning-worth-it'],
  ],
  'residential-dryer-vent-cleaning': [
    ['Dryer vent safety: a homeowner’s checklist', 'dryer-vent-safety-guide'],
    ['Air duct cleaning cost & written quote guide', 'air-duct-cleaning-cost-los-angeles'],
    ['7 questions before booking duct service in LA', 'signs-los-angeles-air-ducts-need-cleaning-2026'],
  ],
  'commercial-dryer-vent-cleaning': [
    ['Plan commercial & laundromat dryer exhaust work', 'laundromat-dryer-vent-cleaning-safety'],
    ['Hotel ventilation & laundry exhaust scheduling', 'hotel-air-quality-guest-satisfaction'],
    ['Prepare a commercial ventilation scope in LA', 'commercial-air-duct-cleaning-los-angeles-businesses'],
  ],
  'hvac-system-cleaning': [
    ['HVAC maintenance vs. duct cleaning explained', 'importance-of-regular-air-duct-cleaning'],
    ['Compare written LA cleaning estimates', 'air-duct-cleaning-cost-los-angeles'],
    ['After wildfire smoke: HVAC assessment guide', 'air-duct-cleaning-after-wildfire-los-angeles'],
  ],
  'dryer-vent-maintenance-program': [
    ['Homeowner dryer vent safety checklist', 'dryer-vent-safety-guide'],
    ['Commercial laundry & manifold maintenance logs', 'laundromat-dryer-vent-cleaning-safety'],
    ['Hotel rooms & laundry exhaust scheduling', 'hotel-air-quality-guest-satisfaction'],
  ],
  'residential-electrostatic-filter': [
    ['Air ducts, filtration & allergies: what to know', 'clean-air-ducts-allergy-relief'],
    ['HVAC maintenance & filter care explained', 'importance-of-regular-air-duct-cleaning'],
    ['Air duct cleaning & health: evidence and limits', 'health-benefits-air-duct-cleaning'],
  ],
  'commercial-electrostatic-filter': [
    ['Commercial indoor air quality: a manager’s guide', 'commercial-indoor-air-quality-guide'],
    ['Prepare a commercial ventilation scope in LA', 'commercial-air-duct-cleaning-los-angeles-businesses'],
    ['Industrial & warehouse HVAC planning', 'industrial-air-duct-cleaning-safety-efficiency'],
  ],
  'air-duct-sanitizing': [
    ['Air duct cleaning & health: evidence and limits', 'health-benefits-air-duct-cleaning'],
    ['Choosing a duct cleaner in LA: avoid vague quotes', 'avoid-air-duct-cleaning-scams-los-angeles'],
    ['Is air duct cleaning worth it? Decide from the scope', 'is-air-duct-cleaning-worth-it'],
  ],
  'laundromat-dryer-vent-cleaning': [
    ['Laundromat dryer vent cleaning: plan the work', 'laundromat-dryer-vent-cleaning-safety'],
    ['Prepare a commercial ventilation scope in LA', 'commercial-air-duct-cleaning-los-angeles-businesses'],
    ['Dryer vent safety checklist', 'dryer-vent-safety-guide'],
  ],
};

const areasByService: Record<string, [string, string][]> = {
  'residential-air-duct-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['Beverly Hills', 'beverly-hills'],
    ['Santa Monica', 'santa-monica'],
    ['Malibu', 'malibu'],
    ['Pasadena', 'pasadena'],
  ],
  'wildfire-smoke-hillside-air-duct-cleaning-los-angeles': [
    ['Los Angeles', 'los-angeles'],
    ['Pacific Palisades', 'pacific-palisades'],
    ['Malibu', 'malibu'],
    ['Brentwood', 'brentwood'],
    ['Pasadena', 'pasadena'],
  ],
  'residential-dryer-vent-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['Sherman Oaks', 'sherman-oaks'],
    ['Studio City', 'studio-city'],
    ['Santa Monica', 'santa-monica'],
    ['West Hollywood', 'west-hollywood'],
  ],
  'commercial-air-duct-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['Downtown LA', 'downtown-la'],
    ['Century City', 'century-city'],
    ['Burbank', 'burbank'],
    ['Glendale', 'glendale'],
  ],
  'commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles': [
    ['Los Angeles', 'los-angeles'],
    ['Century City', 'century-city'],
    ['Westwood', 'westwood'],
    ['Sherman Oaks', 'sherman-oaks'],
    ['Culver City', 'culver-city'],
  ],
  'commercial-dryer-vent-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['West Hollywood', 'west-hollywood'],
    ['Culver City', 'culver-city'],
    ['Koreatown', 'koreatown'],
    ['Van Nuys', 'van-nuys'],
  ],
  'laundromat-dryer-vent-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['Koreatown', 'koreatown'],
    ['Hollywood', 'hollywood'],
    ['North Hollywood', 'north-hollywood'],
    ['Van Nuys', 'van-nuys'],
  ],
  'dryer-vent-maintenance-program': [
    ['Los Angeles', 'los-angeles'],
    ['Westwood', 'westwood'],
    ['Santa Monica', 'santa-monica'],
    ['Encino', 'encino'],
    ['Burbank', 'burbank'],
  ],
  'hvac-system-cleaning': [
    ['Los Angeles', 'los-angeles'],
    ['Woodland Hills', 'woodland-hills'],
    ['Pasadena', 'pasadena'],
    ['Encino', 'encino'],
    ['Brentwood', 'brentwood'],
  ],
  'air-duct-sanitizing': [
    ['Los Angeles', 'los-angeles'],
    ['Los Feliz', 'los-feliz'],
    ['Glendale', 'glendale'],
    ['Calabasas', 'calabasas'],
    ['Santa Monica', 'santa-monica'],
  ],
  'residential-electrostatic-filter': [
    ['Los Angeles', 'los-angeles'],
    ['Beverly Hills', 'beverly-hills'],
    ['Calabasas', 'calabasas'],
    ['Studio City', 'studio-city'],
    ['Pasadena', 'pasadena'],
  ],
  'commercial-electrostatic-filter': [
    ['Los Angeles', 'los-angeles'],
    ['Downtown LA', 'downtown-la'],
    ['Century City', 'century-city'],
    ['Culver City', 'culver-city'],
    ['Glendale', 'glendale'],
  ],
};

const defaultAreas: [string, string][] = [
  ['Los Angeles', 'los-angeles'],
  ['Beverly Hills', 'beverly-hills'],
  ['Santa Monica', 'santa-monica'],
  ['Pasadena', 'pasadena'],
  ['Sherman Oaks', 'sherman-oaks'],
];

export default function ServiceResources({
  path,
  coverageText,
}: {
  path: string;
  coverageText?: string;
}) {
  const slug = path.split('/').filter(Boolean).pop() || '';
  const serviceGuides = guides[slug] || [];
  const serviceAreas = areasByService[slug] || defaultAreas;

  return (
    <section
      className="pac-service-resources pac-container"
      aria-label="Service planning and local coverage"
    >
      <div>
        <span className="pac-eyebrow">BEFORE YOU BOOK</span>
        <h2>
          Useful answers.
          <br />
          A clearer next step.
        </h2>
        <ul>
          {serviceGuides.map(([label, article]) => (
            <li key={article}>
              <Link to={`/blog/${article}/`}>{label} →</Link>
            </li>
          ))}
          <li>
            <Link to="/pricing/">Transparent LA pricing &amp; written estimates →</Link>
          </li>
          <li>
            <Link to="/air-quality-calculator/">Interactive LA home air-care checklist →</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className="pac-eyebrow">LOCAL LOS ANGELES COVERAGE</span>
        <h2>Find your service area.</h2>
        <p>
          {coverageText ||
            'Serving homes, HOAs, and commercial properties across Los Angeles County and parts of Ventura County. Confirm your address and access when requesting an estimate.'}
        </p>
        <ul>
          {serviceAreas.map(([label, area]) => (
            <li key={area}>
              <Link to={`/locations/${area}/`}>{label} service guide →</Link>
            </li>
          ))}
        </ul>
        <Link className="pac-text-link" to="/locations/">
          Explore all 54 Greater LA service areas →
        </Link>
      </div>
    </section>
  );
}
