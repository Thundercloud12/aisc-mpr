"use client";

import React from "react";
import { CheckCircle, ArrowRight, Lightbulb, Compass, Database, Scale } from "lucide-react";

export function Conclusion() {
  return (
    <section className="border-b border-border py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5" />
            <span>Section 10 // Synthesis & Roadmap</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Conclusions & Deployment Recommendations
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Synthesizing our empirical results into actionable engineering guidance for practitioners,
            judiciary tech researchers, and edge AI developers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-subtle">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block mb-2">
              1. Recommendation for Edge AI
            </span>
            <h3 className="font-serif text-base font-semibold text-charcoal-heading mb-2">
              Deploy Qwen2.5-0.5B-Instruct
            </h3>
            <p className="text-xs text-charcoal-body leading-relaxed">
              For local desktop legal research, offline advocate notebooks, or self-hosted court assistants,
              the 0.5B generalist instruction model provides the highest reliability and lowest latency with
              zero external cloud reliance.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-subtle">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block mb-2">
              2. Specialization Guidance
            </span>
            <h3 className="font-serif text-base font-semibold text-charcoal-heading mb-2">
              Targeted Domain Fine-Tuning
            </h3>
            <p className="text-xs text-charcoal-body leading-relaxed">
              Domain fine-tuning should not be confined strictly to narrow penal acts (e.g. BNS alone).
              Models require joint training across Constitutional Law, Supreme Court Reports (SCR), and procedural codes
              to maintain multi-faceted doctrinal reasoning.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-subtle">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block mb-2">
              3. Future Roadmap
            </span>
            <h3 className="font-serif text-base font-semibold text-charcoal-heading mb-2">
              Hybrid Dense Retrieval (RAG)
            </h3>
            <p className="text-xs text-charcoal-body leading-relaxed">
              Standalone parametric weights cannot memorize 75+ years of Indian Supreme Court jurisprudence.
              Pairing compact 0.5B SLMs with dense vector retrieval over indexed case judgment corpora represents
              the definitive next step for accurate citation grounding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
