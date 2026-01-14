"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { IntegrationsInteractive } from "./IntegrationsInteractive";


export function IntegrationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-navy relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-blue-400 to-transparent" />
              Integrations Done Right
            </span>
            <h2 className="font-display text-display-lg font-bold text-white mb-6">
              We'll Work With Other Companies
            </h2>
            <h2 className="font-display text-display-lg font-bold text-white/40 mb-8 whitespace-nowrap">
              So You Don&apos;t Have To
            </h2>
            <p className="text-xl text-slate leading-relaxed">
              Integrations are where most projects fail. API changes, vendor communication, technical debt. We handle all of it.
            </p>
          </motion.div>

          {/* How we handle integrations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-16"
          >
            <div className="p-6 lg:p-8 rounded-2xl border border-blue-500/20 bg-navy-light">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    We Talk to Their Teams
                  </h3>
                  <p className="text-slate leading-relaxed">
                    Need to integrate with Stripe, Salesforce, QuickBooks, or a custom vendor API? We'll coordinate with their technical teams, navigate their documentation, and handle the implementation. You stay focused on your business.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl border border-blue-500/20 bg-navy-light">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Transparent Communication
                  </h3>
                  <p className="text-slate leading-relaxed">
                    If there are issues with a vendor—rate limits, deprecated APIs, missing features—we communicate that clearly. We'll propose alternatives, workarounds, or recommend different solutions if needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl border border-blue-500/20 bg-navy-light">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Future-Proof Architecture
                  </h3>
                  <p className="text-slate leading-relaxed">
                    We build integrations that can adapt when vendors change their APIs. Versioning, fallbacks, and monitoring ensure your systems don't break when external services update.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Common integrations - Interactive Prototype */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-24"
          >
            <IntegrationsInteractive />
          </motion.div>

          {/* Connective Tissue: "...and more" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative pt-12 pb-12 mt-8 overflow-hidden rounded-2xl"
          >
            <p className="relative z-10 text-center font-display text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40 pb-4">
              ...and more.
            </p>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
