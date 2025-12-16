import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VisitorCounterProps {
    count?: number;
}

const VisitorCounter = ({ count = 0 }: VisitorCounterProps) => {
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        if (count === 0) return;

        let start = 0;
        const duration = 2000;
        const targetCount = count;
        // If target is huge, increment might be large.
        // If we are re-rendering, maybe we want to animate from current displayCount?
        // For simplicity, let's just animate from 0 or preserve the simple logic 
        // but ensure it runs when 'count' becomes available (non-zero).

        const increment = targetCount / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetCount) {
                setDisplayCount(targetCount);
                clearInterval(timer);
            } else {
                setDisplayCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [count]);

    return (
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <p className="text-secondary-text text-sm mb-2 font-light tracking-wider">This page was viewed</p>

            <motion.div
                key={displayCount} // This might cause too many re-renders if key changes on every tick. better to remove key or use count
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-7xl font-bold text-neon-blue drop-shadow-[0_0_15px_rgba(0,191,255,0.5)] font-mono my-2"
            >
                {displayCount.toLocaleString()}
            </motion.div>

            <p className="text-secondary-text text-sm font-light tracking-wider">times</p>
        </div>
    );
};

export default VisitorCounter;