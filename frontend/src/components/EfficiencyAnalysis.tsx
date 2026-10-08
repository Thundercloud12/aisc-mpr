"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label
} from "recharts";
import { Zap, Activity, Cpu, SlidersHorizontal, Scale } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface EfficiencyAnalysisProps {
  data: BenchmarkData;
}

export function EfficiencyAnalysis({ data }: EfficiencyAnalysisProps) {
  const models = data.models || [];

  // Data for Quality vs Parameters
  const qualityVsParamsData = models.map((m) => ({
    name: m.name,
    shortName: m.name.split(" ")[0],
    paramsMillions: Math.round(m.parameters / 1e6),
    qualityScore: Number((m.metrics.quality_score || 0).toFixed(4)),
    tokensPerSec: Number((m.metrics.tokens_per_second || 0).toFixed(1)),
    latencySec: Number((m.metrics.avg_latency_sec || 0).toFixed(2)),
  }));

  // Data for Quality vs Latency
  const qualityVsLatencyData = models.map((m) => ({
    name: m.name,
    shortName: m.name.split(" ")[0],
    latencySec: Number((m.metrics.avg_latency_sec || 0).toFixed(2)),
    qualityScore: Number((m.metrics.quality_score || 0).toFixed(4)),
    tokensPerSec: Number((m.metrics.tokens_per_second || 0).toFixed(1)),
  }));

  const colors = ["#4B6B94", "#B2533E", "#5E8C61"];

  return (
    <section id="efficiency" className="border-b border-border py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            <span>Section 07 // Pareto Frontiers</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Operational Efficiency & Trade-off Analysis
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            In edge legal applications, larger parameter footprints do not automatically translate
            into proportional accuracy gains. We evaluate the Pareto frontier balancing model parameter scale,
            inference latency, and output fidelity.
          </p>
        </div>

        {/* 2 Interactive Scatter Charts */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Quality vs Parameters */}
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <h3 className="font-serif text-base font-semibold text-charcoal-heading">
                Quality Score vs. Model Parameter Scale
              </h3>
              <span className="text-[11px] font-mono text-charcoal-muted">Pareto Frontier</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E1" />
                  <XAxis
                    type="number"
                    dataKey="paramsMillions"
                    name="Parameters (M)"
                    unit="M"
                    stroke="#71717A"
                    fontSize={11}
                    domain={[0, 1600]}
                  >
                    <Label value="Parameter Count (Millions)" offset={-10} position="insideBottom" fontSize={11} fill="#71717A" />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="qualityScore"
                    name="Quality Score"
                    stroke="#71717A"
                    fontSize={11}
                    domain={[0, 0.5]}
                  >
                    <Label value="Composite Quality Score" angle={-90} position="insideLeft" fontSize={11} fill="#71717A" />
                  </YAxis>
                  <ZAxis range={[250, 450]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-border bg-surface p-2.5 shadow-card text-xs">
                          <strong className="text-charcoal block mb-1">{d.name}</strong>
                          <div>Parameters: <span className="font-mono">{d.paramsMillions}M</span></div>
                          <div>Quality Score: <span className="font-mono font-semibold text-accent">{d.qualityScore}</span></div>
                          <div>Throughput: <span className="font-mono">{d.tokensPerSec} tok/s</span></div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Models" data={qualityVsParamsData}>
                    {qualityVsParamsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-border text-[11px] text-charcoal-muted">
              <strong>Observation:</strong> Quality peaks at 490M (Qwen2.5-0.5B). Scaling to 1.54B yields lower constitutional accuracy due to specialized domain shift.
            </div>
          </div>

          {/* Chart 2: Quality vs Latency */}
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <h3 className="font-serif text-base font-semibold text-charcoal-heading">
                Quality Score vs. Inference Latency Trade-off
              </h3>
              <span className="text-[11px] font-mono text-charcoal-muted">Speed vs Fidelity</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E1" />
                  <XAxis
                    type="number"
                    dataKey="latencySec"
                    name="Latency"
                    unit="s"
                    stroke="#71717A"
                    fontSize={11}
                    domain={[0, 8]}
                  >
                    <Label value="Avg Latency (Seconds/Query)" offset={-10} position="insideBottom" fontSize={11} fill="#71717A" />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="qualityScore"
                    name="Quality Score"
                    stroke="#71717A"
                    fontSize={11}
                    domain={[0, 0.5]}
                  >
                    <Label value="Composite Quality Score" angle={-90} position="insideLeft" fontSize={11} fill="#71717A" />
                  </YAxis>
                  <ZAxis range={[250, 450]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-border bg-surface p-2.5 shadow-card text-xs">
                          <strong className="text-charcoal block mb-1">{d.name}</strong>
                          <div>Latency: <span className="font-mono">{d.latencySec}s</span></div>
                          <div>Quality Score: <span className="font-mono font-semibold text-accent">{d.qualityScore}</span></div>
                          <div>Throughput: <span className="font-mono">{d.tokensPerSec} tok/s</span></div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Models" data={qualityVsLatencyData}>
                    {qualityVsLatencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-border text-[11px] text-charcoal-muted">
              <strong>Observation:</strong> 1.5B model generates shorter outputs resulting in lower latency, but lacks the depth and holding precision of the 0.5B model.
            </div>
          </div>
        </div>

        {/* 3 Pillars of Practical Deployment */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-background p-5 shadow-subtle">
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
              Model Size (Footprint)
            </span>
            <p className="text-xs text-charcoal-body leading-relaxed">
              At 135M and 490M parameters, models can run comfortably on consumer laptops, edge mobile hardware,
              or low-cost cloud CPUs without requiring high-end A100 VRAM allocations.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-5 shadow-subtle">
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
              Throughput & Latency
            </span>
            <p className="text-xs text-charcoal-body leading-relaxed">
              Qwen2.5-0.5B-Instruct achieves <strong>26.98 tokens/second</strong>, providing sub-second initial token delivery
              and interactive streaming suitable for legal research search assistants.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-5 shadow-subtle">
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
              Quality Return per Flop
            </span>
            <p className="text-xs text-charcoal-body leading-relaxed">
              SmolLM2-135M yielded <strong>2.10 Quality points / Billion parameters</strong>, proving that compact
              pretraining corpora provide strong syntactic foundations, provided instruction tuning is layered on top.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
