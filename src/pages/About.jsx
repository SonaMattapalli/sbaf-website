import { Target, Eye } from 'lucide-react';
import { PageHero, Reveal, SectionHeading } from '../components/ui';
import { IMAGES } from '../data/site';

const VALUES = [
  ['Trust', 'We earn trust by keeping our word, every single time.'],
  ['Transparency', 'Clear terms, clear communication, no surprises.'],
  ['Integrity', 'We do the right thing, even when no one is watching.'],
  ['Customer First', "Every decision starts with the customer's interest."],
  ['Accessibility', 'Financing that reaches people where they are.'],
  ['Responsibility', 'We lend responsibly and serve responsibly.'],
  ['Progress', 'We keep improving how we serve customers and partners.'],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Empowering Mobility Across Andhra Pradesh"
        text="A finance company built on trust, accessibility and transparent two-wheeler financing." />

      <section className="py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Financing that moves with you.</h2>
            <p className="mt-5 leading-relaxed text-slate-600">SBAF (SB Asset Finance Private Limited) is a finance company focused on two-wheeler financing. We help customers finance both new and eligible pre-owned motorcycles and scooters.</p>
            <p className="mt-4 leading-relaxed text-slate-600">We work closely with two-wheeler dealerships and dealer partners, with partners across Andhra Pradesh. Our branch is located in Rajahmundry.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={IMAGES.newBike} alt="Indian rider with a two-wheeler financed by SBAF" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-navy/20" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[[Target, 'Our Mission', 'To make two-wheeler financing accessible, transparent and convenient for every customer we serve.', true],
            [Eye, 'Our Vision', 'To build a trusted financial-services company that supports customers and dealer partners at every step of their journey.', false]].map(([Icon, t, d, dark], i) => (
            <Reveal key={t} delay={i * 0.1} className={`rounded-3xl p-8 sm:p-10 ${dark ? 'bg-navy text-white' : 'border border-slate-100 bg-background'}`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? 'bg-white/10 text-gold' : 'bg-gold/15 text-gold'}`}><Icon className="h-5 w-5" /></span>
              <h3 className={`mt-6 text-2xl font-bold ${dark ? 'text-white' : 'text-navy'}`}>{t}</h3>
              <p className={`mt-3 leading-relaxed ${dark ? 'text-white/65' : 'text-slate-600'}`}>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What Guides Us" title="Our Values" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 0.08} className="rounded-2xl border-t-2 border-gold bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="font-heading tabular-nums text-sm font-semibold text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
