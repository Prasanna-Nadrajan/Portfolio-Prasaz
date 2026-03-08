import { useState, useMemo, useRef } from "react";
import type { JSX } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ProjectStarmap from "../components/ProjectStarmap";
import { projectCategories, projects } from "../data/projects";
import type { Project } from "../types";
import SEO from "../components/SEO";
import {
  IoCodeSlashOutline,
  IoBriefcaseOutline,
  IoLayersOutline,
  IoStarOutline,
  IoGridOutline,
  IoAppsOutline,
} from "react-icons/io5";

const categoryIcons: Record<string, JSX.Element> = {
  All: <IoGridOutline />,
  Python: <IoCodeSlashOutline />,
  Frontend: <IoLayersOutline />,
  "Full Stack": <IoAppsOutline />,
};

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const freelanceProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.projectType === "Freelance" &&
          (filter === "All" || p.category === filter),
      ),
    [filter],
  );

  const personalProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!p.projectType || p.projectType === "Personal") &&
          (filter === "All" || p.category === filter),
      ),
    [filter],
  );

  const totalProjects = projects.length;
  const freelanceCount = projects.filter(
    (p) => p.projectType === "Freelance",
  ).length;
  const personalCount = projects.filter(
    (p) => !p.projectType || p.projectType === "Personal",
  ).length;

  return (
    <article className="portfolio active" data-page="portfolio">
      <SEO
        title="Portfolio"
        description="Explore my portfolio of data science, machine learning, and web development projects."
      />

      {/* ── CINEMATIC HEADER ── */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, y: headerY }}
        className="relative mb-10"
      >
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-mono text-neon-blue tracking-[0.3em] uppercase mb-2 opacity-70">
              [ SYSTEM :: PROJECT_VAULT ]
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-main-text leading-none tracking-tight">
              My{" "}
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: "1px var(--neon-blue)",
                  color: "transparent",
                }}
              >
                Portfolio
              </span>
            </h2>
          </div>

          {/* Live Stats Capsules */}
          <div className="flex gap-3 flex-wrap">
            {[
              {
                label: "Total",
                value: totalProjects,
                color: "from-neon-blue/20 to-neon-blue/5 border-neon-blue/30",
              },
              {
                label: "Freelance",
                value: freelanceCount,
                color:
                  "from-purple-500/20 to-purple-500/5 border-purple-500/30",
              },
              {
                label: "Personal",
                value: personalCount,
                color: "from-cyan-400/20 to-cyan-400/5 border-cyan-400/30",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br ${stat.color} border backdrop-blur-sm`}
              >
                <span className="text-xl font-black text-main-text font-mono">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-secondary-text">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-neon-blue via-purple-500 to-transparent opacity-40" />
      </motion.div>

      {/* ── STARMAP ── */}
      <div className="mb-14 relative">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-blue/5 via-transparent to-purple-500/5 pointer-events-none" />
        <ProjectStarmap />
        <p className="text-center text-xs font-mono text-secondary-text mt-3 opacity-50 tracking-widest">
          ▲ MISSION TIMELINE — INTERACTIVE CONSTELLATION MAP
        </p>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="mb-10 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono text-secondary-text mr-2 tracking-widest uppercase">
          Filter:
        </span>
        {projectCategories.map((category) => {
          const isActive = filter === category;
          return (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden
                ${
                  isActive
                    ? "text-black bg-neon-blue shadow-[0_0_20px_rgba(0,191,255,0.5)]"
                    : "text-secondary-text bg-onyx/60 border border-jet hover:border-neon-blue/40 hover:text-neon-blue"
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-bg"
                  className="absolute inset-0 bg-neon-blue"
                  style={{ borderRadius: "inherit" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {categoryIcons[category] || <IoStarOutline />}
                {category}
              </span>
              {isActive && (
                <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── FREELANCE SECTION ── */}
      <AnimatePresence>
        {freelanceProjects.length > 0 && (
          <motion.section
            key="freelance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-16"
          >
            <SectionHeader
              title="Freelance Projects"
              subtitle={`${freelanceProjects.length} client projects`}
              accentColor="neon-blue"
              icon={<IoBriefcaseOutline />}
            />
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
              <AnimatePresence mode="popLayout">
                {freelanceProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProjectCard
                      {...project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ul>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── PERSONAL SECTION ── */}
      <AnimatePresence>
        {personalProjects.length > 0 && (
          <motion.section
            key="personal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <SectionHeader
              title="Personal Projects"
              subtitle={`${personalProjects.length} passion builds`}
              accentColor="purple-500"
              icon={<IoStarOutline />}
            />
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
              <AnimatePresence mode="popLayout">
                {personalProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProjectCard
                      {...project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ul>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {freelanceProjects.length === 0 && personalProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-secondary-text"
        >
          <IoGridOutline className="text-5xl mx-auto mb-4 opacity-30" />
          <p className="font-mono text-sm">No projects in this category.</p>
        </motion.div>
      )}

      {/* ── PROJECT MODAL ── */}
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

/* ── Section Header Component ── */
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  accentColor: string;
  icon: JSX.Element;
}

const SectionHeader = ({
  title,
  subtitle,
  accentColor,
  icon,
}: SectionHeaderProps) => (
  <div className="flex items-center gap-4">
    {/* Glowing Icon Box */}
    <div
      className={`
        w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
        bg-gradient-to-br from-${accentColor}/20 to-${accentColor}/5
        border border-${accentColor}/30
        shadow-[0_0_15px_rgba(0,191,255,0.15)]
        text-${accentColor}
      `}
    >
      {icon}
    </div>

    <div className="flex-1">
      <div className="flex items-baseline gap-3">
        <h2 className="text-xl font-bold text-main-text tracking-tight">
          {title}
        </h2>
        <span className="text-xs font-mono text-secondary-text opacity-60">
          {subtitle}
        </span>
      </div>
      {/* Accent line */}
      <div
        className={`mt-1 h-px w-full bg-gradient-to-r from-${accentColor}/60 via-${accentColor}/20 to-transparent`}
      />
    </div>

    {/* Terminal-style label */}
    <span className="hidden md:flex items-center gap-1 text-[10px] font-mono text-secondary-text opacity-40 tracking-widest uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      active
    </span>
  </div>
);

export default Portfolio;
