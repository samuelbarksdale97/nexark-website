"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    number: "01",
    title: "Discover",
    headline: "Understand your vision",
    description: "We map your ideal future state through structured discovery. Dream Dossier, gap analysis, and reverse engineering from goal to reality.",
    bullets: [
      "Dream Dossier creation",
      "Current state assessment",
      "Reverse roadmap to goals",
    ],
    aesthetic: "wireframe" as const,
    color: "slate",
  },
  {
    number: "02",
    title: "Build",
    headline: "Engineer your solution",
    description: "Custom software designed to your specifications. Agentic workflow systems and digital infrastructure built for scale.",
    bullets: [
      "Custom software architecture",
      "Agentic workflow design",
      "System integration planning",
    ],
    aesthetic: "wireframe" as const,
    color: "white",
  },
  {
    number: "03",
    title: "Partner",
    headline: "Launch and optimize",
    description: "Ongoing partnership with continuous optimization. Not a one-and-done—we steward your success through every iteration.",
    bullets: [
      "System deployment and testing",
      "Performance optimization",
      "Long-term partnership",
    ],
    aesthetic: "warm" as const,
    color: "purple",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase mb-6">
            <span className="w-8 h-px bg-gradient-to-r from-white/60 to-transparent" />
            The Process
          </span>
          <h2 className="font-display text-display-lg font-bold text-white">
            Three phases.
          </h2>
          <h2 className="font-display text-display-lg font-bold text-white/40">
            One transformation.
          </h2>
          <h2 className="font-display text-display-lg font-bold text-gradient mt-4">
            Powered by Reality Engineering.
          </h2>
          <p className="mt-6 text-lg text-slate/80 max-w-2xl">
            We don't just build what you ask for—we help you remember what you originally dreamed.
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              <div className={`
                relative h-full p-8 lg:p-10 rounded-2xl border overflow-hidden
                ${phase.aesthetic === "wireframe"
                  ? "border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                  : "border-purple/20 bg-gradient-to-br from-purple/5 to-transparent"
                }
              `}>
                {/* Giant background number */}
                <span className="absolute -right-4 -top-8 font-display text-[180px] font-bold text-white/[0.02] select-none leading-none">
                  {phase.number}
                </span>

                {/* Phase-specific visual treatment */}
                {phase.aesthetic === "wireframe" && (
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
                    </svg>
                  </div>
                )}

                {phase.aesthetic === "warm" && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-purple/5 blur-3xl" />
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Number */}
                  <span className={`
                    text-sm font-medium tracking-wider
                    ${phase.color === "slate" ? "text-slate" : phase.color === "white" ? "text-white/70" : "text-purple"}
                  `}>
                    {phase.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mt-4 mb-2">
                    {phase.title}
                  </h3>

                  {/* Headline */}
                  <p className={`
                    text-lg font-medium mb-6
                    ${phase.color === "slate" ? "text-white/60" : phase.color === "white" ? "text-white" : "text-purple-light"}
                  `}>
                    {phase.headline}
                  </p>

                  {/* Description */}
                  <p className="text-slate leading-relaxed mb-8">
                    {phase.description}
                  </p>

                  {/* Bullets - styled per aesthetic */}
                  <div className="space-y-3">
                    {phase.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${phase.color === "slate" ? "bg-white/60" : phase.color === "white" ? "bg-white" : "bg-purple"
                          }`} />
                        <span className="text-sm text-white/80">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 md:mt-32 h-px w-full bg-gradient-to-r from-white/20 via-white/30 to-purple/30 origin-left"
        />
      </div>
    </section>
  );
}
