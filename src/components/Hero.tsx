
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 font-heading drop-shadow-md">
            Breathe Cleaner, <span className="text-brand-400">Live Better</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl drop-shadow">
            Professional air duct cleaning and dryer vent services for residential and 
            commercial properties across Los Angeles. Experience the difference clean air makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              asChild
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-md transition"
            >
              <Link to="/quote">
                Get a Free Quote
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              asChild
              className="bg-white text-gray-800 hover:bg-gray-100 font-medium rounded-md transition"
            >
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-xl">
            <div className="flex items-center gap-2">
              <div className="text-brand-400 text-4xl font-bold">25K+</div>
              <div className="text-white">Happy<br />Customers</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="text-brand-400 text-4xl font-bold">30+</div>
              <div className="text-white">Years of<br />Experience</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="text-brand-400 text-4xl font-bold">100%</div>
              <div className="text-white">Satisfaction<br />Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
