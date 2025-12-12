import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoHelpCircleOutline } from 'react-icons/io5';

interface SecretHintProps {
    hint: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    delay?: number;
}

const SecretHint = ({ hint, position = 'bottom-right', delay = 5000 }: SecretHintProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const positionClasses = {
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-right': 'top-20 right-4',
        'top-left': 'top-20 left-4',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`fixed ${positionClasses[position]} z-40 hidden md:block`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative group cursor-help">
                        {/* Pulse Icon */}
                        <div className="absolute inset-0 bg-neon-blue/20 rounded-full animate-ping"></div>
                        <div className="relative bg-black/80 border border-neon-blue/50 text-neon-blue p-2 rounded-full backdrop-blur-sm hover:bg-neon-blue hover:text-black transition-colors">
                            <IoHelpCircleOutline size={24} />
                        </div>

                        {/* Hint Text */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, width: 0 }}
                                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                                    exit={{ opacity: 0, x: 20, width: 0 }}
                                    className="absolute right-full top-0 mr-3 h-full flex items-center bg-black/90 border border-neon-blue/30 px-4 py-2 rounded-lg text-xs font-mono text-neon-blue whitespace-nowrap shadow-neon"
                                >
                                    {hint}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SecretHint;
