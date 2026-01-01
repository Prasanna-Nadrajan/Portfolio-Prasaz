
import { motion } from 'framer-motion';
import { FaLinkedin, FaQuoteLeft, FaHeart, FaComment, FaLightbulb, FaHandsHelping, FaLaughBeam } from 'react-icons/fa';
import { IoRibbonOutline, IoSchoolOutline, IoCodeSlashOutline, IoStatsChartOutline } from 'react-icons/io5';

const LinkedInUnwrapped = () => {
    // --- Data ---
    const stats = {
        posts: 254,
        weeksActive: 45,
        totalWeeks: 52,
        reactions: 2890,
        comments: 180,
        wordOfTheYear: "DATA",
        wordCount: 206,
        technicalNovelWords: 42562,
    };

    const milestones = [
        { icon: <IoSchoolOutline />, label: "Academic Excellence", title: "9.2 CGPA Achievement", color: "bg-blue-100 text-blue-700" },
        { icon: <IoStatsChartOutline />, label: "Professional Milestone", title: "Data Analyst Associate @ ARQ REC", color: "bg-green-100 text-green-700" },
        { icon: <IoCodeSlashOutline />, label: "Community Leader", title: "CodeSapiens Host", color: "bg-purple-100 text-purple-700" },
    ];

    const supporters = [
        { name: "Raghavan P", role: "Top Fan" },
        { name: "SUBASH R", role: "Consistent Supporter" },
        { name: "Dhanush .T.S", role: "Engager" },
        { name: "Ruban Kumar R", role: "Insightful" },
        { name: "Keerthana M G", role: "Motivator" },
        { name: "Mahaveer A", role: "Connector" },
    ];

    const reactionRadar = [
        { label: "Love", count: 99, icon: <FaHeart className="text-red-500" /> },
        { label: "Celebrate", count: 53, icon: <FaHandsHelping className="text-green-500" /> }, // Approximation for celebrate
        { label: "Insight", count: 9, icon: <FaLightbulb className="text-yellow-500" /> },
        { label: "Funny", count: 1, icon: <FaLaughBeam className="text-orange-400" /> },
        { label: "Empathy", count: 22, icon: <FaHeart className="text-pink-400" /> }, // Using heart for empathy too
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
        <section className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans selection:bg-blue-200">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
            >
                {/* --- HEADER --- */}
                <motion.div variants={itemVariants} className="md:col-span-12 flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <FaLinkedin className="text-5xl text-[#0077B5]" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">LinkedIn Wrapped</h1>
                            <p className="text-slate-500 font-medium">2025 Year in Review</p>
                        </div>
                    </div>
                </motion.div>

                {/* --- HERO CARD: The Persona --- */}
                <motion.div variants={itemVariants} className="md:col-span-8 bg-gradient-to-br from-[#0077B5] to-[#005582] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider mb-4 border border-white/10">
                                YOUR PERSONA
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-2">
                                The Always<br />
                                <span className="text-blue-200">Online Motivator.</span>
                            </h2>
                            <p className="text-blue-100 text-lg max-w-lg">
                                You've mastered the art of turning life into lessons. The small wins, the big struggles... you're authentic, and your network appreciates it.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                <IoRibbonOutline className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-200 uppercase tracking-widest text-[10px]">Superpower</p>
                                <p className="font-bold">Consistency is your real flex.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- STAT CARD: Total Posts --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-9xl text-slate-50 opacity-50 rotate-12 select-none pointer-events-none font-black">
                        254
                    </div>
                    <div>
                        <h3 className="text-slate-500 font-medium mb-1">Total Output</h3>
                        <div className="text-6xl font-black text-slate-800 tracking-tighter">{stats.posts}</div>
                        <p className="text-green-600 font-semibold text-sm mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Active {stats.weeksActive}/{stats.totalWeeks} weeks
                        </p>
                    </div>
                    <div className="mt-8">
                        <div className="flex gap-1 h-16 items-end">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={`flex-1 rounded-t-sm ${Math.random() > 0.3 ? 'bg-[#0077B5]' : 'bg-slate-200'}`} style={{ height: `${Math.random() * 100}%` }}></div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* --- STAT CARD: Impact Numbers --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col justify-center gap-4">
                    <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">The Impact</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl">
                            <FaHeart />
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-slate-800">{stats.reactions.toLocaleString()}</span>
                            <span className="text-slate-500 text-sm">Reactions</span>
                        </div>
                    </div>
                    <div className="w-full h-px bg-slate-100"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">
                            <FaComment />
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-slate-800">{stats.comments.toLocaleString()}</span>
                            <span className="text-slate-500 text-sm">Comments</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- STAT CARD: Word of the Year --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-[#F8C77E] rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <h3 className="text-yellow-900/60 font-bold uppercase tracking-widest text-xs mb-4 relative z-10">Word of the Year</h3>
                    <div className="text-5xl md:text-6xl font-black text-yellow-950 relative z-10">{stats.wordOfTheYear}</div>
                    <p className="mt-2 text-yellow-900 font-mono relative z-10">Used {stats.wordCount} times</p>
                </motion.div>

                {/* --- STAT CARD: The Narrative (Technical Novel) --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
                    <FaQuoteLeft className="text-6xl text-slate-800 absolute top-4 left-4" />
                    <div className="relative z-10 mt-12">
                        <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">The Narrative</h3>
                        <p className="text-3xl font-bold">
                            {stats.technicalNovelWords.toLocaleString()} Words
                        </p>
                        <p className="text-slate-400 mt-2">
                            That's roughly equivalent to writing <span className="text-white font-bold underline decoration-[#0077B5]">1 Technical Novel</span>.
                        </p>
                    </div>
                </motion.div>


                {/* --- MILESTONES SECTION --- */}
                <motion.div variants={itemVariants} className="md:col-span-12">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-1 bg-slate-800 rounded-full"></span> Milestones Unlocked
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {milestones.map((m, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className={`${m.color} rounded-2xl p-4 flex items-center gap-4 border border-current/10`}>
                                <div className="text-3xl bg-white/50 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    {m.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase opacity-70 mb-1">{m.label}</p>
                                    <p className="font-bold leading-tight">{m.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- DNA / RADAR SECTION --- */}
                <motion.div variants={itemVariants} className="md:col-span-6 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Reaction Radar</h3>
                            <p className="text-slate-500 text-sm">How people engaged with you</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Simple CSS-only Radar Chart Representation */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Axis Lines */}
                            {[0, 72, 144, 216, 288].map((deg) => (
                                <div key={deg} className="absolute w-full h-wx bg-slate-100 top-1/2 left-0 -translate-y-1/2" style={{ transform: `rotate(${deg}deg)` }}></div>
                            ))}
                            {/* Polygon approximation (Pentagon) */}
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                                <polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                                <polygon points="50,25 75,45 65,75 35,75 25,45" fill="none" stroke="#e2e8f0" strokeWidth="1" />

                                {/* Data Shape (Mocked for visual based on data)
                                    Love (Top-Leftish): High
                                    Celebrate (Bottom-Left): Medium
                                    Insight (Top): Low
                                    Funny (Right): Very Low
                                    Empathy (Bottom-Right): Low-Medium
                                */}
                                <path d="M50,35 L85,42 L70,85 L20,80 L15,35 Z" fill="rgba(0, 119, 181, 0.2)" stroke="#0077B5" strokeWidth="2" />
                            </svg>

                            {/* Reaction Icons Positioned Absolute */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white shadow-sm p-1 rounded-full">{reactionRadar[2].icon}</div> {/* Insight */}
                            <div className="absolute top-[35%] right-[5%] bg-white shadow-sm p-1 rounded-full">{reactionRadar[3].icon}</div> {/* Funny */}
                            <div className="absolute bottom-[10%] right-[20%] bg-white shadow-sm p-1 rounded-full">{reactionRadar[4].icon}</div> {/* Empathy */}
                            <div className="absolute bottom-[10%] left-[20%] bg-white shadow-sm p-1 rounded-full">{reactionRadar[1].icon}</div> {/* Celebrate */}
                            <div className="absolute top-[35%] left-[5%] bg-white shadow-sm p-1 rounded-full">{reactionRadar[0].icon}</div> {/* Love */}

                            {/* Center Value */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-slate-300 font-bold text-4xl opacity-20">DNA</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600">
                        {reactionRadar.map((r, i) => (
                            <div key={i} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                                {r.icon} <span>{r.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- HALL OF FAME / NETWORK SECTION --- */}
                <motion.div variants={itemVariants} className="md:col-span-6 bg-[#001D3D] text-white rounded-3xl p-6 shadow-lg flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold">Hall of Fame</h3>
                            <p className="text-blue-300 text-sm">Your top supporters</p>
                        </div>
                        <IoStatsChartOutline className="text-3xl text-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                        {supporters.map((person, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 transition-colors"
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${['bg-yellow-500', 'bg-gray-300', 'bg-orange-400'][i] || 'bg-blue-500'} text-black`}>
                                    {person.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-sm truncate">{person.name}</p>
                                    <p className="text-[10px] text-blue-300 uppercase tracking-wide">{person.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-auto pt-6 text-center">
                        <p className="text-xs text-blue-400/60">Updated just now • Based on interactions</p>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default LinkedInUnwrapped;
