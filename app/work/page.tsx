"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  approach: string;
  outcome: string;
  status: "live" | "coming-soon";
}

const caseStudies: CaseStudy[] = [
  {
    title: "From memory to membership",
    client: "Park at 14th",
    challenge: "A vibrant venue with loyal regulars whose relationships lived entirely in staff members' heads. When someone left, those relationships walked out the door. No recurring revenue from an existing community.",
    approach: "We listened to what the team actually wanted — for every regular to feel recognized the moment they walked in. Then we reverse-engineered from that vision. Built a custom membership CRM with digital wallet integration. Members get a card in their Apple Wallet. Staff scans it and sees everything they need to know.",
    outcome: "Recurring membership revenue from an existing community. Staff turnover no longer threatens client relationships. Every member interaction is tracked and personal.",
    status: "live",
  },
  {
    title: "Digital membership for a neighborhood institution",
    client: "Takoma Station Tavern",
    challenge: "A neighborhood spot with decades of community loyalty but no system to formalize it. The relationships were real. The infrastructure wasn't.",
    approach: "We built a digital membership system that matched the warmth of the existing community. Simple sign-up, automatic billing, member recognition. Nothing that felt corporate or forced.",
    outcome: "New recurring revenue stream from people who were already showing up every week. The loyalty that was already there now has structure.",
    status: "live",
  },
  {
    title: "More work coming soon",
    client: "Future Projects",
    challenge: "We're selective about the work we take on. Every engagement goes through our Listen → Learn → Lift → Land process. If there's a fit, we build. If there isn't, we'll tell you.",
    approach: "",
    outcome: "",
    status: "coming-soon",
  },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  if (study.status === "coming-soon") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
        className="relative p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-[#0a0d17]/50"
      >
        <p className="text-sm uppercase tracking-wider text-slate-500 mb-4 font-semibold">
          Coming Soon
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white/40 mb-4">
          {study.title}
        </h3>
        <p className="text-slate-500 leading-relaxed max-w-2xl">
          {study.challenge}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="relative p-8 md:p-12 rounded-2xl border border-white/[0.08] bg-[#0a0d17] hover:border-white/[0.15] transition-all duration-300"
    >
      {/* Client */}
      <p className="text-sm uppercase tracking-wider text-purple mb-4 font-semibold">
        {study.client}
      </p>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
        {study.title}
      </h3>

      {/* Content grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-white/60 mb-3 font-semibold">
            The Challenge
          </h4>
          <p className="text-slate-400 leading-relaxed">
            {study.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wider text-white/60 mb-3 font-semibold">
            The Approach
          </h4>
          <p className="text-slate-400 leading-relaxed">
            {study.approach}
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wider text-white/60 mb-3 font-semibold">
            The Outcome
          </h4>
          <p className="text-slate-400 leading-relaxed">
            {study.outcome}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
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
              Our Work
            </span>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              What it looks like<br />
              <span className="text-white/40">when it works.</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Every project starts the same way. We listen to what&apos;s actually happening, figure out where the friction lives, and build the thing the business actually needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-32 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="text-lg text-slate-400 mb-6">
              Think we might be a fit for what you&apos;re working on?
            </p>
            <Button href="/start" size="lg" showArrow className="bg-white text-navy hover:bg-white/90">
              Start a Conversation
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
