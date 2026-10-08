"use client";

import React from "react";
import { AlertTriangle, AlertOctagon, HelpCircle, FileX, Shuffle, FileWarning, CheckCircle2 } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface ErrorAnalysisProps {
  data: BenchmarkData;
}

export function ErrorAnalysis({ data }: ErrorAnalysisProps) {
  const models = data.models || [];

  const failureTaxonomy = [
    {
      title: "1. Contextual Omission",
      frequency: "Frequent in 135M & 1.5B",
      desc: "The model identifies the high-level legal doctrine but omits crucial constitutional articles, statutory exceptions, or procedural tests.",
      example: "Affirming that arbitrary termination violates constitutional standards without naming Article 14 or the 'public policy' test of Section 23 Contract Act."
    },
    {
      title: "2. Doctrinal Drift & Hallucination",
      frequency: "Higher in 1.5B (Out-of-Distribution)",
      desc: "Conflating distinct landmark judicial holdings or attributing doctrines to erroneous precedents (e.g. confusing Kesavananda with Golaknath).",
      example: "Asserting that Article 21 guarantees an absolute right to property without recognizing the 44th Constitutional Amendment repeal."
    },
    {
      title: "3. Run-on & Repetition",
      frequency: "Prevalent in Base Models (SmolLM)",
      desc: "Base foundation models lack instruction completion termination tokens, looping through hypothetical statutory clauses or echoing prompt headers.",
      example: "Re-generating 'Indian Legal Case Precedents & Supreme Court Jurisprudence:' repeatedly after completing the substantive answer."
    },
    {
      title: "4. Statutory Misalignment",
      frequency: "Observed in Criminal vs Constitutional tasks",
      desc: "A model fine-tuned on criminal reform (BNS 2023) inappropriately applying penal phraseology to civil or constitutional writ jurisprudence.",
      example: "Injecting criminal procedural terminology into Article 12 'other authorities' sovereign immunity queries."
    }
  ];

  return (
    <section id="analysis" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-safety mr-1.5 font-bold">●</span>
            <span>SECTION 06 // ERROR DIAGNOSTIC TAXONOMY</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Qualitative Failure Modes & Disagreements
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Detailed failure taxonomy classifying systematic breakdown patterns observed across
            unaligned base foundations, generalist SLMs, and narrow domain specialists.
          </p>
        </div>

        {/* 4 Failure Taxonomy Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {failureTaxonomy.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-ink bg-paper-card p-6 shadow-solid transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ink/15">
                <h3 className="font-sans text-base font-bold text-ink">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] rounded border border-ink/20 bg-paper-subtle px-2 py-0.5 text-blueprint font-bold">
                  {item.frequency}
                </span>
              </div>

              <p className="mt-3 font-sans text-xs text-ink-body leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 rounded-lg border border-ink/15 bg-paper-subtle/70 p-3 font-mono text-[11px] text-ink-muted">
                <strong className="text-ink block mb-0.5 uppercase tracking-wider text-[10px]">
                  Observed Benchmark Failure:
                </strong>
                <span className="italic">{item.example}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hallucination Risk Distribution Matrix */}
        <div className="mt-12 rounded-2xl border border-ink bg-paper-card p-6 sm:p-8 shadow-solid technical-frame">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="font-sans text-xl font-bold text-ink">
              Model Hallucination & Doctrinal Drift Matrix
            </h3>
            <span className="font-mono text-xs text-ink-muted">
              [AUTOMATED ENTITY + SEMANTIC HEURISTIC]
            </span>
          </div>
          <p className="font-mono text-xs text-ink-muted mb-6">
            Percentage of answers categorized into Low (&ge;0.65), Medium (0.40–0.65), and High (&lt;0.40) risk across n=50 queries
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {models.map((m) => {
              const dist = m.hallucination_distribution || { low_risk_pct: 0, medium_risk_pct: 0, high_risk_pct: 0 };
              const isWinner = m.id === "model_2";

              return (
                <div
                  key={m.id}
                  className={`rounded-xl border border-ink bg-paper-subtle/50 p-4 transition-all ${
                    isWinner ? "ring-2 ring-blueprint bg-blueprint-light/20" : ""
                  }`}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-ink/15 text-xs font-mono">
                    <span className="font-bold text-ink">{m.name}</span>
                    <span className="text-ink-muted">{m.param_count}</span>
                  </div>

                  <div className="mt-4 space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-blueprint font-bold">Low Risk (&ge; 0.65)</span>
                        <strong className="text-ink">{dist.low_risk_pct}%</strong>
                      </div>
                      <div className="w-full bg-paper-muted h-2 rounded-full overflow-hidden border border-ink/20">
                        <div className="bg-blueprint h-full" style={{ width: `${dist.low_risk_pct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-amber-800 font-bold">Medium Risk (0.40–0.65)</span>
                        <strong className="text-ink">{dist.medium_risk_pct}%</strong>
                      </div>
                      <div className="w-full bg-paper-muted h-2 rounded-full overflow-hidden border border-ink/20">
                        <div className="bg-amber-600 h-full" style={{ width: `${dist.medium_risk_pct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-safety font-bold">High Risk (&lt; 0.40)</span>
                        <strong className="text-ink">{dist.high_risk_pct}%</strong>
                      </div>
                      <div className="w-full bg-paper-muted h-2 rounded-full overflow-hidden border border-ink/20">
                        <div className="bg-safety h-full" style={{ width: `${dist.high_risk_pct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
