import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(() => {
    if (sessionStorage.getItem('prasaz_visited')) {
      setIsVisible(false);
      onComplete();
      return;
    }

    sessionStorage.setItem('prasaz_visited', '1');
    
    gsap.to('.pl-name span', { y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    setTimeout(() => { 
      const bar = document.getElementById('plBar');
      if(bar) bar.style.width = '100%'; 
    }, 150);
    
    setTimeout(() => {
      gsap.to('#preloader', {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        }
      });
    }, 1300);
  }, { dependencies: [] });

  if (!isVisible) return null;

  return (
    <div id="preloader" aria-hidden="true">
      <div className="pl-name">
        <span>Prasanna Nadrajan</span>
      </div>
      <div className="pl-bar-wrap">
        <div className="pl-bar" id="plBar"></div>
      </div>
    </div>
  );
}
