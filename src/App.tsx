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
const GitHubWrapped = lazy(() => import('./pages/GitHubWrapped'));
const LinkedInWrapped = lazy(() => import('./pages/LinkedInWrapped'));
const LeetCodeWrapped = lazy(() => import('./pages/LeetCodeWrapped'));
const Terminal = lazy(() => import('./pages/Terminal'));

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has already been shown in this session
    return !sessionStorage.getItem('introShown');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introShown', 'true');
  };

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-eerie-black">
          <div className="w-12 h-12 border-4 border-jet border-t-neon-blue rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          {/* Standalone Route for GitHub Wrapped */}
          <Route path="/github-wrapped" element={<GitHubWrapped />} />
          <Route path="/linkedin-wrapped" element={<LinkedInWrapped />} />
          <Route path="/leetcode-wrapped" element={<LeetCodeWrapped />} />

          {/* Main Application Routes */}
          <Route path="/*" element={
            showIntro ? (
              <Intro onComplete={handleIntroComplete} />
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
      </Suspense>
    </Router>
  );
}

export default App;
