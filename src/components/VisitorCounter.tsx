import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoEyeOutline } from 'react-icons/io5';

const VisitorCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                // Define your unique namespace and key
                // Change 'portfolio-prasanna-nadrajan' to a unique string for your project
                const namespace = 'portfolio-prasanna-nadrajan'; 
                const key = 'visits';
                
                // Call the 'up' endpoint to increment and retrieve the count
                const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                const targetCount = data.count; // The API returns { count: 123, ... }

                // Start animation from 0 to the fetched count
                let start = 0;
                const duration = 2000; // 2 seconds animation
                const increment = targetCount / (duration / 16); // 60 FPS

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= targetCount) {
                        setCount(targetCount);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);

            } catch (error) {
                console.error("Error fetching visitor count:", error);
                setCount(100); // Fallback number if API fails
            }
        };

        fetchCount();
    }, []);

    return (
        <div className="visitor-counter flex items-center gap-2 bg-onyx/50 px-3 py-2 rounded-lg border border-jet mt-4 w-max mx-auto md:mx-0">
            <IoEyeOutline className="text-neon-blue" />
            <span className="text-xs text-light-gray-70">Visits:</span>
            <motion.span
                key={count} // Triggers animation when count changes final value
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