import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import ProjectCard from '../components/ProjectCard';

const projects = [
    {
        title: "Ambulance Detecting Traffic System",
        category: "Python",
        image: "/assets/images/portfolio/Ambulance_detection.png",
        link: "https://github.com/Prasanna-Nadrajan/Ambulance_detecting_traffic_system"
    },
    {
        title: "Code Reviewer for ML-Pipelines",
        category: "Python",
        image: "/assets/images/portfolio/ai-powered-code-reviewer-for-ml-pipelines.png",
        link: "https://github.com/Prasanna-Nadrajan/AI-powered-code-review-for-ML-pipelines"
    },
    {
        title: "Loan Eligibility Predictor",
        category: "Python",
        image: "/assets/images/portfolio/loan_eligibilty.png",
        link: "https://github.com/Prasanna-Nadrajan/Loan-Eligibility-Detector"
    },
    {
        title: "eDNA Analysis using unsupervised learning",
        category: "Python",
        image: "/assets/images/portfolio/eDNA_Pipeline.png",
        link: "https://github.com/Prasanna-Nadrajan/eDNA-VAI-Pipeline"
    },
    {
        title: "Professional Blog",
        category: "Frontend",
        image: "/assets/images/portfolio/blog.png",
        link: "https://github.com/Prasanna-Nadrajan/Portfolio-Prasaz"
    },
    {
        title: "Billing Management System",
        category: "Full Stack",
        image: "/assets/images/portfolio/billing_management.png",
        link: "https://github.com/Prasanna-Nadrajan/Billing_Management_System_Using_C"
    }
];

const categories = ["All", "Python", "Frontend", "Full Stack"];

const Portfolio = () => {
    const [filter, setFilter] = useState("All");
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <article className="portfolio active animate-fade-in" data-page="portfolio">
            <header>
                <h2 className="h2 article-title text-2xl font-semibold mb-4 border-b-2 border-neon-blue w-max pb-1">Portfolio</h2>
            </header>

            <section className="projects">
                {/* Filter Buttons for Desktop */}
                <ul className="filter-list hidden md:flex justify-start items-center gap-6 mb-8 pl-1">
                    {categories.map((category) => (
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
                            {categories.map((category) => (
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
                                key={index} // Ideally use a unique ID
                                title={project.title}
                                category={project.category}
                                image={project.image}
                                link={project.link}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            </section>
        </article>
    );
};

export default Portfolio;
