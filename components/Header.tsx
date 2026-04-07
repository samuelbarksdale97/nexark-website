"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/methodology", label: "Methodology" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const, when: "afterChildren" as const },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" as const, when: "beforeChildren" as const, staggerChildren: 0.05 },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="z-50 flex items-center gap-3" onClick={closeMobileMenu}>
              <Image
                src="/logo-white.svg"
                alt="Nexark"
                width={120}
                height={32}
                className="h-7 md:h-8 w-auto"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.filter((link) => link.href !== "/").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/start" size="sm">
                Start a Conversation
              </Button>
            </nav>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white z-50 relative"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div variants={mobileMenuVariants} initial="closed" animate="open" exit="closed" className="fixed inset-0 z-40 md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-bg-primary/98 backdrop-blur-xl" onClick={closeMobileMenu} />
            <nav className="relative z-10 flex flex-col items-center justify-center h-full px-6">
              <div className="flex flex-col items-center gap-6 mb-12">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} variants={menuItemVariants} custom={index}>
                    <Link href={link.href} onClick={closeMobileMenu} className="group flex items-center gap-3 text-3xl font-bold text-white hover:text-nexark-purple transition-colors">
                      {link.label}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-nexark-purple" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={menuItemVariants} className="w-24 h-px bg-gradient-to-r from-transparent via-nexark-purple/30 to-transparent mb-12" />
              <motion.div variants={menuItemVariants}>
                <Button href="/start" size="lg" onClick={closeMobileMenu} className="text-lg px-8 py-4">
                  Start a Conversation
                </Button>
              </motion.div>
              <motion.p variants={menuItemVariants} className="absolute bottom-8 text-sm text-text-muted">
                Engineering reality, together.
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
