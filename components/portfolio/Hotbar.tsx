"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Pixel } from "@/components/art/Pixel";
import { AchievementList } from "@/components/layout/AchievementsButton";
import { useAchievements } from "@/components/mc/AchievementNotification";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { MinecraftModal } from "@/components/mc/MinecraftModal";
import { useSound } from "@/components/mc/Sound";
import { nav, socials } from "@/lib/site";
import styles from "./Hotbar.module.css";

const XP_KEY = "mc-portfolio:xp";
const VISITED_KEY = "mc-portfolio:visited";
const ORBS_PER_LEVEL = 3;

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

const activeIndex = (pathname: string) => {
  const i = nav.findIndex((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)));
  return i === -1 ? 0 : i;
};

function readSet(key: string): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(key) ?? "[]"));
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  try {
    sessionStorage.setItem(key, JSON.stringify([...set]));
  } catch {}
}

/**
 * Bottom HUD: an XP bar that fills as sections ([data-xp]) scroll into view,
 * and a hotbar for navigation (keys 1–5) plus the inventory (E).
 */
export function Hotbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { unlock } = useAchievements();
  const { play } = useSound();
  const [orbs, setOrbs] = useState(0);
  const [gain, setGain] = useState(0);
  const [label, setLabel] = useState<string | null>(null);
  const [inventory, setInventory] = useState(false);
  const collected = useRef<Set<string>>(new Set());
  const selected = activeIndex(pathname);

  useEffect(() => {
    collected.current = readSet(XP_KEY);
    setOrbs(collected.current.size);
  }, []);

  useEffect(() => {
    const visited = readSet(VISITED_KEY);
    visited.add(nav[activeIndex(pathname)].href);
    writeSet(VISITED_KEY, visited);
    if (nav.every((n) => visited.has(n.href))) unlock("explorer");

    setLabel(nav[activeIndex(pathname)].label);
    const t = window.setTimeout(() => setLabel(null), 1600);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = `${pathname}#${(entry.target as HTMLElement).dataset.xp}`;
          io.unobserve(entry.target);
          if (collected.current.has(id)) continue;
          collected.current.add(id);
          writeSet(XP_KEY, collected.current);
          const total = collected.current.size;
          setOrbs(total);
          setGain((g) => g + 1);
          play(total % ORBS_PER_LEVEL === 0 ? "levelup" : "orb");
          if (Math.floor(total / ORBS_PER_LEVEL) >= 5) unlock("levelUp");
        }
      },
      { threshold: 0.4 },
    );
    const raf = requestAnimationFrame(() => document.querySelectorAll("[data-xp]").forEach((el) => io.observe(el)));
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname, play, unlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      if (!document.documentElement.classList.contains("mc-entered")) return;
      const item = nav.find((n) => n.key === e.key);
      if (item) {
        router.push(item.href);
        return;
      }
      if (e.key.toLowerCase() === "e") {
        setInventory((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    if (!inventory) return;
    unlock("inventory");
    play("chest");
  }, [inventory, unlock, play]);

  const level = Math.floor(orbs / ORBS_PER_LEVEL);
  const progress = (orbs % ORBS_PER_LEVEL) / ORBS_PER_LEVEL;

  return (
    <>
      <div className={styles.hud}>
        {label && (
          <p key={label} className={styles.itemName} aria-hidden="true">
            {label}
          </p>
        )}
        <div className={styles.xp} title={`Explorer level ${level}: scroll through sections to earn XP`}>
          {level > 0 && <span className={styles.level}>{level}</span>}
          <div
            className={styles.xpTrack}
            role="progressbar"
            aria-label={`Explorer level ${level}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span className={styles.xpFill} style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }} />
          </div>
          {gain > 0 && (
            <span key={gain} className={styles.orb} aria-hidden="true">
              <Pixel sprite="xp" size={14} />
            </span>
          )}
        </div>
        <nav aria-label="Hotbar" className={styles.bar}>
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.slot} ${i === selected ? styles.selected : ""}`}
              aria-current={i === selected ? "page" : undefined}
              aria-label={`${item.label} (key ${item.key})`}
            >
              <Pixel sprite={item.icon} size={item.icon === "player" ? 14 : 28} />
              <span className={styles.key} aria-hidden="true">
                {item.key}
              </span>
            </Link>
          ))}
          <button
            type="button"
            className={`${styles.slot} ${styles.invSlot}`}
            onClick={() => setInventory(true)}
            aria-haspopup="dialog"
            aria-label="Open inventory (key E)"
          >
            <Pixel sprite="chest" size={26} />
            <span className={styles.key} aria-hidden="true">
              E
            </span>
          </button>
        </nav>
      </div>

      <MinecraftModal open={inventory} onClose={() => setInventory(false)} title="Inventory">
        <h3 className={styles.invHeading}>Socials</h3>
        <div className={styles.socials}>
          {socials.map((s) => (
            <InventorySlot key={s.label} item={s.icon} name={s.label} lore={s.lore} href={s.href} size="lg" tooltipSide="bottom" />
          ))}
        </div>
        <h3 className={styles.invHeading}>Advancements</h3>
        <AchievementList />
      </MinecraftModal>
    </>
  );
}
