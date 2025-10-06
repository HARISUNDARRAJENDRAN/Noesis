import Link from "next/link";
import type { ReactElement, SVGProps } from "react";
import styles from "../styles/Footer.module.css";

type SocialLink = {
  href: string;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

const YEAR = new Date().getFullYear();

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/company/noesis",
    label: "Follow Noesis on LinkedIn",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
        <path d="M20.45 20.45h-3.56v-5.41c0-1.29-.02-2.96-1.8-2.96-1.8 0-2.07 1.4-2.07 2.86v5.51H9.46V9h3.42v1.56h.05c.48-.91 1.66-1.86 3.41-1.86 3.64 0 4.31 2.4 4.31 5.52v6.23ZM5.34 7.38a2.05 2.05 0 1 1 0-4.1 2.05 2.05 0 0 1 0 4.1Zm-1.79 13.07h3.58V9H3.55v11.45ZM22.23 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.46c.97 0 1.77-.78 1.77-1.75V1.75C24 .78 23.2 0 22.23 0Z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com/noesis",
    label: "Follow Noesis on X",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
        <path d="M17.53 3H20.6l-6.72 7.68L21.27 21h-5.52l-4.33-5.64L6.38 21H3.3l7.2-8.23L2.98 3h5.6l3.9 5.13L17.53 3Zm-.96 15.32h1.53L7.53 4.6H5.88l10.69 13.72Z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@noesis",
    label: "Watch Noesis on YouTube",
    icon: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
        <path d="M21.58 7.2a2.36 2.36 0 0 0-1.66-1.66C18 5 12 5 12 5s-6 0-7.92.54a2.36 2.36 0 0 0-1.66 1.66A24.16 24.16 0 0 0 2 12a24.16 24.16 0 0 0 .42 4.8 2.36 2.36 0 0 0 1.66 1.66C6 19 12 19 12 19s6 0 7.92-.54a2.36 2.36 0 0 0 1.66-1.66A24.16 24.16 0 0 0 22 12a24.16 24.16 0 0 0-.42-4.8ZM10.26 14.75V9.25L14.74 12l-4.48 2.75Z" />
      </svg>
    ),
  },
];

export function SiteFooter(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBackdrop} aria-hidden="true" />
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link href="/#home" className={styles.logo}>
            Noesis
          </Link>
          <p className={styles.tagline}>Cinematic learning, grounded in clarity.</p>
        </div>

        <nav className={styles.footerNav} aria-label="Footer">
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <a href="https://blog.noesis.studio" target="_blank" rel="noreferrer">
            Blog
          </a>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>

      <div className={styles.footerMeta}>
        <span>© {YEAR} Noesis. All rights reserved.</span>
        <div className={styles.socialRow}>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.href} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">
              {link.icon({ className: styles.socialIcon })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
