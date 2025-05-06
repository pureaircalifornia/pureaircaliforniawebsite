
import React from "react";
import { Link } from "react-router-dom";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        {/* Header with California Landscape */}
        <div className="relative w-full">
          <img
            src="/images/california-landscape.jpeg"
            alt="California Landscape"
            className="w-full h-64 object-cover md:h-96" // Responsive height
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="container mx-auto p-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pure Air California</h1>
                <p className="text-xl text-white mb-6">Professional Air Duct & Dryer Vent Cleaning Services in Los Angeles</p>
                <Link to="/quote" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-md inline-block font-medium transition-colors">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services section */}
        <div className="container mx-auto my-8 p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">
                    Residential Air Duct Cleaning
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Improve indoor air quality and remove allergens with our professional residential air duct cleaning service.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/commercial-air-duct-cleaning" className="text-brand-600 hover:underline">
                    Commercial Air Duct Cleaning
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Maintain a healthy environment for employees and customers with our thorough commercial duct cleaning.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/residential-dryer-vent-cleaning" className="text-brand-600 hover:underline">
                    Residential Dryer Vent Cleaning
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/commercial-dryer-vent-cleaning" className="text-brand-600 hover:underline">
                    Commercial Dryer Vent Cleaning
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ensure safety compliance and efficiency in commercial laundry facilities with our expert cleaning services.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/dryer-vent-maintenance-program" className="text-brand-600 hover:underline">
                    Dryer Vent Maintenance Program
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Enroll in our maintenance program for annual inspections and cleanings to ensure your dryer vents are always safe and efficient.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link to="/services/residential-electrostatic-filter" className="text-brand-600 hover:underline">
                    Electrostatic Filter Solutions
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upgrade to high-efficiency electrostatic filters that trap more particles for cleaner indoor air.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Blog Section */}
        <div className="container mx-auto my-8 p-4 bg-gray-50 py-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explore Our Blog for More Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/health-benefits-air-duct-cleaning" className="text-brand-600 hover:underline font-medium block mb-2">
                Health Benefits of Professional Air Duct Cleaning
              </Link>
              <p className="text-sm text-gray-600">Learn how clean air ducts can improve your health and wellbeing at home and work.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/dryer-vent-safety-guide" className="text-brand-600 hover:underline font-medium block mb-2">
                Dryer Vent Safety Guide
              </Link>
              <p className="text-sm text-gray-600">Essential safety tips to prevent dryer fires and maintain your appliance's efficiency.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/clean-air-ducts-allergy-relief" className="text-brand-600 hover:underline font-medium block mb-2">
                How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers
              </Link>
              <p className="text-sm text-gray-600">Find relief from allergies with properly maintained air ducts and ventilation systems.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/signs-air-ducts-need-cleaning" className="text-brand-600 hover:underline font-medium block mb-2">
                Signs Your Air Ducts Need Cleaning
              </Link>
              <p className="text-sm text-gray-600">Recognize these warning signs that indicate it's time for professional air duct cleaning.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/air-duct-cleaning-faq" className="text-brand-600 hover:underline font-medium block mb-2">
                Air Duct Cleaning FAQ
              </Link>
              <p className="text-sm text-gray-600">Answers to the most common questions about professional air duct cleaning services.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <Link to="/blog/commercial-indoor-air-quality-guide" className="text-brand-600 hover:underline font-medium block mb-2">
                Commercial Indoor Air Quality Guide
              </Link>
              <p className="text-sm text-gray-600">A complete guide to maintaining excellent indoor air quality in commercial buildings.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to="/blog" className="inline-block bg-brand-600 text-white px-6 py-2 rounded hover:bg-brand-700 transition-colors">
              View All Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
