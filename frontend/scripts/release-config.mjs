// Public release destinations, never credentials. Changing this contract requires
// a verified receiver/Ads action and its corresponding release checks.
export const productionReleaseConfig = Object.freeze({
  VITE_API_BASE_URL: 'https://pac-crm-backend.onrender.com/api',
  VITE_GOOGLE_ADS_ID: 'AW-1003912049',
  VITE_GOOGLE_ADS_LEAD_LABEL: 'PAI-CLX-2ZodEPH22d4D',
});

export function assertProductionReleaseConfig({ command, mode }, env) {
  if (command !== 'build' || mode !== 'production') return;
  const invalid = Object.entries(productionReleaseConfig)
    .filter(([key, expected]) => env?.[key] !== expected)
    .map(([key]) => key);
  if (invalid.length) {
    throw new Error(`Production release blocked: configure ${invalid.join(', ')} to the reviewed production contract. Verify the receiver before deployment; use ads-review mode for isolated local review.`);
  }
}
