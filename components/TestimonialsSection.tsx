import { motion } from "framer-motion";
import type { ReactElement } from "react";
import styles from "../styles/Home.module.css";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Amina Patel",
    role: "PhD Candidate, Stanford University",
    quote: "Noesis turned dense research briefs into guided breakthroughs. It kept me focused, organised, and two weeks ahead of schedule.",
  },
  {
    name: "Lucas Meyer",
    role: "Product Strategist, Arcadia Labs",
    quote: "I draw on Noesis before every client sprint. The narrative paths translate scattered ideas into confident, actionable plans.",
  },
  {
    name: "Priya Desai",
    role: "Lifelong Learner",
    quote: "The learning journeys keep me energised after long workdays. Each session feels like a personalised retreat for my brain.",
  },
  {
    name: "Haruto Sato",
    role: "Software Engineer, Summit Systems",
    quote: "Instead of rewatching entire recordings, I jump straight to what matters. Noesis trims hours from my weekly prep.",
  },
  {
    name: "Maya Richardson",
    role: "Leadership Coach",
    quote: "Clients rave about the clarity. The cards and analytics make progress visible, which builds trust in every engagement.",
  },
  {
    name: "Felix Romero",
    role: "Design Student, RISD",
    quote: "Noesis turns studio critiques into takeaways I can revisit. It's my quiet collaborator when deadlines pile up.",
  },
];

export function TestimonialsSection(): ReactElement {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsInner}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.7, 0.4, 1] }}
          viewport={{ once: true, amount: 0.45 }}
          className={styles.testimonialsHeader}
        >
          <span className={styles.testimonialsBadge}>Social Proof</span>
          <h2 className={styles.testimonialsTitle}>See How Learners Excel with Noesis</h2>
          <p className={styles.testimonialsIntro}>
            Students, professionals, and lifelong explorers rely on Noesis to distil complex stories into momentum that lasts.
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 40px 76px rgba(15, 23, 42, 0.22)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.7, 0.4, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <blockquote className={styles.testimonialQuote}>
                <strong>“{testimonial.quote}”</strong>
              </blockquote>
              <div className={styles.testimonialProfile}>
                <span className={styles.testimonialAvatar} aria-hidden />
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialName}>{testimonial.name}</span>
                  <span className={styles.testimonialRole}>{testimonial.role}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
