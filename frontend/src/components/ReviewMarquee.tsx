import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    { name: "Sarah Jenkins", location: "Beverly Hills, CA", text: "Incredible difference! Our allergies cleared up within a week of them cleaning our ducts. Highly professional team.", platform: "Google" },
    { name: "Michael Chen", location: "Santa Monica, CA", text: "Fast, spotless, and incredibly polite. They showed me the before and after photos and I was shocked. A+ service.", platform: "Yelp" },
    { name: "David & Emma", location: "Encino, CA", text: "We thought we needed a new HVAC system, but Pure Air just did a deep clean and now it runs like new. Saved us thousands!", platform: "Google" },
    { name: "Jessica R.", location: "Pasadena, CA", text: "The technicians were super knowledgeable and walked me through the whole process. Breathing easier now!", platform: "Google" },
    { name: "Thomas Brooks", location: "Los Angeles, CA", text: "Best air duct cleaning service in LA, hands down. Punctual and very thorough. My dryer vent is completely clear now too.", platform: "Yelp" },
    { name: "Amanda Liu", location: "Glendale, CA", text: "I was skeptical, but the amount of dust they removed from our new home was insane. Feel so much better about the air here.", platform: "Google" },
];

const ReviewMarquee = () => {
    return (
        <div className="w-full bg-slate-900 py-12 overflow-hidden border-y border-white/10 relative">
            <div className="absolute inset-0 bg-mesh opacity-5"></div>

            {/* Gradient Fades for seamless looping */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 mb-8 text-center relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Join 448,000+ Satisfied Los Angeles Residents</h2>
                <p className="text-gray-400">Real reviews from your neighbors</p>
            </div>

            <div className="flex w-full overflow-hidden relative group">
                {/* CSS animation defined in globals.css or tailwind config */}
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] min-w-max gap-6 px-6">
                    {[...reviews, ...reviews].map((review, i) => (
                        <div key={i} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] glass-premium bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                    <p className="text-sm text-sky-400">{review.location}</p>
                                </div>
                                <div className="flex bg-white/10 px-2 py-1 rounded gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-4 line-clamp-3">"{review.text}"</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Verified Customer</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${review.platform === 'Google' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'}`}>
                                    {review.platform}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewMarquee;
