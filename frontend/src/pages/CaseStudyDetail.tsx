import React from 'react';
import { useParams } from 'react-router-dom';
import { Check, ArrowRight, Phone } from 'lucide-react';
import { getPageHero } from '@/data/pageHeroes';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedLinks from '@/components/RelatedLinks';
import NotFound from './NotFound';
import { caseStudies, getCaseStudy } from './caseStudies/data';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <section className="mb-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-5">{title}</h2>
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg text-gray-600">
          <Check size={20} className="text-brand-600 flex-shrink-0 mt-1.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug);

  if (!study) return <NotFound />;

  const canonical = `${seoConfig.siteUrl}/case-studies/${study.slug}/`;
  const story = getPageHero(`/case-studies/${study.slug}`);
  const image = study.image || story.image;
  const imageAlt = study.imageAlt || story.alt;

  const isDryerStudy = /dryer/i.test(study.slug) || /dryer/i.test(study.relatedService.path);
  const isManagedStudy = /apartment|property-managers/i.test(study.slug) || /property-managers/i.test(study.relatedService.path);
  const tailoredQuoteHref = `/quote/?service=${isDryerStudy ? 'dryer-vent' : 'air-duct'}&property=${
    isManagedStudy ? 'managed' : 'commercial'
  }#estimate-builder`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: study.title,
    description: study.seoDescription,
    url: canonical,
    about: study.vertical,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': `${seoConfig.siteUrl}/#organization`,
      name: 'Pure Air California',
      telephone: business.phone,
    },
    author: {
      '@type': 'Organization',
      '@id': `${seoConfig.siteUrl}/#organization`,
      name: 'Pure Air California',
      url: `${seoConfig.siteUrl}/about/`,
    },
    image: new URL(image, seoConfig.siteUrl).href,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={study.seoTitle}
        description={study.seoDescription}
        path={`/case-studies/${study.slug}/`}
        ogType="article"
        image={image}
        imageAlt={imageAlt}
        mainEntityId={`${canonical}#article`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Case Studies', item: '/case-studies/' },
          { name: study.vertical, item: `/case-studies/${study.slug}/` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero
          title={study.title}
          description={study.seoDescription}
          image={image}
          alt={imageAlt}
          eyebrow={study.client}
          estimateHref={tailoredQuoteHref}
          estimateLabel="Request a commercial estimate"
          caption={
            study.recordBased
              ? 'Service imagery · Explore the recorded project scope below.'
              : undefined
          }
        />

        <section className="bg-brand-50 border-b border-brand-100 py-8">
          <div className="container mx-auto px-4">
            <dl className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {study.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-sm uppercase tracking-wide text-gray-500 mb-1">{s.label}</dt>
                  <dd className="text-3xl font-bold text-brand-800">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-brand-700 mb-8">
                {study.client} · {study.location}
                {study.year && <> · {study.year}</>}
              </p>
              <Section
                title={study.recordBased ? 'The property and its systems' : 'The challenge'}
                items={study.challenge}
              />
              <Section
                title={study.recordBased ? 'The service plan' : 'How we approached it'}
                items={study.approach}
              />
              <Section
                title={study.recordBased ? 'Project summary' : 'The outcome'}
                items={study.outcome}
              />

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">Scope of work</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-7">
                  <ul className="space-y-3">
                    {study.scope.map((s) => (
                      <li key={s} className="flex gap-3 text-gray-700">
                        <Check size={19} className="text-brand-600 flex-shrink-0 mt-1" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  How to scope a similar {study.vertical.toLowerCase()} project in {study.location}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  When planning ventilation, air handler, or dryer exhaust cleaning for a{' '}
                  {study.vertical.toLowerCase()} property in {study.location}, start by separating the air-distribution pathway from mechanical repairs or specialty exhaust systems. A written proposal is easiest for facility managers, board members, and property owners to review when each air handler, plenum, blower assembly, interior coil, and exhaust run is itemized individually.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Before scheduling the crew, confirm four details with your site contact: how many HVAC systems or dryer exhaust runs are included, where each unit is accessed (mechanical room, ceiling plenum, rooftop, or utility closet), what work hours minimize disruption for occupants or guests, and what COI or closeout documentation your organization requires for maintenance records.
                </p>
              </section>

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-3">Similar property to look after?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Tell us about your systems and access requirements. We will coordinate a work window that suits your operation and provide a clear written scope before you book.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Link
                    to={tailoredQuoteHref}
                    className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-7 rounded-lg transition-colors text-center"
                  >
                    Build a commercial estimate
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center justify-center gap-2 border border-brand-700 text-brand-700 hover:bg-white font-bold py-3 px-7 rounded-lg transition-colors"
                  >
                    <Phone size={18} aria-hidden="true" /> {business.phone}
                  </a>
                  <Link
                    to={study.relatedService.path}
                    className="inline-flex items-center justify-center gap-2 text-brand-700 hover:underline font-bold py-3 px-4"
                  >
                    {study.relatedService.label} <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {study.recordBased && (
                <p className="mt-8 text-sm text-gray-500">
                  Based on PAC’s service records. Details reflect the scope recorded for the location and date shown.
                </p>
              )}
              <p className="mt-10 flex flex-wrap gap-6">
                <Link to="/case-studies/" className="text-brand-700 font-semibold hover:text-brand-900">
                  ← All case studies
                </Link>
                <Link to="/project-stories/" className="text-brand-700 font-semibold hover:text-brand-900">
                  Project stories hub →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <RelatedLinks
          heading="Related services and projects"
          links={[
            { label: study.relatedService.label, path: study.relatedService.path },
            ...(study.localLinks ?? []),
            { label: 'Industries we serve', path: '/industries/' },
            { label: 'Property managers and HOAs', path: '/property-managers/' },
            ...caseStudies
              .filter((c) => c.slug !== study.slug)
              .map((c) => ({ label: c.title, path: `/case-studies/${c.slug}/` })),
          ]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
