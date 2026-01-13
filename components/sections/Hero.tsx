"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
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

            {/* Left side - Typography (7 columns) */}
            <div className="lg:col-span-7">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 lg:mb-8"
              >
                <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase">
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
                className="mt-6 lg:mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed text-balance"
              >
                We build the technology that takes your business to its next arc.
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
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
              style={{
                x: useTransform(springX, (val) => val * -1.5), // Stronger parallax
                y: useTransform(springY, (val) => val * -1.5),
              }}
            >
              {/* Backglow for "alive" feel */}
              <motion.div
                className="absolute inset-0 bg-gold/20 rounded-full blur-[100px]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* The "Abstract Engineer" Logo */}
              <div className="relative w-full max-w-[500px] aspect-square">
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 1, 0, -1, 0], // Subtle organic rotation
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/assets/reality-logo.png"
                    alt="Engineering Reality"
                    fill
                    className="object-contain drop-shadow-2xl mix-blend-screen"
                    priority
                  />

                  {/* "Scanline" energy effect overlaid */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2
                    }}
                    style={{
                      maskImage: "url(/assets/reality-logo.png)",
                      WebkitMaskImage: "url(/assets/reality-logo.png)",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center"
                    }}
                  />
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
