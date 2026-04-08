"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const caseStudies = [
  {
    client: "A neighborhood bar",
    tag: "Membership Platform",
    description:
      "Their current generation was decades of loyalty with no system to capture it. Regulars showed up because of relationships that lived in people's heads. Their next generation is a digital membership platform that turned goodwill into recurring revenue and made every relationship permanent.",
  },
  {
    client: "An entertainment venue",
    tag: "CRM + Apple Wallet",
    description:
      "Their current generation was a staff that knew every regular by name, but that knowledge walked out the door with turnover. Their next generation is a membership CRM with Apple Wallet integration where every relationship belongs to the business, regardless of who's working on any given night.",
  },
  {
    client: "A charter boat company",
    tag: "Operations Portal",
    description:
      "Their current generation was managing driver onboarding, maintenance scheduling, and booking confirmations across two cities through spreadsheets and manual SMS. Their next generation is a custom operations portal with automated dispatch, real-time driver workflows, and an SMS system that handles booking confirmations without anyone touching it.",
  },
];

export function ProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Businesses we&apos;ve taken to their next generation.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="text-nexark-purple hover:text-nexark-magenta transition-colors font-semibold text-sm tracking-wide"
            >
              See our work →
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="card-glow p-8 flex flex-col"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-nexark-purple uppercase mb-4">
                {study.tag}
              </span>
              <h3 className="text-xl font-bold text-white mb-4">
                {study.client}
              </h3>
              <p className="text-text-secondary leading-relaxed text-[15px] flex-1">
                {study.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
