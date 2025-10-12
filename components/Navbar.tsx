import { useMemo, useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  scrollProgress?: number;
  scrollY?: number;
}

const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar({ scrollProgress = 0, scrollY = 0 }: NavbarProps): ReactElement {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleResize = (): void => {
      if (window.innerWidth >= 960) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const closeMenu = (): void => setMenuOpen(false);

  useEffect(() => {
    const current = scrollY ?? 0;
    const last = lastScrollY.current;

    if (menuOpen) {
      setIsHidden(false);
    } else if (current < 80) {
      setIsHidden(false);
    } else if (current > last + 4) {
      setIsHidden(true);
    } else if (current < last - 4) {
      setIsHidden(false);
    }

    lastScrollY.current = current;
  }, [scrollY, menuOpen]);

  const navbarClassName = useMemo<string>(() => {
    const classes = [styles.navbar];
    if (isHidden) {
      classes.push(styles.navbarHidden);
    }
    return classes.join(" ");
  }, [isHidden]);

  const shellClassName = useMemo<string>(() => {
    const classes = [styles.shell];
    if (scrollProgress > 0.05) {
      classes.push(styles.shellScrolled);
    }
    if (menuOpen) {
      classes.push(styles.shellOpen);
    }
    return classes.join(" ");
  }, [menuOpen, scrollProgress]);

  const mobileNavClassName = useMemo<string>(() => {
    const classes = [styles.mobileNav];
    if (menuOpen) {
      classes.push(styles.mobileNavOpen);
    }
    if (scrollProgress > 0.05) {
      classes.push(styles.mobileNavLight);
    }
    return classes.join(" ");
  }, [menuOpen, scrollProgress]);

  return (
    <header className={navbarClassName}>
      <div className={shellClassName}>
        <Link href="/#home" className={styles.brand} onClick={closeMenu}>
          Noesis
        </Link>

        <nav className={styles.desktopNav} aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.navActions}>
          <Link href="/login" className={`${styles.navActionLink} ${styles.navActionText}`}>
            Log In
          </Link>
          <Link href="/register" className={`${styles.navActionLink} ${styles.navActionPrimary}`}>
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      <nav id="mobile-nav" className={mobileNavClassName} aria-label="Mobile Navigation">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <div className={styles.mobileNavActions}>
          <Link href="/login" className={styles.mobileNavAction} onClick={closeMenu}>
            Log In
          </Link>
          <Link href="/register" className={`${styles.mobileNavAction} ${styles.mobileNavPrimary}`} onClick={closeMenu}>
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
