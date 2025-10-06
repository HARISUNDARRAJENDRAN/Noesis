import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { mockUser } from "../../lib/mock-data";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/AppLayout.module.css";

type AppLayoutProps = {
  children: ReactNode;
};

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/playlists", label: "My Playlists" },
  { href: "/explore", label: "Explore" },
  { href: "/community", label: "Community" },
];

export function AppLayout({ children }: AppLayoutProps): ReactElement {
  const router = useRouter();
  const { signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    void router.push("/login");
  };

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.brand}>
          Noesis
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = router.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.profile}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={handleToggleMenu}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.avatarWrapper}>
              <Image src={mockUser.avatarUrl} alt={mockUser.name} className={styles.avatar} width={40} height={40} />
              <span className={styles.statusDot} aria-hidden="true" />
            </span>
            <span className={styles.profileInfo}>
              <span className={styles.profileName}>{mockUser.name}</span>
              <span className={styles.profileRole}>{mockUser.role}</span>
            </span>
            <svg className={styles.profileCaret} viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.47 6.53a.75.75 0 0 1 1.06 0L8 8.94l2.47-2.41a.75.75 0 1 1 1.06 1.06l-3 2.92a.75.75 0 0 1-1.06 0l-3-2.92a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>

          <div className={`${styles.profileMenu} ${menuOpen ? styles.profileMenuOpen : ""}`}>
            <div className={styles.profileMenuHeader}>
              <span className={styles.profileName}>{mockUser.name}</span>
              <span className={styles.profileRole}>{mockUser.role}</span>
            </div>
            <Link href="/settings" className={styles.profileMenuLink} onClick={handleCloseMenu}>
              Account settings
            </Link>
            <Link href="/support" className={styles.profileMenuLink} onClick={handleCloseMenu}>
              Support center
            </Link>
            <button type="button" className={styles.profileMenuLink} onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
