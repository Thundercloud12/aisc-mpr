import rawBenchmarkData from "@/data/website_data.json";
import { BenchmarkData, ModelData, ExampleCase } from "@/types/benchmark";

export function getBenchmarkData(): BenchmarkData {
  return rawBenchmarkData as unknown as BenchmarkData;
}

export function formatNumber(val: number | undefined | null, digits: number = 3): string {
  if (val === undefined || val === null || isNaN(val)) return "N/A";
  return val.toFixed(digits);
}

export function formatPercent(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return "N/A";
  return `${(val * 100).toFixed(1)}%`;
}

export function formatParams(params: number | undefined | null): string {
  if (!params || isNaN(params)) return "N/A";
  if (params >= 1e9) {
    return `${(params / 1e9).toFixed(2)}B`;
  }
  return `${Math.round(params / 1e6)}M`;
}

export function getModelById(id: string, data: BenchmarkData): ModelData | undefined {
  return data.models.find((m) => m.id === id);
}

export function getCuratedExample(category: string, data: BenchmarkData): ExampleCase | undefined {
  return data.examples.find((e) => e.category === category);
}
