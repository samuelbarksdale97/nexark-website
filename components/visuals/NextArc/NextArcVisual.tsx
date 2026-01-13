"use client";

import { useEffect, useRef } from "react";
import { MotionValue, useSpring } from "framer-motion";

interface NextArcVisualProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function NextArcVisual({ mouseX, mouseY }: NextArcVisualProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth mouse coordinates for parallax
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

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
        const STAR_COUNT = 300;
        const SHOOTING_STAR_SPEED = 2.5; // Controls how fast it moves
        const METEOR_TRAIL_LENGTH = 15; // Number of tail particles per frame

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

                // Parallax offset (deeper stars move less)
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

        class Particle {
            x: number;
            y: number;
            size: number;
            life: number;
            decay: number;
            vx: number;
            vy: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 0.5;
                this.life = 1.0;
                this.decay = Math.random() * 0.03 + 0.01; // Fade speed
                this.vx = (Math.random() - 0.5) * 0.5; // Slight drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.size *= 0.95; // Shrink
            }

            draw(parX: number, parY: number) {
                if (!ctx || this.life <= 0) return;
                ctx.save();
                ctx.globalCompositeOperation = 'lighter'; // Additive blending
                ctx.beginPath();
                ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class ShootingStar {
            x: number;
            y: number;
            startX: number;
            startY: number;
            vx: number;
            vy: number;
            active: boolean;
            particles: Particle[];
            resetTimer: number;

            constructor() {
                this.active = false;
                this.particles = [];
                this.resetTimer = 0;
                this.x = 0;
                this.y = 0;
                this.startX = 0;
                this.startY = 0;
                this.vx = 0;
                this.vy = 0;
                this.reset();
            }

            reset() {
                this.active = false;
                this.particles = [];
                // Start from left, somewhere in the middle-ish vertically
                this.startX = -100;
                this.startY = Math.random() * (height * 0.6) + (height * 0.2);

                this.x = this.startX;
                this.y = this.startY;

                // Velocity: Move right and slightly up/down curve
                // For a curve, we'll update V in update()
                this.vx = SHOOTING_STAR_SPEED * (Math.random() * 2 + 3);
                this.vy = (Math.random() - 0.5) * 1;

                // Random delay before starting
                this.resetTimer = Math.random() * 200 + 100;
            }

            update() {
                if (!this.active) {
                    this.resetTimer--;
                    if (this.resetTimer <= 0) {
                        this.active = true;
                    }
                    return;
                }

                // Add trail particles
                for (let i = 0; i < METEOR_TRAIL_LENGTH; i++) {
                    // Interpolate between current and last position if moving fast?
                    // For now, simple spread around the head
                    const color = Math.random() > 0.8 ? '255, 255, 255' : '200, 220, 255'; // Blue-ish white tint
                    this.particles.push(new Particle(this.x + (Math.random() - 0.5) * 2, this.y + (Math.random() - 0.5) * 2, color));
                }

                // Move Head
                this.x += this.vx;
                this.y += this.vy;

                // Gentle arc gravity/lift
                this.vy -= 0.005; // Gentle curve up

                // Update particles
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    p.update();
                    if (p.life <= 0) {
                        this.particles.splice(i, 1);
                    }
                }

                // Reset if off screen (far right)
                if (this.x > width + 200 || this.y < -100 || this.y > height + 100) {
                    this.reset();
                }
            }

            draw(parX: number, parY: number) {
                if (!ctx) return;

                // Draw particles (Tail)
                this.particles.forEach(p => p.draw(parX, parY));

                if (this.active) {
                    // Draw Head (Bright glowing core)
                    ctx.save();
                    ctx.globalCompositeOperation = 'lighter';

                    // Core
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 4);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                    gradient.addColorStop(0.4, 'rgba(200, 220, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
                    ctx.fill();

                    // Flare lines (Cross)
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.x - 15, this.y);
                    ctx.lineTo(this.x + 15, this.y);
                    ctx.moveTo(this.x, this.y - 15);
                    ctx.lineTo(this.x, this.y + 15);
                    ctx.stroke();

                    ctx.restore();
                }
            }
        }


        // --- Initialization ---
        const stars: Star[] = [];
        // Stars are populated in handleResize to ensure we have correct width/height

        const shootingStar = new ShootingStar();


        // --- Animation Loop ---
        const render = () => {
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Get current smooth mouse position for parallax
            const mx = smoothX.get() || 0;
            const my = smoothY.get() || 0;
            const parX = mx * -0.05; // dampen for subtle effect
            const parY = my * -0.05;

            // Draw Background Stars
            stars.forEach(star => {
                star.update();
                star.draw(parX, parY);
            });

            // Draw Shooting Star
            shootingStar.update();
            shootingStar.draw(parX, parY);

            animationFrameId = requestAnimationFrame(render);
        };


        // --- Resize Handler ---
        const handleResize = () => {
            if (container) {
                width = container.clientWidth;
                height = container.clientHeight;

                // Handle high DPI displays
                const dpr = window.devicePixelRatio || 1;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);

                // Re-init stars to cover new area if needed, or just let them be
                // Ideally, spread them out again, but for now randomly placed ones are fine
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size
        render(); // Start loop

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothX, smoothY]); // dependencies

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
