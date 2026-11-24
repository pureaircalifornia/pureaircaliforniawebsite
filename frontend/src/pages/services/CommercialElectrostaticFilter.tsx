import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const service = {
  seoTitle: 'Commercial Electrostatic Filter Service LA | Pure Air CA',
  seoDescription:
    'Commercial electrostatic collector-cell washing & HVAC filter maintenance across Los Angeles offices, retail & managed properties. Call (213) 792-4145.',
  path: '/services/commercial-electrostatic-filter',
  h1: 'Commercial Electrostatic Air Filter Service in Los Angeles',
  intro:
    'Keep commercial air handlers, rooftop units, and multi-zone filter banks clean, properly fitted, and documented on schedule. Pure Air California coordinates commercial electrostatic collector-cell washing, filter-bank inspection, and replacement logs for Los Angeles offices, retail showrooms, hospitality venues, and managed properties.',
  serviceName: 'Commercial Electrostatic Filters',
  breadcrumbLabel: 'Commercial Electrostatic Filters',
  estimateLabel: 'Get a commercial filter quote',
  heroReassurance: 'Multi-unit filter inventories · COI-ready · Scheduled off-hours service across LA County',
  coverageText:
    'Commercial filter maintenance across Downtown LA, Century City, Culver City, Glendale, Pasadena, Santa Monica, and Los Angeles County.',
  quickFacts: [
    { label: 'Asset tracking', value: 'Logged by unit ID, roof zone & filter size' },
    { label: 'B2B scheduling', value: 'Recurring or bundled with duct cleaning' },
    { label: 'Documentation', value: 'COI-ready · Written scope & service notes' },
  ],
  sections: [
    {
      heading: 'Start with a building-wide filter & air-handler inventory',
      body: 'Multi-tenant buildings and older Los Angeles commercial properties frequently house mixed HVAC equipment—meaning different rooftop units, fan coils, and mechanical rooms require different filter sizes and media types.',
      bullets: [
        'Catalog air-handler unit IDs, mechanical-room or rooftop locations, and exact filter dimensions',
        'Distinguish washable electrostatic collector cells from pleated disposable banks and pre-filters',
        'Check filter tracks, latches, and gaskets for air bypass that fouls downstream coils and ducts',
        'Document damaged frames or unsupported filter media for facilities review',
      ],
    },
    {
      heading: 'Proper care for washable electrostatic media & collector cells',
      body: 'Commercial reusable media must be serviced according to the equipment manufacturer’s instructions. Loaded collector cells lose capture efficiency and restrict static pressure, while damp reinstallations can create odors or electrical faults in powered units.',
      bullets: [
        'Safe removal, washing, rinsing, and complete drying of compatible reusable media',
        'Inspection of pre-filters, ionizer wires (visual check), and frame integrity where applicable',
        'Clear boundary: electrical troubleshooting or replacement of powered air-cleaner assemblies requires an HVAC or electrical technician',
      ],
    },
    {
      heading: 'Coordinating roof access, tenants & off-hours windows in LA',
      body: 'We plan filter servicing around building security, freight elevators, roof hatches, and quiet-hour policies so tenants and customers remain undisturbed. COI and vendor onboarding paperwork are handled ahead of dispatch.',
    },
    {
      heading: 'Pair filtration maintenance with commercial duct & coil care',
      body: 'Clean ductwork stays cleaner far longer when every upstream filter bank seals tightly and stays on schedule. Combine commercial electrostatic filter maintenance with commercial air duct or HVAC coil cleaning under one organized scope.',
    },
    {
      heading: 'Transparent commercial pricing & maintenance records',
      body: 'Commercial filter service is quoted by unit count, filter type/count, rooftop or lift access, and recurring interval (monthly, quarterly, or semi-annual). Every visit concludes with a dated record organized by your building’s equipment list.',
    },
  ],
  faqs: [
    {
      question: 'Do you service electrostatic and reusable filters across multi-unit LA buildings?',
      answer:
        'Yes. Share your approximate air-handler count, filter types or sizes if known, and rooftop/mechanical-room access notes so we can prepare a site-specific written proposal.',
    },
    {
      question: 'Are all commercial electrostatic air filters washable?',
      answer:
        'No. Some commercial frames use washable aluminum/synthetic media or removable electronic collector cells, while others use disposable electrostatic media. We confirm the manufacturer’s instructions before cleaning or replacing.',
    },
    {
      question: 'Can filter service be combined with commercial air duct or coil cleaning?',
      answer:
        'Yes. Pairing duct, coil, and filter maintenance in one coordinated visit minimizes rooftop/mechanical-room downtime and protects your newly cleaned ductwork.',
    },
    {
      question: 'Can we schedule recurring filter visits with COI and unit-by-unit logs?',
      answer:
        'Yes. We coordinate standard Certificate of Insurance (COI) paperwork and provide dated unit-by-unit service notes tailored to your property management or facilities records.',
    },
    {
      question: 'Does commercial filter service cover kitchen grease-hood baffle filters?',
      answer:
        'No. Commercial comfort-HVAC filtration is separate from NFPA 96 kitchen cooking-hood grease exhaust filters and suppression systems.',
    },
  ],
  relatedLinks: [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
    { label: 'HVAC system & coil cleaning', path: '/services/hvac-system-cleaning/' },
    { label: 'Commercial & HOA air duct + dryer vent care', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/' },
    { label: 'Residential electrostatic air filters', path: '/services/residential-electrostatic-filter/' },
    { label: 'Retail & showroom HVAC care', path: '/industries/retail/' },
    { label: 'Commercial real estate & office HVAC care', path: '/industries/commercial-real-estate/' },
  ],
};

export default function CommercialElectrostaticFilter() {
  return <ServiceDetailLayout {...service} />;
}
