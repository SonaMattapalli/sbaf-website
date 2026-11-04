import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin, Motorbike, Check, FileCheck2, Headphones, ShieldCheck, Map, HeartHandshake } from 'lucide-react';
import { Photo, Reveal, SectionHeading } from '../components/ui';
import { useIntroDone } from '../components/Intro';
import { IMAGES, PRODUCTS, JOURNEY } from '../data/site';

function Hero() {
  const ready = useIntroDone();
  const reduce = useReducedMotion();

  // Mouse parallax: the photo drifts a little, the badges in front drift more.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const photoX = useTransform(sx, (v) => v * -14);
  const photoY = useTransform(sy, (v) => v * -10);
  const badgeX = useTransform(sx, (v) => v * -30);
  const badgeY = useTransform(sy, (v) => v * -22);
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };


  return (
    <section className="relative overflow-hidden bg-navy" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <m.div initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs">
            <MapPin className="h-3.5 w-3.5" /> Two-Wheeler Finance • New &amp; Pre-Owned • Andhra Pradesh
          </span>
          <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            <span className="block">Finance Your Ride.</span>
            <span className="block text-gold">Move Forward.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            Simple and accessible financing solutions for new and pre-owned two-wheelers.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/products" className="btn-gold">Explore Our Loans</Link>
            <Link to="/contact" className="btn-ghost-dark">Contact Us</Link>
          </div>
        </m.div>

        <m.div className="relative" initial={{ opacity: 0, scale: 0.96 }} animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.15 }}>
          <m.div style={{ x: photoX, y: photoY }} className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <Photo image={IMAGES.hero} priority alt="Indian customer with a motorcycle financed by SBAF" className="aspect-[4/3.2] w-full object-cover" />
          </m.div>
          <m.div style={{ x: badgeX, y: badgeY }} className="absolute -top-3 right-3 sm:-right-3">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-navy/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur motion-safe:animate-float">
              <MapPin className="h-3.5 w-3.5 text-gold" /> Dealer Partners Across AP
            </div>
          </m.div>
          <m.div style={{ x: badgeX, y: badgeY }} className="absolute -bottom-6 left-4 sm:-left-6">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl motion-safe:animate-float-slow">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold"><Motorbike className="h-5 w-5" /></span>
              <span>
                <span className="block font-heading text-sm font-bold text-navy">New &amp; Pre-Owned</span>
                <span className="block text-xs text-slate-500">Two-Wheeler Finance</span>
              </span>
            </div>
          </m.div>
        </m.div>
      </div>

      {/* marquee */}
      <div className="relative border-y border-white/10 bg-navy-900 py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[0, 1, 2].map((k) => (
            <div key={k} className="flex gap-10">
              {['New Two-Wheeler Finance', 'Pre-Owned Two-Wheeler Finance', 'Dealer Partners Across Andhra Pradesh', 'Simple • Transparent • Accessible'].map((t) => (
                <span key={t} className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">
                  {t}<span className="text-white/20">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCards() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="What We Finance" title="Two-Wheeler Finance Made Simple"
          text="Whether it's a brand-new ride or a quality pre-owned one, we make financing accessible through our dealer partners across Andhra Pradesh." />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} as="article" className="group overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <Photo image={p.image} alt={p.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-navy/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">{p.badge}</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-700"><Check className="h-4 w-4 shrink-0 text-gold" />{f}</li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Link to={`/products#${p.id}`} className="btn-navy">Learn more →</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    [FileCheck2, 'Simple Process', 'A straightforward financing journey from enquiry to completion.'],
    [Headphones, 'Convenient Support', 'Support through our Rajahmundry branch and our dealer partners.'],
    [ShieldCheck, 'Transparent', 'Clear information about every step of the financing process.'],
    [Motorbike, 'New & Pre-Owned', 'Financing options for both new and eligible pre-owned two-wheelers.'],
    [Map, 'Wide Dealer Network', 'Dealer partners across Andhra Pradesh, so financing is available close to you.'],
    [HeartHandshake, 'Customer Focused', 'Support throughout your financing journey, start to finish.'],
  ];
  return (
    <section className="bg-white py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Why Choose Us" title="Built Around You"
          text="Everything we do is designed to make two-wheeler financing easier, clearer and closer to home." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08} className="group rounded-3xl bg-background p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-6 text-lg font-bold text-navy">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const bikeLeft = useTransform(progress, (p) => `${p * 100}%`);
  const [lit, setLit] = useState(0);
  const litRef = useRef(0);
  // A step lights up as the bike arrives at it (steps sit at 0, 1/3, 2/3 and 1 of the road).
  // Only update state when the lit count actually changes — this fires on every scroll frame.
  useMotionValueEvent(progress, 'change', (p) => {
    const next = p <= 0.02 ? 0 : JOURNEY.filter((_, i) => p >= i / 3 - 0.04).length;
    if (next !== litRef.current) { litRef.current = next; setLit(next); }
  });
  const litCount = reduce ? JOURNEY.length : lit;

  return (
    <section className="bg-navy py-24">
      <div className="container-x">
        <SectionHeading dark eyebrow="The Journey" title="How It Works" text="Four simple steps between you and your two-wheeler." />
        <div ref={ref} className="relative mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* the road runs from the centre of step 01 to the centre of step 04 */}
          <div aria-hidden="true" className="pointer-events-none absolute left-7 top-7 hidden w-[calc(75%+1.875rem)] lg:block">
            <div className="absolute inset-x-0 -top-px border-t-2 border-dashed border-white/15" />
            <m.div className="absolute inset-x-0 -top-[2px] h-1 origin-left rounded-full bg-gold" style={{ scaleX: reduce ? 1 : progress }} />
            <m.div className="absolute -top-[38px] -translate-x-1/2 text-gold" style={{ left: reduce ? '100%' : bikeLeft }}>
              <Motorbike className="h-8 w-8" strokeWidth={1.75} />
            </m.div>
          </div>
          {JOURNEY.map((s, i) => {
            const on = i < litCount;
            return (
              <Reveal key={s.title} delay={i * 0.12} className="relative">
                <span className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-lg font-semibold tabular-nums transition-all duration-500 ${on ? 'scale-110 bg-gold text-navy shadow-lg shadow-gold/30' : 'bg-navy-800 text-gold/70 ring-1 ring-white/15'}`}>0{i + 1}</span>
                <h3 className={`mt-6 text-lg font-bold transition-colors duration-500 ${on ? 'text-white' : 'text-white/60'}`}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCards />
      <WhyUs />
      <HowItWorks />
    </>
  );
}
