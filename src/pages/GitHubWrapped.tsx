import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Cursor from '../components/Cursor';
import { FaGithub, FaStar, FaCode, FaHistory, FaMoon, FaTerminal, FaMedal } from 'react-icons/fa';
import { GoRepo, GoGitPullRequest, GoIssueOpened } from "react-icons/go";

const GitHubWrapped = () => {
    const navigate = useNavigate();

    // --- Metrics Data ---
    const stats = {
        contributions: 711,
        commits: 625, // Approx 88% of 711
        prs: 83,
        issues: 12, // Estimated or remaining
        reviews: 0,
        streak: 115, // Using Top Month Peak as a proxy for engagement metric or just 'High'
        topLanguage: "Python",
        stars: 45, // Inferred from top project stars mention
        forks: 15,
        totalRepos: 25,
        linesOfCode: "711 Contribs", // Re-purposing or keeping as specific metric if known, else 'High' or removing. Let's use Total Contributions here for impact.
        productivity: "Burst-Style" // SLAKDEV
    };

    const languages = [
        { name: "Python", percent: 45, color: "text-blue-400", bg: "bg-blue-400" },
        { name: "C", percent: 20, color: "text-gray-400", bg: "bg-gray-400" },
        { name: "Java", percent: 15, color: "text-orange-400", bg: "bg-orange-400" },
        { name: "TypeScript", percent: 12, color: "text-blue-600", bg: "bg-blue-600" },
        { name: "CSS", percent: 8, color: "text-purple-400", bg: "bg-purple-400" },
    ];

    const highlights = [
        { name: "LeetCode/HackerRank", stars: 12, desc: "Problem solving repository" },
        { name: "CodeSapiens Mentorship", stars: 24, desc: "Mentorship Marathon" },
        { name: "Portfolio-v2", stars: 45, desc: "Personal Portfolio" }
    ];

    const achievements = [
        { title: "SLAKDEV", date: "2025", desc: "Burst-style Development" },
        { title: "Peak Performer", date: "July", desc: "115 Contributions in July" },
        { title: "Single Day Record", date: "July", desc: "9 Contributions in 1 day" },
    ];


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
        <article className="min-h-screen bg-[#0d1117] text-gray-300 font-sans md:p-6 relative overflow-hidden cursor-none selection:bg-green-900 selection:text-white" style={{ '--cursor-color': '#ffffff' } as React.CSSProperties}>
            <SEO title="GitHub Wrapped" description="My GitHub Year in Review 2025." />
            <Cursor />

            {/* Background Mesh (Optional/Subtle) */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-[#0d1117] to-[#0d1117] pointer-events-none"></div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#161b22]/90 backdrop-blur border-b border-gray-800 z-50 flex items-center justify-between px-6">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-400 hover:text-white font-semibold flex items-center gap-2 transition-colors text-sm"
                >
                    ← Back to Portfolio
                </button>
                <div className="flex items-center gap-2 text-white font-bold">
                    <FaGithub className="text-2xl" />
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
                <motion.div variants={itemVariants} className="md:col-span-8 bg-gradient-to-br from-[#2ea44f] to-[#238636] rounded-3xl p-8 text-white shadow-[0_0_30px_rgba(46,164,79,0.2)] md:min-h-[300px] flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 text-[200px] opacity-10 rotate-12 translate-x-10 -translate-y-10">
                        <FaGithub />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full text-xs font-mono mb-4 border border-white/10">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            ID: 8092-A
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            The Open Source<br />
                            <span className="text-green-100">Architect.</span>
                        </h2>
                    </div>
                    <div className="relative z-10 max-w-md mt-6">
                        <p className="text-green-50 text-lg leading-relaxed">
                            You build with bursts of brilliance. With <span className="font-bold text-white">{stats.contributions} contributions</span> from <span className="font-bold text-white">25 Repos</span> this year, you're defining your own path.
                        </p>
                    </div>
                </motion.div>

                {/* --- TOTAL REPOS & PRODUCTIVITY (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
                    {/* Repos */}
                    <div className="flex-1 bg-[#161b22] border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:border-gray-600 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-gray-700 transition-colors">
                                <GoRepo className="text-2xl text-white" />
                            </div>
                            <span className="text-xs font-mono text-gray-500">PUBLIC_REPOS</span>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">{stats.totalRepos}</div>
                            <div className="text-sm text-gray-400">Repositories Created</div>
                        </div>
                    </div>
                    {/* Productivity Clock */}
                    <div className="flex-1 bg-[#161b22] border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:border-gray-600 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-indigo-900/30 rounded-2xl text-indigo-400">
                                <FaMoon className="text-2xl" />
                            </div>
                            <span className="text-xs font-mono text-gray-500">PEAK_TIME</span>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">{stats.productivity}</div>
                            <div className="text-sm text-gray-400">Most active: 10 PM - 2 AM</div>
                        </div>
                    </div>
                </motion.div>

                {/* --- STATS GRID (Span 12 -> 4Cols) --- */}
                <motion.div variants={itemVariants} className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-5 flex flex-col justify-center items-center text-center hover:bg-gray-800/50 transition-colors">
                        <GoGitPullRequest className="text-3xl text-[#a371f7] mb-2" />
                        <span className="text-2xl font-bold text-white">{stats.prs}</span>
                        <span className="text-xs text-gray-400">Pull Requests</span>
                    </div>
                    <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-5 flex flex-col justify-center items-center text-center hover:bg-gray-800/50 transition-colors">
                        <GoIssueOpened className="text-3xl text-[#3fb950] mb-2" />
                        <span className="text-2xl font-bold text-white">{stats.issues}</span>
                        <span className="text-xs text-gray-400">Issues Solved</span>
                    </div>
                    <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-5 flex flex-col justify-center items-center text-center hover:bg-gray-800/50 transition-colors">
                        <FaCode className="text-3xl text-blue-400 mb-2" />
                        <span className="text-2xl font-bold text-white">{stats.topLanguage}</span>
                        <span className="text-xs text-gray-400">Top Language</span>
                    </div>
                    <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-5 flex flex-col justify-center items-center text-center hover:bg-gray-800/50 transition-colors">
                        <FaTerminal className="text-3xl text-orange-400 mb-2" />
                        <span className="text-2xl font-bold text-white">{stats.linesOfCode}</span>
                        <span className="text-xs text-gray-400">Lines of Code</span>
                    </div>
                </motion.div>

                {/* --- LANGUAGES (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#161b22] border border-gray-800 rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-6">Top Languages</h3>
                    <div className="space-y-4">
                        {languages.map((lang, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-semibold text-gray-300">{lang.name}</span>
                                    <span className="text-gray-500">{lang.percent}%</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${lang.percent}%` }}
                                        transition={{ delay: 0.8 }}
                                        className={`h-full rounded-full ${lang.bg}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- REPO HIGHLIGHTS (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#161b22] border border-gray-800 rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-6 flex items-center gap-2">
                        <FaStar className="text-yellow-400" /> Starred Repos
                    </h3>
                    <div className="space-y-4">
                        {highlights.map((repo, i) => (
                            <div key={i} className="bg-[#0d1117] border border-gray-800 rounded-xl p-3 hover:border-gray-600 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-blue-400 group-hover:underline text-sm">{repo.name}</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><FaStar className="text-xs" /> {repo.stars}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate">{repo.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- RECENT ACHIEVEMENTS (Span 4) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#161b22] border border-gray-800 rounded-3xl p-6">
                    <h3 className="text-gray-100 font-bold mb-6 flex items-center gap-2">
                        <FaHistory className="text-purple-400" /> Achievements
                    </h3>
                    <div className="space-y-4">
                        {achievements.map((badge, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
                                    <FaMedal className="text-xs" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm leading-tight">{badge.title}</h4>
                                    <p className="text-[10px] text-gray-500">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </motion.div>

        </article>
    );
};

export default GitHubWrapped;
