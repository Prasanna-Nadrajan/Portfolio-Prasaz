import styles from "./template.module.css";

/** Re-mounts on every navigation, giving each page a short pixel fade-in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.enter}>{children}</div>;
}
