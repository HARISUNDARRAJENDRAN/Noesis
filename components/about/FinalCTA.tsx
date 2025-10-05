import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import styles from "../../styles/AboutPage.module.css";

export function FinalCTA(): ReactElement {
  return (
    <section className={styles.ctaSection}>
      <motion.div
        className={styles.ctaInner}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.4, 1] }}
      >
        <h2>Turn information into intelligence.</h2>
        <p>
          Bring Noesis into your browser and transform passive viewing into structured, memorable learning. It&apos;s the
          fastest way to make every watch session compound.
        </p>
        <Link href="/" className={styles.ctaButton}>
          Add Noesis to Your Browser for Free
        </Link>
      </motion.div>
    </section>
  );
}
