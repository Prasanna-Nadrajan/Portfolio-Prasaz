import { motion } from 'framer-motion';

const skills = [
    { name: 'Python', icon: '/assets/images/python.png' },
    { name: 'MySQL', icon: '/assets/images/mysql.png' },
    { name: 'Power BI', icon: '/assets/images/powerbi.png' },
    { name: 'Excel', icon: '/assets/images/excel.png' },
    { name: 'VS Code', icon: '/assets/images/vscode.png' },
    { name: 'Java', icon: '/assets/images/java.png' },
    { name: 'GitHub', icon: '/assets/images/github.png' },
    { name: 'Statistics', icon: '/assets/images/statistics.png' },
    { name: 'MongoDB', icon: '/assets/images/mongodb.png' },
    { name: 'AI', icon: '/assets/images/ai.png' },
];

const SkillCloud = () => {
    return (
        <section className="my-8 overflow-hidden">
            <h3 className="h3 service-title text-xl font-semibold mb-6">Skills</h3>
            {/* Removed 'relative' and kept flex to align children side-by-side */}
            <div className="flex mask-image-linear-gradient overflow-hidden w-full">
                <motion.div
                    className="flex gap-8 shrink-0 pr-8" // Added pr-8 to maintain gap between list 1 and 2
                    animate={{ x: '-100%' }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Increased duration slightly for smoother read
                    }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flexHf flex-col items-center justify-center w-20 h-20 bg-border-gradient-onyx rounded-xl p-3 shadow-neon shrink-0">
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </motion.div>
                
                <motion.div
                    className="flex gap-8 shrink-0 pr-8" // Removed absolute positioning
                    animate={{ x: '-100%' }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div key={`duplicate-${index}`} className="flex flex-col items-center justify-center w-20 h-20 bg-border-gradient-onyx rounded-xl p-3 shadow-neon shrink-0">
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillCloud;