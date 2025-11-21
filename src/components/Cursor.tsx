import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the hovered element is interactive
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover') ||
                // Add inputs and labels for better form UX
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'LABEL'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Dot - The precise pointer */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-neon-blue rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_var(--neon-blue)]"
                animate={{
                    x: mousePosition.x - 6, // Center the 12px dot (radius 6)
                    y: mousePosition.y - 6,
                    scale: isHovering ? 0.5 : 1, // Shrink slightly on hover for precision feeling
                }}
                transition={{
                    type: 'tween', // Use tween for instant follow (no lag)
                    ease: 'linear',
                    duration: 0
                }}
            />

            {/* Following Ring - The "Super" fluid effect */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-neon-blue rounded-full pointer-events-none z-[100] opacity-60"
                animate={{
                    x: mousePosition.x - 16, // Center the 32px ring (radius 16)
                    y: mousePosition.y - 16,
                    scale: isHovering ? 2.5 : 1, // Expand significantly on hover
                    opacity: isHovering ? 0.8 : 0.4,
                    backgroundColor: isHovering ? 'rgba(0, 191, 255, 0.1)' : 'transparent', // Subtle fill on hover
                }}
                transition={{
                    type: 'spring', // Spring physics for that "magnetic" lag feel
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8
                }}
            />
        </>
    );
};

export default Cursor;