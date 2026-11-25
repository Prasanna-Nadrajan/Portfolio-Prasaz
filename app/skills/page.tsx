import type { Metadata } from "next";
import { Pixel } from "@/components/art/Pixel";
import { Breadcrumb } from "@/components/portfolio/Breadcrumb";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { MinecraftProgressBar } from "@/components/mc/MinecraftProgressBar";
import { skillGroups } from "@/lib/site";
import styles from "./skills.module.css";

export const metadata: Metadata = { title: "Skills", description: "Languages, frameworks and tools I use." };

export default function SkillsPage() {
  const all = skillGroups.flatMap((g) => g.skills);
  const total = all.reduce((sum, s) => sum + s.level, 0);

  return (
    <div className="container page">
      <Breadcrumb items={[{ label: "World", href: "/" }, { label: "Skills" }]} />
      <h1 className="page-title section-head">
        <Pixel sprite="enchantedBook" size={36} />
        Skills
      </h1>
      <p className="section-sub">
        Enchanted gear, levelled up over time. Total level: <strong className={styles.total}>{total}</strong>
      </p>

      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <section key={group.title} className={styles.group} aria-labelledby={`g-${group.title}`} data-xp={group.title}>
            <h2 id={`g-${group.title}`} className={styles.groupTitle}>
              <Pixel sprite={group.icon} size={24} />
              {group.title}
            </h2>
            <ul className={styles.list}>
              {group.skills.map((s) => (
                <li key={s.name} className={styles.skill}>
                  <InventorySlot item={s.icon} name={s.name} lore={`${s.enchant}. ${s.lore}`} rarity="rare" size="lg" />
                  <div className={styles.info}>
                    <p className={styles.name}>
                      {s.name} <span className={styles.enchant}>{s.enchant}</span>
                    </p>
                    <MinecraftProgressBar value={s.value} level={s.level} label={`${s.name}: level ${s.level}`} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
