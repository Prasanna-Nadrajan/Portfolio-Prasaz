import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLogoGithub, IoOpenOutline } from 'react-icons/io5';

interface ProjectModalProps {
    project: any;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!project) return null;

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-border-gradient-onyx rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-jet"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-light-gray-70 hover:text-neon-blue transition-colors z-10 bg-onyx/50 rounded-full p-2"
                    >
                        <IoClose size={24} />
                    </button>

                    <figure className="w-full h-64 md:h-80 overflow-hidden relative shrink-0">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-onyx to-transparent"></div>
                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                            <span className="text-neon-blue text-sm font-medium bg-jet/80 px-3 py-1 rounded-lg mb-2 inline-block backdrop-blur-md">
                                {project.category}
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold text-white shadow-black drop-shadow-lg">{project.title}</h2>
                        </div>
                    </figure>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-main-text mb-4">Project Overview</h3>
                                <p className="text-secondary-text leading-relaxed mb-6">
                                    {project.description || "This project showcases advanced implementation of " + project.category + " concepts. It solves real-world problems using efficient algorithms and modern design patterns."}
                                </p>

                                <h3 className="text-xl font-semibold text-main-text mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack ? (
                                        project.techStack.map((tech: string) => (
                                            <span key={tech} className="px-3 py-1 bg-jet rounded-lg text-sm text-light-gray-70 border border-jet">
                                                {tech}
                                            </span>
                                        ))
                                    ) : (
                                        // Fallback if no specific tech stack is provided
                                        <>
                                            <span className="px-3 py-1 bg-jet rounded-lg text-sm text-light-gray-70 border border-jet">React</span>
                                            <span className="px-3 py-1 bg-jet rounded-lg text-sm text-light-gray-70 border border-jet">TypeScript</span>
                                            <span className="px-3 py-1 bg-jet rounded-lg text-sm text-light-gray-70 border border-jet">Tailwind CSS</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 space-y-6">
                                <div className="bg-jet/30 p-6 rounded-xl border border-jet">
                                    <h4 className="text-lg font-semibold text-main-text mb-4">Links</h4>
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-secondary-text hover:text-neon-blue transition-colors group"
                                        >
                                            <IoLogoGithub size={20} />
                                            <span className="font-medium">View Code</span>
                                            <IoOpenOutline className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        {/* Placeholder for Live Demo if available */}
                                        {/* <a href="#" className="flex items-center gap-3 text-secondary-text hover:text-neon-blue transition-colors group">
                                            <IoGlobeOutline size={20} />
                                            <span className="font-medium">Live Demo</span>
                                            <IoOpenOutline className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a> */}
                                    </div>
                                </div>

                                <div className="bg-jet/30 p-6 rounded-xl border border-jet">
                                    <h4 className="text-lg font-semibold text-main-text mb-2">Challenges</h4>
                                    <p className="text-sm text-secondary-text">
                                        Overcoming performance bottlenecks and ensuring responsive design across all devices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default ProjectModal;
