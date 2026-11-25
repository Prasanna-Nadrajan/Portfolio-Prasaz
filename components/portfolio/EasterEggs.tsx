"use client";

import { useState, type CSSProperties } from "react";
import { Pixel } from "@/components/art/Pixel";
import { useAchievements } from "@/components/mc/AchievementNotification";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { useSound } from "@/components/mc/Sound";
import styles from "./EasterEggs.module.css";

/** Hotbar diamond that sparkles when clicked. */
export function DiamondEgg() {
  const { unlock } = useAchievements();
  const { play } = useSound();
  const [burst, setBurst] = useState(0);
  return (
    <span className={styles.diamond}>
      <InventorySlot
        item="diamond"
        name="Diamond"
        lore="Shiny. Click it."
        rarity="rare"
        count={3}
        onClick={() => {
          setBurst((b) => b + 1);
          play("orb");
          unlock("diamonds");
        }}
      />
      {burst > 0 && (
        <span key={burst} className={styles.sparkles} aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ "--a": `${i * 45}deg` } as CSSProperties} />
          ))}
        </span>
      )}
    </span>
  );
}

/** A creeper that hisses, swells, flashes and then harmlessly puffs away. */
export function CreeperEgg({ className }: { className?: string }) {
  const { unlock } = useAchievements();
  const { play } = useSound();
  const [state, setState] = useState<"idle" | "fuse" | "puff">("idle");

  const poke = () => {
    if (state !== "idle") return;
    setState("fuse");
    play("fuse");
    window.setTimeout(() => {
      setState("puff");
      play("pop");
      unlock("creeper");
    }, 1100);
    window.setTimeout(() => setState("idle"), 2400);
  };

  return (
    <button
      type="button"
      className={`${styles.creeper} ${styles[state]} ${className ?? ""}`}
      onClick={poke}
      aria-label="Poke the creeper"
    >
      <span className={styles.creeperBody}>
        <Pixel sprite="creeper" size={18} />
      </span>
      {state === "puff" && (
        <span className={styles.puff} aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} style={{ "--a": `${i * 60}deg` } as CSSProperties} />
          ))}
        </span>
      )}
      <span className="visually-hidden" aria-live="polite">
        {state === "fuse" ? "Ssssss…" : state === "puff" ? "Poof! Only confetti." : ""}
      </span>
    </button>
  );
}

const HITS_TO_BREAK = 3;
const REGROW_MS = 5000;

/**
 * A row of grass blocks you can mine: each click cracks the block a little,
 * the third breaks it into particles, and it regrows a few seconds later.
 */
export function GrassStrip({ blocks = 48 }: { blocks?: number }) {
  const { unlock } = useAchievements();
  const { play } = useSound();
  const [hits, setHits] = useState<Record<number, number>>({});
  const [mined, setMined] = useState(0);

  const hit = (i: number) => {
    const n = (hits[i] ?? 0) + 1;
    if (n > HITS_TO_BREAK) return;
    setHits((h) => ({ ...h, [i]: n }));
    if (n < HITS_TO_BREAK) {
      play("hit");
      return;
    }
    play("break");
    setMined((m) => m + 1);
    unlock("mine");
    window.setTimeout(() => setHits(({ [i]: _gone, ...rest }) => rest), REGROW_MS);
  };

  return (
    <div className={styles.stripWrap}>
      <div className={styles.strip} aria-hidden="true">
        {Array.from({ length: blocks }, (_, i) => {
          const n = hits[i] ?? 0;
          const broken = n >= HITS_TO_BREAK;
          return (
            <span
              key={i}
              className={`${styles.block} ${broken ? styles.broken : ""}`}
              data-silent=""
              style={{ "--crack": n / HITS_TO_BREAK } as CSSProperties}
              onClick={() => hit(i)}
            >
              <Pixel sprite="grass" size={48} />
              {broken && (
                <span className={styles.debris}>
                  {Array.from({ length: 6 }, (_, k) => (
                    <span key={k} style={{ "--a": `${k * 60 + 20}deg` } as CSSProperties} />
                  ))}
                </span>
              )}
            </span>
          );
        })}
      </div>
      <p className={styles.tally} aria-live="polite">
        <Pixel sprite="pickaxe" size={16} />
        {mined > 0 ? `Blocks mined: ${mined}` : "Click a block 3× to mine it"}
      </p>
    </div>
  );
}
