"use client";

import React from "react";
import { ArrowRight, Terminal, ShieldAlert, Cpu, Sparkles, Scale, Database } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface HeroProps {
  data: BenchmarkData;
}

export function Hero({ data }: HeroProps) {
  const models = data.models || [];
  const evalSamples = data.project.evaluation_samples || 50;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-background to-background py-16 sm:py-24 lg:py-28">
      {/* Subtle decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE8E1_1px,transparent_1px),linear-gradient(to_bottom,#EAE8E1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Research Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-charcoal-muted shadow-subtle mb-6 sm:mb-8">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-medium text-charcoal tracking-wide">
            Academic Research Benchmark
          </span>
          <span className="text-charcoal-faint">|</span>
          <span className="text-charcoal-muted">B.Tech Capstone 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl font-normal tracking-tight text-charcoal-heading sm:text-5xl md:text-6xl lg:text-7xl">
          Can Small Language Models{" "}
          <span className="italic text-accent font-serif">Understand</span> Indian Law?
        </h1>

        {/* Subtitle / Supporting text */}
        <p className="mx-auto mt-6 max-w-3xl text-base text-charcoal-body sm:text-lg sm:leading-relaxed md:text-xl">
          An empirical investigation benchmarking three sub-2B parameter language models on
          Indian Constitutional jurisprudence and Supreme Court precedents across factual
          accuracy, lexical fidelity, semantic reasoning, and operational efficiency.
        </p>

        {/* 3 Model Metric Footprints */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {models.map((m, idx) => (
            <div
              key={m.id || idx}
              className="group relative rounded-lg border border-border bg-surface p-4 text-left shadow-card transition-all hover:border-accent/40 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
                <span className="font-mono text-[11px] text-accent font-medium">Model 0{idx + 1}</span>
                <span className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[11px] font-semibold text-charcoal">
                  {m.param_count}
                </span>
              </div>
              <h3 className="font-medium text-sm text-charcoal-heading tracking-tight group-hover:text-accent transition-colors">
                {m.name}
              </h3>
              <p className="mt-1 text-xs text-charcoal-muted line-clamp-1">
                {m.domain || (m.is_instruct ? "Instruction-Tuned" : "Base Causal Model")}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#results"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:bg-accent-hover hover:shadow-elevated active:scale-98"
          >
            <span>Explore Results</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#playground"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-charcoal-heading shadow-subtle transition-all hover:bg-surface-subtle hover:border-border-dark active:scale-98"
          >
            <Terminal className="h-4 w-4 text-accent" />
            <span>Try Live Playground</span>
          </a>
        </div>

        {/* Benchmark Metadata Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-6 text-xs text-charcoal-muted">
          <div className="flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-charcoal-faint" />
            <span><strong>{evalSamples}</strong> Held-out Precedent Queries</span>
          </div>
          <span className="text-charcoal-faint">•</span>
          <div className="flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-charcoal-faint" />
            <span>Articles 12, 14, 15, 19 & 21</span>
          </div>
          <span className="text-charcoal-faint">•</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-charcoal-faint" />
            <span>Zero-shot & Instruct Prompting</span>
          </div>
        </div>

        {/* Research Disclaimer */}
        <div className="mt-8 mx-auto max-w-2xl rounded-md border border-border/80 bg-surface-subtle/80 px-4 py-2.5 text-xs text-charcoal-muted flex items-start gap-2.5 text-left">
          <ShieldAlert className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-charcoal">Research Disclaimer:</strong> This study is an
            academic investigation in machine learning for legal NLP. Model outputs may contain errors,
            omissions, or hallucinations and do not constitute legal advice or authoritative statutory interpretation.
          </p>
        </div>
      </div>
    </section>
  );
}
