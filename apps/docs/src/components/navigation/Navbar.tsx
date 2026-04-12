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
] as const;

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const style = {
    "--nav-scroll": scrollProgress,
  } as CSSProperties;

  return (
    <header className={cx(styles.root, scrollProgress > 0.08 && styles.scrolled)} style={style}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          Velum
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cx(styles.link, item.match(pathname) && styles.linkActive)}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          <a
            className={styles.link}
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
