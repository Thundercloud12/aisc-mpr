"use client";

import React from "react";
import { Compass, Cpu, BookOpen, Database, ArrowRight } from "lucide-react";

export function Conclusion() {
  return (
    <section className="border-b border-ink/20 py-16 sm:py-24 bg-paper/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 10 // PRACTICAL DEPLOYMENT GUIDANCE</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Conclusions & Engineering Recommendations
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Synthesizing empirical findings into direct engineering guidance for court technologists,
            legal AI developers, and legal aid institutions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-ink bg-paper-card p-6 shadow-solid flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-blueprint uppercase tracking-wider block mb-2">
                01 // Edge Hardware Recommendation
              </span>
              <h3 className="font-sans text-lg font-bold text-ink mb-2">
                Deploy Qwen2.5-0.5B-Instruct
              </h3>
              <p className="font-sans text-xs text-ink-body leading-relaxed">
                For local advocate laptops, offline legal clinics, or sovereign court kiosks,
                the 0.5B generalist instruction model offers the highest factual accuracy and lowest latency
                with zero cloud infrastructure costs or privacy risks.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-ink bg-paper-card p-6 shadow-solid flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-safety uppercase tracking-wider block mb-2">
                02 // Domain Fine-Tuning Guidance
              </span>
              <h3 className="font-sans text-lg font-bold text-ink mb-2">
                Avoid Narrow Statutory Silos
              </h3>
              <p className="font-sans text-xs text-ink-body leading-relaxed">
                Fine-tuning solely on newly enacted penal acts (such as BNS 2023) causes catastrophic forgetting
                of fundamental rights jurisprudence. Fine-tuning corpora must balance statutory code with
                75+ years of constitutional landmark judgments.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-ink bg-paper-card p-6 shadow-solid flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider block mb-2">
                03 // Architectural Roadmap
              </span>
              <h3 className="font-sans text-lg font-bold text-ink mb-2">
                Hybrid Dense Retrieval (RAG)
              </h3>
              <p className="font-sans text-xs text-ink-body leading-relaxed">
                No small language model can store millions of pages of judicial precedent in weights alone.
                The ultimate architecture is pairing a compact 0.5B SLM with a vector database indexed over
                official Supreme Court reports (SCR) for verifiable citation grounding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
