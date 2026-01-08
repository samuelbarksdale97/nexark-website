"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowColor?: string;
}

export function GlowingCard({
  children,
  className,
  containerClassName,
  glowColor = "rgba(99, 102, 241, 0.35)",
}: GlowingCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-navy-light/50 p-[1px]",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Border gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative rounded-2xl bg-navy-light/80 backdrop-blur-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
