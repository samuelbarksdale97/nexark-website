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
        const SHOOTING_STAR_SPEED = 2.5;
        const METEOR_TRAIL_LENGTH = 15;

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
                this.opacity += Math.sin(Date.now() * this.blinkSpeed) * 0.01;
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
                this.decay = Math.random() * 0.015 + 0.005; // Slower decay for smoother trail
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.size *= 0.96;
            }

            draw(parX: number, parY: number) {
                if (!ctx || this.life <= 0) return;
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
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
                this.vx = 0;
                this.vy = 0;
                this.reset();
            }

            reset() {
                this.active = false;
                this.particles = [];

                // Start from bottom-left area
                this.x = -100;
                this.y = height * 0.8 + Math.random() * 100;

                // Velocity: Move right and slightly UP initially
                this.vx = SHOOTING_STAR_SPEED * (Math.random() * 1.5 + 2.5);
                this.vy = -(Math.random() * 1.5 + 1.0);

                // Random delay before starting
                this.resetTimer = Math.random() * 150 + 50;
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
                for (let i = 0; i < METEOR_TRAIL_LENGTH * 1.5; i++) {
                    const rand = Math.random();
                    let color = '255, 255, 255';
                    if (rand > 0.8) color = '200, 220, 255'; // Cyan tint
                    else if (rand > 0.9) color = '220, 200, 255'; // Purple tint

                    const lagX = this.vx * Math.random() * -2;
                    const lagY = this.vy * Math.random() * -2;

                    this.particles.push(new Particle(
                        this.x + lagX + (Math.random() - 0.5) * 3,
                        this.y + lagY + (Math.random() - 0.5) * 3,
                        color
                    ));
                }

                // Move Head
                this.x += this.vx;
                this.y += this.vy;

                // Gravity / Arc
                this.vy += 0.008; // Curve downwards/across

                // Update particles
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    p.update();
                    if (p.life <= 0) {
                        this.particles.splice(i, 1);
                    }
                }

                // Reset if off screen
                if (this.x > width + 300 || this.y > height + 200) {
                    this.reset();
                }
            }

            draw(parX: number, parY: number) {
                if (!ctx) return;

                // Draw particles
                this.particles.forEach(p => p.draw(parX, parY));

                // Draw Head (Flare Asset)
                if (this.active && flareImg.complete && flareImg.naturalWidth > 0) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'lighter';

                    const size = 150;
                    // Draw flared image centered on star
                    ctx.drawImage(flareImg, this.x - size / 2, this.y - size / 2, size, size);

                    // Bright core
                    ctx.beginPath();
                    ctx.fillStyle = 'white';
                    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            }
        }


        // --- Initialization ---
        const stars: Star[] = [];
        // Stars are populated in handleResize

        const shootingStar = new ShootingStar();


        // --- Animation Loop ---
        const render = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            const mx = smoothX.get() || 0;
            const my = smoothY.get() || 0;
            const parX = mx * -0.05;
            const parY = my * -0.05;

            stars.forEach(star => {
                star.update();
                star.draw(parX, parY);
            });

            shootingStar.update();
            shootingStar.draw(parX, parY);

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

                if (stars.length === 0) {
                    for (let i = 0; i < STAR_COUNT; i++) {
                        stars.push(new Star());
                    }
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
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
