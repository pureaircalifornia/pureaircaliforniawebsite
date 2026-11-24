// Consent changes and query-only updates are not new page views. Observe every
// route, even while measurement is off, so returning to a page is a real visit.
export function createPageViewGate() {
  let currentPath;
  let sent = false;
  return {
    observe(path) {
      if (currentPath !== path) { currentPath = path; sent = false; }
    },
    claim(path) {
      if (currentPath !== path) { currentPath = path; sent = false; }
      if (sent) return false;
      sent = true;
      return true;
    },
  };
}
