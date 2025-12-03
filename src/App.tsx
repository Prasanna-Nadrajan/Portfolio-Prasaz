import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Intro from './components/Intro';

const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Experience = lazy(() => import('./pages/Experience'));
const Contact = lazy(() => import('./pages/Contact'));
const Platforms = lazy(() => import('./pages/Platforms'));
const Resume = lazy(() => import('./pages/Resume'));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <Layout>
          <AnimatePresence mode='wait'>
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-eerie-black">
                <div className="w-12 h-12 border-4 border-jet border-t-neon-blue rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/platforms" element={<Platforms />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </Layout>
      )}
    </Router>
  );
}

export default App;