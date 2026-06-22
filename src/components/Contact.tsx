import { useEffect, useRef, useState } from 'react';
import FooterNetworkGlobe from './FooterNetworkGlobe';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  scrollTriggerReady: boolean;
}

export default function Contact({ scrollTriggerReady }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const namespace = "portfolio-prasanna-nadrajan";
        const key = "visits";
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setViewCount(data.count);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        setViewCount(400); // Default fallback matching previous behavior
      }
    };

    fetchCount();
  }, []);

  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (viewCount === null || !countRef.current || !scrollTriggerReady) return;

    gsap.fromTo(countRef.current,
      { innerText: 0 },
      {
        innerText: viewCount,
        duration: 3,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: countRef.current,
          start: "top 95%"
        }
      }
    );
  }, [viewCount, scrollTriggerReady]);

  useGSAP(() => {
    if (!scrollTriggerReady) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.contact-headline .tl span, .contact-footer', { opacity: 1, y: 0, transform: 'none' });
      return;
    }

    gsap.utils.toArray('.contact-headline .tl span').forEach((el: any, i) => {
      gsap.fromTo(el,
        { y: '110%' },
        {
          y: '0%', duration: 0.9, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });

    gsap.fromTo('.contact-footer',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-footer', start: 'top 90%' }
      }
    );
  }, [scrollTriggerReady]);

  const copyEmail = () => {
    navigator.clipboard.writeText('prasannanadrajan@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <p className="s-label">Get in touch</p>

      <div className="contact-headline">
        <span className="tl"><span>Say hi!</span></span>
        <span className="tl">
          <span>
            <a href="mailto:prasannanadrajan@gmail.com" data-cursor="hi">
              Let's talk <svg width="0.7em" height="0.7em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '0.12em' }}>
                <path d="M3 15L15 3M15 3H5M15 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </span>
        </span>
      </div>

      <div className="contact-footer" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <div className="cf-left">
          <div className="cf-email-row">
            <p>prasannanadrajan@gmail.com</p>
            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyEmail} aria-label="Copy email address">
              {copied ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l3.5 3.5L11 3" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4.5" y="4.5" width="7" height="7" rx="1.2"></rect>
                  <path d="M1.5 8.5V2.5a1 1 0 0 1 1-1h6"></path>
                </svg>
              )}
            </button>
          </div>
          <p>Chennai, India</p>
        </div>
        <div className="cf-right">
          <a href="mailto:prasannanadrajan@gmail.com" data-cursor="hi">Email</a>
          <a href="https://linkedin.com/in/prasannanadrajan" target="_blank" rel="noopener noreferrer" data-cursor="hi">LinkedIn</a>
          <a href="https://github.com/Prasanna-Nadrajan" target="_blank" rel="noopener noreferrer" data-cursor="hi">GitHub</a>
          <a href="https://medium.com/@prasaznat" target="_blank" rel="noopener noreferrer" data-cursor="hi">Medium</a>
        </div>
      </div>

      <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0 60px 0', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '300px', background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }}></div>

        <h2 style={{ fontSize: 'clamp(40px, 15vw, 180px)', fontWeight: 800, fontFamily: '"Blanka", sans-serif', letterSpacing: '0.04em', margin: '16px 0px 16px 0px', color: 'var(--text)', opacity: 0.9, lineHeight: 1, padding: '100px' }}>PRASAZ</h2>
        {/* <p style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '80px', fontWeight: 600 }}>Data Scientist | Pre-Final Year | Undergrad</p> */}

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: '24px', zIndex: 1 }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>© 2026 All Rights Reserved</p>

          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--border)' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></span>
            Page Views: <span ref={countRef} style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text)', margin: '0 4px' }}>{viewCount !== null ? viewCount : '...'}</span>
          </p>

          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>
            Back to top ↑
          </button>
        </div>
      </div>
      <FooterNetworkGlobe />
    </section>
  );
}
