"use client";

import { LenisProvider } from "@velum/adapters";
import { useManifest } from "@velum/react";

import { PageFrame } from "@/components/layout";

import { ArrivalSection } from "./ArrivalSection";
import { DeliberationSection } from "./DeliberationSection";
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
      <PageFrame className={styles.page}>
        <ArrivalSection {...manifestState} />
        <OrientationSection />
        <EncounterSection manifestUrl={manifestUrl} {...manifestState} />
        <DeliberationSection />
        <ExplorationSection />
        <ReflectionSection manifestUrl={manifestUrl} />
      </PageFrame>
    </LenisProvider>
  );
}
