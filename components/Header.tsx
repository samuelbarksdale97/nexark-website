"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/roi-calculator", label: "ROI Calculator" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
      when: "afterChildren" as const,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.05,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "glass border-b border-white/5"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl md:text-2xl font-bold text-white tracking-[0.1em] hover:text-white/80 transition-colors z-50"
              onClick={closeMobileMenu}
            >
              NEXARK
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.filter(link => link.href !== "/").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="https://cal.com/sam-barksdale/discovery" size="sm">
                Book Strategy Session
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white z-50 relative"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-navy/98 backdrop-blur-xl"
              onClick={closeMobileMenu}
            />

            {/* Menu Content */}
            <nav className="relative z-10 flex flex-col items-center justify-center h-full px-6">
              {/* Navigation Links */}
              <div className="flex flex-col items-center gap-6 mb-12">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center gap-3 text-3xl font-display font-medium text-white hover:text-indigo transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                variants={menuItemVariants}
                className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
              />

              {/* CTA Button */}
              <motion.div variants={menuItemVariants}>
                <Button
                  href="https://cal.com/sam-barksdale/discovery"
                  size="lg"
                  onClick={closeMobileMenu}
                  className="text-lg px-8 py-4"
                >
                  Book Strategy Session
                </Button>
              </motion.div>

              {/* Bottom text */}
              <motion.p
                variants={menuItemVariants}
                className="absolute bottom-8 text-sm text-slate/60"
              >
                Engineering Reality, Together.
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
