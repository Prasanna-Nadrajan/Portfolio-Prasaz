import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../components/Cursor';
import TerminalIntro from '../components/TerminalIntro';
// import GitHubCalendar from '../components/GitHubCalendar';

const GitHubWrapped = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showIntro, setShowIntro] = useState(true);

    // --- Metrics Data ---
    const stats = {
        commits: 711,
        prs: 84,
        issues: 12,
        reviews: 45,
        streak: 88,
        topLanguage: "Python",
        stars: 52,
        forks: 35,
        totalRepos: 42
    };

    const languages = [
        { name: "Py", percent: 45, color: "text-blue-400", bg: "bg-blue-400" },
        { name: "Java", percent: 30, color: "text-blue-600", bg: "bg-blue-600" },
        { name: "C", percent: 15, color: "text-cyan-400", bg: "bg-cyan-400" },
        { name: "TS", percent: 10, color: "text-teal-400", bg: "bg-teal-400" },
    ];

    const achievements = [
        { title: "Open Source Contributor", date: "2025", desc: "" },
        { title: "SlackDev", date: "2025", desc: "A few sprints, then back to hibernation." },
        { title: "Top 5% Contributor", date: "2025", desc: "Ranked in top 5% of global active users" },
    ];

    const skills = [
        "React", "TypeScript", "Python", "Tailwind", "Java", "C"
    ];

    // --- State for Interactive Controller ---
    const [activeSkillIndex, setActiveSkillIndex] = useState(0);
    const [joystickOffset, setJoystickOffset] = useState({ x: 0, y: 0 });
    const [buttonPressed, setButtonPressed] = useState<string | null>(null);

    // --- Matrix Rain Effect ---
    useEffect(() => {
        if (showIntro) return; // Don't run matrix rain while intro is showing

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "10";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Trail effect

            ctx.fillStyle = "#00FF00"; // Green text
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

    // --- Joystick Keyboard Logic ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setJoystickOffset({ x: 0, y: -15 });
                setActiveSkillIndex(prev => (prev > 0 ? prev - 1 : skills.length - 1));
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setJoystickOffset({ x: 0, y: 15 });
                setActiveSkillIndex(prev => (prev < skills.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowLeft') {
                setJoystickOffset({ x: -15, y: 0 });
            } else if (e.key === 'ArrowRight') {
                setJoystickOffset({ x: 15, y: 0 });
            } else if (e.key.toLowerCase() === 'a') {
                setButtonPressed('A');
            } else if (e.key.toLowerCase() === 'b') {
                setButtonPressed('B');
            }
        };

        const handleKeyUp = () => {
            setJoystickOffset({ x: 0, y: 0 });
            setButtonPressed(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [skills.length]);


    return (
        <article className="min-h-screen bg-black text-green-500 font-pixelated md:p-6 relative overflow-hidden cursor-none selection:bg-green-500 selection:text-black">
            {showIntro && (
                <TerminalIntro
                    command="git log --stat --summary --since='2024-01-01'"
                    logs={[
                        "Enumerating objects: 711, done.",
                        "Counting objects: 100% (711/711), done.",
                        "Compressing objects: 100% (450/450), done.",
                        "Resolving deltas: 100% (300/300), done.",
                        "[HEAD] @ master: 8092a (Merge pull request #84)",
                        "Loading visual interface..."
                    ]}
                    onComplete={() => setShowIntro(false)}
                />
            )}

            <Cursor />
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />

            {/* Header / Status Bar */}
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
                    <span className="hidden md:inline">SERVER: GITHUB-MAIN</span>
                    <span>RANK: TOP 5%</span>
                    <span className="animate-pulse">ONLINE</span>
                </div>
            </header>

            {/* Main Grid - Widened to 95vw */}
            {!showIntro && (
                <div className="w-full max-w-[95vw] mx-auto pt-16 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

                    {/* LEFT COL: Infographics (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-6">

                        {/* Widget 1: Language Distribution */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-black/80 border border-green-800 rounded p-4 shadow-[0_0_10px_rgba(0,100,0,0.3)]"
                        >
                            <h3 className="text-[10px] text-green-600 mb-3 border-b border-green-900 pb-1 flex justify-between">
                                <span>~/analytics/languages.json</span>
                                <span>USAGE %</span>
                            </h3>
                            <div className="space-y-3">
                                {languages.map((lang, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs">
                                        <span className={`font-bold w-20 shrink-0 ${lang.color}`}>{lang.name}</span>
                                        <div className="flex-1 h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${lang.percent}%` }}
                                                transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                                                className={`h-full rounded-full ${lang.bg}`}
                                            />
                                        </div>
                                        <span className="text-gray-500 text-[10px] w-8 text-right">{lang.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Widget 2: Contribution Breakdown */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-black/80 border border-green-800 rounded p-4 flex gap-4 items-center h-32"
                        >
                            {/* Donut Chart CSS */}
                            <div className="relative w-24 h-24 shrink-0 rounded-full flex items-center justify-center"
                                style={{ background: 'conic-gradient(#22c55e 0% 70%, #eab308 70% 90%, #ef4444 90% 100%)' }}
                            >
                                <div className="absolute inset-2 bg-black rounded-full flex flex-col items-center justify-center">
                                    <span className="text-xl text-white font-bold">{stats.commits + stats.prs + stats.issues}</span>
                                    <span className="text-[8px] text-green-600">ACTIONS</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-1 text-[10px]">
                                <h3 className="text-green-300 border-b border-green-900 mb-2 pb-1">ACTIVITY_TYPE</h3>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Commits</span>
                                    <span className="text-white">{stats.commits}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> PRs</span>
                                    <span className="text-white">{stats.prs}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Issues</span>
                                    <span className="text-white">{stats.issues}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Widget 3: Repository Intelligence */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/80 border border-green-800 rounded p-4 grid grid-cols-3 gap-2 text-center"
                        >
                            <div className="p-2 bg-green-900/10 rounded border border-green-500/10 hover:bg-green-500/20 transition-colors">
                                <div className="text-xl mb-1">⭐</div>
                                <div className="text-lg font-bold text-white">{stats.stars}</div>
                                <div className="text-[8px] text-green-600 uppercase">Stars</div>
                            </div>
                            <div className="p-2 bg-green-900/10 rounded border border-green-500/10 hover:bg-green-500/20 transition-colors">
                                <div className="text-xl mb-1"> Forks</div>
                                <div className="text-lg font-bold text-white">{stats.forks}</div>
                                <div className="text-[8px] text-green-600 uppercase">Forks</div>
                            </div>
                            <div className="p-2 bg-green-900/10 rounded border border-green-500/10 hover:bg-green-500/20 transition-colors">
                                <div className="text-xl mb-1">📦</div>
                                <div className="text-lg font-bold text-white">{stats.totalRepos}</div>
                                <div className="text-[8px] text-green-600 uppercase">Repos</div>
                            </div>
                        </motion.div>

                    </div>


                    {/* COLUMN 2: Center Stats (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        {/* Top: Intro/Bio */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-black/80 backdrop-blur border border-green-500/50 p-6 rounded-lg relative overflow-hidden h-[200px]"
                        >
                            <h2 className="text-sm text-white mb-4 border-b border-green-500/30 pb-2">SYSTEM PROTOCOL</h2>
                            <div className="text-xs leading-relaxed font-mono space-y-4">
                                <div>
                                    <span className="text-white">IDENTITY CONFIRMED: </span>
                                    <span className="text-green-500">PRASAZ</span>
                                </div>
                                <div>
                                    <span className="text-white">MISSION: </span>
                                    <span className="text-green-500">I speak the language of code and I'm a certified **Data Science enthusiast**</span>
                                </div>
                                <div className="text-green-500">
                                    Currently executing code at{" "}
                                    <span className="bg-green-500 text-black px-1 font-bold">
                                        REC
                                    </span>
                                    .
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom: Grid of Stats */}
                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="bg-black/80 border border-green-500/30 p-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-500/10 transition-colors group"
                            >
                                <h3 className="text-3xl text-white mb-2 group-hover:text-green-400 transition-colors">{stats.commits}</h3>
                                <p className="text-[10px] uppercase tracking-wider text-green-600">Total Commits</p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="bg-black/80 border border-green-500/30 p-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-500/10 transition-colors group"
                            >
                                <h3 className="text-3xl text-white mb-2 group-hover:text-green-400 transition-colors">{stats.prs}</h3>
                                <p className="text-[10px] uppercase tracking-wider text-green-600">Pull Requests</p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                                className="bg-black/80 border border-green-500/30 p-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-500/10 transition-colors group"
                            >
                                <h3 className="text-3xl text-white mb-2 group-hover:text-green-400 transition-colors">{stats.streak}</h3>
                                <p className="text-[10px] uppercase tracking-wider text-green-600">Day Streak</p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                className="bg-black/80 border border-green-500/30 p-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-500/10 transition-colors group"
                            >
                                <h3 className="text-xl text-white mb-2 break-all group-hover:text-green-400 transition-colors">{stats.topLanguage}</h3>
                                <p className="text-[10px] uppercase tracking-wider text-green-600">Top Lang</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* COLUMN 3: Right (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        {/* Recent Achievements */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-black/80 backdrop-blur border border-green-500/50 p-6 rounded-lg h-[45%]"
                        >
                            <h2 className="text-sm text-white mb-6 border-b border-green-500/30 pb-2 flex justify-between">
                                RECENT LOGS <span className="bg-green-500 text-black px-1 text-[10px] flex items-center font-bold">ACHIEVEMENTS</span>
                            </h2>
                            <div className="space-y-6 overflow-y-auto max-h-[200px] scrollbar-hide">
                                {achievements.map((item, i) => (
                                    <div key={i} className="group">
                                        <h4 className="text-white text-xs font-bold group-hover:text-green-400 transition-colors">{item.title}</h4>
                                        <p className="text-[10px] opacity-70 mb-1">{item.date}</p>
                                        <p className="text-[10px] font-mono text-green-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Skill Switch with Visual Controller */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-black border border-t-[6px] border-t-green-900 border-x-4 border-x-green-950 border-b-[8px] border-b-green-950 rounded-lg h-[55%] flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.1)]"
                        >
                            {/* Screen */}
                            <div className="bg-black flex-1 m-3 rounded md:mb-16 border-4 border-green-900 relative overflow-hidden p-4 shadow-inner">
                                {/* Scanline overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>

                                <h2 className="text-lg text-center font-pixelated mb-4 text-green-500 tracking-widest drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">SKILL_SWITCH</h2>

                                <div className="space-y-1 font-mono text-[10px] md:text-xs">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 p-1 rounded transition-all duration-100 ${index === activeSkillIndex ? 'bg-green-500 text-black translate-x-1 shadow-[0_0_10px_#00ff00]' : 'text-green-800'}`}
                                        >
                                            <span className={`${index === activeSkillIndex ? 'opacity-100' : 'opacity-0'}`}>
                                                ▶
                                            </span>
                                            <span className="flex-1 font-bold">
                                                {skill.toUpperCase()}
                                            </span>
                                            {index === activeSkillIndex && (
                                                <span className="text-[8px] animate-pulse">SELECTED</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controller UI Area (Bottom Panel) */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-black to-green-950 flex items-center justify-between px-6 border-t-4 border-green-900">
                                {/* Joystick */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-black shadow-[inset_0_2px_5px_rgba(0,50,0,0.8)] flex items-center justify-center border border-green-800">
                                        <motion.div
                                            animate={{ x: joystickOffset.x, y: joystickOffset.y }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="w-8 h-8 rounded-full bg-green-600 shadow-[0_4px_0_#14532d,inset_0_2px_5px_rgba(255,255,255,0.4)] relative cursor-pointer active:scale-95"
                                        >
                                            <div className="absolute top-1 left-2 w-2 h-2 bg-white/30 rounded-full blur-[1px]"></div>
                                        </motion.div>
                                    </div>
                                    <p className="text-[8px] text-green-700 text-center mt-1 font-sans">NAVIGATE</p>
                                </div>

                                {/* Branding */}
                                <div className="text-green-800 font-sans text-[8px] tracking-[0.2em] font-bold text-center opacity-80">
                                    SYSTEM<br />CONTROL
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 rotate-12">
                                    <div className={`w-6 h-6 rounded-full bg-black border border-green-600 flex items-center justify-center text-[8px] text-green-500 font-bold shadow-[0_2px_0_#064e3b] ${buttonPressed === 'B' ? 'translate-y-[2px] shadow-none' : ''}`}>
                                        B
                                    </div>
                                    <div className={`w-6 h-6 rounded-full bg-green-600 border border-green-400 flex items-center justify-center text-[8px] text-black font-bold shadow-[0_2px_0_#064e3b] -mt-2 ${buttonPressed === 'A' ? 'translate-y-[2px] shadow-none' : ''}`}>
                                        A
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            )}
        </article>
    );
};

export default GitHubWrapped;
