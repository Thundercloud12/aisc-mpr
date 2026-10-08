"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to 0-100 or screen percentages
      const normX = ((e.clientX / window.innerWidth) * 10).toFixed(2);
      const normY = ((e.clientY / window.innerHeight) * 10).toFixed(2);
      setCoords({ x: parseFloat(normX), y: parseFloat(normY) });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPct(Math.round((window.scrollY / totalScroll) * 100));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Models", href: "#models" },
    { name: "Results", href: "#results" },
    { name: "Playground", href: "#playground" },
    { name: "Cases", href: "#examples" },
    { name: "Analysis", href: "#analysis" },
    { name: "Roadmap", href: "#manifesto" },
  ];

  return (
    <>
      {/* Viewport Margin Edge Indicators (Illoca Architectural Coordinate Style) */}
      <div className="pointer-events-none fixed top-3 left-4 sm:left-6 z-40 hidden sm:flex items-center gap-2 font-mono text-[11px] text-ink-muted/80 leading-none select-none">
        <div className="flex flex-col">
          <span>X 0.{coords.x < 10 ? `0${Math.floor(coords.x * 10)}` : Math.floor(coords.x * 10)}</span>
          <span>Y 0.{coords.y < 10 ? `0${Math.floor(coords.y * 10)}` : Math.floor(coords.y * 10)}</span>
        </div>
        <span className="text-ink-muted/30">|</span>
        <span className="text-[10px] tracking-wider text-ink-faint">SCR {scrollPct}%</span>
      </div>

      <div className="pointer-events-none fixed top-3 right-4 sm:right-6 z-40 hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-widest text-ink-muted/80 uppercase select-none">
        <span>JURIS.SLM // B.TECH 2026</span>
        <div className="h-1.5 w-1.5 rounded-full bg-safety animate-ping" />
      </div>

      {/* Floating Capsule Navbar Header */}
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-ink bg-paper-card/95 backdrop-blur-md px-3 sm:px-4 py-2 shadow-solid transition-all">
          <div className="flex items-center justify-between">
            {/* Geometric Brand Icon + Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-ink bg-paper-subtle text-blueprint transition-transform group-hover:scale-105 group-hover:bg-blueprint group-hover:text-white">
                {/* Illoca-inspired geometric glyph */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current stroke-2">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <circle cx="17" cy="7" r="4" />
                  <path d="M3 17L11 17L7 21Z" />
                  <rect x="13" y="13" width="8" height="8" rx="4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm font-bold tracking-tight text-ink">
                  JurisSLM
                </span>
                <span className="text-[9px] font-mono tracking-wider uppercase text-ink-faint leading-none">
                  Legal AI Engine
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:text-blueprint hover:underline decoration-blueprint decoration-1 underline-offset-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Button (Illoca Cobalt Blueprint Style with Safety Badge) */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="#playground"
                className="group inline-flex items-center gap-2 rounded-lg border border-ink bg-blueprint px-3.5 py-1.5 text-xs font-mono font-medium text-white shadow-solid-sm transition-all hover:bg-blueprint-hover hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-safety text-[9px] text-white font-bold leading-none">
                  ▲
                </div>
                <span>Try Playground</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 text-ink hover:text-blueprint"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mx-auto mt-2 max-w-4xl rounded-xl border border-ink bg-paper-card p-4 shadow-solid md:hidden">
            <nav className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-ink-body hover:text-blueprint py-1 border-b border-border"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-ink bg-blueprint py-2 font-mono text-xs text-white"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Launch Live Playground</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
