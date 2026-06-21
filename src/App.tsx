import { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ParticleNetwork from './components/ParticleNetwork';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillMap from './components/SkillMap';
import Work from './components/Work';
import Platforms from './components/Platforms';
import Blog from './components/Blog';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <>
      <ParticleNetwork />
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      
      {/* 
        We only want to render the main content after preloader finishes
        to avoid premature ScrollTrigger calculations and ensure smooth hero intro.
      */}
      {preloaderComplete && (
        <>
          <Navbar />
          <main>
            <Hero heroInTrigger={preloaderComplete} />
            <About scrollTriggerReady={preloaderComplete} />
            <Experience scrollTriggerReady={preloaderComplete} />
            <SkillMap scrollTriggerReady={preloaderComplete} />
            <Work scrollTriggerReady={preloaderComplete} />
            <Platforms scrollTriggerReady={preloaderComplete} />
            <Blog scrollTriggerReady={preloaderComplete} />
            <Contact scrollTriggerReady={preloaderComplete} />
          </main>
        </>
      )}
    </>
  );
}
