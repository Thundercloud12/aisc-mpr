import React from "react";
import { getBenchmarkData } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BenchmarkOverview } from "@/components/BenchmarkOverview";
import { ModelComparison } from "@/components/ModelComparison";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { LivePlayground } from "@/components/LivePlayground";
import { ExampleComparison } from "@/components/ExampleComparison";
import { ErrorAnalysis } from "@/components/ErrorAnalysis";
import { EfficiencyAnalysis } from "@/components/EfficiencyAnalysis";
import { Methodology } from "@/components/Methodology";
import { Findings } from "@/components/Findings";
import { Conclusion } from "@/components/Conclusion";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const benchmarkData = getBenchmarkData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero data={benchmarkData} />

        {/* 3. Benchmark Overview */}
        <BenchmarkOverview data={benchmarkData} />

        {/* 4. Model Comparison */}
        <ModelComparison data={benchmarkData} />

        {/* 5. Results Dashboard */}
        <ResultsDashboard data={benchmarkData} />

        {/* 6. Live Model Playground */}
        <LivePlayground />

        {/* 7. Example Comparison */}
        <ExampleComparison data={benchmarkData} />

        {/* 8. Error / Disagreement Analysis */}
        <ErrorAnalysis data={benchmarkData} />

        {/* 9. Efficiency Analysis */}
        <EfficiencyAnalysis data={benchmarkData} />

        {/* 10. Methodology */}
        <Methodology />

        {/* 11. Findings */}
        <Findings data={benchmarkData} />

        {/* 12. Conclusion */}
        <Conclusion />
      </main>

      {/* 13. Footer */}
      <Footer data={benchmarkData} />
    </div>
  );
}
