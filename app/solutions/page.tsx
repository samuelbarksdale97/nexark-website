"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-6 leading-tight"
            >
              Success is not an accident. It&apos;s engineered.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-slate leading-relaxed"
            >
              We figure out what your business actually needs, whether
              that&apos;s making your current operation run without you in the
              middle of it, or building something that doesn&apos;t exist yet.
              We start by understanding where you are and where you want to go.
              Then we build the technology to close the gap.
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Nexark Audit */}
      <AnimatedSection id="audit" className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Start here: The Nexark Audit
            </h2>
            <p className="text-slate text-lg mb-8">
              Most of our clients start here.
            </p>

            <div className="space-y-6 text-lg text-slate leading-relaxed mb-12">
              <p>
                You might know exactly what&apos;s broken. You might have an
                idea you&apos;ve been sitting on. Either way, we start in the
                same place: understanding what&apos;s actually going on before we
                commit to building anything.
              </p>

              <p>
                We&apos;ve found that businesses fall into one of two starting
                points:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-xl border border-white/5">
                  <p className="text-white font-semibold mb-3">
                    &ldquo;Something in my business isn&apos;t working the way
                    it should.&rdquo;
                  </p>
                  <p className="text-sm text-slate">
                    You&apos;re spending time on work that shouldn&apos;t need
                    you. Processes are slow, tools don&apos;t talk to each other,
                    and you&apos;ve been too busy running the business to stop
                    and fix what&apos;s underneath it.
                  </p>
                </div>
                <div className="glass p-6 rounded-xl border border-white/5">
                  <p className="text-white font-semibold mb-3">
                    &ldquo;I have an idea for something I want to build.&rdquo;
                  </p>
                  <p className="text-sm text-slate">
                    You see an opportunity. A product, a platform, a new revenue
                    model. The vision is clear but you need someone who can hear
                    what you&apos;re describing and actually build it.
                  </p>
                </div>
              </div>
            </div>

            {/* Four Phases */}
            <h3 className="font-display text-xl font-bold text-white mb-8">
              How the audit works
            </h3>
            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <span className="text-sm font-medium text-indigo tracking-widest mt-1 shrink-0">
                  01
                </span>
                <div>
                  <h4 className="font-display font-semibold text-white mb-2">
                    Discovery
                  </h4>
                  <p className="text-slate leading-relaxed">
                    We start with the pain or the opportunity. What brought you
                    here? What&apos;s costing you time, money, or sleep? Or:
                    what&apos;s the thing you&apos;d build tomorrow if you had
                    the capability? We listen. We ask the questions that surface
                    what&apos;s underneath the stated problem.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-medium text-indigo tracking-widest mt-1 shrink-0">
                  02
                </span>
                <div>
                  <h4 className="font-display font-semibold text-white mb-2">
                    Scope
                  </h4>
                  <p className="text-slate leading-relaxed">
                    We map where this actually lives. Pain points rarely stay in
                    one lane. A founder says &ldquo;our marketing isn&apos;t
                    working&rdquo; and the real issue is that delivery takes so
                    long they can&apos;t handle more leads anyway. We scope the
                    right problem, not just the stated one. We look at the full
                    life cycle, including the people and communication inside it.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-medium text-indigo tracking-widest mt-1 shrink-0">
                  03
                </span>
                <div>
                  <h4 className="font-display font-semibold text-white mb-2">
                    Dream
                  </h4>
                  <p className="text-slate leading-relaxed">
                    Once we see reality clearly, we ask: where do you want this
                    to be? The dream becomes the anchor for everything that
                    follows. Every recommendation, every priority, every dollar
                    of ROI is measured against that destination.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-medium text-indigo tracking-widest mt-1 shrink-0">
                  04
                </span>
                <div>
                  <h4 className="font-display font-semibold text-white mb-2">
                    Fix
                  </h4>
                  <p className="text-slate leading-relaxed">
                    Every friction point and opportunity gets scored by impact
                    and effort. Quick Wins first. Big Swings next. We tell you
                    what to prioritize and what to deprioritize. You can&apos;t
                    fix 15 things at once. What&apos;s first? What&apos;s
                    second? The roadmap answers that.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="glass p-8 rounded-2xl border border-white/5 mb-10">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                What you walk away with
              </h3>
              <ul className="space-y-3 text-slate">
                <li className="flex gap-3">
                  <span className="text-indigo mt-1">•</span>
                  Executive summary (1-2 pages) with the headlines
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo mt-1">•</span>
                  Full findings report (10-15 pages) with data, visuals, and
                  prioritized recommendations
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo mt-1">•</span>
                  A reverse roadmap from current state to dream state, phased
                  into sprints
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo mt-1">•</span>
                  ROI summary: total investment vs. total Year 1 value
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo mt-1">•</span>
                  A roadmap you can execute with or without Nexark
                </li>
              </ul>
            </div>

            {/* Pricing Table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 pr-6 text-white font-display font-semibold" />
                    <th className="py-4 px-4 text-white font-display font-semibold">
                      Starter
                    </th>
                    <th className="py-4 px-4 text-white font-display font-semibold">
                      Growth
                    </th>
                    <th className="py-4 px-4 text-white font-display font-semibold">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate">
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium text-white/80">
                      Focus
                    </td>
                    <td className="py-4 px-4">One pain point, one area</td>
                    <td className="py-4 px-4">
                      Full operation + people and culture
                    </td>
                    <td className="py-4 px-4">
                      Multi-department, cross-functional
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium text-white/80">
                      Best for
                    </td>
                    <td className="py-4 px-4">
                      &ldquo;I know exactly where it hurts&rdquo;
                    </td>
                    <td className="py-4 px-4">
                      &ldquo;I don&apos;t know what I don&apos;t know&rdquo;
                    </td>
                    <td className="py-4 px-4">
                      Complex orgs, M&amp;A due diligence
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium text-white/80">
                      Timeline
                    </td>
                    <td className="py-4 px-4">1 week</td>
                    <td className="py-4 px-4">2-3 weeks</td>
                    <td className="py-4 px-4">3-4 weeks</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-medium text-white/80">
                      Investment
                    </td>
                    <td className="py-4 px-4 text-white font-medium">
                      $7,500 - $10,000
                    </td>
                    <td className="py-4 px-4 text-white font-medium">
                      $15,000 - $20,000
                    </td>
                    <td className="py-4 px-4 text-white font-medium">
                      $25,000 - $40,000+
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate/70 mb-6">
              A Starter audit often reveals issues that cross boundaries. If
              that happens, we offer to upgrade to Growth with 50-75% of the
              Starter fee credited. The audit is a standalone deliverable. You
              pay for the diagnosis, then decide whether to engage us for the
              treatment.
            </p>

            <p className="text-sm text-slate">
              Already know what you need?{" "}
              <a href="#optimize" className="text-indigo hover:text-white transition-colors">
                Jump to our services ↓
              </a>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Optimize */}
      <AnimatedSection id="optimize" className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Optimize
            </h2>
            <p className="font-display text-lg text-white/80 mb-8">
              Your business works. We make it work without you in the middle.
            </p>

            <div className="text-slate leading-relaxed space-y-4 mb-10">
              <p>
                You&apos;ve outgrown your tools. Your team is patching systems
                together that were never meant to talk to each other. There are
                bottlenecks you&apos;ve normalized because you&apos;ve been too
                busy running the business to stop and look at them.
              </p>
              <p>
                We sit on top of what you already use and build custom software
                that fits how your operation actually runs. Your existing tools
                start working together instead of against each other. Your team
                does more with less.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 mb-8">
              <h3 className="font-display font-semibold text-white mb-4">
                What this looks like
              </h3>
              <ul className="space-y-2 text-slate text-sm">
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Custom CRMs built around your actual sales process
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Agentic workflows that handle multi-step tasks without someone
                  manually pushing things along
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Dashboards that show what matters to your business, not what a
                  template decided
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  System integrations that replace the Zapier duct tape
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Compliance and reporting automation
                </li>
              </ul>
            </div>

            <p className="text-white font-display font-semibold">
              Sprints start at $5,000.{" "}
              <span className="text-slate font-normal">
                Scoped after the audit.
              </span>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Innovate */}
      <AnimatedSection id="innovate" className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Innovate
            </h2>
            <p className="font-display text-lg text-white/80 mb-8">
              You have an idea you&apos;ve been sitting on. We build it.
            </p>

            <div className="text-slate leading-relaxed space-y-4 mb-10">
              <p>
                You see an opportunity. A product your industry needs. A
                membership model that turns one-time customers into recurring
                revenue. A platform that creates a new line of business
                entirely. The vision is clear. You need someone who can hear
                what you&apos;re describing and turn it into something real.
              </p>
              <p>
                We take your idea through discovery, architecture, and build,
                and we stay in your corner after launch. We engineer the product
                with revenue designed in from day one.
              </p>
            </div>

            <div className="glass p-6 rounded-xl border border-white/5 mb-8">
              <h3 className="font-display font-semibold text-white mb-4">
                What this looks like
              </h3>
              <ul className="space-y-2 text-slate text-sm">
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Mobile apps from concept to App Store
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  Membership platforms with digital wallets, automated billing,
                  and member management
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  SaaS products built for your specific market
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo">•</span>
                  AI-native tools that give your business capabilities nobody
                  else in your space has
                </li>
              </ul>
            </div>

            <p className="text-white font-display font-semibold">
              Projects scoped individually.{" "}
              <span className="text-slate font-normal">
                Typically $10,000-$50,000 depending on complexity.
              </span>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Partner */}
      <AnimatedSection id="partner" className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Partner
            </h2>
            <p className="font-display text-lg text-white/80 mb-12">
              Your business changes. Your technology needs to change with it.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Maintenance and Optimization
                </h3>
                <p className="text-slate leading-relaxed mb-2">
                  Your systems stay current, secure, and evolving. We monitor
                  performance, handle dependency updates, and run quarterly
                  optimization reviews. Proactive, not reactive.
                </p>
                <p className="text-white/70 text-sm font-medium">
                  Starting at $1,500/month
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Fractional CTO
                </h3>
                <p className="text-slate leading-relaxed mb-2">
                  Strategic technology leadership without the $400K salary.
                  Architecture decisions, vendor management, roadmap
                  development, team oversight. We show up to the meetings that
                  matter.
                </p>
                <p className="text-white/70 text-sm font-medium">
                  Advisory: $3,000/month · Embedded: $7,500/month · Leadership:
                  $15,000/month
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Venture Partner
                </h3>
                <p className="text-slate leading-relaxed mb-2">
                  For founders who want a technical co-founder, not a vendor. We
                  invest our engineering in exchange for equity and build
                  alongside you with real skin in the game. We&apos;re selective
                  about who we partner with because when we come in as a venture
                  partner, our interests and yours are the same.
                </p>
                <p className="text-white/70 text-sm font-medium">
                  Structure determined case-by-case
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Two starting points. One framework.
            </h2>
            <p className="text-lg text-slate leading-relaxed mb-10">
              Whether you&apos;re fixing what&apos;s broken or building
              what&apos;s next, the first step is the same: a conversation about
              where you are and where you want to go. We&apos;ll tell you what
              we see and how we can help.
            </p>
            <Button href="/start" size="lg">
              Start with a Conversation
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  );
}
