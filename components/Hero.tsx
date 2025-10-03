import { useEffect, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import styles from "../styles/Hero.module.css";

interface HeroProps {
  scrollY?: number;
  viewportHeight?: number;
}

export default function Hero({ scrollY = 0, viewportHeight = 1 }: HeroProps): ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);

  const safeViewportHeight = Math.max(viewportHeight ?? 1, 1);
  const parallaxFactor = 0.25;
  const maxOffset = safeViewportHeight * 0.4;
  const scrollOffset = Math.min(scrollY * parallaxFactor, maxOffset);
  const fadeProgress = Math.min(scrollY / (safeViewportHeight * 0.7), 1);
  const baseOffset = isLoaded ? 0 : 30;
  const contentStyle: CSSProperties = {
    opacity: isLoaded ? Math.max(0, 1 - fadeProgress) : 0,
    transform: `translateY(${baseOffset + scrollOffset}px)`,
  };

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.parallax}>
        <div
          className={`${styles.layer} ${styles.layerBackground}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.layer} ${styles.layerMidground} ${isLoaded ? styles.animateUp : ''}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.layer} ${styles.layerForeground} ${isLoaded ? styles.animateUp : ''}`}
          aria-hidden="true"
        />
        <div className={styles.gradientOverlay} aria-hidden="true" />
      </div>

      <div
        className={`${styles.content} ${isLoaded ? styles.contentVisible : ''}`}
        style={contentStyle}
      >
        <h1 className={styles.title}>
          <span>Go Beyond</span>
          <span>Watching</span>
        </h1>
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
