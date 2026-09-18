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

    // Initialize GA4 and Google Ads after delay to avoid blocking main thread (LCP/TBT fix)
    useEffect(() => {
        if (!measurementId) return;

        let initialized = false;

        const initTracking = () => {
            if (initialized) return;
            initialized = true;

            // 1. Google Analytics & Google Ads
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            document.head.appendChild(gaScript);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());
            window.gtag('config', measurementId);
            window.gtag('config', 'AW-1120420693'); // Pure Air California Google Ads

            // 2. Google Tag Manager
            (function (w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push({
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                    // @ts-ignore
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                // @ts-ignore
            })(window, document, 'script', 'dataLayer', 'GTM-KWX8V4NL');
        };

        // Delay execution until browser is idle or after 2.5s
        const timeoutId = setTimeout(initTracking, 2500);

        // Or initialize immediately on first scroll/interaction
        const handleInteraction = () => {
            initTracking();
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('click', handleInteraction);
        };

        window.addEventListener('scroll', handleInteraction, { passive: true });
        window.addEventListener('click', handleInteraction, { passive: true });

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('click', handleInteraction);
        };
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
