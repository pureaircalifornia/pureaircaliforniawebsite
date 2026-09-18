import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { locationData } from '@/pages/locations/data';
const guides = [
 { slug: 'brentwood', label: 'Brentwood', text: 'Homes, condos and neighborhood businesses. Plan duct care on the Westside of Los Angeles.' },
 { slug: 'culver-city', label: 'Culver City', text: 'From home HVAC systems to studio laundry exhaust. Match the service to your space.' },
 { slug: 'century-city', label: 'Century City', text: 'Condos, office suites and managed buildings. Start with the equipment and approved access.' },
];
export default function WestsideGuides() {
 return <section className="pac-section pac-container pac-westside-guides">
  <div className="pac-section-heading"><div><span className="pac-eyebrow">YOUR NEIGHBORHOOD. YOUR NEXT STEP.</span><h2>Westside air care.<br/><em>With the details that matter.</em></h2></div><p>Find local service information for your home or business, practical booking questions and project history where available.</p></div>
  <div className="pac-westside-grid">{guides.map(guide => <Link key={guide.slug} to={'/locations/' + guide.slug + '/'} className="pac-westside-card">
    <img src={locationData.find(area => area.slug === guide.slug)?.image} alt={guide.label + ' service-area architecture'} width="800" height="500" loading="lazy"/>
    <div><h3>{guide.label} air duct cleaning</h3><p>{guide.text}</p><span className="pac-text-link">Your local guide <ArrowUpRight size={17}/></span></div>
  </Link>)}</div>
 </section>;
}
