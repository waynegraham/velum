"use client";

import { LenisProvider } from "@velum/adapters";
import { useManifest } from "@velum/react";

import { ArrivalSection } from "./ArrivalSection";
import { EncounterSection } from "./EncounterSection";
import { ExplorationSection } from "./ExplorationSection";
import { OrientationSection } from "./OrientationSection";
import { ReflectionSection } from "./ReflectionSection";

import styles from "./homepage.module.css";

const manifestUrl =
  "https://iiif.harvardartmuseums.org/manifests/object/299843";

export function HomePageExperience() {
  const manifestState = useManifest(manifestUrl);

  return (
    <LenisProvider>
      <main className={styles.page}>
        <ArrivalSection {...manifestState} />
        <OrientationSection />
        <EncounterSection manifestUrl={manifestUrl} {...manifestState} />
        <ExplorationSection />
        <ReflectionSection manifestUrl={manifestUrl} />
      </main>
    </LenisProvider>
  );
}
