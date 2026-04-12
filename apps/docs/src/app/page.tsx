import type { Metadata } from "next";

import { HomePageExperience } from "@/components/home/HomePageExperience";

export const metadata: Metadata = {
  title: "Velum",
  description:
    "A digital exhibition for IIIF-driven components, templates, and reading sequences.",
};

export default function HomePage() {
  return <HomePageExperience />;
}
