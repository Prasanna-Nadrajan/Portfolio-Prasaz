"use client";

import { Pixel } from "@/components/art/Pixel";
import type { SpriteName } from "@/components/art/sprites";
import { ItemTooltip } from "@/components/mc/ItemTooltip";
import { useWorld, WORLDS, type World } from "./World";
import styles from "./ThemeSwitcher.module.css";

const INFO: Record<World, { label: string; icon: SpriteName; lore: string }> = {
  overworld: { label: "Overworld", icon: "grass", lore: "Grass, sky and a friendly sun." },
  nether: { label: "Nether", icon: "netherrack", lore: "Hot. Very hot. Bring fire resistance." },
  end: { label: "The End", icon: "endstone", lore: "Void, end stone and a dragon nearby." },
};

export function ThemeSwitcher() {
  const { world, setWorld } = useWorld();
  return (
    <div className={styles.group} role="radiogroup" aria-label="Dimension theme">
      {WORLDS.map((w) => (
        <ItemTooltip key={w} name={INFO[w].label} lore={INFO[w].lore} side="bottom">
          <button
            type="button"
            role="radio"
            aria-checked={world === w}
            aria-label={`${INFO[w].label} theme`}
            className={styles.option}
            onClick={() => setWorld(w)}
          >
            <Pixel sprite={INFO[w].icon} size={24} />
          </button>
        </ItemTooltip>
      ))}
    </div>
  );
}
