"use client";

import { useState } from "react";
import { PixelScene, type SceneKind } from "@/components/art/PixelScene";
import { Pixel } from "@/components/art/Pixel";
import { useWorld, type World } from "@/components/layout/World";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import { GrassStrip } from "./EasterEggs";
import styles from "./Hero.module.css";

const COPY: Record<World, { kicker: string; scene: SceneKind; alt: string }> = {
  overworld: { kicker: "Welcome, Explorer!", scene: "village", alt: "Minecraft screenshot of a plains village" },
  nether: { kicker: "Welcome to the Nether!", scene: "nether", alt: "Minecraft screenshot of the Nether wastes" },
  end: { kicker: "Welcome to the End!", scene: "end", alt: "Minecraft screenshot of the End island and obsidian pillars" },
};

export function Hero() {
  const { world } = useWorld();
  const [night, setNight] = useState(false);
  const copy = COPY[world];

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-xp="hero">
      <div className={styles.sky}>
        <PixelScene kind={copy.scene} time={world === "overworld" && night ? "night" : "day"} sizes="100vw" priority className={styles.scene} />
        <span className="visually-hidden">{copy.alt}</span>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.panel}>
          <p className={styles.kicker}>{copy.kicker}</p>
          <h1 id="hero-title" className={styles.title}>
            I&apos;m Prasanna. I build ML systems that ship.
          </h1>
          <p className={styles.lead}>
            Data scientist and AI systems engineer. Explore my projects, inspect my skill inventory, or send me a message by book and quill.
          </p>
          <div className={styles.actions}>
            <MinecraftButton href="/projects" variant="grass" size="lg">
              View projects
            </MinecraftButton>
            <MinecraftButton href="/contact" size="lg">
              Contact me
            </MinecraftButton>
          </div>
        </div>
      </div>

      {world === "overworld" && (
        <button
          type="button"
          className={styles.timeToggle}
          onClick={() => setNight((n) => !n)}
          aria-pressed={night}
          aria-label={night ? "Switch hero to daytime" : "Switch hero to night-time"}
        >
          <Pixel sprite={night ? "clock" : "torch"} size={night ? 22 : 12} />
          <span>{night ? "Sunrise" : "Nightfall"}</span>
        </button>
      )}

      <div className={styles.ground}>
        <GrassStrip />
      </div>
    </section>
  );
}
