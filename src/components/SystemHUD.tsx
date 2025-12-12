import { useState, useEffect } from 'react';

const SystemHUD = () => {
    const [time, setTime] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [latency, setLatency] = useState(25);
    const [integrity, setIntegrity] = useState(100);

    useEffect(() => {
        // Time updater
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');
        }, 1000);

        // Scroll listener
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Random decorative updates
        const systemInterval = setInterval(() => {
            setLatency(prev => {
                const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
                return Math.max(10, Math.min(99, prev + change));
            });

            // Very rare integrity flicker
            if (Math.random() > 0.98) {
                setIntegrity(Math.floor(Math.random() * 20) + 80);
                setTimeout(() => setIntegrity(100), 200);
            }
        }, 2000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
            clearInterval(systemInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] hidden md:block opacity-50 font-mono text-xs text-neon-blue select-none">
            {/* Top Left - Time */}
            <div className="absolute top-4 left-4 border-l-2 border-t-2 border-neon-blue/30 pl-2 pt-1">
                <div className="text-[10px] text-gray-500 uppercase">System Time</div>
                <div>{time}</div>
            </div>

            {/* Top Right - Status */}
            <div className="absolute top-4 right-4 text-right border-r-2 border-t-2 border-neon-blue/30 pr-2 pt-1">
                <div className="flex items-center justify-end gap-2">
                    <span className={`w-2 h-2 rounded-full ${latency < 50 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
                    <span>NET: {latency}ms</span>
                </div>
                <div className="text-gray-500">INTEGRITY: {integrity}%</div>
            </div>

            {/* Bottom Left - Decorative coords */}
            <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-neon-blue/30 pl-2 pb-1">
                <div className="text-[10px] text-gray-500">COORDS</div>
                <div>32.7767° N, 96.7970° W</div>
            </div>

            {/* Bottom Right - Scroll */}
            <div className="absolute bottom-4 right-4 text-right border-r-2 border-b-2 border-neon-blue/30 pr-2 pb-1">
                <div className="text-[10px] text-gray-500">OFFSET-Y</div>
                <div>{scrollY.toFixed(0)}px</div>
            </div>

            {/* Center Crosshair (Very subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-[0.5px] h-full w-[1px] bg-neon-blue"></div>
                <div className="absolute top-1/2 left-0 -translate-y-[0.5px] w-full h-[1px] bg-neon-blue"></div>
            </div>
        </div>
    );
};

export default SystemHUD;
