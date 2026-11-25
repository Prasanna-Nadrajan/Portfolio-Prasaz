"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWorld } from "@/components/layout/World";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { useAchievements } from "@/components/mc/AchievementNotification";
import { useSound } from "@/components/mc/Sound";
import { site } from "@/lib/site";
import { ENTERED_KEY } from "@/lib/world";
import styles from "./LoadingScreen.module.css";

const STEPS = ["Initializing server", "Preparing spawn area", "Loading terrain", "Building terrain"];
const SPLASHES = ["Now hiring!", "100% handcrafted!", "Open to work!", "Also try Contact!", "Shipped with love!", "Contains projects!"];
const PANORAMA = { overworld: "village", nether: "nether", end: "end" } as const;

type Stage = "loading" | "title" | "leaving" | "done";

/**
 * Game-style boot sequence shown once per session: a dirt loading screen,
 * then a title screen. Hidden before paint for returning visitors by an
 * inline script that adds `mc-entered` to <html>.
 */
export function LoadingScreen() {
  const [stage, setStage] = useState<Stage>("loading");
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState(false);
  const [splash, setSplash] = useState(SPLASHES[0]);
  const enterRef = useRef<HTMLButtonElement>(null);
  const { world } = useWorld();
  const { unlock } = useAchievements();
  const { enabled, setEnabled, play } = useSound();

  useEffect(() => {
    if (document.documentElement.classList.contains("mc-entered")) {
      setStage("done");
      return;
    }
    setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)]);
    document.documentElement.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 400 : 2400;
    const start = performance.now();
    // A timer rather than requestAnimationFrame so loading still finishes in a background tab.
    const timer = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      // Ease with a stall in the middle, like chunks loading unevenly.
      setProgress(Math.round((p < 0.55 ? p * 1.25 : 0.69 + (p - 0.55) * 0.69) * 100));
      if (p >= 1) {
        window.clearInterval(timer);
        setStage("title");
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === "title") enterRef.current?.focus();
  }, [stage]);

  const enter = useCallback(() => {
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {}
    play("pop");
    setStage("leaving");
    window.setTimeout(() => {
      document.documentElement.classList.add("mc-entered");
      document.documentElement.style.overflow = "";
      setStage("done");
      unlock("enterWorld");
    }, 450);
  }, [play, unlock]);

  useEffect(() => {
    if (stage === "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, enter]);

  if (stage === "done") return null;

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length))];

  return (
    <div
      className={`${styles.screen} ${stage === "leaving" ? styles.leaving : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name}: title screen`}
    >
      {stage === "loading" ? (
        <div className={styles.loading}>
          <p className={styles.step}>{step}</p>
          <p className={styles.pct} aria-live="polite">
            {progress}%
          </p>
          <div className={styles.bar} role="progressbar" aria-label="Loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <button type="button" className={styles.skip} onClick={enter}>
            Skip
          </button>
        </div>
      ) : (
        <div className={styles.title} style={{ backgroundImage: `url(/mc/scenes/${PANORAMA[world]}.webp)` }}>
          <div className={styles.logoWrap}>
            <h1 className={styles.logo}>{site.name}</h1>
            <p className={styles.edition}>Portfolio Edition</p>
            <span className={styles.splash} aria-hidden="true">
              {splash}
            </span>
          </div>

          <div className={styles.menu}>
            <button ref={enterRef} type="button" className={`${styles.button} ${styles.wide}`} onClick={enter}>
              Enter World
            </button>
            <button type="button" className={`${styles.button} ${styles.wide}`} aria-expanded={options} onClick={() => setOptions((o) => !o)}>
              Options…
            </button>
            {options && (
              <div className={styles.options}>
                <div className={styles.option}>
                  <span>Dimension</span>
                  <ThemeSwitcher />
                </div>
                <button type="button" className={styles.button} aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>
                  Sound: {enabled ? "ON" : "OFF"}
                </button>
              </div>
            )}
            <div className={styles.row}>
              <a className={styles.button} href="/projects" onClick={enter}>
                Projects
              </a>
              <a className={styles.button} href="/contact" onClick={enter}>
                Contact
              </a>
            </div>
          </div>

          <p className={styles.version}>Portfolio {site.gameVersion}</p>
          <p className={styles.legal}>Fan-made. Not affiliated with Mojang or Microsoft.</p>
        </div>
      )}
    </div>
  );
}
