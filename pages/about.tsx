import Head from "next/head";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { HeroSection } from "../components/about/HeroSection";
import { InteractiveDemo } from "../components/about/InteractiveDemo";
import { FinalCTA } from "../components/about/FinalCTA";
import Navbar from "../components/Navbar";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../styles/AboutPage.module.css";

export default function AboutPage(): ReactElement {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleScroll = () => {
      const current = window.scrollY || 0;
      const docHeight = document.body.scrollHeight - window.innerHeight || 1;
      setScrollY(current);
      setScrollProgress(Math.min(current / (docHeight * 0.6), 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Noesis | About</title>
        <meta
          name="description"
          content="See how Noesis transforms YouTube into an active learning companion through interactive demos and a guided narrative."
        />
      </Head>
      <Navbar scrollProgress={scrollProgress} scrollY={scrollY} />
      <main className={styles.page}>
        <HeroSection />
        <InteractiveDemo />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
