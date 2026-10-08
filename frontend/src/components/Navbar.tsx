"use client";

import React, { useState } from "react";
import { Scale, Terminal, Menu, X, ExternalLink, BookOpen, BarChart3 } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Models", href: "#models" },
    { name: "Results", href: "#results" },
    { name: "Playground", href: "#playground" },
    { name: "Cases", href: "#examples" },
    { name: "Analysis", href: "#analysis" },
    { name: "Methodology", href: "#methodology" },
    { name: "Findings", href: "#findings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-accent/20 bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Scale className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-semibold tracking-tight text-charcoal-heading">
              JurisSLM
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-charcoal-muted">
              Indian Legal AI Study
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-charcoal-muted transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://huggingface.co/datasets/nisaar/Articles_Constitution_3300_Instruction_Set"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal transition-colors px-2 py-1 rounded"
          >
            <BookOpen className="h-3.5 w-3.5 text-charcoal-faint" />
            <span>Dataset</span>
            <ExternalLink className="h-3 w-3 text-charcoal-faint" />
          </a>
          <a
            href="#playground"
            className="inline-flex items-center gap-1.5 rounded border border-accent bg-accent px-3 py-1.5 text-xs font-medium text-white shadow-subtle transition-all hover:bg-accent-hover active:scale-95"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Live Playground</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-charcoal-muted hover:text-charcoal"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-charcoal" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 sm:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-charcoal-body hover:text-accent py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <a
                href="#playground"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded bg-accent py-2 text-xs font-medium text-white"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Ask All Models</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
