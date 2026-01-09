"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const buildCategories = [
  {
    title: "Business Systems",
    description: "Custom CRMs • Project Management • Client Portals • Revenue Operations • Agentic Workflows",
    icon: "system" as const,
  },
  {
    title: "Agentic Workflows & Automation",
    description: "AI Assistants • Content Generation • Document Automation • Data Extraction • Research Tools",
    icon: "ai" as const,
  },
  {
    title: "Integrations & Infrastructure",
    description: "API Integrations • Webhooks • Database Design • Authentication • Cloud Deployment • Mobile Apps",
    icon: "infrastructure" as const,
  },
  {
    title: "Intelligence & Analytics",
    description: "Business Dashboards • Custom Visualizations • Reporting Systems • Performance Tracking",
    icon: "analytics" as const,
  },
];

export function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="what-we-build" ref={ref} className="py-32 md:py-48 bg-navy relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header - left aligned */}
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase">
              <span className="w-8 h-px bg-gradient-to-r from-indigo to-transparent" />
              What We Build
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-xl font-bold text-gradient mb-6"
          >
            Custom Software
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-2xl mb-16 md:mb-24"
          >
            Bespoke technology built through Reality Engineering methodology. Secure, scalable, production-grade.
          </motion.p>
        </div>

        {/* Build Categories Grid - Matching Process section style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {buildCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full p-8 lg:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden transition-all duration-300">
                {/* Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed text-base">
                    {category.description}
                  </p>
                </div>

                {/* Animated bottom line on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo via-purple to-transparent group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
