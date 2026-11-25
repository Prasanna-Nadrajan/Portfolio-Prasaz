# Prasanna Nadrajan R.: Minecraft-themed portfolio

A Next.js 15 + MDX portfolio that uses Minecraft's own textures, GUI sprites and screenshots.

## Assets

- `public/mc/blocks`, `items`, `gui`, `sounds`: vanilla 1.21.1 textures and sound effects. `npm run assets` re-downloads them.
- `public/mc/scenes`: Minecraft Wiki screenshots (see `CREDITS.txt`), stored as WebP.
- Font: [Monocraft](https://github.com/IdreesInc/Monocraft) (SIL OFL), in `app/fonts`.

Minecraft textures and screenshots belong to Mojang. Keep this a non-commercial fan site and keep the footer disclaimer.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static build, deploys to Vercel as-is
```

## Pages

Home, Projects (`/projects`, `/projects/<slug>`), Skills, About and Contact. A title screen shows once per browser session; add `?skipintro` to a link to skip it.

## Add a project

Create `content/projects/<slug>.mdx` with front matter: `title`, `summary`, `date`, `tags`, `role`, `status` (Completed | In progress), `rarity`, `scene`, `coverAlt`, optional `demo` / `repo`, `featured`, and `sample` (true shows a SAMPLE badge). In the body you can use `<Tip>`, `<Figure>`, `<Gallery>` and `<Item>`.

Projects live in `content/projects`; profile, skills, experience and timeline live in `lib/site.ts`. Put your resume at `public/Prasanna_Nadrajan_Resume.pdf`. Skill bar values and project dates are placeholders to adjust.

## Interactions

- Hotbar: keys 1–5 to travel, E for inventory
- Explorer XP fills as sections scroll into view
- Mine hero grass blocks (3 clicks each)
- Optional game sound effects (disc button in the header)
- 11 achievements, including a Konami-code secret

## Where things live

| Path | What |
| --- | --- |
| `lib/site.ts` | Name, nav, categories, profile stats, social links |
| `lib/projects.ts` | The only content data layer. Reimplement it to switch to a CMS |
| `components/mc/` | MinecraftButton, MinecraftCard, InventorySlot, ItemTooltip, MinecraftModal, MinecraftBadge, MinecraftProgressBar, AchievementNotification |
| `components/layout/` | Navbar, footer, theme (Overworld / Nether / End) |
| `components/portfolio/` | LoadingScreen, Hotbar, ProjectCard, QuestCard, PlayerProfile, ContactForm, Hero, Easter eggs |
| `components/art/` | `Pixel` (item icons) and `PixelScene` (screenshots) |
| `scripts/fetch-assets.mjs` | Downloads every asset in `public/mc` (`npm run assets`) |

The footer "World online" status is decorative and is not connected to a server.

## Deploy to Vercel

1. Push this repo to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New → Project**, import the repo and keep the defaults (Framework: Next.js, build `next build`).
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your custom domain for correct social-share links.

Everything is pre-rendered at build time; no environment variables or backend are required.
