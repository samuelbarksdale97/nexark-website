"use client";

import { useEffect, useRef } from "react";

export function CTAVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let width = 0;
        let height = 0;

        // Configuration
        const STAR_COUNT = 400; // Dense enough to feel deep, sparse enough for text
        const STAR_BASE_SPEED = 0.05;
        const SHOOTING_STAR_INTERVAL = 300; // Frames between shooting stars

        class Star {
            x: number;
            y: number;
            z: number; // Depth for parallax
            size: number;
            baseAlpha: number;
            alpha: number;
            twinkleOffset: number;
            twinkleSpeed: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.z = Math.random() * 2 + 0.5; // Depth factor (0.5 to 2.5)
                this.size = Math.random() * 1.5;
                this.baseAlpha = Math.random() * 0.7 + 0.3;
                this.alpha = this.baseAlpha;
                this.twinkleOffset = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.02 + Math.random() * 0.03;
            }

            update(w: number, h: number) {
                // Upward movement (Zenith view)
                // Stars closer (higher z) move faster
                this.y -= STAR_BASE_SPEED * this.z;

                // Reset if off screen (wrap around)
                if (this.y < 0) {
                    this.y = h;
                    this.x = Math.random() * w;
                }

                // Twinkle
                this.alpha = this.baseAlpha + Math.sin(Date.now() * 0.001 + this.twinkleOffset) * 0.2;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.alpha)})`;
                ctx.beginPath();
                // Depth affects size
                const depthSize = this.size * (this.z * 0.6);
                ctx.arc(this.x, this.y, depthSize, 0, Math.PI * 2);
                ctx.fill();

                // Star glow for larger stars
                if (depthSize > 1) {
                    ctx.fillStyle = `rgba(165, 180, 252, ${this.alpha * 0.1})`; // Indigo glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, depthSize * 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        const init = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star(width, height));
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Gradient Background (Deep dark nebula feel) inside Canvas for blending
            // We rely on parent container's CSS, but let's add a subtle overlay
            // ctx.fillStyle = "rgba(2, 4, 16, 0.2)"; 
            // ctx.fillRect(0, 0, width, height);

            stars.forEach((star) => {
                star.update(width, height);
                star.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Deep Space Gradients Component CSS Handles the color */}
            <canvas ref={canvasRef} className="w-full h-full opacity-80" />

            {/* Optional: Radial Vignette to focus center */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020410]/20 to-[#020410] pointer-events-none" />
        </div>
    );
}
