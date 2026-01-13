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
        // 2: Intense Glow & Spin (Charge up)
        // 3: Fade Out (No Blast)

        const sequence = async () => {
            await new Promise(r => setTimeout(r, 500));
            setStage(1); // Logo appears
            await new Promise(r => setTimeout(r, 1000));
            setStage(2); // Charging (Spinning rings)
            await new Promise(r => setTimeout(r, 2000)); // Charge duration
            setStage(3); // Smooth Fade out
            await new Promise(r => setTimeout(r, 800));
            onComplete();
        };

        sequence();
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth fade exit
        >
            <div className="relative flex items-center justify-center">
                {/* The Core Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: stage >= 1 ? 1 : 0,
                        scale: stage === 2 ? [1, 1.05, 1] : 1, // Subtle pulse, no massive scaling
                        filter: stage === 2 ? ["brightness(1)", "brightness(1.5)", "brightness(1)"] : "none"
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } // Breathing
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

                {/* Charge Up Effects (Restored from V1) */}
                <AnimatePresence>
                    {stage === 2 && (
                        <>
                            {/* Spinning Energy Rings */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.5, rotate: 180 }}
                                exit={{ opacity: 0, scale: 1.6, transition: { duration: 0.5 } }} // Fade out, don't blast
                                transition={{ duration: 2, ease: "linear" }}
                                className="absolute w-64 h-64 rounded-full border border-gold/30 border-t-gold blur-[1px]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 1.2 }}
                                animate={{ opacity: 1, scale: 1.1, rotate: -180 }}
                                exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="absolute w-80 h-80 rounded-full border border-indigo/30 border-b-indigo blur-[2px]"
                            />

                            {/* Central Glow Pulse */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 0.8, 0.2] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, times: [0, 0.4, 0.8, 1] }}
                                className="absolute w-20 h-20 bg-gold rounded-full blur-[50px] z-10"
                            />
                        </>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
}
