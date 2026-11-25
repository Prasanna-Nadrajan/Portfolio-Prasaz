import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./MinecraftCard.module.css";

export type CardSurface = "panel" | "gui" | "plank" | "stone" | "obsidian" | "glass";

interface MinecraftCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  surface?: CardSurface;
  padded?: boolean;
  children: ReactNode;
}

export function MinecraftCard({ as: Tag = "div", surface = "panel", padded = true, className, children, ...rest }: MinecraftCardProps) {
  return (
    <Tag className={[styles.card, styles[surface], padded && styles.padded, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
