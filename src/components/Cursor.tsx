import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add trail effect
            setTrail(prev => [...prev, { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }].slice(-15));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const isInteractive =
                target.closest('[data-cursor="hover"]') ||
                target.matches('a, button, input, textarea, label, select, option') ||
                target.closest('a, button, [role="button"]') ||
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
            {/* Cosmic Trail */}
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="absolute rounded-full"
                    style={{
                        x: point.x - 2,
                        y: point.y - 2,
                        width: 4,
                        height: 4,
                        background: `radial-gradient(circle, 
                            rgba(0, 217, 255, ${0.8 - index * 0.05}) 0%, 
                            rgba(176, 38, 255, ${0.6 - index * 0.04}) 50%, 
                            transparent 70%
                        )`,
                    }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}

            {/* Center Particle */}
            <motion.div
                className="absolute bg-white mix-blend-screen"
                style={{
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3,
                    width: 6,
                    height: 6,
                    rotate: 45,
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.8), 0 0 20px rgba(176, 38, 255, 0.6)',
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    backgroundColor: isHovering ? '#FFD700' : '#FFFFFF',
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Inner Cosmic Ring */}
            <motion.div
                className="absolute rounded-full border-2 mix-blend-screen"
                style={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    width: 40,
                    height: 40,
                    borderColor: isHovering ? '#00D9FF' : '#B026FF',
                    borderStyle: 'dashed',
                }}
                animate={{
                    rotate: 360,
                    scale: isHovering ? 2 : 1,
                    borderStyle: isHovering ? 'solid' : 'dashed',
                    borderWidth: isHovering ? '3px' : '2px',
                    opacity: isHovering ? 1 : 0.6,
                }}
                transition={{
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                    default: { type: 'spring', stiffness: 400, damping: 25 }
                }}
            />

            {/* Outer Plasma Ring */}
            <motion.div
                className="absolute rounded-full mix-blend-screen"
                style={{
                    x: mousePosition.x - 30,
                    y: mousePosition.y - 30,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle, 
                        transparent 40%, 
                        rgba(0, 217, 255, 0.3) 50%, 
                        rgba(176, 38, 255, 0.3) 60%,
                        transparent 70%
                    )`,
                }}
                animate={{
                    rotate: -360,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.9 : 0.4,
                }}
                transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    default: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            />

            {/* Targeting Brackets - Enhanced */}
            <motion.div
                className="absolute"
                style={{
                    x: mousePosition.x - 35,
                    y: mousePosition.y - 35,
                    width: 70,
                    height: 70,
                }}
                animate={{
                    rotate: isHovering ? 90 : 0,
                    scale: isHovering ? 1.3 : 1,
                    opacity: isHovering ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                }}
            >
                {/* Top-Left */}
                <motion.div
                    className="absolute top-0 left-0 w-4 h-4 border-t-3 border-l-3 rounded-tl-md"
                    style={{ borderColor: '#00D9FF', boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)' }}
                    animate={{
                        x: isHovering ? -6 : 0,
                        y: isHovering ? -6 : 0,
                        borderWidth: isHovering ? '3px' : '2px'
                    }}
                />
                {/* Top-Right */}
                <motion.div
                    className="absolute top-0 right-0 w-4 h-4 border-t-3 border-r-3 rounded-tr-md"
                    style={{ borderColor: '#B026FF', boxShadow: '0 0 10px rgba(176, 38, 255, 0.8)' }}
                    animate={{
                        x: isHovering ? 6 : 0,
                        y: isHovering ? -6 : 0,
                        borderWidth: isHovering ? '3px' : '2px'
                    }}
                />
                {/* Bottom-Left */}
                <motion.div
                    className="absolute bottom-0 left-0 w-4 h-4 border-b-3 border-l-3 rounded-bl-md"
                    style={{ borderColor: '#FFD700', boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }}
                    animate={{
                        x: isHovering ? -6 : 0,
                        y: isHovering ? 6 : 0,
                        borderWidth: isHovering ? '3px' : '2px'
                    }}
                />
                {/* Bottom-Right */}
                <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4 border-b-3 border-r-3 rounded-br-md"
                    style={{ borderColor: '#FF1493', boxShadow: '0 0 10px rgba(255, 20, 147, 0.8)' }}
                    animate={{
                        x: isHovering ? 6 : 0,
                        y: isHovering ? 6 : 0,
                        borderWidth: isHovering ? '3px' : '2px'
                    }}
                />
            </motion.div>

            {/* Hovering State - Energy Burst */}
            {isHovering && (
                <motion.div
                    className="absolute rounded-full mix-blend-screen"
                    style={{
                        x: mousePosition.x - 40,
                        y: mousePosition.y - 40,
                        width: 80,
                        height: 80,
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0.6, 0, 0.6],
                        scale: [0.8, 1.5, 0.8],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Particle Burst on Hover */}
            {isHovering && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white mix-blend-screen"
                            style={{
                                x: mousePosition.x,
                                y: mousePosition.y,
                            }}
                            animate={{
                                x: mousePosition.x + Math.cos((i * Math.PI * 2) / 8) * 30,
                                y: mousePosition.y + Math.sin((i * Math.PI * 2) / 8) * 30,
                                opacity: [1, 0],
                                scale: [1, 0],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Cursor;