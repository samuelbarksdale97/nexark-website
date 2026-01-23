"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, FileText, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const leadMagnets = [
  {
    id: "matrix",
    title: "The Automation Opportunity Matrix",
    description: "A free tool to identify your top 10 automation quick wins using a simple Impact vs. Effort scoring system. Map your workflows and instantly see what to automate first.",
    type: "Free Interactive Tool",
    typeIcon: Zap,
    icon: Zap,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    borderHover: "hover:border-indigo-500/30",
    ctaGradient: "from-indigo-500 to-indigo-600",
    cta: "Access Free Tool",
    href: "/automation-opportunity-form",
    isExternal: false,
  },
  // Hidden for now
  // {
  //   id: "diagnostic",
  //   title: "The 15-Minute Bottleneck Diagnostic",
  //   description: "A guided video walkthrough showing you exactly how to find the #1 constraint in your business using our proven framework.",
  //   type: "Video Training",
  //   typeIcon: Play,
  //   icon: Play,
  //   iconBg: "bg-purple-500/10",
  //   iconColor: "text-purple-400",
  //   borderHover: "hover:border-purple-500/30",
  //   ctaGradient: "from-purple-500 to-purple-600",
  //   cta: "Watch Free Training",
  //   href: "#",
  //   isExternal: true,
  // },
  // {
  //   id: "checklist",
  //   title: "The Ultimate AI Automation Checklist",
  //   description: "47 specific tasks you should be automating right now (and the exact tools to do it). Organized by department: Sales, Operations, Finance, Marketing.",
  //   type: "PDF Guide • 18 pages",
  //   typeIcon: FileText,
  //   icon: FileText,
  //   iconBg: "bg-emerald-500/10",
  //   iconColor: "text-emerald-400",
  //   borderHover: "hover:border-emerald-500/30",
  //   ctaGradient: "from-emerald-500 to-emerald-600",
  //   cta: "Download Free Guide",
  //   href: "/The_Ultimate_AI_Automation_Checklist.pdf",
  //   isExternal: true,
  // },
];

function LeadMagnetCard({ magnet, index, isInView }: { magnet: typeof leadMagnets[0]; index: number; isInView: boolean }) {
  const IconComponent = magnet.icon;
  const TypeIconComponent = magnet.typeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="relative group h-full"
    >
      <div className={`relative h-full flex flex-col p-8 rounded-2xl border border-white/[0.08] bg-[#0a0a12] ${magnet.borderHover} transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-[#0c0c14]`}>
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-6">
          <TypeIconComponent className={`w-4 h-4 ${magnet.iconColor}`} />
          <span className="text-sm font-medium text-slate-500">{magnet.type}</span>
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${magnet.iconBg} flex items-center justify-center mb-6 border border-white/[0.05]`}>
          <IconComponent className={`w-7 h-7 ${magnet.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">
          {magnet.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-[15px] mb-8 leading-relaxed flex-grow">
          {magnet.description}
        </p>

        {/* CTA Button */}
        <div className="mt-auto">
          {magnet.isExternal ? (
            <a 
              href={magnet.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group/btn w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r ${magnet.ctaGradient} text-white font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-${magnet.id === 'matrix' ? 'indigo' : magnet.id === 'diagnostic' ? 'purple' : 'emerald'}-500/20`}
            >
              {magnet.cta}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link 
              href={magnet.href}
              className={`group/btn w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r ${magnet.ctaGradient} text-white font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:shadow-indigo-500/20`}
            >
              {magnet.cta}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function LeadMagnets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const magnet = leadMagnets[0]; // Get the single lead magnet
  const IconComponent = magnet.icon;

  return (
    <section ref={ref} id="resources" className="py-24 md:py-32 bg-[#030305] relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
      
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Centered compact layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Featured Card */}
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0c0c14] to-[#0a0a12] border border-white/[0.08] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
            <Sparkles className="absolute top-8 right-8 w-6 h-6 text-indigo-400/20" />
            
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Content */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-300">Free Interactive Tool</span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {magnet.title}
                </h2>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {magnet.description}
                </p>

                <Link href={magnet.href}>
                  <button className="h-14 px-8 text-base rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-3 cursor-pointer">
                    {magnet.cta}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* Right - Visual */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  {/* Glowing backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl scale-110" />
                  
                  {/* Icon container */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-[#0a0a12] border border-white/[0.1] flex items-center justify-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 mb-4">Want a personalized automation roadmap?</p>
            <a 
              href="https://cal.com/sam-barksdale/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
