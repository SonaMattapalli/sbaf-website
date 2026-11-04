import { Link } from 'react-router-dom';
import { Users, FileText, Check, HelpCircle } from 'lucide-react';
import { PageHero, Photo, Reveal } from '../components/ui';
import { PRODUCTS, JOURNEY } from '../data/site';

export default function Products() {
  return (
    <>
      <PageHero eyebrow="Our Products" title="Tailored Two-Wheeler Financing"
        text="Two simple products — one for brand-new rides, one for quality pre-owned ones." />

      {PRODUCTS.map((p, idx) => (
        <section key={p.id} id={p.id} className={`scroll-mt-24 py-24 ${idx % 2 ? 'bg-white' : ''}`}>
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal className={`lg:sticky lg:top-28 ${idx % 2 ? 'lg:order-2' : ''}`}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/20">
                <Photo image={p.image} eager={idx === 0} alt={p.alt} className="aspect-[4/3.4] w-full object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-navy/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">{p.badge}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight text-navy">{p.title}</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{p.summary}</p>

              <div className="mt-8 rounded-2xl border border-slate-100 bg-background p-6">
                <h3 className="flex items-center gap-2 font-bold text-navy"><Users className="h-4 w-4 text-gold" /> Who is it for?</h3>
                {p.whoFor.map((t) => <p key={t} className="mt-3 text-sm leading-relaxed text-slate-600">{t}</p>)}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-background p-6">
                <h3 className="flex items-center gap-2 font-bold text-navy"><FileText className="h-4 w-4 text-gold" /> Documents Required</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {p.documents.map((d) => <li key={d} className="flex gap-2 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{d}</li>)}
                </ul>
                <p className="mt-4 text-xs text-slate-400">Indicative list — the final document checklist is shared at the time of application.</p>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-background p-6">
                <h3 className="font-bold text-navy">The Financing Journey</h3>
                <ol className="mt-4 space-y-3">
                  {JOURNEY.map((s, i) => (
                    <li key={s.title} className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy font-heading tabular-nums text-[11px] font-semibold text-gold">{i + 1}</span>{s.title}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4 text-xs leading-relaxed text-slate-500">
                [Eligibility criteria, loan amounts, interest rates and fees are company-specific and will be updated here. Please contact our team for current details.]
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/faq" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-gold">
                  <HelpCircle className="h-4 w-4" /> Read FAQs
                </Link>
                <Link to="/contact" className="btn-navy">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
