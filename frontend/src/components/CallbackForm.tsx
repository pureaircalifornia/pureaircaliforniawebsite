import { FormEvent, useId, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Loader2, Phone, ArrowUpRight } from 'lucide-react';
import { submitFormWithBackend } from '@/utils/api';
import { business } from '@/config/business';
import { trackContactSubmission, trackQuoteSubmission } from '@/utils/tracking';

type Props = { source?: 'quote_form' | 'contact_form'; title?: string };
export default function CallbackForm({source='quote_form',title='Let’s plan your clean.'}:Props){
 const id=useId();const location=useLocation();const sending=useRef(false);
 const commercial=/industries|commercial|property-managers|partners/.test(location.pathname);
 const [data,setData]=useState({name:'',phone:'',email:'',property:commercial?'Business / commercial':'',service:'Air duct cleaning',message:''});
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');const [error,setError]=useState('');
 const field=(key:keyof typeof data,value:string)=>setData(previous=>({...previous,[key]:value}));
 const submit=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();if(sending.current)return;
  if(data.phone.replace(/\D/g,'').length<10){setError('Please enter a phone number with at least 10 digits.');setStatus('error');return;}
  if(!data.name.trim()){setError('Please enter your name.');setStatus('error');return;}
  sending.current=true;setStatus('sending');setError('');
  try{
   const result=await submitFormWithBackend({name:data.name.trim(),email:data.email.trim(),phone:data.phone,property_type:data.property||'Not sure yet',service:data.service,message:data.message.trim(),source});
   if(!result.success)throw new Error('Delivery failed');
   setStatus('success');if(source==='contact_form')trackContactSubmission();else trackQuoteSubmission();
  }catch{setError('Your request could not be sent. Your details are still here—please try again or call '+business.phone+'.');setStatus('error');}
  finally{sending.current=false;}
 };
 return <div className="pac-callback">
  {status==='success'?<div className="pac-form-success" role="status"><CheckCircle size={32}/><h3>Thanks. We’ll be in touch.</h3><p>The PAC team has received your request. We’ll follow up to discuss the property and next steps. A requested visit is confirmed directly with our team.</p><a className="pac-button" href={business.phoneHref}><Phone size={17}/> Call {business.phone}</a></div>:<><h2>{title}</h2><p>Tell us a little about your space. We’ll help you work out the next step. No obligation.</p><form onSubmit={submit} aria-busy={status==='sending'}><div className="pac-form-grid">
   <div><label htmlFor={id+'-name'}>Your name</label><input id={id+'-name'} name="name" autoComplete="name" value={data.name} onChange={e=>field('name',e.target.value)} required maxLength={120}/></div>
   <div><label htmlFor={id+'-phone'}>Phone number</label><input id={id+'-phone'} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={e=>field('phone',e.target.value)} required maxLength={25}/></div>
   <div className="pac-form-wide"><label htmlFor={id+'-email'}>Email address</label><input id={id+'-email'} name="email" type="email" autoComplete="email" value={data.email} onChange={e=>field('email',e.target.value)} required maxLength={200}/></div>
   <div><label htmlFor={id+'-property'}>Your space</label><select id={id+'-property'} value={data.property} onChange={e=>field('property',e.target.value)}><option value="">Select, or tell us later</option><option>Home / apartment</option><option>Business / commercial</option><option>Managed property / HOA</option></select></div>
   <div><label htmlFor={id+'-service'}>How can we help?</label><select id={id+'-service'} value={data.service} onChange={e=>field('service',e.target.value)}><option>Air duct cleaning</option><option>Dryer vent cleaning</option><option>HVAC system cleaning</option><option>Filters & maintenance</option><option>Not sure—please advise</option></select></div>
   <div className="pac-form-wide"><label htmlFor={id+'-message'}>Anything we should know? <span>(optional)</span></label><textarea id={id+'-message'} name="message" rows={3} value={data.message} onChange={e=>field('message',e.target.value)} placeholder="Your city, type of building, or what you’ve noticed…" maxLength={3000}/></div>
  </div>{status==='error'&&<p className="pac-form-error" role="alert">{error}</p>}<button className="pac-button" type="submit" disabled={status==='sending'}>{status==='sending'?<><Loader2 size={17} className="animate-spin"/> Sending…</>:<>Request a call back <ArrowUpRight size={18}/></>}</button><p className="pac-form-note">We’ll use these details to respond to your request. <Link to="/privacy-policy/">Privacy policy</Link>. Prefer to talk now? <a href={business.phoneHref}>Call {business.phone}</a>.</p></form></>}
 </div>;
}
