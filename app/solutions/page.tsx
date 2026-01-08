import { Header } from "@/components/Header";
import { SolutionsHero } from "@/components/sections/solutions/SolutionsHero";
import { SolutionsGrid } from "@/components/sections/solutions/SolutionsGrid";
import { IntegrationsSection } from "@/components/sections/solutions/IntegrationsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Solutions | Nexark - Custom Software for Every Business Challenge",
  description: "From simple websites to complex agentic workflows. We build custom technology for any business challenge—workflow automation, CRMs, dashboards, integrations, voice agents, and more.",
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Hero - Explaining the range */}
      <SolutionsHero />

      {/* Solutions Categories Grid */}
      <SolutionsGrid />

      {/* Integrations Deep Dive */}
      <IntegrationsSection />

      {/* CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
