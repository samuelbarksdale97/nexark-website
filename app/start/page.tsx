"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Check } from "lucide-react";

type Path = null | "optimization" | "innovation";

interface FormData {
  path: Path;
  // Optimization fields
  holdingBack: string;
  howLong: string;
  alreadyTried: string;
  // Innovation fields
  changeEverything: string;
  howFarAlong: string;
  whyNow: string;
  // Shared fields
  whatWouldChange: string;
  name: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  path: null,
  holdingBack: "",
  howLong: "",
  alreadyTried: "",
  changeEverything: "",
  howFarAlong: "",
  whyNow: "",
  whatWouldChange: "",
  name: "",
  email: "",
  phone: "",
};

const inputClasses =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-colors";
const labelClasses = "block text-sm font-medium text-white mb-2";
const selectClasses =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-colors appearance-none";

export default function StartPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Replace with Supabase insert + webhook trigger
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setSubmitting(false);
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="pt-32 md:pt-40 pb-20 md:pb-32 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-8 h-8 text-indigo" />
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                We got it. Here&apos;s what happens next.
              </h1>

              <p className="text-lg text-slate leading-relaxed mb-4">
                We&apos;ll review what you shared and come back within 48 hours
                with our initial thoughts on how we&apos;d approach your
                situation. We&apos;re looking forward to learning more about what
                you&apos;re building.
              </p>

              <p className="text-slate leading-relaxed mb-10">
                Want to get the conversation going sooner? Book a discovery call
                and we&apos;ll come prepared with your answers in front of us.
              </p>

              <a
                href="https://cal.com/sam-barksdale/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-navy font-semibold hover:bg-white/90 transition-all duration-300 group"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="mt-16 pt-10 border-t border-white/5">
                <h3 className="font-display text-lg font-semibold text-white mb-6">
                  What to expect on the call
                </h3>
                <ul className="text-left max-w-md mx-auto space-y-3 text-slate">
                  <li className="flex gap-3">
                    <span className="text-indigo mt-1">•</span>
                    Understanding the full picture of what you&apos;re dealing
                    with or trying to build
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo mt-1">•</span>
                    Sharing what we see and where the biggest opportunities are
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo mt-1">•</span>
                    Mapping out what a path forward could look like
                  </li>
                </ul>
                <p className="text-sm text-slate/60 mt-6">
                  We listen, we ask questions, and we start working through the
                  problem with you. By the end of the call, you&apos;ll have a
                  clear sense of what&apos;s possible and what the next step
                  looks like.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Context */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                We&apos;d love to learn about your business.
              </h1>

              <div className="space-y-4 text-lg text-slate leading-relaxed mb-12">
                <p>
                  Every engagement starts with a conversation. You tell us where
                  your business is and where you want it to go. We dig into the
                  details, share what we see, and start mapping out what&apos;s
                  possible.
                </p>
                <p>
                  The goal of the first call is to understand your situation well
                  enough to give you something useful, whether that&apos;s a
                  recommendation, a roadmap outline, or a clear next step.
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60 font-semibold mb-4">
                  Two questions to get us started
                </h3>
                <p className="text-slate">
                  We work with two types of clients. Some have something in
                  their business that needs to be fixed. Some have an idea they
                  want to build. The questions below help us understand which
                  conversation we&apos;re walking into so we can show up
                  prepared.
                </p>
                <p className="text-slate/60 text-sm mt-4">
                  Takes about two minutes.
                </p>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-[#0a0d17] space-y-6">
                  {/* Fork Question */}
                  <div>
                    <label className={labelClasses}>
                      Where are you starting from?
                    </label>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => update("path", "optimization")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.path === "optimization"
                            ? "border-indigo bg-indigo/10 text-white"
                            : "border-white/10 text-slate hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="block font-medium text-sm">
                          Something in my business isn&apos;t working the way it
                          should
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => update("path", "innovation")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.path === "innovation"
                            ? "border-indigo bg-indigo/10 text-white"
                            : "border-white/10 text-slate hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="block font-medium text-sm">
                          I have an idea for something I want to build
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Path-Specific Questions */}
                  <AnimatePresence mode="wait">
                    {formData.path === "optimization" && (
                      <motion.div
                        key="optimization"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 overflow-hidden"
                      >
                        <div>
                          <label htmlFor="holdingBack" className={labelClasses}>
                            What&apos;s holding you back?
                          </label>
                          <textarea
                            id="holdingBack"
                            rows={3}
                            value={formData.holdingBack}
                            onChange={(e) =>
                              update("holdingBack", e.target.value)
                            }
                            className={inputClasses + " resize-none"}
                            placeholder="Tell us what's costing you the most time, money, or energy right now."
                          />
                        </div>

                        <div>
                          <label htmlFor="howLong" className={labelClasses}>
                            How long has this been a problem?
                          </label>
                          <select
                            id="howLong"
                            value={formData.howLong}
                            onChange={(e) => update("howLong", e.target.value)}
                            className={selectClasses}
                          >
                            <option value="">Select one</option>
                            <option value="less-than-3">
                              Less than 3 months
                            </option>
                            <option value="3-6">3-6 months</option>
                            <option value="6-12">6-12 months</option>
                            <option value="over-year">Over a year</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="alreadyTried"
                            className={labelClasses}
                          >
                            What have you already tried?
                          </label>
                          <textarea
                            id="alreadyTried"
                            rows={3}
                            value={formData.alreadyTried}
                            onChange={(e) =>
                              update("alreadyTried", e.target.value)
                            }
                            className={inputClasses + " resize-none"}
                            placeholder="Hired someone, bought a tool, tried to fix it internally? What happened?"
                          />
                        </div>
                      </motion.div>
                    )}

                    {formData.path === "innovation" && (
                      <motion.div
                        key="innovation"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 overflow-hidden"
                      >
                        <div>
                          <label
                            htmlFor="changeEverything"
                            className={labelClasses}
                          >
                            What would change everything?
                          </label>
                          <textarea
                            id="changeEverything"
                            rows={3}
                            value={formData.changeEverything}
                            onChange={(e) =>
                              update("changeEverything", e.target.value)
                            }
                            className={inputClasses + " resize-none"}
                            placeholder="Describe the product, platform, or capability you wish you had."
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="howFarAlong"
                            className={labelClasses}
                          >
                            How far along is the idea?
                          </label>
                          <select
                            id="howFarAlong"
                            value={formData.howFarAlong}
                            onChange={(e) =>
                              update("howFarAlong", e.target.value)
                            }
                            className={selectClasses}
                          >
                            <option value="">Select one</option>
                            <option value="concept">Just a concept</option>
                            <option value="research">
                              Some research done
                            </option>
                            <option value="poc">
                              Proof of concept exists
                            </option>
                            <option value="in-market">
                              Already in market, needs to evolve
                            </option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="whyNow" className={labelClasses}>
                            Why now?
                          </label>
                          <textarea
                            id="whyNow"
                            rows={3}
                            value={formData.whyNow}
                            onChange={(e) => update("whyNow", e.target.value)}
                            className={inputClasses + " resize-none"}
                            placeholder="What changed that made this the moment to pursue it?"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shared Questions (only show after path is selected) */}
                  {formData.path && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="space-y-6 pt-4 border-t border-white/5"
                    >
                      <div>
                        <label
                          htmlFor="whatWouldChange"
                          className={labelClasses}
                        >
                          If this were solved or built, what would be different?
                        </label>
                        <textarea
                          id="whatWouldChange"
                          rows={3}
                          value={formData.whatWouldChange}
                          onChange={(e) =>
                            update("whatWouldChange", e.target.value)
                          }
                          className={inputClasses + " resize-none"}
                          placeholder="Paint the picture."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className={labelClasses}>
                            Your name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => update("name", e.target.value)}
                            className={inputClasses}
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelClasses}>
                            Phone (optional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={inputClasses}
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClasses}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputClasses}
                          placeholder="you@company.com"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-navy font-semibold hover:bg-white/90 transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending..." : "Submit"}
                        {!submitting && (
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
