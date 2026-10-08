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
    <footer className="border-t border-border bg-surface text-charcoal-body">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Disclaimer Box */}
        <div className="rounded-xl border border-border bg-surface-subtle p-6 mb-12">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="text-xs space-y-2 leading-relaxed">
              <h4 className="font-semibold text-charcoal-heading text-sm">
                Academic & Legal Research Notice
              </h4>
              <p>
                <strong>This project is for educational and research purposes only.</strong> Model outputs may be inaccurate,
                incomplete, or outdated and must not be treated as legal advice, statutory interpretation, or official judicial doctrine.
              </p>
              <p className="text-charcoal-muted">
                Neither the authors nor the benchmark maintainers assume liability for actions taken on the basis of model inferences.
                Always consult an enrolled advocate or official Supreme Court reports for authoritative legal counsel.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border text-xs">
          {/* Col 1: Brand & Project */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-accent/20 bg-accent-light text-accent">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-serif text-base font-semibold text-charcoal-heading">
                JurisSLM
              </span>
            </div>
            <p className="text-charcoal-muted leading-relaxed">
              {project.subtitle || "Benchmarking Tiny and Small Language Models on Indian Judicial & Constitutional Precedents"}
            </p>
            <p className="text-charcoal-faint font-mono text-[11px]">
              Evaluation Timestamp: {project.timestamp || "2026-10-07 UTC"}
            </p>
          </div>

          {/* Col 2: Benchmark Models */}
          <div className="space-y-2">
            <h5 className="font-mono uppercase font-semibold text-charcoal-heading tracking-wider">
              Evaluated Models
            </h5>
            <ul className="space-y-1.5 text-charcoal-muted">
              <li>
                <a
                  href="https://huggingface.co/gyanai/ayn-88M-hf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Ayn-88M (gyanai)</span>
                  <ExternalLink className="h-3 w-3 text-charcoal-faint" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/HuggingFaceTB/SmolLM2-135M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>SmolLM2-135M (Active Fallback)</span>
                  <ExternalLink className="h-3 w-3 text-charcoal-faint" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Qwen2.5-0.5B-Instruct</span>
                  <ExternalLink className="h-3 w-3 text-charcoal-faint" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/GSMS-B/Indian-Legal-Qwen2.5-1.5B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Indian-Legal-Qwen2.5-1.5B</span>
                  <ExternalLink className="h-3 w-3 text-charcoal-faint" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Assets */}
          <div className="space-y-2">
            <h5 className="font-mono uppercase font-semibold text-charcoal-heading tracking-wider">
              Research Data & Assets
            </h5>
            <ul className="space-y-1.5 text-charcoal-muted">
              <li>
                <a
                  href={datasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <BookOpen className="h-3 w-3" />
                  <span>Indian Constitutional Dataset</span>
                </a>
              </li>
              <li>
                <a
                  href="/data/website_data.json"
                  target="_blank"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  <span>Raw Benchmark JSON (website_data.json)</span>
                </a>
              </li>
              <li>
                <a
                  href="#playground"
                  className="hover:text-accent transition-colors"
                >
                  Live Model Playground
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Capstone Details */}
          <div className="space-y-2">
            <h5 className="font-mono uppercase font-semibold text-charcoal-heading tracking-wider">
              Academic Program
            </h5>
            <p className="text-charcoal-muted">
              {project.institution || "B.Tech AI & Data Science Capstone Project"}
            </p>
            <p className="text-charcoal-muted">
              Focus: Small Language Models (SLMs) in High-Stakes Jurisprudence
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-charcoal-muted">
          <div>
            &copy; 2026 Academic Research Study. Open-source educational resource.
          </div>
          <div className="flex items-center gap-4">
            <a href="#overview" className="hover:text-accent">Overview</a>
            <a href="#results" className="hover:text-accent">Results</a>
            <a href="#playground" className="hover:text-accent">Playground</a>
            <a href="#methodology" className="hover:text-accent">Methodology</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
