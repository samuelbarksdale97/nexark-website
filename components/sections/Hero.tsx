"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroVisuals } from "@/components/sections/hero/HeroVisuals";


export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance Optimization: Use MotionValues instead of State
  // This prevents React re-renders on every mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-0.5 to 0.5)
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;

      mouseX.set(xPct * 30);
      mouseY.set(yPct * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Single gradient orb - off center, subtle */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          x: springX,
          y: springY,
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

      {/* Secondary subtle orb - Gold tint added for V2 alignment */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(211, 175, 55,0.1) 0%, transparent 70%)",
          x: useTransform(springX, (val) => val * -0.5),
          y: useTransform(springY, (val) => val * -0.5),
        }}
      />



      {/* Content - asymmetric layout */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-16 lg:py-20">

            {/* Left side - Typography (Full width on mobile, 8 cols on large for readability) */}
            <div className="lg:col-span-8 flex flex-col justify-center text-center items-center md:items-start md:text-left relative">
              {/* Mobile Ambient Glow */}
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-600/20 blur-[90px] rounded-full pointer-events-none md:hidden" />

              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 md:mb-6 lg:mb-8 relative"
              >
                <span className="inline-flex items-center gap-3 text-sm md:text-base font-semibold tracking-wide text-white/90 uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 px-4 py-1.5 rounded-full md:bg-transparent md:border-0 md:px-0 md:py-0 md:text-white/90 shadow-[0_0_15px_rgba(99,102,241,0.3)] md:shadow-none">
                  <span className="hidden md:block w-8 h-px bg-gradient-to-r from-indigo to-transparent" />
                  Reality Engineering
                </span>
              </motion.div>

              {/* Main headline - massive typography */}
              <div className="space-y-1 md:space-y-4 mb-4 md:mb-0 relative">
                <div className="overflow-visible">
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

                <div className="overflow-visible">
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

                <div className="overflow-visible">
                  <motion.h1
                    custom={2}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-hero font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-indigo-300 md:text-white/60 md:bg-none"
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
                className="mt-8 md:mt-4 lg:mt-6 relative"
              >
                {/* Mobile: Elegant Pills Layout */}
                <div className="flex flex-wrap gap-2 justify-center md:hidden max-w-sm mx-auto">
                  {["CRMs", "Agentic Workflows", "Integrations", "Dashboards"].map((item, i) => (
                    <span key={item} className="px-4 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-sm font-medium text-indigo-200 backdrop-blur-sm shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>

                {/* Desktop: Original Line */}
                <span className="hidden md:block font-display text-display-md font-bold text-gradient">
                  CRMs • Agentic Workflows • Integrations • Dashboards
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mt-8 md:mt-6 lg:mt-8 text-lg px-4 md:px-0 lg:text-xl text-slate-300 max-w-xl md:max-w-2xl leading-relaxed text-balance"
              >
                We build the technology that takes your business to its next arc.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mt-10 md:mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 md:px-0"
              >
                <Button href="https://cal.com/sam-barksdale/discovery" size="lg" showArrow className="w-full sm:w-auto bg-white text-navy hover:bg-indigo-50 border-0 h-14 md:h-auto text-base md:text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] md:shadow-none">
                  Book Strategy Session
                </Button>
                <Button href="#what-we-build" variant="secondary" size="lg" className="w-full sm:w-auto h-14 md:h-auto text-base md:text-sm border-white/10 bg-white/5 md:bg-transparent">
                  See What We Build
                </Button>
              </motion.div>
            </div>

            {/* Right side - Fanned Cards Visual */}
            <div className="lg:col-span-4 relative h-[500px] flex items-center justify-center">
              <HeroVisuals />
            </div>

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
