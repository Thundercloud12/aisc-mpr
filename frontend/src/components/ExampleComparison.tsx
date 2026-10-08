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
    <section id="examples" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 05 // CASE STUDY COMPARISON</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Qualitative Precedent Breakdown
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Examine side-by-side reasoning across representative constitutional cases from the held-out
            split. Directly inspect model alignment against Supreme Court reference holdings.
          </p>
        </div>

        {/* Case Category Selector Buttons (Illoca Drafting Pill Buttons) */}
        <div className="mt-8 flex flex-wrap gap-2.5 pb-2">
          {examples.map((ex, idx) => (
            <button
              key={ex.category}
              onClick={() => setSelectedIndex(idx)}
              className={`rounded-lg px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                selectedIndex === idx
                  ? "border border-ink bg-blueprint text-white shadow-solid-sm"
                  : "border border-ink/30 bg-paper-card text-ink hover:bg-paper-subtle hover:border-ink"
              }`}
            >
              <span>{ex.category}</span>
              <span className="ml-1.5 opacity-70">#{ex.sample_id}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Inspection Card */}
        <div className="mt-8 rounded-2xl border border-ink bg-paper-card p-6 sm:p-8 shadow-solid technical-frame">
          {/* Case Metadata Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ink/15">
            <div>
              <span className="font-mono text-xs font-bold text-blueprint uppercase tracking-wider">
                CATEGORY // {currentCase.category}
              </span>
              <h3 className="mt-1 font-sans text-2xl font-bold text-ink">
                Judicial Precedent #{currentCase.sample_id}
              </h3>
            </div>
            <div className="rounded-lg border border-ink/30 bg-paper-subtle px-3 py-1 font-mono text-xs text-ink font-semibold">
              HELD-OUT REFERENCE RECORD
            </div>
          </div>

          {/* Context & Question Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-ink/20 bg-paper-subtle/50 p-4">
              <span className="font-mono text-[11px] font-bold uppercase text-ink-muted tracking-wider block mb-1.5">
                Case Citation & Context:
              </span>
              <p className="font-sans text-xs text-ink leading-relaxed">
                {currentCase.context}
              </p>
            </div>

            <div className="rounded-xl border border-ink/20 bg-paper-subtle/50 p-4">
              <span className="font-mono text-[11px] font-bold uppercase text-blueprint tracking-wider block mb-1.5">
                Evaluated Legal Question:
              </span>
              <p className="font-sans text-xs font-bold text-ink leading-relaxed">
                {currentCase.question}
              </p>
            </div>
          </div>

          {/* Ground Truth Reference Holding */}
          <div className="mt-5 rounded-xl border border-ink bg-blueprint-light/40 p-4">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-blueprint mb-1.5">
              <CheckCircle className="h-4 w-4 text-blueprint" />
              <span>Supreme Court Ground Truth Ratio Decidendi (Authoritative Holding):</span>
            </div>
            <p className="font-sans text-xs text-ink leading-relaxed pl-5.5">
              {currentCase.reference_answer}
            </p>
          </div>

          {/* Side-by-Side Model Outputs */}
          <div className="mt-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted mb-4">
              Candidate Model Responses & Automated Metric Attribution:
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
                const isWinner = m.id === "model_2";

                return (
                  <div
                    key={m.id}
                    className={`rounded-xl border border-ink bg-paper-card p-5 flex flex-col justify-between transition-all ${
                      isWinner ? "ring-2 ring-blueprint shadow-solid-blue" : "shadow-solid-sm"
                    }`}
                  >
                    <div>
                      {/* Model Title */}
                      <div className="flex items-center justify-between pb-2 border-b border-ink/15">
                        <span className="font-sans text-sm font-bold text-ink">
                          {m.name}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {m.param_count}
                        </span>
                      </div>

                      {/* Generated Text */}
                      <p className="mt-3 font-sans text-xs text-ink-body leading-relaxed min-h-[140px] whitespace-pre-wrap">
                        {answer}
                      </p>
                    </div>

                    {/* Metric Badges Footprint */}
                    <div className="mt-4 pt-3 border-t border-ink/10 space-y-2 font-mono text-xs">
                      <div className="grid grid-cols-3 gap-1 text-center text-ink-muted">
                        <div className="bg-paper-subtle p-1 rounded border border-ink/10">
                          <span className="block text-[9px] uppercase">F1</span>
                          <strong className="text-ink">{scores.f1.toFixed(2)}</strong>
                        </div>
                        <div className="bg-paper-subtle p-1 rounded border border-ink/10">
                          <span className="block text-[9px] uppercase">ROUGE-L</span>
                          <strong className="text-ink">{scores.rougeL.toFixed(2)}</strong>
                        </div>
                        <div className="bg-paper-subtle p-1 rounded border border-ink/10">
                          <span className="block text-[9px] uppercase">SemSim</span>
                          <strong className="text-ink">{scores.semantic_similarity.toFixed(2)}</strong>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-1">
                        <span className="text-ink-muted">Hallucination Risk:</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded border ${
                            isLowRisk
                              ? "border-blueprint bg-blueprint-light text-blueprint"
                              : isHighRisk
                              ? "border-safety bg-safety-light text-safety"
                              : "border-ink/30 bg-paper-subtle text-ink"
                          }`}
                        >
                          {scores.hallucination_risk.toUpperCase()}
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
