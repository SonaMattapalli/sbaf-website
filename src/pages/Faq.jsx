import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Search, ChevronDown, MessageSquare } from 'lucide-react';
import { PageHero, Reveal } from '../components/ui';
import { FAQS } from '../data/site';

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={`rounded-2xl bg-white transition ${isOpen ? 'shadow-lg shadow-navy/5' : 'shadow-sm'}`}>
            <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy">
              {q}<ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    return FAQS.filter((g) => cat === 'All' || g.cat === cat)
      .map((g) => ({ ...g, items: g.items.filter(([qq, a]) => !term || qq.toLowerCase().includes(term) || a.toLowerCase().includes(term)) }))
      .filter((g) => g.items.length);
  }, [cat, q]);

  return (
    <>
      <PageHero eyebrow="Help Center" title="Frequently Asked Questions" text="Everything you need to know about financing your two-wheeler with SBAF." />
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions..."
              className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-12 pr-5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {['All', ...FAQS.map((g) => g.cat)].map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${cat === c ? 'bg-navy text-white' : 'border border-slate-200 bg-white text-navy/80 hover:border-gold'}`}>{c}</button>
            ))}
          </div>

          <div className="mt-10 space-y-12">
            {groups.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No questions match your search.</p>}
            {groups.map((g) => (
              <Reveal key={g.cat}>
                <h2 className="mb-4 text-lg font-bold text-navy">{g.cat}</h2>
                <Accordion items={g.items} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-3xl bg-navy p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
            <p className="mt-2 text-white/60">Our support team is here to help you with anything about your financing journey.</p>
            <Link to="/contact" className="btn-gold mt-6"><MessageSquare className="h-4 w-4" /> Contact Support</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
