
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

const locationData = [
  {
    name: "Beverly Hills",
    description: "Premier air duct cleaning for luxury homes and high-end commercial spaces in Beverly Hills.",
    slug: "beverly-hills",
    image: "https://images.unsplash.com/photo-1616438758022-8c78781738c2?auto=format&fit=crop&q=80&w=1080"
  },
  {
    name: "Malibu",
    description: "Specialized air duct and dryer vent cleaning for beachfront properties and exclusive homes in Malibu.",
    slug: "malibu",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1080"
  },
  {
    name: "Century City",
    description: "Professional air duct cleaning for modern high-rises and corporate offices throughout Century City.",
    slug: "century-city",
    image: "https://images.unsplash.com/photo-1577132399834-60a8d38f2783?auto=format&fit=crop&q=80&w=1080"
  },
  {
    name: "Hollywood",
    description: "Comprehensive vent cleaning solutions for historic buildings, studios, and residential properties in Hollywood.",
    slug: "hollywood",
    image: "https://images.unsplash.com/photo-1608632706351-8689bbcd61b3?auto=format&fit=crop&q=80&w=1080"
  },
  {
    name: "Downtown LA",
    description: "Expert air duct cleaning for mixed-use buildings, lofts, and commercial spaces in Downtown Los Angeles.",
    slug: "downtown-los-angeles",
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&q=80&w=1080"
  },
  {
    name: "Ventura",
    description: "Quality air duct and ventilation services for homes and businesses throughout Ventura County.",
    slug: "ventura",
    image: "https://images.unsplash.com/photo-1599408980126-43a9f561c7bd?auto=format&fit=crop&q=80&w=1080"
  }
];

const Locations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Locations | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services across Los Angeles County. Serving Beverly Hills, Malibu, Hollywood, Century City, Downtown LA and Ventura." />
        <meta name="keywords" content="air duct cleaning los angeles, hvac cleaning beverly hills, dryer vent cleaning malibu, commercial duct cleaning century city, air duct cleaning hollywood, air duct service ventura" />
      </Helmet>
    
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1563431453304-92a686736508" 
            alt="Los Angeles skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Locations Across Los Angeles
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides premium air duct and ventilation cleaning services throughout 
              Los Angeles County and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Service Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pure Air California serves homes and businesses across Los Angeles County and beyond. 
              Click on a location to learn more about our specialized services in each area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locationData.map((location) => (
              <div key={location.slug} className="location-card flex flex-col h-full">
                <div className="h-48 w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={location.image} 
                    alt={`Air duct cleaning in ${location.name}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="text-[#0A3D7C]" />
                    <h3 className="font-heading font-semibold text-xl">{location.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{location.description}</p>
                  <Button asChild variant="outline" className="mt-auto text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/locations/${location.slug}`}>
                      View Location Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Coverage Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Comprehensive Coverage Throughout Los Angeles
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Pure Air California provides expert air duct and dryer vent cleaning services 
                across Los Angeles County and neighboring areas. Our extensive service coverage ensures 
                that we can help you breathe cleaner air, no matter where you're located.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Beverly Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Malibu</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Century City</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Hollywood</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Downtown LA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Ventura</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Santa Monica</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Brentwood</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Pasadena</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Bel Air</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Westwood</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Pacific Palisades</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                  <Link to="/quote">Schedule Service</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#0A3D7C] text-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/contact">Check Availability</Link>
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="rounded-xl shadow-lg overflow-hidden h-80 md:h-96 lg:h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1544413695-ecd4d1e09c77" 
                  alt="Los Angeles service area map" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request Service in Your Area
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Not sure if we service your specific location? Fill out our quick quote form and our team 
                will confirm availability and provide you with a customized estimate for your property.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5BBDE4]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Free, no-obligation estimates for all Los Angeles County locations</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5BBDE4]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Flexible scheduling to accommodate your busy lifestyle</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5BBDE4]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Fast response times with same-week service availability in most areas</p>
                </li>
              </ul>
            </div>
            
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
