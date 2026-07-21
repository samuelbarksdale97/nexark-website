import type { Metadata } from "next";
import { Montserrat, Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NextArcVisual } from "@/components/visuals/NextArc/NextArcVisual";
import "./globals.css";
import "./refresh.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

// Refresh design-system fonts — used by the `.nx` redesign pages (scoped in refresh.css)
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexark | Success is not an accident, it's engineered.",
  description:
    "Nexark builds custom software for real businesses — we rebuild how your operation runs, or build the app, platform, or product you have in mind. Two doors, one team.",
  keywords: [
    "custom software",
    "app development",
    "AI systems",
    "business automation",
    "product development",
    "reality engineering",
    "digital transformation",
  ],
  authors: [{ name: "Samuel Barksdale" }],
  // Without metadataBase, Next resolves og:image against localhost — the unfurl would ship
  // pointing at a machine nobody else can reach. Scrapers require an absolute URL.
  metadataBase: new URL("https://www.nexark.ai"),
  openGraph: {
    title: "Nexark | Success is not an accident, it's engineered.",
    description:
      "We build custom software and AI systems around how your business actually works.",
    type: "website",
    locale: "en_US",
    siteName: "Nexark",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nexark — Success Engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexark | Success is not an accident, it's engineered.",
    description:
      "We build custom software and AI systems around how your business actually works.",
    images: ["/og-image.png"],
  },
  // app/icon.png and app/apple-icon.png are picked up automatically by Next's file
  // convention and OVERRIDE anything declared here — declared explicitly anyway so the
  // intent is readable.
  icons: {
    // favicon.ico FIRST and at the root is what Google's search-result favicon crawler fetches;
    // its absence (a 404) is why Google was falling back to the Vercel default mark. icon.png
    // covers modern browsers that prefer PNG.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

// Organization structured data — the strongest signal for Google to attach Nexark's own logo to
// the brand in search / the knowledge panel, rather than guessing from the favicon alone.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexark",
  url: "https://www.nexark.ai",
  logo: "https://www.nexark.ai/icon.png",
  description:
    "Nexark builds custom software for real businesses — rebuilding how an operation runs, or building the app, platform, or product a founder has in mind.",
  slogan: "Success is not an accident. It's engineered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen text-white antialiased relative selection:bg-purple-500/30" style={{ backgroundColor: '#050508' }}>
        <NextArcVisual />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
