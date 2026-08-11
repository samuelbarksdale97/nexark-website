import "./re.css";

/**
 * Segment layout for the Reality Engineering publication. re.css is imported HERE, once —
 * importing the same global stylesheet from multiple page entries produced a per-route CSS
 * chunk with the re- rules missing on the [...slug] routes (Turbopack prod chunking).
 */
export default function RealityEngineeringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
