import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    "Hello",      // English
    "नमस्ते",     // Hindi
    "வணக்கம்",    // Tamil
    "Bonjour",    // French
    "こんにちは"   // Japanese
];

const Intro = ({ onComplete }: { onComplete: () => void }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < languages.length) {
            const timeout = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 1000); // Show each language for 1 second
            return () => clearTimeout(timeout);
        } else {
            // After all languages, trigger completion
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    }, [index, onComplete]);

    return (
        <AnimatePresence mode='wait'>
            {index < languages.length && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold font-poppins text-neon-blue"
                    >
                        {languages[index]}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
