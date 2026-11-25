import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Pixel } from "@/components/art/Pixel";
import { Figure, Gallery, Item, Tip } from "@/components/portfolio/ArticleParts";
import { Breadcrumb } from "@/components/portfolio/Breadcrumb";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { MinecraftBadge } from "@/components/mc/MinecraftBadge";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import { getAllProjects, getProject, getRelatedProjects } from "@/lib/projects";
import styles from "./project.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary } };
}

const mdxComponents = { Tip, Figure, Gallery, Item };

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const related = getRelatedProjects(project);

  return (
    <div className="container page">
      <Breadcrumb items={[{ label: "World", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]} />

      <article className={styles.article}>
        <header className={styles.header} data-xp="header">
          <div className={styles.badges}>
            <MinecraftBadge tone={project.status === "Completed" ? "accent" : "gold"}>{project.status}</MinecraftBadge>
            {project.rarity !== "common" && <MinecraftBadge tone={project.rarity}>{project.rarity}</MinecraftBadge>}
            {project.sample && <MinecraftBadge tone="sample">Sample project</MinecraftBadge>}
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <dl className={styles.meta}>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.date.slice(0, 4)}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.tags.join(", ")}</dd>
            </div>
          </dl>
          {(project.demo || project.repo) && (
            <div className={styles.links}>
              {project.demo && (
                <MinecraftButton href={project.demo} variant="grass" icon={<Pixel sprite="compass" size={18} />}>
                  Live demo
                </MinecraftButton>
              )}
              {project.repo && (
                <MinecraftButton href={project.repo} icon={<Pixel sprite="writableBook" size={18} />}>
                  Source code
                </MinecraftButton>
              )}
            </div>
          )}
        </header>

        <Figure scene={project.scene} alt={project.coverAlt} />

        <div className={`prose ${styles.body}`} data-xp="body">
          {project.sample && (
            <Tip variant="info" title="Sample content">
              <p>This is a placeholder project. Replace it with your own in content/projects.</p>
            </Tip>
          )}
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>
      </article>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title" data-xp="related">
          <h2 id="related-title" className="section-head">
            <Pixel sprite="map" size={26} />
            Related projects
          </h2>
          <ProjectGrid projects={related} />
        </section>
      )}

      <p className={styles.back}>
        <Link href="/projects">‹ Back to all projects</Link>
      </p>
    </div>
  );
}
