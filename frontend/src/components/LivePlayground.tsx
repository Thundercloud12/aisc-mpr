"use client";

import React, { useState, useRef } from "react";
import {
  Terminal,
  Send,
  Clock,
  Check,
  Copy,
  AlertCircle,
  RotateCcw,
  Info,
  ChevronDown,
  ChevronUp,
  Cpu
} from "lucide-react";
import { ModelInferenceResult, InferenceCompareResponse } from "@/types/benchmark";

const SUGGESTED_QUERIES = [
  {
    title: "Article 21 & Personal Liberty",
    q: "How does the Supreme Court interpret the relationship between Articles 14, 19, and 21 in the Maneka Gandhi case?",
    context: "Maneka Gandhi vs Union of India, 1978 AIR 597"
  },
  {
    title: "Article 12 Definition of 'State'",
    q: "Can a government-controlled statutory corporation be deemed 'State' under Article 12, and can its employment contracts be reviewed for arbitrariness?",
    context: "Central Inland Water Transport Corp. Ltd. vs Brojo Nath Ganguly, 1986 AIR 1571"
  },
  {
    title: "Basic Structure Doctrine",
    q: "Explain whether Parliament's amending power under Article 368 can alter the fundamental judicial review powers of the Supreme Court.",
    context: "Kesavananda Bharati vs State of Kerala, (1973) 4 SCC 225"
  }
];

export function LivePlayground() {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ModelInferenceResult[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inferenceMode, setInferenceMode] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleAskModels = async () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a legal question before running inference.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          context: context.trim() || undefined
        }),
        signal: controller.signal
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      const data: InferenceCompareResponse = await res.json();
      setResults(data.results || []);
      setInferenceMode(data.inferenceMode || null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setErrorMessage(err instanceof Error ? err.message : "Failed to obtain model responses.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectSuggested = (item: typeof SUGGESTED_QUERIES[0]) => {
    setQuestion(item.q);
    setContext(item.context);
    setShowContext(true);
    setErrorMessage(null);
  };

  return (
    <section id="playground" className="border-b border-ink/20 py-16 sm:py-24 bg-paper/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="draft-stamp text-ink mb-4">
            <span className="text-safety mr-1.5 font-bold">●</span>
            <span>SECTION 04 // INTERACTIVE INFERENCE CANVAS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Live Model Playground: Query All Models
          </h2>
          <p className="mt-3 font-sans text-base text-ink-body leading-relaxed">
            Query all three small language models simultaneously in parallel. Observe architectural
            discrepancies between unaligned base foundation completions and instruction-tuned legal assistants.
          </p>
        </div>

        {/* Input Interface */}
        <div className="mt-10 rounded-2xl border border-ink bg-paper-card p-6 sm:p-8 shadow-solid technical-frame">
          {/* Suggested Prompts */}
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2.5">
              Select Curated Precedent or Input Custom Query:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelectSuggested(item)}
                  className="rounded-lg border border-ink/30 bg-paper-subtle px-3 py-1.5 font-mono text-xs text-ink hover:border-ink hover:bg-paper-muted hover:shadow-solid-sm transition-all"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Legal Question Textarea */}
          <div className="relative">
            <label htmlFor="legal-question" className="block font-mono text-xs font-bold uppercase text-ink mb-1.5">
              Legal Question / Inquiry:
            </label>
            <textarea
              id="legal-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 1000))}
              placeholder="Enter your Indian legal question (e.g. Does arbitrary termination of employment violate Article 14?)..."
              rows={3}
              className="w-full rounded-xl border border-ink bg-paper-subtle/50 p-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-blueprint focus:bg-paper-card focus:outline-none focus:ring-1 focus:ring-blueprint transition-all resize-none shadow-inner"
            />
            <div className="flex justify-between items-center mt-2 font-mono text-[11px] text-ink-muted">
              <span>Supports Constitutional Law, IPC / BNS, and Supreme Court rulings</span>
              <span>{question.length}/1000 characters</span>
            </div>
          </div>

          {/* Optional Context Dropdown */}
          <div className="mt-4 pt-4 border-t border-ink/10">
            <button
              type="button"
              onClick={() => setShowContext(!showContext)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-ink font-semibold"
            >
              <span>{showContext ? "[-] Hide Case Context" : "[+] Add Case Citation / Statutory Context"}</span>
              {showContext ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showContext && (
              <div className="mt-3">
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Ratilal Panachand Gandhi vs The State Of Bombay, 1954 AIR 388"
                  className="w-full rounded-lg border border-ink/30 bg-paper-subtle/50 px-3.5 py-2.5 font-mono text-xs text-ink placeholder:text-ink-faint focus:border-blueprint focus:outline-none focus:ring-1 focus:ring-blueprint"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 rounded-lg border border-safety bg-safety-light p-3 text-xs font-mono text-safety flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/10">
            <div className="font-mono text-xs text-ink-muted flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-safety animate-pulse" />
              <span>Parallel Query Pipeline: 3 Models</span>
            </div>

            <div className="flex items-center gap-3">
              {results && (
                <button
                  type="button"
                  onClick={() => {
                    setResults(null);
                    setQuestion("");
                    setContext("");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink/30 bg-paper-card px-3 py-2 font-mono text-xs text-ink hover:bg-paper-subtle"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleAskModels}
                disabled={loading || !question.trim()}
                className="group inline-flex items-center gap-2 rounded-xl border border-ink bg-blueprint px-5 py-2.5 font-mono text-xs font-bold text-white shadow-solid-sm transition-all hover:bg-blueprint-hover hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing Parallel Inference...</span>
                  </>
                ) : (
                  <>
                    <div className="flex h-3 w-3 items-center justify-center rounded-sm bg-safety text-[8px] text-white font-bold leading-none">
                      ▲
                    </div>
                    <span>Ask All Models</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Scanline State */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="relative overflow-hidden rounded-xl border border-ink bg-paper-card p-6 shadow-solid">
                <div className="absolute inset-x-0 h-1 bg-blueprint/40 animate-scanline pointer-events-none" />
                <div className="flex justify-between items-center pb-3 border-b border-ink/10">
                  <div className="h-4 w-24 bg-paper-muted rounded" />
                  <div className="h-3 w-16 bg-paper-muted rounded" />
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="h-3 w-full bg-paper-muted rounded" />
                  <div className="h-3 w-5/6 bg-paper-muted rounded" />
                  <div className="h-3 w-4/6 bg-paper-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Model Response Cards Grid */}
        {!loading && results && results.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h3 className="font-sans text-xl font-bold text-ink">
                Parallel Execution Output
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono font-bold border ${
                    inferenceMode === "live_backend"
                      ? "border-blueprint bg-blueprint-light text-blueprint"
                      : "border-safety bg-safety-light text-safety"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      inferenceMode === "live_backend" ? "bg-blueprint animate-pulse" : "bg-safety"
                    }`}
                  />
                  {inferenceMode === "live_backend" ? "LIVE GPU BACKEND ACTIVE" : "SIMULATED ARCHITECTURAL RUNNER"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((res, idx) => {
                const isSuccess = res.status === "success";
                const isWinner = res.modelId === "model_2";

                return (
                  <div
                    key={res.modelId || idx}
                    className={`rounded-xl border border-ink bg-paper-card p-6 shadow-solid flex flex-col justify-between transition-all ${
                      isWinner ? "ring-2 ring-blueprint" : ""
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-ink/15">
                        <span className="font-mono text-xs font-bold text-ink-muted">
                          CANDIDATE 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                          <Clock className="h-3.5 w-3.5 text-blueprint" />
                          <span>{res.latencyMs}ms</span>
                        </div>
                      </div>

                      {/* Model Title */}
                      <h4 className="mt-3 font-sans text-lg font-bold text-ink">
                        {res.modelName}
                      </h4>

                      {/* Prompt Format Tag */}
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            res.isInstruct
                              ? "bg-blueprint text-white"
                              : "border border-ink/40 bg-paper-subtle text-ink"
                          }`}
                        >
                          {res.isInstruct ? "Instruct Template (ChatML)" : "Base Completion Prefix"}
                        </span>
                      </div>

                      {/* Generated Output */}
                      <div className="mt-4 rounded-xl bg-paper-subtle p-4 border border-ink/15">
                        {isSuccess ? (
                          <p className="font-sans text-xs text-ink whitespace-pre-wrap leading-relaxed">
                            {res.answer}
                          </p>
                        ) : (
                          <div className="font-mono text-xs text-safety flex items-start gap-1.5">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{res.error || "Inference error occurred."}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-3 border-t border-ink/15 flex items-center justify-between font-mono text-xs text-ink-muted">
                      <span>
                        STATUS: <strong className={isSuccess ? "text-blueprint" : "text-safety"}>{res.status.toUpperCase()}</strong>
                      </span>
                      {isSuccess && (
                        <button
                          type="button"
                          onClick={() => handleCopy(res.answer, idx)}
                          className="inline-flex items-center gap-1 text-ink hover:text-blueprint font-bold transition-colors"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="h-3 w-3 text-blueprint" />
                              <span className="text-blueprint">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
