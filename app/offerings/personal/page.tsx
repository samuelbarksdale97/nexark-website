"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlowingCard } from "@/components/ui/glowing-card";
import { Spotlight } from "@/components/ui/spotlight";
import { Footer } from "@/components/sections/Footer";
import {
  Sparkles,
  Target,
  Map,
  Cpu,
  FileText,
  Compass,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react";
import Link from "next/link";

const deliverables = [
  {
    icon: Sparkles,
    title: "Dream Dossier",
    description:
      "A vivid, detailed documentation of your ideal future state. Not vague goals—a quantified vision across every dimension of your life: identity, work, relationships, health, wealth, and legacy.",
  },
  {
    icon: Map,
    title: "Reverse Roadmap",
    description:
      "We work backwards from your dream to today, mapping every milestone, dependency, and decision point. You'll see exactly how to get from here to there.",
  },
  {
    icon: Target,
    title: "Current State Assessment",
    description:
      "An honest, unflinching look at where you actually are. We identify assets, constraints, and the gap between your reality and your vision.",
  },
  {
    icon: Cpu,
    title: "Custom AI Tools",
    description:
      "We don't just plan—we build. You leave with AI-powered tools designed specifically for YOUR situation. Not templates. Custom infrastructure.",
  },
  {
    icon: FileText,
    title: "Reality Blueprint",
    description:
      "Your complete transformation document—a living guide that evolves with you. The synthesis of everything we discover and build together.",
  },
  {
    icon: Compass,
    title: "Asset Manifest",
    description:
      "An inventory of everything you need to build, acquire, or develop to reach your vision. Clear next actions, not vague advice.",
  },
];

const process = [
  {
    step: "01",
    title: "The Deep Dive",
    duration: "2-3 hours",
    description:
      "We go deep. This isn't a surface-level questionnaire. We explore your dreams, fears, past attempts, current reality, and the vision you're afraid to say out loud. You talk. We listen. We ask questions nobody's ever asked you.",
  },
  {
    step: "02",
    title: "The Synthesis",
    duration: "Behind the scenes",
    description:
      "We take everything you shared and transform it into structured, actionable documentation. Your Dream Dossier takes shape. Your Reverse Roadmap gets built. Your gaps become visible.",
  },
  {
    step: "03",
    title: "The Build",
    duration: "Behind the scenes",
    description:
      "This is where we're different. We don't just hand you a PDF. We build custom AI tools and systems designed for YOUR specific situation. Automation that works while you sleep.",
  },
  {
    step: "04",
    title: "The Delivery",
    duration: "1-2 hours",
    description:
      "We walk you through everything. Your Dream Dossier. Your Roadmap. Your custom tools. We make sure you understand not just WHAT to do, but HOW to use everything we've built for you.",
  },
  {
    step: "05",
    title: "The Partnership",
    duration: "Ongoing",
    description:
      "Transformation doesn't end at delivery. We check in. We refine. We're in your corner. The Warm Blanket Promise: You're going to be good. We'll make sure of it.",
  },
];

const testimonials = [
  {
    quote:
      "For the first time in my life, I can see where I'm going. Not hope—actually SEE it. The Dream Dossier alone changed how I think about my future.",
    author: "Tech Executive",
    transformation: "Clarity on 10-year vision",
  },
  {
    quote:
      "I've spent $50k on coaches over the years. None of them built me anything. Nexark left me with tools I use every single day.",
    author: "Serial Entrepreneur",
    transformation: "Custom AI productivity system",
  },
  {
    quote:
      "They asked me questions I'd never been asked. Made me articulate things I'd felt but couldn't say. That alone was worth it.",
    author: "Creative Director",
    transformation: "Life direction clarity",
  },
];

export default function MyNexarkPage() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const deliverablesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const deliverablesInView = useInView(deliverablesRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-navy">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-xl font-bold tracking-wider">
            NEXARK
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/offerings/business" className="text-sm text-slate-200 hover:text-white transition-colors">
              For Business
            </Link>
            <Button href="/apply" size="sm">
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden">
        <Spotlight fill="#A855F7" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-purple border border-purple/20 bg-purple/5">
                FOR INDIVIDUALS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6"
            >
              <span className="text-white">Your next self,</span>
              <br />
              <span className="text-gradient">engineered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-200 max-w-2xl mb-8"
            >
              From foggy to focused in 24 hours. Complete life clarity, a reverse-engineered roadmap, and custom AI tools built for YOUR specific journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/apply" size="lg" showArrow>
                Apply for myNexark
              </Button>
              <Button href="#process" variant="secondary" size="lg">
                See the Process
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-navy-light relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              You know you&apos;re capable of more.
            </h2>
            <div className="space-y-6 text-lg text-slate">
              <p>
                You&apos;ve achieved things. You&apos;ve built things. By most measures, you&apos;re successful.
              </p>
              <p>
                But there&apos;s a gap between who you are and who you could be. You feel it. You can&apos;t quite articulate it, but you know it&apos;s there.
              </p>
              <p className="text-white font-medium">
                You&apos;ve tried to close that gap. Coaches. Books. Courses. Productivity systems. They help for a while. Then they fade.
              </p>
              <p>
                The problem isn&apos;t motivation. The problem is nobody built you the infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section id="process" ref={processRef} className="py-24 bg-navy relative overflow-hidden">

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-purple border border-purple/20 bg-purple/5 mb-4">
                THE JOURNEY
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                What Happens in myNexark
              </h2>
              <p className="text-xl text-slate">
                A structured transformation, not a vague conversation.
              </p>
            </motion.div>

            <div className="space-y-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="relative"
                >
                  {index < process.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-purple/30 to-transparent" />
                  )}

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-purple/10 border border-purple/20 flex items-center justify-center">
                      <span className="font-display text-lg font-bold text-purple">{step.step}</span>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-xs text-slate-200 bg-white/5 px-2 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section ref={deliverablesRef} className="py-24 bg-navy-light relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-purple border border-purple/20 bg-purple/5 mb-4">
              WHAT YOU GET
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              The Deliverables
            </h2>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Not just insights. Tangible assets you own forever.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              >
                <GlowingCard glowColor="rgba(168, 85, 247, 0.3)" className="p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-purple" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">{item.description}</p>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Transformations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-navy-light/50 border border-white/5"
              >
                <Quote className="w-8 h-8 text-purple/30 mb-4" />
                <p className="text-white/90 mb-6 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-display font-semibold text-white">{item.author}</p>
                  <p className="text-sm text-purple">{item.transformation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Investment
            </h2>
            <p className="text-slate-200 mb-12">
              Three tiers. Same methodology. Different depth.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="p-6 rounded-2xl bg-navy border border-white/5">
                <h3 className="font-display text-lg font-bold mb-2">Reality Blueprint</h3>
                <p className="text-3xl font-display font-bold mb-4">$2,500</p>
                <p className="text-sm text-slate-200 mb-6">Dream Dossier + Roadmap</p>
                <ul className="text-sm text-slate-200 space-y-2 text-left mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    2-hour deep dive session
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Dream Dossier document
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Reverse Roadmap
                  </li>
                </ul>
                <Button href="/apply" variant="secondary" className="w-full">
                  Apply
                </Button>
              </div>

              {/* Tier 2 - Featured */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple/10 to-navy border border-purple/30 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple text-white text-xs font-display font-semibold rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="font-display text-lg font-bold mb-2">Reality Engineering</h3>
                <p className="text-3xl font-display font-bold mb-4">$5,000</p>
                <p className="text-sm text-slate-200 mb-6">Full transformation + AI tools</p>
                <ul className="text-sm text-slate-200 space-y-2 text-left mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Everything in Blueprint
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Custom AI tools built for you
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Current State Assessment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Asset Manifest
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    30-day follow-up
                  </li>
                </ul>
                <Button href="/apply" className="w-full">
                  Apply
                </Button>
              </div>

              {/* Tier 3 */}
              <div className="p-6 rounded-2xl bg-navy border border-white/5">
                <h3 className="font-display text-lg font-bold mb-2">Reality Engineering Elite</h3>
                <p className="text-3xl font-display font-bold mb-4">$10,000</p>
                <p className="text-sm text-slate-200 mb-6">VIP + ongoing partnership</p>
                <ul className="text-sm text-slate-200 space-y-2 text-left mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Everything in Engineering
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Priority access to Samuel
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Quarterly check-ins (1 year)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                    Unlimited tool iterations
                  </li>
                </ul>
                <Button href="/apply" variant="secondary" className="w-full">
                  Apply
                </Button>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-navy/50">
              <h3 className="font-display font-bold mb-2">The Clarity Guarantee</h3>
              <p className="text-slate">
                If you don&apos;t leave with complete clarity on your path, we keep working until you do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-navy relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to meet your next self?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Limited spots. Application required. We only work with those ready to transform.
          </p>
          <Button href="/apply" size="lg" showArrow>
            Apply for myNexark
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
