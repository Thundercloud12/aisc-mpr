"use client";

import React, { useState } from "react";
import { BookOpen, CheckCircle, Scale, Tag, Sparkles, AlertTriangle, ArrowRight } from "lucide-react";
import { BenchmarkData, ExampleCase } from "@/types/benchmark";

interface ExampleComparisonProps {
  data: BenchmarkData;
}

export function ExampleComparison({ data }: ExampleComparisonProps) {
  const examples = data.examples || [];
  const models = data.models || [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (examples.length === 0) {
    return null;
  }

  const currentCase: ExampleCase = examples[selectedIndex] || examples[0];

  return (
    <section id="examples" className="border-b border-border py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Section 05 // Case Study Explorer</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Qualitative Example Comparisons
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Inspect side-by-side model reasoning on representative benchmark cases from the held-out
            evaluation set. Each example is curated from empirical F1 divergence and semantic agreement.
          </p>
        </div>

        {/* Case Category Selector Buttons */}
        <div className="mt-8 flex flex-wrap gap-2 pb-2">
          {examples.map((ex, idx) => (
            <button
              key={ex.category}
              onClick={() => setSelectedIndex(idx)}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                selectedIndex === idx
                  ? "bg-accent text-white shadow-subtle"
                  : "bg-surface-subtle text-charcoal-body hover:bg-surface-muted hover:text-charcoal border border-border/70"
              }`}
            >
              <span>{ex.category}</span>
              <span className="ml-1.5 font-mono text-[10px] opacity-75">#{ex.sample_id}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Inspection Card */}
        <div className="mt-8 rounded-xl border border-border bg-background p-6 sm:p-8 shadow-card">
          {/* Case Metadata Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                Category: {currentCase.category}
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium text-charcoal-heading">
                Sample Query #{currentCase.sample_id}
              </h3>
            </div>
            <div className="rounded-full bg-surface-subtle border border-border px-3 py-1 text-xs text-charcoal-muted font-mono">
              Ground-Truth Held-Out Test Case
            </div>
          </div>

          {/* Context & Question Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border/80 bg-surface p-4">
              <span className="text-[11px] font-mono font-semibold uppercase text-charcoal-muted tracking-wide block mb-1">
                Case Citation & Statutory Context
              </span>
              <p className="text-xs text-charcoal-body leading-relaxed font-sans">
                {currentCase.context}
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-surface p-4">
              <span className="text-[11px] font-mono font-semibold uppercase text-accent tracking-wide block mb-1">
                Legal Question Evaluated
              </span>
              <p className="text-xs font-medium text-charcoal-heading leading-relaxed font-sans">
                {currentCase.question}
              </p>
            </div>
          </div>

          {/* Ground Truth Reference Holding */}
          <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-1">
              <CheckCircle className="h-4 w-4 text-emerald-700" />
              <span>Ground Truth Judicial Holding (Authoritative Reference)</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed font-sans pl-5.5">
              {currentCase.reference_answer}
            </p>
          </div>

          {/* Side-by-Side Model Outputs */}
          <div className="mt-8">
            <h4 className="font-serif text-base font-semibold text-charcoal-heading mb-4">
              Model Responses & Evaluation Scores
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {models.map((m) => {
                const answer = currentCase.responses?.[m.id] || "No response recorded.";
                const scores = currentCase.scores?.[m.id] || {
                  f1: 0,
                  rougeL: 0,
                  semantic_similarity: 0,
                  factuality_proxy: 0,
                  hallucination_risk: "N/A"
                };

                const isLowRisk = scores.hallucination_risk === "Low risk";
                const isHighRisk = scores.hallucination_risk === "High risk";

                return (
                  <div
                    key={m.id}
                    className="rounded-lg border border-border bg-surface p-4 flex flex-col justify-between shadow-subtle"
                  >
                    <div>
                      {/* Model Title */}
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="font-serif text-sm font-semibold text-charcoal-heading">
                          {m.name}
                        </span>
                        <span className="font-mono text-[10px] text-charcoal-muted">
                          {m.param_count}
                        </span>
                      </div>

                      {/* Generated Text */}
                      <p className="mt-3 text-xs text-charcoal-body leading-relaxed font-sans min-h-[140px] whitespace-pre-wrap">
                        {answer}
                      </p>
                    </div>

                    {/* Metric Badges Footprint */}
                    <div className="mt-4 pt-3 border-t border-border space-y-2 text-[11px]">
                      <div className="grid grid-cols-3 gap-1 text-center font-mono text-charcoal-muted">
                        <div className="bg-surface-subtle p-1 rounded">
                          <span className="block text-[9px] uppercase">F1</span>
                          <span className="font-semibold text-charcoal">{scores.f1.toFixed(2)}</span>
                        </div>
                        <div className="bg-surface-subtle p-1 rounded">
                          <span className="block text-[9px] uppercase">ROUGE-L</span>
                          <span className="font-semibold text-charcoal">{scores.rougeL.toFixed(2)}</span>
                        </div>
                        <div className="bg-surface-subtle p-1 rounded">
                          <span className="block text-[9px] uppercase">SemSim</span>
                          <span className="font-semibold text-charcoal">{scores.semantic_similarity.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-charcoal-muted">Risk Category:</span>
                        <span
                          className={`font-semibold px-2 py-0.5 rounded ${
                            isLowRisk
                              ? "bg-emerald-100 text-emerald-800"
                              : isHighRisk
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {scores.hallucination_risk}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
