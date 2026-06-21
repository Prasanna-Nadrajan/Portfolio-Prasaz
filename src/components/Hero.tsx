import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NetworkGlobe from './NetworkGlobe';

interface HeroProps {
  heroInTrigger: boolean;
}

export default function Hero({ heroInTrigger }: HeroProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!heroInTrigger) return;

    gsap.set('.nav-logo', { opacity: 0 });
    gsap.set('.nav-right', { opacity: 0 });
    gsap.set('.pill', { opacity: 0, x: 32 });

    gsap.to(['.nav-logo', '.nav-right'], {
      opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out'
    });

    gsap.to('.hero-title .tl span', {
      y: 0, duration: 1.05, stagger: 0.1, ease: 'power3.out', delay: 0.05
    });

    gsap.to('.hero-eyebrow span', {
      y: 0, duration: 0.75, ease: 'power3.out', delay: 0.5
    });

    gsap.set('.hero-desc', { opacity: 0, y: 16 });
    gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.65 });

    gsap.to('.pill', {
      x: 0, opacity: 1, duration: 0.55, stagger: 0.1,
      ease: 'power2.out', delay: 0.75
    });

    gsap.to(['.scroll-hint', '.top-scroll-hint'], { opacity: 1, duration: 0.6, delay: 1.2 });

    // Floating parallax effect for image
    const onMouseMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const { clientX, clientY } = e;

      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(imgRef.current, {
        x: x,
        y: y,
        duration: 1.2,
        ease: 'power2.out'
      });
    };

    // Add subtle continuous floating animation
    gsap.to(imgRef.current, {
      y: '-=15',
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    gsap.fromTo('.hero-image-wrapper',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 1.0 }
    );

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [heroInTrigger]);

  return (
    <section id="hero" style={{ position: 'relative' }}>
      <NetworkGlobe />
      
      <div className="top-scroll-hint" aria-hidden="true">
        <span className="ts-text">Scroll down for more info</span>
        <svg className="ts-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

      <div className="hero-image-wrapper">
        <img
          ref={imgRef}
          src="/assets/images/portfolio_image_2.jpeg"
          alt="Prasanna Nadrajan"
          className="hero-image"
          data-cursor="prasanna"
        />
      </div>

      <p className="hero-eyebrow">
        <span>Data Scientist | Pre-Final Year | AI&DS Undergrad</span>
      </p>

      <h1 className="hero-title">
        <span className="tl"><span>Prasanna</span></span>
        <span className="tl"><span>Nadrajan R.</span></span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-desc">
          <span>
            Passionate Data Scientist and Frontend Engineer. Transforming data into actionable insights and building beautiful, responsive web experiences.
          </span>
        </p>
        <div className="hero-right">
          <div className="pill available">
            <span className="pill-dot"></span>Available for work
          </div>
          <div className="pill">Chennai, India</div>
          <div className="pill">Tech Blogger @ Medium</div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="sh-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
