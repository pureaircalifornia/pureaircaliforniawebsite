import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Navigation, CheckCircle } from 'lucide-react';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import { Helmet } from 'react-helmet';
import { locationData } from './locations/data';
import ResponsiveImage from '@/components/ResponsiveImage';

const Locations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Locations | Los Angeles County Service Areas | Pure Air California</title>
        <meta name="description" content="Pure Air California serves all of Los Angeles County. Find professional air duct & dryer vent cleaning in Beverly Hills, Santa Monica, Pasadena, Burbank, Glendale & more. Call (213) 792-4145!" />
        <meta name="keywords" content="air duct cleaning Los Angeles County, dryer vent cleaning near me, air duct cleaning Beverly Hills, air duct cleaning Santa Monica, air duct cleaning Pasadena, air duct cleaning Burbank, air duct cleaning Glendale, HVAC cleaning Los Angeles" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Los Angeles County" />
        <meta property="og:title" content="Air Duct Cleaning Locations | Los Angeles County | Pure Air California" />
        <meta property="og:description" content="Professional air duct cleaning services throughout Los Angeles County. Beverly Hills, Santa Monica, Pasadena, Burbank & more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pureaircalifornia.com/locations" />
        <meta property="og:site_name" content="Pure Air California" />
        <link rel="canonical" href="https://www.pureaircalifornia.com/locations" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <ResponsiveImage
            src="/images/locations/los-angeles-skyline.jpg"
            alt="Los Angeles skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-mesh opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 font-heading tracking-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>
              Los Angeles <span className="text-sky-400 text-glow">Service Areas</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed font-medium">
              Pure Air California provides elite air duct and ventilation cleaning services across
              the entire Los Angeles metropolis and surrounding premium communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button asChild size="lg" className="btn-premium text-white px-10 py-8 h-auto text-lg rounded-2xl shadow-2xl">
                <Link to="/quote">Get Your Free Estimate</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-premium border-white/20 text-white hover:bg-white/10 px-10 py-8 h-auto text-lg rounded-2xl">
                <Link to="/services">Explore Expert Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <section className="py-32 relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
              Premier <span className="text-sky-600">Health-Mapped</span> Cities
            </h2>
            <div className="w-24 h-1.5 bg-sky-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              We've deployed health-certified teams to every corner of LA. Select a location to see our local community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {locationData.map((location) => (
              <div key={location.slug} className="glass-card group flex flex-col h-full border-white/60">
                <div className="h-64 w-full overflow-hidden relative">
                  <ResponsiveImage
                    src={location.image}
                    alt={`Air duct cleaning in ${location.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 p-2 glass-premium rounded-xl">
                    <Navigation className="w-5 h-5 text-sky-400" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-sky-600 rounded-full"></div>
                    <h3 className="font-black text-2xl text-slate-800 tracking-tight">{location.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed font-medium flex-grow">{location.description}</p>
                  <Button asChild variant="outline" className="w-full justify-between group/btn py-6 px-6 glass-premium border-sky-100 text-sky-700 font-bold rounded-2xl hover:bg-sky-600 hover:text-white transition-all duration-300">
                    <Link to={`/locations/${location.slug}`}>
                      <span>View Community Details</span>
                      <Compass className="w-5 h-5 transition-transform group-hover/btn:rotate-45" />
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
                  <span>Monterey Park</span>
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
                  <span>Canoga Park</span>
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
                <ResponsiveImage
                  src="/images/locations/service-map.jpg"
                  alt="Los Angeles service area map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="space-y-6">
                {[
                  "Free, high-integrity estimates for all LACo locations",
                  "VIP Priority scheduling for residential & commercial partners",
                  "Same-week rapid response teams available daily"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center border-sky-100">
                      <CheckCircle className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-lg text-slate-700 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <EnhancedQuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;

