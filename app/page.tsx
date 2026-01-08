import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
// import { RealityEngineering } from "@/components/sections/RealityEngineering"; // Now integrated into HowItWorks
// import { Proof } from "@/components/sections/Proof"; // Removed per user request
import { Offerings } from "@/components/sections/Offerings";
import { FounderStory } from "@/components/sections/FounderStory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Header />

      {/* The Complete Funnel */}

      {/* 1. HOOK - Success is not an accident */}
      <Hero />

      {/* 2. PROBLEM - You're capable of more */}
      <Problem />

      {/* 3. SOLUTION - Reality Engineering */}
      <Solution />

      {/* 4. HOW - Blueprint → Build → Partner (Powered by Reality Engineering) */}
      <HowItWorks />

      {/* Reality Engineering now integrated into HowItWorks section above */}
      {/* <RealityEngineering /> */}

      {/* 5. PROOF - Stats and Testimonials */}
      {/* <Proof /> */}

      {/* 6. OFFER - myNexark vs Business */}
      <Offerings />

      {/* 7. STORY - Founder's origin */}
      <FounderStory />

      {/* 8. CTA - Apply for Reality Engineering */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
