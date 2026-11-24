import { pushToDataLayer } from './analytics';
import { safeAnalyticsUrl } from './privacy.mjs';

// Capture authored controls, never labels, field values or arbitrary query strings.
export function installInteractionTracking(root: Document = document) {
  const handleClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest('a,button,summary,[role="button"]');
    if (!control || control.closest('[data-analytics-ignore],.pac-privacy-choices')) return;
    const location = control.closest('nav') ? 'navigation' : control.closest('footer') ? 'footer'
      : control.closest('form') ? 'form' : control.closest('[class*="hero"]') ? 'hero' : 'content';
    const data = { click_location: location };
    if (control instanceof HTMLAnchorElement) {
      const url = new URL(control.href, window.location.href);
      if (url.protocol === 'tel:') return pushToDataLayer('phone_click', data);
      if (url.protocol === 'mailto:') return pushToDataLayer('email_click', data);
      if (!['https:', 'http:'].includes(url.protocol)) return;
      const internal = url.origin === window.location.origin;
      const quote = internal && (/^\/quote\/?$/.test(url.pathname) || url.hash === '#estimate-builder');
      // Hosted request opens are interactions, never accepted leads or bookings.
      // Match only our public destinations; do not copy query tokens or form data.
      const hostedRequest = url.hostname === 'book.housecallpro.com'
        ? url.pathname === '/book/Pure-Air-California/41595344e7314e6ca990aa001be77af6' ? 'residential'
          : url.pathname === '/lead-form/Pure-Air-California/3caf59e03b3740eb9d8bfe02b158a49e' ? 'commercial' : undefined
        : url.hostname === 'client.housecallpro.com' && url.pathname === '/customer_portal/request-link'
          && url.searchParams.get('token') === '8e93a8aea4cd4a2f811d8b6e829db66b' ? 'customer_portal' : undefined;
      pushToDataLayer(quote || (internal && /^\/contact\/?$/.test(url.pathname)) ? 'cta_click' : internal ? 'link_click' : 'outbound_link', {
        ...data, destination_url: safeAnalyticsUrl(url.href),
        ...(quote ? { cta_name: 'request_estimate' } : {}),
        ...(hostedRequest ? { request_channel: 'housecall_pro', request_type: hostedRequest } : {}),
      });
    } else {
      pushToDataLayer('ui_click', { ...data, control_type: control.tagName.toLowerCase(),
        button_type: control instanceof HTMLButtonElement ? control.type : undefined });
    }
  };
  root.addEventListener('click', handleClick, true);
  return () => root.removeEventListener('click', handleClick, true);
}
