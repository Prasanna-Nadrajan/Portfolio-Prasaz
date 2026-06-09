
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  heroInTrigger: boolean;
}

export default function Hero({ heroInTrigger }: HeroProps) {
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

    gsap.to('.scroll-hint', { opacity: 1, duration: 0.6, delay: 1.2 });
  }, [heroInTrigger]);

  return (
    <section id="hero">
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
