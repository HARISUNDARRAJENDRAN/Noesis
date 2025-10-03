import { useMemo } from "react";
import styles from "../styles/Hero.module.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function Hero({ scrollY = 0, viewportHeight = 1 }) {
  const effectiveHeight = viewportHeight || 1;
  const progress = useMemo(() => {
    const ratio = scrollY / effectiveHeight;
    return clamp(ratio, 0, 1.4);
  }, [scrollY, effectiveHeight]);

  const parallaxTransforms = useMemo(
    () => ({
      background: `translateY(${progress * 25}px)`,
      midground: `translateY(${progress * 50}px)`,
      foreground: `translateY(${progress * 90}px)`,
      content: `translateY(${progress * 18}px)`
    }),
    [progress]
  );

  return (
    <section className={styles.hero} id="home">
      <div className={styles.parallax}>
        <div
          className={`${styles.layer} ${styles.layerBackground}`}
          style={{ transform: parallaxTransforms.background }}
          aria-hidden="true"
        />
        <div
          className={`${styles.layer} ${styles.layerMidground}`}
          style={{ transform: parallaxTransforms.midground }}
          aria-hidden="true"
        />
        <div
          className={`${styles.layer} ${styles.layerForeground}`}
          style={{ transform: parallaxTransforms.foreground }}
          aria-hidden="true"
        />
        <div className={styles.gradientOverlay} aria-hidden="true" />
      </div>

      <div className={styles.content} style={{ transform: parallaxTransforms.content }}>
        <h1 className={styles.title}>
          <span>Watch, Learn</span>
          <span>and Master</span>
        </h1>
        <p className={styles.subtitle}>Explore the depths of Educational Youtube videos</p>
        <div className={styles.actions}>
          <a className={`${styles.button} ${styles.primary}`} href="#journey">
            Start Your Journey
          </a>
          <a className={`${styles.button} ${styles.secondary}`} href="#learn-more">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
