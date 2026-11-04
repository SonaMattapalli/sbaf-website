import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { PageHero, Reveal } from '../components/ui';
import { SITE, WHATSAPP_URL } from '../data/site';

const MAP_URL = 'https://maps.google.com/maps?q=Ayyappa%20Nagar%2C%20Rajahmundry%2C%20Andhra%20Pradesh&z=14&output=embed';

// Google Maps pulls in ~500 KB of scripts, so the map only starts loading once the rest of the page is ready.
function BranchMap() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const start = () => setShow(true);
    const idle = () => (window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200));
    if (document.readyState === 'complete') { idle(); return undefined; }
    window.addEventListener('load', idle, { once: true });
    return () => window.removeEventListener('load', idle);
  }, []);
  return show
    ? <iframe title="SBAF branch — Rajahmundry" className="h-80 w-full border-0 lg:h-96" loading="lazy" src={MAP_URL} />
    : <div aria-hidden="true" className="flex h-80 w-full animate-pulse items-center justify-center bg-slate-200/60 lg:h-96"><MapPin className="h-8 w-8 text-slate-400" /></div>;
}

export default function Contact() {
  const cards = [
    [Phone, 'Phone', SITE.phoneDisplay],
    [Mail, 'Email', SITE.email],
    [MapPin, 'Office Address', SITE.office],
    [Clock, 'Customer Support', SITE.hours],
  ];
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in Touch" text="Questions about financing, your application, or partnerships — we're here to help." />

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(([Icon, l, v], i) => (
              <Reveal key={l} delay={i * 0.06} className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold"><Icon className="h-5 w-5" /></span>
                <p className="mt-5 text-sm font-bold uppercase tracking-wide text-navy">{l}</p>
                <p className="mt-1.5 text-sm text-slate-500">{v}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${SITE.phone}`} className="flex items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-sm font-semibold text-white transition hover:bg-navy-700"><Phone className="h-4 w-4" /> Call Us Now</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-semibold text-white transition hover:brightness-95"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Find Us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Our Branch</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Reveal className="overflow-hidden rounded-3xl shadow-lg">
              <BranchMap />
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl bg-background p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold"><MapPin className="h-5 w-5" /></span>
              <h3 className="mt-5 text-xl font-bold text-navy">{SITE.branch} Branch</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{SITE.office}. We also work with dealer partners across Andhra Pradesh.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
