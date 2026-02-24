export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual measurement ID
export const AW_CONVERSION_ID = 'AW-1120420693'; // Pure Air California Google Ads ID

// Base interface for the window object to include dataLayer and gtag
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

/**
 * Utility to track custom events (Google Analytics 4)
 */
export const trackEvent = (eventName: string, eventParameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventParameters);
    }
};

/**
 * Utility specifically for tracking Google Ads Conversions
 * @param sendTo The specific conversion label for this action (e.g., 'AW-XXXXXXXXX/AbCdEfGhIj')
 * @param value Optional conversion value
 * @param currency Optional currency code (e.g., 'USD')
 */
export const trackConversion = (sendTo: string, value?: number, currency: string = 'USD') => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': sendTo,
            'value': value,
            'currency': currency
        });
    }
};

/**
 * Utility to track a phone call click
 */
export const trackPhoneClick = () => {
    trackEvent('click_phone_number', {
        method: 'link'
    });

    // Example Ads Conversion for Phone Click (You'll need to replace with actual conversion label)
    // trackConversion('AW-1120420693/phoneClickLabel');
};

/**
 * Utility to track a successful Quote Form submission
 */
export const trackQuoteSubmission = () => {
    trackEvent('generate_lead', {
        lead_type: 'quote_request'
    });

    // Example Ads Conversion for Quote Lead (You'll need to replace with actual conversion label)
    // trackConversion('AW-1120420693/quoteSubmitLabel');
};

/**
 * Utility to track a successful Contact Form submission
 */
export const trackContactSubmission = () => {
    trackEvent('generate_lead', {
        lead_type: 'contact_form'
    });

    // Example Ads Conversion for Contact Lead (You'll need to replace with actual conversion label)
    // trackConversion('AW-1120420693/contactSubmitLabel');
};
