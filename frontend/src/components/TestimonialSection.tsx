
import React from 'react';
import { ScrollReveal } from './ui/scroll-reveal';
import { Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Beverly Hills",
    text: "Pure Air California did an incredible job cleaning our air ducts. The difference in air quality was immediately noticeable!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Sherman Oaks",
    text: "The team was professional, efficient, and thorough. Our HVAC system is running more efficiently, and we're breathing cleaner air.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Thompson",
    location: "Malibu",
    text: "I was amazed at how much dust and debris they removed from our air ducts. Highly recommend their services!",
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={0.1 * index}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Quote className="text-blue-600 mr-2" size={20} />
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
