// Downloads the Minecraft assets this site uses into public/mc.
// Textures and sounds come from the vanilla 1.21.1 client assets; screenshots come from the
// Minecraft Wiki. Run with `npm run assets`. Output is committed.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TEX = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures";
const WIKI_API = "https://minecraft.fandom.com/api.php";
const UA = "Mozilla/5.0 (personal fan blog asset fetcher)";
const OUT = "public/mc";

const ITEMS = {
  diamond: "item/diamond",
  emerald: "item/emerald",
  pickaxe: "item/diamond_pickaxe",
  sword: "item/diamond_sword",
  torch: "block/torch",
  pearl: "item/ender_pearl",
  redstone: "item/redstone",
  book: "item/book",
  enchantedBook: "item/enchanted_book",
  writableBook: "item/writable_book",
  map: "item/map",
  brick: "item/brick",
  feather: "item/feather",
  clock: "item/clock_00",
  compass: "item/compass_00",
  heart: "gui/sprites/hud/heart/full",
  grass: "block/grass_block_side",
  dirt: "block/dirt",
  tnt: "block/tnt_side",
  xp: "item/experience_bottle",
  netherrack: "block/netherrack",
  endstone: "block/end_stone",
  sign: "item/oak_sign",
  disc: "item/music_disc_cat",
  horn: "item/goat_horn",
  spyglass: "item/spyglass",
  apple: "item/golden_apple",
  bone: "item/bone",
};

const BLOCKS = [
  "oak_planks", "dark_oak_planks", "spruce_planks", "oak_log", "stone", "cobblestone", "dirt", "grass_block_side",
  "deepslate", "obsidian", "netherrack", "nether_bricks", "end_stone", "purpur_block", "bookshelf", "crafting_table_front",
];

const GUI = {
  button: "gui/sprites/widget/button",
  "button-hover": "gui/sprites/widget/button_highlighted",
  "button-disabled": "gui/sprites/widget/button_disabled",
  slot: "gui/sprites/container/slot",
  toast: "gui/sprites/toast/advancement",
  "xp-bg": "gui/sprites/hud/experience_bar_background",
  "xp-fill": "gui/sprites/hud/experience_bar_progress",
};

// Vanilla sound effects, saved as public/mc/sounds/<name>.ogg
const SOUNDS = {
  click: "random/click",
  pop: "random/pop",
  orb: "random/orb",
  levelup: "random/levelup",
  break1: "dig/grass1",
  break2: "dig/grass2",
  break3: "dig/grass3",
  break4: "dig/grass4",
  hit1: "step/grass1",
  hit2: "step/grass2",
  fuse: "random/fuse",
  explode: "random/explode1",
  chest: "block/chest/open",
  toast: "ui/toast/in",
  challenge: "ui/toast/challenge_complete",
};

const SCENES = {
  plains: "Plains.png",
  castle: "Woodland_Mansion.png",
  village: "Plains_village.png",
  cave: "Lush_Caves.png",
  dripstone: "Dripstone_Caves.png",
  deepdark: "Deep_Dark.png",
  nether: "Nether_Wastes.png",
  crimson: "Crimson_Forest.png",
  basalt: "Basalt_Deltas.png",
  end: "The_End.png",
  endcity: "End_City.png",
  redstone: "Redstone-lamp-and-repeaters.png",
  cherry: "Cherry_Grove.png",
  ocean: "Warm_Ocean.png",
  mountain: "Jagged_Peaks.png",
  snowy: "Snowy_Slopes.png",
};

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const texture = (p) => get(`${TEX}/${p}.png`);
const sound = (p) => get(`${TEX.replace("/textures", "/sounds")}/${p}.ogg`);

function save(rel, buf) {
  const file = path.join(OUT, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, buf);
}

// Composites rectangles cut from a skin sheet into one front-facing sprite.
async function compose(sheet, width, height, parts) {
  const layers = await Promise.all(
    parts.map(async ([sx, sy, w, h, dx, dy]) => ({
      input: await sharp(sheet).extract({ left: sx, top: sy, width: w, height: h }).toBuffer(),
      left: dx,
      top: dy,
    })),
  );
  return sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(layers)
    .png()
    .toBuffer();
}

async function main() {
  for (const [name, p] of Object.entries(ITEMS)) save(`items/${name}.png`, await texture(p));
  for (const b of BLOCKS) save(`blocks/${b}.png`, await texture(`block/${b}`));
  for (const [name, p] of Object.entries(GUI)) save(`gui/${name}.png`, await texture(p));
  for (const [name, p] of Object.entries(SOUNDS)) save(`sounds/${name}.ogg`, await sound(p));

  const creeper = await texture("entity/creeper/creeper");
  save("items/creeperFace.png", await compose(creeper, 8, 8, [[8, 8, 8, 8, 0, 0]]));
  save("items/creeper.png", await compose(creeper, 8, 26, [
    [8, 8, 8, 8, 0, 0], [20, 20, 8, 12, 0, 8], [4, 20, 4, 6, 0, 20], [4, 20, 4, 6, 4, 20],
  ]));

  const sheep = await texture("entity/sheep/sheep");
  save("items/sheep.png", await compose(sheep, 6, 6, [[8, 8, 6, 6, 0, 0]]));

  const steve = await texture("entity/player/wide/steve");
  save("items/player.png", await compose(steve, 16, 32, [
    [8, 8, 8, 8, 4, 0], [20, 20, 8, 12, 4, 8], [44, 20, 4, 12, 0, 8], [36, 52, 4, 12, 12, 8],
    [4, 20, 4, 12, 4, 20], [20, 52, 4, 12, 8, 20],
    [40, 8, 8, 8, 4, 0],
  ]));

  const chest = await texture("entity/chest/normal");
  save("items/chest.png", await compose(chest, 14, 15, [
    [14, 14, 14, 5, 0, 0], [14, 33, 14, 10, 0, 5], [1, 1, 2, 4, 6, 3],
  ]));

  const titles = Object.values(SCENES).map((f) => `File:${f}`).join("|");
  const url = `${WIKI_API}?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=1600&titles=${encodeURIComponent(titles)}`;
  const pages = JSON.parse((await get(url)).toString()).query.pages;
  const byTitle = Object.fromEntries(Object.values(pages).map((p) => [p.title.replace(/ /g, "_"), p.imageinfo?.[0]]));
  const credits = [];
  for (const [kind, file] of Object.entries(SCENES)) {
    const info = byTitle[`File:${file}`];
    if (!info) throw new Error(`No wiki image for ${file}`);
    const img = await get(info.thumburl);
    save(`scenes/${kind}.webp`, await sharp(img).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer());
    save(`scenes/${kind}-sm.webp`, await sharp(img).resize({ width: 640 }).webp({ quality: 72 }).toBuffer());
    credits.push(`${kind}: ${info.descriptionurl}`);
  }
  save("scenes/CREDITS.txt", Buffer.from(`Screenshots from the Minecraft Wiki (minecraft.fandom.com).\n\n${credits.join("\n")}\n`));
  console.log("assets downloaded");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
