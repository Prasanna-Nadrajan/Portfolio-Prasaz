import { Pixel } from "@/components/art/Pixel";
import type { SpriteName } from "@/components/art/sprites";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { MinecraftProgressBar } from "@/components/mc/MinecraftProgressBar";
import { profile } from "@/lib/site";
import { DiamondEgg } from "./EasterEggs";
import styles from "./PlayerProfile.module.css";

const STATS: { label: string; value: string; icon: SpriteName }[] = [
  { label: "Username", value: profile.username, icon: "sign" },
  { label: "Location", value: profile.location, icon: "map" },
  { label: "Studying", value: profile.study, icon: "book" },
  { label: "CGPA", value: profile.cgpa, icon: "xp" },
  { label: "Now", value: profile.now, icon: "redstone" },
  { label: "Speaks", value: profile.languages, icon: "feather" },
];

const HOTBAR: { item: SpriteName; name: string; lore: string; rarity?: "rare" | "epic" | "uncommon"; count?: number }[] = [
  { item: "sword", name: "Python", lore: "Main weapon for every project.", rarity: "epic" },
  { item: "pickaxe", name: "SQL", lore: "Mines insight from raw data.", rarity: "rare" },
  { item: "torch", name: "OpenCV & YOLO", lore: "Lights up dark video feeds." },
  { item: "book", name: "Medium", lore: "Where my write-ups start." },
  { item: "map", name: "QGIS & ArcGIS", lore: "Maps the terrain from orbit." },
  { item: "pearl", name: "Docker", lore: "Ships a model anywhere, instantly.", rarity: "uncommon" },
  { item: "emerald", name: "Power BI", lore: "Dashboards worth trading for." },
];

export function PlayerProfile() {
  return (
    <section id="profile" className={styles.profile} aria-labelledby="profile-title">
      <h2 id="profile-title" className={styles.heading}>
        Player profile
      </h2>
      <div className={styles.layout}>
        <div className={styles.avatarSlot}>
          <Pixel sprite="player" size={64} label={`${profile.username}'s player skin`} className={styles.avatar} />
          <span className={styles.nametag}>{profile.username}</span>
        </div>
        <dl className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statIcon}>
                <Pixel sprite={s.icon} size={20} />
              </span>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <MinecraftProgressBar value={0.887} level={8} label="CGPA 8.87 out of 10" className={styles.xp} />
      <div className={styles.hotbar} role="list" aria-label="Hotbar">
        {HOTBAR.map((h, i) => (
          <span role="listitem" key={h.name}>
            <InventorySlot item={h.item} name={h.name} lore={h.lore} rarity={h.rarity} count={h.count} selected={i === 0} />
          </span>
        ))}
        <span role="listitem">
          <DiamondEgg />
        </span>
      </div>
    </section>
  );
}
