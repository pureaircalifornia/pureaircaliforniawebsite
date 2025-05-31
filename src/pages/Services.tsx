import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Building, Fan, Filter, AirVent, ShieldCheck, Wind, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

// Hero images for each service
const serviceHeroImages = {
  'residential-air-duct-cleaning': 'https://images.unsplash.com/photo-1600566752225-2b51b0a0dabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'commercial-air-duct-cleaning': 'https://images.unsplash.com/photo-1615529328334-c105f17320bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'dryer-vent-cleaning': 'https://images.unsplash.com/photo-1607619056951-9c7e0d2d67d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'electrostatic-filter-service': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'dryer-vent-maintenance-program': 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'air-quality-testing': 'https://images.unsplash.com/photo-1569335460969-66561d69b744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  'uv-light-sanitization': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
};

const serviceData = {
  'residential-air-duct-cleaning': {
    title: 'Residential Air Duct Cleaning',
    description: 'Professional cleaning of your home\'s HVAC system to improve air quality and energy efficiency.',
    icon: <Home className="h-6 w-6" />,
    heroImage: serviceHeroImages['residential-air-duct-cleaning'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our residential air duct cleaning service is designed to remove dust, allergens, and other contaminants from your home's HVAC system, improving indoor air quality and system efficiency.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved indoor air quality for your family</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced allergens and respiratory irritants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased HVAC system efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Lower energy bills and extended system life</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your HVAC system</li>
                <li>Sealing and protection of registers</li>
                <li>Powerful vacuuming of all ductwork</li>
                <li>Cleaning of all components</li>
                <li>Final inspection and testing</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Breathe Easier?</h3>
            <p className="mb-6">Schedule your residential air duct cleaning today and experience the difference clean air can make in your home.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'commercial-air-duct-cleaning': {
    title: 'Commercial Air Duct Cleaning',
    description: 'Comprehensive cleaning services for businesses, restaurants, and healthcare facilities.',
    icon: <Building className="h-6 w-6" />,
    heroImage: serviceHeroImages['commercial-air-duct-cleaning'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our commercial air duct cleaning service is designed for businesses of all sizes, helping to maintain a healthy indoor environment for employees and customers alike.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved indoor air quality for employees and customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced allergens and respiratory irritants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased HVAC system efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Lower energy bills and extended system life</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your HVAC system</li>
                <li>Sealing and protection of registers</li>
                <li>Powerful vacuuming of all ductwork</li>
                <li>Cleaning of all components</li>
                <li>Final inspection and testing</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Indoor Air Quality?</h3>
            <p className="mb-6">Schedule your commercial air duct cleaning today and experience the difference clean air can make in your business.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'dryer-vent-cleaning': {
    title: 'Dryer Vent Cleaning',
    description: 'Prevent fires and improve dryer efficiency with our professional dryer vent cleaning service.',
    icon: <Fan className="h-6 w-6" />,
    heroImage: serviceHeroImages['dryer-vent-cleaning'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our dryer vent cleaning service helps prevent dryer fires and improves the efficiency of your dryer, saving you money on energy bills.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced risk of dryer fires</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved dryer efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Lower energy bills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Extended dryer lifespan</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your dryer vent system</li>
                <li>Powerful vacuuming of all venting</li>
                <li>Cleaning of all components</li>
                <li>Final inspection and testing</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Dryer Efficiency?</h3>
            <p className="mb-6">Schedule your dryer vent cleaning today and experience the difference clean vents can make in your home.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'electrostatic-filter-service': {
    title: 'Electrostatic Filter Service',
    description: 'High-efficiency air filtration solutions for cleaner indoor air.',
    icon: <Filter className="h-6 w-6" />,
    heroImage: serviceHeroImages['electrostatic-filter-service'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our electrostatic filters provide superior air filtration, capturing smaller particles than standard filters for cleaner indoor air.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved indoor air quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced allergens and respiratory irritants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased HVAC system efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Lower energy bills and extended system life</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your HVAC system</li>
                <li>Installation of electrostatic filters</li>
                <li>Final inspection and testing</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Indoor Air Quality?</h3>
            <p className="mb-6">Schedule your electrostatic filter installation today and experience the difference clean air can make in your home.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'dryer-vent-maintenance-program': {
    title: 'Dryer Vent Maintenance Program',
    description: 'Regular maintenance to keep your dryer vents clean and safe.',
    icon: <AirVent className="h-6 w-6" />,
    heroImage: serviceHeroImages['dryer-vent-maintenance-program'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our dryer vent maintenance program ensures your dryer operates safely and efficiently all year round.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced risk of dryer fires</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved dryer efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Lower energy bills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Extended dryer lifespan</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Annual dryer vent inspection</li>
                <li>Thorough cleaning of the entire vent system</li>
                <li>Performance testing</li>
                <li>Priority scheduling</li>
                <li>10% discount on additional services</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Dryer Efficiency?</h3>
            <p className="mb-6">Schedule your dryer vent maintenance today and experience the difference clean vents can make in your home.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'air-quality-testing': {
    title: 'Air Quality Testing',
    description: 'Comprehensive testing to identify indoor air quality issues.',
    icon: <Wind className="h-6 w-6" />,
    heroImage: serviceHeroImages['air-quality-testing'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our air quality testing service helps identify indoor air quality issues, providing you with a comprehensive report and recommendations for improvement.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Identification of indoor air quality issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Comprehensive report and recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved indoor air quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased health and comfort</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your home or business</li>
                <li>Comprehensive air quality testing</li>
                <li>Analysis of test results</li>
                <li>Comprehensive report and recommendations</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Indoor Air Quality?</h3>
            <p className="mb-6">Schedule your air quality testing today and experience the difference clean air can make in your home or business.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  },
  'uv-light-sanitization': {
    title: 'UV Light Sanitization',
    description: 'Effective sanitization solutions for healthier indoor environments.',
    icon: <ShieldCheck className="h-6 w-6" />,
    heroImage: serviceHeroImages['uv-light-sanitization'],
    content: (
      <>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Our UV light sanitization service provides effective sanitization solutions for healthier indoor environments, reducing germs and bacteria.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Benefits:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Effective sanitization of germs and bacteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Improved indoor air quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased health and comfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Reduced risk of illness</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-3">Our Process:</h4>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Inspection of your home or business</li>
                <li>Installation of UV light sanitization system</li>
                <li>Final inspection and testing</li>
              </ol>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Indoor Air Quality?</h3>
            <p className="mb-6">Schedule your UV light sanitization installation today and experience the difference clean air can make in your home or business.</p>
            <Button asChild size="lg">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }
};

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
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-brand-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Button asChild variant="outline" className="mt-auto w-full">
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  </div>
);

const Services = ({ service }: { service?: string }) => {
  if (service && serviceData[service as keyof typeof serviceData]) {
    const serviceInfo = serviceData[service as keyof typeof serviceData];
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          {/* Hero Section with Image */}
          <div className="relative bg-gray-900">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={serviceInfo.heroImage} 
                alt={`${serviceInfo.title} service`}
                className="w-full h-full object-cover opacity-40"
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
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                {serviceInfo.content}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Services listing page
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-blue-700">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover opacity-20"
              src="https://images.unsplash.com/photo-1600566752225-2b51b0a0dabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Clean air ducts"
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Professional air quality solutions for healthier indoor environments in homes and businesses.
            </p>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
          
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for something else?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                We offer comprehensive air quality solutions tailored to your specific needs. 
                Contact us to discuss how we can help improve your indoor air quality.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <TrustBadges />
      <Footer />
    </div>
  );
};

export default Services;
