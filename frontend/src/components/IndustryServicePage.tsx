import { Link } from 'react-router-dom';
import IndustryPageLayout from './IndustryPageLayout';
import { industryContent } from '@/data/industryContent';
export default function IndustryServicePage({industry}:{industry:keyof typeof industryContent}) {
 const data=industryContent[industry];
 return <IndustryPageLayout title={data.title} subtitle={data.intro} seoTitle={data.title} seoDescription={data.description} path={'/industries/'+industry} breadcrumbLabel={data.label} serviceName={data.service}
 process={[{step:'Review the property and equipment',detail:"Identify the equipment serving the areas you want assessed. Share known issues, access details and any existing service records."},{step:'Agree on access and the written scope',detail:'Confirm the systems, included components, work window and authorized contact. Discuss exclusions and how additional work will be approved.'},{step:'Review the service record',detail:'Agree on the completion information needed for your property and identify any inaccessible areas or follow-up items.'}]}
 faqs={[{question:data.question,answer:data.answer},{question:'What information helps with a commercial estimate?',answer:'Provide the property type, approximate system count, equipment locations and access requirements. Share your preferred work window and any documentation the property requires.'},{question:'Are testing, repair and cleaning the same scope?',answer:'No. Ask for each proposed service to be identified separately. Cleaning records are not a substitute for measurements, equipment repairs or a required independent inspection.'}]}>
  <section className="py-16"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-bold mb-5">{data.heading}</h2><p className="text-lg text-gray-600 leading-relaxed mb-7">{data.body}</p><ul className="grid sm:grid-cols-2 gap-4 mb-9">{data.bullets.map(item=><li key={item} className="rounded-xl border border-brand-100 bg-brand-50 p-5 text-brand-900">{item}</li>)}</ul>
  <h2 className="text-2xl font-bold mb-4">A useful next step for your property</h2><p className="text-lg text-gray-600 mb-5">Start with the equipment you want assessed and the people who can provide access. PAC will discuss the scope and scheduling options before you decide to book.</p>
  <Link className="pac-text-link" to={'/blog/'+data.guide+'/'}>Read the {data.label.toLowerCase()} planning guide →</Link>
  {'project' in data && <p className="mt-6"><Link className="pac-text-link" to={data.project.path}>{data.project.label} →</Link></p>}
  </div></section>
 </IndustryPageLayout>;
}
