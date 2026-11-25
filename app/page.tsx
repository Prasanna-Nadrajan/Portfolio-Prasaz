import Link from "next/link";
import { Pixel } from "@/components/art/Pixel";
import { CreeperEgg } from "@/components/portfolio/EasterEggs";
import { Hero } from "@/components/portfolio/Hero";
import { PlayerProfile } from "@/components/portfolio/PlayerProfile";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { QuestCard } from "@/components/portfolio/QuestCard";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import { getAllProjects, getFeaturedProject } from "@/lib/projects";
import { skillGroups } from "@/lib/site";
import styles from "./home.module.css";

export default function HomePage() {
  const featured = getFeaturedProject();
  const others = getAllProjects()
    .filter((p) => p.slug !== featured?.slug)
    .slice(0, 3);
  const topSkills = skillGroups.flatMap((g) => g.skills).sort((a, b) => b.value - a.value).slice(0, 9);

  return (
    <>
      <Hero />

      <div className="container">
        <div className={styles.intro} data-xp="intro">
          <PlayerProfile />
          <section className={styles.chest} aria-labelledby="skills-preview">
            <h2 id="skills-preview" className={styles.chestTitle}>
              <Pixel sprite="enchantedBook" size={22} />
              Skill inventory
            </h2>
            <p className={styles.chestSub}>Hover a slot to inspect the item.</p>
            <div className={styles.slots}>
              {topSkills.map((s) => (
                <InventorySlot key={s.name} item={s.icon} name={s.name} lore={`${s.enchant}. ${s.lore}`} rarity="rare" count={s.level} href="/skills" size="lg" />
              ))}
            </div>
            <Link href="/skills" className={styles.chestLink}>
              Open the full skill tree ›
            </Link>
          </section>
        </div>

        {featured && (
          <section className={styles.section} aria-label="Featured project" data-xp="featured">
            <QuestCard project={featured} />
          </section>
        )}

        <section id="projects" className={styles.section} aria-labelledby="projects-title" data-xp="projects">
          <div className={styles.head}>
            <h2 id="projects-title" className="section-head">
              <Pixel sprite="chest" size={28} />
              More projects
            </h2>
            <CreeperEgg className={styles.creeper} />
          </div>
          <p className="section-sub">A few chests worth opening.</p>
          <ProjectGrid projects={others} />
          <div className={styles.more}>
            <MinecraftButton href="/projects" variant="wood">
              See all projects
            </MinecraftButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cta}`} aria-labelledby="cta-title" data-xp="cta">
          <Pixel sprite="writableBook" size={48} />
          <div>
            <h2 id="cta-title">Got a quest for me?</h2>
            <p>I&apos;m open to AI, data science and ML engineering roles, and to research collaborations worldwide.</p>
          </div>
          <MinecraftButton href="/contact" variant="grass" size="lg">
            Send a message
          </MinecraftButton>
        </section>
      </div>
    </>
  );
}
