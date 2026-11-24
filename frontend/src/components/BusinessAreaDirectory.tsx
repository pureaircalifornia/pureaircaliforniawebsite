import { useId, useState } from 'react';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, MapPin, Search } from 'lucide-react';
import { businessCatalog, businessCities, findBusiness, regionNames } from '@/data/businessLocations';

export default function BusinessAreaDirectory({ marketSlug, citySlug }: { marketSlug?: string; citySlug?: string }) {
  const id = useId();
  const [selected, setSelected] = useState(marketSlug || 'education');
  const [query, setQuery] = useState('');
  const market = findBusiness(marketSlug || selected) || businessCatalog[0];
  const city = businessCities.find(item => item.slug === citySlug);
  const cities = businessCities.filter(item => `${item.name} ${item.zipCodes.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="pac-business-directory" id="business-locations" aria-labelledby={id+'-heading'}><div className="pac-container">
    <span className="pac-eyebrow">YOUR BUSINESS. YOUR NEIGHBORHOOD.</span>
    <h2 id={id+'-heading'}>{city ? `Business air care in ${city.name}` : marketSlug ? `${market.label}, closer to you.` : 'Find care for your kind of place.'}</h2>
    <p>{city ? 'Choose your property type for equipment, access and scheduling guidance.' : 'Choose a business type and your service area for a practical plan around your building.'}</p>
    {city ? <div className="pac-local-market-links">{businessCatalog.map(item => <Link key={item.slug} to={item.parentPath}><span>{item.label}</span><ArrowUpRight size={18}/></Link>)}</div> : <>
      <div className="pac-business-filters">
        {!marketSlug && <div><label htmlFor={id+'-market'}>Your business</label><select id={id+'-market'} value={selected} onChange={event => setSelected(event.target.value)}>{businessCatalog.map(item => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></div>}
        <div><label htmlFor={id+'-city'}>Find a city or ZIP code</label><div className="pac-city-search"><Search size={18} aria-hidden="true"/><input id={id+'-city'} value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Try Santa Monica or 90401"/></div></div>
      </div>
      <p className="pac-directory-count" role="status">{cities.length} service areas for {market.label.toLowerCase()}</p>
      <div className="pac-area-groups">{Object.entries(regionNames).map(([region, label]) => {
        const places = cities.filter(item => item.region === region);
        return places.length ? <div key={region}><h3><MapPin size={16} aria-hidden="true"/>{label}</h3><ul>{places.map(item => <li key={item.slug}><Link to={`/locations/${item.slug}/`}>{item.name}<ArrowUpRight size={14} aria-hidden="true"/></Link></li>)}</ul></div> : null;
      })}</div>
      {!cities.length && <p>No service area matches that search. Try a nearby city or <Link to="/contact/">ask our team about your address</Link>.</p>}
      <Link className="pac-text-link" to={market.parentPath}>Greater Los Angeles {market.shortLabel.toLowerCase()} service overview <ArrowUpRight size={16}/></Link>
    </>}
  </div></section>;
}
