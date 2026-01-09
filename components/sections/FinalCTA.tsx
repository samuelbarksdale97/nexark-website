"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="apply"
      className="py-32 md:py-48 bg-gradient-to-b from-navy-light to-navy relative overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left side - main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            {/* Main headline */}
            <div className="mb-8">
              <h2 className="font-display text-display-lg font-bold text-white leading-none">
                Ready to begin
              </h2>
              <h2 className="font-display text-display-lg font-bold text-gradient leading-none mt-2">
                your next arc?
              </h2>
            </div>

            <p className="text-xl text-slate/80 mb-10 max-w-lg">
              Let&apos;s remember what you originally dreamed—and build the technology that makes it real.
            </p>

            {/* Value props */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-3 mb-10 max-w-md"
            >
              <p className="text-lg text-white/80">
                ✓ AI-native development • 30-50% faster
              </p>
              <p className="text-lg text-white/80">
                ✓ Reality Engineering lens • Dream to delivery
              </p>
              <p className="text-lg text-white/80">
                ✓ Satisfaction guaranteed • We&apos;ll make it right or refund you
              </p>
              <p className="text-lg text-white/80">
                ✓ Secure, scalable, production-ready
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button href="/apply" size="lg" showArrow>
                Start Your Build
              </Button>
            </motion.div>

            {/* Fine print */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-slate/60"
            >
              Limited capacity. Discovery calls book 2-3 weeks out.
            </motion.p>
          </motion.div>

          {/* Right side - visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Abstract destination visual */}
              <div className="aspect-square relative">
                {/* Concentric circles representing growth */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/5"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.div
                  className="absolute inset-[15%] rounded-full border border-white/10"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.div
                  className="absolute inset-[30%] rounded-full border border-indigo/20"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                />
                <motion.div
                  className="absolute inset-[42%] rounded-full bg-gradient-to-br from-indigo/10 to-purple/10 border border-indigo/30"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />

                {/* Center glow */}
                <motion.div
                  className="absolute inset-[45%] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1.5 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                />

                {/* NEXARK wordmark */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  <span className="font-display text-xl tracking-[0.3em] text-white/20">
                    NEXARK
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
