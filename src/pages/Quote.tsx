
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Free Quote</h1>
            <p className="text-xl mb-8">
              Fill out the form below, and our team will provide you with a detailed, 
              no-obligation quote for our professional air duct cleaning services.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Request Your Free Quote</h2>
              <QuoteForm />
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold mb-4">Why Choose Pure Air California?</h3>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-brand-600 font-bold text-xl mb-2">Experience</div>
                  <p className="text-gray-600">Over 30 years of experience in professional air quality services.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-brand-600 font-bold text-xl mb-2">Certified</div>
                  <p className="text-gray-600">Licensed, insured, and certified air duct cleaning specialists.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-brand-600 font-bold text-xl mb-2">Guaranteed</div>
                  <p className="text-gray-600">100% satisfaction guarantee on all our services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
