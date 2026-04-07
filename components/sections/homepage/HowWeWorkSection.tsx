"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Blueprint",
    description:
      "We come in and map your current operation: tools, processes, revenue leaks, friction points. Then we design what needs to exist. We figure out what your business actually needs, which is usually different from what you'd ask for if we just took an order.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Custom software, AI systems, and automation engineered around your specific workflows. We sit on top of what you already use. Your existing tools start working together instead of against each other.",
  },
  {
    number: "03",
    title: "Partner",
    description:
      "Your business changes. Your technology evolves with it. We stay in your corner for ongoing optimization, strategic consultation, and the kind of partnership where we're invested in your outcome long-term.",
  },
];

export function HowWeWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-20 max-w-2xl tracking-tight"
        >
          How we work
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="card-glow p-8 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-nexark-purple/10 border border-nexark-purple/20 text-nexark-purple text-xs font-bold tracking-widest">
                  {phase.number}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {phase.title}
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
