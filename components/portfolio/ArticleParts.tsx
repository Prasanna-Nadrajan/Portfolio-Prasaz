import type { ReactNode } from "react";
import { Pixel } from "@/components/art/Pixel";
import { PixelScene, type SceneKind, type SceneTime } from "@/components/art/PixelScene";
import type { SpriteName } from "@/components/art/sprites";
import styles from "./ArticleParts.module.css";

const TIP: Record<string, { label: string; icon: SpriteName }> = {
  diamond: { label: "Diamond tip", icon: "diamond" },
  emerald: { label: "Emerald tip", icon: "emerald" },
  warning: { label: "Warning", icon: "tnt" },
  redstone: { label: "Redstone note", icon: "redstone" },
  info: { label: "Lore", icon: "book" },
};

export function Tip({ variant = "diamond", title, children }: { variant?: keyof typeof TIP; title?: string; children: ReactNode }) {
  const t = TIP[variant] ?? TIP.diamond;
  return (
    <aside className={`${styles.tip} ${styles[variant]}`} aria-label={title ?? t.label}>
      <span className={styles.tipSlot}>
        <Pixel sprite={t.icon} size={28} />
      </span>
      <div>
        <p className={styles.tipLabel}>{title ?? t.label}</p>
        <div className={styles.tipBody}>{children}</div>
      </div>
    </aside>
  );
}

export function Figure({ scene, time, seed, alt, caption }: { scene: SceneKind; time?: SceneTime; seed?: string; alt: string; caption?: string }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <PixelScene kind={scene} time={time} seed={seed ?? alt} label={alt} className={styles.scene} />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export function Gallery({ children }: { children: ReactNode }) {
  return <div className={styles.gallery}>{children}</div>;
}

/** Inline "item" chip, e.g. <Item icon="torch">Torch ×64</Item>. */
export function Item({ icon, children }: { icon: SpriteName; children: ReactNode }) {
  return (
    <span className={styles.item}>
      <Pixel sprite={icon} size={16} />
      {children}
    </span>
  );
}
