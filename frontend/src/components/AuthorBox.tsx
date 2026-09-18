import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { business } from '@/config/business';
export default function AuthorBox({authorName}:{authorName:string}){return <aside className="pac-author-box"><BrandMark/><div><h2>From the PAC air care journal</h2><p>By {authorName}. General information for caring for your home or building. The right service depends on your system and its condition.</p><a href={business.phoneHref}>Talk to the PAC team: {business.phone}</a><Link to="/about/">Get to know Pure Air California →</Link></div></aside>}
