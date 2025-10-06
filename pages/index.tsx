import Head from "next/head";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AboutExperience } from "../components/about/AboutExperience";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PricingSection } from "../components/PricingSection";
import styles from "../styles/Home.module.css";

export default function HomePage(): ReactElement {
  const [scrollY, setScrollY] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(1);

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
        <title>Noesis | Go Beyond Watching</title>
        <meta
          name="description"
          content="Noesis helps you go beyond watching by guiding immersive journeys with cinematic storytelling and curated learning paths."
        />
      </Head>
      <Navbar scrollProgress={scrollProgress} scrollY={scrollY} />

      <main className={styles.main}>
        <Hero scrollY={scrollY} viewportHeight={viewportHeight} />
        <AboutExperience />

        <TestimonialsSection />

        <PricingSection />

        <div className={styles.stickyContainer}>
          <section id="learn-more" className={`${styles.section} ${styles.sectionLearn}`}>
            <div className={styles.sectionInner}>
              <span className={styles.sectionEyebrow}>Guided Experiences</span>
              <h2 className={styles.sectionTitle}>Let&apos;s Build Your Peak</h2>
              <p className={styles.sectionLead}>
                Ready to accelerate your ascent? We&apos;ll map a personalised route, complete with pacing guides, reflection
                prompts, and accountability check-ins.
              </p>
              <p className={styles.sectionText}>
                Share the skills you&apos;re chasing and we&apos;ll recommend the perfect blend of curated content, live coaching,
                and community touchpoints to keep you moving.
              </p>
              <div className={styles.sectionActions}>
                <a href="#contact" className={`${styles.sectionButton} ${styles.sectionButtonPrimary}`}>
                  Start Planning
                </a>
                <a href="#journey" className={`${styles.sectionButton} ${styles.sectionButtonGhost}`}>
                  Browse Journeys
                </a>
              </div>
            </div>
          </section>

          <section id="contact" className={`${styles.section} ${styles.sectionContact}`}>
            <div className={styles.sectionInner}>
              <span className={styles.sectionEyebrow}>Contact</span>
              <h2 className={styles.sectionTitle}>Let&apos;s Design Your Next Summit</h2>
              <p className={styles.sectionLead}>
                Tell us about your audience, the transformation you&apos;re guiding, and the stories you want to bring to life.
                We&apos;ll follow up with a tailored roadmap within two business days.
              </p>
              <div className={styles.sectionContactInfo}>
                <a href="mailto:hello@noesis.studio">hello@noesis.studio</a>
                <span>123 Summit Avenue, Aurora Basin</span>
                <span>+1 (555) 210-8860</span>
              </div>
              <div className={styles.sectionActions}>
                <a href="mailto:hello@noesis.studio" className={`${styles.sectionButton} ${styles.sectionButtonPrimary}`}>
                  Schedule a Call
                </a>
                <a href="#pricing" className={`${styles.sectionButton} ${styles.sectionButtonGhost}`}>
                  Download Capabilities
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
