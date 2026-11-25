import type { Metadata } from "next";
import { Pixel } from "@/components/art/Pixel";
import { Breadcrumb } from "@/components/portfolio/Breadcrumb";
import { ProjectBrowser } from "@/components/portfolio/ProjectBrowser";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've designed and built.",
};

export default function ProjectsPage() {
  return (
    <div className="container page">
      <Breadcrumb items={[{ label: "World", href: "/" }, { label: "Projects" }]} />
      <h1 className="page-title section-head">
        <Pixel sprite="chest" size={36} />
        Projects
      </h1>
      <p className="section-sub">Every chest I&apos;ve filled. Filter by technology or search.</p>
      <div data-xp="list">
        <ProjectBrowser projects={getAllProjects()} />
      </div>
    </div>
  );
}
