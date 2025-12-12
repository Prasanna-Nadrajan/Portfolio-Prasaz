import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IoCodeSlashOutline,
    IoLibraryOutline,
    IoConstructOutline,
    IoServerOutline,
    IoAnalyticsOutline,
    IoPlanetOutline,
    IoListOutline
} from 'react-icons/io5';
import SkillsGalaxy from './SkillsGalaxy';

const allSkills = [
    { name: "Python", category: "Languages", level: 90 },
    { name: "SQL", category: "Languages", level: 85 },
    { name: "JavaScript", category: "Languages", level: 80 },
    { name: "TypeScript", category: "Languages", level: 75 },
    { name: "Java", category: "Languages", level: 70 },
    { name: "HTML/CSS", category: "Languages", level: 85 },

    { name: "React.js", category: "Libraries & Frameworks", level: 85 },
    { name: "Pandas", category: "Libraries & Frameworks", level: 90 },
    { name: "NumPy", category: "Libraries & Frameworks", level: 85 },
    { name: "Scikit-learn", category: "Libraries & Frameworks", level: 80 },
    { name: "Node.js", category: "Libraries & Frameworks", level: 75 },
    { name: "Express.js", category: "Libraries & Frameworks", level: 75 },
    { name: "Tailwind CSS", category: "Libraries & Frameworks", level: 90 },

    { name: "Power BI", category: "Tools & Platforms", level: 85 },
    { name: "Tableau", category: "Tools & Platforms", level: 80 },
    { name: "Excel", category: "Tools & Platforms", level: 95 },
    { name: "Git & GitHub", category: "Tools & Platforms", level: 85 },
    { name: "VS Code", category: "Tools & Platforms", level: 90 },
    { name: "Jupyter", category: "Tools & Platforms", level: 85 },

    { name: "MongoDB", category: "Databases & Others", level: 80 },
    { name: "MySQL", category: "Databases & Others", level: 85 },
    { name: "PostgreSQL", category: "Databases & Others", level: 80 },
    { name: "REST APIs", category: "Databases & Others", level: 80 },
    { name: "Machine Learning", category: "Databases & Others", level: 80 }
];

const categories = [
    { name: "All", icon: <IoAnalyticsOutline /> },
    { name: "Languages", icon: <IoCodeSlashOutline /> },
    { name: "Libraries & Frameworks", icon: <IoLibraryOutline /> },
    { name: "Tools & Platforms", icon: <IoConstructOutline /> },
    { name: "Databases & Others", icon: <IoServerOutline /> }
];

const SkillVisualization = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [viewMode, setViewMode] = useState<'list' | 'galaxy'>('list');

    const filteredSkills = activeCategory === "All"
        ? allSkills
        : allSkills.filter(skill => skill.category === activeCategory);

    return (
        <section className="skills-viz my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="h3 service-title text-xl font-semibold">Technical Proficiency</h3>

                <div className="flex bg-onyx rounded-lg p-1 border border-jet">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-neon-blue text-white shadow-neon' : 'text-light-gray-70 hover:text-white'}`}
                        title="List View"
                    >
                        <IoListOutline />
                    </button>
                    <button
                        onClick={() => setViewMode('galaxy')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'galaxy' ? 'bg-neon-blue text-white shadow-neon' : 'text-light-gray-70 hover:text-white'}`}
                        title="Galaxy View"
                    >
                        <IoPlanetOutline />
                    </button>
                </div>
            </div>

            {viewMode === 'galaxy' ? (
                <SkillsGalaxy />
            ) : (
                <>
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat.name
                                    ? 'bg-neon-blue text-white shadow-neon'
                                    : 'bg-onyx text-light-gray-70 hover:bg-jet hover:text-main-text'
                                    }`}
                            >
                                {cat.icon}
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Skills Content */}
                    <div className="skills-content">
                        {activeCategory === "All" ? (
                            // Grouped Card View for "All"
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categories.filter(c => c.name !== "All").map((cat) => (
                                    <motion.div
                                        key={cat.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="category-card bg-border-gradient-onyx p-6 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10"
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                            <span className="text-neon-blue text-xl bg-jet/50 p-2 rounded-lg">{cat.icon}</span>
                                            {cat.name}
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {allSkills.filter(skill => skill.category === cat.name).map((skill) => (
                                                <span
                                                    key={skill.name}
                                                    className="px-3 py-1.5 bg-jet/50 text-light-gray-70 text-sm font-medium rounded-lg border border-jet hover:text-neon-blue hover:border-neon-blue/30 transition-colors duration-300 cursor-default"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            // Detailed View for Specific Category
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {filteredSkills.map((skill) => (
                                        <motion.div
                                            layout
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-border-gradient-onyx p-4 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10 group hover:-translate-y-1 transition-transform duration-300"
                                            data-cursor="hover"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-main-text font-medium text-sm">{skill.name}</span>
                                                <span className="text-neon-blue text-xs font-bold">{skill.level}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-jet rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="h-full bg-neon-blue rounded-full"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default SkillVisualization;
