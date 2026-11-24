import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsAllowed, advertisingAllowed, consentState, CONSENT_EVENT, safeAnalyticsUrl } from '@/utils/privacy.mjs';
import { captureAttribution, safeAdvertisingUrl } from '@/utils/attribution.mjs';
import { getAdsConfiguration } from '@/utils/tracking';
import { initScrollTracking, trackPageView } from '@/utils/analytics';
import { campaignParameters } from '@/utils/measurementContext.mjs';
import { createPageViewGate } from '@/utils/pageViewGate.mjs';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    __pacAnalyticsInitialized?: boolean;
    __PRERENDERING__?: boolean;
    __pacConfiguredTags?: Set<string>;
    __pacMeasurementTransportRequested?: boolean;
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const [consentVersion, setConsentVersion] = useState(0);
  const pageViews = useRef(createPageViewGate());
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-SK8BHVML0W';
  const canMeasure = analyticsAllowed();
  useEffect(() => {
    const update = () => setConsentVersion(value => value + 1);
    window.addEventListener(CONSENT_EVENT, update);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener(CONSENT_EVENT, update); window.removeEventListener('storage', update); };
  }, []);

  useEffect(() => {
    pageViews.current.observe(location.pathname);
    const allowed = analyticsAllowed();
    const ads = advertisingAllowed() ? getAdsConfiguration() : undefined;
    captureAttribution();
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !allowed;
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', consentState());
    if (!allowed && !ads) return;
    if (!window.__pacAnalyticsInitialized) {
      window.__pacAnalyticsInitialized = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      });
      window.gtag('js', new Date());
      window.gtag('set', 'ads_data_redaction', true);
      window.gtag('set', 'url_passthrough', false);
      const script = document.createElement('script');
      script.async = true;
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-W8QH56V2';
      document.head.appendChild(script);
    }
    window.gtag('consent', 'update', consentState());
    window.__pacConfiguredTags ||= new Set();
    // Explicitly clear prior overrides when consent is withdrawn.
    if (allowed) window.gtag('set', { campaign_source: undefined, campaign_medium: undefined,
      campaign_name: undefined, campaign_term: undefined, campaign_content: undefined,
      ...campaignParameters() });
    if (allowed && !window.__pacConfiguredTags.has(measurementId)) {
      window.__pacConfiguredTags.add(measurementId);
      window.gtag('config', measurementId, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: safeAnalyticsUrl(window.location.href),
        page_referrer: safeAnalyticsUrl(document.referrer),
      });
    }
    if (ads && !window.__pacConfiguredTags.has(ads.id)) {
      window.__pacConfiguredTags.add(ads.id);
      window.gtag('config', ads.id, { send_page_view: false, allow_ad_personalization_signals: false,
        page_location: safeAdvertisingUrl(), page_referrer: safeAnalyticsUrl(document.referrer) });
    }
    if (!window.__pacMeasurementTransportRequested) {
      window.__pacMeasurementTransportRequested = true;
      window.dataLayer.push({ event: 'pac_measurement_ready', pac_google_tag_id: allowed ? measurementId : ads!.id });
    }
    if (!allowed) return;
    // Helmet commits route metadata on an animation frame. Read the title after
    // that commit, and cancel a pending view if navigation or consent changes.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        if (analyticsAllowed() && pageViews.current.claim(location.pathname)) {
          trackPageView(location.pathname, document.title);
        }
      });
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [location.pathname, location.search, measurementId, consentVersion]);

  useEffect(() => {
    if (canMeasure) return initScrollTracking();
  }, [location.pathname, canMeasure]);
  return null;
}
