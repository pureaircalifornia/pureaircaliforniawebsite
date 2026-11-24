import { locationImageAlt } from '@/data/locationImageAlts';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight } from 'lucide-react';
import { locationData } from '@/pages/locations/data';

const guides = [
  {
    slug: 'brentwood',
    label: 'Brentwood',
    text: 'Homes, condos and neighborhood businesses. Plan duct care on the Westside of Los Angeles.',
  },
  {
    slug: 'culver-city',
    label: 'Culver City',
    text: 'From home HVAC systems to studio laundry exhaust. Match the service to your space.',
  },
  {
    slug: 'century-city',
    label: 'Century City',
    text: 'Condos, office suites and managed buildings. Start with the equipment and approved access.',
  },
];

export default function WestsideGuides() {
  return (
    <section className="pac-section pac-container pac-westside-guides">
      <div className="pac-section-heading">
        <div>
          <span className="pac-eyebrow">YOUR NEIGHBORHOOD. YOUR NEXT STEP.</span>
          <h2>
            Westside air care.
            <br />
            <em>With the details that matter.</em>
          </h2>
        </div>
        <p>
          Find local service information for your home or business, practical booking questions, and documented project
          history where available.
        </p>
      </div>
      <div className="pac-westside-grid">
        {guides.map((guide) => {
          const entry = locationData.find((area) => area.slug === guide.slug);
          return (
            <Link key={guide.slug} to={`/locations/${guide.slug}/`} className="pac-westside-card">
              <img
                src={entry?.image}
                srcSet={`/images/locations/${guide.slug}-640.webp 640w, ${entry?.image} 1024w`}
                sizes="(max-width: 700px) 100vw, 33vw"
                alt={locationImageAlt(guide.slug)}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{guide.label} air duct cleaning</h3>
                <p>{guide.text}</p>
                <span className="pac-text-link">
                  Your local guide <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
