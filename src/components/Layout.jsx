import { Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Logo, PageSkeleton } from './ui';
import { prefetchRoute, prefetchRoutesWhenIdle } from '../routes';
import { NAV, SITE, WHATSAPP_URL } from '../data/site';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between lg:h-[72px]">
        <Link to="/" aria-label="SBAF home"><Logo /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end onMouseEnter={() => prefetchRoute(n.to)} onFocus={() => prefetchRoute(n.to)}
              className={({ isActive }) => `text-sm font-medium transition-colors duration-200 hover:text-gold ${isActive ? 'text-gold' : 'text-white/80'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button className="rounded-lg p-2 text-white lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-navy lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end
                className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-medium ${isActive ? 'bg-white/5 text-gold' : 'text-white/80'}`}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

const socialIcons = {
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  Instagram: (<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>),
  Twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
  LinkedIn: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
};

function Footer() {
  const cols = [
    { h: 'Company', links: [['About Us', '/about-us'], ['Products', '/products'], ['Contact Us', '/contact']] },
    { h: 'Support', links: [['FAQ', '/faq'], ['Grievance Redressal', '/grievance-redressal'], ['Privacy Policy', '/'], ['Terms & Conditions', '/']] },
    { h: 'Products', links: [['New Two-Wheeler Finance', '/products#new'], ['Pre-Owned Two-Wheeler Finance', '/products#pre-owned']] },
  ];
  return (
    <footer className="bg-navy text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" aria-label="SBAF home"><Logo className="h-10" /></Link>
            <p className="mt-4 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-cream/80">{SITE.slogan}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Two-wheeler finance made simple — for new and pre-owned motorcycles and scooters, across Andhra Pradesh.
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(socialIcons).map(([name, icon]) => (
                <a key={name} href={SITE.social[name.toLowerCase()]} aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold hover:text-gold">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{c.h}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map(([l, to]) => (
                  <li key={l}><Link to={to} className="text-sm text-white/65 transition hover:text-gold">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {SITE.legalName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={`tel:${SITE.phone}`} aria-label="Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold shadow-xl ring-1 ring-white/10 transition hover:scale-105">
        <Phone className="h-5 w-5" />
      </a>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105">
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}

export default function Layout() {
  useEffect(prefetchRoutesWhenIdle, []);
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <ScrollManager />
      <Navbar />
      <main><Suspense fallback={<PageSkeleton />}><Outlet /></Suspense></main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
