"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function FounderStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="story" ref={ref} className="py-32 md:py-48 relative overflow-hidden">
      {/* Full-bleed background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple/5 via-transparent to-indigo/5" />
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Story content - asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-lg text-white/70 leading-relaxed max-w-xl">
              <p className="font-display text-2xl text-white font-semibold mb-4">
                Genesis: Our Case Study
              </p>
              <p>
                Before we build for you, we built for ourselves. <span className="text-white font-medium">266 Python scripts</span> running
                every part of our business—from AI consultation to project management to CRM integration to photo culling to course simulation.
              </p>
              <p>
                Custom project management tools. AI-powered research systems. CRM integrations with mobile apps.
                Visual dashboards. Secure webhooks. Content pipelines. Reality Engineering session tools. Document automation.
              </p>
              <p className="text-white font-medium">
                We didn&apos;t buy off-the-shelf. We didn&apos;t settle for &ldquo;good enough.&rdquo;
                We <span className="text-gradient">built exactly what we needed</span> to the Nexark BUILD standard.
              </p>
              <p className="text-xl text-white">
                If we can build it for us, we can build it for you.
              </p>
            </div>

            {/* Attribution */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-6">
                {/* Stylized initials */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 border border-white/10 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gradient">SB</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-lg">
                    Samuel Barksdale
                  </p>
                  <p className="text-slate">Founder & Chief Engineer</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button href="#apply" variant="secondary" size="lg">
                Book Strategy Session
              </Button>
            </div>
          </motion.div>

          {/* Visual element - abstract representation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square">
              {/* Abstract representation of transformation */}
              <svg
                className="w-full h-full"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dark origin point */}
                <motion.circle
                  cx="60" cy="240" r="40"
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />

                {/* Transformation path */}
                <motion.path
                  d="M 80 220 Q 150 150 240 60"
                  stroke="url(#story-gradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Bright destination */}
                <motion.circle
                  cx="240" cy="60" r="30"
                  fill="rgba(99,102,241,0.1)"
                  stroke="rgba(99,102,241,0.5)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.8 }}
                />

                {/* Inner glow */}
                <motion.circle
                  cx="240" cy="60" r="10"
                  fill="rgba(168,85,247,0.6)"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 2.2 }}
                />

                <defs>
                  <linearGradient id="story-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="50%" stopColor="rgba(99,102,241,0.5)" />
                    <stop offset="100%" stopColor="rgba(168,85,247,0.8)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Labels */}
              <motion.span
                className="absolute bottom-4 left-4 text-xs text-white/30 tracking-wider"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                DARKNESS
              </motion.span>
              <motion.span
                className="absolute top-4 right-4 text-xs text-indigo tracking-wider"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
              >
                CLARITY
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
