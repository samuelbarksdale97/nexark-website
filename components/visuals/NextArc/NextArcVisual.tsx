"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface NextArcVisualProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function NextArcVisual({ mouseX, mouseY }: NextArcVisualProps) {
    // Parallax transforms
    const x = useTransform(mouseX, (val) => val * -1);
    const y = useTransform(mouseY, (val) => val * -1);
    const starsX = useTransform(mouseX, (val) => val * -0.5);
    const starsY = useTransform(mouseY, (val) => val * -0.5);

    // Generate random stars for background
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">

            {/* 1. Star Field (We shoot for the stars) */}
            <motion.div
                style={{ x: starsX, y: starsY }}
                className="absolute inset-0 z-0"
            >
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full opacity-60"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* 2. The Moon (Hope to land on the moon) */}
            <motion.div
                style={{ x, y }}
                className="absolute w-32 h-32 rounded-full z-10"
            >
                {/* Moon Body */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-100 to-indigo-300 opacity-90 blur-[1px] shadow-[0_0_60px_rgba(255,255,255,0.4)]" />
                {/* Moon Craters/Texture overlay */}
                <div className="absolute inset-0 rounded-full opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </motion.div>

            {/* 3. The "Next Arc" Shooting Star */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <svg className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor="#6366F1" stopOpacity="0.5" /> {/* Indigo tail */}
                            <stop offset="80%" stopColor="#F59E0B" /> {/* Gold head */}
                            <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* The Arc Path */}
                    <motion.path
                        d="M 50 500 Q 250 100 550 50" // Bezier curve representing the "Arc"
                        fill="none"
                        stroke="url(#arcGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 0.4, 0], // Shoots across
                            opacity: [0, 1, 0],
                            pathOffset: [0, 0.6, 1] // Moves along the path
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                        }}
                    />

                    {/* The Leading Star Particle */}
                    <motion.circle
                        r="6"
                        fill="#F59E0B"
                        filter="url(#glow)"
                    >
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path="M 50 500 Q 250 100 550 50"
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                </svg>
            </div>

        </div>
    );
}
