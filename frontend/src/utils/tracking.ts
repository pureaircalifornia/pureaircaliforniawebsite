import { analyticsAllowed, advertisingAllowed, safeAnalyticsUrl } from './privacy.mjs';
import { adsConfiguration, createLeadDispatcher } from './leadMeasurement.mjs';
import type { SubmissionResult } from './api';
import { measurementContext, normalizeMeasurement } from './measurementContext.mjs';
export const GA_TRACKING_ID = 'G-SK8BHVML0W';
// No guessed account or conversion labels. Missing configuration disables Ads dispatch.
export const getAdsConfiguration = () => adsConfiguration(import.meta.env.VITE_GOOGLE_ADS_ID, import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL);
const dispatchLead = createLeadDispatcher();

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
    if (analyticsAllowed() && typeof window.gtag === 'function') {
        try { window.gtag('event', eventName, { ...normalizeMeasurement({ ...measurementContext(), ...eventParameters }),
            page_location: safeAnalyticsUrl(window.location.href), page_referrer: safeAnalyticsUrl(document.referrer) }); } catch { /* Optional measurement. */ }
    }
};

/**
 * Utility specifically for tracking Google Ads Conversions
 * @param sendTo The specific conversion label for this action (e.g., 'AW-XXXXXXXXX/AbCdEfGhIj')
 * @param value Optional conversion value
 * @param currency Optional currency code (e.g., 'USD')
 */
export const trackAcceptedLead = (result: SubmissionResult, formType: string, service: string, property?: string) => {
    if (!result.success) return;
    dispatchLead({ submissionId: result.submission_id, deliveryChannel: result.delivery_channel,
        formType, service, property, analytics: analyticsAllowed(), advertising: advertisingAllowed(),
        config: getAdsConfiguration(), gtag: typeof window !== 'undefined' ? window.gtag : undefined,
        pageLocation: safeAnalyticsUrl(window.location.href), pageReferrer: safeAnalyticsUrl(document.referrer) });
};

/**
 * Utility to track a phone call click
 */
export const trackPhoneClick = () => {
    trackEvent('click_phone_number', {
        method: 'link'
    });

    // A telephone link click is secondary interaction, not a completed call.
};

/**
 * Utility to track a successful Quote Form submission
 */
export const trackQuoteSubmission = (result: SubmissionResult, service: string, property?: string) => trackAcceptedLead(result, 'quote_form', service, property);

/**
 * Utility to track a successful Contact Form submission
 */
export const trackContactSubmission = (result: SubmissionResult, service: string, property?: string) => trackAcceptedLead(result, 'contact_form', service, property);
