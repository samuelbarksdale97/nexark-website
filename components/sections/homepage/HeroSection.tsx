"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-24 md:pb-32"
    >
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(102,0,204,0.15)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "3rem" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-nexark-purple to-nexark-magenta mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gradient leading-[1.08] mb-10 tracking-tight"
          >
            The transformation engine for your next generation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-6 font-light"
          >
            We partner with businesses to build the custom technology that takes
            them from where they are to where they&apos;ve always wanted to be.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-12"
          >
            You bring the vision. We bring the engineering capability to make it
            real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex gap-4"
          >
            <Button href="/start" size="lg">
              Start a Conversation
            </Button>
            <Button href="/solutions" size="lg" variant="secondary">
              See Solutions
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
