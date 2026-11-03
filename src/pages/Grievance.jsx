import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowDown, User, BadgeCheck, Mail } from 'lucide-react';
import { PageHero, Reveal, SectionHeading } from '../components/ui';
import { GRIEVANCE_LEVELS, SITE } from '../data/site';

const isEmail = (v) => /^[^\s@]+@[^\s@]+$/.test(v);

function EmailValue({ value, className = '' }) {
  return isEmail(value)
    ? <a href={`mailto:${value}`} className={`break-all hover:underline ${className}`}>{value}</a>
    : <span className={`break-all ${className}`}>{value}</span>;
}

export default function Grievance() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero eyebrow="Customer Protection" title="Grievance Redressal"
        text="Your concerns matter. Raise a grievance and track it through our clear three-level escalation process." />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Escalation Process" title="Three Levels of Resolution"
            text={`In case of any complaints or grievances, customers can use the following Grievance Redressal Mechanism set up by ${SITE.legalName}, as per the escalation matrix below.`} />

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-4">
              {GRIEVANCE_LEVELS.map((l, i) => {
                const isOpen = open === i;
                const rows = [[User, 'Name', l.name], [BadgeCheck, 'Designation', l.designation], [Mail, 'Email ID', l.email]].filter(([, , v]) => v);
                return (
                  <Reveal key={l.level} delay={i * 0.06} className="rounded-3xl bg-white shadow-sm">
                    <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-4 p-5 text-left sm:p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy font-heading tabular-nums text-sm font-semibold text-gold">0{l.level}</span>
                      <span className="flex-1">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Level {l.level}</span>
                        <span className="block font-heading text-lg font-bold text-navy">{l.title}</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-5 pb-6 sm:px-6">
                            <div className="grid gap-5 rounded-2xl bg-background p-5 sm:grid-cols-2">
                              {rows.map(([Icon, k, v]) => (
                                <div key={k} className="flex gap-3">
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold"><Icon className="h-4 w-4" /></span>
                                  <span className="min-w-0">
                                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{k}</span>
                                    {k === 'Email ID'
                                      ? <EmailValue value={v} className="block text-sm font-medium text-navy" />
                                      : <span className="block text-sm font-medium text-navy">{v}</span>}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1} className="rounded-3xl bg-navy p-6 sm:p-8">
              <h3 className="text-center font-heading text-xl font-bold text-white">Grievance Redressal Flowchart</h3>
              <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-gold" />
              <ol className="mt-8">
                {GRIEVANCE_LEVELS.map((l, i) => (
                  <li key={l.level}>
                    {i > 0 && <ArrowDown aria-hidden="true" className="mx-auto my-2 h-5 w-5 text-gold/70" />}
                    <div className={`rounded-2xl px-5 py-4 text-center ${i === 0 ? 'bg-cream text-navy' : 'border border-white/10 bg-navy-800 text-white'}`}>
                      <p className="text-sm">
                        <span className={i === 0 ? 'text-navy/60' : 'text-gold'}>Level {l.level}</span>{' '}
                        <span className="font-bold">{l.name || l.title}</span>
                      </p>
                      {l.designation && <p className={`mt-1 text-xs ${i === 0 ? 'text-navy/70' : 'text-white/70'}`}>{l.designation}</p>}
                      <EmailValue value={l.email} className={`mt-1 block text-xs ${i === 0 ? 'text-navy/80' : 'text-white/80'}`} />
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
