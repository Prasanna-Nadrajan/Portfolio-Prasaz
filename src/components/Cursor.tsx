import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    
    // Primary cursor (tracks mouse quickly)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Secondary cursor (delayed trail)
    const secondaryX = useMotionValue(-100);
    const secondaryY = useMotionValue(-100);
    
    // Optimized Spring Configs
    // Primary: Faster, tighter follow (less damping, higher stiffness)
    const primarySpringConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    
    // Secondary: Slower, looser trail (higher damping, lower stiffness)
    const secondarySpringConfig = { damping: 40, stiffness: 150, mass: 0.2 };

    const primaryXSpring = useSpring(cursorX, primarySpringConfig);
    const primaryYSpring = useSpring(cursorY, primarySpringConfig);
    
    const secondaryXSpring = useSpring(secondaryX, secondarySpringConfig);
    const secondaryYSpring = useSpring(secondaryY, secondarySpringConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Update raw motion values
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            secondaryX.set(e.clientX);
            secondaryY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements using standard pointers and data attributes
            const isInteractive =
                target.matches('a, button, input, textarea, select, option, [role="button"], [data-cursor="hover"]') ||
                target.closest('a, button, [role="button"], [data-cursor="hover"]') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, secondaryX, secondaryY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* Secondary Cursor (Delayed Trail) - Minimalist Ring */}
            <motion.div
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    x: secondaryXSpring,
                    y: secondaryYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="absolute rounded-full border-[2px] border-[var(--cursor-color)] opacity-70"
                    animate={{
                        width: isHovering ? 40 : 20,
                        height: isHovering ? 40 : 20,
                        x: isHovering ? -20 : -10,
                        y: isHovering ? -20 : -10,
                        opacity: isHovering ? 0.9 : 0.4,
                        scale: isHovering ? 1.5 : 1,
                        // Spin effect when idle, held stationary on hover
                        rotate: isHovering ? 0 : 360,
                    }}
                    transition={{
                        // Slower animation for the trailing effect
                        scale: { duration: 0.3 },
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        width: { type: "spring", stiffness: 300, damping: 20 },
                        height: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                />
            </motion.div>
            
            {/* Primary Cursor (The "Star" - Fastest Response) */}
            <motion.div
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    x: primaryXSpring,
                    y: primaryYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="absolute rounded-full bg-[var(--cursor-color)]"
                    animate={{
                        width: isHovering ? 20 : 6,
                        height: isHovering ? 20 : 6,
                        x: isHovering ? -10 : -3,
                        y: isHovering ? -10 : -3,
                        opacity: isHovering ? 0 : 1, // Disappear or shrink/fade when secondary indicator is active
                        backgroundColor: isHovering ? 'transparent' : 'var(--cursor-color)'
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
            
        </div>
    );
};

export default Cursor;