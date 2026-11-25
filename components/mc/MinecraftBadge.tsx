import type { ReactNode } from "react";
import type { Rarity } from "@/lib/projects";
import styles from "./MinecraftBadge.module.css";

interface MinecraftBadgeProps {
  children: ReactNode;
  tone?: "stone" | "accent" | "sample" | "gold" | Rarity;
  icon?: ReactNode;
  className?: string;
}

export function MinecraftBadge({ children, tone = "stone", icon, className }: MinecraftBadgeProps) {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}>
      {icon}
      {children}
    </span>
  );
}
