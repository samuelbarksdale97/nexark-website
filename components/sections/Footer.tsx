"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  solutions: [
    { label: "The Nexark Audit", href: "/solutions#audit" },
    { label: "Optimize", href: "/solutions#optimize" },
    { label: "Innovate", href: "/solutions#innovate" },
    { label: "Partner", href: "/solutions#partner" },
  ],
  company: [
    { label: "Methodology", href: "/methodology" },
    { label: "Work", href: "/work" },
  ],
  connect: [
    { label: "Start a Conversation", href: "/start" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nexark", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Image
                src="/logo-white.svg"
                alt="Nexark"
                width={120}
                height={32}
                className="h-7 w-auto mb-5"
              />
              <p className="text-lg text-white/90 mb-3 leading-relaxed font-medium">
                Engineering reality, together.
              </p>
              <p className="text-text-muted text-sm max-w-sm leading-relaxed">
                The technology that takes your business to its next arc.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white text-sm tracking-wide uppercase">
                Solutions
              </h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white text-sm tracking-wide uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white text-sm tracking-wide uppercase">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-text-secondary hover:text-white transition-colors text-sm">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-text-muted text-sm">
                &copy; {new Date().getFullYear()} Nexark. All rights reserved.
              </p>
              <p className="text-text-subtle text-sm italic">
                &ldquo;Success is not an accident. It&apos;s engineered.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
