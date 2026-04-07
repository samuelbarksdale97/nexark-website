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
            Your business is unique. Your technology should be too.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-text-secondary leading-relaxed"
          >
            <p>
              Off-the-shelf tools were built for everyone, which means they were
              built for no one in particular. You&apos;ve been adapting your
              processes to fit the software. The software should fit you.
            </p>
            <p>
              We start with your inputs: your workflows, your team, your vision,
              your constraints. Nobody else has your exact combination.
              That&apos;s why a solution built specifically for yours will always
              outperform one built for the average.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
