import { motion } from "framer-motion";
import { useState } from "react";
import type { ReactElement } from "react";
import styles from "../styles/Home.module.css";

type BillingCycle = "monthly" | "annual";

type FeatureItem = {
  label: string;
  kind?: "feature" | "heading";
};

type Plan = {
  id: string;
  name: string;
  highlight?: boolean;
  bestFor: string;
  monthlyPrice: number;
  annualPrice: number;
  cta: string;
  href: string;
  features: FeatureItem[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    bestFor: "Casual learners to experience the magic of active learning.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get Started for Free",
    href: "#contact",
    features: [
      { label: "10 Processing Credits / month (Up to 1.5 hours of video)" },
      { label: "Free processing for all videos under 5 mins" },
      { label: "Chat with Any Video (RAG)" },
      { label: "Timestamped Notes & Highlighting" },
      { label: "3 Playlists" },
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    highlight: true,
    bestFor: "Dedicated students & professionals who want to learn faster.",
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    cta: "Start Your Free Trial",
    href: "#contact",
    features: [
      { label: "120 Processing Credits / month (Up to 20 hours of video)" },
      { kind: "heading", label: "Everything in Starter, plus:" },
      { label: "Unused credits roll over" },
      { label: "AI-Assisted Writing in notes" },
      { label: "Automatic Tagging for notes" },
      { label: "One-Click Flashcard Generation" },
      { label: "Unlimited Playlists" },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    bestFor: "Researchers & power users building a personal knowledge engine.",
    monthlyPrice: 24.99,
    annualPrice: 19.99,
    cta: "Start Your Free Trial",
    href: "#contact",
    features: [
      { label: "300 Processing Credits / month (Up to 50 hours of video)" },
      { kind: "heading", label: "Everything in Pro, plus:" },
      { label: '"Ask Your Notes" Personal AI Bot' },
      { label: '"Connect the Dots" cross-video insights' },
      { label: "Unlimited Chatbot conversations" },
      { label: "Priority Support" },
    ],
  },
];

const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

const getPriceCopy = (plan: Plan, billingCycle: BillingCycle): { label: string; descriptor: string } => {
  if (plan.monthlyPrice === 0) {
    return { label: "$0 / forever", descriptor: "Forever free" };
  }

  if (billingCycle === "monthly") {
    return {
      label: `${formatPrice(plan.monthlyPrice)} / month`,
      descriptor: "Billed monthly",
    };
  }

  return {
    label: `${formatPrice(plan.annualPrice)} / month`,
    descriptor: "Billed annually — save 20%",
  };
};

export function PricingSection(): ReactElement {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.pricingInner}>
        <motion.div
          className={styles.pricingHeader}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.7, 0.4, 1] }}
          viewport={{ once: true, amount: 0.45 }}
        >
          <span className={styles.pricingBadge}>Plans & Pricing</span>
          <h2>Become a Superlearner. Choose Your Plan.</h2>
          <p>
            Transform any video into an interactive lesson, build a connected library of knowledge, and unlock your full
            potential. All plans start with a free trial.
          </p>
          <div className={styles.pricingToggle} role="group" aria-label="Billing cycle">
            <button
              type="button"
              className={`${styles.pricingToggleOption} ${billingCycle === "monthly" ? styles.pricingToggleActive : ""}`}
              onClick={() => setBillingCycle("monthly")}
              aria-pressed={billingCycle === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`${styles.pricingToggleOption} ${billingCycle === "annual" ? styles.pricingToggleActive : ""}`}
              onClick={() => setBillingCycle("annual")}
              aria-pressed={billingCycle === "annual"}
            >
              Annually
            </button>
            <span className={styles.pricingToggleNotice}>Save 20% on Annual Plans</span>
          </div>
        </motion.div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => {
            const priceCopy = getPriceCopy(plan, billingCycle);
            return (
              <motion.article
                key={plan.id}
                className={`${styles.pricingCard} ${plan.highlight ? styles.pricingCardHighlight : ""}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  boxShadow: plan.highlight
                    ? "0 60px 120px rgba(14, 116, 144, 0.28)"
                    : "0 48px 92px rgba(15, 23, 42, 0.22)",
                  borderColor: plan.highlight ? "rgba(14, 116, 144, 0.42)" : "rgba(15, 23, 42, 0.22)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 0.7, 0.4, 1] }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {plan.highlight ? <span className={styles.pricingCardBadge}>Best Value</span> : null}
                <header className={styles.pricingCardHeader}>
                  <h3>{plan.name}</h3>
                  <p>{plan.bestFor}</p>
                </header>
                <div className={styles.pricingPriceGroup}>
                  <span className={styles.pricingPrice}>{priceCopy.label}</span>
                  <span className={styles.pricingDescriptor}>{priceCopy.descriptor}</span>
                </div>
                <a href={plan.href} className={`${styles.sectionButton} ${styles.sectionButtonPrimary} ${styles.pricingCTA}`}>
                  {plan.cta}
                </a>
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((feature) => (
                    <li
                      key={`${plan.id}-${feature.label}`}
                      className={feature.kind === "heading" ? styles.pricingFeatureHeading : styles.pricingFeatureItem}
                    >
                      {feature.label}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
