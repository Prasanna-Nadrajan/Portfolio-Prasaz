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
            
            // Expanded interactive detection using explicit attributes
            const isInteractive = 
                // 1. Explicit data attribute (most robust)
                target.closest('[data-cursor="hover"]') ||
                // 2. Standard interactive tags
                target.matches('a, button, input, textarea, label, select, option') ||
                target.closest('a, button, [role="button"]') ||
                // 3. Tailwind class check (fallback)
                target.closest('.cursor-pointer');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
            {/* 1. Precision Center Dot (Diamond) */}
            <motion.div
                className="absolute w-2 h-2 bg-neon-blue mix-blend-screen"
                style={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    rotate: 45,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? '#ffffff' : 'var(--neon-blue)',
                }}
                transition={{ duration: 0.1 }}
            />

            {/* 2. Inner Rotating Data Ring */}
            <motion.div
                className="absolute w-8 h-8 border border-dashed rounded-full opacity-60"
                style={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    borderColor: 'var(--neon-blue)',
                }}
                animate={{
                    rotate: 360,
                    scale: isHovering ? 1.8 : 1,
                    borderStyle: isHovering ? 'solid' : 'dashed',
                    borderWidth: isHovering ? '2px' : '1px',
                    opacity: isHovering ? 0.8 : 0.4,
                }}
                transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    default: { type: 'spring', stiffness: 500, damping: 25 }
                }}
            />

            {/* 3. Outer "Target Lock" Brackets - Active State */}
            <motion.div
                className="absolute w-12 h-12"
                style={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                }}
                animate={{
                    rotate: isHovering ? 90 : 0,
                    scale: isHovering ? 1.2 : 1,
                    opacity: isHovering ? 1 : 0, // Only visible on hover
                }}
                transition={{
                    type: 'spring', stiffness: 300, damping: 20
                }}
            >
                <motion.div 
                    className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-blue rounded-tl-sm"
                    animate={{ x: isHovering ? -4 : 0, y: isHovering ? -4 : 0 }}
                />
                <motion.div 
                    className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-blue rounded-tr-sm"
                    animate={{ x: isHovering ? 4 : 0, y: isHovering ? -4 : 0 }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-blue rounded-bl-sm"
                    animate={{ x: isHovering ? -4 : 0, y: isHovering ? 4 : 0 }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-blue rounded-br-sm"
                    animate={{ x: isHovering ? 4 : 0, y: isHovering ? 4 : 0 }}
                />
            </motion.div>
        </div>
    );
};

export default Cursor;