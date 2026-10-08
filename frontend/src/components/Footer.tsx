"use client";

import React from "react";
import { Scale, ShieldAlert, ExternalLink, Github, BookOpen, Download } from "lucide-react";
import { BenchmarkData } from "@/types/benchmark";

interface FooterProps {
  data: BenchmarkData;
}

export function Footer({ data }: FooterProps) {
  const links = data.links || {};
  const datasetUrl = links.dataset_url || "https://huggingface.co/datasets/nisaar/Articles_Constitution_3300_Instruction_Set";
  const project = data.project;

  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white border-t border-ink/40 pt-16 pb-12">
      {/* Giant Background Watermark Text (Illoca Signature Background Typography) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden select-none opacity-[0.035] leading-none">
        <span className="block text-[14vw] font-bold tracking-tighter text-white whitespace-nowrap">
          JURISPRUDENCE®
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Research Disclaimer Notice */}
        <div className="rounded-2xl border border-white/15 bg-navy-card/80 p-6 mb-14 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-safety/30 bg-safety/10 text-safety shrink-0 mt-0.5">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div className="text-xs space-y-1.5 leading-relaxed font-sans">
              <h4 className="font-bold text-white font-mono uppercase tracking-wider text-xs">
                Academic Research & Judicial Notice
              </h4>
              <p className="text-white/80">
                <strong>This benchmark is conducted exclusively for academic machine learning research.</strong> Model outputs may contain inaccuracies, hallucinations, or omissions and must not be construed as legal counsel, judicial advice, or binding statutory interpretation.
              </p>
              <p className="text-white/50 font-mono text-[11px]">
                Always consult the Supreme Court Reports (SCR), official statutory gazettes, or an enrolled advocate for authoritative legal counsel.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-xs font-mono">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-white/30 bg-blueprint text-white">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-sans text-base font-bold text-white">
                JurisSLM
              </span>
            </div>
            <p className="font-sans text-white/70 text-xs leading-relaxed">
              Judicial AI benchmarking at the speed of thought, not parameter bloat.
            </p>
            <p className="text-white/40 text-[10px]">
              RUN TIMESTAMP: {project.timestamp || "2026-10-07 UTC"}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-safety uppercase font-bold tracking-wider text-[11px]">
              Quick links
            </h5>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  01 // Overview
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-white transition-colors">
                  02 // Model Cohort
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  03 // Benchmark Results
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-white transition-colors">
                  04 // Live Playground
                </a>
              </li>
              <li>
                <a href="#examples" className="hover:text-white transition-colors">
                  05 // Case Studies
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">
                  06 // Research Manifesto
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Evaluated Models */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-safety uppercase font-bold tracking-wider text-[11px]">
              Candidate Models
            </h5>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="https://huggingface.co/HuggingFaceTB/SmolLM2-135M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>SmolLM2-135M (Ayn Base)</span>
                  <ExternalLink className="h-3 w-3 text-white/40" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span className="text-white font-bold">Qwen2.5-0.5B-Instruct (#1)</span>
                  <ExternalLink className="h-3 w-3 text-white/40" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/GSMS-B/Indian-Legal-Qwen2.5-1.5B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Indian-Legal-Qwen2.5-1.5B</span>
                  <ExternalLink className="h-3 w-3 text-white/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Data & Connect */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-safety uppercase font-bold tracking-wider text-[11px]">
              Data & Artifacts
            </h5>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href={datasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Constitution-3300 Dataset</span>
                  <ExternalLink className="h-3 w-3 text-white/40" />
                </a>
              </li>
              <li>
                <a
                  href="#playground"
                  className="hover:text-white transition-colors"
                >
                  Local Python API (Port 8000)
                </a>
              </li>
              <li>
                <span className="text-white/40">B.Tech Capstone Project 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & License Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-white/50">
          <div>
            Copyright &copy; 2026 JurisSLM Project. Open Academic & Research Study.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
