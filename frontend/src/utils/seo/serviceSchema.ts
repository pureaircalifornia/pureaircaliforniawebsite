import { seoConfig } from './seoConfig';
import { canonicalUrl } from './canonicalUrl';

export interface ServiceSchemaDefinition {
  name: string;
  serviceType: string;
  path: string;
  description: string;
  startingPrice?: number;
  startingPriceNote?: string;
}

const SITE_URL = seoConfig.siteUrl;
const BUSINESS_ID = `${SITE_URL}/#business`;
const LA_AREA_SERVED = {
  '@type': 'City',
  name: 'Los Angeles',
  sameAs: 'https://www.wikidata.org/wiki/Q65',
  containedInPlace: {
    '@type': 'State',
    name: 'California',
    sameAs: 'https://www.wikidata.org/wiki/Q99',
  },
};

/**
 * Canonical service schema catalog covering all 12 core Pure Air California services.
 * Only published starting prices from `/pricing/` ($299 residential air duct,
 * $149 residential dryer vent) carry Offer price specifications.
 */
const SERVICE_CATALOG: Record<string, ServiceSchemaDefinition> = {
  airDuctCleaning: {
    name: 'Residential Air Duct Cleaning in Los Angeles',
    serviceType: 'Residential Air Duct Cleaning',
    path: '/services/residential-air-duct-cleaning/',
    description: 'Inspection-led negative-pressure source removal for accessible supply and return ductwork, registers, and trunk lines in Greater Los Angeles homes.',
    startingPrice: 299,
    startingPriceNote: 'Starting price for eligible residential scopes; final written estimate confirmed by system count, access, and condition.',
  },
  dryerVentCleaning: {
    name: 'Residential Dryer Vent Cleaning in Los Angeles',
    serviceType: 'Dryer Vent Cleaning',
    path: '/services/residential-dryer-vent-cleaning/',
    description: 'Full-path dryer exhaust lint removal and airflow check from the laundry room connection to the wall or roof termination in Greater Los Angeles.',
    startingPrice: 149,
    startingPriceNote: 'Starting price for eligible residential dryer vent scopes; final written estimate depends on vent length, routing, and termination access.',
  },
  commercialAirDuct: {
    name: 'Commercial Air Duct Cleaning in Los Angeles',
    serviceType: 'Commercial Air Duct Cleaning',
    path: '/services/commercial-air-duct-cleaning/',
    description: 'Site-specific commercial HVAC and ventilation duct cleaning for Los Angeles offices, hotels, clinics, schools, retail, and industrial buildings.',
  },
  commercialDryerVent: {
    name: 'Commercial Dryer Vent Cleaning in Los Angeles',
    serviceType: 'Commercial Dryer Vent Cleaning',
    path: '/services/commercial-dryer-vent-cleaning/',
    description: 'Scheduled dryer exhaust line, riser, and manifold cleaning for Los Angeles apartments, hotels, laundromats, and commercial laundry rooms.',
  },
  commercialHoa: {
    name: 'Commercial & HOA Air Duct & Dryer Vent Cleaning in Los Angeles',
    serviceType: 'HOA and Multi-Unit HVAC & Dryer Vent Cleaning',
    path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    description: 'Coordinated unit-by-unit and common-area air duct and dryer exhaust maintenance for Los Angeles HOAs, multifamily buildings, and property managers.',
  },
  wildfireSmokeHillside: {
    name: 'Wildfire Smoke & Hillside Air Duct Assessment in Los Angeles',
    serviceType: 'Post-Wildfire & Hillside Air Duct Assessment and Cleaning',
    path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    description: 'Inspection-led assessment and source-removal duct cleaning for smoke particulate, ash, and renovation dust in Los Angeles hillside and canyon homes.',
  },
  hvacSystemCleaning: {
    name: 'HVAC System Cleaning in Los Angeles',
    serviceType: 'HVAC System Cleaning',
    path: '/services/hvac-system-cleaning/',
    description: 'Component-level cleaning for accessible evaporator coils, blower assemblies, air handlers, plenums, and connected ductwork in Greater Los Angeles.',
  },
  dryerVentMaintenance: {
    name: 'Dryer Vent Maintenance Program in Los Angeles',
    serviceType: 'Scheduled Dryer Vent Maintenance',
    path: '/services/dryer-vent-maintenance-program/',
    description: 'Recurring dryer exhaust inspection, lint removal, and service records for Los Angeles homes, HOAs, and managed buildings.',
  },
  residentialElectrostaticFilter: {
    name: 'Residential Electrostatic Air Filter Service in Los Angeles',
    serviceType: 'Electrostatic Air Filter Service',
    path: '/services/residential-electrostatic-filter/',
    description: 'Inspection, collector-cell cleaning, and sizing guidance for compatible residential electrostatic and reusable HVAC air filters.',
  },
  commercialElectrostaticFilter: {
    name: 'Commercial Electrostatic Air Filter Service in Los Angeles',
    serviceType: 'Commercial Electrostatic Air Filter Service',
    path: '/services/commercial-electrostatic-filter/',
    description: 'Scheduled collector-cell washing and filter maintenance for commercial and multi-unit HVAC systems across Los Angeles.',
  },
  airDuctSanitizing: {
    name: 'Air Duct Sanitizing Assessment in Los Angeles',
    serviceType: 'Air Duct Sanitizing Assessment',
    path: '/services/air-duct-sanitizing/',
    description: 'Inspection-first assessment of duct material compatibility, product labels, and treatment limitations after mechanical source removal.',
  },
  laundromatDryerVent: {
    name: 'Laundromat Dryer Vent Cleaning in Los Angeles',
    serviceType: 'Laundromat Dryer Exhaust Cleaning',
    path: '/services/laundromat-dryer-vent-cleaning/',
    description: 'High-volume laundromat dryer bank, shared manifold trunk, booster fan, and roof termination exhaust cleaning in Los Angeles.',
  },
};

export function buildServiceSchema(definition: ServiceSchemaDefinition) {
  const url = canonicalUrl(definition.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: definition.name,
    serviceType: definition.serviceType,
    description: definition.description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    provider: { '@id': BUSINESS_ID },
    areaServed: LA_AREA_SERVED,
    ...(definition.startingPrice
      ? {
          offers: {
            '@type': 'Offer',
            url: canonicalUrl('/pricing/'),
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: definition.startingPrice,
              priceCurrency: 'USD',
              ...(definition.startingPriceNote ? { description: definition.startingPriceNote } : {}),
            },
          },
        }
      : {}),
  };
}

export const serviceSchema = {
  ...Object.fromEntries(
    Object.entries(SERVICE_CATALOG).map(([key, def]) => [key, buildServiceSchema(def)])
  ),
  // Legacy alias kept for SchemaMarkup type compatibility; routes truthfully to sanitizing assessment.
  moldRemoval: buildServiceSchema(SERVICE_CATALOG.airDuctSanitizing),
} as Record<keyof typeof SERVICE_CATALOG | 'moldRemoval', ReturnType<typeof buildServiceSchema>>;

export interface ProcessHowToOptions {
  path: string;
  name?: string;
  description?: string;
  steps?: Array<{ name: string; text: string; image?: string }>;
}

const DEFAULT_PROCESS_STEPS = [
  {
    name: 'Inspect the system and access points',
    text: 'Check accessible supply and return ductwork, vents, equipment layout, and buildup so the cleaning plan matches what the system actually needs.',
  },
  {
    name: 'Confirm written scope and pricing',
    text: 'Review the exact systems, components, access plan, and confirmed price in writing before any cleaning work begins.',
  },
  {
    name: 'Complete source-removal cleaning and verify together',
    text: 'Protect surrounding areas, loosen and extract debris under negative pressure, and walk through the completed scope and ongoing filter care.',
  },
];

/**
 * Reusable HowTo structured-data builder for pages displaying the visible
 * 3-step inspection-led cleaning process. Keep steps aligned with visible UI text.
 */
export function buildProcessHowToSchema({
  path,
  name = 'How Pure Air California inspects and cleans air ducts in Los Angeles',
  description = 'Three-step inspection-led air duct and dryer vent cleaning process with written scope confirmation before work starts.',
  steps = DEFAULT_PROCESS_STEPS,
}: ProcessHowToOptions) {
  const url = canonicalUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name,
    description,
    inLanguage: 'en-US',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: new URL(step.image, SITE_URL).href } : {}),
    })),
  };
}
