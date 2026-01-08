"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { HeroV2 } from "@/components/sections/HeroV2";

export function VersionWrapper() {
  const [version, setVersion] = useState<"v1" | "v2">("v1");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nexark-version");
    if (saved === "v2") {
      setVersion("v2");
    }
  }, []);

  // Render v1 by default during SSR and until mounted
  if (!mounted) {
    return <Hero />;
  }

  return version === "v2" ? <HeroV2 /> : <Hero />;
}
