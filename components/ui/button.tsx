"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  showArrow?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  showArrow = false,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "font-medium tracking-wide",
    "rounded-full transition-all duration-300 cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
  );

  const variants = {
    primary: cn(
      "bg-white text-navy",
      "hover:bg-white/90",
      "shadow-sm hover:shadow-md"
    ),
    secondary: cn(
      "bg-transparent text-white",
      "border border-white/20",
      "hover:border-white/40 hover:bg-white/5"
    ),
    ghost: cn(
      "bg-transparent text-white/70",
      "hover:text-white"
    ),
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      {showArrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </Component>
  );
}
