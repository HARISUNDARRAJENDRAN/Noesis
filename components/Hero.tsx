import { useEffect, useState } from "react";
import styles from "../styles/Hero.module.css";

interface HeroProps {
  scrollY?: number;
  viewportHeight?: number;
}

export default function Hero({ scrollY = 0, viewportHeight = 1 }: HeroProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

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

      <div className={`${styles.content} ${isLoaded ? styles.contentVisible : ''}`}>
        <h1 className={styles.title}>
          <span>Watch, Learn</span>
          <span>and Master</span>
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
