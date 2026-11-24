import { forwardRef } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { canonicalLink } from '@/utils/canonicalLink';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...props }, ref) {
  return <RouterLink {...props} to={canonicalLink(to)} ref={ref} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, ...props }, ref) {
  return <RouterNavLink {...props} to={canonicalLink(to)} ref={ref} />;
});
