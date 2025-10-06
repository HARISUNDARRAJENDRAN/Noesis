import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import styles from "../../styles/Auth.module.css";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  eyebrow,
  children,
}: AuthShellProps): ReactElement {
  return (
    <div className={styles.shell}>
      <section className={styles.panel}>
        <Link href="/" className={styles.brand}>
          Noesis
        </Link>

        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.7, 0.4, 1] }}
        >
          {eyebrow ? <span className={styles.formEyebrow}>{eyebrow}</span> : null}
          <div className={styles.actionHeader}>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {children}
        </motion.div>
      </section>
    </div>
  );
}
