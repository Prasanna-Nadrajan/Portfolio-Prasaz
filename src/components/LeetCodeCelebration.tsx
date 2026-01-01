import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---

interface ReferenceParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

const COLORS = [
    '#00FFFF', // Cyan
    '#9D00FF', // Purple
    '#FFD700', // Gold
    '#FF0040', // Red
];

const GRAVITY = 0.15;
const FRICTION = 0.96;
const PARTICLE_COUNT = 150;

// --- Hook ---

export const useLeetCodeCelebration = () => {
    const [isActive, setIsActive] = useState(false);
    const clickCountRef = useRef(0);
    const lastClickTimeRef = useRef(0);

    const trigger = useCallback(() => {
        const now = Date.now();
        // Reset if too slow (more than 500ms between clicks)
        if (now - lastClickTimeRef.current > 500) {
            clickCountRef.current = 0;
        }

        clickCountRef.current += 1;
        lastClickTimeRef.current = now;

        if (clickCountRef.current >= 5) {
            setIsActive(true);
            clickCountRef.current = 0;
        }
    }, []);

    const closeCelebration = useCallback(() => {
        setIsActive(false);
    }, []);

    return { isActive, trigger, closeCelebration };
};

// --- Content Component ---

interface ContentProps {
    onComplete: () => void;
}

const CelebrationContent: React.FC<ContentProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const particlesRef = useRef<ReferenceParticle[]>([]);

    // Initialize Particles (Firework Burst)
    const initBurst = (width: number, height: number, x?: number, y?: number) => {
        const startX = x || width / 2;
        const startY = y || height / 2;

        const newParticles: ReferenceParticle[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 15 + 2;

            newParticles.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: Math.random() * 3 + 1
            });
        }
        return newParticles;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Initial Burst
        particlesRef.current = [
            ...initBurst(canvas.width, canvas.height, canvas.width / 2, canvas.height * 0.4)
        ];

        // Secondary bursts
        const timer1 = setTimeout(() => {
            particlesRef.current.push(...initBurst(canvas.width, canvas.height, canvas.width * 0.3, canvas.height * 0.3));
        }, 400);

        const timer2 = setTimeout(() => {
            particlesRef.current.push(...initBurst(canvas.width, canvas.height, canvas.width * 0.7, canvas.height * 0.3));
        }, 800);


        // Animation Loop
        const animate = () => {
            if (!ctx || !canvas) return;
            if (!ctx || !canvas) return;

            // Create trails by fading out the previous frame
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';

            // Update and Draw Particles
            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];

                // Physics
                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.vy += GRAVITY;
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.008; // Decay

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;

                // Use globalAlpha but preserve particle life opacity effect
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fill();
                ctx.globalAlpha = 1.0;

                // Remove dead particles
                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1);
                }
            }

            // Continue or End
            if (particlesRef.current.length > 0) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                // Animation finished
                // Wait a bit before calling onComplete to let text linger effectively?
                // Actually, if particles are gone, user just sees text.
                // Let's hold for 1 more second then trigger exit
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* 3D Floating Text */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateX: 45, y: 100 }}
                animate={{
                    scale: 1.5,
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" }
                }}
                // No exit animation here, handled by parent AnimatePresence
                className="z-10 text-center"
                style={{ perspective: "1000px" }}
            >
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] tracking-tighter"
                    style={{
                        textShadow: "0px 0px 20px rgba(0, 255, 255, 0.5), 4px 4px 0px rgba(0,0,0,0.3)"
                    }}
                >
                    LET'S BUILD<br />
                    <span className="text-8xl md:text-9xl text-white">2026</span>
                </h1>
            </motion.div>
        </>
    );
}

// --- Main Wrapper ---

interface CelebrationProps {
    isActive: boolean;
    onComplete: () => void;
}

export const LeetCodeCelebration: React.FC<CelebrationProps> = ({ isActive, onComplete }) => {
    return createPortal(
        <AnimatePresence>
            {isActive && (
                <motion.div
                    key="leetcode-celebration"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }} // Fade out entire container
                    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
                >
                    <CelebrationContent onComplete={onComplete} />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default LeetCodeCelebration;
