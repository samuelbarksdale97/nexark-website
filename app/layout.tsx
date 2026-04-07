import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NextArcVisual } from "@/components/visuals/NextArc/NextArcVisual";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexark | Success is not an accident, it's engineered.",
  description:
    "We build custom software and AI systems around how your business actually works, and where you're trying to take it.",
  keywords: [
    "custom software",
    "AI systems",
    "business automation",
    "reality engineering",
    "digital transformation",
  ],
  authors: [{ name: "Samuel Barksdale" }],
  openGraph: {
    title: "Nexark | Success is not an accident, it's engineered.",
    description:
      "We build custom software and AI systems around how your business actually works.",
    type: "website",
    locale: "en_US",
    siteName: "Nexark",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexark | Success is not an accident, it's engineered.",
    description:
      "We build custom software and AI systems around how your business actually works.",
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
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen text-white antialiased relative selection:bg-purple-500/30" style={{ backgroundColor: '#050508' }}>
        <NextArcVisual />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
