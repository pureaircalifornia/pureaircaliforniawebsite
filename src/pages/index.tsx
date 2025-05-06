
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
          {/* Optional: Add text overlay here */}
        </div>
        {/* Services section */}
        <div className="container mx-auto my-8 p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
        {/* Blog Section */}
        <div className="container mx-auto my-8 p-4">
          <h2 className="text-2xl font-bold mb-4">
            Explore Our Blog for More Insights
          </h2>
          <div className="space-y-2 flex flex-col">
            <Link to="/blog/health-benefits-air-duct-cleaning" className="text-brand-600 hover:underline">
              Health Benefits of Professional Air Duct Cleaning
            </Link>
            <Link to="/blog/dryer-vent-safety-guide" className="text-brand-600 hover:underline">
              Dryer Vent Safety Guide
            </Link>
            <Link to="/blog/clean-air-ducts-allergy-relief" className="text-brand-600 hover:underline">
              How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers
            </Link>
            <Link to="/blog/signs-air-ducts-need-cleaning" className="text-brand-600 hover:underline">
              Signs Your Air Ducts Need Cleaning
            </Link>
            <Link to="/blog/air-duct-cleaning-faq" className="text-brand-600 hover:underline">
              Air Duct Cleaning FAQ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
