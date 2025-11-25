import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    
    // Use MotionValues and Springs for ultra-smooth physics-based movement
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            const isInteractive =
                target.matches('a, button, input, textarea, select, option, [role="button"]') ||
                target.closest('a, button, [role="button"]') ||
                target.closest('[data-cursor="hover"]') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* Main Cursor Container 
                mix-blend-difference ensures the cursor inverts colors based on background 
            */}
            <motion.div
                className="absolute top-0 left-0 mix-blend-difference will-change-transform"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Core "Star" - The central dot (Made larger) */}
                <motion.div
                    className="absolute bg-white rounded-full"
                    animate={{
                        width: isHovering ? 12 : 8,
                        height: isHovering ? 12 : 8,
                        x: isHovering ? -6 : -4,
                        y: isHovering ? -6 : -4,
                    }}
                    transition={{ duration: 0.2 }}
                />

                {/* Inner Gyro Ring (Thicker border and larger size) */}
                <motion.div
                    className="absolute border-[3px] border-white rounded-full opacity-100"
                    animate={{
                        width: isHovering ? 48 : 32,
                        height: isHovering ? 48 : 32,
                        x: isHovering ? -24 : -16,
                        y: isHovering ? -24 : -16,
                        rotate: isHovering ? 0 : 360, // Locks rotation on hover
                        scale: isHovering ? 1 : [1, 1.1, 1], // Pulsates when idle
                        borderRadius: isHovering ? "14px" : "50%", // Morphs to a squircle on hover
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        width: { type: "spring", stiffness: 300, damping: 20 },
                        height: { type: "spring", stiffness: 300, damping: 20 },
                        borderRadius: { duration: 0.3 }
                    }}
                />

                {/* Outer Orbital Ring (Thicker border) */}
                <motion.div
                    className="absolute border-[2px] border-white rounded-full opacity-70 border-dashed"
                    animate={{
                        width: isHovering ? 64 : 48,
                        height: isHovering ? 64 : 48,
                        x: isHovering ? -32 : -24,
                        y: isHovering ? -32 : -24,
                        rotate: isHovering ? 180 : -360,
                    }}
                    transition={{
                        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                        width: { type: "spring", stiffness: 300, damping: 20 },
                        height: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                />

                {/* Crosshair Ticks - Only visible on Hover (Thicker) */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.5,
                        rotate: isHovering ? 45 : 0
                    }}
                    style={{ width: 80, height: 80, x: -40, y: -40 }}
                >
                    {/* Four thicker ticks for better visibility */}
                    <div className="absolute top-0 w-[3px] h-4 bg-white rounded-full" />
                    <div className="absolute bottom-0 w-[3px] h-4 bg-white rounded-full" />
                    <div className="absolute left-0 h-[3px] w-4 bg-white rounded-full" />
                    <div className="absolute right-0 h-[3px] w-4 bg-white rounded-full" />
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Cursor;