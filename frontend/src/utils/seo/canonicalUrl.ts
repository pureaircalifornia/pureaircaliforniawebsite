import { seoConfig } from './seoConfig';
/** One canonical convention for page, breadcrumb and entity URLs. */
export const canonicalUrl = (pathOrUrl: string): string => {
 const url = new URL(pathOrUrl || '/', seoConfig.siteUrl);
 const pathname = url.pathname.replace(/\/{2,}/g, '/');
 const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') + '/';
 return seoConfig.siteUrl + normalized;
};
