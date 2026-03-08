import { useRef, useState } from "react";
import {
  IoEyeOutline,
  IoCodeSlashOutline,
  IoOpenOutline,
} from "react-icons/io5";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  link: string;
  onClick?: () => void;
  className?: string;
  usePixelatedFont?: boolean;
  video?: string;
  projectType?: string;
  techStack?: string[];
  description?: string;
}

const ProjectCard = ({
  title,
  category,
  image,
  onClick,
  className,
  usePixelatedFont = false,
  video,
  techStack = [],
//   description= "",
}: ProjectCardProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 600, damping: 120 });
  const mouseY = useSpring(y, { stiffness: 600, damping: 120 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);

  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl aspect-[3/4] cursor-pointer ${className || ""}`}
      onClick={onClick}
      data-cursor="hover"
    >
      {/* Animated neon border glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-[1px] rounded-2xl z-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, var(--neon-blue), rgba(168,85,247,0.8), var(--neon-blue))",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* Outer glow halo */}
      <div
        className={`
          absolute -inset-2 rounded-3xl pointer-events-none transition-all duration-500 blur-xl
          ${
            isHovered
              ? "opacity-40 bg-gradient-to-br from-neon-blue via-purple-500 to-cyan-400"
              : "opacity-0"
          }
        `}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 z-10"
      >
        {/* Specular shine layer */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.12), transparent 60%)`,
          }}
        />

        {/* Category badge — top-left */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/60 text-neon-blue border border-neon-blue/30 backdrop-blur-sm">
            <IoCodeSlashOutline className="text-[8px]" />
            {category}
          </span>
        </div>

        {/* View indicator — top-right (visible on hover) */}
        <div className="absolute top-3 right-3 z-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
            className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center shadow-[0_0_10px_rgba(0,191,255,0.8)]"
          >
            <IoOpenOutline className="text-black text-sm" />
          </motion.div>
        </div>

        {/* Media */}
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}

        {/* Bottom info overlay — slides up on hover */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 p-4 flex flex-col gap-2"
          style={{ transform: "translateZ(40px)" }}
          initial={false}
        >
          {/* Gradient fog from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

          {/* Title */}
          <h3
            className={`
              relative text-white text-sm font-bold leading-tight drop-shadow-lg
              ${usePixelatedFont ? "font-pixelated text-[10px]" : ""}
            `}
          >
            {title}
          </h3>

          {/* Tech stack pills — only on hover */}
          <AnimatePresence>
            {isHovered && techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-wrap gap-1"
              >
                {techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neon-blue/20 text-neon-blue border border-neon-blue/30 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/10 text-white/60 border border-white/10">
                    +{techStack.length - 3}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* View details CTA */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.05 }}
                className="relative flex items-center gap-1.5 text-neon-blue text-[10px] font-semibold tracking-widest uppercase"
              >
                <IoEyeOutline />
                View Project
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.li>
  );
};

export default ProjectCard;
