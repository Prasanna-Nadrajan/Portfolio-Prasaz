"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pixel } from "@/components/art/Pixel";
import type { SpriteName } from "@/components/art/sprites";
import { useSound } from "./Sound";
import styles from "./AchievementNotification.module.css";

export const ACHIEVEMENTS = {
  inventory: { title: "Taking Inventory", desc: "Open your inventory.", icon: "chest" },
  enterWorld: { title: "Into the Unknown", desc: "Enter the world from the title screen.", icon: "grass" },
  mine: { title: "Time to Mine!", desc: "Break a block in the hero.", icon: "pickaxe" },
  diamonds: { title: "DIAMONDS!", desc: "Find a shiny diamond.", icon: "diamond" },
  creeper: { title: "Aww Man", desc: "Poke the creeper. It forgave you.", icon: "creeperFace" },
  nether: { title: "We Need to Go Deeper", desc: "Travel to the Nether.", icon: "torch" },
  end: { title: "The End?", desc: "Enter the End.", icon: "pearl" },
  explorer: { title: "Adventuring Time", desc: "Visit every page of the portfolio.", icon: "map" },
  levelUp: { title: "Level Up!", desc: "Reach explorer level 5 by scrolling around.", icon: "xp" },
  contact: { title: "Message in a Bottle", desc: "Write a message on the contact page.", icon: "writableBook" },
  konami: { title: "Cheat Codes Enabled", desc: "Enter the secret code.", icon: "tnt" },
} as const satisfies Record<string, { title: string; desc: string; icon: SpriteName }>;

export type AchievementId = keyof typeof ACHIEVEMENTS;

interface AchievementContext {
  unlocked: AchievementId[];
  unlock: (id: AchievementId) => void;
}

const Ctx = createContext<AchievementContext>({ unlocked: [], unlock: () => {} });
export const useAchievements = () => useContext(Ctx);

const STORAGE_KEY = "mc-portfolio:achievements";
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [toasts, setToasts] = useState<{ key: number; id: AchievementId }[]>([]);
  const [tntRain, setTntRain] = useState(false);
  const unlockedRef = useRef<Set<AchievementId>>(new Set());
  const nextKey = useRef(0);
  const { play } = useSound();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as AchievementId[];
      const valid = saved.filter((id) => id in ACHIEVEMENTS);
      unlockedRef.current = new Set(valid);
      setUnlocked(valid);
    } catch {
      // Storage unavailable: achievements just won't persist.
    }
  }, []);

  const unlock = useCallback((id: AchievementId) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    const list = [...unlockedRef.current];
    setUnlocked(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
    play("toast");
    const key = nextKey.current++;
    setToasts((t) => [...t, { key, id }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 4500);
  }, [play]);

  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        unlock("konami");
        play("explode");
        if (!prefersReducedMotion()) {
          setTntRain(true);
          window.setTimeout(() => setTntRain(false), 3200);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock, play]);

  return (
    <Ctx.Provider value={{ unlocked, unlock }}>
      {children}
      <div className={styles.stack} aria-live="polite" aria-atomic="false">
        {toasts.map(({ key, id }) => (
          <AchievementNotification key={key} id={id} />
        ))}
      </div>
      {tntRain && (
        <div className={styles.rain} aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} style={{ left: `${(i * 6.3 + 2) % 100}%`, animationDelay: `${(i % 5) * 0.18}s` }}>
              <Pixel sprite="tnt" size={28} />
            </span>
          ))}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function AchievementNotification({ id }: { id: AchievementId }) {
  const a = ACHIEVEMENTS[id];
  return (
    <div className={styles.toast} role="status">
      <span className={styles.icon}>
        <Pixel sprite={a.icon} size={30} />
      </span>
      <span className={styles.text}>
        <span className={styles.kicker}>Achievement Get!</span>
        <span className={styles.title}>{a.title}</span>
      </span>
    </div>
  );
}
