import type { Metadata } from "next";
import { Pixel } from "@/components/art/Pixel";
import { Breadcrumb } from "@/components/portfolio/Breadcrumb";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { InventorySlot } from "@/components/mc/InventorySlot";
import { site, socials } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = { title: "Contact", description: "Send me a message." };

export default function ContactPage() {
  return (
    <div className="container page">
      <Breadcrumb items={[{ label: "World", href: "/" }, { label: "Contact" }]} />
      <h1 className="page-title section-head">
        <Pixel sprite="writableBook" size={36} />
        Contact
      </h1>
      <p className="section-sub">Write in the book and quill. It opens your email app with the message ready to send.</p>

      <div className={styles.grid}>
        <div data-xp="form">
          <ContactForm email={site.email} />
        </div>
        <aside className={styles.side} aria-label="Other ways to reach me" data-xp="socials">
          <h2 className={styles.sideTitle}>Other ways</h2>
          <p className={styles.email}>
            <Pixel sprite="map" size={20} />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <div className={styles.socials}>
            {socials.map((s) => (
              <InventorySlot key={s.label} item={s.icon} name={s.label} lore={s.lore} href={s.href} size="lg" />
            ))}
          </div>
          <p className={styles.small}>Based in Chennai (IST). Open to roles worldwide.</p>
        </aside>
      </div>
    </div>
  );
}
