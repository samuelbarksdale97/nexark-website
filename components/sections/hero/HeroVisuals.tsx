"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

// --- Mock Data Components ---

const CRMCard = () => (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">C</div>
                <span className="font-semibold text-white/90 text-sm">CRM</span>
            </div>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/50">Leads</span>
        </div>

        {/* Content */}
        <div className="space-y-3">
            {[
                { name: "Alex Chen", status: "New", color: "text-blue-400 bg-blue-400/10", img: "/images/avatars/alex.png" },
                { name: "Sarah Miller", status: "Deal", color: "text-emerald-400 bg-emerald-400/10", img: "/images/avatars/sarah.png" },
                { name: "James K.", status: "Cold", color: "text-slate-400 bg-slate-400/10", img: "/images/avatars/james.png" },
            ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10">
                            <Image src={user.img} alt={user.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-white/80">{user.name}</span>
                        </div>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${user.color}`}>{user.status}</span>
                </div>
            ))}
            {/* Mock Input */}
            <div className="mt-2 h-6 w-full rounded bg-white/5 border border-white/5 flex items-center px-2">
                <div className="w-16 h-1 rounded bg-white/10"></div>
            </div>
        </div>
    </div>
);

const WorkflowCard = () => (
    <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">W</div>
                <span className="font-semibold text-white/90 text-sm">Workflows</span>
            </div>
            <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
            </div>
        </div>

        {/* Visualization */}
        <div className="flex-1 flex flex-col items-center justify-start pt-2 relative">
            {/* Top Dashed Line */}
            <div className="h-4 w-px border-l-2 border-dashed border-white/20 mb-1" />

            {/* Trigger Box */}
            <div className="w-48 bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2.5 text-center backdrop-blur-sm z-10 shadow-lg relative">
                <div className="text-[10px] uppercase tracking-wider text-indigo-300 mb-0.5">Trigger</div>
                <div className="text-white font-medium text-sm">New Lead</div>
                {/* Glow behind */}
                <div className="absolute inset-0 bg-indigo-500/10 blur-xl -z-10 rounded-lg" />
            </div>

            {/* Connection Line */}
            <div className="h-4 w-px bg-indigo-500/30 my-0.5" />

            {/* Action Box */}
            <div className="w-48 bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2.5 text-center backdrop-blur-sm z-10 shadow-lg">
                <div className="text-[10px] uppercase tracking-wider text-indigo-300 mb-0.5">Action</div>
                <div className="text-white font-medium text-sm">Enrich Data</div>
            </div>

            {/* Branching Connection */}
            <div className="w-48 h-6 relative">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                    {/* Vertical stem */}
                    <path d="M50 0 L50 12" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" fill="none" />
                    {/* Horizontal branch */}
                    <path d="M25 12 L75 12" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" fill="none" />
                    {/* Left drop */}
                    <path d="M25 12 L25 24" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" fill="none" />
                    {/* Right drop */}
                    <path d="M75 12 L75 24" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            {/* Outcomes Row */}
            <div className="flex gap-4 w-48 justify-between mt-0">
                <div className="w-[88px] py-1.5 border border-emerald-500/30 bg-emerald-500/10 rounded text-center text-[10px] font-medium text-emerald-400">
                    Qualified
                </div>
                <div className="w-[88px] py-1.5 border border-slate-500/30 bg-slate-500/10 rounded text-center text-[10px] font-medium text-slate-400">
                    Nurture
                </div>
            </div>
        </div>
    </div>
);

const DashboardCard = () => (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">D</div>
                <span className="font-semibold text-white/90 text-sm">Dashboard</span>
            </div>
            <span className="text-[10px] text-slate-400">Live</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2 rounded bg-white/5">
                <div className="text-[9px] text-slate-400 mb-1">Revenue</div>
                <div className="text-sm font-bold text-white">$124.5k</div>
                <div className="text-[8px] text-emerald-400">+12%</div>
            </div>
            <div className="p-2 rounded bg-white/5">
                <div className="text-[9px] text-slate-400 mb-1">Active</div>
                <div className="text-sm font-bold text-white">1,204</div>
                <div className="text-[8px] text-emerald-400">+5%</div>
            </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative border-l border-b border-white/10 rounded-bl-sm p-1">
            {/* Fake Bars/Line */}
            <div className="absolute bottom-0 left-1 w-1/5 h-[40%] bg-blue-500/20 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-[25%] w-1/5 h-[65%] bg-blue-500/30 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-[50%] w-1/5 h-[50%] bg-blue-500/40 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-[75%] w-1/5 h-[85%] bg-blue-500/60 rounded-t-sm border-t border-blue-400/50"></div>

            {/* Trend Line SVG */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                <path
                    d="M 0 80 C 20 80, 40 40, 80 50 S 120 10, 160 15"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="2"
                    filter="drop-shadow(0 0 4px rgba(96,165,250, 0.5))"
                />
            </svg>
        </div>
    </div>
);


export function HeroVisuals() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Avoid hydration mismatch on 3D transforms

    return (
        // Desktop only - hidden on mobile for performance
        <div className="hidden md:flex relative w-full h-[500px] items-center justify-center perspective-[1000px]">
            {/* CARD 1: CRM (Left, Back) */}
            <motion.div
                initial={{ opacity: 0, x: -50, rotateY: 10, z: -50, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                animate={{ opacity: 1, x: -140, rotateY: -15, rotateZ: -5, z: -40, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                className="absolute w-[260px] h-[360px] rounded-xl glass border border-white/10 p-5 shadow-2xl"
                style={{
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.1)",
                    zIndex: 10,
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
                }}
                whileHover={{
                    scale: 1.1,
                    zIndex: 100,
                    rotateY: 0,
                    x: -140,
                    backgroundColor: "#020410",
                    borderColor: "rgba(16, 185, 129, 0.5)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)"
                }}
            >
                <CRMCard />
            </motion.div>

            {/* CARD 3: Dashboard (Right, Back) */}
            <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10, z: -50, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                animate={{ opacity: 1, x: 140, rotateY: 15, rotateZ: 5, z: -40, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                transition={{ duration: 1, delay: 0.4, type: "spring" }}
                className="absolute w-[260px] h-[360px] rounded-xl glass border border-white/10 p-5 shadow-2xl"
                style={{
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59, 130, 246, 0.1)",
                    zIndex: 10,
                    backgroundImage: "linear-gradient(225deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
                }}
                whileHover={{
                    scale: 1.1,
                    zIndex: 100,
                    rotateY: 0,
                    x: 140,
                    backgroundColor: "#020410",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)"
                }}
            >
                <DashboardCard />
            </motion.div>

            {/* CARD 2: Workflows (Center, Front) */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0, z: 20, backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(255,255,255,0.1)" }}
                transition={{ duration: 1, delay: 0.6, type: "spring" }}
                className="absolute w-[280px] h-[400px] rounded-xl glass border border-white/10 p-6 shadow-2xl"
                style={{
                    boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99, 102, 241, 0.2)",
                    zIndex: 20,
                    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)"
                }}
                whileHover={{
                    scale: 1.1,
                    y: -20,
                    zIndex: 100,
                    backgroundColor: "#020410",
                    borderColor: "rgba(99, 102, 241, 0.5)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)"
                }}
            >
                <WorkflowCard />
            </motion.div>
        </div>
    );
}
