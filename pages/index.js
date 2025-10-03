import Head from "next/head";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const FEATURE_CARDS = [
  {
    title: "Curated Learning Paths",
    body: "Chart a personalised route through the best educational YouTube channels, playlists, and lectures without getting lost in the noise.",
  },
  {
    title: "Adaptive Recommendations",
    body: "Our engine learns with you, surfacing the next video that builds on what you just mastered for compounding growth.",
  },
  {
    title: "Immersive Note-Taking",
    body: "Capture insights with synchronised notes, transcripts, and highlights that stay connected to each moment of discovery.",
  },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateViewport = () => setViewportHeight(window.innerHeight || 1);
    const handleScroll = () => {
      const current = window.scrollY || window.pageYOffset || 0;
      setScrollY(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateViewport();
    handleScroll();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollProgress = Math.min(scrollY / (viewportHeight * 0.65), 1);

  return (
    <>
      <Head>
        <title>Noesis | Watch, Learn and Master</title>
        <meta
          name="description"
          content="Noesis helps you watch, learn, and master faster with a cinematic parallax hero and curated journeys."
        />
      </Head>

      <Navbar scrollProgress={scrollProgress} />

      <main className={styles.main}>
        <Hero scrollY={scrollY} viewportHeight={viewportHeight} />

        <section id="journey" className={`${styles.section} ${styles.sectionAlternate}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Start Your Journey</h2>
            <p className={styles.sectionText}>
              Dive into curated collections of the most insightful educational videos. Noesis layers discovery,
              structure, and reflection so every watch moves you closer to mastery.
            </p>
            <div className={styles.featureGrid}>
              {FEATURE_CARDS.map((feature) => (
                <div key={feature.title} className={styles.featureCard}>
                  <div className={styles.featureTitle}>{feature.title}</div>
                  <p className={styles.featureText}>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>About Noesis</h2>
            <p className={styles.sectionText}>
              We believe the best learning happens when ideas unfold at the right tempo. Inspired by alpine horizons,
              Noesis combines cinematic storytelling with the depth of long-form video to keep curious minds in flow.
            </p>
          </div>
        </section>

        <section id="services" className={`${styles.section} ${styles.sectionAlternate}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Services</h2>
            <p className={styles.sectionText}>
              From tailored mentorship tracks to studio-crafted explainer series, we help educators and creators bring
              knowledge to life across every medium.
            </p>
          </div>
        </section>

        <section id="blog" className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Latest From The Blog</h2>
            <p className={styles.sectionText}>
              Stories on mastering focus, building a consistent learning ritual, and reverse-engineering world-class
              explainers. Fresh insights land here first.
            </p>
          </div>
        </section>

        <section id="learn-more" className={`${styles.section} ${styles.sectionAlternate}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Let&apos;s Build Your Peak</h2>
            <p className={styles.sectionText}>
              Ready to see how Noesis can accelerate your path to mastery? Reach out and we&apos;ll craft a climbing map for
              the skills you&apos;re chasing.
            </p>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.sectionText}>
              hello@noesis.studio
              <br />
              123 Summit Avenue, Aurora Basin
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
