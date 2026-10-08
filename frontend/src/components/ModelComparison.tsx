"use client";

import React from "react";
import { Cpu, ExternalLink, Sparkles, Layers, Shield, Hash, Zap, BookOpen } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface ModelComparisonProps {
  data: BenchmarkData;
}

export function ModelComparison({ data }: ModelComparisonProps) {
  const models = data.models || [];

  return (
    <section id="models" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-safety mr-1.5 font-bold">●</span>
            <span>SECTION 02 // ARCHITECTURAL SPECIFICATIONS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Evaluated Candidate Cohort
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Comparing three divergent small language model architectures: an unaligned compact foundation
            base, a general-purpose instruction-aligned model, and a domain-specialized statutory model.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, idx) => {
            const isBase = !model.is_instruct;
            const isWinner = model.id === "model_2";

            return (
              <div
                key={model.id || idx}
                className={`relative rounded-xl border border-ink bg-paper-card p-6 shadow-solid transition-all flex flex-col justify-between ${
                  isWinner ? "ring-2 ring-blueprint" : ""
                }`}
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-ink/15">
                    <span className="font-mono text-xs font-bold text-ink-muted">
                      CANDIDATE 0{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-bold ${
                        isBase
                          ? "border border-ink/40 bg-paper-subtle text-ink"
                          : "border border-blueprint bg-blueprint text-white"
                      }`}
                    >
                      {model.instruction_tuned || (isBase ? "Base Foundation" : "Instruct-Tuned")}
                    </span>
                  </div>

                  {/* Model Name & Architecture */}
                  <div className="mt-4">
                    <h3 className="font-sans text-xl font-bold text-ink">
                      {model.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 font-mono text-xs text-ink-muted">
                      <span>{model.param_count} Parameters</span>
                      <span>•</span>
                      <span>{model.architecture || "CausalLM"}</span>
                    </div>
                  </div>

                  {/* Parameter Count Box */}
                  <div className="mt-5 rounded-lg border border-ink/20 bg-paper-subtle/70 p-3 font-mono">
                    <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                      <span>Active Parameters</span>
                      <strong className="text-ink font-bold">{model.param_count}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs text-ink-muted">
                      <span>Context Window</span>
                      <span className="text-ink">1,024 Tokens</span>
                    </div>
                  </div>

                  {/* Architectural Technical Spec Table */}
                  <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-xs font-mono">
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Hidden Dimension:</span>
                      <span className="text-ink font-semibold">{model.hidden_size || "Default"}</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Transformer Layers:</span>
                      <span className="text-ink font-semibold">{model.layers || "Default"}</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Vocabulary Size:</span>
                      <span className="text-ink font-semibold">{model.vocab_size || "Default"}</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Execution Precision:</span>
                      <span className="text-ink font-semibold">{model.precision || "bfloat16"}</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Prompt Paradigm:</span>
                      <span className="text-ink font-semibold">
                        {isBase ? "Zero-Shot Completion" : "ChatML Instruct"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Hugging Face Link */}
                <div className="mt-6 pt-4 border-t border-ink/15">
                  <a
                    href={model.hf_url || `https://huggingface.co/${model.hf_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-ink bg-paper-card py-2 text-xs font-mono font-medium text-ink transition-all hover:bg-paper-subtle hover:border-blueprint hover:text-blueprint"
                  >
                    <span>Inspect Hugging Face Weights</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
