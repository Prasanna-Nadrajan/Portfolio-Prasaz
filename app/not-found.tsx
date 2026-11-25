import { MinecraftButton } from "@/components/mc/MinecraftButton";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>You Died!</h1>
      <p className={styles.reason}>Explorer fell out of the world while looking for this page.</p>
      <p className={styles.score}>
        Error: <span>404</span>
      </p>
      <div className={styles.actions}>
        <MinecraftButton href="/" size="lg" block>
          Respawn
        </MinecraftButton>
        <MinecraftButton href="/blog" size="lg" block>
          Title screen: Blog
        </MinecraftButton>
      </div>
    </div>
  );
}
