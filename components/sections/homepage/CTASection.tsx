"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-28 md:py-36 border-t border-white/5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse,rgba(102,0,204,0.3)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Ready for your next arc?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary mb-12 leading-relaxed"
          >
            We start with a conversation about where your business is and where
            it&apos;s going. If there&apos;s a fit, we&apos;ll show you
            what&apos;s possible. If there isn&apos;t, you&apos;ll know that
            too.
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-text-muted mt-8"
          >
            Limited capacity. Discovery calls book 2-3 weeks out.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
