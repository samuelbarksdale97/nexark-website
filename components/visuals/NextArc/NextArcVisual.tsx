"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface NextArcVisualProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function NextArcVisual({ mouseX, mouseY }: NextArcVisualProps) {
    // Parallax transforms - subtle depth
    const starsX = useTransform(mouseX, (val) => val * -0.5);
    const starsY = useTransform(mouseY, (val) => val * -0.5);
    const deepStarsX = useTransform(mouseX, (val) => val * -0.2);
    const deepStarsY = useTransform(mouseY, (val) => val * -0.2);

    // Generate random stars for background with different sizes and blink rates
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; opacity: number; blinkDuration: number }[]>([]);

    useEffect(() => {
        // Generate a dense, realistic star field
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() < 0.8 ? Math.random() * 2 : Math.random() * 3 + 1, // Mostly small stars, few bright ones
            opacity: Math.random() * 0.7 + 0.3,
            blinkDuration: Math.random() * 3 + 2, // Random blink speed between 2s and 5s
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">

            {/* 1. Realistic Star Field Background */}
            <motion.div
                style={{ x: starsX, y: starsY }}
                className="absolute inset-0 z-0"
            >
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                            boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)` : 'none'
                        }}
                        animate={{
                            opacity: [star.opacity, star.opacity * 0.3, star.opacity], // Twinkle effect
                        }}
                        transition={{
                            duration: star.blinkDuration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </motion.div>

            {/* Deep Space Stars (Parallax Layer) */}
            <motion.div
                style={{ x: deepStarsX, y: deepStarsY }}
                className="absolute inset-0 z-0 opacity-50"
            >
                {stars.slice(0, 50).map((star) => (
                    <div
                        key={`deep-${star.id}`}
                        className="absolute bg-slate-400 rounded-full"
                        style={{
                            top: star.left, // Swap coords for randomness
                            left: star.top,
                            width: star.size * 0.5,
                            height: star.size * 0.5,
                            opacity: 0.4
                        }}
                    />
                ))}
            </motion.div>


            {/* 2. Photorealistic Shooting Star Animation - Full Screen Across */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="relative w-full h-full">
                    <motion.div
                        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
                        initial={{ opacity: 0, x: -200, y: '60vh', rotate: -15, scale: 0.8 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            x: ['-10vw', '50vw', '110vw'], // Full width across
                            y: ['70vh', '50vh', '20vh'], // Gentle rising arc (not steep up)
                            rotate: [-15, -20, -25], // Horizontal-ish rotation
                            scale: [0.6, 1, 0.8]
                        }}
                        transition={{
                            duration: 8, // Very slow and majestic
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 3,
                            times: [0, 0.1, 0.8, 1]
                        }}
                    >
                        {/* The Star Body image - Transparent Asset */}
                        <Image
                            src="/assets/shooting-star-transparent.png"
                            alt="Next Arc"
                            fill
                            className="object-contain rotate-180"
                            priority
                        />

                        {/* The Head Flare */}
                        <div className="absolute top-[20%] left-[80%] w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2">
                            <Image
                                src="/assets/star-flare.png"
                                alt="Flare"
                                fill
                                className="object-contain mix-blend-screen"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}
