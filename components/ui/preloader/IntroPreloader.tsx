"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function IntroPreloader({ onComplete }: { onComplete: () => void }) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Sequence of animations
        // 0: Initial
        // 1: Logo Fades In
        // 2: Drip falls and Circle Draws
        // 3: Fade Out

        const sequence = async () => {
            await new Promise(r => setTimeout(r, 200));
            setStage(1); // Logo appears
            await new Promise(r => setTimeout(r, 800));
            setStage(2); // Drip/Circle animation starts
            await new Promise(r => setTimeout(r, 2200)); // Wait for circle to complete (duration 1.5s + delay)
            setStage(3); // Fade out
            await new Promise(r => setTimeout(r, 800));
            onComplete();
        };

        sequence();
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex items-center justify-center">
                {/* The Core Logo - No Scaling/Blast */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: stage >= 1 ? 1 : 0,
                        scale: 1,
                        y: stage < 3 ? [0, -4, 0] : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-48 h-48 md:w-64 md:h-64 z-20"
                >
                    <Image
                        src="/assets/reality-logo.png"
                        alt="Nexark"
                        fill
                        className="object-contain mix-blend-screen"
                        priority
                    />
                </motion.div>

                {/* Water Ripple / Circle Outline Effect */}
                <AnimatePresence>
                    {stage >= 2 && (
                        <svg
                            className="absolute pointer-events-none rotate-[-90deg]"
                            width="500"
                            height="500"
                            viewBox="0 0 500 500"
                            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                        >
                            {/* Inner Ripple - Drip */}
                            <motion.circle
                                cx="250"
                                cy="250"
                                r="180"
                                fill="none"
                                stroke="#D4AF37" /* Gold */
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: [0, 0.8, 0], // Flash in and fade out
                                    scale: 1.1
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                    times: [0, 0.2, 1]
                                }}
                            />

                            {/* Outer Elegant Circle - Draws and stays briefly */}
                            <motion.circle
                                cx="250"
                                cy="250"
                                r="200"
                                fill="none"
                                stroke="#6366F1" /* Indigo */
                                strokeWidth="2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.3 // Start slightly after inner ripple
                                }}
                            />
                        </svg>
                    )}
                </AnimatePresence>

                {/* Drip Particle - Falls into center before ripple */}
                <AnimatePresence>
                    {stage === 2 && (
                        <motion.div
                            initial={{ y: -250, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeIn" }}
                            className="absolute w-1.5 h-1.5 bg-gold rounded-full z-30 shadow-[0_0_10px_#D4AF37]"
                        />
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
}
