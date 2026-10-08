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
  ResponsiveContainer
} from "recharts";
import { BarChart3, ShieldCheck, Zap, Award, ArrowUpRight } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface ResultsDashboardProps {
  data: BenchmarkData;
}

export function ResultsDashboard({ data }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState<"quality" | "reliability" | "efficiency">("quality");

  const models = data.models || [];
  const rankings = data.rankings || [];

  // 1. Quality Data preparation
  const qualityChartData = models.map((m) => ({
    name: m.name.split(" ")[0],
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
  }));

  return (
    <section id="results" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 03 // QUANTITATIVE ANALYSIS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Comparative Benchmark Results
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Rigorous automated scoring across 50 held-out Indian Constitutional case queries.
            Metrics are ingested directly from verified Google Colab experimental logs.
          </p>
        </div>

        {/* Tab Controls (Illoca Drafting Capsule Buttons) */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-ink/15 pb-4">
          <button
            onClick={() => setActiveTab("quality")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === "quality"
                ? "border border-ink bg-blueprint text-white shadow-solid-sm"
                : "border border-ink/30 bg-paper-card text-ink hover:bg-paper-subtle hover:border-ink"
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>01 // Reasoning & Quality</span>
          </button>
          <button
            onClick={() => setActiveTab("reliability")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === "reliability"
                ? "border border-ink bg-blueprint text-white shadow-solid-sm"
                : "border border-ink/30 bg-paper-card text-ink hover:bg-paper-subtle hover:border-ink"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>02 // Hallucination Risk</span>
          </button>
          <button
            onClick={() => setActiveTab("efficiency")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === "efficiency"
                ? "border border-ink bg-blueprint text-white shadow-solid-sm"
                : "border border-ink/30 bg-paper-card text-ink hover:bg-paper-subtle hover:border-ink"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>03 // Throughput & Latency</span>
          </button>
        </div>

        {/* Charts Container */}
        <div className="mt-8 rounded-2xl border border-ink bg-paper-card p-6 shadow-solid technical-frame">
          {activeTab === "quality" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-sans text-lg font-bold text-ink">
                    Lexical & Semantic Quality Metrics
                  </h3>
                  <p className="font-mono text-xs text-ink-muted">
                    Token F1, ROUGE-L sequence alignment, and all-MiniLM-L6-v2 cosine semantic similarity
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <span className="flex h-2 w-2 rounded-full bg-blueprint" />
                  <span>Higher is better [0.00 – 1.00]</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qualityChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#1A1A1A" fontSize={12} tickLine={false} fontFamily="Space Mono" />
                    <YAxis stroke="#1A1A1A" fontSize={12} tickLine={false} domain={[0, 1]} fontFamily="Space Mono" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFDF8",
                        borderColor: "#1A1A1A",
                        borderRadius: "8px",
                        fontSize: "12px",
                        boxShadow: "2px 2px 0px #1A1A1A",
                        fontFamily: "Space Mono"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px", fontFamily: "Space Mono" }} />
                    <Bar dataKey="Token F1" fill="#0B43DC" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="ROUGE-L" fill="#1A1A1A" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Semantic Sim" fill="#FF4D2D" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Quality Score" fill="#5A564C" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-ink-muted">
                <div>
                  <strong className="text-ink block">Composite Quality Formula:</strong>
                  (Token F1 + ROUGE-L + Semantic Sim) / 3
                </div>
                <div>
                  <strong className="text-ink block">Top Scoring Candidate:</strong>
                  {rankings[0]?.model_name || "Qwen2.5-0.5B-Instruct"} (0.369 Quality Score)
                </div>
                <div>
                  <strong className="text-ink block">Key Insight:</strong>
                  Generalist instruction tuning yields 2.3× higher semantic agreement than domain-tuned 1.5B.
                </div>
              </div>
            </div>
          )}

          {activeTab === "reliability" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-sans text-lg font-bold text-ink">
                    Factuality Proxy & Hallucination Risk Distribution
                  </h3>
                  <p className="font-mono text-xs text-ink-muted">
                    Ratio of responses classified into Low (≥0.65), Medium (0.40–0.65), and High (&lt;0.40) risk
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <span className="flex h-2 w-2 rounded-full bg-safety" />
                  <span>Automated Legal Entity + Cosine Proxy</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reliabilityChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#1A1A1A" fontSize={12} tickLine={false} fontFamily="Space Mono" />
                    <YAxis stroke="#1A1A1A" fontSize={12} tickLine={false} domain={[0, 100]} unit="%" fontFamily="Space Mono" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFDF8",
                        borderColor: "#1A1A1A",
                        borderRadius: "8px",
                        fontSize: "12px",
                        boxShadow: "2px 2px 0px #1A1A1A",
                        fontFamily: "Space Mono"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px", fontFamily: "Space Mono" }} />
                    <Bar dataKey="Low Risk %" fill="#0B43DC" radius={[2, 2, 0, 0]} stackId="risk" />
                    <Bar dataKey="Medium Risk %" fill="#D97706" radius={[0, 0, 0, 0]} stackId="risk" />
                    <Bar dataKey="High Risk %" fill="#FF4D2D" radius={[2, 2, 0, 0]} stackId="risk" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-ink-muted">
                <div>
                  <strong className="text-ink block">Factuality Proxy Metric:</strong>
                  0.50 × Cosine Similarity + 0.50 × Legal Entity Retention
                </div>
                <div>
                  <strong className="text-ink block">Lowest Hallucination Rate:</strong>
                  Qwen2.5-0.5B-Instruct (Only 16% classified High Risk)
                </div>
                <div>
                  <strong className="text-ink block">Domain Specialist Vulnerability:</strong>
                  1.5B model exhibited 90% High Risk when queried outside criminal reform acts.
                </div>
              </div>
            </div>
          )}

          {activeTab === "efficiency" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="font-sans text-lg font-bold text-ink">
                    Inference Throughput & Latency Profiling
                  </h3>
                  <p className="font-mono text-xs text-ink-muted">
                    Execution speed in Tokens/Second vs Parameter-normalized Quality
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <span className="flex h-2 w-2 rounded-full bg-blueprint" />
                  <span>Hardware: NVIDIA GPU // Precision: bfloat16</span>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyChartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#1A1A1A" fontSize={12} tickLine={false} fontFamily="Space Mono" />
                    <YAxis yAxisId="left" stroke="#1A1A1A" fontSize={12} tickLine={false} fontFamily="Space Mono" />
                    <YAxis yAxisId="right" orientation="right" stroke="#1A1A1A" fontSize={12} tickLine={false} fontFamily="Space Mono" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFDF8",
                        borderColor: "#1A1A1A",
                        borderRadius: "8px",
                        fontSize: "12px",
                        boxShadow: "2px 2px 0px #1A1A1A",
                        fontFamily: "Space Mono"
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px", fontFamily: "Space Mono" }} />
                    <Bar yAxisId="left" dataKey="Tokens/Sec" fill="#0B43DC" radius={[2, 2, 0, 0]} />
                    <Bar yAxisId="right" dataKey="Avg Latency (s)" fill="#FF4D2D" radius={[2, 2, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Quality / B-Param" fill="#1A1A1A" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-ink-muted">
                <div>
                  <strong className="text-ink block">Maximum Throughput:</strong>
                  Qwen2.5-0.5B-Instruct (26.98 tokens/sec)
                </div>
                <div>
                  <strong className="text-ink block">Top Parameter Efficiency:</strong>
                  SmolLM2-135M (2.10 Quality pts / Billion Parameters)
                </div>
                <div>
                  <strong className="text-ink block">Deployment Decision:</strong>
                  0.5B architecture achieves optimal speed-accuracy tradeoff for client-side execution.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Master Comparison Table (Architectural Drafting Leaderboard) */}
        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-sans text-xl font-bold text-ink">
              Official Benchmark Leaderboard
            </h3>
            <span className="font-mono text-xs text-ink-muted">
              [50 HELD-OUT CONSTITUTIONAL QUERIES]
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ink bg-paper-card shadow-solid">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-ink bg-paper-subtle uppercase tracking-wider text-ink font-bold">
                <tr>
                  <th className="px-4 py-3.5">Rank</th>
                  <th className="px-4 py-3.5">Model</th>
                  <th className="px-4 py-3.5">Params</th>
                  <th className="px-4 py-3.5">Token F1</th>
                  <th className="px-4 py-3.5">ROUGE-L</th>
                  <th className="px-4 py-3.5">Semantic Sim</th>
                  <th className="px-4 py-3.5">Factuality</th>
                  <th className="px-4 py-3.5">Quality</th>
                  <th className="px-4 py-3.5">Tokens/Sec</th>
                  <th className="px-4 py-3.5 font-bold text-blueprint">Overall Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {models.map((m) => {
                  const rankInfo = rankings.find((r) => r.model_id === m.id);
                  const isFirst = rankInfo?.rank === 1;

                  return (
                    <tr
                      key={m.id}
                      className={`transition-colors ${
                        isFirst ? "bg-blueprint-light/50 font-semibold" : "hover:bg-paper-subtle/60"
                      }`}
                    >
                      <td className="px-4 py-4 font-bold">
                        {isFirst ? (
                          <span className="inline-flex items-center gap-1 rounded bg-blueprint px-2 py-0.5 text-white">
                            #1
                          </span>
                        ) : (
                          <span className="text-ink-muted">#{rankInfo?.rank || "-"}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-ink font-sans text-sm">{m.name}</div>
                        <div className="text-[10px] text-ink-muted">{m.hf_id || m.id}</div>
                      </td>
                      <td className="px-4 py-4">{m.param_count}</td>
                      <td className="px-4 py-4 tabular-nums">{m.metrics.f1_score?.toFixed(3)}</td>
                      <td className="px-4 py-4 tabular-nums">{m.metrics.rougeL?.toFixed(3)}</td>
                      <td className="px-4 py-4 tabular-nums">{m.metrics.semantic_similarity?.toFixed(3)}</td>
                      <td className="px-4 py-4 tabular-nums">{m.metrics.factuality_proxy?.toFixed(3)}</td>
                      <td className="px-4 py-4 font-bold tabular-nums text-ink">
                        {m.metrics.quality_score?.toFixed(3)}
                      </td>
                      <td className="px-4 py-4 tabular-nums">{m.metrics.tokens_per_second?.toFixed(1)}</td>
                      <td className="px-4 py-4 font-bold text-blueprint tabular-nums text-sm">
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
