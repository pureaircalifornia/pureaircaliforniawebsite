
import React, { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';

interface IndustryPageLayoutProps {
  title: string;
  subtitle: string;
  heroImage?: string;
  children: ReactNode;
}

const IndustryPageLayout = ({ title, subtitle, heroImage, children }: IndustryPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section 
        className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white relative"
        style={{
          backgroundImage: heroImage ? `linear-gradient(to right, rgba(0, 44, 69, 0.9), rgba(0, 67, 101, 0.8)), url(${heroImage})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl mb-8">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {children}

      {/* CTA and Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Indoor Air Quality?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Get a customized air quality solution for your specific needs. Our team of experts is ready to help your business maintain clean, healthy air.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  (213) 792-4145
                </Button>
              </div>
            </div>
            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryPageLayout;
