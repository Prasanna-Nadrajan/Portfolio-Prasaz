import { Pixel } from "@/components/art/Pixel";
import { PixelScene } from "@/components/art/PixelScene";
import { MinecraftBadge } from "@/components/mc/MinecraftBadge";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import type { ProjectMeta } from "@/lib/projects";
import styles from "./QuestCard.module.css";

/** Featured project, framed like a completed advancement. */
export function QuestCard({ project }: { project: ProjectMeta }) {
  return (
    <article className={styles.quest} aria-labelledby="quest-title">
      <div className={styles.art}>
        <PixelScene kind={project.scene} time="dusk" label={project.coverAlt} sizes="(min-width: 880px) 50vw, 100vw" />
      </div>
      <div className={styles.content}>
        <p className={styles.kicker}>
          <Pixel sprite="xp" size={18} />
          {project.status === "Completed" ? "Quest complete" : "Quest in progress"}
        </p>
        <h2 id="quest-title" className={styles.title}>
          {project.title}
        </h2>
        <p className={styles.summary}>{project.summary}</p>
        <dl className={styles.stats}>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.tags.slice(0, 3).join(", ")}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.date.slice(0, 4)}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <MinecraftButton href={`/projects/${project.slug}`} variant="grass" size="lg">
            View quest
          </MinecraftButton>
          <MinecraftBadge tone={project.rarity}>{project.rarity}</MinecraftBadge>
          {project.sample && <MinecraftBadge tone="sample">Sample project</MinecraftBadge>}
        </div>
      </div>
    </article>
  );
}
