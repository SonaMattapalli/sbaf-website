import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { IntroProvider } from './components/Intro';
import Layout from './components/Layout';
import Home from './pages/Home';
import { PAGES } from './routes';

export default function App() {
  return (
    // `m` components + LazyMotion load only the animation features the site uses (a much smaller bundle).
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              {Object.entries(PAGES).map(([path, Page]) => <Route key={path} path={path} element={<Page />} />)}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntroProvider>
    </MotionConfig>
    </LazyMotion>
  );
}
