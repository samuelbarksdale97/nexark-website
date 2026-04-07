"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function MethodologyPage() {
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
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              You say success is engineered. Here&apos;s what we mean by that.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6 text-lg md:text-xl text-slate leading-relaxed"
            >
              <p>
                Most businesses we work with are running on systems nobody
                designed on purpose. The CRM was picked three years ago because
                someone found it on a Google search. The workflows grew around
                whoever was available, not around what actually needed to happen.
                The tools don&apos;t talk to each other, so the team fills the
                gaps manually.
              </p>
              <p>Over time, everyone just accepted it as how things work.</p>
              <p className="text-white/90">
                From our experience, if the way your business runs today was
                assembled by default, by circumstance, by decisions that just
                accumulated, then it can be taken apart and put back together
                with intention. That&apos;s the starting point for everything we
                do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We've Found to Be True */}
      <AnimatedSection className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
            What we&apos;ve found to be true
          </h2>

          <div className="space-y-16 max-w-3xl">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                You are the one driving this.
              </h3>
              <p className="text-slate leading-relaxed text-lg">
                We can build the best system in the world. It only works if
                you&apos;re driving it. We take constraints seriously: the
                market, the budget, the team you have today. But within those
                constraints, you&apos;re the one making the calls. From our
                lens, the people who move fastest through transformation are the
                ones who show up ready to own the outcome. We bring the
                methodology and the build capability. You bring the
                decision-making.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                We need to know where you&apos;re going before we touch
                anything.
              </h3>
              <p className="text-slate leading-relaxed text-lg">
                Before we write a line of code, we sit down and get specific
                about what success actually looks like for you. What does your
                day look like when this works? How many hours a week are you
                working? What are you known for? What have you stopped doing? We
                push on this until the picture is vivid enough to make decisions
                against. When you can describe your destination with that kind of
                precision, the path to get there starts to reveal itself. Without
                it, you&apos;re building toward a feeling, and feelings shift.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                Success compounds when you build it into a system.
              </h3>
              <p className="text-slate leading-relaxed text-lg">
                The businesses that produce results consistently have built
                systems for how they make decisions, how they operate, how they
                capture value. Those systems compound over time. We approach
                success the same way we&apos;d approach any complex system: you
                can design it, build it, test it, and optimize it. We&apos;ve
                done this enough times to know it works.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                Things will go wrong. We build for that.
              </h3>
              <div className="text-slate leading-relaxed text-lg space-y-4">
                <p>
                  Markets shift. Key people leave. Plans meet reality and reality
                  wins. Most approaches pretend this won&apos;t happen. We think
                  about it differently. Chaos is permanent. So we build systems
                  that hold up when conditions change.
                </p>
                <p>
                  We went into a venue with decades of loyal regulars and zero
                  systems to capture that loyalty. Staff turnover meant
                  relationships walked out the door every six months. The system
                  we built made those relationships permanent, regardless of
                  who&apos;s behind the bar on any given night. When disruption
                  hit, the system held.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How This Works in Practice */}
      <AnimatedSection className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
            How this works in practice
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14 max-w-5xl">
            <div className="border-l-2 border-indigo/40 pl-6">
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                We start with a diagnostic.
              </h3>
              <p className="text-slate leading-relaxed">
                We come in and map where you actually are: your operations,
                revenue model, team structure, how time is being spent, what
                tools you&apos;re running. What&apos;s working, what&apos;s
                working by accident, and what&apos;s quietly costing you. We
                come in without the same blinders, without understanding the
                internal politics or the history. We look at it for what it is.
              </p>
            </div>

            <div className="border-l-2 border-indigo/40 pl-6">
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                We build systems, not one-off fixes.
              </h3>
              <p className="text-slate leading-relaxed">
                We went into a property management company dealing with 184 open
                DOB violations, each taking 45 days to resolve manually. We
                built a platform that uploads a notice of infraction,
                auto-extracts the violations, routes work to contractors, and
                generates the final abatement report. The process dropped to 14
                days.
              </p>
            </div>

            <div className="border-l-2 border-indigo/40 pl-6">
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                We work in sprints and adjust as we learn.
              </h3>
              <p className="text-slate leading-relaxed">
                We work in focused cycles: build, measure, adjust. Every cycle
                teaches us something specific about what works for your
                situation. The clients who move fastest are the ones who learn
                from each iteration and use that to inform the next one.
              </p>
            </div>

            <div className="border-l-2 border-indigo/40 pl-6">
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                We capture what works so your operation gets smarter over time.
              </h3>
              <p className="text-slate leading-relaxed">
                Every engagement produces patterns: what strategies worked for
                your specific business, what decisions led to the best outcomes,
                what can be reused. We document all of it. Nine times out of
                ten, the organizations that struggle are the ones that created a
                solution and expected it to stay the solution. We build the
                evolution in from the start.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* The Name - Reality Engineering Reveal */}
      <AnimatedSection className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-lg text-slate leading-relaxed mb-8">
              That approach, taking your business as it is today, understanding
              where you want it to go, reverse-engineering the path, and
              building the technology to close the gap. We&apos;ve been doing
              this long enough that we gave it a name.
            </p>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-6">
              We call it Reality Engineering.
            </h2>

            <p className="text-lg text-slate leading-relaxed">
              The idea is simple: the way your business runs today was assembled
              over time by decisions, defaults, and circumstances. We help you
              take that apart and put it back together on purpose.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-slate leading-relaxed mb-8">
              The strategic intelligence that used to require a boardroom of
              executives is now accessible to one person with the right
              methodology and the right tools. AI made that possible. Your
              situation, your constraints, your specific combination of inputs.
              Nobody else is asking your exact question.
            </p>

            <p className="text-xl text-white font-display font-semibold mb-10">
              You bring what makes your business yours. We engineer the path
              forward.
            </p>

            <Button href="/start" size="lg">
              Start a Conversation
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  );
}
