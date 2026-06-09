import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlatformsProps {
  scrollTriggerReady: boolean;
}

export default function Platforms({ scrollTriggerReady }: PlatformsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!scrollTriggerReady) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.plat-card', { opacity: 1, y: 0 });
      return;
    }

    gsap.set('.plat-card', { opacity: 0, y: 40 });

    const el = sectionRef.current?.querySelector('.s-title');
    if (el) {
      const spans = el.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    }

    gsap.utils.toArray('.plat-card').forEach((card: any, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });
  }, [scrollTriggerReady]);

  return (
    <section id="platforms" ref={sectionRef} style={{ padding: '120px 44px' }}>
      <div className="s-header">
        <div>
          <p className="s-label">My Coding Activity</p>
          <h2 className="s-title">
            <span className="tl"><span>Platforms</span></span>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

        {/* GitHub */}
        <div className="plat-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'border-color 0.4s ease' }}>
          <div>
            <h3 className="pname" style={{ fontSize: '24px' }}>GitHub</h3>
            <p className="pyear">Contributions & Stats</p>
          </div>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img 
              src="https://github-readme-stats.vercel.app/api?username=Prasanna-Nadrajan&theme=transparent&hide_border=true&title_color=ffffff&text_color=999999&icon_color=FF3D00&hide_title=true&hide_rank=true" 
              alt="GitHub Stats" 
              style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} 
            />
            <img
              src="https://ghchart.rshah.org/FF3D00/Prasanna-Nadrajan"
              alt="GitHub Contributions"
              style={{ width: '100%', filter: 'hue-rotate(340deg)' }}
            />
          </div>
        </div>

        {/* LeetCode */}
        <div className="plat-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'border-color 0.4s ease' }}>
          <div>
            <h3 className="pname" style={{ fontSize: '24px' }}>LeetCode</h3>
            <p className="pyear">Problem Solving</p>
          </div>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://leetcard.jacoblin.cool/Prasanna_Nadrajan?theme=dark&font=Syne&ext=heatmap"
              alt="LeetCode Stats"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
