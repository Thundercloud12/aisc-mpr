"use client";

import React from "react";
import { Sparkles, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface FindingsProps {
  data: BenchmarkData;
}

export function Findings({ data }: FindingsProps) {
  const findings = data.findings || [];
  const rankings = data.rankings || [];
  const models = data.models || [];

  const topModel = rankings[0] ? models.find((m) => m.id === rankings[0].model_id) : null;
  const fastestModel = models.length > 0
    ? [...models].sort((a, b) => (b.metrics.tokens_per_second || 0) - (a.metrics.tokens_per_second || 0))[0]
    : null;
  const bestEfficiencyModel = models.length > 0
    ? [...models].sort((a, b) => (b.metrics.quality_per_b_param || 0) - (a.metrics.quality_per_b_param || 0))[0]
    : null;

  return (
    <section id="findings" className="border-b border-border py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Section 09 // Empirical Insights</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Data-Driven Research Findings
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            All conclusions in this section are derived directly from the automated metric scoring
            and qualitative case review exported from the benchmark pipeline.
          </p>
        </div>

        {/* Dynamic Key Metric Summary Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-border bg-background p-4 shadow-subtle">
            <span className="text-[11px] font-mono text-charcoal-muted uppercase">Highest Overall Score</span>
            <div className="mt-1 font-serif text-lg font-medium text-charcoal-heading">
              {topModel?.name || "Qwen2.5-0.5B-Instruct"}
            </div>
            <div className="mt-2 text-xs text-charcoal-muted font-mono">
              Score: <strong className="text-accent">{rankings[0]?.overall_score?.toFixed(3)}</strong> | Quality: {topModel?.metrics.quality_score?.toFixed(3)}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4 shadow-subtle">
            <span className="text-[11px] font-mono text-charcoal-muted uppercase">Maximum Throughput</span>
            <div className="mt-1 font-serif text-lg font-medium text-charcoal-heading">
              {fastestModel?.name || "Qwen2.5-0.5B-Instruct"}
            </div>
            <div className="mt-2 text-xs text-charcoal-muted font-mono">
              Speed: <strong className="text-accent">{fastestModel?.metrics.tokens_per_second?.toFixed(1)}</strong> tokens/second
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4 shadow-subtle">
            <span className="text-[11px] font-mono text-charcoal-muted uppercase">Quality per Billion Params</span>
            <div className="mt-1 font-serif text-lg font-medium text-charcoal-heading">
              {bestEfficiencyModel?.name || "SmolLM2-135M"}
            </div>
            <div className="mt-2 text-xs text-charcoal-muted font-mono">
              Efficiency: <strong className="text-accent">{bestEfficiencyModel?.metrics.quality_per_b_param?.toFixed(2)}</strong> pts/B-param
            </div>
          </div>
        </div>

        {/* Detailed Findings List */}
        <div className="mt-10 space-y-4">
          {findings.map((finding, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-background p-6 shadow-card hover:border-accent/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-accent shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-charcoal-heading">
                      {finding.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-charcoal-body leading-relaxed">
                      {finding.detail}
                    </p>
                    <div className="mt-3 inline-block rounded bg-surface-subtle px-2.5 py-1 text-[11px] font-mono text-charcoal border border-border/80">
                      <strong>Empirical Support:</strong> {finding.metric_support}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
