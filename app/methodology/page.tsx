import { Header } from "@/components/Header";
import { RealityEngineering } from "@/components/sections/RealityEngineering";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Reality Engineering Methodology | Nexark",
  description: "Our unique approach to custom software development. We don't just build what you ask for—we help you remember what you originally dreamed and make it real.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* Reality Engineering Explanation */}
      <RealityEngineering />

      {/* CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
