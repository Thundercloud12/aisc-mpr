"use client";

import React, { useState } from "react";
import { ArrowRight, Terminal, Cpu, Database, Scale, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface HeroProps {
  data: BenchmarkData;
}

export function Hero({ data }: HeroProps) {
  const models = data.models || [];
  const evalSamples = data.project.evaluation_samples || 50;
  const [hoveredModel, setHoveredModel] = useState<string | null>("model_2");

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-ink/20">
      {/* Decorative Technical Grid Markings */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 opacity-25">
        <div className="h-full border-r border-dashed border-ink/30 w-1/4" />
        <div className="h-full border-r border-dashed border-ink/30 w-1/4" />
        <div className="h-full border-r border-dashed border-ink/30 w-1/4" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Annotation Stamp (Illoca Hand-Drawn / Stamped Badge) */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="draft-stamp text-ink">
            <span className="text-safety mr-1.5 font-bold">●</span>
            <span>EMPIRICAL BENCHMARK // CAPSTONE 2026</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <span>[DATASET: NISAAR/CONSTITUTION-3300]</span>
            <span className="text-ink-faint">•</span>
            <span>[N={evalSamples} HELD-OUT CASES]</span>
          </div>
        </div>

        {/* Hero Architectural Headline (Tight tracking, ultra-bold, with hand sketch annotations) */}
        <div className="relative">
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.04em] text-ink leading-[0.98]">
            Can Small Language Models{" "}
            <span className="inline-block relative">
              <span className="relative z-10 text-blueprint underline decoration-safety decoration-wavy decoration-2 underline-offset-8">
                Understand
              </span>
            </span>{" "}
            Indian Law?
          </h1>

          {/* Hand-drawn style note (Illoca "NOT SOFTWARE" sketch annotation style) */}
          <div className="mt-4 sm:mt-0 sm:absolute sm:right-2 sm:bottom-2 inline-flex items-center gap-2 font-mono text-xs text-ink-muted select-none">
            <svg width="28" height="24" viewBox="0 0 32 24" fill="none" className="stroke-ink stroke-[1.5]">
              <path d="M4 18 C12 6, 20 16, 28 8" strokeDasharray="3 2" />
              <path d="M22 6 L28 8 L26 14" />
            </svg>
            <span className="rounded border border-dashed border-ink/40 bg-paper-subtle px-2 py-0.5 text-[11px] font-semibold text-ink transform rotate-[2deg]">
              SUB-2B PARAMETERS
            </span>
          </div>
        </div>

        {/* Subtitle / Architectural Thesis */}
        <p className="mt-6 max-w-3xl font-sans text-base sm:text-lg text-ink-body leading-relaxed font-normal">
          An empirical investigation benchmarking three small language model paradigms on Indian Supreme Court
          precedents, Constitutional rights (Articles 12–21), and statutory legal reasoning across lexical fidelity,
          semantic alignment, and edge deployment efficiency.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#results"
            className="group inline-flex items-center gap-2 rounded-xl border border-ink bg-blueprint px-5 py-3 text-xs sm:text-sm font-mono font-medium text-white shadow-solid transition-all hover:bg-blueprint-hover hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <span>Explore Empirical Results</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#playground"
            className="group inline-flex items-center gap-2 rounded-xl border border-ink bg-paper-card px-5 py-3 text-xs sm:text-sm font-mono font-medium text-ink shadow-solid transition-all hover:bg-paper-subtle hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <Terminal className="h-4 w-4 text-blueprint" />
            <span>Interactive Live Playground</span>
          </a>
        </div>

        {/* Blueprint Framed Architectural Model Canvas (Illoca Showcase Frame Style) */}
        <div className="mt-14 relative rounded-2xl border border-ink bg-paper-card p-5 sm:p-7 shadow-solid technical-frame">
          {/* Canvas Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-safety" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                EVALUATED ARCHITECTURAL COHORT [N=3]
              </span>
            </div>
            <div className="font-mono text-[11px] text-ink-faint">
              FRAMEWORK: PYTORCH + BFLOAT16 + GREEDY NUCLEUS
            </div>
          </div>

          {/* 3 Model Blueprint Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((m, idx) => {
              const isWinner = m.id === "model_2";
              const isSelected = hoveredModel === m.id;

              return (
                <div
                  key={m.id || idx}
                  onMouseEnter={() => setHoveredModel(m.id)}
                  className={`group relative rounded-xl border transition-all cursor-pointer p-4 ${
                    isWinner
                      ? "border-blueprint bg-blueprint-light/40 shadow-solid-blue"
                      : isSelected
                      ? "border-ink bg-paper-subtle shadow-solid-sm"
                      : "border-ink/20 bg-paper-card hover:border-ink hover:bg-paper-subtle/50"
                  }`}
                >
                  {/* Top Identifier */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-ink-muted">
                      CANDIDATE 0{idx + 1}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                        isWinner
                          ? "bg-blueprint text-white"
                          : "border border-ink/30 bg-paper-card text-ink"
                      }`}
                    >
                      {m.param_count}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <h3 className="font-sans text-base font-bold text-ink leading-tight">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-ink-muted line-clamp-1">
                    {m.type || (m.is_instruct ? "Instruction-Tuned" : "Base Causal Model")}
                  </p>

                  {/* Highlight Metric Pill */}
                  <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-muted">Quality Score:</span>
                    <strong className={isWinner ? "text-blueprint font-bold text-sm" : "text-ink"}>
                      {(m.metrics?.quality_score || 0).toFixed(3)}
                    </strong>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink-muted">Throughput:</span>
                    <span className="text-ink">
                      {(m.metrics?.tokens_per_second || 0).toFixed(1)} t/s
                    </span>
                  </div>

                  {isWinner && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded bg-blueprint px-2 py-1 text-[10px] font-mono font-medium text-white">
                      <Award className="h-3 w-3" />
                      <span>RANK #1 OVERALL BENCHMARK WINNER</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Technical Spec Footer */}
          <div className="mt-6 pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-ink-muted">
            <div className="flex items-center gap-2">
              <Scale className="h-3.5 w-3.5 text-blueprint" />
              <span>Articles 12, 14, 15, 19 & 21 Held-Out Test Split</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-safety" />
              <span>Zero-Shot Grounding & Semantic MiniLM Scoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
