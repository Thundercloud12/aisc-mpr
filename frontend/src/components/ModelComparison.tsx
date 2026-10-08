"use client";

import React from "react";
import { Cpu, ExternalLink, Sparkles, Layers, Shield, Hash, Zap, HelpCircle } from "lucide-react";
import { BenchmarkData, ModelData } from "@/types/benchmark";

interface ModelComparisonProps {
  data: BenchmarkData;
}

export function ModelComparison({ data }: ModelComparisonProps) {
  const models = data.models || [];

  return (
    <section id="models" className="border-b border-border py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>Section 02 // Evaluated Cohort</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Architectural Cohort Specifications
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            The study compares three distinct small language model paradigms: a compact base foundation
            completion model, an efficiency-optimized generalist instruction model, and an Indian-law-specialized
            statutory reform model.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, idx) => {
            const isBase = !model.is_instruct;
            const isFallback = model.name.toLowerCase().includes("fallback");
            const metrics = model.metrics || {};

            return (
              <div
                key={model.id || idx}
                className="relative rounded-xl border border-border bg-surface p-6 shadow-card transition-all hover:shadow-elevated hover:border-accent/50 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="font-mono text-xs font-semibold text-accent">
                      Candidate 0{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        isBase
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {model.instruction_tuned || (isBase ? "Base Foundation" : "Instruction-Tuned")}
                    </span>
                  </div>

                  {/* Title & Parameter Count */}
                  <div className="mt-4">
                    <h3 className="font-serif text-xl font-medium text-charcoal-heading">
                      {model.name}
                    </h3>
                    <p className="font-mono text-xs text-charcoal-muted mt-1">
                      {model.hf_id || model.id}
                    </p>
                  </div>

                  {/* Quick Highlight Box */}
                  <div className="mt-4 rounded-lg bg-surface-subtle p-3.5 border border-border/60 text-xs">
                    <div className="flex justify-between py-1">
                      <span className="text-charcoal-muted">Parameter Scale</span>
                      <span className="font-mono font-semibold text-charcoal">{model.param_count}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-border/40">
                      <span className="text-charcoal-muted">Domain Profile</span>
                      <span className="font-medium text-charcoal">{model.domain || "General"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-border/40">
                      <span className="text-charcoal-muted">Architecture</span>
                      <span className="font-mono text-charcoal">{model.architecture || "CausalLM"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-border/40">
                      <span className="text-charcoal-muted">Precision / Device</span>
                      <span className="font-mono text-charcoal">{model.precision || "bfloat16"} ({model.device || "GPU"})</span>
                    </div>
                  </div>

                  {/* Architectural Details Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded border border-border/80 bg-background px-2.5 py-1.5">
                      <span className="text-charcoal-muted block">Hidden Dimension</span>
                      <span className="font-mono font-medium text-charcoal">{model.hidden_size || "N/A"}</span>
                    </div>
                    <div className="rounded border border-border/80 bg-background px-2.5 py-1.5">
                      <span className="text-charcoal-muted block">Hidden Layers</span>
                      <span className="font-mono font-medium text-charcoal">{model.layers || "N/A"}</span>
                    </div>
                  </div>

                  {/* Base Model Notice or Fallback Note */}
                  {isBase && (
                    <div className="mt-4 rounded-md border border-amber-200 bg-amber-50/70 p-3 text-[11px] text-amber-900 leading-relaxed">
                      <strong>Base Completion Behavior:</strong> Evaluated using legal precedent completion headers rather than conversational ChatML formatting.
                      {isFallback && (
                        <span className="block mt-1 text-amber-800">
                          * Serving as valid open replacement for gated target <code className="font-mono text-[10px]">gyanai/ayn-88M-hf</code>.
                        </span>
                      )}
                    </div>
                  )}

                  {!isBase && model.id === "model_3" && (
                    <div className="mt-4 rounded-md border border-blue-200 bg-blue-50/60 p-3 text-[11px] text-blue-900 leading-relaxed">
                      <strong>Domain Specialization:</strong> Fine-tuned specifically on Indian criminal law reform (Bharatiya Nyaya Sanhita 2023). Evaluated on constitutional precedents to verify out-of-distribution reasoning.
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  {model.hf_url ? (
                    <a
                      href={model.hf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>Hugging Face Model</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-charcoal-muted">Hugging Face Hub</span>
                  )}
                  <span className="font-mono text-[11px] text-charcoal-faint">
                    {model.type?.split(" ")[0] || "SLM"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
