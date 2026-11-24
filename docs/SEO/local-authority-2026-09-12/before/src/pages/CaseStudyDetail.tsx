import PageHero from '@/components/PageHero';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RelatedLinks from '@/components/RelatedLinks';
import NotFound from './NotFound';
import { caseStudies, getCaseStudy } from './caseStudies/data';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import { Check, ArrowRight, Building2, MapPin } from 'lucide-react';

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: study.title,
    description: study.seoDescription,
    url: canonical,
    about: study.vertical,
    publisher: {
      '@type': 'HVACBusiness',
      '@id': `${seoConfig.siteUrl}/#organization`,
      name: 'Pure Air California',
      telephone: business.phone,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={study.seoTitle}
        description={study.seoDescription}
        path={`/case-studies/${study.slug}`}
        ogType="article"
       isLocalBusiness />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Case Studies', item: '/case-studies/' },
          { name: study.vertical, item: `/case-studies/${study.slug}/` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero title={study.title} description="A look at the planning and service scope behind a commercial property project."/>

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
              <Section title="The challenge" items={study.challenge} />
              <Section title="How we approached it" items={study.approach} />
              <Section title="The outcome" items={study.outcome} />

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

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-3">Similar property to look after?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We schedule commercial work around occupied buildings so your tenants and staff are
                  not disrupted. Free estimates, fixed pricing agreed before we start.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/quote"
                    className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-7 rounded-lg transition-colors text-center"
                  >
                    Get a quote
                  </Link>
                  <Link
                    to={study.relatedService.path}
                    className="inline-flex items-center justify-center gap-2 border border-brand-700 text-brand-700 hover:bg-white font-bold py-3 px-7 rounded-lg transition-colors"
                  >
                    {study.relatedService.label} <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <p className="mt-10">
                <Link to="/case-studies" className="text-brand-700 font-semibold hover:text-brand-900">
                  ← All case studies
                </Link>
              </p>
            </div>
          </div>
        </section>
        <RelatedLinks
          heading="Related services and projects"
          links={[
            { label: study.relatedService.label, path: study.relatedService.path },
            { label: 'Industries we serve', path: '/industries' },
            { label: 'Property managers and HOAs', path: '/property-managers' },
            ...caseStudies
              .filter((c) => c.slug !== study.slug)
              .map((c) => ({ label: c.title, path: `/case-studies/${c.slug}` })),
          ]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
