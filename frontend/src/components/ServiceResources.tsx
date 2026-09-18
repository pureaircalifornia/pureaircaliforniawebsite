import { Link } from 'react-router-dom';
const guides:Record<string,string[][]> = {
  "residential-air-duct-cleaning": [
    [
      "Plan a home duct-cleaning visit",
      "residential-air-duct-cleaning-los-angeles"
    ],
    [
      "Decide whether an inspection is needed",
      "signs-air-ducts-need-cleaning"
    ]
  ],
  "commercial-air-duct-cleaning": [
    [
      "Prepare a commercial cleaning scope",
      "commercial-air-duct-cleaning-los-angeles-businesses"
    ],
    [
      "Organize building air-quality concerns",
      "commercial-indoor-air-quality-guide"
    ]
  ],
  "residential-dryer-vent-cleaning": [
    [
      "Home dryer vent safety checklist",
      "dryer-vent-safety-guide"
    ],
    [
      "Questions before booking a service",
      "signs-los-angeles-air-ducts-need-cleaning-2026"
    ]
  ],
  "commercial-dryer-vent-cleaning": [
    [
      "Plan commercial dryer exhaust work",
      "laundromat-dryer-vent-cleaning-safety"
    ],
    [
      "Coordinate hotel laundry and ventilation",
      "hotel-air-quality-guest-satisfaction"
    ]
  ],
  "hvac-system-cleaning": [
    [
      "HVAC maintenance and duct cleaning explained",
      "importance-of-regular-air-duct-cleaning"
    ],
    [
      "Compare written cleaning estimates",
      "air-duct-cleaning-cost-los-angeles"
    ]
  ],
  "dryer-vent-maintenance-program": [
    [
      "Build a dryer vent care routine",
      "dryer-vent-safety-guide"
    ],
    [
      "Commercial laundry maintenance records",
      "laundromat-dryer-vent-cleaning-safety"
    ]
  ],
  "residential-electrostatic-filter": [
    [
      "Discuss filtration and indoor-air concerns",
      "clean-air-ducts-allergy-relief"
    ],
    [
      "Plan equipment maintenance",
      "importance-of-regular-air-duct-cleaning"
    ]
  ],
  "commercial-electrostatic-filter": [
    [
      "Plan building air-quality assessment",
      "commercial-indoor-air-quality-guide"
    ],
    [
      "Create a commercial equipment scope",
      "commercial-air-duct-cleaning-los-angeles-businesses"
    ]
  ],
  "air-duct-sanitizing": [
    [
      "Understand duct-cleaning health claims",
      "health-benefits-air-duct-cleaning"
    ],
    [
      "Questions about proposed treatments",
      "avoid-air-duct-cleaning-scams-los-angeles"
    ]
  ],
  "laundromat-dryer-vent-cleaning": [
    [
      "Prepare a laundromat exhaust project",
      "laundromat-dryer-vent-cleaning-safety"
    ],
    [
      "Understand commercial cleaning scopes",
      "commercial-air-duct-cleaning-los-angeles-businesses"
    ]
  ]
};
export default function ServiceResources({path}:{path:string}) {
 const slug=path.split('/').filter(Boolean).pop()||'';
 return <section className="pac-service-resources pac-container" aria-label="Service planning and local coverage"><div><span className="pac-eyebrow">BEFORE YOU BOOK</span><h2>Useful answers.<br/>A clearer next step.</h2><ul>{(guides[slug]||[]).map(([label,article])=><li key={article}><Link to={'/blog/'+article+'/'}>{label} →</Link></li>)}<li><Link to="/pricing/">Pricing and written estimates →</Link></li></ul></div><div><span className="pac-eyebrow">LOCAL AIR CARE</span><h2>Find your service area.</h2><p>Homes and businesses across Greater Los Angeles. Confirm the address and access when requesting your estimate.</p><ul>{[['Los Angeles','los-angeles'],['Brentwood','brentwood'],['Culver City','culver-city'],['Century City','century-city']].map(([label,area])=><li key={area}><Link to={'/locations/'+area+'/'}>{label} service guide →</Link></li>)}</ul><Link className="pac-text-link" to="/locations/">Explore all service areas →</Link></div></section>;
}
