import Head from "next/head";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { PricingSection } from "../components/PricingSection";
import { FinalCtaSection } from "../components/FinalCtaSection";
import { SiteFooter } from "../components/SiteFooter";
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

        <TestimonialsSection />

        <PricingSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
    </>
  );
}
