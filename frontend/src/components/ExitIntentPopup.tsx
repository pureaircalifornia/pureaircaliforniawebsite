import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExitIntentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup or subscribed
        const hasSeenPopup = localStorage.getItem('pac_newsletter_shown');
        const hasSubscribed = localStorage.getItem('pac_newsletter_subscribed');

        if (hasSeenPopup || hasSubscribed) {
            return;
        }

        // Exit intent detection for desktop
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                localStorage.setItem('pac_newsletter_shown', 'true');
            }
        };

        // Scroll-based trigger for mobile (after scrolling 60% down)
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 60 && !hasTriggered && window.innerWidth < 768) {
                setIsVisible(true);
                setHasTriggered(true);
                localStorage.setItem('pac_newsletter_shown', 'true');
            }
        };

        // Add delay before enabling triggers (don't annoy users immediately)
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
            window.addEventListener('scroll', handleScroll);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasTriggered]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) return;

        setIsSubmitting(true);

        // Track newsletter signup in GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'newsletter_signup',
                email_domain: email.split('@')[1],
                source: 'exit_intent_popup'
            });
        }

        // TODO: Replace with your actual newsletter API endpoint
        // For now, we'll just simulate success
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('pac_newsletter_subscribed', 'true');
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Auto-close after success
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Popup Container */}
                    <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-md max-h-full flex flex-col pointer-events-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
                            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                        >
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-4 sm:p-6 text-white relative">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                    aria-label="Close popup"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
                                        <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-brand-100">Exclusive Offer</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 pr-8">
                                    Wait! Get $25 Off Your First Service
                                </h2>
                                <p className="text-brand-100 text-xs sm:text-sm">
                                    Plus air quality tips and exclusive deals delivered to your inbox.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-4 sm:p-6">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-4"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">You're In!</h3>
                                        <p className="text-gray-600">
                                            Check your email for your $25 discount code. Welcome to the Pure Air family!
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-12 py-6 text-lg rounded-xl border-gray-200 focus:border-brand-500 focus:ring-brand-500"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full btn-premium py-6 text-lg font-bold rounded-xl"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Subscribing...
                                                </span>
                                            ) : (
                                                'Claim My $25 Discount'
                                            )}
                                        </Button>
                                        <p className="text-xs text-gray-500 text-center">
                                            No spam, ever. Unsubscribe anytime. By subscribing you agree to our{' '}
                                            <a href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</a>.
                                        </p>
                                    </form>
                                )}

                                {/* Trust indicators */}
                                {!isSubmitted && (
                                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                448K+ satisfied customers
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                NADCA certified
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
