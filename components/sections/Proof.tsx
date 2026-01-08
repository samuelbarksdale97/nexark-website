"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: 24, suffix: "hrs", label: "From foggy to focused" },
  { value: 90, suffix: "%", label: "Transformation rate" },
  { value: 308, suffix: "+", label: "Frameworks deployed" },
  { value: 50, prefix: "$", suffix: "K+", label: "Min. value created" },
];

const featuredTestimonial = {
  quote: "They made me feel like I was the only client they had. For the first time, my future isn't a vague hope—it's a destination I can see.",
  author: "Transformation Client",
  role: "Founder & CEO",
};

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Proof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-navy relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-slate">
            <span className="w-8 h-px bg-gradient-to-r from-emerald to-transparent" />
            The Proof
          </span>
        </motion.div>

        {/* Stats ticker - horizontal layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24 md:mb-32"
        >
          <div className="flex flex-wrap justify-between gap-8 md:gap-4 py-8 border-y border-white/5">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex-1 min-w-[140px] text-center md:text-left"
              >
                <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm text-slate">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured testimonial - full width, hero treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl"
        >
          {/* Quote mark */}
          <div className="mb-8">
            <svg
              width="64"
              height="48"
              viewBox="0 0 64 48"
              fill="none"
              className="text-indigo/20"
            >
              <path
                d="M0 48V28.8C0 20.8 1.6 14.133 4.8 8.8C8.267 3.2 13.6 0 20.8 0V12.8C17.6 12.8 15.2 14.133 13.6 16.8C12 19.2 11.2 22.4 11.2 26.4H20.8V48H0ZM35.2 48V28.8C35.2 20.8 36.8 14.133 40 8.8C43.467 3.2 48.8 0 56 0V12.8C52.8 12.8 50.4 14.133 48.8 16.8C47.2 19.2 46.4 22.4 46.4 26.4H56V48H35.2Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Quote - massive typography */}
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-12">
            {featuredTestimonial.quote}
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-indigo to-transparent" />
            <div>
              <p className="font-display font-semibold text-white">
                {featuredTestimonial.author}
              </p>
              <p className="text-slate text-sm">{featuredTestimonial.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 md:mt-32 pt-12 border-t border-white/5"
        >
          <p className="font-display text-2xl md:text-3xl font-medium text-white/60 max-w-2xl">
            Results, not promises. Every client leaves with tools they use every single day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
