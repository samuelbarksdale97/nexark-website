"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const useCases = [
  {
    eyebrow: "Operations Excellence",
    title: "Run like a machine",
    headline: "Transform chaos into seamless operations",
    subhead: "Custom CRM + Sales Automation + Team Coordination",
    features: [
      "Sales pipeline that updates itself from email, calendar, and conversations",
      "Automated follow-ups that keep deals moving forward",
      "Real-time dashboards showing exactly where every deal stands",
      "Smart alerts when action is needed or opportunities arise",
      "Integration with your existing tools (Gmail, Slack, QuickBooks)",
    ],
    cta: "See How It Works",
    href: "#apply",
    color: "indigo" as const,
  },
  {
    eyebrow: "Client Delivery",
    title: "Deliver with confidence",
    headline: "Professional systems that wow clients",
    subhead: "Client Portal + Project Management + Automated Workflows",
    features: [
      "Branded client portal where everything lives in one place",
      "Project dashboards that show progress in real-time",
      "Automated status updates, invoices, and contract renewals",
      "File sharing and approval workflows that actually get used",
      "Integration with Stripe, DocuSign, and your project tools",
    ],
    cta: "See How It Works",
    href: "#apply",
    color: "emerald" as const,
    badge: "MOST POPULAR",
  },
  {
    eyebrow: "Business Intelligence",
    title: "Make data-driven decisions",
    headline: "See the full picture of your business",
    subhead: "Custom Dashboards + Analytics + Reporting Automation",
    features: [
      "Executive dashboard with all your KPIs in one place",
      "Automated reports that write themselves every week",
      "Real-time alerts when metrics move (good or bad)",
      "Data pulled from everywhere: sales, marketing, operations, finance",
      "Beautiful visualizations your team will actually look at",
    ],
    cta: "See How It Works",
    href: "#apply",
    color: "purple" as const,
  },
];

function TiltCard({ children, className, color }: { children: React.ReactNode; className?: string; color: "indigo" | "emerald" | "purple" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div
        className={`
          relative h-full p-8 lg:p-10 rounded-2xl border overflow-hidden transition-all duration-300
          ${color === "indigo" ? "border-indigo/20 bg-navy-light" :
            color === "emerald" ? "border-emerald/20 bg-navy-light" :
            "border-purple/20 bg-navy-light"}
          ${isHovered ? "border-opacity-50 shadow-xl" : ""}
        `}
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Subtle glow on hover */}
        <div
          className={`
            absolute inset-0 opacity-0 transition-opacity duration-500
            ${isHovered ? "opacity-100" : ""}
            ${color === "indigo" ? "bg-gradient-to-br from-indigo/5 to-transparent" :
              color === "emerald" ? "bg-gradient-to-br from-emerald/5 to-transparent" :
              "bg-gradient-to-br from-purple/5 to-transparent"}
          `}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

export function Offerings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-navy-light relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Diagonal divider accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[600px] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-12 hidden lg:block" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32 text-center"
        >
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-wide text-slate mb-6">
            <span className="w-8 h-px bg-gradient-to-r from-purple to-transparent" />
            What We Build
          </span>
          <h2 className="font-display text-display-xl font-bold text-white mb-4">
            The Next Arc for Your Business
          </h2>
          <p className="text-xl text-slate max-w-2xl mx-auto mb-3">
            Real use cases. Real outcomes. Built with Reality Engineering.
          </p>
          <p className="text-base text-slate/60 max-w-xl mx-auto italic">
            These are just a few examples. We build custom technology for any business challenge—from workflow automation to data infrastructure to customer experiences.
          </p>
        </motion.div>

        {/* Three-column use case grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start" style={{ perspective: "1000px" }}>
          {useCases.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className={index === 1 ? "lg:-mt-8" : ""}
            >
              <TiltCard color={tier.color}>
                {/* Badge for most popular */}
                {tier.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald text-navy text-xs font-bold tracking-wider">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Eyebrow */}
                <span className={`${tier.color === "indigo" ? "text-indigo" : tier.color === "emerald" ? "text-emerald" : "text-purple"} text-sm font-medium tracking-wider ${tier.badge ? "mt-3 inline-block" : ""}`}>
                  {tier.eyebrow}
                </span>

                {/* Title (Price) */}
                <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mt-4 mb-2">
                  {tier.title}
                </h3>

                {/* Headlines */}
                <p className="font-display text-xl font-medium text-white/80 mb-1">
                  {tier.headline}
                </p>
                <p className="text-slate mb-8">{tier.subhead}</p>

                {/* Features */}
                <ul className="space-y-3 mb-10">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.color === "indigo" ? "text-indigo" : tier.color === "emerald" ? "text-emerald" : "text-purple"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  href={tier.href}
                  variant={index === 1 ? "primary" : "secondary"}
                  showArrow
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
