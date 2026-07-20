"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase mb-8">
              <span className="w-8 h-px bg-gradient-to-r from-purple to-transparent" />
              About Nexark
            </span>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              Entrepreneurs<br />
              <span className="text-white/40">are dreamers.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              Wealth is a byproduct of solving other people&apos;s problems. I want to enable this vehicle of wealth creation for everyone. The world has problems. Dreamers want to solve them. That&apos;s what this is about.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Nexark Exists */}
      <section ref={ref} className="py-20 md:py-32 bg-navy relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12">
                Why this exists.
              </h2>

              <div className="space-y-8 text-lg text-slate-300 leading-relaxed">
                <p>
                  I started Nexark because I kept seeing the same thing. Smart people with real ideas, running businesses they genuinely cared about, stuck inside operations they didn&apos;t design. The tools didn&apos;t fit. The processes grew by accident. And the gap between where they were and where they wanted to be felt impossibly wide.
                </p>
                <p>
                  But the gap isn&apos;t usually that wide. The whole point of what we do is finding those leverage points where a single change shifts how everything flows. Sometimes it&apos;s a system that automates a process that was eating 20 hours a week. Sometimes it&apos;s a membership program that turns existing relationships into recurring revenue. The specifics change. The principle stays the same.
                </p>
                <p>
                  The principle is Reality Engineering. Your current reality was constructed. By circumstances, by other people&apos;s decisions, by entropy. If it was constructed, it can be reconstructed. By you. Intentionally. That&apos;s the shift. And once you see it, you can&apos;t unsee it.
                </p>
                <p className="text-white font-medium">
                  You will be better off than when you started. I&apos;m pretty confident about that part.
                </p>
              </div>
            </motion.div>

            {/* Sam */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-20 pt-20 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                    Samuel Barksdale
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-purple mb-6 font-semibold">
                    Founder & Reality Engineer
                  </p>
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                    <p>
                      I&apos;ve spent my career at the intersection of technology and business operations. I build the systems that bridge the gap between what people dream about and what they can actually execute. Custom software, automation, membership platforms, operational infrastructure.
                    </p>
                    <p>
                      The thing I&apos;ve learned is that most businesses don&apos;t need more ideas. They need someone who can take the ideas they already have and build the systems that make them real. That&apos;s the work.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20 pt-16 text-center"
            >
              <p className="font-display text-3xl md:text-5xl font-extrabold text-gradient leading-tight">
                Success is not an accident.<br />It&apos;s engineered.
              </p>

              <div className="mt-12">
                <Button href="/start" size="lg" showArrow className="bg-white text-navy hover:bg-white/90">
                  Start a Conversation
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
