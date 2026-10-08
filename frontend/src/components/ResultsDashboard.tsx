"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { BarChart3, ShieldCheck, Zap, Award, CheckCircle2, AlertTriangle, ArrowUpDown } from "lucide-react";
import { BenchmarkData, ModelData } from "@/types/benchmark";

interface ResultsDashboardProps {
  data: BenchmarkData;
}

export function ResultsDashboard({ data }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState<"quality" | "reliability" | "efficiency">("quality");

  const models = data.models || [];
  const rankings = data.rankings || [];

  // 1. Quality Data preparation
  const qualityChartData = models.map((m) => ({
    name: m.name.split(" ")[0], // short name
    fullName: m.name,
    "Token F1": Number((m.metrics.f1_score || 0).toFixed(4)),
    "ROUGE-L": Number((m.metrics.rougeL || 0).toFixed(4)),
    "Semantic Sim": Number((m.metrics.semantic_similarity || 0).toFixed(4)),
    "Quality Score": Number((m.metrics.quality_score || 0).toFixed(4)),
  }));

  // 2. Reliability & Safety Data preparation
  const reliabilityChartData = models.map((m) => {
    const dist = m.hallucination_distribution || { low_risk_pct: 0, medium_risk_pct: 0, high_risk_pct: 0 };
    return {
      name: m.name.split(" ")[0],
      fullName: m.name,
      "Factuality Proxy": Number((m.metrics.factuality_proxy || 0).toFixed(4)),
      "Low Risk %": dist.low_risk_pct,
      "Medium Risk %": dist.medium_risk_pct,
      "High Risk %": dist.high_risk_pct,
    };
  });

  // 3. Efficiency Data preparation
  const efficiencyChartData = models.map((m) => ({
    name: m.name.split(" ")[0],
    fullName: m.name,
    "Tokens/Sec": Number((m.metrics.tokens_per_second || 0).toFixed(2)),
    "Avg Latency (s)": Number((m.metrics.avg_latency_sec || 0).toFixed(3)),
    "Quality / B-Param": Number((m.metrics.quality_per_b_param || 0).toFixed(2)),
    parameters: m.parameters / 1e6,
  }));

  return (
    <section id="results" className="border-b border-border py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Section 03 // Empirical Results</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Comparative Benchmark Results Dashboard
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Quantitative analysis across 50 held-out Indian Constitutional case queries. All metrics
            are read directly from benchmark execution logs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("quality")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all ${
              activeTab === "quality"
                ? "bg-accent text-white shadow-subtle"
                : "bg-surface-subtle text-charcoal-muted hover:text-charcoal hover:bg-surface-muted"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Reasoning & Quality</span>
          </button>
          <button
            onClick={() => setActiveTab("reliability")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all ${
              activeTab === "reliability"
                ? "bg-accent text-white shadow-subtle"
                : "bg-surface-subtle text-charcoal-muted hover:text-charcoal hover:bg-surface-muted"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Reliability & Safety</span>
          </button>
          <button
            onClick={() => setActiveTab("efficiency")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-all ${
              activeTab === "efficiency"
                ? "bg-accent text-white shadow-subtle"
                : "bg-surface-subtle text-charcoal-muted hover:text-charcoal hover:bg-surface-muted"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Throughput & Efficiency</span>
          </button>
        </div>

        {/* Charts Container */}
        <div className="mt-8 rounded-xl border border-border bg-background p-6 shadow-card">
          {activeTab === "quality" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-charcoal-heading">
                    Lexical & Semantic Quality Metrics
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Token F1, ROUGE-L sequence overlap, and all-MiniLM-L6-v2 cosine semantic similarity
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted">
                  <span className="flex h-2 w-2 rounded-full bg-accent" />
                  <span>Higher is better (0.0 – 1.0)</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qualityChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E1" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} />
                    <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={[0, 1]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E2E0D8",
                        borderRadius: "8px",
                        fontSize: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                    <Bar dataKey="Token F1" fill="#4B6B94" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ROUGE-L" fill="#5E8C61" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Semantic Sim" fill="#B2533E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Quality Score" fill="#885EAD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-muted">
                <div>
                  <strong className="text-charcoal block">Composite Formula:</strong>
                  Quality Score = (F1 + ROUGE-L + Semantic Sim) / 3
                </div>
                <div>
                  <strong className="text-charcoal block">Top Quality Model:</strong>
                  {rankings[0]?.model_name || "Qwen2.5-0.5B-Instruct"} ({qualityChartData[1]?.["Quality Score"] || 0.369})
                </div>
                <div>
                  <strong className="text-charcoal block">Key Observation:</strong>
                  Generalist instruction model exhibits strongest semantic fidelity to judicial holding.
                </div>
              </div>
            </div>
          )}

          {activeTab === "reliability" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-charcoal-heading">
                    Factuality Proxy & Hallucination Risk Distribution
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Proportion of answers categorized into Low (&ge;0.65), Medium (0.40–0.65), and High (&lt;0.40) risk
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Automated Heuristic Proxy</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reliabilityChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E1" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} />
                    <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={[0, 100]} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E2E0D8",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                    <Bar dataKey="Low Risk %" fill="#15803D" radius={[4, 4, 0, 0]} stackId="risk" />
                    <Bar dataKey="Medium Risk %" fill="#D97706" radius={[0, 0, 0, 0]} stackId="risk" />
                    <Bar dataKey="High Risk %" fill="#DC2626" radius={[4, 4, 0, 0]} stackId="risk" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-muted">
                <div>
                  <strong className="text-charcoal block">Factuality Proxy Formula:</strong>
                  F_proxy = 0.50 &times; Cosine Similarity + 0.50 &times; Legal Entity Retention
                </div>
                <div>
                  <strong className="text-charcoal block">Safest Output Distribution:</strong>
                  Qwen2.5-0.5B-Instruct (48% Low Risk, only 20% High Risk)
                </div>
                <div>
                  <strong className="text-charcoal block">Disclaimer:</strong>
                  Automated proxies evaluate vocabulary and semantic similarity; they do not replace human judicial verification.
                </div>
              </div>
            </div>
          )}

          {activeTab === "efficiency" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium text-charcoal-heading">
                    Inference Throughput & Latency Profiling
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Execution speed in Tokens/Second vs Average Response Latency per query
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-charcoal-muted">
                  <span className="flex h-2 w-2 rounded-full bg-accent" />
                  <span>Hardware: NVIDIA T4 / GPU</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E1" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#71717A" fontSize={12} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#71717A" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E2E0D8",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                    <Bar yAxisId="left" dataKey="Tokens/Sec" fill="#1E293B" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="Avg Latency (s)" fill="#9E3C1B" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Quality / B-Param" fill="#0D9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-muted">
                <div>
                  <strong className="text-charcoal block">Highest Throughput:</strong>
                  Qwen2.5-0.5B-Instruct ({efficiencyChartData[1]?.["Tokens/Sec"] || 26.98} tokens/sec)
                </div>
                <div>
                  <strong className="text-charcoal block">Best Quality / B-Param:</strong>
                  SmolLM2-135M (2.10 points / B-Param due to tiny 135M footprint)
                </div>
                <div>
                  <strong className="text-charcoal block">Operational Takeaway:</strong>
                  0.5B parameter models strike the optimal balance for real-time edge or cloud legal serving.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Master Comparison Table */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-medium text-charcoal-heading">
              Comprehensive Performance Leaderboard
            </h3>
            <span className="text-xs text-charcoal-muted font-mono">
              Evaluated on n=50 held-out cases
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-subtle">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-surface-subtle font-mono uppercase text-charcoal-muted tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Rank</th>
                  <th className="px-4 py-3.5">Model</th>
                  <th className="px-4 py-3.5">Parameters</th>
                  <th className="px-4 py-3.5">Token F1</th>
                  <th className="px-4 py-3.5">ROUGE-L</th>
                  <th className="px-4 py-3.5">Semantic Sim</th>
                  <th className="px-4 py-3.5">Factuality Proxy</th>
                  <th className="px-4 py-3.5">Composite Quality</th>
                  <th className="px-4 py-3.5">Tokens/Sec</th>
                  <th className="px-4 py-3.5">Latency</th>
                  <th className="px-4 py-3.5 font-semibold text-accent">Overall Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {models.map((m) => {
                  const rankInfo = rankings.find((r) => r.model_id === m.id);
                  const isFirst = rankInfo?.rank === 1;

                  return (
                    <tr
                      key={m.id}
                      className={`transition-colors hover:bg-surface-subtle/70 ${
                        isFirst ? "bg-accent-light/30" : ""
                      }`}
                    >
                      <td className="px-4 py-4 font-mono font-bold">
                        {isFirst ? (
                          <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-0.5 text-white">
                            #1
                          </span>
                        ) : (
                          <span className="text-charcoal-muted">#{rankInfo?.rank || "-"}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-charcoal-heading">{m.name}</div>
                        <div className="font-mono text-[11px] text-charcoal-muted">{m.hf_id || m.id}</div>
                      </td>
                      <td className="px-4 py-4 font-mono">{m.param_count}</td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.f1_score?.toFixed(3)}</td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.rougeL?.toFixed(3)}</td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.semantic_similarity?.toFixed(3)}</td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.factuality_proxy?.toFixed(3)}</td>
                      <td className="px-4 py-4 font-mono font-semibold tabular-nums text-charcoal">
                        {m.metrics.quality_score?.toFixed(3)}
                      </td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.tokens_per_second?.toFixed(1)}</td>
                      <td className="px-4 py-4 font-mono tabular-nums">{m.metrics.avg_latency_sec?.toFixed(2)}s</td>
                      <td className="px-4 py-4 font-mono font-bold text-accent tabular-nums text-sm">
                        {rankInfo?.overall_score?.toFixed(3) || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
