import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Building, Fan, Filter, AirVent, ShieldCheck, Wind, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

// Service card component
const ServiceCard = ({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-blue-100 rounded-lg mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <Button asChild className="w-full">
      <Link to={link}>Learn More</Link>
    </Button>
  </div>
);

// Services data
const services = [
  {
    key: 'residential-air-duct-cleaning',
    title: 'Residential Air Duct Cleaning',
    description: 'Professional cleaning of your home\'s HVAC system to improve air quality and energy efficiency.',
    icon: <Home className="h-6 w-6 text-blue-600" />,
    link: '/services/residential-air-duct-cleaning'
  },
  {
    key: 'commercial-air-duct-cleaning',
    title: 'Commercial Air Duct Cleaning',
    description: 'Professional air duct cleaning services for offices, retail spaces, restaurants, and all commercial properties.',
    icon: <Building className="h-6 w-6 text-blue-600" />,
    link: '/services/commercial-air-duct-cleaning'
  },
  {
    key: 'residential-dryer-vent-cleaning',
    title: 'Residential Dryer Vent Cleaning',
    description: 'Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service.',
    icon: <Fan className="h-6 w-6 text-blue-600" />,
    link: '/services/residential-dryer-vent-cleaning'
  },
  {
    key: 'commercial-dryer-vent-cleaning',
    title: 'Commercial Dryer Vent Cleaning',
    description: 'Professional dryer vent cleaning for laundromats, multi-family housing, and commercial facilities.',
    icon: <Building className="h-6 w-6 text-blue-600" />,
    link: '/services/commercial-dryer-vent-cleaning'
  },
  {
    key: 'residential-electrostatic-filter',
    title: 'Residential Electrostatic Filter',
    description: 'Advanced electrostatic air filter installation and maintenance for superior indoor air quality.',
    icon: <Filter className="h-6 w-6 text-blue-600" />,
    link: '/services/residential-electrostatic-filter'
  },
  {
    key: 'commercial-electrostatic-filter',
    title: 'Commercial Electrostatic Filter',
    description: 'Advanced electrostatic air filter systems for commercial facilities seeking superior air quality.',
    icon: <Filter className="h-6 w-6 text-blue-600" />,
    link: '/services/commercial-electrostatic-filter'
  },
  {
    key: 'dryer-vent-maintenance-program',
    title: 'Dryer Vent Maintenance Program',
    description: 'Professional dryer vent maintenance program with annual inspections and preventive cleaning.',
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    link: '/services/dryer-vent-maintenance-program'
  },
  {
    key: 'hvac-system-cleaning',
    title: 'HVAC System Cleaning',
    description: 'Complete cleaning and maintenance for your heating and cooling system to improve efficiency.',
    icon: <AirVent className="h-6 w-6 text-blue-600" />,
    link: '/services/hvac-system-cleaning'
  }
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct & Dryer Vent Cleaning Services | Pure Air California</title>
        <meta 
          name="description" 
          content="Professional air duct cleaning, dryer vent cleaning, and indoor air quality services. Serving residential and commercial customers across California with certified technicians." 
        />
        <meta name="keywords" content="air duct cleaning, dryer vent cleaning, electrostatic filters, HVAC cleaning, California air quality services" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Air Duct & Dryer Vent Cleaning Services | Pure Air California" />
        <meta property="og:description" content="Professional air duct cleaning, dryer vent cleaning, and indoor air quality services." />
        <meta property="og:url" content="https://pureaircalifornia.com/services" />
        <link rel="canonical" href="https://pureaircalifornia.com/services" />
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/contact">Schedule Service</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <TrustBadges />

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
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose Pure Air California?
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Professional service you can trust for all your indoor air quality needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Certified Technicians</h3>
                <p className="text-gray-600">NADCA certified professionals with extensive training and experience</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600">Comprehensive safety protocols and insurance coverage for your peace of mind</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wind className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced Equipment</h3>
                <p className="text-gray-600">State-of-the-art cleaning equipment and negative air pressure technology</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">100% satisfaction guarantee on all our services</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">
              Ready to Improve Your Indoor Air Quality?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact Pure Air California today for professional air duct and dryer vent cleaning services. 
              Our certified technicians are ready to help you breathe easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/contact">Schedule Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
