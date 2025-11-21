import { IoEyeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    link: string;
}

const ProjectCard = ({ title, category, image, link }: ProjectCardProps) => {
    return (
        <motion.li
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="project-item active"
        >
            <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
                <figure className="project-img relative rounded-2xl overflow-hidden mb-4 group">
                    <div className="project-item-icon-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-jet text-neon-blue p-3 rounded-xl text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-neon">
                        <IoEyeOutline />
                    </div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors duration-300"></div>
                </figure>

                <h3 className="project-title text-main-text text-lg font-medium mb-1 ml-2 capitalize">{title}</h3>
                <p className="project-category text-light-gray-70 text-sm font-light ml-2 capitalize">{category}</p>
            </a>
        </motion.li>
    );
};

export default ProjectCard;
