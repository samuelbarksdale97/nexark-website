"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CTAVisual } from "./cta/CTAVisual";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="apply"
      className="py-32 md:py-48 bg-[#020410] relative overflow-hidden flex items-center justify-center min-h-[60vh]"
    >
      {/* Dreamer's Zenith Visual Background */}
      <CTAVisual />

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main headline */}
          <div className="mb-8">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
              Ready to begin<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 blur-[0.5px]">
                your next arc?
              </span>
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s remember what you originally dreamed—and build the technology that makes it real.
          </p>

          {/* Value props - Centered Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-12 text-left max-w-2xl mx-auto"
          >
            {[
              "AI-native development • 30-50% faster",
              "Reality Engineering lens • Dream to delivery",
              "Satisfaction guaranteed • Or we refund you",
              "Secure, scalable, production-ready"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-lg text-slate-300/90">
                <span className="text-indigo-400">✓</span> {item}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-6 mb-8"
          >
            <Button href="https://cal.com/sam-barksdale/discovery" size="lg" className="h-14 px-10 text-lg rounded-full group bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 w-auto">
              <span className="flex items-center gap-2 whitespace-nowrap">
                Book Strategy Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </span>
            </Button>


          </motion.div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm font-medium text-slate-500"
          >
            Limited capacity. Discovery calls book 2-3 weeks out.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
