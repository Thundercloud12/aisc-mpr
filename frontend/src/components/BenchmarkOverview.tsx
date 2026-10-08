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
  ShieldCheck,
  Scale
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
      title: "Indian Legal Data",
      desc: "Held-out split from Articles_Constitution_3300_Instruction_Set covering landmark cases."
    },
    {
      step: "02",
      icon: HelpCircle,
      title: "Evaluation Questions",
      desc: "50 grounded queries spanning ratio decidendi, doctrine application, and constitutional scope."
    },
    {
      step: "03",
      icon: Cpu,
      title: "3 Language Models",
      desc: "Asymmetric evaluation across Base Foundation (Ayn/SmolLM), Generalist (Qwen 0.5B), and Legal (1.5B)."
    },
    {
      step: "04",
      icon: MessageSquare,
      title: "Generated Answers",
      desc: "Low-temperature (0.2) greedy-nucleus sampling to restrict creative hallucination drift."
    },
    {
      step: "05",
      icon: BarChart2,
      title: "Metrics Engine",
      desc: "Tri-fold assessment: Token F1, ROUGE-1/2/L, MiniLM semantic cosine similarity, & legal lexicon overlap."
    },
    {
      step: "06",
      icon: GitCompare,
      title: "Comparative Analysis",
      desc: "Multi-criteria ranking (Quality, Safety, Speed) and qualitative failure taxonomy."
    }
  ];

  return (
    <section id="overview" className="border-b border-border py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5" />
            <span>Section 01 // Research Foundation</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Benchmark Architecture & Research Formulation
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Legal inquiry requires rigorous doctrinal fidelity where subtle semantic drift produces
            factual misrepresentations. This benchmark assesses whether models with sub-2B parameter
            budgets can accurately reason over Indian Supreme Court precedents and Fundamental Rights.
          </p>
        </div>

        {/* 2-Column Key Facts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Question Card */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-subtle">
            <span className="font-mono text-xs font-semibold uppercase text-accent tracking-wider">
              Primary Research Question
            </span>
            <p className="mt-3 font-serif text-lg text-charcoal-heading leading-snug">
              &ldquo;{data.project.research_question ||
                "How do a tiny Indian legal-domain model, a general-purpose small language model, and an Indian-law-specialized small language model compare when answering questions based on Indian legal/judicial data?"}&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-charcoal-muted">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span>Evaluated without data contamination on strictly held-out test split.</span>
            </div>
          </div>

          {/* Dataset Specifications */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-subtle">
            <span className="font-mono text-xs font-semibold uppercase text-accent tracking-wider">
              Benchmark Dataset & Grounding
            </span>
            <h4 className="mt-3 text-base font-medium text-charcoal-heading">
              Indian Constitutional & Supreme Court Precedents
            </h4>
            <p className="mt-2 text-xs text-charcoal-body leading-relaxed">
              Drawn from <code className="bg-surface-subtle px-1.5 py-0.5 rounded text-[11px] font-mono border border-border">nisaar/Articles_Constitution_3300_Instruction_Set</code>,
              covering Articles 12 (Definition of State), 14 (Equality), 15 (Non-discrimination), 19 (Freedoms),
              and 21 (Life & Liberty), alongside landmark rulings including <em>Maneka Gandhi</em>, <em>Kesavananda Bharati</em>,
              and <em>Central Inland Water Transport Corp</em>.
            </p>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-charcoal-muted">
              <span>Sample size: <strong>{data.project.evaluation_samples || 50}</strong> curated cases</span>
              <span className="font-mono text-[11px] text-accent">Split: 80% Train / 20% Test</span>
            </div>
          </div>
        </div>

        {/* Visual Pipeline */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-medium text-charcoal-heading">
              End-to-End Evaluation Pipeline
            </h3>
            <span className="text-xs text-charcoal-muted font-mono">Sequential Execution Pipeline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {pipelineSteps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="relative rounded-lg border border-border bg-background p-4 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono font-semibold text-accent">{st.step}</span>
                      <Icon className="h-4 w-4 text-charcoal-muted" />
                    </div>
                    <h4 className="text-sm font-semibold text-charcoal-heading tracking-tight">
                      {st.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-charcoal-muted leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-charcoal-faint">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
