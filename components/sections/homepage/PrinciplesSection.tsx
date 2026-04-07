"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  {
    title: "We design with intention, not default.",
    description:
      "Most businesses run on systems nobody chose on purpose. We help you take that apart and rebuild it deliberately.",
  },
  {
    title: "We build infrastructure that works without you in the middle.",
    description:
      "The goal is a system that produces results independent of your constant attention. If your business only runs because you're running it, we have work to do.",
  },
  {
    title: "Every sprint teaches us something.",
    description:
      "We build, measure, and adjust. The clients who move fastest are the ones who learn from each cycle and use it to inform the next one.",
  },
  {
    title: "The technology has to fit how you actually operate.",
    description:
      "We've seen what happens when you force a business into someone else's framework. It works on paper. It falls apart in practice. We build around you.",
  },
];

export function PrinciplesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-20 max-w-3xl tracking-tight"
        >
          What drives our work
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              className="card p-8"
            >
              <div className="accent-line">
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                  {principle.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
