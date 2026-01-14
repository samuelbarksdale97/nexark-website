"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const painPoints = [
  {
    line1: "Off-the-shelf software",
    line2: "forces you to adapt.",
    detail: (
      <>
        Generic SaaS makes you bend your business to their limitations.{" "}
        <span className="text-white font-medium">You need software that fits YOU.</span>
      </>
    ),
    align: "left" as const,
  },
  {
    line1: "You're losing time",
    line2: "on manual workarounds.",
    detail: (
      <>
        Hours spent on tasks that should take minutes. Missed opportunities because your systems can't keep up. Revenue left on the table.{" "}
        <span className="text-white font-medium">Custom automation would eliminate the bottleneck.</span>
      </>
    ),
    align: "right" as const,
  },
  {
    line1: "You're patching together",
    line2: "five different tools.",
    detail: (
      <>
        Zapier integrations that break. Manual workarounds filling gaps.{" "}
        <span className="text-white font-medium">One custom solution would replace it all.</span>
      </>
    ),
    align: "left" as const,
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-24 md:py-32 relative overflow-hidden bg-navy"
    >
      {/* Solid background to hide stars - stark contrast for "the problem" */}
      <div className="absolute inset-0 bg-navy z-0" />

      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section intro - small, understated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase">
            <span className="w-8 h-px bg-gradient-to-r from-white/60 to-transparent" />
            The Problem
          </span>
        </motion.div>

        {/* Pain points - cinematic typography */}
        <div className="space-y-24 md:space-y-40">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className={`max-w-5xl ${point.align === "right" ? "ml-auto text-right" : ""}`}
            >
              {/* Main statement - giant typography */}
              <div className="space-y-2">
                <h3 className="font-display text-display-lg font-bold text-white leading-none">
                  {point.line1}
                </h3>
                <h3 className="font-display text-display-lg font-bold text-white/40 leading-none">
                  {point.line2}
                </h3>
              </div>

              {/* Detail - smaller, muted */}
              <div className="mt-6 md:mt-8 text-lg md:text-xl text-slate max-w-xl leading-relaxed">
                {point.detail}
              </div>

              {/* Visual accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                className={`mt-8 h-px w-24 bg-gradient-to-r from-indigo/50 to-transparent ${point.align === "right" ? "ml-auto origin-right" : "origin-left"
                  }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Transition statement - the pivot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-32 md:mt-48 max-w-4xl mx-auto text-center"
        >
          <div className="space-y-4">
            <p className="font-display text-display-md font-bold text-white">
              You&apos;re ready for your next arc.
            </p>
            <p className="font-display text-display-md font-bold text-white/40">
              You just need the right technology to get there.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 md:mt-16"
          >

            <p className="font-display text-display-md font-bold text-gradient">
              Custom software that takes you there.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </motion.section>
  );
}
