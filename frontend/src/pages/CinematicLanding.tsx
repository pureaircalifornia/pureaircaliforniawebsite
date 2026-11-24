import HomeServiceDirectory from '@/components/HomeServiceDirectory';
import CommercialProof from '@/components/CommercialProof';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ScanLine, Sparkles, MapPin } from 'lucide-react';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AirJourney from '@/components/AirJourney';
import Gallery from '@/components/Gallery';
import { business } from '@/config/business';
import { homepageFaqs, buildFaqSchema } from '@/data/faqs';
const areas=[['Brentwood','brentwood'],['Culver City','culver-city'],['Century City','century-city'],['Beverly Hills','beverly-hills'],['Santa Monica','santa-monica'],['West Hollywood','west-hollywood'],['Studio City','studio-city'],['Sherman Oaks','sherman-oaks'],['Pasadena','pasadena'],['Malibu','malibu'],['Burbank','burbank']];
export default function CinematicLanding(){return <>
 <SEOProvider title="Air Duct Cleaning Los Angeles | Pure Air California" description="Air duct and dryer vent cleaning for Los Angeles homes and businesses. Explore our process, service areas and pricing. Request a free estimate." path="/" isLocalBusiness/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(buildFaqSchema()).replace(/</g,'\u003c')}}/>
 <NavBar/>
 <main>
 <AirJourney/>
 <div className="pac-proof-strip"><div className="pac-container"><span>CARE YOU CAN FEEL GOOD ABOUT</span><span><Check size={16}/> Free estimates</span><span><Check size={16}/> Clear scope before work</span><a href={business.googleReviewUrl} target="_blank" rel="noreferrer">Read our Google reviews <ArrowUpRight size={15}/></a></div></div>
 <HomeServiceDirectory/>
 <CommercialProof/>
 <section className="pac-process-section"><div className="pac-container pac-process-grid"><div className="pac-process-intro"><span className="pac-eyebrow">02 / A CLEARER PROCESS</span><h2>Out of sight.<br/><em>Never overlooked.</em></h2><p>You should know what’s being cleaned, why it matters, and what it will cost. We start with your system, not a one-size-fits-all package.</p><Link className="pac-button" to="/quote/#estimate-builder">Build your estimate <ArrowUpRight size={18}/></Link><figure className="pac-process-photo"><img src="/images/pac/cleanDuct.webp" alt="A close view inside a clean metal air duct" width={900} height={620} loading="lazy"/><figcaption><span>THE DETAILS MATTER</span><strong>A closer look at the air path.</strong><Link to="/services/hvac-system-cleaning/">Explore HVAC system cleaning <ArrowUpRight size={17}/></Link></figcaption></figure></div><div className="pac-process-steps">{[
 [ScanLine,'01','First, understand your system.','Tell us about your property and concerns. We discuss duct access, system condition and the right scope of work.'],
 [Sparkles,'02','Then, clean with purpose.','The agreed service focuses on loosening and collecting accumulated debris, with care for your duct material and surrounding space.'],
 [Check,'03','Leave with a clear picture.','Review the work and ask about filtration, maintenance and any issues that need further attention.']
 ].map(([Icon,n,title,text])=>{const StepIcon=Icon as typeof Check;return <div className="pac-process-step" key={String(n)}><span className="pac-step-number">{String(n)}</span><div><StepIcon size={24} strokeWidth={1.4}/><h3>{String(title)}</h3><p>{String(text)}</p></div></div>})}</div></div></section>
 <section className="pac-section pac-container pac-local-grid"><div className="pac-local-image"><img src="/images/cinematic/los-angeles-v1.webp" alt="Downtown Los Angeles, part of our air duct cleaning service area" width="1600" height="1000" loading="lazy"/><span><MapPin size={16}/> LOS ANGELES. OUR PLACE, TOO.</span></div><div><span className="pac-eyebrow">03 / ROOTED IN CALIFORNIA</span><h2>From the canyons<br/><em>to the coast.</em></h2><p>Historic homes. Hillside retreats. Apartments in the heart of the city. Every Los Angeles property is different, and the right service starts with understanding yours.</p><p>Explore local air duct cleaning, dryer vent care and commercial services across Greater Los Angeles.</p><div className="pac-area-links">{areas.map(([label,slug])=><Link key={slug} to={'/locations/'+slug+'/'}>{label}<ArrowUpRight size={14}/></Link>)}</div><Link className="pac-text-link" to="/locations/los-angeles/">Explore the Los Angeles service guide <ArrowUpRight size={18}/></Link></div></section>
 <Gallery/>
 <section className="pac-estimate-band"><div className="pac-container"><div><span className="pac-eyebrow">GOOD CARE STARTS WITH A CONVERSATION</span><h2>Let’s talk about your space.</h2><p>Tell us about the property, number of systems and anything you’ve noticed. We’ll help you find the next step.</p></div><div><a className="pac-button" href={business.phoneHref}>Call {business.phone} <ArrowUpRight size={18}/></a><Link className="pac-text-link" to="/pricing/">Understand cleaning costs <ArrowUpRight size={16}/></Link></div></div></section>
 <section className="pac-section pac-container pac-faq-grid"><div><span className="pac-eyebrow">04 / A FEW GOOD QUESTIONS</span><h2>A little clarity.<br/><em>A lot of comfort.</em></h2><p>Honest answers before you book.</p><a className="pac-text-link" href={business.phoneHref}>Talk to us {business.phone} <ArrowUpRight size={16}/></a></div><div className="pac-faq-list">{homepageFaqs.map(f=><details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}<p className="pac-source-note">Learn more in the <a href="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned" target="_blank" rel="noreferrer">EPA’s guide to air duct cleaning</a>.</p></div></section>
 </main>
 <Footer/>
 </>}

