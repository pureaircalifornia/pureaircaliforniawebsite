import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Fan, Check, AlertTriangle, Clock, Shield, Award, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ResidentialDryerVentCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Residential Dryer Vent Cleaning Services | Pure Air California</title>
        <meta name="description" content="Professional residential dryer vent cleaning services to prevent fire hazards and improve efficiency. Licensed technicians, same-day service available. Get a free quote today." />
        <meta name="keywords" content="dryer vent cleaning, residential dryer vent cleaning, dryer vent cleaning service, fire prevention, dryer efficiency, lint removal, home safety" />
        <meta property="og:title" content="Residential Dryer Vent Cleaning Services | Pure Air California" />
        <meta property="og:description" content="Professional residential dryer vent cleaning services to prevent fire hazards and improve efficiency. Licensed technicians, same-day service available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/services/residential-dryer-vent-cleaning" />
        <link rel="canonical" href="https://pureairca.com/services/residential-dryer-vent-cleaning" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Residential Dryer Vent Cleaning",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Pure Air California",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Airway Blvd",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90001",
                "addressCountry": "US"
              },
              "telephone": "+18005551234"
            },
            "description": "Professional residential dryer vent cleaning services to prevent fire hazards and improve efficiency. Licensed technicians, same-day service available.",
            "areaServed": {
              "@type": "State",
              "name": "California"
            }
          })}
        </script>
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Dryer Vent Cleaning Services</h1>
            <p className="text-xl mb-8">
              Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service. 
              Licensed technicians, same-day service available, and comprehensive safety inspection included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Schedule Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-4 bg-red-100 rounded-lg mb-6">
                <AlertTriangle size={42} className="text-red-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Safety First: Prevent Dryer Fires</h2>
              <p className="text-lg text-gray-600 mb-6">
                Did you know that clogged dryer vents are responsible for thousands of house fires annually? 
                Lint buildup in dryer vents is highly flammable and restricts airflow, creating dangerous conditions 
                that can lead to fires. Our professional dryer vent cleaning service removes this hazardous buildup, 
                significantly reducing fire risk in your home.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Fire Prevention</span> - Remove flammable lint buildup from your entire vent system</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved Efficiency</span> - Reduce drying times and save on energy costs by up to 30%</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Appliance Life</span> - Less strain on your dryer means longer equipment life</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Carbon Monoxide Prevention</span> - Ensure proper venting of gas dryers to prevent CO buildup</p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1597345637412-9fd611e758e4?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician cleaning dryer vent"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warning Signs You Need Dryer Vent Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch for these telltale signs that your dryer vent needs professional cleaning. 
              Don't wait until it's too late - early detection can prevent costly damage and dangerous situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Longer Drying Times</h3>
              <p className="text-gray-600">
                If your clothes are taking longer to dry than usual, it's a clear sign that airflow is restricted by lint buildup.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <AlertTriangle size={32} className="text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hot Dryer Exterior</h3>
              <p className="text-gray-600">
                An unusually hot dryer exterior indicates the appliance is working harder than it should due to poor ventilation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Home size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lint Around Vent Opening</h3>
              <p className="text-gray-600">
                Visible lint accumulation around the exterior vent opening is a sure sign of blockage inside the vent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Musty Odors</h3>
              <p className="text-gray-600">
                Unpleasant odors from your dryer can indicate moisture buildup caused by poor ventilation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <AlertTriangle size={32} className="text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Burning Smell</h3>
              <p className="text-gray-600">
                A burning smell during operation is a serious warning sign that requires immediate attention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Home size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excessive Lint in Trap</h3>
              <p className="text-gray-600">
                If you're finding more lint than usual in the lint trap, it may indicate the vent is partially blocked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Professional Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive, step-by-step process to ensure your dryer vent is thoroughly cleaned and safe for use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Initial Inspection</h3>
              <p className="text-gray-600">
                Comprehensive assessment of your dryer vent system using specialized cameras to identify blockages and damage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Equipment Setup</h3>
              <p className="text-gray-600">
                Set up professional cleaning equipment including HEPA vacuums and specialized brushes for thorough cleaning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Cleaning</h3>
              <p className="text-gray-600">
                Remove all lint, debris, and blockages from the entire vent system using professional-grade equipment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Final Verification</h3>
              <p className="text-gray-600">
                Conduct post-cleaning inspection and airflow testing to ensure optimal performance and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Pure Air California</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're the trusted choice for residential dryer vent cleaning across California, with licensed technicians and comprehensive service guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Award size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed technicians with comprehensive liability insurance and workers' compensation coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Same-Day Service</h3>
              <p className="text-gray-600">
                Emergency and same-day service available for urgent situations. Flexible scheduling to fit your needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">100% Satisfaction</h3>
              <p className="text-gray-600">
                Complete satisfaction guarantee with before-and-after photos and detailed service documentation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Fan size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Advanced Equipment</h3>
              <p className="text-gray-600">
                Professional-grade cleaning equipment including HEPA vacuums and specialized brushes for thorough cleaning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Home size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Home Protection</h3>
              <p className="text-gray-600">
                Protect your home and family with our comprehensive safety inspection and cleaning service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ArrowRight size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Maintenance Plans</h3>
              <p className="text-gray-600">
                Ongoing maintenance programs to keep your dryer vent clean and safe year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our residential dryer vent cleaning services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How often should I have my dryer vent cleaned?</h3>
              <p className="text-gray-600">
                We recommend cleaning your dryer vent at least once per year for most households. However, if you have a large family, 
                use your dryer frequently, or have pets, you may need cleaning every 6-8 months. We can assess your specific needs during our inspection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How long does dryer vent cleaning take?</h3>
              <p className="text-gray-600">
                Most residential dryer vent cleanings take 1-2 hours, depending on the length and complexity of your vent system. 
                We'll provide a time estimate during our initial inspection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Can I clean my dryer vent myself?</h3>
              <p className="text-gray-600">
                While you can clean the lint trap regularly, professional cleaning is recommended for the vent system. 
                DIY cleaning often misses hidden blockages and can damage the vent. Our professional equipment and expertise ensure thorough, safe cleaning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What equipment do you use for cleaning?</h3>
              <p className="text-gray-600">
                We use professional-grade equipment including HEPA vacuums, specialized brushes, and inspection cameras. 
                This ensures thorough cleaning and allows us to identify any damage or issues with your vent system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you provide emergency service?</h3>
              <p className="text-gray-600">
                Yes, we offer emergency dryer vent cleaning services for urgent situations. If you notice warning signs like 
                burning smells or excessive heat, contact us immediately for same-day service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What's included in your dryer vent cleaning service?</h3>
              <p className="text-gray-600">
                Our service includes a comprehensive inspection, complete cleaning of the entire vent system, 
                airflow testing, and detailed documentation with before-and-after photos. We also provide recommendations for maintenance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How much does dryer vent cleaning cost?</h3>
              <p className="text-gray-600">
                Our pricing is competitive and depends on the length and complexity of your vent system. 
                We provide free, no-obligation quotes and transparent pricing with no hidden fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you offer maintenance programs?</h3>
              <p className="text-gray-600">
                Yes, we offer maintenance programs that include regular inspections and cleanings. 
                These programs help prevent issues and ensure your dryer vent remains safe and efficient year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Risk a Dryer Fire - Schedule Cleaning Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Protect your home and family with professional dryer vent cleaning. Contact us today for a free quote and same-day service availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialDryerVentCleaning;
