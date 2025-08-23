import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, Phone, Mail, MapPin, Calendar, Building, Home } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    propertyType: '',
    squareFootage: '',
    preferredDate: '',
    message: '',
    urgency: 'standard'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You can add API call or email submission logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Get a Free Quote | Pure Air California</title>
        <meta name="description" content="Request a free quote for professional air duct cleaning, dryer vent cleaning, electrostatic filters, and HVAC system cleaning services. Fast response, competitive pricing." />
        <meta name="keywords" content="free quote, air duct cleaning quote, dryer vent cleaning quote, HVAC cleaning quote, electrostatic filter quote" />
        <meta property="og:title" content="Get a Free Quote | Pure Air California" />
        <meta property="og:description" content="Request a free quote for professional air duct cleaning, dryer vent cleaning, electrostatic filters, and HVAC system cleaning services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/quote" />
        <link rel="canonical" href="https://pureairca.com/quote" />
      </Helmet>

      <NavBar />
      
      <div className="bg-gray-50 py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Your Free Quote</h1>
            <p className="text-xl text-gray-600">
              Professional air duct cleaning, dryer vent cleaning, and HVAC services at competitive prices.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      placeholder="Street address, city, state, zip"
                      required
                    />
                  </div>

                  {/* Service Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="serviceType" className="block mb-2 text-sm font-medium text-gray-700">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      >
                        <option value="">Select a Service</option>
                        <optgroup label="Air Duct Cleaning">
                          <option value="Commercial Air Duct Cleaning">Commercial Air Duct Cleaning</option>
                          <option value="Residential Air Duct Cleaning">Residential Air Duct Cleaning</option>
                        </optgroup>
                        <optgroup label="Dryer Vent Services">
                          <option value="Residential Dryer Vent Cleaning">Residential Dryer Vent Cleaning</option>
                          <option value="Commercial Dryer Vent Cleaning">Commercial Dryer Vent Cleaning</option>
                          <option value="Dryer Vent Maintenance Program">Dryer Vent Maintenance Program</option>
                        </optgroup>
                        <optgroup label="Air Filtration">
                          <option value="Residential Electrostatic Filter">Residential Electrostatic Filter</option>
                          <option value="Commercial Electrostatic Filter">Commercial Electrostatic Filter</option>
                        </optgroup>
                        <optgroup label="HVAC Services">
                          <option value="HVAC System Cleaning">HVAC System Cleaning</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="propertyType" className="block mb-2 text-sm font-medium text-gray-700">
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <optgroup label="Residential">
                          <option value="Single Family Home">Single Family Home</option>
                          <option value="Apartment/Condo">Apartment/Condo</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Multi-Family">Multi-Family</option>
                        </optgroup>
                        <optgroup label="Commercial">
                          <option value="Office Building">Office Building</option>
                          <option value="Retail Store">Retail Store</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Healthcare Facility">Healthcare Facility</option>
                          <option value="Hotel/Motel">Hotel/Motel</option>
                          <option value="Manufacturing Facility">Manufacturing Facility</option>
                          <option value="Other Commercial">Other Commercial</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="squareFootage" className="block mb-2 text-sm font-medium text-gray-700">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        id="squareFootage"
                        name="squareFootage"
                        value={formData.squareFootage}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        placeholder="e.g., 2000"
                      />
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block mb-2 text-sm font-medium text-gray-700">
                        Service Urgency
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      >
                        <option value="standard">Standard (1-2 weeks)</option>
                        <option value="rush">Rush (3-5 days)</option>
                        <option value="emergency">Emergency (Same day)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block mb-2 text-sm font-medium text-gray-700">
                      Preferred Service Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      placeholder="Please describe your specific needs, concerns, or any special requirements..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 px-6 rounded-lg font-medium">
                    Get Free Quote
                  </Button>
                </form>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Licensed & Insured</h4>
                      <p className="text-sm text-gray-600">Fully certified technicians with comprehensive coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Fast Response</h4>
                      <p className="text-sm text-gray-600">Quick turnaround times and flexible scheduling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Satisfaction Guaranteed</h4>
                      <p className="text-sm text-gray-600">100% satisfaction guarantee on all services</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-brand-600" size={18} />
                    <span className="text-gray-700">(213) 792-4145</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-brand-600" size={18} />
                    <span className="text-gray-700">info@pureairca.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-brand-600" size={18} />
                    <span className="text-gray-700">Serving all of California</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-brand-600" size={18} />
                    <span className="text-gray-700">Mon-Fri: 8AM-6PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-brand-800">What to Expect</h3>
                <ul className="space-y-2 text-sm text-brand-700">
                  <li>• Free consultation and assessment</li>
                  <li>• Detailed written quote within 24 hours</li>
                  <li>• No hidden fees or surprises</li>
                  <li>• Professional service guarantee</li>
                  <li>• Follow-up support after service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Quote;
