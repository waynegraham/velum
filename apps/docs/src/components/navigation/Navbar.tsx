"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./Navbar.module.css";

const githubUrl = "https://github.com/waynegraham/velum";

const navItems = [
  { href: "/", label: "Docs", match: (pathname: string) => pathname === "/" },
  {
    href: "/canvas-sequence",
    label: "Components",
    match: (pathname: string) => pathname.startsWith("/canvas-sequence"),
  },
  {
    href: "/scroll-story",
    label: "Templates",
    match: (pathname: string) => pathname.startsWith("/scroll-story"),
  },
  {
    href: "/design-system",
    label: "Design System",
    match: (pathname: string) => pathname.startsWith("/design-system"),
  },
] as const;

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      const nextProgress = Math.min(window.scrollY / 96, 1);
      setScrollProgress((current) =>
        Math.abs(current - nextProgress) < 0.01 ? current : nextProgress,
      );
    };

    updateScrollState();
    const handleScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateScrollState();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const style = {
    "--nav-scroll": scrollProgress,
  } as CSSProperties;

  return (
    <header className={cx(styles.root, scrollProgress > 0.08 && styles.scrolled)} style={style}>
      <div className={styles.inner}>
        <div className={styles.bar}>
          <Link className={styles.brand} href="/">
            Velum
          </Link>

          <button
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            Menu
          </button>
        </div>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className={cx(styles.nav, isMenuOpen && styles.navOpen)}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cx(styles.link, item.match(pathname) && styles.linkActive)}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <a
            className={styles.link}
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
