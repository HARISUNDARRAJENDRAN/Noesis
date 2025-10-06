import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import styles from "../styles/Home.module.css";

export function FinalCtaSection(): ReactElement {
  return (
    <section id="learn-more" className={styles.finalCtaSection}>
      <div className={styles.finalCtaCanvas} aria-hidden="true" />

      <motion.div
        className={styles.finalCtaHero}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.7, 0.4, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className={styles.finalCtaContent}>
          <span className={styles.finalCtaEyebrow}>Your learning summit awaits</span>
          <h2 className={styles.finalCtaTitle}>Start your journey toward lasting insight.</h2>
          <p className={styles.finalCtaLead}>
            Craft immersive, cinematic learning experiences that move you forward. Noesis turns every watch session into
            connected, actionable knowledge.
          </p>
          <Link href="/register" className={styles.finalCtaButton}>
            Take the first step now
          </Link>
        </div>
      </motion.div>

      <motion.div
        id="contact"
        className={styles.finalCtaContactBar}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.7, 0.4, 1], delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div>
          <span>Have a question? Email us at</span>
          <a href="mailto:hello@noesis.studio">hello@noesis.studio</a>
        </div>
        <div className={styles.finalCtaContactActions}>
          <a href="tel:+15552108860">+1 (555) 210-8860</a>
          <a href="https://cal.com/noesis" target="_blank" rel="noreferrer">
            Schedule a conversation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
