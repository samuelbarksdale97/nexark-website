"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Offerings } from "@/components/sections/Offerings";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
// import { IntroPreloader } from "@/components/ui/preloader/IntroPreloader"; // Disabled for dev

export default function Home() {
  // Disabled intro state for development
  const [introComplete, setIntroComplete] = useState(true);
  const [showContent, setShowContent] = useState(true);

  // const handleIntroComplete = () => {
  //   setIntroComplete(true);
  //   setTimeout(() => setShowContent(true), 100);
  // };

  return (
    <>
      <AnimatePresence mode="wait">
        {/* {!introComplete && (
          <IntroPreloader onComplete={handleIntroComplete} />
        )} */}
      </AnimatePresence>

      <main className={`min-h-screen transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation */}
        <Header />

        {/* The Complete Funnel */}

        {/* 1. HOOK - Success is not an accident */}
        <Hero />

        {/* 2. PROBLEM - You're capable of more */}
        <Problem />

        {/* 3. SOLUTION - Reality Engineering - HIDDEN FOR NOW */}
        {/* <Solution /> */}

        {/* 4. HOW - Blueprint → Build → Partner (Powered by Reality Engineering) */}
        <HowItWorks />

        {/* 5. PROOF - Stats and Testimonials */}
        {/* <Proof /> */}

        {/* 6. OFFER - myNexark vs Business */}
        <Offerings />

        {/* 7. CTA - Apply for Reality Engineering */}
        <FinalCTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
