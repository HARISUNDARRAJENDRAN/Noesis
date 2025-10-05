import type { ReactElement } from "react";
import styles from "../../styles/AboutPage.module.css";
import { HeroSection } from "./HeroSection";
import { InteractiveDemo } from "./InteractiveDemo";

export function AboutExperience(): ReactElement {
  return (
    <div id="about" className={styles.experience}>
      <HeroSection />
      <InteractiveDemo />
    </div>
  );
}
