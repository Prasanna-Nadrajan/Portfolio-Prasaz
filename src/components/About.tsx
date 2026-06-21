import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  scrollTriggerReady: boolean;
}

export default function About({ scrollTriggerReady }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!scrollTriggerReady) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.about-bio p, .about-side > div, .about-bio .cv-btn', { opacity: 1, y: 0 });
      return;
    }

    const titleEl = sectionRef.current?.querySelector('.s-title');
    if (titleEl) {
      const spans = titleEl.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: titleEl, start: 'top 88%' }
      });
    }

    gsap.utils.toArray('.about-bio p').forEach((el: any, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.65, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });

    gsap.to('.about-bio .cv-btn', {
      opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-bio .cv-btn', start: 'top 92%' }
    });

    gsap.utils.toArray('.about-side > div').forEach((el: any, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });
  }, [scrollTriggerReady]);

  return (
    <section id="about" ref={sectionRef}>
      <div className="s-header">
        <div>
          <p className="s-label">My story</p>
          <h2 className="s-title">
            <span className="tl"><span>About</span></span>
          </h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-bio">
          <p>
            <strong>Data Scientist and Frontend Engineer</strong>, passionate about building intelligent systems and engaging user interfaces. I bridge the gap between machine learning algorithms and user experience.
          </p>
          <p>
            <strong>My process is data-driven.</strong> Whether I'm analyzing satellite imagery or optimizing a frontend component, I rely on solid statistical foundations and clean code.
          </p>
          <p>
            <strong>Active community member.</strong> I volunteer with the Chennai Data Circle and regularly write technical articles on Medium to share my knowledge on data science and machine learning.
          </p>
          
          <a href="#" target="_blank" rel="noopener" className="cv-btn" style={{ marginTop: '20px', opacity: 0, transform: 'translateY(16px)' }}>
            View Resume
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12L12 2M12 2H4M12 2V10"></path>
            </svg>
          </a>
        </div>

        <div className="about-side">
          <div>
            <h3 className="detail-h">Education</h3>
            <ul className="awards-list">
              <li className="award-item">
                <div className="aw-l">
                  <span className="aw-title">Rajalakshmi Engineering College</span>
                  <span className="aw-issuer">Undergraduate Student</span>
                </div>
                <span className="aw-yr">2024 - Present</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="detail-h">Volunteering</h3>
            <ul className="awards-list">
              <li className="award-item">
                <div className="aw-l">
                  <span className="aw-title">Chennai Data Circle</span>
                  <span className="aw-issuer">Active Member</span>
                </div>
                <span className="aw-yr">2026 - Present</span>
              </li>
              <li className="award-item">
                <div className="aw-l">
                  <span className="aw-title">CII Connect 2024</span>
                  <span className="aw-issuer">Volunteer</span>
                </div>
                <span className="aw-yr">2024</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="detail-h">Skills</h3>
            <div className="skills-row">
              <span className="skill-pill">Python</span>
              <span className="skill-pill">Machine Learning</span>
              <span className="skill-pill">React</span>
              <span className="skill-pill">TypeScript</span>
              <span className="skill-pill">TensorFlow</span>
              <span className="skill-pill">SQL</span>
              <span className="skill-pill">Data Visualization</span>
              <span className="skill-pill">Power BI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
