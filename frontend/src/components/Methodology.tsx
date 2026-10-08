"use client";

import React from "react";
import {
  Layers,
  Database,
  Filter,
  Code2,
  Cpu,
  BarChart2,
  Activity,
  AlertOctagon,
  Scale
} from "lucide-react";

export function Methodology() {
  const steps = [
    {
      num: "01",
      title: "Dataset Selection",
      icon: Database,
      content: "Sourced from the public Hugging Face dataset nisaar/Articles_Constitution_3300_Instruction_Set, capturing Constitutional Articles 12, 14, 15, 19, and 21 alongside landmark Supreme Court case precedents."
    },
    {
      num: "02",
      title: "Data Preprocessing & Cleaning",
      icon: Filter,
      content: "Executed column harmonization (question, context, reference_answer), dropped duplicates, stripped whitespace, removed questions < 10 characters or answers < 20 characters, and truncated contexts to 1,024 characters."
    },
    {
      num: "03",
      title: "Held-Out Test Partitioning",
      icon: Layers,
      content: "Partitioned an 80/20 train/test split locked to random_state=42. Subsampled 50 held-out judicial queries for zero-shot and instruct benchmarking to prevent in-distribution memorization bias."
    },
    {
      num: "04",
      title: "Asymmetric Prompt Formulation",
      icon: Code2,
      content: "Formulated distinct prompts respecting model architectures: ChatML formatted with an Indian legal assistant system prompt for Instruct models, and structured legal few-shot headers for base foundation models."
    },
    {
      num: "05",
      title: "Hardware Execution Pipeline",
      icon: Cpu,
      content: "Sequential per-model evaluation on NVIDIA GPU with bfloat16 / float16 precision. Applied greedy nucleus generation (temp=0.2, top_p=0.90, repetition_penalty=1.15) with explicit VRAM purging between model checkpoints."
    },
    {
      num: "06",
      title: "Multi-Metric Scoring Engine",
      icon: BarChart2,
      content: "Assessed answers using three complementary axes: Lexical (Token F1, ROUGE-1/2/L), Semantic Similarity (all-MiniLM-L6-v2 cosine similarity), and Legal Entity Retention (domain keyword overlap)."
    },
    {
      num: "07",
      title: "Operational Profiling",
      icon: Activity,
      content: "Recorded per-query elapsed execution time, generated token length, and sustained tokens/second throughput to evaluate real-world production viability and parameter efficiency."
    },
    {
      num: "08",
      title: "Limitations & Proxy Caveats",
      icon: AlertOctagon,
      content: "Automated lexical and semantic scores act as computational proxies. Semantic similarity and entity overlap cannot substitute for judicial review by a qualified legal scholar or enrolled advocate."
    }
  ];

  return (
    <section id="methodology" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 08 // SCIENTIFIC PROTOCOL</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Evaluation Methodology & Experimental Rigor
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            A reproducible eight-stage academic protocol designed to evaluate reasoning capabilities,
            mitigate memorization artifacts, and establish objective multi-criteria performance baselines.
          </p>
        </div>

        {/* 8-Step Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="rounded-xl border border-ink bg-paper-card p-5 shadow-solid-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-ink/15 text-xs mb-3 font-mono">
                    <span className="font-bold text-blueprint">STAGE {st.num}</span>
                    <Icon className="h-4 w-4 text-ink-muted" />
                  </div>
                  <h3 className="font-sans text-sm font-bold text-ink">
                    {st.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs text-ink-muted leading-relaxed">
                    {st.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-10 rounded-2xl border border-ink bg-paper-card p-6 shadow-solid text-xs text-ink-muted flex items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-ink bg-paper-subtle text-safety shrink-0 mt-0.5">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <strong className="text-ink font-bold block text-sm mb-1 font-sans">
              Academic Disclaimer & Evaluation Heuristic Bounds
            </strong>
            <p className="font-sans leading-relaxed text-ink-body">
              Automated evaluation metrics (Token F1, ROUGE, MiniLM embeddings) measure lexical overlap and vector similarity against historical ground-truth precedents. They do not model legal validities under changing statutes, jurisdictional distinctions between High Courts and the Supreme Court, or subsequent legislative amendments. No benchmark score establishes professional legal authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
