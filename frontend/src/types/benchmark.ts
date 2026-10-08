export interface ProjectInfo {
  title: string;
  subtitle: string;
  institution?: string;
  research_question?: string;
  dataset?: string;
  evaluation_samples?: number;
  timestamp?: string;
}

export interface ModelMetrics {
  exact_match?: number;
  f1_score: number;
  rouge1?: number;
  rouge2?: number;
  rougeL: number;
  semantic_similarity: number;
  factuality_proxy: number;
  quality_score: number;
  avg_latency_sec: number;
  tokens_per_second: number;
  quality_per_b_param: number;
}

export interface HallucinationDistribution {
  low_risk_pct: number;
  medium_risk_pct: number;
  high_risk_pct: number;
}

export interface ModelData {
  id: string;
  name: string;
  parameters: number;
  param_count: string;
  metrics: ModelMetrics;
  hallucination_distribution?: HallucinationDistribution;
  hf_id?: string;
  architecture?: string;
  domain?: string;
  instruction_tuned?: string;
  is_instruct?: boolean;
  type?: string;
  hidden_size?: string;
  layers?: string;
  vocab_size?: string;
  precision?: string;
  device?: string;
  hf_url?: string;
}

export interface RankingItem {
  rank: number;
  model_id: string;
  model_name: string;
  overall_score: number;
  quality_score: number;
  factuality_proxy: number;
  throughput_norm: number;
}

export interface ExampleScore {
  f1: number;
  rougeL: number;
  semantic_similarity: number;
  factuality_proxy: number;
  hallucination_risk: string;
}

export interface ExampleCase {
  category: string;
  sample_id: number;
  context: string;
  question: string;
  reference_answer: string;
  responses: Record<string, string>;
  scores: Record<string, ExampleScore>;
}

export interface ChartManifestItem {
  id: string;
  title: string;
  filename: string;
}

export interface ProjectLinks {
  dataset_url?: string;
  dataset_name?: string;
  models?: Record<string, {
    name: string;
    hf_id: string;
    url: string;
    note?: string;
  }>;
}

export interface FindingItem {
  title: string;
  metric_support: string;
  detail: string;
}

export interface QualitativeSummary {
  total_queries_evaluated?: number;
  models_evaluated?: number;
  risk_distributions?: Record<string, HallucinationDistribution>;
}

export interface BenchmarkData {
  project: ProjectInfo;
  models: ModelData[];
  rankings: RankingItem[];
  examples: ExampleCase[];
  charts: ChartManifestItem[];
  qualitative_summary?: QualitativeSummary;
  links?: ProjectLinks;
  findings?: FindingItem[];
}

export interface InferenceCompareRequest {
  question: string;
  context?: string;
}

export interface ModelInferenceResult {
  modelId: string;
  modelName: string;
  answer: string;
  latencyMs: number;
  status: "success" | "error";
  error?: string;
  isInstruct?: boolean;
  promptFormatUsed?: string;
}

export interface InferenceCompareResponse {
  results: ModelInferenceResult[];
  error?: string;
  timestamp?: string;
  inferenceMode?: "live_backend" | "local_runner" | "mock_fallback";
}
