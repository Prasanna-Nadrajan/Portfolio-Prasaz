import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { Pixel } from "@/components/art/Pixel";
import type { SpriteName } from "@/components/art/sprites";
import type { Rarity } from "@/lib/projects";
import { ItemTooltip } from "./ItemTooltip";
import styles from "./InventorySlot.module.css";

interface InventorySlotProps {
  item?: SpriteName;
  icon?: ReactNode;
  name?: string;
  lore?: string;
  rarity?: Rarity;
  count?: number;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  tooltipSide?: "top" | "bottom";
  className?: string;
}

export function InventorySlot({
  item, icon, name, lore, rarity, count, href, onClick, selected, size = "md", tooltipSide, className,
}: InventorySlotProps) {
  const px = size === "lg" ? 44 : size === "sm" ? 24 : 32;
  const art = icon ?? (item ? <Pixel sprite={item} size={px} className={styles.art} /> : null);
  const cls = [styles.slot, styles[size], selected && styles.selected, (href || onClick) && styles.interactive, className]
    .filter(Boolean)
    .join(" ");
  const label = name ? [name, lore].filter(Boolean).join(": ") : undefined;

  const inner = (
    <>
      {art}
      {count !== undefined && count > 1 && <span className={styles.count}>{count}</span>}
    </>
  );

  let slot: ReactNode;
  if (href) {
    const external = /^https?:/.test(href);
    slot = external ? (
      <a href={href} className={cls} aria-label={label} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} aria-label={label}>
        {inner}
      </Link>
    );
  } else if (onClick) {
    slot = (
      <button type="button" className={cls} aria-label={label} onClick={onClick}>
        {inner}
      </button>
    );
  } else {
    slot = (
      <span className={cls} role={label ? "img" : undefined} aria-label={label}>
        {inner}
      </span>
    );
  }

  return name ? (
    <ItemTooltip name={name} lore={lore} rarity={rarity} side={tooltipSide}>
      {slot}
    </ItemTooltip>
  ) : (
    slot
  );
}

/** A row or grid of slots, like the hotbar or a chest. */
export function SlotGrid({ children, columns, className }: { children: ReactNode; columns?: number; className?: string }) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")} style={columns ? { gridTemplateColumns: `repeat(${columns}, auto)` } : undefined}>
      {children}
    </div>
  );
}
