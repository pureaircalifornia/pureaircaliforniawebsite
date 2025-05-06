import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/blog" className="text-brand-600 hover:text-brand-700">
            ← Back to Blog
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">The Importance of Regular Air Duct Cleaning</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>March 15, 2024</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        
        <div className="prose max-w-none">
          <p className="lead">
            Regular <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">air duct cleaning</Link> is essential for maintaining a healthy indoor environment and ensuring your HVAC system operates efficiently. In this article, we'll explore why this maintenance task should be a priority for every homeowner and business owner.
          </p>
          
          <h2>Health Benefits</h2>
          <p>
            <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">Clean air ducts</Link> contribute significantly to better indoor air quality. Over time, dust, allergens, and other contaminants accumulate in your ductwork. These particles can circulate throughout your home or business, potentially causing or exacerbating respiratory issues, allergies, and other health problems. For more details, see our guide on <Link to="/blog/health-benefits-air-duct-cleaning" className="text-brand-600 hover:underline">health benefits of air duct cleaning</Link>.
          </p>
          
          <h2>Energy Efficiency</h2>
          <p>
            When air ducts are clogged with debris, your HVAC system has to work harder to maintain the desired temperature. This increased workload leads to higher energy consumption and utility bills. Regular <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">cleaning</Link> can improve system efficiency by up to 40%. For businesses, <Link to="/services/commercial-air-duct-cleaning" className="text-brand-600 hover:underline">commercial air duct cleaning</Link> provides similar efficiency improvements.
          </p>
          
          <h2>System Longevity</h2>
          <p>
            Just like any other mechanical system, your HVAC equipment benefits from regular maintenance. <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">Clean air ducts</Link> reduce strain on your system, helping to prevent breakdowns and extend the lifespan of your equipment.
          </p>
          
          <h2>When to Schedule Cleaning</h2>
          <p>
            We recommend scheduling <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">air duct cleaning</Link>:
          </p>
          <ul>
            <li>Every 3-5 years for most homes</li>
            <li>More frequently if you have pets</li>
            <li>After home renovations</li>
            <li>If you notice increased dust or allergy symptoms</li>
          </ul>
          
          <h2>Professional vs. DIY</h2>
          <p>
            While some maintenance tasks can be handled by homeowners, <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">air duct cleaning</Link> requires specialized equipment and expertise. Professional cleaners have the tools and knowledge to thoroughly clean your system without causing damage. See our <Link to="/blog/air-duct-cleaning-faq" className="text-brand-600 hover:underline">air duct cleaning FAQ</Link> for more information.
          </p>
          
          <div className="bg-brand-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Ready to Improve Your Indoor Air Quality?</h3>
            <p className="mb-4">
              Contact <Link to="/" className="text-brand-600 hover:underline">Pure Air California</Link> today to schedule your <Link to="/services/residential-air-duct-cleaning" className="text-brand-600 hover:underline">air duct cleaning service</Link>. Our certified technicians will ensure your system is clean and operating efficiently.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-brand-600 text-white px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost; 