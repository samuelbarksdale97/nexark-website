"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Constellation } from "@/components/visuals/Constellation";

export function HeroV2() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-navy-deep)" }}
    >
      {/* Constellation background - full screen */}
      <div className="absolute inset-0 opacity-30">
        <Constellation />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--color-navy-deep)]" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-sm font-medium tracking-wide"
              style={{ color: "var(--color-gold-muted)" }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-[var(--color-gold-bright)] to-transparent" />
              Custom Technology Engineering
            </span>
          </motion.div>

          {/* Headline - Cormorant Garamond */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 space-y-2"
          >
            <h1 className="font-display-v2 text-hero font-bold tracking-tight text-white">
              We build
            </h1>
            <h1 className="font-display-v2 text-hero font-bold tracking-tight text-white/60">
              the software
            </h1>
            <h1 className="font-display-v2 text-hero font-bold tracking-tight text-white/60">
              you&apos;re missing.
            </h1>
          </motion.div>

          {/* Subhead - gold gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <span className="font-display-v2 text-display-md font-bold text-gradient-gold">
              CRMs • AI Tools • Integrations • Dashboards
            </span>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12"
          >
            Precision-engineered custom software through Reality Engineering methodology.
            <br />
            Secure. Scalable. Production-grade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button href="#apply" size="lg" showArrow>
              Start Your Build
            </Button>
            <Button href="#what-we-build" variant="secondary" size="lg" showArrow>
              See What We Build
            </Button>
          </motion.div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 text-sm"
            style={{ color: "var(--color-gold-muted)" }}
          >
            Connected intelligence. Engineered precision.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          style={{ borderColor: "var(--color-gold-bright)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-gold-bright)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
