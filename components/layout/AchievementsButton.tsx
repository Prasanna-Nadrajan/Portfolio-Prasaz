"use client";

import { useState } from "react";
import { Pixel } from "@/components/art/Pixel";
import { ACHIEVEMENTS, useAchievements, type AchievementId } from "@/components/mc/AchievementNotification";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import { MinecraftModal } from "@/components/mc/MinecraftModal";
import { MinecraftProgressBar } from "@/components/mc/MinecraftProgressBar";
import styles from "./AchievementsButton.module.css";

const IDS = Object.keys(ACHIEVEMENTS) as AchievementId[];

export function AchievementList() {
  const { unlocked } = useAchievements();
  return (
    <>
      <MinecraftProgressBar value={unlocked.length / IDS.length} label="Achievements unlocked" level={unlocked.length} />
      <ul className={styles.list}>
        {IDS.map((id) => {
          const a = ACHIEVEMENTS[id];
          const done = unlocked.includes(id);
          return (
            <li key={id} className={done ? styles.done : styles.locked}>
              <span className={styles.slot}>{done ? <Pixel sprite={a.icon} size={26} /> : <span aria-hidden="true">?</span>}</span>
              <span>
                <strong>{done ? a.title : "???"}</strong>
                <span className={styles.desc}>{a.desc}</span>
              </span>
              <span className="visually-hidden">{done ? "Unlocked" : "Locked"}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.hint}>Easter eggs are hidden around the site. Some need clicks, one needs a keyboard.</p>
    </>
  );
}

export function AchievementsButton() {
  const [open, setOpen] = useState(false);
  const { unlocked } = useAchievements();

  return (
    <>
      <MinecraftButton size="sm" onClick={() => setOpen(true)} icon={<Pixel sprite="xp" size={16} />}>
        Achievements {unlocked.length}/{IDS.length}
      </MinecraftButton>
      <MinecraftModal open={open} onClose={() => setOpen(false)} title="Advancements">
        <AchievementList />
      </MinecraftModal>
    </>
  );
}
