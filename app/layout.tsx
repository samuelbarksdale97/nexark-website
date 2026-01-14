import type { Metadata } from "next";
import { Space_Grotesk, Inter, Cormorant_Garamond } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NextArcVisual } from "@/components/visuals/NextArc/NextArcVisual";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display-v2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexark | Success is not an accident, it's engineered.",
  description: "The vessel from where you are to where you're meant to be. Reality Engineering for ambitious individuals and founders.",
  keywords: ["reality engineering", "transformation", "coaching", "business consulting", "AI tools", "personal development"],
  authors: [{ name: "Samuel Barksdale" }],
  openGraph: {
    title: "Nexark | Success is not an accident, it's engineered.",
    description: "The vessel from where you are to where you're meant to be.",
    type: "website",
    locale: "en_US",
    siteName: "Nexark",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexark | Success is not an accident, it's engineered.",
    description: "The vessel from where you are to where you're meant to be.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="min-h-screen bg-navy text-white antialiased relative selection:bg-indigo-500/30">
        <NextArcVisual />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
