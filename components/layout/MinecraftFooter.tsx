import Link from "next/link";
import { Pixel } from "@/components/art/Pixel";
import { nav, site, socials } from "@/lib/site";
import styles from "./MinecraftFooter.module.css";

const LINKS = nav;

export function MinecraftFooter() {
  return (
    <footer className={styles.footer}>
      <div className="ground-strip" aria-hidden="true" />
      <div className={styles.body}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.brand}>
            <p className={styles.thanks}>Thanks for exploring my world.</p>
            <p className={styles.note}>
              {site.name}&apos;s portfolio is Minecraft-themed.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className={styles.heading}>Explore</h2>
            <ul className={styles.links}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>Socials</h2>
            <ul className={styles.links}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} {...(/^https?:/.test(s.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <Pixel sprite={s.icon} size={16} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`container ${styles.bottom}`}>
          <span>© {new Date().getFullYear()} {site.author}</span>
          <span>Press 1–5 to travel, E for inventory.</span>
        </div>
      </div>
    </footer>
  );
}
