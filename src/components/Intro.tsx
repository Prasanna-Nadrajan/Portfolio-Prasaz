import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchEffect from './GlitchEffect';

const languages = [
    "வணக்கம்",
    "Hello",
    "こんにちは",      // Japanese
    "नमस्ते",     // Hindi
    "Bonjour",    // French
];

const Intro = ({ onComplete }: { onComplete: () => void }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < languages.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 1200); // Slower transitions (1.2s per language)
            return () => clearTimeout(timeout);
        } else {
            // After all languages, trigger completion
            setTimeout(() => {
                onComplete();
            }, 1000);
        }
    }, [index, onComplete]);

    return (
        <AnimatePresence mode='wait'>
            {index <= languages.length && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
                        <div className="stars-sm"></div>
                        <div className="stars-md"></div>
                    </div>

                    {/* Text Container */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <AnimatePresence mode='wait'>
                            {index < languages.length && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="flex items-center justify-center"
                                >
                                    <GlitchEffect trigger="random">
                                        <span className="text-4xl md:text-8xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500 drop-shadow-[0_0_15px_rgba(0,191,255,0.5)]">
                                            {languages[index]}
                                        </span>
                                    </GlitchEffect>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Loading Indicator */}
                        <motion.div
                            className="absolute bottom-20 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                className="h-full bg-neon-blue box-shadow-[0_0_10px_var(--neon-blue)]"
                                style={{ width: `${(index / languages.length) * 100}%` }}
                                layoutId="progress"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;