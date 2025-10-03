import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  scrollProgress?: number;
}

const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ scrollProgress = 0 }: NavbarProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
    <header className={styles.navbar}>
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
      </nav>
    </header>
  );
}
