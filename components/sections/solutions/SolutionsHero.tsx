"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function SolutionsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-navy to-navy-light overflow-hidden pt-32 pb-20">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase">
              <span className="w-8 h-px bg-gradient-to-r from-indigo to-transparent" />
              What We Build
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-xl font-bold text-white mb-6"
          >
            Success isn&apos;t an accident;
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-display-xl font-bold text-gradient mb-10"
          >
            it&apos;s engineered.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-4"
          >
            This is where you engineer it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            We build custom technology for any business challenge. From a simple website to complex agentic workflows. From workflow automation to data infrastructure to customer experiences.
          </motion.p>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-xl border border-white/10 bg-navy-light/50">
              <p className="font-display text-2xl font-bold text-gradient mb-2">Start Simple</p>
              <p className="text-slate-200">
                Build a website, a dashboard, a simple integration. Test the waters with focused solutions.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-indigo/20 bg-navy-light">
              <p className="font-display text-2xl font-bold text-gradient mb-2">Scale Smart</p>
              <p className="text-slate-200">
                Add agentic workflows that supercharge your systems. Automate the manual work.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-purple/20 bg-navy-light">
              <p className="font-display text-2xl font-bold text-gradient mb-2">Go Deep</p>
              <p className="text-slate-200">
                Transform entire operations. Full tech stacks. Everything custom-built and connected.
              </p>
            </div>
          </motion.div>

          {/* The key insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 p-8 rounded-2xl border border-gold/20 bg-navy-light max-w-3xl mx-auto"
          >
            <p className="text-lg text-white font-medium mb-3">
              The opportunity is in the integration
            </p>
            <p className="text-slate-200 leading-relaxed">
              A website is just a website—until you add an agentic workflow that researches every contact form submission.
              A CRM is just data entry—until automation updates it from your emails and calendar.
              That's where custom-built technology creates leverage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
