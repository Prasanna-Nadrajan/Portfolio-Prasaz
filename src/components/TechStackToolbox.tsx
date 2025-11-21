import { motion } from 'framer-motion';
import { 
    IoCodeSlashOutline, 
    IoLibraryOutline, 
    IoConstructOutline, 
    IoServerOutline 
} from 'react-icons/io5';

const techStack = [
    {
        category: "Languages",
        icon: <IoCodeSlashOutline />,
        skills: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "HTML/CSS"]
    },
    {
        category: "Libraries & Frameworks",
        icon: <IoLibraryOutline />,
        skills: ["React.js", "Pandas", "NumPy", "Scikit-learn", "Node.js", "Express.js", "Tailwind CSS"]
    },
    {
        category: "Tools & Platforms",
        icon: <IoConstructOutline />,
        skills: ["Power BI", "Tableau", "Excel", "Git & GitHub", "VS Code", "Jupyter Notebook"]
    },
    {
        category: "Databases & Others",
        icon: <IoServerOutline />,
        skills: ["MongoDB", "MySQL", "PostgreSQL", "REST APIs", "Machine Learning"]
    }
];

const TechStackToolbox = () => {
    return (
        <section className="tech-toolbox my-8">
            <h3 className="h3 service-title text-xl font-semibold mb-6">Tech Stack</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStack.map((stack, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="toolbox-item bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4 border-b border-jet pb-3">
                            <div className="text-neon-blue text-xl bg-onyx p-2 rounded-lg shadow-sm">
                                {stack.icon}
                            </div>
                            <h4 className="text-lg font-medium text-main-text">{stack.category}</h4>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {stack.skills.map((skill, i) => (
                                <span 
                                    key={i} 
                                    className="text-xs font-medium text-secondary-text bg-onyx px-3 py-1.5 rounded-lg border border-jet hover:text-neon-blue hover:border-neon-blue/30 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TechStackToolbox;