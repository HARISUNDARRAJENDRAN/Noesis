import { motion } from "framer-motion";
import type { ReactElement } from "react";
import styles from "../../styles/AboutPage.module.css";

export function HeroSection(): ReactElement {
  const containerVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.55, 0.55, 1],
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  } as const;

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.17, 0.55, 0.55, 1] } },
  } as const;

  return (
    <section className={styles.heroSection}>
      <motion.div
        className={styles.heroInner}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className={styles.heroEyebrow} variants={childVariants}>
          About Noesis
        </motion.span>
        <motion.h1 className={styles.heroHeadline} variants={childVariants}>
          Stop Watching. Start Knowing.
        </motion.h1>
        <motion.p className={styles.heroBody} variants={childVariants}>
          YouTube is the world&apos;s biggest library, but learning from it feels like drinking from a firehose. You
          watch, you forget, and key insights get lost in the noise. We built Noesis to bridge the gap between passively
          watching and actively understanding.
        </motion.p>
      </motion.div>
    </section>
  );
}
