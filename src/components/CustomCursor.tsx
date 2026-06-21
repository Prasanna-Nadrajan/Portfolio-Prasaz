import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('Guest');

  useEffect(() => {
    // Hide cursor on touch devices by default logic in css, but JS can also check
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursorEl = cursorRef.current;
    const glowEl = glowRef.current;
    if (!cursorEl || !glowEl) return;

    const onMouseMove = (e: MouseEvent) => {
      // transform: translate
      cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorEl.style.opacity = '1';

      // smooth magnetic glow
      gsap.to(glowEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power3.out',
        opacity: 1
      });
    };

    const onMouseLeave = () => {
      cursorEl.style.opacity = '0';
      gsap.to(glowEl, { opacity: 0, duration: 0.5 });
    };

    const onMouseEnter = () => {
      cursorEl.style.opacity = '1';
      gsap.to(glowEl, { opacity: 1, duration: 0.5 });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const interactiveSelectors = 'a, button, .pcard:not(.pcard--wip), [data-cursor]';
    
    const onTargetEnter = (e: Event) => {
      document.body.classList.add('is-hovering');
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.dataset.cursor;
      
      if (cursorText) {
        gsap.to('#cursorLabelText', { opacity: 0, duration: 0.12, onComplete: () => {
          setText(cursorText === 'hi' ? 'Say hi! 👋' : cursorText);
          gsap.to('#cursorLabelText', { opacity: 1, duration: 0.12 });
        }});
      }
      
      // intensify glow on hover
      gsap.to(glowEl, { scale: 1.5, duration: 0.4, ease: 'power2.out' });
    };

    const onTargetLeave = () => {
      document.body.classList.remove('is-hovering');
      if (text !== 'Guest') {
        gsap.to('#cursorLabelText', { opacity: 0, duration: 0.12, onComplete: () => {
          setText('Guest');
          gsap.to('#cursorLabelText', { opacity: 1, duration: 0.12 });
        }});
      }

      // reset glow
      gsap.to(glowEl, { scale: 1, duration: 0.4, ease: 'power2.out' });
    };

    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', onTargetEnter);
        el.addEventListener('mouseleave', onTargetLeave);
      });
    };

    // Use timeout to make sure elements are mounted
    setTimeout(addHoverListeners, 100);

    // Observer to re-attach if dom changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener('mouseenter', onTargetEnter);
        el.removeEventListener('mouseleave', onTargetLeave);
        el.addEventListener('mouseenter', onTargetEnter);
        el.addEventListener('mouseleave', onTargetLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
    };
  }, [text]);

  return (
    <>
      <div 
        ref={glowRef}
        aria-hidden="true"
        className="liquid-glow"
      />
      
      <div className="cursor" id="cursor" aria-hidden="true" ref={cursorRef}>
        <div className="cursor-arrow">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 2L2 21L6.8 16.2L10.4 24L13.4 22.6L9.8 14.8L17 14.8L2 2Z"
              fill="white"
              stroke="#0C0C0B"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="cursor-label" id="cursorLabel">
          <span className="cursor-label-dot"></span>
          <span id="cursorLabelText">{text}</span>
        </div>
      </div>
    </>
  );
}
