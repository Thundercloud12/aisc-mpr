"use client";

import React from "react";
import { Sparkles, Award, Zap, Scale, CheckCircle2, ArrowRight } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface FindingsProps {
  data: BenchmarkData;
}

export function Findings({ data }: FindingsProps) {
  const findings = data.findings || [];
  const rankings = data.rankings || [];
  const models = data.models || [];

  const topModel = rankings[0] ? models.find((m) => m.id === rankings[0].model_id) : null;
  const fastestModel = models.length > 0
    ? [...models].sort((a, b) => (b.metrics.tokens_per_second || 0) - (a.metrics.tokens_per_second || 0))[0]
    : null;
  const bestEfficiencyModel = models.length > 0
    ? [...models].sort((a, b) => (b.metrics.quality_per_b_param || 0) - (a.metrics.quality_per_b_param || 0))[0]
    : null;

  return (
    <section id="manifesto" className="relative py-20 sm:py-28 bg-blueprint-grid text-white border-b border-ink/40 overflow-hidden">
      {/* Background Decorative Blueprint Registration Marks */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-12 opacity-20">
        <div className="h-full border-r border-dashed border-white/40 w-1/3" />
        <div className="h-full border-r border-dashed border-white/40 w-1/3" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Illoca-Inspired Open Letter Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-blueprint-border block mb-3">
            TO THE LEGAL NLP & JUDICIARY TECH COMMUNITY
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            An Empirical Memorandum
          </h2>
        </div>

        {/* The Paper Letter Card (Illoca Manifesto Card Aesthetic) */}
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-ink bg-paper-card p-7 sm:p-12 text-ink shadow-solid technical-frame">
          <div className="flex items-center justify-between pb-6 border-b border-ink/15 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-safety" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                RESEARCH SYNTHESIS // CAPSTONE 2026
              </span>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              [OCTOBER 2026]
            </span>
          </div>

          <div className="font-sans text-sm sm:text-base text-ink-body space-y-4 leading-relaxed">
            <p className="font-bold text-ink text-base sm:text-lg">
              To those engineering the next generation of legal intelligence:
            </p>
            <p>
              Constitutional adjudication was never designed to be solved through sheer parameter scale.
              It begins in statutory rigor, balancing tests, and the delicate relationship between Articles 14, 19, and 21 that defines the living character of Indian jurisprudence.
            </p>
            <p>
              Yet in contemporary AI research, legal capability is routinely asserted by training massive models on unfiltered web scrapes, inviting hallucinations where precise ratio decidendi is required.
            </p>
            <p>
              We established this empirical benchmark to determine whether <strong className="text-blueprint font-bold">Small Language Models (&lt;2B parameters)</strong> can understand Indian Law without cloud reliance. Our findings are unequivocal:
            </p>

            <ul className="space-y-3 pt-2 font-mono text-xs sm:text-sm text-ink list-none border-l-2 border-blueprint pl-4 my-4">
              <li>
                <strong>1. Instruction alignment beats sheer scale:</strong> The 490M generalist instruct model outperformed the 1.54B domain model across every semantic metric.
              </li>
              <li>
                <strong>2. Narrow statutory tuning incurs doctrine drift:</strong> Training strictly on criminal reform (BNS) caused catastrophic forgetting on constitutional fundamental rights.
              </li>
              <li>
                <strong>3. Edge viability is proven:</strong> At 27 tokens/second on compact hardware, edge legal assistants can run privately with zero cloud exposure.
              </li>
            </ul>

            <p className="pt-2 font-bold text-ink">
              This benchmark is dedicated to open, grounded, and responsible judicial AI.
            </p>
          </div>
        </div>

        {/* Dynamic Key Metric Summary Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-xl border border-white/20 bg-navy-card/80 p-5 shadow-solid-sm backdrop-blur-sm">
            <span className="font-mono text-[10px] text-blueprint-border uppercase tracking-wider block mb-1">
              Top Ranked Model
            </span>
            <div className="font-sans text-lg font-bold text-white">
              {topModel?.name || "Qwen2.5-0.5B-Instruct"}
            </div>
            <div className="mt-2 text-xs font-mono text-blueprint-border">
              Overall: <strong className="text-white">{rankings[0]?.overall_score?.toFixed(3)}</strong> | Quality: {topModel?.metrics.quality_score?.toFixed(3)}
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-navy-card/80 p-5 shadow-solid-sm backdrop-blur-sm">
            <span className="font-mono text-[10px] text-safety uppercase tracking-wider block mb-1">
              Maximum Throughput
            </span>
            <div className="font-sans text-lg font-bold text-white">
              {fastestModel?.name || "Qwen2.5-0.5B-Instruct"}
            </div>
            <div className="mt-2 text-xs font-mono text-blueprint-border">
              Speed: <strong className="text-white">{fastestModel?.metrics.tokens_per_second?.toFixed(1)}</strong> tokens/sec
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-navy-card/80 p-5 shadow-solid-sm backdrop-blur-sm">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">
              Quality per B-Param
            </span>
            <div className="font-sans text-lg font-bold text-white">
              {bestEfficiencyModel?.name || "SmolLM2-135M"}
            </div>
            <div className="mt-2 text-xs font-mono text-blueprint-border">
              Efficiency: <strong className="text-white">{bestEfficiencyModel?.metrics.quality_per_b_param?.toFixed(2)}</strong> pts/B-param
            </div>
          </div>
        </div>

        {/* Detailed Findings Cards */}
        <div className="mt-12 space-y-4">
          {findings.map((finding, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/15 bg-navy-card/60 p-6 backdrop-blur-md transition-colors hover:border-blueprint"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm font-bold text-safety shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {finding.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs text-white/80 leading-relaxed">
                    {finding.detail}
                  </p>
                  <div className="mt-3 inline-block rounded bg-black/40 px-3 py-1 font-mono text-[11px] text-blueprint-border border border-white/10">
                    <strong>Empirical Evidence:</strong> {finding.metric_support}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
