"use client";

import Link from "next/link";

const footerLinks = {
  offerings: [
    { label: "Custom Software", href: "/#offerings" },
    { label: "Reality Engineering", href: "/#reality-engineering" },
  ],
  company: [
    { href: "/#story", label: "Our Story" },
  ],
  connect: [
    { label: "Apply", href: "/#apply" },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-navy border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-2xl font-bold tracking-wider mb-4">
                NEXARK
              </h3>
              <p className="font-display text-lg text-white/90 mb-3 leading-relaxed">
                Engineering Reality, Together.
              </p>
              <p className="text-slate text-sm max-w-sm leading-relaxed">
                The technology that takes your business to its next arc.
              </p>
            </div>

            {/* Offerings */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-white">
                Offerings
              </h4>
              <ul className="space-y-3">
                {footerLinks.offerings.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-white">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-white">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate text-sm">
                &copy; {new Date().getFullYear()} Nexark. All rights reserved.
              </p>
              <p className="text-slate/60 text-sm font-display italic">
                &ldquo;Success is not an accident—it&apos;s engineered.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
