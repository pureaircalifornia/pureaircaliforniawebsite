import React, { useState, useEffect } from 'react';
import { MessageSquareText, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SMSLeadWidget = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Business SMS Number
    const phoneNumber = "+12137924145";
    // Pre-filled message designed to lower friction
    const defaultMessage = "Hi Pure Air! I'm interested in getting a quote for air duct cleaning at my home.";

    useEffect(() => {
        // Only show on mobile devices (where SMS links work natively)
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
                setIsMobile(true);
            }
        };

        checkMobile();

        // Reveal the widget after a slight delay to not overwhelm immediate page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isMobile) return null;

    const handleSmsClick = () => {
        // Track the click before opening the native SMS app
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'sms_lead_click',
                location: 'floating_widget'
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-[100px] right-6 z-[100] md:hidden"
                >
                    <a
                        href={`sms:${phoneNumber}?&body=${encodeURIComponent(defaultMessage)}`}
                        onClick={handleSmsClick}
                        className="flex items-center justify-center w-16 h-16 bg-brand-600 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all relative group"
                        aria-label="Send us an SMS"
                    >
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20"></div>

                        <MessageSquareText className="w-8 h-8 text-white relative z-10" />

                        {/* Notification Dot */}
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SMSLeadWidget;
