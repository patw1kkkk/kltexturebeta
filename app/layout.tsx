import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopifyStorefront } from "@/components/shopify/ShopifyStorefront";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kltexture.fi"),
  title: {
    default: "KL Texture | Parturin kehittämä hiustuotesarja",
    template: "%s | KL Texture"
  },
  description:
    "KL Texture on parturin kehittämä suomalainen hiustuotesarja volyymiin, tekstuuriin, viimeistelyyn ja hiusten hoitoon. Löydä oma rutiinisi.",
  openGraph: {
    title: "KL Texture | Parturin kehittämä hiustuotesarja",
    description:
      "Suomalainen hiustuotesarja volyymiin, tekstuuriin, viimeistelyyn ja hiusten hoitoon.",
    url: "https://kltexture.fi",
    siteName: "KL Texture",
    images: [
      {
        url: "/images/hero/hero-transformation.png",
        width: 1600,
        height: 900,
        alt: "KL Texture hiustenmuotoilun lopputulos"
      }
    ],
    locale: "fi_FI",
    type: "website"
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <body className="min-h-screen bg-white text-ink antialiased">
        <ShopifyStorefront />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
