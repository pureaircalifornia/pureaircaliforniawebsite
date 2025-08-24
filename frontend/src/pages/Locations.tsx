import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

// Export the locationData array
export const locationData = [
  {
    name: "Beverly Hills",
    description: "Premier air duct cleaning for luxury homes and high-end commercial spaces in Beverly Hills.",
    slug: "beverly-hills", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Beverly_Hills_City_Hall.jpg/1200px-Beverly_Hills_City_Hall.jpg"
  },
  {
    name: "Glendale",
    description: "Reliable air duct cleaning and maintenance services for residential and commercial properties in Glendale.",
    slug: "glendale", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Glendale_CA_City_Hall.jpg/1200px-Glendale_CA_City_Hall.jpg"
  },
  {
    name: "Malibu",
    description: "Specialized air duct and dryer vent cleaning for beachfront properties and exclusive homes in Malibu.",
    slug: "malibu", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Malibu_Beach_California.jpg/1200px-Malibu_Beach_California.jpg"
  },
  {
    name: "Century City",
    description: "Professional air duct cleaning for modern high-rises and corporate offices throughout Century City.",
    slug: "century-city", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Century_City_Los_Angeles.jpg/1200px-Century_City_Los_Angeles.jpg"
  },
  {
    name: "Hollywood",
    description: "Comprehensive vent cleaning solutions for historic buildings, studios, and residential properties in Hollywood.",
    slug: "hollywood", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hollywood_Sign_%28Zuschnitt%29.jpg/1200px-Hollywood_Sign_%28Zuschnitt%29.jpg"
  },
  {
    name: "Downtown LA",
    description: "Expert air duct cleaning for mixed-use buildings, lofts, and commercial spaces in Downtown Los Angeles.",
    slug: "downtown-la", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Downtown_Los_Angeles_from_Griffith_Observatory.jpg/1200px-Downtown_Los_Angeles_from_Griffith_Observatory.jpg"
  },
  {
    name: "Ventura",
    description: "Quality air duct and ventilation services for homes and businesses throughout Ventura County.",
    slug: "ventura", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8g/Ventura_California_Beach.jpg/1200px-Ventura_California_Beach.jpg"
  },
  {
    name: "Pasadena",
    description: "Professional air duct cleaning services for historic homes and modern businesses in Pasadena.",
    slug: "pasadena",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8h/Pasadena_City_Hall.jpg/1200px-Pasadena_City_Hall.jpg"
  },
  {
    name: "Burbank",
    description: "Expert air duct cleaning services for homes and entertainment industry businesses in Burbank.",
    slug: "burbank",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8i/Burbank_CA_City_Hall.jpg/1200px-Burbank_CA_City_Hall.jpg"
  },
  {
    name: "Studio City",
    description: "Specialized air duct and vent cleaning for studios and residential properties in Studio City.",
    slug: "studio-city",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Encino",
    description: "Comprehensive air duct services for homes and businesses in the Encino area.",
    slug: "encino",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Tarzana",
    description: "Thorough air duct cleaning for residential and commercial clients in Tarzana.",
    slug: "tarzana",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Reseda",
    description: "High-quality air duct cleaning for homes and businesses in Reseda.",
    slug: "reseda",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Conga Park",
    description: "Reliable air duct cleaning services for residential properties in Conga Park.",
    slug: "conga-park",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Woodland Hills",
    description: "Professional air duct cleaning services for homes and businesses in Woodland Hills.",
    slug: "woodland-hills",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Calabasas",
    description: "Premier air duct and dryer vent cleaning for luxury homes and commercial spaces in Calabasas.",
    slug: "calabasas",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Valley Village",
    description: "Comprehensive air duct cleaning solutions for homes and businesses in Valley Village.",
    slug: "valley-village",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Van Nuys",
    description: "Reliable air duct cleaning services for diverse residential and commercial settings in Van Nuys.",
    slug: "van-nuys",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Panorama City",
    description: "Quality air duct and vent cleaning for homes and commercial buildings in Panorama City.",
    slug: "panorama-city",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Northridge",
    description: "Expert air duct cleaning for homes, businesses, and educational institutions in Northridge.",
    slug: "northridge",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Sun Valley",
    description: "Specialized air duct cleaning services for residential and commercial properties in Sun Valley.",
    slug: "sun-valley",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Central LA",
    description: "Comprehensive air duct and ventilation services for homes and businesses in Central LA.",
    slug: "central-la",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Pacific Palisades",
    description: "Luxury air duct and dryer vent cleaning for homes and exclusive properties in Pacific Palisades.",
    slug: "pacific-palisades",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Brentwood",
    description: "Professional air duct cleaning services for homes and commercial spaces in Brentwood.",
    slug: "brentwood",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Los Feliz",
    description: "Expert air duct and vent cleaning for historic homes and businesses in Los Feliz.",
    slug: "los-feliz",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Culver City",
    description: "Reliable air duct cleaning for homes, studios, and businesses in Culver City.",
    slug: "culver-city",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "West Hollywood",
    description: "Comprehensive air duct cleaning for homes, nightlife venues, and commercial properties in West Hollywood.",
    slug: "west-hollywood",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Chatsworth",
    description: "Quality air duct and dryer vent cleaning for homes and businesses in Chatsworth.",
    slug: "chatsworth",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Laurel Canyon",
    description: "Specialized air duct services for the unique residential properties in Laurel Canyon.",
    slug: "laurel-canyon",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Fairfax",
    description: "Expert air duct cleaning for the diverse homes and businesses in Fairfax.",
    slug: "fairfax",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Larchmont",
    description: "Professional air duct and vent cleaning for historic and modern properties in Larchmont.",
    slug: "larchmont",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Koreatown",
    description: "Reliable air duct cleaning for the many homes and businesses in Koreatown.",
    slug: "koreatown",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "West Los Angeles",
    description: "Comprehensive air duct cleaning for homes, offices, and commercial spaces in West Los Angeles.",
    slug: "west-los-angeles",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Westwood",
    description: "Expert air duct cleaning services for homes and businesses near UCLA in Westwood.",
    slug: "westwood",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "North of Montana",
    description: "Premier air duct services for the upscale homes in the North of Montana area.",
    slug: "north-of-montana",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Sawtelle",
    description: "Quality air duct cleaning for homes and businesses in the Sawtelle area.",
    slug: "sawtelle",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Beverly Glen",
    description: "Specialized air duct cleaning for the unique properties in Beverly Glen.",
    slug: "beverly-glen",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Mid Wilshire",
    description: "Reliable air duct cleaning for homes and commercial buildings in Mid Wilshire.",
    slug: "mid-wilshire",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Sherman Oaks",
    description: "Comprehensive air duct cleaning services for homes and businesses in Sherman Oaks.",
    slug: "sherman-oaks",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Encino Village",
    description: "Expert air duct cleaning solutions for homes and businesses in Encino Village.",
    slug: "encino-village",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Lake Balboa",
    description: "Reliable air duct cleaning for residential properties in Lake Balboa.",
    slug: "lake-balboa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Valley Glen",
    description: "Quality air duct and ventilation services for homes and businesses in Valley Glen.",
    slug: "valley-glen",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Magnolia Park",
    description: "Professional air duct cleaning for the charming homes and businesses in Magnolia Park.",
    slug: "magnolia-park",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Toluca Lake",
    description: "Comprehensive air duct cleaning for homes and businesses in Toluca Lake.",
    slug: "toluca-lake",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Sherwood Forest",
    description: "Specialized air duct and vent cleaning for homes in Sherwood Forest.",
    slug: "sherwood-forest",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Winnetka",
    description: "Expert air duct cleaning services for homes and businesses in Winnetka.",
    slug: "winnetka",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Granada Hills",
    description: "Reliable air duct cleaning for residential and commercial properties in Granada Hills.",
    slug: "granada-hills",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Mission Hills",
    description: "Quality air duct cleaning for homes and businesses in Mission Hills.",
    slug: "mission-hills",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Porter Ranch",
    description: "Premier air duct and dryer vent cleaning for upscale homes in Porter Ranch.",
    slug: "porter-ranch",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "North Hollywood",
    description: "Comprehensive air duct cleaning for homes, studios, and businesses in North Hollywood.",
    slug: "north-hollywood",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Sepulveda Basin",
    description: "Specialized air duct cleaning services for homes near Sepulveda Basin.",
    slug: "sepulveda-basin",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Hidden Hills",
    description: "Luxury air duct cleaning for exclusive properties in Hidden Hills.",
    slug: "hidden-hills",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  },
  {
    name: "Deer Lake Highlands",
    description: "Expert air duct and vent cleaning for homes in Deer Lake Highlands.",
    slug: "deer-lake-highlands",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg"
  }
];

const Locations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning and Dryer Vent Cleaning in Los Angeles County | Pure Air California</title>
        <meta name="description" content="Pure Air California provides professional air duct cleaning and dryer vent cleaning services throughout Los Angeles County. Serving areas like Beverly Hills, Malibu, Hollywood, and more." />
        <meta name="keywords" content="air duct cleaning Los Angeles County, dryer vent cleaning Los Angeles County, air duct service Los Angeles, HVAC cleaning, vent cleaning, Pure Air California, Beverly Hills, Malibu, Hollywood" />
      </Helmet>    
    
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg" 
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
                 <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Glendale</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Pasadena</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Burbank</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Studio City</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Encino</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Tarzana</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Reseda</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Conga Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Woodland Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Calabasas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Valley Village</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Van Nuys</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Panorama City</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Northridge</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sun Valley</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Central LA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Los Feliz</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Culver City</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>West Hollywood</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Chatsworth</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Laurel Canyon</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Fairfax</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Larchmont</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Koreatown</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>West Los Angeles</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>North of Montana</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sawtelle</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Beverly Glen</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Mid Wilshire</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sherman Oaks</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Encino Village</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Lake Balboa</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Valley Glen</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Magnolia Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Toluca Lake</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sherwood Forest</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Winnetka</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Granada Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Mission Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Porter Ranch</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>North Hollywood</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sepulveda Basin</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Hidden Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />                  
                  <span>Deer Lake Highlands</span>
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8j/Studio_City_CA_Residential_Area.jpg/1200px-Studio_City_CA_Residential_Area.jpg" 
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
