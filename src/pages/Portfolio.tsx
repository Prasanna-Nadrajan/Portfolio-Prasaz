import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import SecretHint from '../components/SecretHint';
import ProjectStarmap from '../components/ProjectStarmap';
import { projectCategories, projects } from '../data/projects';
import type { Project } from '../types';
import SEO from '../components/SEO';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = useMemo(() => {
        if (filter === 'All') return projects;
        return projects.filter(project => project.category === filter);
    }, [filter]);

    return (
        <article className="portfolio active animate-fade-in" data-page="portfolio">
            <SEO
                title="Portfolio"
                description="Explore my portfolio of data science, machine learning, and web development projects."
            />

            <header>
                <SecretHint hint="Try pressing Ctrl+Shift+H..." position="bottom-right" delay={3000} />

                {/* Introduction Visualization */}
                <div className="mb-12">
                    <ProjectStarmap />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {projectCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${filter === category
                                ? 'bg-neon-blue text-black shadow-neon font-bold'
                                : 'bg-onyx text-light-gray-70 hover:text-neon-blue hover:bg-jet'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Freelance Projects Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-neon-blue pl-4">
                        Freelance Projects
                    </h2>

                    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredProjects
                            .filter(p => p.projectType === 'Freelance')
                            .map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    {...project}
                                    onClick={() => {
                                        setSelectedProject(project);
                                    }}
                                />
                            ))}
                    </ul>
                </section>

                {/* Personal Projects Section */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">
                        Personal Projects
                    </h2>

                    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredProjects
                            .filter(p => !p.projectType || p.projectType === 'Personal')
                            .map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    {...project}
                                    onClick={() => {
                                        setSelectedProject(project);
                                    }}
                                />
                            ))}
                    </ul>
                </section>
            </header>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </article>
    );
};

export default Portfolio;