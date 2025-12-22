import { useRef } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    category: string;
    image: string;
    link: string;
    onClick?: () => void;
    className?: string;
    usePixelatedFont?: boolean;
    video?: string;
    // Add projectType to props if needed, though strictly we just display title/cat/image
    projectType?: string;
}

const ProjectCard = ({ title, category, image, onClick, className, usePixelatedFont = false, video }: ProjectCardProps) => {
    const ref = useRef<HTMLLIElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["35deg", "-35deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-35deg", "35deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.li
            ref={ref}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`project-item active group relative rounded-xl aspect-[3/4] cursor-pointer ${className || ''}`}
            onClick={onClick}
            data-cursor="hover"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative rounded-xl overflow-hidden shadow-neon bg-gray-900"
            >
                {/* Shine Effect */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
                    }}
                />

                {/* Media Background */}
                {video ? (
                    <video
                        src={video}
                        poster={image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transform translate-z-0"
                    />
                ) : (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform translate-z-0"
                        loading="lazy"
                    />
                )}

                {/* Hover Content Overlay */}
                <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-20"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <div className="bg-jet text-neon-blue p-3 rounded-full mb-3 shadow-lg transform translate-z-20">
                        <IoEyeOutline size={24} />
                    </div>

                    <h3 className={`text-white text-base font-bold mb-1 transform translate-z-30 ${usePixelatedFont ? 'font-pixelated' : ''}`}>
                        {title}
                    </h3>

                    <p className="text-neon-blue text-sm font-light transform translate-z-20">
                        {category}
                    </p>
                </div>
            </motion.div>
        </motion.li>
    );
};

export default ProjectCard;
