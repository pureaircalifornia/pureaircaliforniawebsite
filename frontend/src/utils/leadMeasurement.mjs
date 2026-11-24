const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
import { normalizeMeasurement } from './measurementContext.mjs';
export const validSubmissionId = value => typeof value === 'string' && uuid.test(value);
export const newSubmissionId = () => crypto.randomUUID();
export function acceptedReceipt(value, submissionId) {
  return value?.accepted === true && value.submission_id === submissionId && validSubmissionId(value.id);
}
export function adsConfiguration(id, label) {
  return /^AW-\d{6,15}$/.test(id || '') && /^[A-Za-z0-9_-]{5,100}$/.test(label || '') && !/placeholder|label|replace/i.test(label)
    ? { id, sendTo: `${id}/${label}` } : undefined;
}
export function createLeadDispatcher() {
  const sent = new Set();
  return ({ submissionId, deliveryChannel, formType, service, property, analytics, advertising, config, gtag, pageLocation, pageReferrer }) => {
    if (!validSubmissionId(submissionId) || deliveryChannel !== 'backend' || typeof gtag !== 'function') return false;
    if (analytics && !sent.has(`ga:${submissionId}`)) {
      try { gtag('event', 'generate_lead', {
        lead_id: submissionId, form_type: formType, ...normalizeMeasurement({ service_type: service, property_type: property }), delivery_channel: deliveryChannel,
        page_location: pageLocation, page_referrer: pageReferrer,
      }); sent.add(`ga:${submissionId}`); } catch { /* Measurement must not change accepted request UX. */ }
    }
    if (deliveryChannel === 'backend' && advertising && config && !sent.has(`ads:${submissionId}`)) {
      try { gtag('event', 'conversion', { send_to: config.sendTo, transaction_id: submissionId,
        page_location: pageLocation, page_referrer: pageReferrer }); sent.add(`ads:${submissionId}`); } catch { /* Intake succeeded independently. */ }
    }
    return true;
  };
}
