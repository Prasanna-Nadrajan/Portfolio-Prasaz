import type { ReactNode } from "react";
import type { Rarity } from "@/lib/projects";
import styles from "./ItemTooltip.module.css";

interface ItemTooltipProps {
  name: string;
  lore?: string;
  rarity?: Rarity;
  /** Where the tooltip opens relative to the trigger. */
  side?: "top" | "bottom";
  children: ReactNode;
  className?: string;
}

/**
 * Minecraft-style item tooltip shown on hover and keyboard focus.
 * Purely visual: the trigger must carry its own accessible name.
 */
export function ItemTooltip({ name, lore, rarity = "common", side = "top", children, className }: ItemTooltipProps) {
  return (
    <span className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {children}
      <span className={`${styles.tip} ${styles[side]}`} aria-hidden="true">
        <span className={styles.name} style={{ color: `var(--r-${rarity})` }}>
          {name}
        </span>
        {lore && <span className={styles.lore}>{lore}</span>}
      </span>
    </span>
  );
}
