import type { JSX } from "react";
import styles from "../styles/AboutSection.module.css";
import Link from "next/link";

export function AboutSection(): JSX.Element {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <div className={styles.eyebrow}>About</div>
          <h2 className={styles.headline}>Stop Watching. Start Knowing.</h2>
          <p className={styles.pitch}>
            The internet is full of content, but true knowledge is rare. We built Noesis to bridge the gap between
            passively watching and actively understanding. It’s an AI co-pilot that transforms any video into an
            interactive learning experience.
          </p>
          <ul className={styles.bullets}>
            <li>Ask anything, instantly.</li>
            <li>See the big picture.</li>
            <li>Master what matters.</li>
          </ul>
          <p className={styles.mission}>Turn information into intelligence. That&apos;s it.</p>
          <Link href="/about" className={styles.ctaLink}>
            Explore the full Noesis experience →
          </Link>
        </div>
      </div>
    </section>
  );
}
