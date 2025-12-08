import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Use raw motion values for instant tracking (normal desktop speed)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
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
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
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
                    className="rounded-full bg-[var(--cursor-color)]"
                    animate={{
                        width: isHovering ? 24 : 10,
                        height: isHovering ? 24 : 10,
                        opacity: isHovering ? 0.8 : 1,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Cursor;