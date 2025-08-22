import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Building, Fan, Filter, AirVent, ShieldCheck, Wind, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

// Types
type ServiceContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  heroImage: string;
  content: React.ReactNode;
};

type ServiceData = {
  [key: string]: ServiceContent;
};

// Hero images for each service
const serviceHeroImages = {
  'residential-air-duct-cleaning': 'https://images.unsplash.com/photo-1600566752225-2b51b0a0dabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'commercial-air-duct-cleaning': 'https://images.unsplash.com/photo-1615529328334-c105f17320bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'residential-dryer-vent-cleaning': 'https://images.unsplash.com/photo-1607619056951-9c7e0d2d67d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'commercial-dryer-vent-cleaning': 'https://images.unsplash.com/photo-1607619056951-9c7e0d2d67d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'electrostatic-filter-program': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  'hvac-system-cleaning': 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
};

const serviceData: ServiceData = {
  'residential-air-duct-cleaning': {
    title: 'Residential Air Duct Cleaning',
    metaTitle: 'Residential Air Duct Cleaning | Pure Air California',
    metaDescription: 'Professional residential air duct cleaning services to improve indoor air quality and HVAC efficiency. Serving homes across California with certified technicians.',
    slug: 'residential-air-duct-cleaning',
    description: 'Professional cleaning of your home\'s HVAC system to improve air quality and energy efficiency.',
    icon: <Home className="h-6 w-6" />,
    heroImage: serviceHeroImages['residential-air-duct-cleaning'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Residential Air Duct Cleaning Services in California</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-lg font-medium">
            Improve your home's air quality with our professional residential air duct cleaning services. 
            Our certified technicians use state-of-the-art equipment to remove dust, allergens, and contaminants 
            from your HVAC system, helping you breathe easier and improving system efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Benefits of Professional Air Duct Cleaning</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Removes up to 99% of dust, pollen, and allergens from your ductwork</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Improves indoor air quality for allergy and asthma sufferers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Increases HVAC system efficiency by up to 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Reduces energy costs and extends system lifespan</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Our Process</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-medium">Inspection</h4>
                  <p className="text-sm text-gray-600">We start with a thorough inspection of your HVAC system</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-medium">Cleaning</h4>
                  <p className="text-sm text-gray-600">Our powerful equipment removes all debris from your ducts</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-medium">Final Inspection</h4>
                  <p className="text-sm text-gray-600">We ensure every part of your system is clean and functioning properly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-700 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Breathe Cleaner Air?</h3>
            <p className="text-xl mb-6">Schedule your residential air duct cleaning service today and experience the Pure Air difference!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                <Link to="tel:+12137924145">Call Now: (213) 792-4145</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'commercial-air-duct-cleaning': {
    title: 'Commercial Air Duct Cleaning',
    metaTitle: 'Commercial Air Duct Cleaning | Pure Air California',
    metaDescription: 'Professional commercial air duct cleaning services for businesses, restaurants, and healthcare facilities. Improve indoor air quality with our certified technicians.',
    slug: 'commercial-air-duct-cleaning',
    description: 'Comprehensive cleaning services for businesses, restaurants, and healthcare facilities.',
    icon: <Building className="h-6 w-6" />,
    heroImage: serviceHeroImages['commercial-air-duct-cleaning'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Commercial Air Duct Cleaning Services</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-lg font-medium">
            Ensure a healthy indoor environment for your employees and customers with our professional 
            commercial air duct cleaning services. Our certified technicians are trained to handle 
            businesses of all sizes while minimizing disruption to your operations.
          </p>
        </div>
        
        {/* Similar structure as residential but tailored for commercial */}
        <div className="mt-12 bg-blue-700 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Schedule Your Commercial Service</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                <Link to="tel:+12137924145">Call Now: (213) 792-4145</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'residential-dryer-vent-cleaning': {
    title: 'Residential Dryer Vent Cleaning',
    metaTitle: 'Residential Dryer Vent Cleaning | Pure Air California',
    metaDescription: 'Professional dryer vent cleaning services to prevent fires and improve dryer efficiency. Serving residential customers throughout California.',
    slug: 'residential-dryer-vent-cleaning',
    description: 'Prevent fires and improve dryer efficiency with our professional dryer vent cleaning service.',
    icon: <Fan className="h-6 w-6" />,
    heroImage: serviceHeroImages['residential-dryer-vent-cleaning'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Residential Dryer Vent Cleaning Services</h2>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-lg font-medium">
            Lint buildup is a leading cause of household dryer fires. Our thorough dryer vent cleaning
            removes dangerous lint and obstructions to keep your family safe and your dryer running efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Benefits of Professional Vent Cleaning</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Significantly reduces dryer fire risk</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Improves drying times and energy efficiency</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Extends dryer lifespan by reducing strain</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Helps prevent moisture, mold, and odor issues</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Warning Signs Your Vent Needs Cleaning</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-medium">Clothes take longer than one cycle to dry</h4>
                  <p className="text-sm text-gray-600">Common sign of restricted airflow from lint buildup</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-medium">Dryer or laundry room feels unusually hot</h4>
                  <p className="text-sm text-gray-600">Heat is trapped due to a clogged vent</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-medium">Burning or musty odors while drying</h4>
                  <p className="text-sm text-gray-600">Lint and moisture accumulation can create odors</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-blue-700 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Protect Your Home from Dryer Fires</h3>
            <p className="text-xl mb-6">Schedule your residential dryer vent cleaning today for peace of mind and better performance.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                <Link to="tel:+12137924145">Call Now: (213) 792-4145</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'commercial-dryer-vent-cleaning': {
    title: 'Commercial Dryer Vent Cleaning',
    metaTitle: 'Commercial Dryer Vent Cleaning | Pure Air California',
    metaDescription: 'Professional dryer vent cleaning for laundromats, multi-family housing, and commercial facilities. Reduce fire risks and improve efficiency.',
    slug: 'commercial-dryer-vent-cleaning',
    description: 'Professional dryer vent cleaning for laundromats, multi-family housing, and commercial facilities.',
    icon: <Building className="h-6 w-6" />,
    heroImage: serviceHeroImages['commercial-dryer-vent-cleaning'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Commercial Dryer Vent Cleaning Services</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-lg font-medium">
            Keep your commercial property safe and compliant with our professional dryer vent cleaning services. 
            Designed for laundromats, apartment buildings, hotels, and other commercial facilities with high-volume 
            laundry needs, our service helps prevent fire hazards and maintain optimal dryer performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Laundromats</h3>
            <p className="text-gray-600 mb-4">High-volume cleaning solutions to handle constant use and prevent fire hazards in self-service laundry facilities.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Reduced fire risks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Improved dryer efficiency</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Compliance with fire codes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Family Housing</h3>
            <p className="text-gray-600 mb-4">Comprehensive vent cleaning for apartment complexes and condominiums to ensure resident safety.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Bulk pricing available</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Minimal disruption to residents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Documentation for property records</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-blue-600 mb-4">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Hospitality Industry</h3>
            <p className="text-gray-600 mb-4">Specialized service for hotels, resorts, and other hospitality businesses with on-premises laundry.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Flexible scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>24/7 emergency service</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Compliance with industry standards</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-semibold mb-4">Our Commercial Service Includes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Comprehensive Inspection</h4>
              <p className="text-gray-600 text-sm">Thorough assessment of your entire dryer vent system to identify any issues or potential hazards.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Powerful Cleaning</h4>
              <p className="text-gray-600 text-sm">Industrial-grade equipment to remove all lint and debris from your venting system.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Code Compliance</h4>
              <p className="text-gray-600 text-sm">Ensure your facility meets all local fire safety regulations and insurance requirements.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Detailed Report</h4>
              <p className="text-gray-600 text-sm">Documentation of services performed and any recommendations for maintenance or repairs.</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Fire Safety Compliance</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>According to the National Fire Protection Association (NFPA), failure to clean dryer vents is the leading cause of dryer fires in commercial properties. Our service helps you stay compliant with NFPA 90B and local fire codes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-700 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Schedule Your Commercial Service</h3>
            <p className="text-xl mb-6">Contact us today to discuss your commercial dryer vent cleaning needs and request a free estimate</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                <Link to="tel:+12137924145">Call Now: (213) 792-4145</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'electrostatic-filter-program': {
    title: 'Electrostatic Filter Program',
    metaTitle: 'Electrostatic Air Filter Program | Pure Air California',
    metaDescription: 'High-efficiency electrostatic air filter program for cleaner indoor air. Washable, reusable filters that capture up to 94% of airborne particles.',
    slug: 'electrostatic-filter-program',
    description: 'High-efficiency air filtration solutions for cleaner indoor air.',
    icon: <Filter className="h-6 w-6" />,
    heroImage: serviceHeroImages['electrostatic-filter-program'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Electrostatic Air Filter Program</h2>
        {/* Content similar to other services */}
      </div>
    )
  },
  'hvac-system-cleaning': {
    title: 'HVAC System Cleaning',
    metaTitle: 'Professional HVAC System Cleaning Services | Pure Air California',
    metaDescription: 'Complete HVAC system cleaning services to improve efficiency and indoor air quality. Serving residential and commercial customers.',
    slug: 'hvac-system-cleaning',
    description: 'Complete cleaning and maintenance for your heating and cooling system.',
    icon: <AirVent className="h-6 w-6" />,
    heroImage: serviceHeroImages['hvac-system-cleaning'],
    content: (
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-6">Professional HVAC System Cleaning</h2>
        {/* Content similar to other services */}
      </div>
    )
  }
};

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}> = ({ title, description, icon, link }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Button asChild variant="outline" className="mt-auto w-full group hover:bg-blue-600 hover:text-white transition-colors">
        <Link to={link} className="flex items-center justify-center gap-2">
          Learn More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </Button>
    </div>
  </div>
);

const Services: React.FC<{ service?: string }> = ({ service }) => {
  // If a specific service is requested, render its detailed page
  if (service && serviceData[service]) {
    const serviceInfo = serviceData[service];
    
    // Generate structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": serviceInfo.title,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Pure Air California",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Airway Blvd",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90001",
          "addressCountry": "US"
        },
        "telephone": "+18005551234"
      },
      "description": serviceInfo.metaDescription,
      "areaServed": {
        "@type": "State",
        "name": "California"
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{serviceInfo.metaTitle}</title>
          <meta name="description" content={serviceInfo.metaDescription} />
          <meta property="og:title" content={serviceInfo.metaTitle} />
          <meta property="og:description" content={serviceInfo.metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://pureairca.com/services/${serviceInfo.slug}`} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
        
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero Section with Image */}
          <div className="relative bg-gray-900">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={serviceInfo.heroImage} 
                alt={`${serviceInfo.title} service`}
                className="w-full h-full object-cover opacity-40"
                loading="eager"
              />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {serviceInfo.title}
                </h1>
                <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                  {serviceInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {serviceInfo.content}
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Render services listing page
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct & Dryer Vent Cleaning Services | Pure Air California</title>
        <meta 
          name="description" 
          content="Professional air duct cleaning, dryer vent cleaning, and indoor air quality services. Serving residential and commercial customers across California with certified technicians." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Professional Air Duct & Vent Cleaning Services
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Breathe easier with our comprehensive indoor air quality solutions. 
              Serving homes and businesses across California with certified technicians.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive solutions for cleaner, healthier indoor air
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(serviceData).map(([key, service]) => (
              <ServiceCard
                key={key}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={`/services/${key}`}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
