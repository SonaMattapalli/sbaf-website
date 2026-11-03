import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHeading({ eyebrow, title, text, dark = false, center = true }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-white/60' : 'text-slate-600'}`}>{text}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute -right-10 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-[100px]" />
      <div className="container-x relative py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Logo({ dark = true, className = 'h-10 sm:h-11' }) {
  return (
    <img src={`${import.meta.env.BASE_URL}brand/${dark ? 'sbaf-logo.svg' : 'sbaf-logo-light.svg'}`} alt="SBAF — SB Asset Finance Pvt Ltd"
      className={`w-auto ${className}`} width="1007" height="150" />
  );
}
