tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const DryerVentMaintenanceProgram = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Helmet>
          <title>Dryer Vent Maintenance Program | Pure Air California</title>
          <meta
            name="description"
            content="Enroll in our dryer vent maintenance program for annual inspections and cleanings. Ensure your dryers run efficiently and safely with regular service from LA's trusted experts."
          />
          <meta
            name="keywords"
            content="dryer vent maintenance program, dryer vent cleaning, dryer vent inspection, laundry safety, energy efficiency, fire prevention, Pure Air California, Los Angeles"
          />
        </Helmet>

        <div className="prose max-w-none lg:prose-lg">
          <h1>Dryer Vent Maintenance Program: Your Path to Safety and Efficiency</h1>

          <p>
            At Pure Air California, we believe in proactive maintenance to ensure the safety and efficiency of your home. That's why we're proud to introduce our Dryer Vent Maintenance Program—a comprehensive solution designed to keep your dryer vent system in top condition year after year.
          </p>

          <h2>Why Enroll in a Dryer Vent Maintenance Program?</h2>

          <p>
            Dryer vents are often overlooked, but they're critical to both the safety and efficiency of your home. Neglected dryer vents can lead to:
          </p>

          <ul>
            <li>Increased risk of house fires</li>
            <li>Higher energy bills due to reduced dryer efficiency</li>
            <li>Premature dryer failure</li>
            <li>Longer drying times</li>
            <li>Moisture and mold issues</li>
          </ul>

          <p>
            Our Dryer Vent Maintenance Program is designed to prevent these problems before they start, providing you with peace of mind and significant cost savings over time.
          </p>

          <h2>Program Benefits</h2>

          <ul>
            <li><strong>Annual Inspections:</strong> Our trained technicians will thoroughly inspect your entire dryer vent system, from the connection at the dryer to the exterior vent, ensuring there are no safety issues or code violations.</li>
            <li><strong>Professional Cleaning:</strong> We'll provide annual cleaning to remove lint and other debris, ensuring your dryer operates at peak efficiency.</li>
            <li><strong>Priority Scheduling:</strong> As a program member, you'll receive priority scheduling for all your dryer vent maintenance needs.</li>
            <li><strong>Exclusive Discounts:</strong> Enjoy exclusive discounts on other services, such as air duct cleaning and electrostatic filter installations.</li>
            <li><strong>Safety Assurance:</strong> Protect your home and family from the risk of dryer vent fires.</li>
            <li><strong>Efficiency Guarantee:</strong> Reduce energy consumption and lower your utility bills with a clean, unobstructed dryer vent system.</li>
            <li><strong>Extended Appliance Life:</strong> Minimize wear and tear on your dryer, extending its operational lifespan.</li>
            <li><strong>Peace of Mind:</strong> With regular maintenance, you can rest assured that your dryer vent is in safe and efficient working order.</li>
          </ul>

          <h2>What's Included in Each Maintenance Visit?</h2>

          <p>
            Each visit from our Pure Air California team includes:
          </p>

          <ul>
            <li><strong>System Inspection:</strong> A full assessment of your dryer vent system, identifying potential problems.</li>
            <li><strong>Comprehensive Cleaning:</strong> Removal of all lint and debris using high-powered tools and specialized brushes.</li>
            <li><strong>Airflow Verification:</strong> Testing to ensure proper airflow and efficiency after cleaning.</li>
            <li><strong>Safety Check:</strong> Verification of proper vent material, secure connections, and compliance with safety codes.</li>
            <li><strong>Detailed Report:</strong> A written report outlining the service performed and any recommendations for your system.</li>
          </ul>

          <h2>Pricing and Enrollment</h2>

          <p>
            Our Dryer Vent Maintenance Program offers great value at a competitive price. Please contact us to learn about current pricing and enrollment options. Enrollment is quick and easy, and once you're a member, you'll enjoy all the benefits listed above.
          </p>

          <h2>Why Choose Pure Air California?</h2>

          <p>
            At Pure Air California, we're committed to providing expert dryer vent services throughout the Los Angeles area. Our certified technicians are trained in the latest safety protocols and cleaning technologies, ensuring your complete satisfaction.
          </p>

          <h2>Take the Next Step Toward a Safer and More Efficient Home</h2>

          <p>
            Don't wait for a problem to arise. Enroll in our Dryer Vent Maintenance Program today and enjoy the benefits of a professionally maintained dryer vent system. <Link to="/quote" className="text-brand-600 hover:underline">Request a free quote</Link> or call us at (213) 792-4145 to discuss your needs and schedule your first service.
          </p>
          <div className="bg-brand-100 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-bold text-brand-700 mb-4">Enroll Today!</h2>
          <p className="mb-4">
            Ensure your home's safety and efficiency by enrolling in our Dryer Vent Maintenance Program. It's the best way to prevent fires, reduce energy costs, and extend the life of your dryer.
          </p>
          <Link to="/quote" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded">
            Enroll Now
          </Link>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DryerVentMaintenanceProgram;