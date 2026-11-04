import { lazy } from 'react';

// Every page except Home is its own chunk, downloaded on demand (or prefetched in the background).
const loaders = {
  '/about-us': () => import('./pages/About'),
  '/products': () => import('./pages/Products'),
  '/faq': () => import('./pages/Faq'),
  '/contact': () => import('./pages/Contact'),
  '/grievance-redressal': () => import('./pages/Grievance'),
};

export const PAGES = Object.fromEntries(Object.entries(loaders).map(([path, load]) => [path, lazy(load)]));

export const prefetchRoute = (path) => loaders[path]?.();

// After the current page has finished loading, quietly fetch the other pages so navigation is instant.
export function prefetchRoutesWhenIdle() {
  const run = () => Object.values(loaders).forEach((load) => load());
  const idle = () => (window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 4000 }) : setTimeout(run, 2000));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}
