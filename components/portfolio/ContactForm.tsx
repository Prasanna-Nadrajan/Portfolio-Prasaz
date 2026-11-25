"use client";

import { useState, type FormEvent } from "react";
import { Pixel } from "@/components/art/Pixel";
import { useAchievements } from "@/components/mc/AchievementNotification";
import { MinecraftButton } from "@/components/mc/MinecraftButton";
import styles from "./ContactForm.module.css";

const MAX = 1000;

/**
 * Book-and-quill styled form. There is no backend: submitting opens the
 * visitor's email client with the message pre-filled.
 */
export function ContactForm({ email }: { email: string }) {
  const { unlock } = useAchievements();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ""}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
    unlock("contact");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <form className={styles.book} onSubmit={submit}>
      <div className={styles.page}>
        <p className={styles.pageNo} aria-hidden="true">
          Page 1 of 1
        </p>
        <label className={styles.field}>
          <span>Your name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} />
        </label>
        <label className={styles.field}>
          <span>Your email (optional)</span>
          <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="email" maxLength={120} />
        </label>
        <label className={styles.field}>
          <span>Message</span>
          <textarea
            required
            rows={7}
            value={message}
            maxLength={MAX}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Prasanna, I have a quest for you…"
          />
        </label>
        <p className={styles.count} aria-live="polite">
          {message.length}/{MAX}
        </p>
      </div>
      <div className={styles.actions}>
        <MinecraftButton type="submit" variant="grass" icon={<Pixel sprite="feather" size={18} />}>
          Sign and send
        </MinecraftButton>
        <MinecraftButton onClick={copy} icon={<Pixel sprite="map" size={18} />}>
          {copied ? "Copied!" : "Copy email"}
        </MinecraftButton>
      </div>
      {sent && (
        <p className={styles.sent} role="status">
          Your email app should open with the message ready. If it didn&apos;t, email {email} directly.
        </p>
      )}
    </form>
  );
}
