import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SceneKind } from "@/components/art/PixelScene";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  role: string;
  status: "Completed" | "In progress";
  rarity: Rarity;
  scene: SceneKind;
  coverAlt: string;
  demo?: string;
  repo?: string;
  featured: boolean;
  sample: boolean;
}

export interface Project extends ProjectMeta {
  content: string;
}

// All content access goes through this module, so swapping MDX files for a CMS
// only means reimplementing these functions.
const DIR = path.join(process.cwd(), "content", "projects");

let cache: Project[] | null = null;

function load(): Project[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title,
        summary: data.summary,
        date: new Date(data.date).toISOString(),
        tags: data.tags ?? [],
        role: data.role ?? "Solo project",
        status: data.status ?? "Completed",
        rarity: data.rarity ?? "common",
        scene: data.scene ?? "plains",
        coverAlt: data.coverAlt ?? data.title,
        demo: data.demo,
        repo: data.repo,
        featured: Boolean(data.featured),
        sample: data.sample !== false,
        content,
      } satisfies Project;
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));
  return cache;
}

const meta = ({ content: _content, ...rest }: Project): ProjectMeta => rest;

export const getAllProjects = (): ProjectMeta[] => load().map(meta);

export const getProject = (slug: string): Project | undefined => load().find((p) => p.slug === slug);

export const getFeaturedProject = (): ProjectMeta | undefined => getAllProjects().find((p) => p.featured);

export function getRelatedProjects(project: ProjectMeta, limit = 3): ProjectMeta[] {
  return getAllProjects()
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => project.tags.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}
