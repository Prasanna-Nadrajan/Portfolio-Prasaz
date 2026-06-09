import { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Platforms from './components/Platforms';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <>
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
            <Marquee />
            <Work scrollTriggerReady={preloaderComplete} />
            <Platforms scrollTriggerReady={preloaderComplete} />
            <Blog scrollTriggerReady={preloaderComplete} />
            <About scrollTriggerReady={preloaderComplete} />
            <Contact scrollTriggerReady={preloaderComplete} />
          </main>
        </>
      )}
    </>
  );
}
