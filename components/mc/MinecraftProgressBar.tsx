import styles from "./MinecraftProgressBar.module.css";

interface MinecraftProgressBarProps {
  /** 0 to 1 */
  value: number;
  label: string;
  /** Number shown above the bar, like the XP level. */
  level?: number;
  variant?: "xp" | "health" | "mana";
  showLabel?: boolean;
  className?: string;
}

export function MinecraftProgressBar({ value, label, level, variant = "xp", showLabel, className }: MinecraftProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {(showLabel || level !== undefined) && (
        <div className={styles.meta}>
          {showLabel && <span className={styles.label}>{label}</span>}
          {level !== undefined && <span className={styles.level}>{level}</span>}
        </div>
      )}
      <div
        className={`${styles.track} ${styles[variant]}`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className={styles.fill} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
      </div>
    </div>
  );
}
