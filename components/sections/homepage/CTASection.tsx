"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse,rgba(102,0,204,0.3)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            What&apos;s the next generation of your business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary mb-12 leading-relaxed"
          >
            That&apos;s the question every engagement starts with. You tell us
            where you are and where you&apos;ve always wanted to take it. We
            dig into the details and start mapping out what it would take to get
            there. The goal of the first conversation is to understand your
            situation well enough to give you something useful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button href="/start" size="lg">
              Start a Conversation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
