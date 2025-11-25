import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const namespace = 'portfolio-prasanna-nadrajan'; 
                const key = 'visits';
                
                const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                const targetCount = data.count;

                let start = 0;
                const duration = 2000;
                const increment = targetCount / (duration / 16);

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
                setCount(100); 
            }
        };

        fetchCount();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <p className="text-secondary-text text-sm mb-2 font-light tracking-wider">This page was viewed</p>
            
            <motion.div
                key={count}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl md:text-7xl font-bold text-neon-blue drop-shadow-[0_0_15px_rgba(0,191,255,0.5)] font-mono my-2"
            >
                {count.toLocaleString()}
            </motion.div>
            
            <p className="text-secondary-text text-sm font-light tracking-wider">times</p>
        </div>
    );
};

export default VisitorCounter;