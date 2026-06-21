import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogProps {
  scrollTriggerReady: boolean;
}

interface Article {
  title: string;
  link: string;
  thumbnail: string;
  categories: string[];
  description: string;
}

export default function Blog({ scrollTriggerReady }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@prasaznat')
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          const formatted = data.items.slice(0, 3).map((item: any) => {
            let img = item.thumbnail;
            if (!img || img.indexOf('stat?event') > -1) {
              const match = item.content.match(/<img[^>]+src="([^">]+)"/);
              if (match) img = match[1];
            }
            let desc = item.description.replace(/<[^>]+>/g, ' ').trim().substring(0, 120) + '...';
            return {
              title: item.title,
              link: item.link,
              thumbnail: img,
              categories: item.categories || [],
              description: desc
            };
          });
          setArticles(formatted);
        }
      })
      .catch(err => console.error("Error fetching Medium RSS:", err));
  }, []);

  useGSAP(() => {
    if (!scrollTriggerReady) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.blog-card', { opacity: 1, y: 0 });
      return;
    }

    gsap.set('.blog-card', { opacity: 0, y: 40 });

    const el = sectionRef.current?.querySelector('.s-title');
    if (el) {
      const spans = el.querySelectorAll('.tl span');
      gsap.to(spans, {
        y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    }

    if (articles.length > 0) {
      gsap.utils.toArray('.blog-card').forEach((card: any, i) => {
        gsap.to(card, {
          opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%' }
        });
      });
      ScrollTrigger.refresh();
    }
  }, [scrollTriggerReady, articles]);

  return (
    <section id="blog" ref={sectionRef} style={{ padding: '120px 44px' }}>
      <div className="s-header">
        <div>
          <p className="s-label">Writing & Thoughts</p>
          <h2 className="s-title">
            <span className="tl"><span>Blog</span></span>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px' }}>
        
        {articles.map((article, index) => (
          <a key={index} href={article.link} target="_blank" rel="noreferrer" className="blog-card" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0', display: 'flex', flexDirection: 'column', transition: 'border-color 0.4s ease, transform 0.4s ease', cursor: 'none', overflow: 'hidden' }} 
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
          >
            {article.thumbnail && (
              <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                {article.categories.slice(0, 2).join(' / ')}
              </span>
              <h3 className="pname" style={{ fontSize: '24px' }}>{article.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>{article.description}</p>
              <span style={{ fontSize: '11px', color: 'var(--accent)', marginTop: 'auto', paddingTop: '16px', fontWeight: 600 }}>Read on Medium →</span>
            </div>
          </a>
        ))}

        {articles.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Loading articles...</p>
        )}

      </div>

      <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'center' }}>
        <a href="https://medium.com/@prasaznat" target="_blank" rel="noreferrer" className="cv-btn">
          View all on Medium
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d="M1 11L11 1M11 1H3.5M11 1V8.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
