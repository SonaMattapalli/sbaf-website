import { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { S_MARK } from './brand';

// Brand intro: the S mark draws itself once per browser session, then fades away.
const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);

const KEY = 'sbaf-intro-seen';
const DURATION = 2000;

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export function IntroProvider({ children }) {
  const [playing, setPlaying] = useState(shouldPlay);

  useEffect(() => {
    if (!playing) return undefined;
    try { sessionStorage.setItem(KEY, '1'); } catch { /* storage unavailable — intro may replay */ }
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => setPlaying(false), DURATION);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, [playing]);

  return (
    <IntroContext.Provider value={!playing}>
      {children}
      <AnimatePresence>
        {playing && (
          <motion.div key="intro" aria-hidden="true" onClick={() => setPlaying(false)}
            className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-navy"
            exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <svg viewBox={S_MARK.viewBox} className="h-20 w-20 sm:h-24 sm:w-24">
              <motion.path d={S_MARK.d} fill="#E5B84A" stroke="#E5B84A" strokeWidth="6"
                initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 1.1, ease: 'easeInOut' }, fillOpacity: { delay: 0.9, duration: 0.4 } }} />
            </svg>
            <motion.p className="mt-6 pl-[0.45em] text-xs font-medium uppercase text-cream sm:text-sm"
              initial={{ opacity: 0, letterSpacing: '0.9em' }} animate={{ opacity: 1, letterSpacing: '0.45em' }}
              transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              SB Asset Finance
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
