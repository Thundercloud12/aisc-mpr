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
      frequency: "Prevalent in Base Models (Ayn / SmolLM)",
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
    <section id="analysis" className="border-b border-border py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Section 06 // Failure Taxonomy</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Qualitative Error & Disagreement Analysis
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Examining systematic failure modes observed during empirical evaluation. Understanding
            how model architecture, parameter scale, and domain fine-tuning influence error patterns.
          </p>
        </div>

        {/* 4 Failure Taxonomy Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {failureTaxonomy.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-surface p-6 shadow-subtle hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-serif text-base font-semibold text-charcoal-heading">
                  {item.title}
                </h3>
                <span className="font-mono text-[11px] rounded bg-surface-subtle px-2 py-0.5 text-accent font-medium">
                  {item.frequency}
                </span>
              </div>

              <p className="mt-3 text-xs text-charcoal-body leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 rounded-md border border-border/80 bg-background p-3 text-[11px] text-charcoal-muted">
                <strong className="text-charcoal block mb-0.5">Observed Benchmark Pattern:</strong>
                <span className="italic">{item.example}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hallucination Risk Distribution Matrix */}
        <div className="mt-12 rounded-xl border border-border bg-surface p-6 shadow-card">
          <h3 className="font-serif text-lg font-medium text-charcoal-heading mb-2">
            Model Hallucination & Doctrinal Drift Distribution
          </h3>
          <p className="text-xs text-charcoal-muted mb-6">
            Proportion of queries triggering heuristic factuality flags across the 50-sample evaluation pool
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((m) => {
              const dist = m.hallucination_distribution || { low_risk_pct: 0, medium_risk_pct: 0, high_risk_pct: 0 };
              return (
                <div key={m.id} className="rounded-lg border border-border bg-background p-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border text-xs">
                    <span className="font-semibold text-charcoal-heading">{m.name}</span>
                    <span className="font-mono text-charcoal-muted">{m.param_count}</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-emerald-700 font-medium">Low Risk (F_proxy &ge; 0.65)</span>
                        <span className="font-mono font-semibold">{dist.low_risk_pct}%</span>
                      </div>
                      <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${dist.low_risk_pct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-amber-700 font-medium">Medium Risk (0.40 &le; F &lt; 0.65)</span>
                        <span className="font-mono font-semibold">{dist.medium_risk_pct}%</span>
                      </div>
                      <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${dist.medium_risk_pct}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-red-700 font-medium">High Risk (F_proxy &lt; 0.40)</span>
                        <span className="font-mono font-semibold">{dist.high_risk_pct}%</span>
                      </div>
                      <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: `${dist.high_risk_pct}%` }} />
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
