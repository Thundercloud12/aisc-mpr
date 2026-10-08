import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Can Small Language Models Understand Indian Law? | AI Benchmark Study",
  description:
    "A rigorous comparative study benchmarking three sub-2B parameter small language models (Ayn-88M / SmolLM2-135M, Qwen2.5-0.5B-Instruct, and Indian-Legal-Qwen2.5-1.5B) on Indian Supreme Court case precedents and constitutional jurisprudence.",
  keywords: [
    "Indian Law",
    "Small Language Models",
    "SLM Benchmark",
    "Legal AI",
    "Supreme Court of India",
    "Qwen2.5",
    "Constitutional Law",
    "NLP",
    "AI Safety"
  ],
  authors: [{ name: "AI & Data Science Academic Research Group" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-charcoal antialiased selection:bg-accent-light selection:text-accent">
        {children}
      </body>
    </html>
  );
}
