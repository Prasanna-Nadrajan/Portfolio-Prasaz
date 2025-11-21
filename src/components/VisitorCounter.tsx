import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline } from 'react-icons/io5';

const VisitorCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulate fetching visitor count
        // In a real app, you'd fetch from an API like countapi.xyz
        // const fetchCount = async () => {
        //   try {
        //     const response = await fetch('https://api.countapi.xyz/hit/your-namespace/your-key');
        //     const data = await response.json();
        //     setCount(data.value);
        //   } catch (error) {
        //     console.error("Error fetching visitor count:", error);
        //   }
        // };
        // fetchCount();

        // Mock animation for now
        let start = 0;
        const end = 123; // Mock total visits
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="visitor-counter flex items-center gap-2 bg-onyx/50 px-3 py-2 rounded-lg border border-jet mt-4 w-max mx-auto md:mx-0">
            <IoEyeOutline className="text-neon-blue" />
            <span className="text-xs text-light-gray-70">Visits:</span>
            <motion.span
                key={count}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-mono text-main-text"
            >
                {count.toLocaleString()}
            </motion.span>
        </div>
    );
};

export default VisitorCounter;
