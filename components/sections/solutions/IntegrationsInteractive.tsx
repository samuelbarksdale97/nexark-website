"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Slack,
    Mail,
    Calendar,
    FileText,
    Database,
    Cloud,
    MessageSquare,
    ArrowRight,
    Zap,
    CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";


// Extended data types for the Master-Detail view
interface IntegrationNode {
    id: string;
    label: string;
    icon: any;
    angle: number;
    distance: number;
    color: string;
    description: string;
    features: string[];
}

const integrations: IntegrationNode[] = [
    {
        id: "stripe",
        label: "Stripe",
        icon: CreditCard,
        angle: 0,
        distance: 35,
        color: "#635BFF",
        description: "Sync payments, invoices, and customer data directly to your CRM in real-time.",
        features: ["Revenue Recognition", "Subscription Management", "Payment Intents"]
    },
    {
        id: "slack",
        label: "Slack",
        icon: Slack,
        angle: 45,
        distance: 45,
        color: "#E01E5A",
        description: "Trigger notifications and approval workflows right where your team works.",
        features: ["Channel Alerts", "Interactive Buttons", "Daily Digests"]
    },
    {
        id: "gmail",
        label: "Gmail",
        icon: Mail,
        angle: 90,
        distance: 35,
        color: "#EA4335",
        description: "Automate email drafting and thread analysis using AI agents.",
        features: ["Draft Generation", "Sentiment Analysis", "Inbox Zero Workflows"]
    },
    {
        id: "hubspot",
        label: "HubSpot",
        icon: Database,
        angle: 135,
        distance: 45,
        color: "#FF7A59",
        description: "Keep your contact records pristine with 2-way sync and enrichment.",
        features: ["Contact Enrichment", "Deal Pipeline Sync", "Activity Logging"]
    },
    {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        angle: 180,
        distance: 35,
        color: "#4285F4",
        description: "Orchestrate meetings and availability based on project milestones.",
        features: ["Smart Scheduling", "Round Robin", "Meeting Buffers"]
    },
    {
        id: "docusign",
        label: "DocuSign",
        icon: FileText,
        angle: 225,
        distance: 45,
        color: "#FFC400",
        description: "Generate contracts and track signature status automatically.",
        features: ["Template Filling", "Status Webhooks", "Auto-Archiving"]
    },
    {
        id: "salesforce",
        label: "Salesforce",
        icon: Cloud,
        angle: 270,
        distance: 35,
        color: "#00A1E0",
        description: "Enterprise-grade CRM integration for complex sales organizations.",
        features: ["Custom Objects", "Apex Triggers", "Bulk API Sync"]
    },
    {
        id: "intercom",
        label: "Intercom",
        icon: MessageSquare,
        angle: 315,
        distance: 45,
        color: "#286EFA",
        description: "Turn support chats into actionable tickets and engineering tasks.",
        features: ["Ticket routing", "User Segmentation", "Conversation Analysis"]
    },
];

export function IntegrationsInteractive() {
    const [activeId, setActiveId] = useState<string>("stripe");
    const [isHovering, setIsHovering] = useState(false);

    // Auto-cycle logic
    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setActiveId(current => {
                const index = integrations.findIndex(i => i.id === current);
                const nextIndex = (index + 1) % integrations.length;
                return integrations[nextIndex].id;
            });
        }, 4000); // Cycle every 4 seconds

        return () => clearInterval(interval);
    }, [isHovering]);

    const activeIntegration = integrations.find(i => i.id === activeId) || integrations[0];

    // Adaptive Positioning Logic
    // Angles: 0 (Right), 90 (Bottom), 180 (Left), 270 (Top) - Math.sin/cos orientation
    // Actually, in our map: 0 is Right. 
    // If angle is > 90 and < 270, it's on the LEFT side.
    // If angle is <= 90 or >= 270, it's on the RIGHT side.
    const isLeftSide = activeIntegration.angle > 90 && activeIntegration.angle < 270;

    // Card Position: If node is on Left, Card goes Right. If node is on Right, Card goes Left.
    // Mobile: Always centered. Desktop: Adaptive.
    const desktopPositionClass = isLeftSide ? "md:right-12 md:left-auto" : "md:left-12 md:right-auto";
    const cardAlignClass = isLeftSide ? "items-end" : "items-start";

    return (
        <div className="relative w-full h-[600px] md:h-[850px] bg-navy-light/10 rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden group">




            {/* Section Label */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <div className="flex items-center gap-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-blue-200 uppercase">
                        Integration Ecosystem
                    </span>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent opacity-50 blur-3xl animate-pulse z-0" />
            <div className="absolute inset-0 z-0"
                style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            {/* The Galaxy Graph - Centered and Huge (Desktop Only) */}
            <div className="absolute inset-0 flex items-center justify-center hidden md:flex">

                {/* Center Core */}
                <div className="relative z-20 flex flex-col items-center justify-center">
                    <motion.div
                        className="w-32 h-32 rounded-full bg-navy border border-white/10 flex items-center justify-center shadow-2xl z-20"
                        style={{ boxShadow: `0 0 60px ${activeIntegration.color}40` }}
                    >
                        <span className="font-display font-bold text-white tracking-widest text-lg">NEXARK</span>
                    </motion.div>
                    {/* Ripple rings */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[ping_3s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[ping_3s_ease-in-out_infinite] delay-1000" />
                </div>

                {/* Orbiting Satellites */}
                <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                    {integrations.map((item) => {
                        const isActive = activeId === item.id;
                        // Polar to Cartesian
                        // Scale radius up significantly (e.g., 320px)
                        const rad = (item.angle * Math.PI) / 180;
                        const radius = 320 * (item.distance / 40);
                        const x = Math.cos(rad) * radius;
                        const y = Math.sin(rad) * radius;

                        return (
                            // Use pointer-events-auto on the children to allow interaction
                            <div
                                key={item.id}
                                className="absolute top-1/2 left-1/2 pointer-events-auto w-0 h-0 flex items-center justify-center"
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                                onMouseEnter={() => {
                                    setIsHovering(true);
                                    setActiveId(item.id);
                                }}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {/* Connection Line to Center */}
                                {/* We draw line from 0,0 (center of this item wrapper) back to center of container (which is -x, -y away) */}
                                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible"
                                    style={{ width: '0px', height: '0px' }}>
                                    <line
                                        x1={0}
                                        y1={0}
                                        x2={-x}
                                        y2={-y}
                                        stroke={isActive ? item.color : "rgba(255,255,255,0.05)"}
                                        strokeWidth={isActive ? 2 : 1}
                                        strokeDasharray={isActive ? "none" : "4 4"}
                                        className="transition-all duration-500"
                                    />
                                </svg>

                                {/* Node Icon */}
                                <motion.div
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 border ${isActive ? 'bg-navy border-white/20 shadow-2xl scale-125' : 'bg-navy/60 border-white/5 hover:border-white/20 hover:scale-110'}`}
                                    style={{
                                        boxShadow: isActive ? `0 0 40px ${item.color}60` : 'none',
                                        borderColor: isActive ? item.color : ''
                                    }}
                                >
                                    <item.icon
                                        className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}
                                    />
                                </motion.div>

                                {/* ALWAYS VISIBLE LABEL */}
                                <div
                                    className={`absolute top-14 left-1/2 -translate-x-1/2 text-sm font-bold tracking-wide uppercase transition-all duration-300 whitespace-nowrap text-center ${isActive ? 'text-white translate-y-2' : 'text-slate-500'}`}
                                    style={{
                                        textShadow: isActive ? `0 0 15px ${item.color}` : 'none'
                                    }}
                                >
                                    {item.label}
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>

            {/* FLOATING DETAIL CARD - Adaptive Position */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className={`absolute top-1/2 -translate-y-1/2 z-30 w-[90%] left-1/2 -translate-x-1/2 md:w-[380px] md:translate-x-0 ${desktopPositionClass}`}
                >
                    <div className="bg-navy/90 md:bg-navy/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner"
                                style={{ backgroundColor: `${activeIntegration.color}15` }}
                            >
                                <activeIntegration.icon className="w-7 h-7" style={{ color: activeIntegration.color }} />
                            </div>
                            <div>
                                <h3 className="font-display text-3xl font-bold text-white">{activeIntegration.label}</h3>
                                <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Active
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-slate-200 leading-relaxed mb-8">
                            {activeIntegration.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            {activeIntegration.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-slate-100 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        {/* CTA */}
                        <a href="/#apply" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-navy font-bold hover:bg-slate-200 transition-colors group/btn">
                            <span>Connect This Tool</span>
                            <Zap className="w-4 h-4 fill-navy group-hover/btn:fill-navy transition-all" />
                        </a>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div >
    );
}
