import { useParams } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Check, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import CallbackForm from '@/components/CallbackForm';
import BusinessAreaDirectory from '@/components/BusinessAreaDirectory';
import { businessCities, businessLocationPath, findBusiness, getBusinessLocalContent } from '@/data/businessLocations';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { buildLocationQuoteHref } from './locations/locationSeo';
import NotFound from './NotFound';

export default function BusinessLocation() {
  const { businessSlug, citySlug } = useParams();
  const market = findBusiness(businessSlug);
  const city = businessCities.find((item) => item.slug === citySlug);
  if (!market || !city) return <NotFound />;

  const content = getBusinessLocalContent(market, city);
  const route = businessLocationPath(market, city.slug);
  const canonical = canonicalUrl(route);
  const nearby = businessCities.filter((item) => item.region === city.region && item.slug !== city.slug).slice(0, 6);

  const commercialQuoteHref = buildLocationQuoteHref({
    locationSlug: city.slug,
    service: market.slug === 'laundromats' ? 'dryer-vent' : 'air-duct',
    property: market.slug === 'property-management' ? 'managed' : 'commercial',
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: content.title,
    serviceType: market.service,
    description: content.description,
    url: canonical,
    provider: { '@id': seoConfig.schema.localBusiness['@id'] },
    areaServed: {
      '@type': 'Place',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.municipality === 'Los Angeles' ? 'Los Angeles, California' : `${city.county} County, California`,
      },
    },
    audience: { '@type': 'BusinessAudience', name: market.label },
  };

  return (
    <div className="pac-business-page">
      <SEOProvider
        title={
          content.title.length > 60
            ? `${market.shortLabel} ${market.slug === 'laundromats' ? 'vent' : 'duct'} cleaning in ${city.name}`
            : content.title
        }
        description={content.description}
        path={route}
        image={market.image}
        imageAlt={market.alt}
        mainEntityId={`${canonical}#service`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Industries', item: '/industries/' },
          { name: market.label, item: market.parentPath },
          { name: city.name, item: route },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${canonical}#faq`,
            mainEntity: content.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              {market.service}{' '}
              <br />
              <em>in {city.name}.</em>
            </>
          }
          description={market.intro}
          eyebrow={market.eyebrow}
          image={market.image}
          alt={market.alt}
          estimateHref="#business-enquiry"
          estimateLabel="Plan your property’s care"
        />
        <nav className="pac-business-breadcrumb pac-container" aria-label="Breadcrumb">
          <Link to="/industries/">For your business</Link>
          <span>/</span>
          <Link to={market.parentPath}>{market.label}</Link>
          <span>/</span>
          <span aria-current="page">{city.name}</span>
        </nav>
        <section className="pac-business-intro pac-container">
          <div>
            <span className="pac-eyebrow">THE PEOPLE BEHIND THE PROPERTY</span>
            <h2>{market.promise}</h2>
            <p>{market.intro}</p>
            <h3>Planning for {city.name}</h3>
            {city.localProfile && <p>{city.localProfile}</p>}
            <p>{content.cityNote}</p>
            <p>{content.localBrief}</p>
          </div>
          <aside className="pac-business-local-note">
            <span className="pac-eyebrow">PLANNING YOUR VISIT</span>
            <h3>
              {city.name}, {city.county} County
            </h3>
            <p>
              {content.planning.title}. {content.planning.question}
            </p>
            <dl>
              <dt>Start with</dt>
              <dd>{market.contact}</dd>
              <dt>Local building mix</dt>
              <dd>{city.housingProfile}</dd>
              <dt>Service-area ZIP codes</dt>
              <dd>{city.zipCodes.join(' · ')}</dd>
            </dl>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to={`/locations/${city.slug}/`} className="pac-text-link">
                Explore the {city.name} area guide <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link to={commercialQuoteHref} className="pac-text-link">
                Open {city.name} Estimate Builder <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </section>
        <section className="pac-business-scope">
          <div className="pac-container">
            <span className="pac-eyebrow">A SCOPE THAT FITS YOUR BUILDING</span>
            <h2>
              Look after what’s <em>behind the walls.</em>
            </h2>
            <div className="pac-business-scope-grid">
              {market.scope.map((part, index) => (
                <article key={part.name}>
                  <span className="pac-scope-number">0{index + 1}</span>
                  <h3>{part.name}</h3>
                  <p>{part.detail}</p>
                </article>
              ))}
            </div>
            <p className="pac-scope-boundary">{market.boundary}</p>
          </div>
        </section>
        <section className="pac-business-story pac-container">
          <figure>
            <img
              src="/images/pac/duct-clear-archive-v3.webp"
              alt="PAC archive photograph looking into ductwork with an inspection light"
              width={1200}
              height={1600}
              loading="lazy"
            />
            <figcaption>Inside the system · Photograph from the PAC archive</figcaption>
          </figure>
          <div>
            <span className="pac-eyebrow">PRACTICAL CARE. PERSONAL ATTENTION.</span>
            <h2>
              A plan for your <em>{city.name} property.</em>
            </h2>
            <p>{market.schedule}</p>
            <h3>Before the visit</h3>
            <ul>
              {market.checklist.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Describe what prompted the request and share any available system photos. We’ll discuss scope, access and
              availability before you decide to book.
            </p>
            <a className="pac-text-link" href="#business-enquiry">
              Start the conversation <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className="pac-business-faq pac-container">
          <span className="pac-eyebrow">CLEAR ANSWERS BEFORE YOU BOOK</span>
          <h2>
            {market.shortLabel} air care in {city.name}: your questions.
          </h2>
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
        <section className="pac-business-enquiry" id="business-enquiry">
          <div className="pac-container">
            <div>
              <span className="pac-eyebrow">LET’S TALK ABOUT YOUR SPACE</span>
              <h2>
                Care begins with <em>a conversation.</em>
              </h2>
              <p>
                Tell us about your {city.name} property. Your request goes to the PAC team, with your business type and
                location already included.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
                <a className="pac-button" href={business.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> {business.phone}
                </a>
                <Link
                  to={commercialQuoteHref}
                  style={{ color: '#e9f1f4', textDecoration: 'underline', textUnderlineOffset: '4px', fontSize: '0.95rem', fontWeight: 600 }}
                >
                  Use interactive Estimate Builder ↗
                </Link>
              </div>
              <p className="pac-business-small">
                The final scope, price and appointment are confirmed directly with our team.
              </p>
            </div>
            <CallbackForm
              key={route}
              title={`Plan your ${city.name} service`}
              initialMessage={`${market.label} in ${city.name}, ${city.county} County.\nI would like to discuss ${market.service.toLowerCase()}.\n`}
              initialProperty={
                market.slug === 'property-management' ? 'Managed property / HOA' : 'Business / commercial'
              }
              initialService={market.slug === 'laundromats' ? 'Dryer vent cleaning' : 'Air duct cleaning'}
            />
          </div>
        </section>
        {nearby.length > 0 && (
          <section className="pac-business-nearby pac-container">
            <h2>{market.label} in nearby service areas</h2>
            <div>
              {nearby.map((item) => (
                <Link key={item.slug} to={businessLocationPath(market, item.slug)}>
                  {item.name}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link className="pac-text-link" to={`${market.parentPath}#business-locations`}>
              See every area for {market.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </section>
        )}
        <BusinessAreaDirectory citySlug={city.slug} />
      </main>
      <Footer />
    </div>
  );
}
