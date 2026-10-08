"use client";

import React from "react";
import {
  FileText,
  HelpCircle,
  Cpu,
  MessageSquare,
  BarChart2,
  GitCompare,
  ArrowRight,
  Layers
} from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface BenchmarkOverviewProps {
  data: BenchmarkData;
}

export function BenchmarkOverview({ data }: BenchmarkOverviewProps) {
  const pipelineSteps = [
    {
      step: "01",
      icon: FileText,
      title: "Constitutional Corpus",
      desc: "Held-out split from Articles_Constitution_3300_Instruction_Set covering Articles 12, 14, 15, 19, and 21."
    },
    {
      step: "02",
      icon: HelpCircle,
      title: "50 Judicial Queries",
      desc: "Strictly held-out questions spanning ratio decidendi, substantive equality, and Article 21 procedural liberty."
    },
    {
      step: "03",
      icon: Cpu,
      title: "3 SLM Paradigms",
      desc: "Base foundation (SmolLM2-135M), Generalist Instruct (Qwen2.5-0.5B), and Domain Fine-Tuned (Indian-Legal-1.5B)."
    },
    {
      step: "04",
      icon: MessageSquare,
      title: "Greedy Generation",
      desc: "Low-temperature (0.2) greedy-nucleus decoding with strict context caps to benchmark pure doctrinal capability."
    },
    {
      step: "05",
      icon: BarChart2,
      title: "Tri-Fold Metrics",
      desc: "Token F1 lexical alignment, ROUGE-L, all-MiniLM-L6-v2 cosine semantic similarity, and domain factuality proxy."
    },
    {
      step: "06",
      icon: GitCompare,
      title: "Multi-Criteria Ranking",
      desc: "Normalized composite score weighting reasoning quality (50%), hallucination safety (25%), and throughput (25%)."
    }
  ];

  return (
    <section id="overview" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 01 // METHODOLOGICAL PIPELINE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            End-to-End Benchmarking Architecture
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            A hermetically sealed evaluation protocol ensuring zero training memorization leakage,
            reproducible generation seeds, and multidimensional legal assessment.
          </p>
        </div>

        {/* 6-Step Technical Pipeline Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pipelineSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative rounded-xl border border-ink bg-paper-card p-5 shadow-solid-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between pb-3 border-b border-ink/10 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-ink/30 bg-paper-subtle text-blueprint">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-ink-muted">
                    PHASE {s.step}
                  </span>
                </div>

                {/* Step Title & Desc */}
                <h3 className="font-sans text-base font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 font-sans text-xs text-ink-muted leading-relaxed">
                  {s.desc}
                </p>

                {/* Connecting Arrow for sequential visual cues */}
                {idx < pipelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-ink-faint">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
