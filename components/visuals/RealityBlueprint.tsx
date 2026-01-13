"use client";

import { motion } from "framer-motion";

export function RealityBlueprint({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
    return (
        <div className="relative w-full aspect-square max-w-md">
            {/* Architectural lines */}
            <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Grid of precise lines */}
                <motion.line
                    x1="0"
                    y1="100"
                    x2="400"
                    y2="100"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.line
                    x1="0"
                    y1="200"
                    x2="400"
                    y2="200"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                />
                <motion.line
                    x1="0"
                    y1="300"
                    x2="400"
                    y2="300"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.0 }}
                />
                <motion.line
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.1 }}
                />
                <motion.line
                    x1="200"
                    y1="0"
                    x2="200"
                    y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                />
                <motion.line
                    x1="300"
                    y1="0"
                    x2="300"
                    y2="400"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.3 }}
                />

                {/* Accent diagonal - updated to utilize the new Gold/Purple gradient connection */}
                <motion.line
                    x1="50"
                    y1="350"
                    x2="350"
                    y2="50"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                />

                {/* Central focus point */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="60"
                    stroke="rgba(99,102,241,0.3)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                />
                <motion.circle
                    cx="200"
                    cy="200"
                    r="40"
                    stroke="rgba(211, 175, 55, 0.4)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                />
                <motion.circle
                    cx="200"
                    cy="200"
                    r="6"
                    fill="rgba(211, 175, 55, 0.8)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(99,102,241,0.6)" />
                        <stop offset="100%" stopColor="rgba(211, 175, 55, 0.6)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* NEXARK wordmark */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
            >
                <span className="font-display text-2xl tracking-[0.4em] text-white/20">
                    NEXARK
                </span>
            </motion.div>
        </div>
    );
}
