"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cpu,
  Target,
  Zap,
  LineChart,
  Users,
  Rocket,
  Shield,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Workflow,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingCard } from "@/components/ui/glowing-card";

const problems = [
  {
    stat: "73%",
    description: "of digital transformations fail to deliver expected value",
  },
  {
    stat: "4.2x",
    description: "more likely to fail when treating AI as a tool, not a system",
  },
  {
    stat: "$2.3T",
    description: "wasted annually on initiatives that don't move the needle",
  },
];

const phases = [
  {
    number: "01",
    title: "Operational Diagnostics",
    duration: "Week 1",
    description:
      "We map your entire operation—people, processes, technology, bottlenecks. No assumptions. Just data.",
    icon: Target,
  },
  {
    number: "02",
    title: "System Architecture",
    duration: "Week 2",
    description:
      "Design the AI-powered operating system tailored to your specific challenges and growth targets.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Sprint Deployment",
    duration: "Weeks 3-4",
    description:
      "Rapid implementation in focused 30-day sprints. Measurable results, not endless planning.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Team Integration",
    duration: "Ongoing",
    description:
      "Your team learns to operate the new system. We don't leave until they own it completely.",
    icon: Users,
  },
  {
    number: "05",
    title: "Continuous Evolution",
    duration: "Quarterly",
    description:
      "Systems that adapt as you scale. What works at $1M needs to evolve at $10M.",
    icon: TrendingUp,
  },
];

const deliverables = [
  {
    icon: BrainCircuit,
    title: "AI Operating System",
    description:
      "Custom-built AI infrastructure that automates decisions, not just tasks. Your business runs smarter while you sleep.",
  },
  {
    icon: Workflow,
    title: "Process Blueprints",
    description:
      "Every critical workflow documented, optimized, and automated. Eliminate the chaos of tribal knowledge.",
  },
  {
    icon: LineChart,
    title: "Performance Dashboard",
    description:
      "Real-time visibility into what matters. KPIs that actually predict outcomes, not just report history.",
  },
  {
    icon: Shield,
    title: "Decision Frameworks",
    description:
      "Systematic approaches to the decisions that make or break your business. Remove emotion, add precision.",
  },
  {
    icon: Cpu,
    title: "Tech Stack Audit",
    description:
      "Cut the bloat. We identify what's essential, what's redundant, and what's missing in your technology.",
  },
  {
    icon: Zap,
    title: "Execution Playbooks",
    description:
      "Step-by-step guides for every initiative. Your team knows exactly what to do and when to do it.",
  },
];

const testimonials = [
  {
    quote:
      "We cut operational costs by 40% in the first quarter. The AI systems they built now handle what used to require 3 full-time employees.",
    author: "Marcus Chen",
    role: "CEO, Velocity Labs",
    metric: "40% cost reduction",
  },
  {
    quote:
      "Finally, a consulting engagement that delivered ROI before the final invoice. The 30-day sprint model changed everything.",
    author: "Sarah Mitchell",
    role: "COO, Ascend Capital",
    metric: "3x faster implementation",
  },
  {
    quote:
      "They didn't just optimize our processes—they rebuilt how we think about operations. That's a permanent competitive advantage.",
    author: "David Park",
    role: "Founder, Nexus Ventures",
    metric: "$2.1M saved annually",
  },
];

const pricingTiers = [
  {
    name: "Sprint",
    price: "$5,000",
    duration: "per sprint",
    description: "Focused 30-day transformation of a single system or process",
    features: [
      "Single system diagnostic",
      "AI automation implementation",
      "Process documentation",
      "Team training session",
      "30-day support window",
    ],
    cta: "Start Sprint",
    highlighted: false,
  },
  {
    name: "Transformation",
    price: "$25,000",
    duration: "per quarter",
    description: "Complete operational overhaul with ongoing strategic support",
    features: [
      "Full operational diagnostic",
      "Custom AI operating system",
      "All critical process blueprints",
      "Performance dashboard setup",
      "Weekly strategy sessions",
      "Unlimited sprint capacity",
      "Direct founder access",
    ],
    cta: "Transform Now",
    highlighted: true,
  },
  {
    name: "Partnership",
    price: "$50,000",
    duration: "per quarter",
    description: "Embedded operational leadership for hypergrowth companies",
    features: [
      "Everything in Transformation",
      "Fractional COO services",
      "Board-level reporting",
      "M&A operational due diligence",
      "Investor deck optimization",
      "Hiring system design",
      "Exit preparation support",
    ],
    cta: "Partner With Us",
    highlighted: false,
  },
];

export default function BusinessOfferingPage() {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const processRef = useRef(null);
  const deliverablesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const deliverablesInView = useInView(deliverablesRef, {
    once: true,
    margin: "-100px",
  });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-100px",
  });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-navy">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-bold text-white">
              NEXARK
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/offerings/personal"
                className="text-sm text-slate-200 hover:text-white transition-colors"
              >
                myNexark
              </Link>
              <Link
                href="/offerings/business"
                className="text-sm text-emerald font-medium"
              >
                For Business
              </Link>
              <Button href="#pricing" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald border border-emerald/20 bg-emerald/5">
                <Building2 className="w-4 h-4" />
                Nexark for Business
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">Your operation is </span>
              <span className="text-gradient-emerald">leaking value.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl"
            >
              Every day without optimized systems costs you growth. We build
              AI-powered operating systems that run your business while you
              focus on what matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="#pricing" size="lg" showArrow className="bg-emerald hover:bg-emerald-light">
                Start Transformation
              </Button>
              <Button href="#process" variant="secondary" size="lg">
                See The Process
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-8"
            >
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-emerald">
                  30
                </div>
                <div className="text-sm text-slate-200 mt-1">Day Sprints</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-emerald">
                  47%
                </div>
                <div className="text-sm text-slate-200 mt-1">Avg. Cost Reduction</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-emerald">
                  12x
                </div>
                <div className="text-sm text-slate-200 mt-1">ROI in Year One</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemRef} className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="text-white">The consulting industry is </span>
              <span className="text-red-400">broken.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-slate"
            >
              PowerPoint decks don't fix operations. Neither do generic
              frameworks or junior analysts. You need systems that execute—not
              recommendations that collect dust.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-red-400 mb-4">
                  {problem.stat}
                </div>
                <p className="text-slate">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-xl md:text-2xl font-display font-medium text-white/60">
              You don't need more advice.
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-gradient-emerald mt-2">
              You need systems that work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        ref={processRef}
        className="py-24 md:py-32 bg-navy-light relative"
      >
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-emerald border border-emerald/20 bg-emerald/5 mb-4"
            >
              THE PROCESS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Engineering Operational Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-200 max-w-2xl mx-auto"
            >
              30-day sprints. Measurable outcomes. No fluff.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={processInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index !== phases.length - 1 && (
                  <div className="absolute left-[11px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-emerald/50 to-transparent" />
                )}

                <div className="flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-emerald/20 border-2 border-emerald flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald" />
                  </div>

                  <div className="flex-1 ml-4">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-display text-sm font-bold text-emerald">
                        {phase.number}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald/10 text-emerald">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-slate">{phase.description}</p>
                  </div>

                  <div className="hidden md:flex w-12 h-12 rounded-xl bg-emerald/10 items-center justify-center flex-shrink-0">
                    <phase.icon className="w-6 h-6 text-emerald" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section ref={deliverablesRef} className="py-24 md:py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-emerald border border-emerald/20 bg-emerald/5 mb-4"
            >
              WHAT YOU GET
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Operational Infrastructure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-200 max-w-2xl mx-auto"
            >
              Not recommendations. Infrastructure. Systems that run without you.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={deliverablesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <GlowingCard
                  glowColor="rgba(16, 185, 129, 0.35)"
                  className="p-6 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4">
                    <deliverable.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {deliverable.title}
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {deliverable.description}
                  </p>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-24 md:py-32 bg-navy-light relative"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-emerald border border-emerald/20 bg-emerald/5 mb-4"
            >
              RESULTS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              Companies We've Transformed
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald/10 text-emerald mb-6">
                  {testimonial.metric}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-display font-bold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-24 md:py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider text-emerald border border-emerald/20 bg-emerald/5 mb-4"
            >
              INVESTMENT
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Choose Your Engagement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-200 max-w-2xl mx-auto"
            >
              Every engagement includes measurable ROI targets. If we don't hit
              them, you don't pay.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? "bg-emerald/10 border-2 border-emerald"
                    : "bg-white/[0.02] border border-white/5"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald text-navy text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-slate-200 text-sm">{tier.description}</p>
                </div>

                <div className="mb-8">
                  <span className="font-display text-4xl md:text-5xl font-bold text-white">
                    {tier.price}
                  </span>
                  <span className="text-slate-200 ml-2">{tier.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-slate-200 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#apply"
                  className={`w-full justify-center ${
                    tier.highlighted
                      ? "bg-emerald hover:bg-emerald-light text-navy"
                      : ""
                  }`}
                  variant={tier.highlighted ? "primary" : "secondary"}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-24 md:py-32 bg-navy-light relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-12 rounded-3xl bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/20"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-emerald" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                The Performance Guarantee
              </h2>
              <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                We don't bill for time. We bill for results. Every engagement
                comes with explicit ROI targets. If we don't hit them within the
                agreed timeframe, you don't pay for that sprint.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="#pricing" size="lg" className="bg-emerald hover:bg-emerald-light">
                  Start Risk-Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Stop losing value.</span>
              <br />
              <span className="text-gradient-emerald">Start scaling smart.</span>
            </h2>
            <p className="text-xl text-slate-200 mb-10">
              Book a diagnostic call. We'll analyze your operation and show you
              exactly where you're leaving money on the table—free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#" size="lg" showArrow className="bg-emerald hover:bg-emerald-light">
                Schedule Diagnostic
              </Button>
              <Button href="/" variant="ghost" size="lg">
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-display text-lg font-bold text-white">
                NEXARK
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/offerings/personal"
                  className="text-sm text-slate-200 hover:text-white transition-colors"
                >
                  myNexark
                </Link>
                <Link
                  href="/offerings/business"
                  className="text-sm text-slate-200 hover:text-white transition-colors"
                >
                  For Business
                </Link>
              </div>
            </div>
            <p className="text-sm text-slate">
              © {new Date().getFullYear()} Nexark. Engineering reality.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
