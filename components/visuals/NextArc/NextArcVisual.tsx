"use client";

import { useEffect, useRef } from "react";
import { useSpring, useMotionValue } from "framer-motion";

export function NextArcVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Internal Mouse Tracking for Global Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize -0.5 to 0.5
            const xPct = (e.clientX / window.innerWidth) - 0.5;
            const yPct = (e.clientY / window.innerHeight) - 0.5;

            // Subtle parallax range
            mouseX.set(xPct * 20);
            mouseY.set(yPct * 20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // --- Configuration ---
        const STAR_COUNT = 400; // Increased count for full page density

        // --- Classes ---

        class Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            blinkSpeed: number;
            baseOpacity: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                this.baseOpacity = Math.random() * 0.5 + 0.1;
                this.opacity = this.baseOpacity;
                this.blinkSpeed = Math.random() * 0.02 + 0.005;
            }

            draw(parX: number, parY: number) {
                if (!ctx) return;

                // Parallax offset
                const depth = this.size < 1 ? 0.2 : 0.5;
                const moveX = parX * depth;
                const moveY = parY * depth;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.arc(this.x + moveX, this.y + moveY, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                // Simple twinkling
                this.opacity += Math.sin(Date.now() * this.blinkSpeed) * 0.01;
                // Clamp opacity
                if (this.opacity < 0.1) this.opacity = 0.1;
                if (this.opacity > 0.8) this.opacity = 0.8;
            }
        }

        // --- Initialization ---
        const stars: Star[] = [];
        // Stars populated in handleResize

        // --- Animation Loop ---
        const render = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            const mx = smoothX.get() || 0;
            const my = smoothY.get() || 0;
            // Opposite direction parallax
            const parX = mx * -1;
            const parY = my * -1;

            stars.forEach(star => {
                star.update();
                star.draw(parX, parY);
            });

            animationFrameId = requestAnimationFrame(render);
        };


        // --- Resize Handler ---
        const handleResize = () => {
            if (container) {
                width = container.clientWidth;
                height = container.clientHeight;

                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);

                // Regenerate stars on resize to cover new area
                stars.length = 0;
                for (let i = 0; i < STAR_COUNT; i++) {
                    stars.push(new Star());
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size
        render(); // Start loop

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothX, smoothY]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none bg-navy">
            {/* bg-navy ensures background color if stars fail, but purely transparent usually better if overlaying? 
                 User wants "entire page", layout probably handles bg color. 
                 Let's keep it transparent div so layout bg color shows through, 
                 OR make this THE background. 
                 Layout has 'bg-navy'. So this should just be stars on transparent.
                 Removing 'bg-navy' from here to be safe overlay.
             */}
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
