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
import { Zap, Activity, Cpu, Scale } from "lucide-react";
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

  const colors = ["#1A1A1A", "#0B43DC", "#FF4D2D"];

  return (
    <section id="efficiency" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-blueprint mr-1.5 font-bold">●</span>
            <span>SECTION 07 // OPERATIONAL PARETO FRONTIER</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Operational Efficiency & Trade-off Frontiers
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            In edge legal systems, larger parameter count does not automatically ensure higher legal accuracy.
            We map empirical Pareto curves balancing parameter weight, execution latency, and reasoning fidelity.
          </p>
        </div>

        {/* 2 Interactive Scatter Charts */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Quality vs Parameters */}
          <div className="rounded-2xl border border-ink bg-paper-card p-6 shadow-solid technical-frame">
            <div className="flex items-center justify-between pb-3 border-b border-ink/15 mb-4">
              <h3 className="font-sans text-base font-bold text-ink">
                Quality Score vs. Parameter Scale
              </h3>
              <span className="font-mono text-[11px] text-blueprint font-bold">[0.5B SWEET SPOT]</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.08)" />
                  <XAxis
                    type="number"
                    dataKey="paramsMillions"
                    name="Parameters (M)"
                    unit="M"
                    stroke="#1A1A1A"
                    fontSize={11}
                    domain={[0, 1600]}
                    fontFamily="Space Mono"
                  >
                    <Label value="Parameter Count (Millions)" offset={-10} position="insideBottom" fontSize={11} fill="#1A1A1A" fontFamily="Space Mono" />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="qualityScore"
                    name="Quality Score"
                    stroke="#1A1A1A"
                    fontSize={11}
                    domain={[0, 0.5]}
                    fontFamily="Space Mono"
                  >
                    <Label value="Quality Score" angle={-90} position="insideLeft" fontSize={11} fill="#1A1A1A" fontFamily="Space Mono" />
                  </YAxis>
                  <ZAxis range={[300, 500]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-ink bg-paper-card p-3 shadow-solid-sm text-xs font-mono">
                          <strong className="text-ink font-bold block mb-1 font-sans">{d.name}</strong>
                          <div>Parameters: <span className="font-bold">{d.paramsMillions}M</span></div>
                          <div>Quality: <strong className="text-blueprint">{d.qualityScore}</strong></div>
                          <div>Throughput: <span>{d.tokensPerSec} tok/s</span></div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Models" data={qualityVsParamsData}>
                    {qualityVsParamsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#1A1A1A" strokeWidth={1} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[11px] text-ink-muted">
              <strong>Empirical Takeaway:</strong> Reasoning quality peaks at 490M (Qwen2.5-0.5B). Scaling to 1.54B degraded general constitutional accuracy due to narrow statutory domain shift.
            </div>
          </div>

          {/* Chart 2: Quality vs Latency */}
          <div className="rounded-2xl border border-ink bg-paper-card p-6 shadow-solid technical-frame">
            <div className="flex items-center justify-between pb-3 border-b border-ink/15 mb-4">
              <h3 className="font-sans text-base font-bold text-ink">
                Quality Score vs. Latency Trade-off
              </h3>
              <span className="font-mono text-[11px] text-ink-muted font-bold">[SPEED VS FIDELITY]</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,26,0.08)" />
                  <XAxis
                    type="number"
                    dataKey="latencySec"
                    name="Latency"
                    unit="s"
                    stroke="#1A1A1A"
                    fontSize={11}
                    domain={[0, 8]}
                    fontFamily="Space Mono"
                  >
                    <Label value="Avg Latency (Seconds/Query)" offset={-10} position="insideBottom" fontSize={11} fill="#1A1A1A" fontFamily="Space Mono" />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="qualityScore"
                    name="Quality Score"
                    stroke="#1A1A1A"
                    fontSize={11}
                    domain={[0, 0.5]}
                    fontFamily="Space Mono"
                  >
                    <Label value="Quality Score" angle={-90} position="insideLeft" fontSize={11} fill="#1A1A1A" fontFamily="Space Mono" />
                  </YAxis>
                  <ZAxis range={[300, 500]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-ink bg-paper-card p-3 shadow-solid-sm text-xs font-mono">
                          <strong className="text-ink font-bold block mb-1 font-sans">{d.name}</strong>
                          <div>Latency: <span>{d.latencySec}s</span></div>
                          <div>Quality: <strong className="text-blueprint">{d.qualityScore}</strong></div>
                          <div>Throughput: <span>{d.tokensPerSec} tok/s</span></div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Models" data={qualityVsLatencyData}>
                    {qualityVsLatencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#1A1A1A" strokeWidth={1} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[11px] text-ink-muted">
              <strong>Empirical Takeaway:</strong> 1.5B generates terse completions with faster single-pass time, but omits ratio decidendi analysis delivered by the 0.5B instruct model.
            </div>
          </div>
        </div>

        {/* 3 Pillars of Practical Deployment */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-ink bg-paper-card p-5 shadow-solid-sm">
            <span className="font-mono text-xs font-bold text-blueprint uppercase tracking-wider block mb-2">
              01 // Parameter Footprint
            </span>
            <p className="font-sans text-xs text-ink-body leading-relaxed">
              At 135M and 490M parameters, these models execute smoothly on consumer laptops, advocate workstations,
              or edge mobile devices with zero external cloud dependencies.
            </p>
          </div>

          <div className="rounded-xl border border-ink bg-paper-card p-5 shadow-solid-sm">
            <span className="font-mono text-xs font-bold text-safety uppercase tracking-wider block mb-2">
              02 // Throughput & Interactivity
            </span>
            <p className="font-sans text-xs text-ink-body leading-relaxed">
              Qwen2.5-0.5B-Instruct achieves <strong>26.98 tokens/second</strong>, delivering instant token generation
              suitable for real-time legal research and statutory search assistants.
            </p>
          </div>

          <div className="rounded-xl border border-ink bg-paper-card p-5 shadow-solid-sm">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider block mb-2">
              03 // Return per Flop
            </span>
            <p className="font-sans text-xs text-ink-body leading-relaxed">
              SmolLM2-135M yields <strong>2.10 Quality pts / Billion parameters</strong>, proving that compact
              foundations offer high operational utility when paired with targeted instruction alignment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
