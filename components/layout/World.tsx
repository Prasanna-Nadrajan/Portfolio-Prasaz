"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAchievements } from "@/components/mc/AchievementNotification";
import { WORLDS, WORLD_STORAGE_KEY, type World } from "@/lib/world";

export { WORLDS, type World };

const Ctx = createContext<{ world: World; setWorld: (w: World) => void }>({
  world: "overworld",
  setWorld: () => {},
});

export const useWorld = () => useContext(Ctx);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [world, setWorldState] = useState<World>("overworld");
  const { unlock } = useAchievements();

  useEffect(() => {
    const current = document.documentElement.dataset.world as World | undefined;
    if (current && WORLDS.includes(current)) setWorldState(current);
  }, []);

  const setWorld = useCallback(
    (w: World) => {
      setWorldState(w);
      document.documentElement.dataset.world = w;
      try {
        localStorage.setItem(WORLD_STORAGE_KEY, w);
      } catch {}
      if (w === "nether") unlock("nether");
      if (w === "end") unlock("end");
    },
    [unlock],
  );

  return <Ctx.Provider value={{ world, setWorld }}>{children}</Ctx.Provider>;
}
