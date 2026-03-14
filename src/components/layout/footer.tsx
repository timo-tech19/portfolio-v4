"use client";

import { ArrowUp } from "lucide-react";
import { PERSONAL, SOCIALS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-mono text-sm text-accent font-medium">
            {PERSONAL.brand}
          </span>
          <span className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {PERSONAL.name}
          </span>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
                aria-label={social.label}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
