import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AirVent, Fan, Filter, Home, Building } from 'lucide-react';
import TrustedBy from '@/components/TrustedBy';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  link: string;
}) => (
  <Card className="h-full">
    <CardContent className="flex flex-col p-6 h-full">
      <div className="mb-4 text-brand-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Button asChild variant="outline" className="mt-auto">
        <Link to={link}>Learn More</Link>
      </Button>
    </CardContent>
  </Card>
);

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section id="services-hero" className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8">
              Comprehensive air duct and dryer vent cleaning for homes and businesses in Los Angeles.
            </p>
          </div>
        </div>
      </section>
      <TrustedBy />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential air duct cleaning to commercial ventilation solutions, we provide the expertise 
              to improve your indoor air quality and system efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Services */}
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality and reduce allergens with our thorough residential air duct cleaning service."
              icon={<Home size={32} />}
              link="/services/residential-air-duct-cleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Prevent fire hazards and improve efficiency with our professional dryer vent cleaning for your home."
              icon={<AirVent size={32} />}
              link="/services/residential-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Residential Electrostatic Filter Replacement"
              description="Enhance your home's air filtration with our professional electrostatic air filter installation and replacement."
              icon={<Filter size={32} />}
              link="/services/residential-electrostatic-filter"
            />
            
            {/* Commercial Services */}
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Improve workplace air quality and HVAC efficiency with our comprehensive commercial duct cleaning solutions."
              icon={<Building size={32} />}
              link="/services/commercial-air-duct-cleaning"
            />
            <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Specialized cleaning for commercial laundry facilities to prevent fire hazards and maintain efficiency."
              icon={<Fan size={32} />}
              link="/services/commercial-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Commercial Electrostatic Filter Systems"
              description="Advanced electrostatic filtration solutions for commercial buildings to improve indoor air quality."
              icon={<Filter size={32} />}
              link="/services/commercial-electrostatic-filter"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Simple Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make improving your air quality easy with our straightforward approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">Free assessment of your property and air quality needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-2">Custom Plan</h3>
              <p className="text-gray-600">Tailored service recommendations for your specific situation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-gray-600">Expert technicians thoroughly clean and service your systems</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <h3 className="text-xl font-semibold mb-2">Breathe Better</h3>
              <p className="text-gray-600">Enjoy cleaner air and improved system performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Air Quality?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and quote on our professional air quality services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600" asChild>
              <a href="tel:2137924145">Call (213) 792-4145</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
