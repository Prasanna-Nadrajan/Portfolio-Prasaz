import { useState, useMemo } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projectCategories, projects } from '../data/projects';
import type { Project } from '../types';
import SEO from '../components/SEO';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

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
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Portfolio</h2>
            </header>

            <section className="projects">
                {/* Filter Buttons for Desktop */}
                <ul className="filter-list hidden md:flex justify-start items-center gap-6 mb-8 pl-1">
                    {projectCategories.map((category) => (
                        <li key={category} className="filter-item">
                            <button
                                onClick={() => setFilter(category)}
                                className={`text-sm transition-colors duration-300 ${filter === category ? 'text-neon-blue font-medium' : 'text-secondary-text hover:text-light-gray-70'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Filter Select for Mobile */}
                <div className="filter-select-box md:hidden relative mb-6">
                    <button
                        className={`filter-select w-full bg-border-gradient-onyx p-3 rounded-xl flex justify-between items-center border border-jet text-light-gray-70 text-sm ${isSelectOpen ? 'active' : ''}`}
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                    >
                        <div className="select-value">{filter}</div>
                        <div className="select-icon">
                            <IoChevronDown className={`transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    {isSelectOpen && (
                        <ul className="select-list bg-onyx absolute top-full left-0 w-full p-2 rounded-xl border border-jet shadow-neon z-20 mt-2">
                            {projectCategories.map((category) => (
                                <li key={category} className="select-item">
                                    <button
                                        onClick={() => {
                                            setFilter(category);
                                            setIsSelectOpen(false);
                                        }}
                                        className="w-full text-left p-2 text-secondary-text text-sm hover:bg-jet rounded-lg transition-colors"
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Projects Grid */}
                <ul className="project-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                category={project.category}
                                image={project.image}
                                link={project.link}
                                onClick={() => setSelectedProject(project)}
                                className="cursor-pointer"
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </article>
    );
};

export default Portfolio;