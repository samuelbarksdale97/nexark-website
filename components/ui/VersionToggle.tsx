"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function VersionToggle() {
  const [version, setVersion] = useState<"v1" | "v2">("v1");
  const [mounted, setMounted] = useState(false);

  // Load saved version from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nexark-version");
    if (saved === "v2") {
      setVersion("v2");
      document.documentElement.classList.add("v2-active");
    }
  }, []);

  const toggleVersion = () => {
    const newVersion = version === "v1" ? "v2" : "v1";
    setVersion(newVersion);
    localStorage.setItem("nexark-version", newVersion);

    if (newVersion === "v2") {
      document.documentElement.classList.add("v2-active");
    } else {
      document.documentElement.classList.remove("v2-active");
    }

    // Force a page reload to ensure all components pick up the new version
    window.location.reload();
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <motion.button
        onClick={toggleVersion}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy-light border border-white/10 hover:border-white/20 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xs font-medium text-slate-200">Version:</span>
        <div className="flex gap-1">
          <span
            className={`text-xs font-bold transition-colors ${
              version === "v1" ? "text-white" : "text-white/30"
            }`}
          >
            v1
          </span>
          <span className="text-xs text-white/30">|</span>
          <span
            className={`text-xs font-bold transition-colors ${
              version === "v2" ? "text-gold-bright" : "text-white/30"
            }`}
            style={{ color: version === "v2" ? "var(--color-gold-bright)" : undefined }}
          >
            v2
          </span>
        </div>
      </motion.button>
    </div>
  );
}
