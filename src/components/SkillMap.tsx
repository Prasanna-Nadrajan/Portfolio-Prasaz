import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: "AI & ML",
    skills: [
      { name: "PYTHON", icon: "P" },
      { name: "MACHINE LEARNING", icon: "ML" },
      { name: "DEEP LEARNING", icon: "DL" },
      { name: "TENSORFLOW", icon: "TF" },
      { name: "COMPUTER VISION", icon: "CV" },
      { name: "STATISTICS", icon: "ST" }
    ]
  },
  {
    category: "DATA",
    skills: [
      { name: "SQL", icon: "SQL" },
      { name: "POWER BI", icon: "PB" },
      { name: "DATA VIZ", icon: "DV" },
      { name: "PANDAS", icon: "PD" },
      { name: "NUMPY", icon: "NP" }
    ]
  },
  {
    category: "WEB DEV",
    skills: [
      { name: "REACT", icon: "R" },
      { name: "TYPESCRIPT", icon: "TS" },
      { name: "HTML", icon: "H" },
      { name: "CSS", icon: "C" },
      { name: "NODE.JS", icon: "N" }
    ]
  },
  {
    category: "TOOLS",
    skills: [
      { name: "GIT", icon: "G" },
      { name: "DOCKER", icon: "D" },
      { name: "LINUX", icon: "L" },
      { name: "AWS", icon: "A" }
    ]
  }
];

export default function SkillMap({ scrollTriggerReady = true }: { scrollTriggerReady?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!scrollTriggerReady || !sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.s-title .tl span', { y: 0 });
      gsap.set('.skill-map-desc', { opacity: 1, y: 0 });
      gsap.set('.st-skill-card', { opacity: 1, y: 0 });
      return;
    }

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

    gsap.fromTo(
      '.skill-map-desc',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skill-map-desc', start: 'top 90%' },
      }
    );

    gsap.fromTo(
      '.st-skill-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-tree', start: 'top 80%' }
      }
    );
  }, [scrollTriggerReady]);

  return (
    <section className="skill-map-section" id="skills" ref={sectionRef}>
      <div className="skill-map-container">
        <div className="s-header">
          <div>
            <div className="s-label">Technical Expertise</div>
            <h2 className="s-title">
              <span className="tl"><span>Skills</span></span>
            </h2>
          </div>
        </div>
        <p className="skill-map-desc" style={{ textAlign: 'left', marginBottom: '40px' }}>
          A comprehensive map of my technical expertise across multiple disciplines.
        </p>
        
        <div className="skills-tree">
          <div className="st-tree-head">
            <div className="st-head-pill">CORE EXPERTISE</div>
          </div>
          <div className="st-stem"></div>
          
          <div className="st-categories">
            {skillCategories.map((cat, i) => (
              <div key={i} className="st-category-col">
                <div className="st-connector">
                  <div className="st-dot"></div>
                  <div className="st-line-v-cat"></div>
                </div>
                
                <div className="st-cat-pill">{cat.category}</div>
                
                <div className="st-items-grid">
                  {cat.skills.map((skill, j) => (
                    <div key={j} className="st-skill-card">
                      <div className="st-skill-icon">{skill.icon}</div>
                      <div className="st-skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
