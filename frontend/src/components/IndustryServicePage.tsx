import { findBusiness } from '@/data/businessLocations';
import { Link } from '@/components/CanonicalLink';
import IndustryPageLayout from './IndustryPageLayout';
import { industryContent } from '@/data/industryContent';
import { ShieldCheck, Clock, FileCheck2, Repeat } from 'lucide-react';

export default function IndustryServicePage({
  industry,
}: {
  industry: keyof typeof industryContent;
}) {
  const data = industryContent[industry];
  const market = findBusiness(industry)!;

  return (
    <IndustryPageLayout
      title={data.title}
      subtitle={data.intro}
      seoTitle={data.title}
      seoDescription={data.description}
      path={`/industries/${industry}`}
      breadcrumbLabel={data.label}
      serviceName={data.service}
      estimateLabel={`Get a ${data.label.toLowerCase()} estimate`}
      process={[
        {
          step: 'Review the facility, equipment & access rules',
          detail:
            'Identify the air handlers, ductwork, or exhaust runs serving the areas you want assessed. Share known concerns, operating hours, and vendor/COI requirements.',
        },
        {
          step: 'Confirm an itemized written scope & work window',
          detail:
            'Verify the included systems, components, exclusions, after-hours or phased schedule, and authorized facility contact in writing before work begins.',
        },
        {
          step: 'Complete source removal & deliver closeout records',
          detail:
            'Protect occupied areas, complete the agreed cleaning scope, and provide zone-by-zone service notes, accessible photos, and follow-up recommendations.',
        },
      ]}
      faqs={[
        { question: data.question, answer: data.answer },
        ...data.extraFaqs,
        {
          question: 'What information helps with a commercial estimate?',
          answer:
            'Provide the property city/ZIP, facility type, approximate HVAC unit or dryer count, equipment locations, preferred work window, and any COI or completion documentation your organization requires.',
        },
        {
          question: 'Are testing, mechanical repair, and duct cleaning the same scope?',
          answer:
            'No. Each proposed service should be identified separately in writing. Cleaning records document completed maintenance and do not substitute for air-balance measurements, equipment repairs, or independent regulatory inspections.',
        },
      ]}
    >
      <section className="pac-business-intro pac-container">
        <div>
          <span className="pac-eyebrow">{market.eyebrow}</span>
          <h2 className="text-3xl font-bold mt-2 mb-5">{data.heading}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-7">{data.body}</p>
          <ul className="grid sm:grid-cols-2 gap-4 mb-9">
            {data.bullets.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-brand-100 bg-brand-50 p-5 text-brand-900 font-medium"
              >
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            A clear next step for your {data.label.toLowerCase()} facility
          </h2>
          <p className="text-lg text-gray-600 mb-5">
            Start with the equipment you want assessed and the team members who coordinate access. Pure Air California reviews scope boundaries, COI paperwork, and scheduling windows before you decide to book.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link className="pac-text-link" to={`/blog/${data.guide}/`}>
              Read the {data.label.toLowerCase()} planning guide →
            </Link>
            {data.project && (
              <Link className="pac-text-link" to={data.project.path}>
                {data.project.label} →
              </Link>
            )}
            <Link
              className="pac-text-link"
              to="/quote/?service=air-duct&property=commercial#estimate-builder"
            >
              Build a commercial estimate →
            </Link>
          </div>
        </div>
        <figure>
          <img
            src={market.image}
            alt={market.alt}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </figure>
      </section>

      {/* Vertical-specific B2B Pillars: Compliance/IAQ, After-Hours Scheduling, COI/Docs, Maintenance Programs */}
      <section className="py-14 bg-white border-t border-gray-100" aria-label={`${data.label} commercial operations planning`}>
        <div className="pac-container">
          <div className="max-w-3xl mb-10">
            <span className="pac-eyebrow">BUILT FOR LOS ANGELES FACILITY TEAMS</span>
            <h2 className="text-3xl font-bold mt-2 mb-3 text-gray-900">
              How we support {data.label.toLowerCase()} operations across LA
            </h2>
            <p className="text-gray-600 text-lg">
              Practical coordination for facility managers, chief engineers, property managers, and operations directors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-xl border border-gray-200 p-6 bg-gray-50/60">
              <div className="flex items-center gap-2.5 text-brand-700 font-semibold mb-2">
                <ShieldCheck size={20} aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900">Air Quality &amp; Scope Boundaries</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{data.complianceAndAirQuality}</p>
            </article>
            <article className="rounded-xl border border-gray-200 p-6 bg-gray-50/60">
              <div className="flex items-center gap-2.5 text-brand-700 font-semibold mb-2">
                <Clock size={20} aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900">After-Hours &amp; Minimal-Disruption Scheduling</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{data.schedulingAndLogistics}</p>
            </article>
            <article className="rounded-xl border border-gray-200 p-6 bg-gray-50/60">
              <div className="flex items-center gap-2.5 text-brand-700 font-semibold mb-2">
                <FileCheck2 size={20} aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900">COI &amp; Completion Documentation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{data.documentationReady}</p>
            </article>
            <article className="rounded-xl border border-gray-200 p-6 bg-gray-50/60">
              <div className="flex items-center gap-2.5 text-brand-700 font-semibold mb-2">
                <Repeat size={20} aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900">Multi-Building Maintenance Programs</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{data.maintenanceProgram}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pac-business-scope">
        <div className="pac-container">
          <span className="pac-eyebrow">CARE THAT FITS YOUR OPERATION</span>
          <h2>{market.promise}</h2>
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
    </IndustryPageLayout>
  );
}
