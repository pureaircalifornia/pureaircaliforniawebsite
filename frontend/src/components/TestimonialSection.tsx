import React from 'react';
import { ScrollReveal } from './ui/scroll-reveal';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

type Testimonial = {
  id: number;
  name: string;
  source: string;
  date: string;
  text: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    source: "Google",
    date: "2 weeks ago",
    text: "Pure Air California did an incredible job cleaning our air ducts. The before and after photos were shocking. The difference in air quality was immediately noticeable! Highly recommend.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    source: "Yelp",
    date: "1 month ago",
    text: "The team was professional, efficient, and thorough. They arrived on time for the same-day service. Our HVAC system is running more efficiently, and we're breathing cleaner air.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Thompson",
    source: "Google",
    date: "2 months ago",
    text: "I was amazed at how much dust and debris they removed from our dryer vent. The technicians explained everything they were doing. Excellent customer service from start to finish.",
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
                ))}
              </span>
              <span className="font-bold text-xl text-gray-800">4.9/5</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
              Trusted by Over 1,200+ Los Angeles Residents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We take pride in delivering exceptional service. See what our customers have to say about their experience with Pure Air California.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={0.1 * index}>
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{testimonial.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-blue-500" />
                        <span>Verified Customer</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex mb-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                      ))}
                    </span>
                    <span className="text-xs text-gray-400">{testimonial.date}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed flex-grow">"{testimonial.text}"</p>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-medium text-gray-500">
                  <span>Posted on {testimonial.source}</span>
                  <ExternalLink size={16} />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://g.page/pure-air-california/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors">
            Read all 1,200+ Google Reviews
            <ExternalLink className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
