import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// interface StarNode {
//     id: number;
//     x: number;
//     y: number;
//     size: number;
//     project: string;
//     category: string;
// }

// Generate random stars for the background
const generateBackgroundStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
    }));
};

const PROJECTS = [
    { id: 1, name: "Portfolio V1", category: "HTML/CSS/JS", x: 20, y: 15 },
    { id: 2, name: "HealthCare", category: "Python", x: 45, y: 25 },
    { id: 3, name: "Code Analyser", category: "Python", x: 75, y: 35 },
    { id: 4, name: "FreeLance", category: "any", x: 30, y: 55 },
    { id: 5, name: "Portfolio V2", category: "React", x: 60, y: 65 },
    { id: 6, name: "Mini OTT", category: "React", x: 80, y: 80 },
];

export default function ProjectStarmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bgStars] = useState(() => generateBackgroundStars(50));
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[600px] bg-black overflow-hidden my-20 rounded-xl border border-cyan-900/30">

            {/* Background Stars */}
            <div className="absolute inset-0">
                {bgStars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Constellation Layer */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-10">
                <svg className="w-full h-full">
                    {/* Connection Lines */}
                    {PROJECTS.map((project, i) => {
                        if (i === PROJECTS.length - 1) return null;
                        const next = PROJECTS[i + 1];
                        return (
                            <line
                                key={`line-${i}`}
                                x1={`${project.x}%`}
                                y1={`${project.y}%`}
                                x2={`${next.x}%`}
                                y2={`${next.y}%`}
                                stroke="cyan"
                                strokeWidth="1"
                                strokeOpacity="0.3"
                                strokeDasharray="5,5"
                            />
                        );
                    })}

                    {/* Project Nodes */}
                    {PROJECTS.map((project) => (
                        <g key={project.id} className="cursor-pointer group">
                            <circle
                                cx={`${project.x}%`}
                                cy={`${project.y}%`}
                                r="6"
                                fill="#06b6d4"
                                className="group-hover:r-8 transition-all duration-300"
                            />
                            <circle
                                cx={`${project.x}%`}
                                cy={`${project.y}%`}
                                r="12"
                                fill="#06b6d4"
                                className="opacity-20 animate-ping"
                            />

                            <switch>
                                <foreignObject
                                    x={`${project.x - 10}%`}
                                    y={`${project.y + 5}%`}
                                    width="20%"
                                    height="100"
                                >
                                    <div className="text-center">
                                        <span className="text-cyan-300 text-sm font-mono bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-cyan-500/30">
                                            {project.name}
                                        </span>
                                    </div>
                                </foreignObject>
                            </switch>
                        </g>
                    ))}
                </svg>
            </motion.div>

            <div className="absolute bottom-5 left-5 text-cyan-500/50 font-mono text-xs">
                <p>MISSION: EXPLORATION</p>
                <p>SECTOR: PROJECT_HISTORY</p>
            </div>
        </div>
    );
}
