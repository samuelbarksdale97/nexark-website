"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ROICalculator } from "@/components/sections/ROICalculator";

export default function ROICalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy pt-20">
        <ROICalculator />
      </main>
      <Footer />
    </>
  );
}
