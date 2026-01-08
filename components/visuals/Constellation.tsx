"use client";

import { useEffect, useState } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

interface Connection {
  from: number;
  to: number;
}

function generateConstellation() {
  // Generate 100 stars with random positions
  const stars: Star[] = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      radius: Math.random() * 1.5 + 0.5, // 0.5 to 2
      opacity: Math.random() * 0.4 + 0.6, // 0.6 to 1
    });
  }

  // Generate 20 connections between nearby stars
  const connections: Connection[] = [];
  const maxDistance = 25; // Maximum distance to connect stars

  // Build spatial index for efficient nearby star finding
  const usedStars = new Set<number>();

  while (connections.length < 20 && usedStars.size < stars.length) {
    const fromIndex = Math.floor(Math.random() * stars.length);
    const from = stars[fromIndex];

    // Find nearby stars
    const nearby = stars
      .map((star, index) => ({ star, index }))
      .filter(({ star, index }) => {
        if (index === fromIndex) return false;
        const dx = star.x - from.x;
        const dy = star.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < maxDistance;
      })
      .sort((a, b) => {
        const distA = Math.sqrt((a.star.x - from.x) ** 2 + (a.star.y - from.y) ** 2);
        const distB = Math.sqrt((b.star.x - from.x) ** 2 + (b.star.y - from.y) ** 2);
        return distA - distB;
      });

    if (nearby.length > 0) {
      const toIndex = nearby[0].index;
      // Check if connection already exists
      const exists = connections.some(
        (c) => (c.from === fromIndex && c.to === toIndex) || (c.from === toIndex && c.to === fromIndex)
      );
      if (!exists) {
        connections.push({ from: fromIndex, to: toIndex });
        usedStars.add(fromIndex);
        usedStars.add(toIndex);
      }
    }
  }

  return { stars, connections };
}

export function Constellation({ className = "" }: { className?: string }) {
  const [constellation, setConstellation] = useState<{ stars: Star[]; connections: Connection[] } | null>(null);

  useEffect(() => {
    // Generate constellation once on mount
    setConstellation(generateConstellation());
  }, []);

  if (!constellation) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define glow filter for stars */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render connections first (behind stars) */}
      <g opacity="0.4">
        {constellation.connections.map((connection, i) => {
          const from = constellation.stars[connection.from];
          const to = constellation.stars[connection.to];
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-gold-bright)"
              strokeWidth="0.1"
              opacity="0.6"
            />
          );
        })}
      </g>

      {/* Render stars */}
      <g>
        {constellation.stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.radius}
            fill="var(--color-gold-bright)"
            opacity={star.opacity}
            filter="url(#glow)"
          />
        ))}
      </g>
    </svg>
  );
}
