export const WORLDS = ["overworld", "nether", "end"] as const;
export type World = (typeof WORLDS)[number];

export const WORLD_STORAGE_KEY = "mc-portfolio:world";
export const ENTERED_KEY = "mc-portfolio:entered";

/**
 * Runs before paint: applies the saved world so the theme never flashes, and
 * skips the title screen for visitors who already entered this session (or
 * whose link carries ?skipintro).
 */
export const worldInitScript = `try{var w=localStorage.getItem("${WORLD_STORAGE_KEY}");if(w==="nether"||w==="end")document.documentElement.dataset.world=w}catch(e){}try{if(sessionStorage.getItem("${ENTERED_KEY}")||/[?&]skipintro/.test(location.search))document.documentElement.classList.add("mc-entered")}catch(e){}`;
