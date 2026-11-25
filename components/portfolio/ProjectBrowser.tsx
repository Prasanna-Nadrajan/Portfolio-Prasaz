"use client";

import { useMemo, useState } from "react";
import { Pixel } from "@/components/art/Pixel";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectBrowser.module.css";

export function ProjectBrowser({ projects }: { projects: ProjectMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [projects]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) => (!tag || p.tags.includes(tag)) && (!q || [p.title, p.summary, ...p.tags].some((s) => s.toLowerCase().includes(q))),
    );
  }, [projects, query, tag]);

  return (
    <div className={styles.browser}>
      <form className={styles.controls} role="search" onSubmit={(e) => e.preventDefault()}>
        <label className={styles.search}>
          <span className="visually-hidden">Search projects</span>
          <Pixel sprite="spyglass" size={22} />
          <input type="search" value={query} placeholder="Search projects…" onChange={(e) => setQuery(e.target.value)} />
        </label>
      </form>

      <div className={styles.filters} role="group" aria-label="Filter by technology">
        <button type="button" className={styles.filter} aria-pressed={tag === null} onClick={() => setTag(null)}>
          <Pixel sprite="chest" size={18} />
          All <span>{projects.length}</span>
        </button>
        {tags.map(([t, n]) => (
          <button key={t} type="button" className={styles.filter} aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
            {t} <span>{n}</span>
          </button>
        ))}
      </div>

      <p className={styles.count} aria-live="polite">
        {visible.length === 0 ? "No projects found." : `${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
      </p>

      {visible.length > 0 ? (
        <div className={styles.grid}>
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Pixel sprite="sheep" size={72} />
          <p>Nothing here but a sheep. Try another search.</p>
        </div>
      )}
    </div>
  );
}
