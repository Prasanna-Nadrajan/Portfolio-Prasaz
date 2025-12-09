import { IoEyeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    link: string;
    onClick?: () => void;
    className?: string;
    usePixelatedFont?: boolean;
    video?: string; // Optional video path
}

const ProjectCard = ({ title, category, image, onClick, className, usePixelatedFont = false, video }: ProjectCardProps) => {
    return (
        <motion.li
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`project-item active group relative rounded-xl overflow-hidden cursor-pointer h-72 shadow-neon hover:shadow-neon-hover transition-all duration-300 ${className || ''}`}
            onClick={onClick}
            data-cursor="hover"
        >
            {/* Media Background (Video or Image) */}
            {video ? (
                <video
                    src={video}
                    poster={image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                />
            ) : (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                    loading="lazy"
                />
            )}

            {/* Hover Content Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-jet text-neon-blue p-3 rounded-full mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 shadow-lg">
                    <IoEyeOutline size={24} />
                </div>

                <h3 className={`text-white text-xl font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 ${usePixelatedFont ? 'font-pixelated' : ''}`}>
                    {title}
                </h3>

                <p className="text-neon-blue text-sm font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                    {category}
                </p>
            </div>
        </motion.li>
    );
};

export default ProjectCard;