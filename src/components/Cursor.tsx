import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Trailing outer frame with spring physics
    const trailX = useSpring(cursorX, { damping: 20, stiffness: 180, mass: 0.6 });
    const trailY = useSpring(cursorY, { damping: 20, stiffness: 180, mass: 0.6 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.matches('a, button, input, textarea, select, option, [role="button"], [data-cursor="hover"]') ||
                target.closest('a, button, [role="button"], [data-cursor="hover"]') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* Outer trailing square frame */}
            <motion.div
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 48 : isClicking ? 20 : 32,
                        height: isHovering ? 48 : isClicking ? 20 : 32,
                        rotate: isHovering ? 45 : isClicking ? 15 : 0,
                        borderRadius: isHovering ? "12px" : isClicking ? "2px" : "4px",
                        opacity: isHovering ? 0.8 : 0.4,
                        borderColor: isHovering
                            ? "var(--neon-blue)"
                            : "var(--cursor-color)",
                    }}
                    transition={{
                        duration: 0.25,
                        ease: "easeOut",
                    }}
                    style={{
                        border: "1.5px solid var(--cursor-color)",
                        mixBlendMode: "difference",
                    }}
                />
            </motion.div>

            {/* Inner square dot — instant tracking */}
            <motion.div
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 6 : isClicking ? 4 : 6,
                        height: isHovering ? 6 : isClicking ? 4 : 6,
                        rotate: isHovering ? -45 : 0,
                        borderRadius: isHovering ? "1px" : "1px",
                        backgroundColor: isHovering
                            ? "var(--neon-blue)"
                            : "var(--cursor-color)",
                        boxShadow: isHovering
                            ? "0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue)"
                            : "none",
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Cursor;