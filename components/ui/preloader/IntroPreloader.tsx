"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function IntroPreloader({ onComplete }: { onComplete: () => void }) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Sequence of animations
        // 0: Initial clean slate
        // 1: Fade in logo (Charge start)
        // 2: Intense Glow (Charge up)
        // 3: Explosion/Reveal (Open up)

        const sequence = async () => {
            await new Promise(r => setTimeout(r, 500));
            setStage(1); // Logo appears
            await new Promise(r => setTimeout(r, 1500));
            setStage(2); // Charging
            await new Promise(r => setTimeout(r, 1500));
            setStage(3); // Blast off
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
                {/* The Core Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: stage >= 1 ? 1 : 0,
                        scale: stage === 2 ? [1, 1.05, 1] : stage === 3 ? 15 : 1, // Blast expansion
                        filter: stage === 2 ? ["brightness(1)", "brightness(2)", "brightness(1)"] : "none"
                    }}
                    transition={{
                        duration: stage === 3 ? 0.8 : 0.5,
                        ease: stage === 3 ? "easeIn" : "easeInOut"
                    }}
                    className="relative w-48 h-48 md:w-64 md:h-64 z-20"
                >
                    {/* Hard mix-blend to remove black box if image has one, 
               assuming dark bg. If transparent png, this is fine. 
               Using mix-blend-mode: screen to knock out black bg effectively.
           */}
                    <Image
                        src="/assets/reality-logo.png"
                        alt="Nexark"
                        fill
                        className="object-contain mix-blend-screen"
                        priority
                    />
                </motion.div>

                {/* Charge Up Effects */}
                <AnimatePresence>
                    {stage === 2 && (
                        <>
                            {/* Spinning Energy Rings */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.5, rotate: 180 }}
                                exit={{ opacity: 0, scale: 3, transition: { duration: 0.3 } }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                className="absolute w-64 h-64 rounded-full border border-gold/30 border-t-gold blur-[1px]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 1.2 }}
                                animate={{ opacity: 1, scale: 0.8, rotate: -180 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                className="absolute w-80 h-80 rounded-full border border-indigo/30 border-b-indigo blur-[2px]"
                            />

                            {/* Central Glow Pulse */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 0.8, 0.2] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, times: [0, 0.4, 0.8, 1] }}
                                className="absolute w-20 h-20 bg-gold rounded-full blur-[50px] z-10"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Final Flash */}
                <AnimatePresence>
                    {stage === 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white w-screen h-screen z-50 pointer-events-none mix-blend-overlay"
                        />
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
}
