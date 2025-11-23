import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Intro from './components/Intro';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Platforms from './pages/Platforms';
import Resume from './pages/Resume';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      {showIntro ? (
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
            </Routes>
          </AnimatePresence>
        </Layout>
      )}
    </Router>
  );
}

export default App;