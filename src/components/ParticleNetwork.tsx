import { useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────
//  Configuration
// ─────────────────────────────────────────────────────────
const CONFIG = {
  /** Base particle count at 1920px width */
  BASE_COUNT: 300,
  /** Min particle count (mobile) */
  MIN_COUNT: 35,
  /** Max particle count (ultra-wide) */
  MAX_COUNT: 320,
  /** Particle radius range */
  RADIUS_MIN: 0.2,
  RADIUS_MAX: 2,

  /** Maximum speed magnitude per axis */
  SPEED_MIN: 0.15,
  SPEED_MAX: 0.55,

  /** Distance threshold for drawing edges (squared to avoid sqrt) */
  LINK_DISTANCE: 150,
  /** Distance threshold for mouse edges (squared) */
  MOUSE_LINK_DISTANCE: 170,
  /** Repulsion radius from mouse (squared) */
  REPULSION_DISTANCE: 100,
  /** Repulsion force multiplier */
  REPULSION_FORCE: 1.6,

  /** Accent color for particles (matches --accent: #FF3D00) */
  PARTICLE_COLOR: { r: 5, g: 2, b: 255 },
  /** Secondary glow color */
  PARTICLE_GLOW_COLOR: { r: 5, g: 0, b: 255 },
  /** Line color for edges */
  LINE_COLOR: { r: 5, g: 5, b: 255 },
  /** Mouse line color (slightly different tint) */
  MOUSE_LINE_COLOR: { r: 5, g: 12, b: 255 },
} as const;

// ─────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** Base opacity for the particle dot */
  baseAlpha: number;
}

// ─────────────────────────────────────────────────────────
//  Helpers (pure, no allocations)
// ─────────────────────────────────────────────────────────
function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getParticleCount(width: number): number {
  const scaled = Math.round(CONFIG.BASE_COUNT * (width / 1920));
  return Math.max(CONFIG.MIN_COUNT, Math.min(CONFIG.MAX_COUNT, scaled));
}

function createParticle(canvasW: number, canvasH: number): Particle {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    vx: randomBetween(-CONFIG.SPEED_MAX, CONFIG.SPEED_MAX) || CONFIG.SPEED_MIN,
    vy: randomBetween(-CONFIG.SPEED_MAX, CONFIG.SPEED_MAX) || CONFIG.SPEED_MIN,
    radius: randomBetween(CONFIG.RADIUS_MIN, CONFIG.RADIUS_MAX),
    baseAlpha: randomBetween(0.15, 0.5),
  };
}

// ─────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────
export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ── State (pre-allocated, no GC pressure in loop) ──
    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let dpr = window.devicePixelRatio || 1;

    // Squared thresholds (avoid sqrt in hot loop)
    const linkDistSq = CONFIG.LINK_DISTANCE * CONFIG.LINK_DISTANCE;
    const mouseLinkDistSq = CONFIG.MOUSE_LINK_DISTANCE * CONFIG.MOUSE_LINK_DISTANCE;
    const repulsionDistSq = CONFIG.REPULSION_DISTANCE * CONFIG.REPULSION_DISTANCE;

    // ── Particles pool ──
    let particles: Particle[] = [];

    function initParticles() {
      const count = getParticleCount(width);
      particles = new Array(count);
      for (let i = 0; i < count; i++) {
        particles[i] = createParticle(width, height);
      }
    }

    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Update & Draw (single pass, zero allocations) ──
    function tick() {
      ctx!.clearRect(0, 0, width, height);

      const len = particles.length;
      const { PARTICLE_COLOR, LINE_COLOR, MOUSE_LINE_COLOR, REPULSION_FORCE } = CONFIG;

      // Update positions
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Mouse repulsion
        if (mouseActive) {
          const dxm = p.x - mouseX;
          const dym = p.y - mouseY;
          const distSqM = dxm * dxm + dym * dym;
          if (distSqM < repulsionDistSq && distSqM > 0) {
            const dist = Math.sqrt(distSqM);
            const force = (1 - dist / CONFIG.REPULSION_DISTANCE) * REPULSION_FORCE;
            p.vx += (dxm / dist) * force;
            p.vy += (dym / dist) * force;
          }
        }

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > CONFIG.SPEED_MAX * 2) {
          p.vx = (p.vx / speed) * CONFIG.SPEED_MAX;
          p.vy = (p.vy / speed) * CONFIG.SPEED_MAX;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        else if (p.x > width) { p.x = width; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        else if (p.y > height) { p.y = height; p.vy = -Math.abs(p.vy); }
      }

      // ── Draw edges (particle ↔ particle) ──
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < len; i++) {
        const a = particles[i];
        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistSq) {
            // Only now compute the real distance for opacity
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONFIG.LINK_DISTANCE) * 0.35;
            ctx!.strokeStyle = `rgba(${LINE_COLOR.r},${LINE_COLOR.g},${LINE_COLOR.b},${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // ── Draw mouse edges ──
      if (mouseActive) {
        ctx!.lineWidth = 0.6;
        for (let i = 0; i < len; i++) {
          const p = particles[i];
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseLinkDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONFIG.MOUSE_LINK_DISTANCE) * 0.5;
            ctx!.strokeStyle = `rgba(${MOUSE_LINE_COLOR.r},${MOUSE_LINE_COLOR.g},${MOUSE_LINE_COLOR.b},${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(mouseX, mouseY);
            ctx!.stroke();
          }
        }

        // Draw a subtle glow dot at mouse position
        const grad = ctx!.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 4);
        grad.addColorStop(0, `rgba(${MOUSE_LINE_COLOR.r},${MOUSE_LINE_COLOR.g},${MOUSE_LINE_COLOR.b},0.6)`);
        grad.addColorStop(1, `rgba(${MOUSE_LINE_COLOR.r},${MOUSE_LINE_COLOR.g},${MOUSE_LINE_COLOR.b},0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // ── Draw particles ──
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Outer glow (softer and larger for blur effect)
        ctx!.fillStyle = `rgba(${PARTICLE_COLOR.r},${PARTICLE_COLOR.g},${PARTICLE_COLOR.b},${p.baseAlpha * 0.4})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx!.fill();

        // Core dot (reduced alpha)
        ctx!.fillStyle = `rgba(${PARTICLE_COLOR.r},${PARTICLE_COLOR.g},${PARTICLE_COLOR.b},${p.baseAlpha * 0.7})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(tick);
    }

    // ── Event handlers ──
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    }

    function onMouseLeave() {
      mouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
    }

    function onResize() {
      resizeCanvas();
      // Redistribute particles that are now out of bounds
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.x > width) p.x = width * Math.random();
        if (p.y > height) p.y = height * Math.random();
      }
      // Adjust particle count
      const targetCount = getParticleCount(width);
      if (targetCount > particles.length) {
        for (let i = particles.length; i < targetCount; i++) {
          particles.push(createParticle(width, height));
        }
      } else if (targetCount < particles.length) {
        particles.length = targetCount;
      }
    }

    // ── Init ──
    resizeCanvas();
    initParticles();
    animId = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-network"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        filter: 'blur(1.5px)',
        opacity: 0.65,
      }}
      aria-hidden="true"
    />
  );
}
