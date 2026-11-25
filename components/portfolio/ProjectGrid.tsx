import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectBrowser.module.css";

export function ProjectGrid({ projects, headingLevel = 3 }: { projects: ProjectMeta[]; headingLevel?: 2 | 3 }) {
  return (
    <div className={styles.grid}>
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
