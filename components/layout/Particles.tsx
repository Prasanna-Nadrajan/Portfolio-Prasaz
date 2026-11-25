import styles from "./Particles.module.css";

// Fixed positions keep server and client markup identical.
const PARTICLES = [
  [6, 0, 14], [14, 3.2, 18], [23, 6.1, 15], [31, 1.4, 20], [42, 8.3, 16], [51, 4.4, 19],
  [60, 2.2, 17], [68, 7.1, 14], [77, 0.8, 21], [85, 5.6, 16], [93, 9.4, 18], [37, 11, 22],
];

/** Slow-drifting square particles behind the page; colour follows the active world. */
export function Particles() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {PARTICLES.map(([left, delay, duration], i) => (
        <span
          key={i}
          style={{ left: `${left}%`, animationDelay: `-${delay}s`, animationDuration: `${duration}s`, opacity: 0.25 + (i % 4) * 0.1 }}
        />
      ))}
    </div>
  );
}
