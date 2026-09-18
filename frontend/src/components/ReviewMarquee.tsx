import React from 'react';
import { Star } from 'lucide-react';
import { business } from '@/config/business';
import { googleReviews } from '@/data/googleReviews';

/**
 * Real Google reviews, transcribed verbatim from the Pure Air California Google
 * Business Profile (CID 4164883086478915552) on 2 September 2026.
 *
 * These replaced six invented testimonials that carried fabricated reviewer
 * names, fabricated LA neighbourhoods and "Verified Customer" / Google / Yelp
 * badges. Presenting invented reviews as verified platform reviews breaches
 * Google's policies and US FTC rules on endorsements, quite apart from being
 * untrue. Do not add an entry here that is not a real, published review.
 *
 * The profile holds 7 reviews: these 6 five-star ones plus one 2-star review.
 * The carousel shows the positive ones, which is ordinary marketing selection —
 * but the aggregateRating in business.ts must always reflect ALL of them (4.6
 * from 7), because that figure is what Google validates as structured data.
 *
 * Reviews have no location attached on Google, so none is shown. The previous
 * "Beverly Hills, CA"-style lines were invented and are gone.
 */
const reviews = googleReviews;

const ReviewMarquee = () => {
    const { aggregateRating, googleReviewUrl } = business;

    return (
        <div className="w-full bg-slate-900 py-12 overflow-hidden border-y border-white/10 relative">
            <div className="absolute inset-0 bg-mesh opacity-5"></div>

            {/* Gradient Fades for seamless looping */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 mb-8 text-center relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Serving Los Angeles Since 1993</h2>
                <p className="text-gray-300">
                    Real reviews from our{' '}
                    <a
                        href={googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
                    >
                        Google Business Profile
                    </a>{' '}
                    — {aggregateRating.ratingValue} stars from {aggregateRating.reviewCount} reviews
                </p>
            </div>

            <div className="flex w-full overflow-hidden relative group">
                <div
                    className="flex animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none min-w-max gap-6 px-6"
                    style={{ animationDuration: '70s' }}
                >
                    {[...reviews, ...reviews].map((review, i) => (
                        <figure
                            key={i}
                            className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] bg-slate-800 border border-white/20 rounded-2xl p-5 md:p-6 shadow-xl hover:border-sky-400/50 transition-colors flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{review.name}</h3>
                                    <p className="text-sm text-gray-300">{review.when}</p>
                                </div>
                                <div
                                    className="flex bg-white/10 px-2 py-1 rounded gap-1"
                                    aria-label="Rated 5 out of 5"
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-gray-100 italic mb-4 leading-relaxed">
                                “{review.text}”
                            </blockquote>
                            <figcaption className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
                                    Google review
                                </span>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-200">
                                    Google
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewMarquee;
