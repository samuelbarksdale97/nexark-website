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
              className="group relative h-full"
            >
              <div className={`
                relative h-full p-8 lg:p-10 rounded-2xl overflow-hidden bg-[#0a0d17] transition-all duration-500
                border-t border-l border-r border-b
                ${phase.aesthetic === "wireframe"
                  ? "border-t-white/10 border-l-white/5 border-r-white/5 border-b-black/50 hover:border-t-white/20"
                  : "border-t-purple-500/20 border-l-purple-500/10 border-r-purple-500/10 border-b-black/50 shadow-[0_0_40px_-10px_rgba(124,58,237,0.1)] hover:shadow-[0_0_60px_-10px_rgba(124,58,237,0.2)]"
                }
              `}>
                {/* Internal Lighting/Glow (Simulated reflection) */}
                <div className={`
                  absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700
                  bg-gradient-to-b ${phase.aesthetic === "wireframe" ? "from-white/5 to-transparent" : "from-purple-500/10 to-transparent"}
                `} />

                {/* Static Top Glow */}
                <div className={`
                  absolute top-0 left-0 right-0 h-32 opacity-20 bg-gradient-to-b 
                  ${phase.aesthetic === "wireframe" ? "from-white" : "from-purple-500"} to-transparent pointer-events-none
                `} />

                {/* Tech Grid Pattern (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg className="w-full h-full" width="100%" height="100%">
                    <defs>
                      <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Tech Badge Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`
                       flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest border
                       ${phase.aesthetic === "wireframe"
                        ? "bg-white/5 border-white/10 text-white/60"
                        : "bg-purple-500/10 border-purple-500/20 text-purple-300 shadow-[0_0_10px_rgba(124,58,237,0.2)]"
                      }
                     `}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      PHASE {phase.number}
                    </div>
                    {phase.aesthetic !== "wireframe" && (
                      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    )}
                  </div>

                  {/* Title Group */}
                  <div className="mb-6">
                    <h3 className="font-display text-4xl font-bold text-white mb-2">
                      {phase.title}
                    </h3>
                    <p className={`
                      text-sm font-medium tracking-wide uppercase
                      ${phase.color === "slate" ? "text-slate-400" : phase.color === "white" ? "text-indigo-200" : "text-purple-400"}
                    `}>
                      {phase.headline}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-8 flex-grow">
                    <p className="text-slate-300 leading-relaxed text-base border-l-2 border-white/5 pl-4">
                      {phase.description}
                    </p>
                  </div>

                  {/* Bullets */}
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {phase.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className={`
                          mt-1.5 w-1 h-1 rounded-full transition-all duration-300
                          ${phase.aesthetic === "wireframe" ? "bg-slate-500 group-hover/item:bg-white" : "bg-purple-500 group-hover/item:bg-purple-300"}
                        `} />
                        <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">
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
    </section >
  );
}
