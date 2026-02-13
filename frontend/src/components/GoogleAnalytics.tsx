import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    trackPageView,
    initScrollTracking,
    resetScrollTracking,
    startTimeTracking,
    trackTimeOnPage
} from '../utils/analytics';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GoogleAnalytics = () => {
    const location = useLocation();
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    // Initialize GA4 script
    useEffect(() => {
        if (!measurementId) return;

        const scriptId = 'google-analytics-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());
            window.gtag('config', measurementId);
        }
    }, [measurementId]);

    // Track page views with enhanced data on route change
    useEffect(() => {
        // Track time on previous page before navigating
        trackTimeOnPage();

        // Start fresh time tracking for new page
        startTimeTracking();

        // Reset scroll tracking for new page
        resetScrollTracking();

        // Track page view to dataLayer (for GTM)
        trackPageView(
            location.pathname + location.search,
            document.title
        );

        // Also send to GA4 directly if available
        if (measurementId && typeof window.gtag === 'function') {
            window.gtag('config', measurementId, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location, measurementId]);

    // Initialize scroll depth tracking
    useEffect(() => {
        const cleanup = initScrollTracking();
        return cleanup;
    }, [location.pathname]); // Re-initialize on route change

    // Track time on page when user leaves
    useEffect(() => {
        const handleBeforeUnload = () => {
            trackTimeOnPage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return null;
};

export default GoogleAnalytics;
