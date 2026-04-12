import Link from "next/link";

import { MotionBlock } from "@/components/motion/MotionBlock";

import styles from "./Footer.module.css";

const githubUrl = "https://github.com/waynegraham/velum";
const iiifReferenceUrl = "https://iiif.io/api/presentation/3.0/";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <MotionBlock
          className={styles.description}
          reveal={{ distance: 8, duration: 0.44, start: "top 94%" }}
        >
          <p className={styles.eyebrow}>Velum</p>
          <p className={styles.copy}>
            Velum frames IIIF as a reading experience: normalized manifest data,
            restrained React primitives, and motion only where the sequence asks for it.
          </p>
          <p className={styles.context}>
            A system for building IIIF-driven, interactive cultural experiences.
          </p>
        </MotionBlock>

        <MotionBlock
          as="div"
          className={styles.links}
          reveal={{ delay: 0.05, distance: 6, duration: 0.42, start: "top 94%" }}
        >
          <nav aria-label="Footer">
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
        </MotionBlock>
      </div>
    </footer>
  );
}
