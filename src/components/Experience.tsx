import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  scrollTriggerReady: boolean;
}

const experiences = [
  {
    company: 'Hyundai Motor India Limited',
    role: 'Data Analyst Intern',
    period: 'Aug 2026 – Present',
    description:
      'Applying data analysis techniques and collaborating with teams to extract actionable insights from automotive industry data.',
    logo: '/assets/images/experience/hyundai.jpg'
  },
  {
    company: 'ARQ REC',
    role: 'Data Analyst Associate',
    period: '2025 – Present',
    description:
      'Driving data-informed strategies through advanced analytics, reporting dashboards, and cross-functional collaboration.',
    logo: '/assets/images/experience/arq_rec_logo.jpg'
  },
  {
    company: 'Evo Astra Ventures',
    role: 'Data Science Intern',
    period: '2025 – 2026',
    description:
      'Built predictive models and automated data pipelines to support product decision-making at scale.',
    logo: '/assets/images/experience/evo_astra.png'
  },
  {
    company: 'Indian Space Academy',
    role: 'Intern Trainee',
    period: '2025 – 2026',
    description:
      'Processed and analysed satellite imagery using computer vision and geospatial analysis techniques.',
    logo: '/assets/images/experience/isa_logo.png'
  },
  {
    company: 'Medium',
    role: 'Tech Blogger',
    period: '2025 – Present',
    description:
      'Publishing in-depth articles on machine learning, data science, and modern web technologies.',
    logo: '/assets/images/experience/medium.png'
  },
];

export default function Experience({ scrollTriggerReady }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollTriggerReady || !sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.exp-tl-item', { opacity: 1, x: 0 });
      gsap.set('.exp-tl-track-fill', { scaleY: 1 });
      return;
    }

    /* Animate section title */
    const titleEl = sectionRef.current.querySelector('.s-title');
    if (titleEl) {
      const spans = titleEl.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleEl, start: 'top 88%' },
      });
    }

    /* Timeline track fill – grows as user scrolls through the section */
    gsap.to('.exp-tl-track-fill', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: 0.4,
      },
    });

    /* Stagger each timeline item in from alternate sides */
    gsap.utils.toArray<HTMLElement>('.exp-tl-item').forEach((item, i) => {
      const fromLeft = i % 2 === 0;

      gsap.fromTo(
        item,
        { opacity: 0, x: fromLeft ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );

      /* Animate the dot pulsing when it enters */
      const dot = item.querySelector('.exp-tl-dot-inner');
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      }
    });
  }, [scrollTriggerReady]);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="s-header">
        <div>
          <p className="s-label">Career Journey</p>
          <h2 className="s-title">
            <span className="tl"><span>Experience</span></span>
          </h2>
        </div>
        <span className="s-count">({String(experiences.length).padStart(2, '0')})</span>
      </div>

      <div className="exp-tl-wrap">
        {/* Central vertical track */}
        <div className="exp-tl-track" ref={timelineTrackRef}>
          <div className="exp-tl-track-fill" />
        </div>

        {/* Timeline items */}
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`exp-tl-item ${i % 2 === 0 ? 'exp-tl-left' : 'exp-tl-right'}`}
          >
            {/* Dot on the track */}
            <div className="exp-tl-dot">
              <div className="exp-tl-dot-inner" />
            </div>

            {/* Card */}
            <div className="exp-tl-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <img src={exp.logo} alt={exp.company} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'contain', backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }} />
                <div>
                  <span className="exp-tl-period" style={{ marginBottom: '4px' }}>{exp.period}</span>
                  <h3 className="exp-tl-company" style={{ marginBottom: 0 }}>{exp.company}</h3>
                </div>
              </div>
              <span className="exp-tl-role">{exp.role}</span>
              <p className="exp-tl-desc">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
