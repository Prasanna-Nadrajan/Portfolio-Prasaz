import type { Metadata } from "next";
import { Pixel } from "@/components/art/Pixel";
import { Breadcrumb } from "@/components/portfolio/Breadcrumb";
import { PlayerProfile } from "@/components/portfolio/PlayerProfile";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import { MinecraftCard } from "@/components/mc/MinecraftCard";
import { experience, site, timeline } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = { title: "About", description: "Who I am, where I have worked and how I got here." };

export default function AboutPage() {
  return (
    <div className="container page">
      <Breadcrumb items={[{ label: "World", href: "/" }, { label: "About" }]} />
      <h1 className="page-title section-head">
        <Pixel sprite="sign" size={36} />
        About me
      </h1>

      <div className={styles.grid}>
        <MinecraftCard as="section" aria-labelledby="story-title" className="prose" data-xp="story">
          <h2 id="story-title">Hi, I&apos;m Prasanna</h2>
          <p>
            I&apos;m an undergraduate in Artificial Intelligence & Data Science who builds predictive machine learning systems,
            clinical diagnostic models and computer vision pipelines from first principles.
          </p>
          <p>
            I like owning a project end to end: raw data, feature engineering, training, evaluation and deployment. Minecraft taught me
            that big builds are many small blocks placed carefully, and I work the same way.
          </p>
          <h3>Currently</h3>
          <ul>
            <li>AI Engineer Intern at Hyundai Motor India</li>
            <li>Data Analyst Associate at ARQ REC</li>
            <li>B.Tech at Rajalakshmi Engineering College, CGPA 8.87</li>
            <li>Writing ML and computer vision guides on Medium</li>
          </ul>
          <div className={styles.actions}>
            <MinecraftButton href="/contact" variant="grass">
              Get in touch
            </MinecraftButton>
            <MinecraftButton href="/projects">See my work</MinecraftButton>
            <MinecraftButton href={site.resume}>Resume</MinecraftButton>
          </div>
        </MinecraftCard>

        <PlayerProfile />
      </div>

      <section className={styles.timeline} aria-labelledby="exp-title" data-xp="experience">
        <h2 id="exp-title" className="section-head">
          <Pixel sprite="chest" size={28} />
          Experience
        </h2>
        <ol className={styles.tree}>
          {experience.map((t) => (
            <li key={t.title} className={styles.node}>
              <span className={styles.frame}>
                <Pixel sprite={t.icon} size={32} />
              </span>
              <div className={styles.card}>
                <p className={styles.year}>{t.when}</p>
                <h3 className={styles.title}>{t.title}</h3>
                <p className={styles.text}>{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.timeline} aria-labelledby="timeline-title" data-xp="timeline">
        <h2 id="timeline-title" className="section-head">
          <Pixel sprite="map" size={28} />
          Advancements
        </h2>
        <ol className={styles.tree}>
          {timeline.map((t) => (
            <li key={t.year} className={styles.node}>
              <span className={styles.frame}>
                <Pixel sprite={t.icon} size={32} />
              </span>
              <div className={styles.card}>
                <p className={styles.year}>{t.year}</p>
                <h3 className={styles.title}>{t.title}</h3>
                <p className={styles.text}>{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
