import Link from "next/link";

import styles from "./Footer.module.css";

const githubUrl = "https://github.com/waynegraham/velum";
const iiifReferenceUrl = "https://iiif.io/api/presentation/3.0/";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.description}>
          <p className={styles.eyebrow}>Velum</p>
          <p className={styles.copy}>
            Velum frames IIIF as a reading experience: normalized manifest data,
            restrained React primitives, and motion only where the sequence asks for it.
          </p>
          <p className={styles.context}>
            A system for building IIIF-driven, interactive cultural experiences.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <a className={styles.link} href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link className={styles.link} href="/">
            Docs
          </Link>
          <a
            className={styles.link}
            href={iiifReferenceUrl}
            target="_blank"
            rel="noreferrer"
          >
            IIIF Reference
          </a>
        </nav>
      </div>
    </footer>
  );
}
