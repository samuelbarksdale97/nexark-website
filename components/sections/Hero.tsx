"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text animation variants
  const lineVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
    >
      {/* Single gradient orb - off center, subtle */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary subtle orb */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
        }}
      />

      {/* Content - asymmetric layout */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-16 lg:py-20">

            {/* Left side - Typography (7 columns) */}
            <div className="lg:col-span-7">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 lg:mb-8"
              >
                <span className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-slate">
                  <span className="w-8 h-px bg-gradient-to-r from-indigo to-transparent" />
                  Reality Engineering
                </span>
              </motion.div>

              {/* Main headline - massive typography */}
              <div className="space-y-2 lg:space-y-4">
                <div className="overflow-hidden">
                  <motion.h1
                    custom={0}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-hero font-bold tracking-tight text-white"
                  >
                    We build
                  </motion.h1>
                </div>

                <div className="overflow-hidden">
                  <motion.h1
                    custom={1}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-hero font-bold tracking-tight text-white/60"
                  >
                    the software
                  </motion.h1>
                </div>

                <div className="overflow-hidden">
                  <motion.h1
                    custom={2}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-hero font-bold tracking-tight text-white/60"
                  >
                    you&apos;re missing.
                  </motion.h1>
                </div>
              </div>

              {/* Secondary line with gradient */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-4 lg:mt-6"
              >
                <span className="font-display text-display-md font-bold text-gradient">
                  CRMs • Agentic Workflows • Integrations • Dashboards
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mt-6 lg:mt-8 text-base lg:text-lg text-slate max-w-lg leading-relaxed"
              >
                AI-native development. 30-day delivery. Satisfaction guaranteed. We build custom CRMs, agentic workflows, and business intelligence—the technology that takes your business to its next arc.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3"
              >
                <Button href="#apply" size="lg" showArrow>
                  Start Your Build
                </Button>
                <Button href="#what-we-build" variant="ghost" size="lg">
                  See What We Build
                </Button>
              </motion.div>
            </div>

            {/* Right side - Abstract visual element (5 columns) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-md">
                {/* Architectural lines */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid of precise lines */}
                  <motion.line
                    x1="0" y1="100" x2="400" y2="100"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                  <motion.line
                    x1="0" y1="200" x2="400" y2="200"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                  />
                  <motion.line
                    x1="0" y1="300" x2="400" y2="300"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.0 }}
                  />
                  <motion.line
                    x1="100" y1="0" x2="100" y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.1 }}
                  />
                  <motion.line
                    x1="200" y1="0" x2="200" y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                  <motion.line
                    x1="300" y1="0" x2="300" y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.3 }}
                  />

                  {/* Accent diagonal */}
                  <motion.line
                    x1="50" y1="350" x2="350" y2="50"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />

                  {/* Central focus point */}
                  <motion.circle
                    cx="200" cy="200" r="60"
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  />
                  <motion.circle
                    cx="200" cy="200" r="40"
                    stroke="rgba(168,85,247,0.4)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                  />
                  <motion.circle
                    cx="200" cy="200" r="6"
                    fill="rgba(99,102,241,0.8)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  />

                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.6)" />
                      <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* NEXARK wordmark */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.5 }}
                >
                  <span className="font-display text-2xl tracking-[0.4em] text-white/20">
                    NEXARK
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - minimal */}
        <motion.div
          className="absolute bottom-12 left-6 lg:left-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            <span className="text-xs text-slate/50 tracking-widest uppercase">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
