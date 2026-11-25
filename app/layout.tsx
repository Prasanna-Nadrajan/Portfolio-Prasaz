import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AchievementProvider } from "@/components/mc/AchievementNotification";
import { MinecraftFooter } from "@/components/layout/MinecraftFooter";
import { MinecraftNavbar } from "@/components/layout/MinecraftNavbar";
import { Particles } from "@/components/layout/Particles";
import { WorldProvider } from "@/components/layout/World";
import { SoundProvider } from "@/components/mc/Sound";
import { Hotbar } from "@/components/portfolio/Hotbar";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { site } from "@/lib/site";
import { worldInitScript } from "@/lib/world";
import "./globals.css";

// Monocraft (SIL OFL 1.1): an open-source font modelled on the in-game typeface.
// next/font needs literal options, hence the repeated file list.
const mc = localFont({
  src: [
    { path: "./fonts/Monocraft-Regular.ttf", weight: "400" },
    { path: "./fonts/Monocraft-Bold.ttf", weight: "700" },
  ],
  variable: "--font-mc",
  display: "swap",
});
// Same face scaled down for long-form text, so body copy keeps a comfortable size.
const mcBody = localFont({
  src: [
    { path: "./fonts/Monocraft-Regular.ttf", weight: "400" },
    { path: "./fonts/Monocraft-Bold.ttf", weight: "700" },
  ],
  variable: "--font-mc-body",
  display: "swap",
  preload: false,
  declarations: [{ prop: "size-adjust", value: "74%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Portfolio`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: { siteName: site.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-world="overworld" className={`${mc.variable} ${mcBody.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: worldInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SoundProvider>
          <AchievementProvider>
            <WorldProvider>
              <LoadingScreen />
              <Particles />
              <MinecraftNavbar />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <MinecraftFooter />
              <Hotbar />
            </WorldProvider>
          </AchievementProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
