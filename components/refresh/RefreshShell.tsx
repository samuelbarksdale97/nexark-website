"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  active?: "home" | "solutions" | "methodology" | "work" | "about" | "start";
  children: React.ReactNode;
};

const NAV = [
  { href: "/solutions", label: "Solutions", key: "solutions" },
  { href: "/methodology", label: "Methodology", key: "methodology" },
  { href: "/#work", label: "Work", key: "work" },
  { href: "/#about", label: "About", key: "about" },
];

export function RefreshShell({ active, children }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".nx .reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="nx">
      <header className={scrolled ? "scrolled" : ""}>
        <div className="wrap nav">
          <Link href="/" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/refresh/assets/nexark-mark.png" alt="Nexark" />
            <span className="wordmark">
              <b>NEXARK</b>
              <span>SUCCESS ENGINEERED</span>
            </span>
          </Link>
          <nav className="nav-links">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} className={active === n.key ? "active" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/start" className="btn btn-ghost nav-cta">
            Start Your Journey <span className="arw">→</span>
          </Link>
          <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} onClick={() => setMenuOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link href="/start" onClick={() => setMenuOpen(false)}>
              Start Your Journey →
            </Link>
          </div>
        )}
      </header>

      {children}

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <h3>Engineering reality, together.</h3>
              <p>
                The technology that takes your business to its next arc. Success is not an accident —
                it&apos;s engineered.
              </p>
            </div>
            <div className="foot-col">
              <h4>Solutions</h4>
              <Link href="/solutions">The Nexark Audit</Link>
              <Link href="/solutions">Optimize</Link>
              <Link href="/solutions">Innovate</Link>
              <Link href="/solutions">Partner</Link>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <Link href="/methodology">Methodology</Link>
              <Link href="/#work">Work</Link>
              <Link href="/#about">About</Link>
            </div>
            <div className="foot-col">
              <h4>Connect</h4>
              <Link href="/start">Start Your Journey</Link>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Nexark. Success Engineered.</span>
            <span>Reigniting what&apos;s possible.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
