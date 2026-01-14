"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Dream Architect",
    description: "Not 'what's broken?' but 'what did you originally want?'",
    bullets: [
      "We help you articulate the vision you've been too busy to revisit",
      "Crystallize the dream state: Where do you want to be in 12-24 months?",
      "No vague goals—quantified outcomes",
    ],
    why: "Because we can compress time with AI-native development, dreams that felt '5 years away' are now 6 months away. But only if we know what we're building toward.",
  },
  {
    number: "02",
    title: "Current State",
    description: "Honest audit of where you are today",
    bullets: [
      "What's working? What's broken? What's missing?",
      "Map your assets, constraints, and gaps",
      "Identify what's costing you time, money, opportunity",
    ],
    why: "You can't engineer a path if you don't know your starting point. Most founders are so busy they haven't done an honest assessment in years.",
  },
  {
    number: "03",
    title: "Reverse Engineer the Path",
    description: "Work backwards from dream to reality",
    bullets: [
      "Map every milestone, dependency, and prerequisite",
      "Identify what technology closes the gap",
      "Design the system that makes the dream inevitable",
    ],
    why: "The path isn't linear. There's a sequence. We find it by working backwards, not guessing forward.",
  },
  {
    number: "04",
    title: "Build Technology",
    description: "Deploy the custom software that closes the gap",
    bullets: [
      "Secure, scalable, production-ready",
      "AI-native development = 30-50% faster delivery",
      "Not just 'a tool'—the technology that makes your dream feasible",
    ],
    why: "This is where most dev shops start. For us, it's Step 4. Because we built the right thing, not just any thing.",
  },
  {
    number: "05",
    title: "Partnership (Not Delivery)",
    description: "We don't deliver and disappear",
    bullets: [
      "Systems evolve as you grow",
      "Monthly reviews: Are we on the path to the dream?",
      "Continuous optimization toward the vision",
    ],
    why: "Your dream evolves. Technology should too. We're not vendors—we're partners in making the vision real.",
  },
];

export function RealityEngineering() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-3 text-base font-semibold tracking-wide text-white/90 uppercase">
              <span className="w-8 h-px bg-gradient-to-r from-purple to-transparent" />
              The Reality Engineering Lens
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-xl font-bold text-white mb-6 whitespace-nowrap"
          >
            We Don&apos;t Just Build
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-display-xl font-bold text-white/40 mb-8 whitespace-nowrap"
          >
            What You Ask For
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-slate leading-relaxed mb-8 whitespace-nowrap"
          >
            We help you remember what you originally dreamed—and make it feasible now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block px-8 py-4 rounded-xl border border-indigo/20 bg-navy-light/50"
          >
            <p className="font-display text-2xl font-bold text-gradient">
              Engineering Reality, Together.
            </p>
          </motion.div>
        </div>

        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto mb-20 md:mb-32"
        >
          <p className="text-lg md:text-xl text-slate/80 leading-relaxed mb-6">
            When you started your business, you had a vision. A dream of what this could become.
          </p>
          <p className="text-lg md:text-xl text-slate/80 leading-relaxed mb-6">
            But somewhere along the way—between dealing with customers, managing team, fixing urgent issues—you forgot. You got stuck in day-to-day operations. The dream became &quot;nice to have someday.&quot;
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 rounded-xl border border-white/5 bg-navy-light">
              <p className="font-display text-xl font-bold text-white/60 mb-3">Most dev shops ask:</p>
              <p className="text-lg text-white">&quot;What do you need built?&quot;</p>
            </div>
            <div className="p-6 rounded-xl border border-indigo/20 bg-navy-light">
              <p className="font-display text-xl font-bold text-indigo mb-3">We ask:</p>
              <p className="text-lg text-white">&quot;What did you originally dream? Let&apos;s make it real.&quot;</p>
            </div>
          </div>
        </motion.div>

        {/* Process Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h3 className="font-display text-display-lg font-bold text-gradient mb-6">
            The 5-Step Reality Engineering Process
          </h3>
          <p className="text-xl text-slate">
            This is how we build. Internally for ourselves. And externally for you.
          </p>
          <p className="text-lg text-slate/70 mt-4">
            Every project—no matter the size—runs through this lens. It&apos;s not just about solving today&apos;s pain. It&apos;s about reconnecting you to what you actually wanted and making it feasible RIGHT NOW.
          </p>
        </motion.div>

        {/* Steps - Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full p-8 lg:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden transition-all duration-300">
                {/* Giant background number */}
                <span className="absolute -right-4 -top-8 font-display text-[180px] font-bold text-white/[0.02] select-none leading-none">
                  {step.number}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  {/* Number label */}
                  <span className="text-sm font-medium tracking-wider text-indigo mb-4 block">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-slate/80 mb-6">
                    {step.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-6">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate/70">
                        <span className="text-indigo mt-1.5">•</span>
                        <span className="text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Why this matters */}
                  <div className="p-4 rounded-lg bg-navy-light/50 border border-white/5">
                    <p className="text-xs font-semibold text-indigo mb-2">Why this matters:</p>
                    <p className="text-sm text-slate/80 leading-relaxed">{step.why}</p>
                  </div>
                </div>

                {/* Animated bottom line on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo via-purple to-transparent group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* What This Means */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-4xl mx-auto mt-20 md:mt-32"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="p-8 rounded-2xl border border-white/5 bg-navy-light">
              <p className="font-display text-xl font-bold text-white/60 mb-6">Traditional dev shops:</p>
              <p className="text-slate/70 mb-4">&quot;Tell us what to build&quot; → They build it → They leave</p>
              <p className="text-sm text-slate/50">You get a tool. It might work. But did it move you toward the dream? Who knows.</p>
            </div>

            {/* Nexark */}
            <div className="p-8 rounded-2xl border border-indigo/20 bg-navy-light">
              <p className="font-display text-xl font-bold text-indigo mb-6">Nexark with Reality Engineering:</p>
              <p className="text-white mb-4">&quot;Let&apos;s remember your original vision&quot; → We reverse-engineer the path → We build what closes the gap → We stay until you&apos;re there</p>
              <p className="text-sm text-slate/70">You get technology + a roadmap to the dream you forgot you had.</p>
            </div>
          </div>

          {/* Real Example */}
          <div className="mt-12 p-8 rounded-2xl border border-purple/20 bg-navy-light">
            <p className="text-sm font-semibold text-purple mb-3">Real Example</p>
            <p className="text-base text-slate/80 leading-relaxed">
              When we built Park at 14th&apos;s CRM, it wasn&apos;t just &quot;membership management.&quot; It was reconnecting the founder to his vision of a luxury club experience. Facial recognition wasn&apos;t a feature request—it was reverse-engineered from the dream of &quot;members feel like VIPs from the moment they walk in.&quot;
            </p>
            <p className="font-display text-lg font-bold text-gradient mt-4">
              That&apos;s Reality Engineering.
            </p>
          </div>
        </motion.div>

        {/* The Difference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-3xl mx-auto text-center mt-20 md:mt-32"
        >
          <p className="font-display text-display-md font-bold text-white mb-8">
            Because we can compress time
          </p>
          <p className="text-xl md:text-2xl text-slate mb-6">
            (AI-native = 30-50% faster)
          </p>
          <p className="font-display text-display-md font-bold text-gradient mb-12">
            What felt &quot;5 years away&quot; is now &quot;6 months away.&quot;
          </p>
          <p className="text-xl text-slate/70">
            But only if we know what we&apos;re building toward.
          </p>
          <p className="text-lg text-slate/50 mt-8">
            That&apos;s why every project—even a simple CRM—starts with the dream, not the task list.
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
