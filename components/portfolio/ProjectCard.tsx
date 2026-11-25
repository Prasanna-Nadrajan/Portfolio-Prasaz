import Link from "next/link";
import { PixelScene } from "@/components/art/PixelScene";
import { MinecraftBadge } from "@/components/mc/MinecraftBadge";
import type { ProjectMeta } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

const RARITY_LABEL = { common: "Common", uncommon: "Uncommon", rare: "Rare", epic: "Epic", legendary: "Legendary" };

/** A project as a chest: hovering lifts the lid and the card rises. */
export function ProjectCard({ project, headingLevel = 3 }: { project: ProjectMeta; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;

  return (
    <article className={`${styles.card} ${styles[project.rarity]}`}>
      <div className={styles.lid} aria-hidden="true">
        <span className={styles.latch} />
      </div>
      <div className={styles.thumb}>
        <PixelScene kind={project.scene} label={project.coverAlt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={styles.scene} />
        {project.rarity !== "common" && (
          <MinecraftBadge tone={project.rarity} className={styles.rarity}>
            {RARITY_LABEL[project.rarity]}
          </MinecraftBadge>
        )}
        {project.sample && <span className={styles.sample}>Sample</span>}
      </div>
      <div className={styles.body}>
        <Heading className={styles.title}>
          <Link href={`/projects/${project.slug}`} className={styles.link}>
            {project.title}
          </Link>
        </Heading>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.tags} aria-label="Tech stack">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className={styles.meta}>
          <span className={project.status === "Completed" ? styles.done : styles.wip}>{project.status}</span>
          <span aria-hidden="true">•</span>
          <span>{project.role}</span>
        </p>
        <span className={styles.cta} aria-hidden="true">
          Open chest ›
        </span>
      </div>
    </article>
  );
}
