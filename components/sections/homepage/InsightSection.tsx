"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function InsightSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-10 leading-tight tracking-tight"
          >
            Every business has a next generation.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-text-secondary leading-relaxed"
          >
            <p>
              The current generation of your business is however it runs today:
              the tools you picked up along the way, the processes that grew
              over time, the ceiling you keep bumping into. It works. But you
              know it could work differently.
            </p>
            <p>
              Your next generation is what your business becomes when those
              limits get removed. When the technology fits how you actually
              operate. When the systems compound instead of just keeping up.
              When the thing you&apos;ve been describing in meetings for years
              finally exists.
            </p>
            <p className="text-white/80">
              The gap between the two is closer than it feels. You just need
              the right engine to close it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
