// One policy for rendered metadata, sitemaps and release checks.
// The 486 industry/city planning pages reuse the same nine service templates.
// Keep them useful to visitors, but do not submit them as distinct search results.
// Re-enable an individual route only with documented, substantial local evidence.
const verifiedIndustryCityRoutes = new Set([]);
const utilityRoutes = new Set([
  '/booking-thank-you','/404', '/404.html', '/compare', '/dryer-safety', '/commercial-services']);

export function isPrivatePath(pathname) {
  return /^\/(?:admin|feedback|api)(?:\/|$)/i.test(pathname);
}

export function isSearchIndexable(pathname) {
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (isPrivatePath(path) || utilityRoutes.has(path)) return false;
  if (/^\/industries\/[^/]+\/[^/]+$/.test(path)) return verifiedIndustryCityRoutes.has(path);
  return true;
}
