import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedCTA = () => {
  return (
    <div className="bg-gradient-to-r from-[#0A3D7C] to-[#072c5a] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Cleaner Air?
            </h2>
            <p className="text-xl mb-8">
              Schedule your free estimate today and experience the difference of professional air duct cleaning.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <Clock className="text-brand-400" size={24} />
                <div>
                  <span className="font-medium">Same-Day Service</span>
                  <p className="text-sm text-gray-300">Available in most areas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <Phone className="text-brand-400" size={24} />
                <div>
                  <span className="font-medium">24/7 Support</span>
                  <p className="text-sm text-gray-300">Call us anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <MapPin className="text-brand-400" size={24} />
                <div>
                  <span className="font-medium">Local Service</span>
                  <p className="text-sm text-gray-300">Serving Los Angeles</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <Users className="text-brand-400" size={24} />
                <div>
                  <span className="font-medium">Family-Owned</span>
                  <p className="text-sm text-gray-300">Trusted since 2015</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-[#0A3D7C] hover:bg-gray-100">
                <Link to="/quote">
                  <Phone className="mr-2" size={16} />
                  Schedule Your Free Estimate
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10">
                <Link to="/about">
                  <Users className="mr-2" size={16} />
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Quick Quote Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service Needed</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select Service</option>
                  <option value="air-duct">Air Duct Cleaning</option>
                  <option value="dryer-vent">Dryer Vent Cleaning</option>
                  <option value="electrostatic">Electrostatic Filter Installation</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-white text-[#0A3D7C] hover:bg-gray-100">
                Get My Free Quote
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCTA;
