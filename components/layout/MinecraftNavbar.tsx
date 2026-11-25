"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Pixel } from "@/components/art/Pixel";
import { MinecraftModal } from "@/components/mc/MinecraftModal";
import { useSound } from "@/components/mc/Sound";
import { nav, site } from "@/lib/site";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./MinecraftNavbar.module.css";

const SPLASHES = [
  "Now with 100% more blocks!",
  "Open to work!",
  "Also try Contact!",
  "Contains no creepers*",
  "Diamonds not included!",
  "Written by torchlight!",
  "Punch trees, ship code!",
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function MinecraftNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [splash, setSplash] = useState<string | null>(null);
  const { enabled, setEnabled } = useSound();

  useEffect(() => setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)]), []);
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name}: home`}>
          <Pixel sprite="grass" size={36} className={styles.logoBlock} />
          <span className={styles.logoText}>{site.name}</span>
          {splash && (
            <span className={styles.splash} aria-hidden="true">
              {splash}
            </span>
          )}
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <ThemeSwitcher />
          <button
            type="button"
            className={styles.sound}
            aria-pressed={enabled}
            aria-label={enabled ? "Turn sound off" : "Turn sound on"}
            title={enabled ? "Sound on" : "Sound off"}
            onClick={() => setEnabled(!enabled)}
          >
            <Pixel sprite="disc" size={24} style={{ opacity: enabled ? 1 : 0.45 }} />
          </button>
          <button
            type="button"
            className={styles.menuButton}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Menu
          </button>
        </div>
      </div>

      <MinecraftModal open={menuOpen} onClose={() => setMenuOpen(false)} title="Game Menu">
        <nav aria-label="Main mobile">
          <ul className={styles.mobileList}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileLink}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileWorld}>
          <span>Dimension</span>
          <ThemeSwitcher />
        </div>
      </MinecraftModal>
    </header>
  );
}
