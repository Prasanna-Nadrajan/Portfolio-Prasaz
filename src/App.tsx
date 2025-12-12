import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Intro from './components/Intro';

import { AchievementProvider } from './context/AchievementContext';
import HackingGame from './components/HackingGame';

const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Experience = lazy(() => import('./pages/Experience'));
const Contact = lazy(() => import('./pages/Contact'));
const Platforms = lazy(() => import('./pages/Platforms'));
const Resume = lazy(() => import('./pages/Resume'));
const GitHubWrapped = lazy(() => import('./pages/GitHubWrapped'));
const LeetCodeWrapped = lazy(() => import('./pages/LeetCodeWrapped'));
const Terminal = lazy(() => import('./pages/Terminal'));

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHack, setShowHack] = useState(false);

  useEffect(() => {
    const handleHackTrigger = () => setShowHack(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setShowHack(prev => !prev);
      }
    };

    window.addEventListener('trigger-hack', handleHackTrigger);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('trigger-hack', handleHackTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-eerie-black">
          <div className="w-12 h-12 border-4 border-jet border-t-neon-blue rounded-full animate-spin"></div>
        </div>
      }>
        <AchievementProvider>
          {showHack && <HackingGame onClose={() => setShowHack(false)} />}
          <Routes>
            {/* Standalone Route for GitHub Wrapped */}
            <Route path="/github-wrapped" element={<GitHubWrapped />} />
            <Route path="/leetcode-wrapped" element={<LeetCodeWrapped />} />

            {/* Main Application Routes */}
            <Route path="/*" element={
              showIntro ? (
                <Intro onComplete={() => setShowIntro(false)} />
              ) : (
                <Layout>
                  <AnimatePresence mode='wait'>
                    <Routes>
                      <Route path="/" element={<About />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/platforms" element={<Platforms />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/resume" element={<Resume />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/terminal" element={<Terminal />} />
                    </Routes>
                  </AnimatePresence>
                </Layout>
              )
            } />
          </Routes>
        </AchievementProvider>
      </Suspense>
    </Router>
  );
}

export default App;
