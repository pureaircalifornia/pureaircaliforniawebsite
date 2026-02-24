/**
 * Analytics Utility Module
 * Centralized tracking for GTM, GA4, and Google Ads
 * 
 * This module pushes events to the dataLayer which are then
 * picked up by Google Tag Manager to fire appropriate tags.
 */

declare global {
    interface Window {
        dataLayer: any[];
    }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
}

/**
 * Push an event to the dataLayer
 */
export const pushToDataLayer = (event: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event,
        ...data,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Track page views with enhanced data
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
    pushToDataLayer('page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
        page_referrer: document.referrer,
        page_location: window.location.href,
    });
};

/**
 * Track form submissions - PRIMARY CONVERSION for Google Ads
 */
export const trackFormSubmission = (
    formType: string,
    formData: {
        service?: string;
        propertyType?: string;
        squareFootage?: string;
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        abVariant?: string;
    }
) => {
    // Generate lead event for GA4
    pushToDataLayer('generate_lead', {
        form_type: formType,
        service_type: formData.service,
        property_type: formData.propertyType,
        square_footage: formData.squareFootage,
        ab_variant: formData.abVariant || 'none',
        currency: 'USD',
        value: getEstimatedLeadValue(formData.service, formData.propertyType),
    });

    // Form submission event for Google Ads conversion
    pushToDataLayer('form_submission', {
        form_name: formType,
        conversion_type: 'lead',
        service_requested: formData.service,
        property_type: formData.propertyType,
    });
};

/**
 * Track form step progression (for multi-step forms)
 */
export const trackFormStep = (
    formType: string,
    stepNumber: number,
    stepName: string
) => {
    pushToDataLayer('form_step', {
        form_type: formType,
        step_number: stepNumber,
        step_name: stepName,
    });
};

/**
 * Track phone call clicks - SECONDARY CONVERSION for Google Ads
 */
export const trackPhoneCall = (location: string) => {
    pushToDataLayer('phone_click', {
        click_location: location,
        phone_number: '(213) 792-4145',
        conversion_type: 'phone_call',
    });

    // Explicit Google Ads Conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-1120420693/phoneClickLabel' // User to replace with actual conversion label
        });
    }
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string, destination?: string) => {
    pushToDataLayer('cta_click', {
        cta_name: ctaName,
        click_location: location,
        destination_url: destination,
    });
};

/**
 * Track scroll depth milestones
 */
let scrollMilestones: Record<number, boolean> = {};

export const initScrollTracking = () => {
    scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        [25, 50, 75, 100].forEach((milestone) => {
            if (scrollPercent >= milestone && !scrollMilestones[milestone]) {
                scrollMilestones[milestone] = true;
                trackScrollDepth(milestone);
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
};

export const trackScrollDepth = (percentage: number) => {
    pushToDataLayer('scroll_depth', {
        scroll_percentage: percentage,
        page_path: window.location.pathname,
    });
};

/**
 * Reset scroll tracking (call on route change)
 */
export const resetScrollTracking = () => {
    scrollMilestones = { 25: false, 50: false, 75: false, 100: false };
};

/**
 * Track user engagement events
 */
export const trackEngagement = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    pushToDataLayer('user_engagement', {
        engagement_action: action,
        engagement_category: category,
        engagement_label: label,
        engagement_value: value,
    });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, linkText: string) => {
    pushToDataLayer('outbound_link', {
        outbound_url: url,
        link_text: linkText,
    });
};

/**
 * Track video engagement (if you add videos later)
 */
export const trackVideoEvent = (
    action: 'play' | 'pause' | 'complete' | 'progress',
    videoTitle: string,
    videoPercent?: number
) => {
    pushToDataLayer('video_engagement', {
        video_action: action,
        video_title: videoTitle,
        video_percent: videoPercent,
    });
};

/**
 * Track A/B test variant exposure
 */
export const trackABVariantExposure = (
    experimentId: string,
    variant: string
) => {
    pushToDataLayer('ab_test_exposure', {
        experiment_id: experimentId,
        variant_id: variant,
    });
};

/**
 * Estimate lead value based on service type and property
 * Used for Google Ads value-based bidding
 */
const getEstimatedLeadValue = (
    service?: string,
    propertyType?: string
): number => {
    // Base values by service type
    const serviceValues: Record<string, number> = {
        'Air Duct Cleaning': 350,
        'Dryer Vent Cleaning': 150,
        'HVAC Cleaning': 500,
        'Electrostatic Filters': 200,
        'UV Air Purification': 400,
        'Commercial Services': 1000,
    };

    // Property type multipliers
    const propertyMultipliers: Record<string, number> = {
        'residential': 1,
        'commercial': 2.5,
        'industrial': 3,
    };

    const baseValue = serviceValues[service || ''] || 300;
    const multiplier = propertyMultipliers[propertyType?.toLowerCase() || ''] || 1;

    return baseValue * multiplier;
};

/**
 * Track time on page (call before navigation/unload)
 */
let pageLoadTime: number | null = null;

export const startTimeTracking = () => {
    pageLoadTime = Date.now();
};

export const trackTimeOnPage = () => {
    if (pageLoadTime) {
        const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000);
        pushToDataLayer('time_on_page', {
            time_seconds: timeSpent,
            page_path: window.location.pathname,
        });
    }
};
