import type { Metadata } from "next";
import { TutorialPage } from "@/components/tutorials/TutorialPage";

export const metadata: Metadata = {
  title: "Tutoriaalit",
  description: "Neljä KL Texture -hiustyyliä, selkeät vaiheet ja oikeat tuotteet niiden rakentamiseen."
};

export default function GuidePage() {
  return <TutorialPage />;
}
