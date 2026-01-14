"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Workflow, Database, Zap, Users, MessageSquare, BarChart, FileText } from "lucide-react";

const solutions = [
  {
    icon: Globe,
    category: "Website Design & Development",
    tagline: "From landing page to intelligent platform",
    description: "We build websites that do exactly what you need—nothing more, nothing less. Start with a simple landing page. Add a blog. Integrate a contact form. Then supercharge it with agentic workflows.",
    examples: [
      "Landing pages and marketing websites",
      "Contact forms that trigger automated research on each inquiry",
      "Blog platforms with AI-powered content optimization",
      "Custom portals with role-based access",
      "E-commerce with inventory and fulfillment automation",
    ],
    color: "indigo",
  },
  {
    icon: Workflow,
    category: "SOP → Agentic Workflow Transformation",
    tagline: "Turn your processes into intelligent automation",
    description: "You have SOPs in Google Docs. We turn them into agentic workflows. Your standard operating procedures become self-executing systems that handle routine work while you focus on strategy.",
    examples: [
      "Client onboarding sequences that run themselves",
      "Document generation and approval workflows",
      "Automated follow-ups based on client behavior",
      "Research and data gathering workflows",
      "Quality assurance and compliance checks",
    ],
    color: "purple",
  },
  {
    icon: Database,
    category: "Custom CRMs & Sales Systems",
    tagline: "Built for your exact sales process",
    description: "Generic CRMs force you to adapt. We build CRMs that match how you actually sell. Pipeline tracking, automation, and integrations that update themselves from your emails, calendar, and conversations.",
    examples: [
      "Sales pipeline that updates from email and calendar automatically",
      "Lead scoring and qualification workflows",
      "Proposal and quote generation",
      "Automated follow-up sequences",
      "Real-time dashboards showing deal status",
    ],
    color: "emerald",
  },
  {
    icon: Zap,
    category: "Integrations & API Connections",
    tagline: "We'll work with other companies so you don't have to",
    description: "Your tools should talk to each other. We build integrations that connect everything—and we handle the vendor communication. If there are issues, we're transparent about it and find solutions.",
    examples: [
      "Connect your CRM with email, calendar, and Slack",
      "Sync data between Stripe, QuickBooks, and your database",
      "Build custom integrations for unique vendor APIs",
      "Automate data flow between all your systems",
      "Legacy system modernization and API wrappers",
    ],
    color: "blue",
  },
  {
    icon: Users,
    category: "Client-Facing Portals",
    tagline: "Professional systems that wow your clients",
    description: "Give your clients a branded portal where everything lives. Project dashboards, file sharing, automated status updates, invoices, and contract renewals—all in one place.",
    examples: [
      "Branded client portals with real-time project updates",
      "File sharing and approval workflows",
      "Automated invoicing and payment processing",
      "Booking and scheduling systems",
      "Client communication automation",
    ],
    color: "gold",
  },
  {
    icon: MessageSquare,
    category: "Voice Agents & Communication",
    tagline: "AI-powered conversations that actually work",
    description: "Voice agents that handle calls, qualify leads, answer questions, and escalate when needed. From simple phone systems to sophisticated conversation workflows.",
    examples: [
      "Inbound lead qualification calls",
      "Appointment scheduling and reminders",
      "Customer support first-line response",
      "Follow-up calls and check-ins",
      "Custom voice workflows for your business",
    ],
    color: "purple",
  },
  {
    icon: BarChart,
    category: "Business Intelligence & Dashboards",
    tagline: "See the full picture of your business",
    description: "Executive dashboards with all your KPIs in one place. Automated reports. Real-time alerts. Data pulled from everywhere—sales, marketing, operations, finance.",
    examples: [
      "Real-time KPI dashboards",
      "Automated weekly and monthly reports",
      "Predictive analytics and forecasting",
      "Custom visualizations that actually get used",
      "Data warehouse integration across all systems",
    ],
    color: "emerald",
  },
  {
    icon: FileText,
    category: "Operations & Project Management",
    tagline: "Systems that match your methodology",
    description: "Project management tools built for how you actually work. Resource allocation, team collaboration, task automation, custom mobile apps for field teams.",
    examples: [
      "Project management matching your exact process",
      "Resource scheduling and allocation",
      "Time tracking and billing automation",
      "Team collaboration platforms",
      "Custom mobile apps for field operations",
    ],
    color: "indigo",
  },
];

export function SolutionsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-navy-light relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-display-lg font-bold text-white mb-4">
            Solution Categories
          </h2>
          <p className="text-xl text-slate max-w-2xl mx-auto">
            These are just some examples. If you can describe it, we can build it.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid gap-12 lg:gap-16 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`p-8 lg:p-10 rounded-2xl border bg-navy-light
                  ${solution.color === "indigo" ? "border-indigo/20" :
                    solution.color === "purple" ? "border-purple/20" :
                      solution.color === "emerald" ? "border-emerald/20" :
                        solution.color === "blue" ? "border-blue-500/20" :
                          solution.color === "gold" ? "border-gold/20" :
                            "border-white/10"}`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl
                      ${solution.color === "indigo" ? "bg-indigo/10" :
                        solution.color === "purple" ? "bg-purple/10" :
                          solution.color === "emerald" ? "bg-emerald/10" :
                            solution.color === "blue" ? "bg-blue-500/10" :
                              solution.color === "gold" ? "bg-gold/10" :
                                "bg-white/10"}`}
                    >
                      <Icon className={`w-6 h-6
                        ${solution.color === "indigo" ? "text-indigo" :
                          solution.color === "purple" ? "text-purple" :
                            solution.color === "emerald" ? "text-emerald" :
                              solution.color === "blue" ? "text-blue-400" :
                                solution.color === "gold" ? "text-gold" :
                                  "text-white"}`}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                    {solution.category}
                  </h3>

                  {/* Tagline */}
                  <p className={`text-lg font-medium mb-4
                    ${solution.color === "indigo" ? "text-indigo" :
                      solution.color === "purple" ? "text-purple" :
                        solution.color === "emerald" ? "text-emerald" :
                          solution.color === "blue" ? "text-blue-400" :
                            solution.color === "gold" ? "text-gold" :
                              "text-white/70"}`}
                  >
                    {solution.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Examples */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white/60 mb-3">Examples:</p>
                    <ul className="space-y-2">
                      {solution.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                            ${solution.color === "indigo" ? "bg-indigo" :
                              solution.color === "purple" ? "bg-purple" :
                                solution.color === "emerald" ? "bg-emerald" :
                                  solution.color === "blue" ? "bg-blue-400" :
                                    solution.color === "gold" ? "bg-gold" :
                                      "bg-white"}`}
                          />
                          <span className="text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 max-w-3xl mx-auto text-center p-8 rounded-2xl border border-purple/20 bg-navy-light"
        >
          <p className="text-xl font-display font-bold text-white mb-4">
            Don't see what you need?
          </p>
          <p className="text-slate leading-relaxed">
            These categories are just examples. We've built everything from custom CRM and content management systems for luxury clubs to automated dispatching for yacht charters. If you can describe the problem, we can engineer the solution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
