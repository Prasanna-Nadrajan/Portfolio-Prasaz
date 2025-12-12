import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchEffectProps {
    children: React.ReactNode;
    className?: string;
    trigger?: 'hover' | 'random' | 'always';
}

export default function GlitchEffect({ children, className = '', trigger = 'random' }: GlitchEffectProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (trigger !== 'random') return;

        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [trigger]);

    const variants = {
        normal: { skewX: 0, x: 0 },
        glitch: {
            skewX: [0, 20, -20, 0],
            x: [0, -2, 2, 0],
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            className={`relative inline-block ${className}`}
            animate={isGlitching || trigger === 'always' ? "glitch" : "normal"}
            variants={variants}
            whileHover={trigger === 'hover' ? "glitch" : undefined}
        >
            {children}
            <motion.div
                className="absolute top-0 left-0 w-full h-full text-red-500 opacity-50 mix-blend-screen -z-10"
                animate={isGlitching || trigger === 'always' ? { x: [-2, 2, -2], opacity: [0, 0.5, 0] } : { opacity: 0 }}
            >
                {children}
            </motion.div>
            <motion.div
                className="absolute top-0 left-0 w-full h-full text-cyan-500 opacity-50 mix-blend-screen -z-10"
                animate={isGlitching || trigger === 'always' ? { x: [2, -2, 2], opacity: [0, 0.5, 0] } : { opacity: 0 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
