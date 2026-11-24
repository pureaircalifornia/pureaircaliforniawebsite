import type { To } from 'react-router-dom';

/** Normalize root-relative page links without changing files, APIs or fragments. */
export function canonicalLink(to: To): To {
  if (typeof to !== 'string') {
    return to.pathname ? { ...to, pathname: canonicalLink(to.pathname) as string } : to;
  }
  if (!to.startsWith('/') || to.startsWith('//')) return to;
  const boundary = to.search(/[?#]/);
  const path = boundary < 0 ? to : to.slice(0, boundary);
  const suffix = boundary < 0 ? '' : to.slice(boundary);
  if (path.endsWith('/') || /\.[^/]+$/.test(path) || /^\/(api|admin)(\/|$)/.test(path)) return to;
  return `${path}/${suffix}`;
}
