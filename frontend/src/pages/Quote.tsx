import React from 'react';
import { Shield, Clock, CheckCircle, Phone, Mail } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
      <div className="bg-gray-100 py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-screen-lg">
          <div className="bg-white shadow-md rounded-lg p-8">
            {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Request a Free Quote</h2>
            <p className="text-gray-600 mt-2">
              Please fill out the form below, and we'll get back to you as soon as possible.
            </p>
          </div>

            {/* Quote Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
              <input type="text" id="phone" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="serviceType" className="block mb-2 text-sm font-medium text-gray-700">Service Type</label>
              <select id="serviceType" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5" required>
                <option value="">Select a Service</option>
                <option value="Residential Electrostatic Filter">Residential Electrostatic Filter</option>
                <option value="Commercial Air Duct Cleaning">Commercial Air Duct Cleaning</option>
                <option value="Commercial Dryer Vent Cleaning">Commercial Dryer Vent Cleaning</option>
                <option value="Commercial Electrostatic Filter">Commercial Electrostatic Filter</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows={4} className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5" required></textarea>
            </div>
            <button type="submit" className="w-full text-white bg-brand-600 hover:bg-brand-700 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-md text-sm px-5 py-2.5 text-center">Submit</button>
          </form>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>Or contact us directly:</p>
          <div className="flex items-center justify-center mt-2 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="text-brand-600" size={18}/>
              <span>(213) 792-4145</span>
            </div>
              <div className="flex items-center gap-2">
              <Mail className="text-brand-600" size={18}/>
              <span>info@pureaircalifornia.com</span>
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
