"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type Sound = "click" | "pop" | "orb" | "levelup" | "hit" | "break" | "fuse" | "explode" | "chest" | "toast";

interface SoundContext {
  enabled: boolean;
  setEnabled: (on: boolean) => void;
  play: (sound: Sound) => void;
}

const Ctx = createContext<SoundContext>({ enabled: false, setEnabled: () => {}, play: () => {} });
export const useSound = () => useContext(Ctx);

const STORAGE_KEY = "mc-portfolio:sound";
// Background music (file lives in public/mc/sounds).
const BGM_SRC = "/mc/sounds/calm2.mp3";
const BGM_VOLUME = 0.20; // 0 to 1
// Vanilla sound files in public/mc/sounds (downloaded by `npm run assets`).
// Several variants per sound are picked at random, like the game does.
const FILES: Record<Sound, { files: string[]; volume: number }> = {
  click: { files: ["click"], volume: 0.35 },
  pop: { files: ["pop"], volume: 0.4 },
  orb: { files: ["orb"], volume: 0.3 },
  levelup: { files: ["levelup"], volume: 0.35 },
  hit: { files: ["hit1", "hit2"], volume: 0.5 },
  break: { files: ["break1", "break2", "break3", "break4"], volume: 0.6 },
  fuse: { files: ["fuse"], volume: 0.5 },
  explode: { files: ["explode"], volume: 0.35 },
  chest: { files: ["chest"], volume: 0.4 },
  toast: { files: ["toast"], volume: 0.5 },
};

/**
 * UI sounds using the game's own sound effects. Off until the visitor turns
 * them on. If a file is missing or the browser cannot decode Ogg, a small
 * synthesized stand-in plays instead.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);
  const buffers = useRef(new Map<string, Promise<AudioBuffer | null>>());
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const getBgm = useCallback(() => {
    if (!bgmRef.current) {
      const a = new Audio(BGM_SRC);
      a.loop = true;
      a.volume = BGM_VOLUME;
      bgmRef.current = a;
    }
    return bgmRef.current;
  }, []);

  // Restored "on" after a reload: browsers block autoplay, so start on the first click or key press.
  useEffect(() => {
    if (!enabled) return;
    const bgm = getBgm();
    const retry = () => void bgm.play().catch(() => {});
    bgm.play().catch(() => {
      window.addEventListener("pointerdown", retry, { once: true });
      window.addEventListener("keydown", retry, { once: true });
    });
    return () => {
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };
  }, [enabled, getBgm]);
  useEffect(() => {
    try {
      const on = localStorage.getItem(STORAGE_KEY) === "on";
      enabledRef.current = on;
      setEnabledState(on);
    } catch {}
  }, []);

  const audio = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const load = useCallback((ac: AudioContext, name: string) => {
    let p = buffers.current.get(name);
    if (!p) {
      p = fetch(`/mc/sounds/${name}.ogg`)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
        .then((data) => ac.decodeAudioData(data))
        .catch(() => null);
      buffers.current.set(name, p);
    }
    return p;
  }, []);

  const synth = useCallback((ac: AudioContext, sound: Sound) => {
    const t = ac.currentTime;
    const tone = (from: number, to: number, dur: number, vol: number, delay = 0) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(from, t + delay);
      osc.frequency.exponentialRampToValueAtTime(to, t + delay + dur);
      g.gain.setValueAtTime(vol, t + delay);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      osc.connect(g).connect(ac.destination);
      osc.start(t + delay);
      osc.stop(t + delay + dur + 0.02);
    };
    if (sound === "levelup" || sound === "toast") [523, 659, 784].forEach((f, i) => tone(f, f, 0.1, 0.05, i * 0.07));
    else if (sound === "orb" || sound === "pop") tone(600, 1300, 0.08, 0.06);
    else tone(800, 400, 0.05, 0.05);
  }, []);

  const play = useCallback(
    (sound: Sound) => {
      if (!enabledRef.current) return;
      const ac = audio();
      if (!ac) return;
      const { files, volume } = FILES[sound];
      const name = files[Math.floor(Math.random() * files.length)];
      void load(ac, name).then((buffer) => {
        if (!buffer) return synth(ac, sound);
        const src = ac.createBufferSource();
        const gain = ac.createGain();
        src.buffer = buffer;
        // Slight pitch variation keeps repeated sounds from feeling robotic.
        src.playbackRate.value = sound === "orb" ? 0.8 + Math.random() * 0.6 : 0.95 + Math.random() * 0.1;
        gain.gain.value = volume;
        src.connect(gain).connect(ac.destination);
        src.start();
      });
    },
    [audio, load, synth],
  );

  const setEnabled = useCallback(
    (on: boolean) => {
      enabledRef.current = on;
      setEnabledState(on);
      try {
        localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
      } catch {}
      // Start or stop the music inside the click handler so the browser allows it.
      const bgm = getBgm();
      if (on) void bgm.play().catch(() => {});
      else bgm.pause();
      if (on) play("click");
    },
    [play, getBgm],
  );
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (el && !el.hasAttribute("data-silent")) play("click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [play]);

  return <Ctx.Provider value={{ enabled, setEnabled, play }}>{children}</Ctx.Provider>;
}
