import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const content = {
  "seoTitle": "Dryer Vent Cleaning Los Angeles | Pure Air California",
  "seoDescription": "Dryer vent cleaning for Los Angeles homes and condos. Plan lint removal, exhaust access and your appointment with a free property-specific estimate.",
  "path": "/services/residential-dryer-vent-cleaning",
  "h1": "Dryer Vent Cleaning Los Angeles",
  "intro": "Give your dryer a clearer path to the outdoors. Pure Air California provides dryer vent cleaning for Los Angeles homes, apartments and condominiums, with an approach suited to the exhaust route.",
  "serviceName": "Residential Dryer Vent Cleaning",
  "breadcrumbLabel": "Residential Dryer Vent Cleaning",
  "sections": [
    {
      "heading": "The vent beyond the lint screen",
      "body": "The lint screen is only one part of a dryer’s exhaust system. The connector behind the appliance and the duct leading outdoors also need attention. Tell us about the vent route, where it terminates and any changes you have noticed in drying performance."
    },
    {
      "heading": "What to discuss in your estimate",
      "body": "Access and vent configuration affect the service. A short wall outlet and a roof termination have different requirements. Confirm the accessible parts of the exhaust path and any appliance movement included in the estimate.",
      "bullets": [
        "Where the dryer vent exits the building",
        "Approximate route and any known bends or long runs",
        "Access behind the dryer and at the exterior termination",
        "Whether the vent serves one dryer or a shared system"
      ]
    },
    {
      "heading": "Signs to arrange an inspection",
      "body": "Longer drying times, recurring lint accumulation or a damaged visible connector are reasons to check the system. These signs do not establish the cause on their own: appliance condition, load size and the exhaust route can all affect performance. A cleaning service should not be presented as a guaranteed repair for every dryer problem."
    },
    {
      "heading": "Preparing a home or condo for service",
      "body": "Make the laundry area accessible and tell us about stacked units or appliances in a closet. If the exterior outlet is on a roof, balcony or shared wall, confirm who can authorize and provide access. For managed buildings, check any work-hour and contractor requirements in advance."
    },
    {
      "heading": "Cleaning, repair and ongoing care",
      "body": "Discuss the condition of the connector and exhaust route as part of the visit. Damaged or unsuitable components may need separate repair. Follow the dryer manufacturer’s guidance for lint-screen cleaning and exhaust maintenance, and keep the area around the dryer accessible."
    },
    {
      "heading": "Serving Greater Los Angeles",
      "body": "We work with homeowners and property managers across Los Angeles and surrounding communities. Call with your ZIP code and dryer setup to discuss the service scope and appointment availability. Commercial or shared laundry systems should be quoted for their own configuration."
    }
  ],
  "faqs": [
    {
      "question": "Is dryer vent cleaning the same as air duct cleaning?",
      "answer": "No. A dryer has its own exhaust path that carries air outdoors. Heating and cooling ducts are a separate system. Tell us which service you need, or ask about scheduling both during the same visit."
    },
    {
      "question": "Do you clean vents that exit on the roof?",
      "answer": "Tell us about the termination location, roof access and building restrictions when requesting a quote. The team will discuss whether and how the exhaust path can be accessed before confirming the work."
    },
    {
      "question": "Can you service a condo or a shared laundry room?",
      "answer": "We offer residential and commercial dryer vent services. Shared systems may need approval and coordination from building management, so confirm responsibility and access before booking."
    }
  ],
  "relatedLinks": [
    {
      "label": "Residential air duct cleaning",
      "path": "/services/residential-air-duct-cleaning/"
    },
    {
      "label": "Commercial dryer vents",
      "path": "/services/commercial-dryer-vent-cleaning/"
    },
    {
      "label": "Laundromat dryer vent cleaning",
      "path": "/services/laundromat-dryer-vent-cleaning/"
    },
    {
      "label": "Maintenance program",
      "path": "/services/dryer-vent-maintenance-program/"
    },
    {
      "label": "Los Angeles service guide",
      "path": "/locations/los-angeles/"
    }
  ]
};

export default function ResidentialDryerVentCleaning() {
  return <ServiceDetailLayout {...content} />;
}
