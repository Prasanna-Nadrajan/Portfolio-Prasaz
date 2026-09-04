import { useEffect, useRef, useState } from 'react';
import FooterNetworkGlobe from './FooterNetworkGlobe';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  scrollTriggerReady: boolean;
}

// Increment and retrieve a persistent local view count.
// Also attempts an external free counter (counterapi.dev v2 public test endpoint)
// as a best-effort real counter, falling back to the local value on any error.
const LOCAL_COUNT_KEY = 'prasaz_portfolio_views';

function getAndIncrementLocalCount(): number {
  const stored = localStorage.getItem(LOCAL_COUNT_KEY);
  let base = stored ? parseInt(stored, 10) : 1700; // seed at 1700
  
  // If the user already had a smaller number in their local storage from earlier,
  // force it up to our new baseline.
  if (isNaN(base) || base < 1700) {
    base = 1700;
  }
  
  const next = base + 1;
  localStorage.setItem(LOCAL_COUNT_KEY, String(next));
  return next;
}

export default function Contact({ scrollTriggerReady }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      // Increment local counter first so it's always available
      const localCount = getAndIncrementLocalCount();

      try {
        // CounterAPI v2 — uses a public "test" workspace that doesn't need auth,
        // scoped to a unique counter name so it acts as a real shared counter.
        const res = await fetch(
          'https://api.counterapi.dev/v2/prasaz-portfolio/page-views/up',
          { method: 'GET' }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // v2 returns { count: number }
        const count = typeof data.count === 'number' ? data.count + 1700 : null;
        setViewCount(count ?? localCount);
      } catch (err) {
        console.warn('Counter API unavailable, using local count:', err);
        setViewCount(localCount);
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

      <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0 40px 0', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', height: '350px', background: 'var(--accent)', filter: 'blur(160px)', opacity: 0.12, pointerEvents: 'none' }}></div>

        <h2 style={{ fontSize: 'clamp(40px, 12vw, 160px)', fontWeight: 800, fontFamily: '"Blanka", sans-serif', letterSpacing: '0.04em', margin: '16px 0 32px 0', color: 'var(--fg)', opacity: 0.95, lineHeight: 1, textShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>PRASAZ</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: '24px', zIndex: 1 }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, fontWeight: 500, letterSpacing: '0.02em' }}>© 2026 All Rights Reserved</p>

          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', animation: 'blink 2.2s ease infinite' }}></span>
            Page Views
            <span ref={countRef} style={{ fontWeight: 800, fontSize: '18px', color: 'var(--fg)', margin: '0 4px', fontVariantNumeric: 'tabular-nums' }}>{viewCount !== null ? viewCount : '...'}</span>
          </p>

          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, cursor: 'none', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
      <FooterNetworkGlobe />
    </section>
  );
}
