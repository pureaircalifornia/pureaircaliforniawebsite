import React from 'react';
import { ScrollReveal } from './ui/scroll-reveal';
import ResponsiveImage from './ResponsiveImage';

const quotes = [
    {
        text: "Breathing is the first act of life and the last. Our very life depends on it.",
        author: "Joseph Pilates"
    },
    {
        text: "The quality of your breath determines the quality of your life.",
        author: "Unknown"
    },
    {
        text: "Clean air is not a luxury, it is a necessity for a healthy life.",
        author: "Pure Air California"
    }
];

const BreathingQuoteSection = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <ResponsiveImage
                    src="/images/backgrounds/breathing-nature.jpg"
                    alt="Serene nature background representing pure air"
                    className="w-full h-full object-cover"
                    width={1920}
                    height={800}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 italic font-serif leading-tight">
                            "When you breathe better, you live better."
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {quotes.map((quote, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors">
                                    <p className="text-lg md:text-xl font-medium mb-4">"{quote.text}"</p>
                                    <p className="text-sm uppercase tracking-wider opacity-80">- {quote.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default BreathingQuoteSection;
