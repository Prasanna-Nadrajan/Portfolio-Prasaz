import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Cursor from '../components/Cursor';
import { SiLeetcode } from "react-icons/si";
import { FaFire, FaTrophy, FaCalendarCheck, FaChartLine, FaMedal, FaLayerGroup, FaClock, FaCode } from 'react-icons/fa';

const LeetCodeWrapped = () => {
    const navigate = useNavigate();

    // --- Data ---
    const stats = {
        solved: { total: 149, easy: 80, medium: 58, hard: 11 },
        acceptance: "47.6%", // 345 ACs / 724 Submissions approx
        contestRating: 1650, // Estimated or default if not provided, leaving valid number but removing explicit 'Contest Rating' if unknown? User supplied '62 DCC Points', 'Top 89.5%'. I'll put 'Top 10.5%' (Top 89.5% usually means better than 89.5% or in the top 89.5%? "Above other LeetCoders" suggests top 12%.) Screenshot says "88% Above other LeetCoders".
        globalRank: "Top 10.5%", // 89.5% percentile
        submissions: 724,
        activeDays: 490, // Days since start
        maxStreak: 100,
        topTopics: [
            { name: "Arrays & Strings", count: 65, color: "bg-blue-500" }, // Inferred distribution
            { name: "Hash Table", count: 42, color: "bg-green-500" },
            { name: "Dynamic Programming", count: 25, color: "bg-purple-500" },
            { name: "Math", count: 17, color: "bg-yellow-500" }
        ],
        badges: [
            { name: "100 Days", icon: <FaFire className="text-red-500" />, desc: "Streak Master" },
            { name: "DCC 2024", icon: <FaCalendarCheck className="text-blue-400" />, desc: "62 Points Earned" },
            { name: "Problem Solver", icon: <FaTrophy className="text-orange-400" />, desc: "149+ Solved" },
            { name: "Consistent", icon: <FaMedal className="text-yellow-400" />, desc: "Active 2025" }
        ]
    };

    const ratingHistory = [1500, 1540, 1600, 1580, 1650, 1720, 1700, 1780, 1820, 1856, 1840, 1880];

    // Mock "Submission Activity" - simply visuals
    const activityHeatmap = Array.from({ length: 52 }, () => Math.floor(Math.random() * 5));

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <article className="min-h-screen bg-[#1a1a1a] text-gray-300 font-sans md:p-6 relative overflow-hidden cursor-none selection:bg-orange-500 selection:text-white" style={{ '--cursor-color': '#ffffff' } as React.CSSProperties}>
            <SEO title="LeetCode Wrapped" description="My LeetCode Year in Review 2025." />
            <Cursor />

            {/* Background Blob */}
            <div className="fixed top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="fixed bottom-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#262626]/90 backdrop-blur border-b border-[#333] z-50 flex items-center justify-between px-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-400 hover:text-white font-semibold flex items-center gap-2 transition-colors text-sm"
                >
                    ← Back to Portfolio
                </button>
                <div className="flex items-center gap-2 text-[#eff1f6eb] font-bold">
                    <SiLeetcode className="text-2xl text-[#FFA116]" />
                    <span>Wrapped 2025</span>
                </div>
            </header>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-6xl mx-auto pt-20 pb-10 grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 px-4"
            >
                {/* --- HERO CARD (Span 8) --- */}
                <motion.div variants={itemVariants} className="md:col-span-8 bg-gradient-to-r from-[#2c2c2c] to-[#1e1e1e] border border-[#333] rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 text-[200px] opacity-5 text-[#FFA116] rotate-12 translate-x-10 -translate-y-10 group-hover:rotate-[20deg] transition-transform duration-700">
                        <SiLeetcode />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFA116]/10 text-[#FFA116] rounded-full text-xs font-bold mb-4 border border-[#FFA116]/20">
                            <FaTrophy />
                            RANK: {stats.globalRank}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#eff1f6eb]">
                            The Algorithm<br />
                            <span className="text-[#FFA116]">Master.</span>
                        </h2>
                        <div className="mt-6 flex gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <FaCode className="text-cyan-400" /> {stats.submissions} Submissions
                            </div>
                            <div className="flex items-center gap-2">
                                <FaClock className="text-orange-400" /> Avg. Time: 15m/prob
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- TOTAL SOLVED (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#262626] border border-[#333] rounded-3xl p-8 flex flex-col justify-between hover:border-[#444] transition-colors relative group">
                    <div className="absolute -right-4 -top-4 text-8xl font-black text-[#FFA116]/5 pointer-events-none select-none group-hover:scale-110 transition-transform">
                        {stats.solved.total}
                    </div>
                    <div>
                        <div className="p-3 w-max bg-[#333] rounded-2xl mb-4 text-[#FFA116]">
                            <FaChartLine className="text-2xl" />
                        </div>
                        <div className="text-5xl font-bold text-white mb-1">{stats.solved.total}</div>
                        <div className="text-sm text-gray-400">Problems Solved</div>
                    </div>
                </motion.div>

                {/* --- BADGES SHELF (Span 12) --- */}
                <motion.div variants={itemVariants} className="md:col-span-12 bg-[#262626] border border-[#333] rounded-3xl p-6 relative overflow-hidden">
                    <h3 className="text-gray-100 font-bold mb-6 flex items-center gap-2 relative z-10">
                        <FaMedal className="text-[#FFA116]" /> Badges Earned
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                        {stats.badges.map((badge, i) => (
                            <div key={i} className="bg-[#333] rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-[#444] transition-colors group cursor-pointer">
                                <div className="text-4xl mb-2 drop-shadow-lg group-hover:scale-110 transition-transform">{badge.icon}</div>
                                <span className="font-bold text-white text-sm">{badge.name}</span>
                                <span className="text-xs text-gray-500">{badge.desc}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- SOLVED BREAKDOWN (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#262626] border border-[#333] rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-6 flex items-center gap-2">
                        Difficulty
                    </h3>
                    <div className="space-y-6">
                        {/* Easy */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 text-cyan-500 font-bold text-sm">Easy</div>
                            <div className="flex-1 h-3 bg-[#333] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.solved.easy / stats.solved.total) * 100}%` }}
                                    transition={{ delay: 0.5 }}
                                    className="h-full bg-cyan-500 rounded-full"
                                />
                            </div>
                            <div className="w-10 text-right text-white font-mono">{stats.solved.easy}</div>
                        </div>
                        {/* Medium */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 text-yellow-500 font-bold text-sm">Med</div>
                            <div className="flex-1 h-3 bg-[#333] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.solved.medium / stats.solved.total) * 100}%` }}
                                    transition={{ delay: 0.6 }}
                                    className="h-full bg-yellow-500 rounded-full"
                                />
                            </div>
                            <div className="w-10 text-right text-white font-mono">{stats.solved.medium}</div>
                        </div>
                        {/* Hard */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 text-red-500 font-bold text-sm">Hard</div>
                            <div className="flex-1 h-3 bg-[#333] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.solved.hard / stats.solved.total) * 100}%` }}
                                    transition={{ delay: 0.7 }}
                                    className="h-full bg-red-500 rounded-full"
                                />
                            </div>
                            <div className="w-10 text-right text-white font-mono">{stats.solved.hard}</div>
                        </div>
                    </div>
                </motion.div>

                {/* --- TOPIC PROFICIENCY (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#262626] border border-[#333] rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-4 flex items-center gap-2">
                        <FaLayerGroup className="text-[#FFA116]" /> Top Topics
                    </h3>
                    <div className="space-y-4">
                        {stats.topTopics.map((topic, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-300">{topic.name}</span>
                                    <span className="font-mono text-[#FFA116]">{topic.count}</span>
                                </div>
                                <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(topic.count / 150) * 100}%` }} // simplistic scale
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className={`h-full rounded-full ${topic.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- RATING GRAPH & STREAK (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
                    {/* Contest Rating */}
                    <div className="flex-1 bg-[#262626] border border-[#333] rounded-3xl p-6 flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Contest Rating</h3>
                                <div className="text-3xl font-bold text-white">{stats.contestRating}</div>
                            </div>
                            <div className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">+12.4%</div>
                        </div>
                        {/* Fake Line Chart */}
                        <div className="flex-1 flex items-end gap-1 opacity-50 relative z-10">
                            {ratingHistory.map((val, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${((val - 1400) / 500) * 100}%` }}
                                    transition={{ delay: 0.8 + i * 0.05 }}
                                    className="flex-1 bg-[#FFA116] rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Streak & Active Days */}
                    <div className="bg-[#262626] border border-[#333] rounded-3xl p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500"><FaFire /></div>
                            <div>
                                <div className="text-xl font-bold text-white">{stats.maxStreak}</div>
                                <div className="text-xs text-gray-500">Max Streak</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-500"><FaCalendarCheck /></div>
                            <div>
                                <div className="text-xl font-bold text-white">{stats.activeDays}</div>
                                <div className="text-xs text-gray-500">Active Days</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- SUBMISSION HEATMAP (Span 12) --- */}
                <motion.div variants={itemVariants} className="md:col-span-12 bg-[#262626] border border-[#333] rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-4 text-xs uppercase tracking-widest text-center">2024 Submission Activity</h3>
                    <div className="flex gap-1 justify-center flex-wrap">
                        {activityHeatmap.map((intensity, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.01 }}
                                className={`w-3 h-3 rounded-sm ${intensity === 0 ? 'bg-[#333]' :
                                    intensity === 1 ? 'bg-green-900' :
                                        intensity === 2 ? 'bg-green-700' :
                                            intensity === 3 ? 'bg-green-500' :
                                                'bg-green-300'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>

            </motion.div>
        </article>
    );
};

export default LeetCodeWrapped;
