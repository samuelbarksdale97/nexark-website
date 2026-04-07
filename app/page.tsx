"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/homepage/HeroSection";
import { InsightSection } from "@/components/sections/homepage/InsightSection";
import { HowWeWorkSection } from "@/components/sections/homepage/HowWeWorkSection";
import { PrinciplesSection } from "@/components/sections/homepage/PrinciplesSection";
import { ProofSection } from "@/components/sections/homepage/ProofSection";
import { CTASection } from "@/components/sections/homepage/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <InsightSection />
      <HowWeWorkSection />
      <PrinciplesSection />
      <ProofSection />
      <CTASection />
      <Footer />
    </main>
  );
}
