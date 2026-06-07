import type { Metadata } from "next";
import { EditorialHomePage } from "@/components/home/EditorialHomePage";
import { getCurrentMonthTutorialTitle } from "@/lib/monthlyTutorialTitle";

export const metadata: Metadata = {
  title: "KL Texture | Parturin kehittämä hiustuotesarja",
  description:
    "KL Texture on parturin kehittämä suomalainen hiustuotesarja volyymiin, tekstuuriin, viimeistelyyn ja hiusten hoitoon. Löydä oma rutiinisi."
};

export default function HomePage() {
  return <EditorialHomePage monthlyTutorialTitle={getCurrentMonthTutorialTitle()} />;
}
