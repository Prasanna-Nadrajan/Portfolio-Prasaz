import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../components/Cursor';
import TerminalIntro from '../components/TerminalIntro';
import SEO from '../components/SEO';

const LeetCodeWrapped = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [showIntro, setShowIntro] = useState(true);

    // --- Data ---
    const stats = {
        solved: { total: 120, easy: 54, medium: 46, hard: 10 },
        acceptance: "68.5%",
        contestRating: 1856,
        globalRank: "Top 20%",
        submissions: 200,
        activeDays: 150,
        maxStreak: 30
    };

    const ratingHistory = [1500, 1540, 1600, 1580, 1650, 1720, 1700, 1780, 1820, 1856];

    const skills = [
        { name: "DP", val: 80 },
        { name: "Trees", val: 65 },
        { name: "Graphs", val: 90 },
        { name: "Arrays", val: 95 },
        { name: "Math", val: 40 }
    ];

    const languages = [
        { name: "Py", percent: 60, color: "text-green-400", bg: "bg-green-400" },
        { name: "Java", percent: 30, color: "text-orange-400", bg: "bg-orange-400" },
        { name: "C", percent: 10, color: "text-blue-400", bg: "bg-blue-400" }
    ];

    const recentActivity = [
        { time: "10:23", problem: "Two Sum", status: "Accepted", runtime: "2ms" },
        { time: "10:45", problem: "LRU Cache", status: "Accepted", runtime: "45ms" },
        { time: "11:12", problem: "Merge k Sorted Lists", status: "Wrong Answer", runtime: "N/A" },
        { time: "11:15", problem: "Merge k Sorted Lists", status: "Accepted", runtime: "89ms" },
        { time: "14:30", problem: "Trapping Rain Water", status: "Accepted", runtime: "12ms" },
        { time: "16:45", problem: "N-Queens", status: "Time Limit", runtime: "N/A" },
        { time: "17:20", problem: "Dijkstra", status: "Accepted", runtime: "34ms" },
    ];

    const badges = [
        { name: "Guardian", icon: "🛡️" },
        { name: "50 Days Badge", icon: "🔥" },
        { name: "100 Days Badge", icon: "🔥" },
        { name: "Algorithm I", icon: "🧠" }

    ];

    // --- Matrix Rain Effect ---
    useEffect(() => {
        if (showIntro) return; // Don't run matrix rain while intro is showing

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "01LC";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00FF00";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [showIntro]);

    // Helper to generate graph path
    const getGraphPath = () => {
        const max = Math.max(...ratingHistory);
        const min = Math.min(...ratingHistory);
        const range = max - min;

        return ratingHistory.map((val, i) => {
            const x = (i / (ratingHistory.length - 1)) * 100;
            const y = 100 - ((val - min) / range) * 80 - 10;
            return `${x},${y}`;
        }).join(" L ");
    };

    return (
        <article className="min-h-screen bg-black text-green-500 font-pixelated md:p-6 relative overflow-hidden cursor-none selection:bg-green-500 selection:text-black">
            <SEO title="LeetCode Wrapped" description="My LeetCode Year in Review Style Assessment." />
            {showIntro && (
                <TerminalIntro
                    command="lcc-cli run --user=prasaz --mode=wrapped"
                    logs={[
                        "[INFO] Connecting to LeetCode API...",
                        "[SUCCESS] Connection established.",
                        "[PROCESS] Fetching submission history... 200/200",
                        "[ANALYSIS] Calculating acceptance rates...",
                        "[OPTIMIZE] Generating connectivity graph...",
                        "[READY] Launching interface..."
                    ]}
                    onComplete={() => setShowIntro(false)}
                />
            )}

            <Cursor />
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />

            {/* Header / Status Bar */}
            {!showIntro && (
                <>
                    <header className="fixed top-0 left-0 right-0 h-10 bg-black/90 border-b border-green-800 z-50 flex items-center justify-between px-6 text-xs font-mono">
                        <div className="flex gap-4">
                            <button onClick={() => navigate(-1)} className="hover:bg-green-500 hover:text-black px-2 py-1 transition-colors">
                                ← SYSTEM_EXIT
                            </button>
                            <span className="opacity-50">|</span>
                            <span>USER: PRASAZ</span>
                            <span className="hidden md:inline text-green-700">ID: 8092-A</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="hidden md:inline">SERVER: ASIA-CENTRAL</span>
                            <span>RANK: {stats.globalRank}</span>
                            <span className="animate-pulse">ONLINE</span>
                        </div>
                    </header>

                    {/* Main Grid - Widened to 95vw */}
                    <div className="w-full max-w-[95vw] mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

                        {/* LEFT COL: Stats Dashboard (Span 9) */}
                        <div className="lg:col-span-9 flex flex-col gap-6">

                            {/* Top Row: Problem Solving, Rating, Skills */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[280px]">

                                {/* 1. Problem Solving */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="bg-black border border-green-800 rounded shadow-[0_0_10px_rgba(0,100,0,0.3)] flex flex-col overflow-hidden"
                                >
                                    <div className="bg-green-900/20 border-b border-green-800 px-3 py-1 text-[10px] flex justify-between items-center text-green-300">
                                        <span>~/stats/solved.json</span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-center gap-4 relative">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full border-4 border-green-900 relative flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                                                <div className="text-xl font-bold text-white tracking-tighter">{stats.solved.total}</div>
                                                <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                                            </div>

                                            <div className="flex-1 space-y-2 text-[10px] font-mono">
                                                <div>
                                                    <div className="flex justify-between mb-0.5">
                                                        <span className="text-cyan-400">Easy</span>
                                                        <span className="text-white">{stats.solved.easy}</span>
                                                    </div>
                                                    <div className="h-0.5 bg-green-900 rounded-full w-full"><div className="h-full bg-cyan-400 w-[60%]"></div></div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-0.5">
                                                        <span className="text-yellow-400">Med</span>
                                                        <span className="text-white">{stats.solved.medium}</span>
                                                    </div>
                                                    <div className="h-0.5 bg-green-900 rounded-full w-full"><div className="h-full bg-yellow-400 w-[75%]"></div></div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-0.5">
                                                        <span className="text-red-500">Hard</span>
                                                        <span className="text-white">{stats.solved.hard}</span>
                                                    </div>
                                                    <div className="h-0.5 bg-green-900 rounded-full w-full"><div className="h-full bg-red-500 w-[25%]"></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 2. Rating Graph */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-black border border-green-800 rounded shadow-[0_0_10px_rgba(0,100,0,0.3)] flex flex-col overflow-hidden"
                                >
                                    <div className="bg-green-900/20 border-b border-green-800 px-3 py-1 text-[10px] flex justify-between items-center text-green-300">
                                        <span>~/stats/rating.py</span>
                                        <span>MAX: {stats.contestRating}</span>
                                    </div>
                                    <div className="p-4 flex-1 relative flex items-end px-2 pb-2">
                                        <div className="absolute inset-4 border-l border-b border-green-900/50 pointer-events-none"></div>
                                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                            <path d={`M0,100 L ${getGraphPath()} L 100,100 Z`} fill="rgba(34, 197, 94, 0.1)" stroke="none" />
                                            <path d={`M ${getGraphPath()}`} fill="none" stroke="#4ade80" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                            {ratingHistory.map((val, i) => {
                                                const max = Math.max(...ratingHistory);
                                                const min = Math.min(...ratingHistory);
                                                const x = (i / (ratingHistory.length - 1)) * 100;
                                                const y = 100 - ((val - min) / (max - min)) * 80 - 10;
                                                return <circle key={i} cx={x} cy={y} r="1.5" className="fill-green-400" />;
                                            })}
                                        </svg>
                                    </div>
                                </motion.div>

                                {/* 3. Skill Analysis (NEW) */}
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-black border border-green-800 rounded shadow-[0_0_10px_rgba(0,100,0,0.3)] flex flex-col overflow-hidden"
                                >
                                    <div className="bg-green-900/20 border-b border-green-800 px-3 py-1 text-[10px] flex justify-between items-center text-green-300">
                                        <span>~/analysis/skills.csv</span>
                                        <span>TOP: ARRAYS</span>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between text-xs font-mono">
                                        {skills.map((skill, i) => (
                                            <div key={i} className="group cursor-pointer">
                                                <div className="flex justify-between mb-1 opacity-80 group-hover:opacity-100 group-hover:text-green-300 transition-colors">
                                                    <span>{skill.name.toUpperCase()}</span>
                                                    <span>{skill.val}%</span>
                                                </div>
                                                <div className="h-1 bg-green-900/30 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.val}%` }}
                                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                        className="h-full bg-green-600 group-hover:bg-green-400 transition-colors"
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Middle Row: Terminal & Consistency Heatmap */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">

                                {/* Terminal Log */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-black border border-green-800 rounded p-4 font-mono text-sm shadow-[inset_0_0_20px_rgba(0,20,0,0.5)] flex flex-col"
                                >
                                    <div className="text-green-700 mb-2 border-b border-green-900 pb-1 text-xs flex justify-between">
                                        <span>root@leetcode-wrapped:~# tail -f submission_log.log</span>
                                        <span className="text-[10px] opacity-50">WATCHING...</span>
                                    </div>
                                    <ul className="space-y-1 overflow-hidden flex-1">
                                        {recentActivity.map((log, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                className="flex gap-2 text-[10px] md:text-xs"
                                            >
                                                <span className="text-green-600 opacity-60 w-10 shrink-0">[{log.time}]</span>
                                                <span className="text-white truncate flex-1">{log.problem}</span>
                                                <span className={`shrink-0 ${log.status === 'Accepted' ? 'text-green-400' : 'text-red-500'}`}>
                                                    {log.status === 'Accepted' ? 'AC' : 'WA'}
                                                </span>
                                                <span className="text-green-800 w-8 text-right shrink-0">{log.runtime}</span>
                                            </motion.li>
                                        ))}
                                        <li className="text-green-500 mt-2 animate-pulse">_</li>
                                    </ul>
                                </motion.div>

                                {/* Consistency Box (NEW) */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-black border border-green-800 rounded p-4 relative overflow-hidden flex flex-col items-center justify-center text-center"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900 via-green-500 to-green-900"></div>

                                    {/* Big Numbers */}
                                    <div className="grid grid-cols-2 w-full gap-4 mt-2">
                                        <div className="flex flex-col items-center p-3 bg-green-900/10 rounded border border-green-500/10">
                                            <span className="text-3xl lg:text-4xl text-white font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">{stats.activeDays}</span>
                                            <span className="text-[10px] uppercase text-green-600 tracking-widest mt-1">Active Days</span>
                                        </div>
                                        <div className="flex flex-col items-center p-3 bg-green-900/10 rounded border border-green-500/10">
                                            <span className="text-3xl lg:text-4xl text-green-400 font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">{stats.maxStreak}</span>
                                            <span className="text-[10px] uppercase text-green-600 tracking-widest mt-1">Max Streak</span>
                                        </div>
                                    </div>

                                    {/* Fake Calendar Grid visual */}
                                    <div className="w-full mt-4 flex gap-1 flex-wrap justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                                        {Array.from({ length: 52 }).map((_, i) => (
                                            <div key={i} className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.4 ? 'bg-green-500' : 'bg-green-900/30'}`}></div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-green-700 mt-2 font-mono">1 Year Activity Log View</p>
                                </motion.div>

                            </div>
                        </div>

                        {/* RIGHT COL: Badges & Info (Span 3) */}
                        <div className="lg:col-span-3 flex flex-col gap-6">

                            {/* Badge Shelf */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-black/80 border border-green-800 p-6 rounded relative min-h-[300px]"
                            >
                                <h3 className="text-white text-sm mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    BADGES
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {badges.map((badge, i) => (
                                        <div key={i} className="aspect-square bg-green-900/10 border border-green-500/30 rounded flex flex-col items-center justify-center hover:bg-green-500/20 transition-all cursor-crosshair group">
                                            <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                                                {badge.icon}
                                            </div>
                                            <span className="text-[9px] text-center text-green-400 group-hover:text-white leading-tight px-1">{badge.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Languages Box (NEW) */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-black/80 border border-green-800 p-4 rounded"
                            >
                                <h3 className="text-[10px] text-green-600 mb-3 border-b border-green-900 pb-1">LANGUAGES Used</h3>
                                <div className="space-y-3">
                                    {languages.map((lang, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs">
                                            <span className={`font-bold w-12 ${lang.color}`}>{lang.name}</span>
                                            <div className="flex-1 h-1.5 bg-gray-900 rounded-full">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${lang.percent}%` }}
                                                    transition={{ duration: 1, delay: 0.6 }}
                                                    className={`h-full rounded-full ${lang.bg}`}
                                                />
                                            </div>
                                            <span className="text-gray-500 text-[10px]">{lang.percent}%</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* System Info */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-green-900/5 border border-green-900 rounded p-4 text-[10px] font-mono text-green-700 space-y-2"
                            >
                                <p>CPU_USAGE: 34% (HIGH)</p>
                                <p>MEMORY: 890MB / 1024MB</p>
                                <p>NETWORK: SECURE TUNNEL</p>
                                <p className="animate-pulse">_SYSTEM_OPTIMIZED</p>
                            </motion.div>

                        </div>
                    </div>
                </>
            )}
        </article>
    );
};

export default LeetCodeWrapped;
