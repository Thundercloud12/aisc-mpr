"use client";

import React, { useState, useRef } from "react";
import {
  Terminal,
  Send,
  Sparkles,
  Clock,
  Check,
  Copy,
  AlertCircle,
  ShieldAlert,
  RotateCcw,
  Info,
  ChevronDown,
  ChevronUp
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
    <section id="playground" className="border-b border-border py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-accent uppercase tracking-wider">
            <Terminal className="h-3.5 w-3.5" />
            <span>Section 04 // Interactive Inference</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-charcoal-heading">
            Live Model Playground: Ask the Models
          </h2>
          <p className="mt-4 text-base text-charcoal-body leading-relaxed">
            Query all three small language models simultaneously in parallel. Observe architectural
            discrepancies between base pretraining completions and instruction-tuned legal assistants.
          </p>
        </div>

        {/* Live Disclaimer Banner */}
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-amber-950">Important Evaluation Protocol:</strong>{" "}
            Live inference outputs are generated in real time and are{" "}
            <span className="underline font-medium">not part of the precomputed academic benchmark</span>.
            Automated factuality, F1, and hallucination scores cannot be calculated for arbitrary questions without ground-truth reference holdings.
          </div>
        </div>

        {/* Input Interface */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-card">
          {/* Suggested Prompts */}
          <div className="mb-4">
            <span className="text-xs font-medium text-charcoal-muted block mb-2">
              Select a benchmark prompt or enter your custom legal query:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelectSuggested(item)}
                  className="rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs text-charcoal-body hover:border-accent hover:text-accent hover:bg-surface transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Legal Question Textarea */}
          <div className="relative">
            <label htmlFor="legal-question" className="block text-xs font-medium text-charcoal-heading mb-1.5">
              Legal Question / Inquiry
            </label>
            <textarea
              id="legal-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 1000))}
              placeholder="Enter your Indian legal question here (e.g. Does arbitrary termination of employment violate Article 14?)..."
              rows={3}
              className="w-full rounded-lg border border-border bg-background p-3.5 text-sm text-charcoal placeholder:text-charcoal-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none"
            />
            <div className="flex justify-between items-center mt-1 text-[11px] text-charcoal-muted">
              <span>Supports Indian Constitutional Law, IPC / BNS, and Supreme Court rulings</span>
              <span className="font-mono">{question.length}/1000 characters</span>
            </div>
          </div>

          {/* Optional Context Dropdown */}
          <div className="mt-4 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setShowContext(!showContext)}
              className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal font-medium"
            >
              <span>{showContext ? "Hide Optional Context" : "Add Case Citation / Statutory Context"}</span>
              {showContext ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showContext && (
              <div className="mt-3">
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Ratilal Panachand Gandhi vs The State Of Bombay, 1954 AIR 388"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-charcoal placeholder:text-charcoal-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-charcoal-muted flex items-center gap-1.5 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>Parallel Query: 3 Models</span>
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
                  className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal px-3 py-2 rounded"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleAskModels}
                disabled={loading || !question.trim()}
                className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 text-xs font-semibold text-white shadow-subtle hover:bg-accent-hover active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Querying All 3 Models...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Ask All Models</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-xl border border-border bg-surface p-6 shadow-card animate-pulse">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div className="h-4 w-24 bg-surface-muted rounded" />
                  <div className="h-3 w-16 bg-surface-muted rounded" />
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="h-3 w-full bg-surface-muted rounded" />
                  <div className="h-3 w-5/6 bg-surface-muted rounded" />
                  <div className="h-3 w-4/6 bg-surface-muted rounded" />
                  <div className="h-3 w-full bg-surface-muted rounded" />
                </div>
                <div className="mt-6 pt-3 border-t border-border flex justify-between items-center">
                  <div className="h-3 w-20 bg-surface-muted rounded" />
                  <div className="h-3 w-12 bg-surface-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Model Response Cards Grid */}
        {!loading && results && results.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h3 className="font-serif text-lg font-medium text-charcoal-heading">
                Side-by-Side Model Responses
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium ${
                    inferenceMode === "live_backend"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      inferenceMode === "live_backend" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  {inferenceMode === "live_backend" ? "Live GPU Backend Connected" : "Offline Demo Mode (Server Offline)"}
                </span>
              </div>
            </div>

            {inferenceMode !== "live_backend" && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Local Inference Backend is Offline:</span> The local server at{" "}
                  <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">http://127.0.0.1:8000</code> is not currently responding.
                  Displaying simulated model behaviors demonstrating the structural differences between Ayn (Base), Qwen-0.5B (Instruct), and Indian-Legal-1.5B (Domain).
                  To run live token generation on real model weights, start the inference server via:{" "}
                  <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[11px]">python inference_server.py --port 8000</code>.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((res, idx) => {
                const isSuccess = res.status === "success";

                return (
                  <div
                    key={res.modelId || idx}
                    className="rounded-xl border border-border bg-surface p-6 shadow-card flex flex-col justify-between hover:border-accent/40 transition-colors"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-border">
                        <span className="font-mono text-xs font-bold text-accent">
                          Model 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                          <Clock className="h-3.5 w-3.5 text-charcoal-faint" />
                          <span className="font-mono">{res.latencyMs}ms</span>
                        </div>
                      </div>

                      {/* Model Title */}
                      <h4 className="mt-3 font-serif text-base font-semibold text-charcoal-heading">
                        {res.modelName}
                      </h4>

                      {/* Prompt Format Tag */}
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono ${
                            res.isInstruct
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {res.isInstruct ? "Instruct Template (ChatML)" : "Base Completion Prefix"}
                        </span>
                      </div>

                      {/* Generated Output */}
                      <div className="mt-4 rounded-lg bg-surface-subtle p-3.5 border border-border/80">
                        {isSuccess ? (
                          <p className="text-xs text-charcoal-body whitespace-pre-wrap leading-relaxed font-sans">
                            {res.answer}
                          </p>
                        ) : (
                          <div className="text-xs text-red-600 flex items-start gap-1.5">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{res.error || "Inference error occurred."}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs text-charcoal-muted">
                      <span className="font-mono text-[11px]">
                        Status: <strong className={isSuccess ? "text-emerald-700" : "text-red-700"}>{res.status.toUpperCase()}</strong>
                      </span>
                      {isSuccess && (
                        <button
                          type="button"
                          onClick={() => handleCopy(res.answer, idx)}
                          className="inline-flex items-center gap-1 text-charcoal-muted hover:text-accent font-medium transition-colors"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-600" />
                              <span className="text-emerald-700 font-mono text-[11px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy Answer</span>
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
