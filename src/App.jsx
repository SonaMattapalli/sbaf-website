import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { IntroProvider } from './components/Intro';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Grievance from './pages/Grievance';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/grievance-redressal" element={<Grievance />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntroProvider>
    </MotionConfig>
  );
}
