# Can Small Language Models Understand Indian Law?
## An Empirical Study Benchmarking SLMs on Indian Judicial Precedents & Constitutional Rights

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-ee4c2c.svg)](https://pytorch.org/)
[![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-yellow.svg)](https://huggingface.co/transformers/)
[![Precision](https://img.shields.io/badge/Precision-bfloat16-brightgreen.svg)]()
[![Dataset](https://img.shields.io/badge/Dataset-Constitution--3300-orange.svg)](https://huggingface.co/datasets/nisaar/Articles_Constitution_3300_Instruction_Set)

This repository houses the complete empirical benchmark suite, experimental logs, qualitative analyses, and local inference server for the academic capstone research study:

> **"Can Small Language Models Understand Indian Law? An Empirical Study Benchmarking SLMs on Indian Judicial Precedents & Constitutional Rights"**

---

## 1. Executive Summary & Research Thesis

### Research Question
*How do tiny base causal language models, compact general-purpose instruction SLMs, and domain fine-tuned legal models compare when answering grounded legal and constitutional questions based on Indian Supreme Court precedents?*

### The Evaluated Cohort (<2B Parameters)
1. **SmolLM2-135M** *(Ayn-88M Fallback)*: Base Pretrained Causal Foundation Model (135M params)
2. **Qwen2.5-0.5B-Instruct**: General-Purpose Compact Instruction SLM (490M params)
3. **Indian-Legal-Qwen2.5-1.5B**: Domain Fine-Tuned SLM Specialized on Indian Statutory Law (1.54B params)

### Core Empirical Discoveries
* **Instruction Alignment Beats Sheer Parameter Scale:** `Qwen2.5-0.5B-Instruct` ranked **#1 overall** (Composite Score: **0.5750**, Quality Score: **0.3690**, Semantic Similarity: **0.6211**), outperforming the 3× larger `Indian-Legal-Qwen2.5-1.5B` model across all reasoning fidelity metrics.
* **Narrow Statutory Specialization Causes Doctrinal Drift:** `Indian-Legal-Qwen2.5-1.5B` was fine-tuned primarily on statutory criminal reform (Bharatiya Nyaya Sanhita / BNS 2023). When tested on multi-doctrine Supreme Court constitutional jurisprudence (Articles 14, 19, 21), it suffered from catastrophic forgetting, generating terse penal completions with lower lexical recall (Token F1: **0.1000**).
* **High Efficiency in Sub-0.5B Footprints:** `SmolLM2-135M` achieved **2.10 Quality points per Billion parameters**, establishing that tiny architectures retain strong syntactic foundations for edge execution when combined with structured prompting.
* **Throughput Viability for Edge Hardware:** `Qwen2.5-0.5B-Instruct` achieved sustained throughput of **26.98 tokens/second** on consumer GPU hardware, enabling private, localized deployment for advocates and court assistance with zero cloud data transmission.

---

## 2. Architectural Cohort Specifications

| Attribute | Candidate 01: SmolLM2-135M | Candidate 02: Qwen2.5-0.5B-Instruct | Candidate 03: Indian-Legal-Qwen2.5-1.5B |
| :--- | :--- | :--- | :--- |
| **Model ID** | `HuggingFaceTB/SmolLM2-135M` | `Qwen/Qwen2.5-0.5B-Instruct` | `GSMS-B/Indian-Legal-Qwen2.5-1.5B` |
| **Active Parameters** | **135,000,000 (135M)** | **490,000,000 (490M)** | **1,540,000,000 (1.54B)** |
| **Model Paradigm** | Base Causal LM (Pretrained) | Instruction-Tuned SLM | Domain Fine-Tuned SLM |
| **Architecture** | `LlamaForCausalLM` | `Qwen2ForCausalLM` | `Qwen2ForCausalLM` |
| **Domain Scope** | General Pretrained Foundation | General-Purpose Instruct | Indian Legal Statutory Reform |
| **Instruction Tuning** | No (Base Completion) | Yes (Supervised + RLHF) | Yes (Domain Fine-Tuned) |
| **Hidden Size** | 576 | 896 | 1536 |
| **Transformer Layers** | 30 | 24 | 28 |
| **Vocabulary Size** | 49,152 | 151,936 | 151,936 |
| **Context Window** | 1,024 Tokens | 1,024 Tokens | 1,024 Tokens |
| **Prompt Paradigm** | Zero-shot Case Prefix | ChatML (`<|im_start|>`) | ChatML (`<|im_start|>`) |
| **Execution Precision** | `bfloat16` / `float16` | `bfloat16` / `float16` | `bfloat16` / `float16` |
| **Device Target** | CUDA GPU / Local CPU | CUDA GPU / Local CPU | CUDA GPU / Local CPU |

*Note: `Ayn-88M` (`gyanai/ayn-88M-hf`) requires restricted access tokens; `SmolLM2-135M` serves as the fully open, reproducible base foundation benchmark equivalent.*

---

## 3. Benchmarking Dataset & Evaluation Protocol

### Dataset Source & Coverage
* **Corpus:** Sourced from [`nisaar/Articles_Constitution_3300_Instruction_Set`](https://huggingface.co/datasets/nisaar/Articles_Constitution_3300_Instruction_Set).
* **Doctrinal Scope:** Landmark Supreme Court judgments focusing on Part III Fundamental Rights:
  * **Article 12:** Definition of 'State', instrumentality doctrine, statutory corporations (*Ramana Dayaram Shetty*, *Brojo Nath Ganguly*).
  * **Article 14:** Equality before law, protection against arbitrariness, reasonable classification doctrine (*Royappa*, *Maneka Gandhi*).
  * **Article 15:** Prohibition of discrimination, protective discrimination, affirmative action.
  * **Article 19:** Fundamental freedoms (speech, association, movement) and reasonable restrictions under Article 19(2)–(6).
  * **Article 21:** Protection of life and personal liberty, substantive due process, human dignity, right to privacy (*Maneka Gandhi*, *Sunil Batra*, *Puttaswamy*).

### Held-Out Partitioning (Zero Memorization Leakage)
* An 80/20 train/test split was strictly partitioned locked to `random_state=42`.
* **50 held-out judicial queries** were sampled across easy, medium, difficult, and doctrinal divergence categories.
* Context fields were capped at 1,024 characters; queries < 10 characters or reference answers < 20 characters were pruned.

### Generation Hyperparameters
To ensure deterministic, reproducible legal outputs and restrict creative hallucination drift:
```json
{
  "max_new_tokens": 160,
  "temperature": 0.20,
  "top_p": 0.90,
  "repetition_penalty": 1.15,
  "do_sample": true,
  "seed": 42
}
```

---

## 4. Comprehensive Benchmark Results & Official Leaderboard

### Official Academic Leaderboard (n = 50 Held-Out Constitutional Precedents)

| Rank | Model Name | Parameters | Token F1 | ROUGE-1 | ROUGE-2 | ROUGE-L | Semantic Sim | Factuality Proxy | Quality Score | Tokens/Sec | Avg Latency | Quality / B-Param | Overall Score |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **#1** | **Qwen2.5-0.5B-Instruct** | **490M** | **0.2998** | **0.2998** | **0.0959** | **0.1861** | **0.6211** | **0.5618** | **0.3690** | **26.98** | **5.925s** | 0.75 | **0.5750** |
| **#2** | **SmolLM2-135M (Ayn Fallback)** | **135M** | 0.2556 | 0.2556 | 0.0493 | 0.1465 | 0.4478 | 0.4278 | 0.2833 | 22.48 | 6.998s | **2.10** | **0.4569** |
| **#3** | **Indian-Legal-Qwen2.5-1.5B** | **1.54B** | 0.1000 | 0.1001 | 0.0120 | 0.0708 | 0.3070 | 0.2339 | 0.1593 | 21.91 | 3.059s | 0.10 | **0.3412** |

*All evaluated runs completed with a **100.0% Success Rate** and **0 generation errors**.*

---

### Detailed Breakdown of Metric Dimensions

#### 1. Lexical Alignment Metrics
* **Token F1:** Evaluates harmonic mean of precision and recall between generated and reference tokens.
  * `Qwen2.5-0.5B`: **0.2998** (+17.3% over 135M, +199.8% over 1.5B)
  * `SmolLM2-135M`: **0.2556**
  * `Indian-Legal-1.5B`: **0.1000**
* **ROUGE-1 / ROUGE-2 / ROUGE-L:** Evaluates unigram, bigram, and longest common subsequence recall.
  * Qwen2.5-0.5B achieves highest n-gram overlap (**0.0959** ROUGE-2, **0.1861** ROUGE-L), demonstrating superior legal phrase synthesis.

#### 2. Semantic Similarity (`all-MiniLM-L6-v2`)
* Computed via cosine similarity of dense SentenceTransformer vector embeddings against authoritative Supreme Court holdings.
  * `Qwen2.5-0.5B`: **0.6211** (Strong doctrinal alignment with ratio decidendi)
  * `SmolLM2-135M`: **0.4478**
  * `Indian-Legal-1.5B`: **0.3070** (Frequently drifted to unrelated penal statutes)

#### 3. Factuality Proxy & Hallucination Risk Classification
An automated heuristic evaluating legal entity retention and vector alignment:
$$\text{Factuality Proxy} = 0.50 \times \text{Cosine Sim} + 0.50 \times \text{Legal Entity Retention}$$

Answers are classified into three risk tiers:
* **Low Risk** ($\text{Proxy} \ge 0.65$): High semantic fidelity, accurate statutory references.
* **Medium Risk** ($0.40 \le \text{Proxy} < 0.65$): Partially grounded holding, missing citations.
* **High Risk** ($\text{Proxy} < 0.40$): Hallucinated doctrines or severe doctrinal drift.

| Model Candidate | Low Risk (%) | Medium Risk (%) | High Risk (%) | Primary Risk Driver |
| :--- | :---: | :---: | :---: | :--- |
| **Qwen2.5-0.5B-Instruct** | **28.0%** | **56.0%** | **16.0%** | Minor omission of secondary citations |
| **SmolLM2-135M** | 12.0% | 40.0% | 48.0% | Repetition loops & prompt header echoing |
| **Indian-Legal-Qwen2.5-1.5B** | 0.0% | 10.0% | **90.0%** | Out-of-distribution statutory drift (BNSS/BNS injection) |

#### 4. Throughput, Latency & Parameter Efficiency
* **Throughput (Tokens/Second):**
  * `Qwen2.5-0.5B-Instruct`: **26.98 tok/s** (Fastest sustained generation)
  * `SmolLM2-135M`: **22.48 tok/s**
  * `Indian-Legal-1.5B`: **21.91 tok/s**
* **Parameter Efficiency ($\text{Quality Score} / \text{Billion Parameters}$):**
  * `SmolLM2-135M`: **2.10 pts/B-param** (Highest return per floating-point weight)
  * `Qwen2.5-0.5B-Instruct`: **0.75 pts/B-param**
  * `Indian-Legal-1.5B`: **0.10 pts/B-param**

#### 5. Multi-Criteria Composite Ranking Formula
$$\text{Overall Score} = 0.50 \times \text{Quality Score} + 0.25 \times \text{Factuality Proxy} + 0.25 \times \left(\frac{\text{Throughput}}{\text{Max Throughput}}\right)$$
* `Qwen2.5-0.5B-Instruct`: $0.50(0.3690) + 0.25(0.5618) + 0.25(1.000) = \mathbf{0.5750}$ (**Rank 1**)
* `SmolLM2-135M`: $0.50(0.2833) + 0.25(0.4278) + 0.25(0.8332) = \mathbf{0.4569}$ (**Rank 2**)
* `Indian-Legal-1.5B`: $0.50(0.1593) + 0.25(0.2339) + 0.25(0.8121) = \mathbf{0.3412}$ (**Rank 3**)

---

## 5. In-Depth Qualitative Error Taxonomy

Our empirical evaluation identified four systematic failure modes across small language models:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   QUALITATIVE FAILURE TAXONOMY                         │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Contextual Omission         │ Identifies doctrine but omits         │
│                                │ specific Articles or tests.           │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Doctrinal Drift             │ Conflates precedents (e.g.            │
│                                │ Kesavananda vs Golaknath).            │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Run-On & Repetition         │ Loops prompt headers; lacks ChatML    │
│                                │ stop tokens (prevalent in Base 135M). │
├────────────────────────────────┼───────────────────────────────────────┤
│ 4. Statutory Misalignment      │ Inappropriately injects criminal penal│
│                                │ sections into constitutional queries. │
└────────────────────────────────┴───────────────────────────────────────┘
```

1. **Contextual Omission (Prevalent in 135M & 1.5B):**
   * The model acknowledges high-level unfairness or arbitrary state action, but omits foundational constitutional anchors (e.g., failing to name Article 14 or the unconscionability test under Section 23 of the Indian Contract Act).
2. **Doctrinal Drift & Precedent Conflation (Prevalent in 1.5B):**
   * Attributing doctrine to the wrong precedent (e.g., claiming *Article 21* contains an absolute right to property, disregarding the 44th Constitutional Amendment of 1978).
3. **Run-on Continuation & Prompt Echoing (Prevalent in SmolLM2-135M Base):**
   * Because base causal models are trained strictly for next-token completion without RLHF/instruction alignment, they frequently loop header tokens (`"Indian Legal Case Precedents:"`) after completing substantive sentences.
4. **Statutory Misalignment (Observed in Indian-Legal-1.5B):**
   * The 1.5B domain model frequently hallucinated citations to the newly passed Bharatiya Nyaya Sanhita (BNS) and Bharatiya Nagarik Suraksha Sanhita (BNSS) when answering civil, corporate, or constitutional writ petitions.

---

## 6. Representative Case Studies (Side-by-Side Outputs)

### Case Study 01: *Central Inland Water Transport Corp. Ltd. vs Brojo Nath Ganguly (1986 AIR 1571)*
* **Issue:** Can a government statutory corporation arbitrarily terminate permanent employees under Service Rule 9(i) without hearing, and does it violate Article 14?
* **Authoritative Holding:** Service Rule 9(i) is unconstitutional and void under Article 14. An arbitrary termination clause without reasons violates natural justice; government corporations qualify as 'State' under Article 12.
* **Model 1 (SmolLM2-135M Base):**
  > *"The Supreme Court held that the service rule was constitutional because it did not violate the principle of equal protection... [Run-on continuation with discussion questions]"* (Inverse holding hallucination).
* **Model 2 (Qwen2.5-0.5B-Instruct):**
  > *"Under Article 14, arbitrary state action is impermissible. The Supreme Court struck down the termination clause, holding that government corporations under public functions qualify as 'State' under Article 12 and must respect principles of natural justice."* (Factual, structured, doctrinally sound).
* **Model 3 (Indian-Legal-Qwen2.5-1.5B):**
  > *"The court finds the fundamental right outweighed by administrative stability for public servants. [Source: Section 300, BNSS]"* (Hallucinated statutory criminal reference to BNSS for a civil constitutional employment dispute).

---

### Case Study 02: *Sunil Batra vs Delhi Administration ((1980) 3 SCC 488)*
* **Issue:** Rights of prisoners against solitary confinement and bar fetters under Article 21.
* **Authoritative Holding:** Fundamental rights under Article 21 do not flee the person when convicted. Cruel punishment, solitary confinement without judicial order, and inhuman prison conditions violate substantive liberty and human dignity.
* **Model 2 (Qwen2.5-0.5B-Instruct):**
  > *"The Supreme Court held that prisoners retain their fundamental rights under Article 21, establishing that excessive restraints and solitary confinement require strict judicial oversight."* (Accurately captures prisoner dignity doctrine).
* **Model 3 (Indian-Legal-Qwen2.5-1.5B):**
  > *"Applies provisions of Section 105 BNSS 2023 regarding divorce decrees."* (Severe failure mode: injected family law divorce clauses into a prison reform habeas corpus holding).

---

## 7. Practical Deployment & Engineering Guidance

Based on our empirical findings, we offer three recommendations for legal NLP practitioners, edge AI engineers, and judiciary tech researchers:

1. **Deploy Generalist 0.5B Instruction SLMs for Edge Assisting:**
   * For privacy-preserving advocate notebooks, legal aid clinics, and edge court kiosks, **`Qwen2.5-0.5B-Instruct` is the recommended model**. It requires minimal VRAM (<1GB in bfloat16), runs on ordinary CPUs, delivers 27 tokens/s, and provides the highest factual adherence.
2. **Avoid Narrow Statutory Silos in Domain Fine-Tuning:**
   * Fine-tuning exclusively on specific statutory enactments (such as BNS/BNSS criminal codes) degrades broad constitutional reasoning. Legal fine-tuning datasets must be curated with balanced representations of Constitutional Law, Supreme Court Reports (SCR), and procedural statutes.
3. **Adopt Hybrid Dense Retrieval (RAG):**
   * Sub-2B parameter models cannot memorize 75+ years of Indian case law. The definitive architecture for production legal systems is **pairing compact 0.5B SLMs with dense vector retrieval over indexed Supreme Court judgment repositories** to ground citations and eliminate hallucinations.

---

## 8. Experimental Reproducibility & Pipeline Execution

### Repository File Structure
```
aisc-mpr/
├── Comparative_Study_of_SLMs_on_Indian_Legal_Data_v1.ipynb  # Google Colab benchmark notebook
├── README.md                                                 # Research benchmark documentation
├── data/
│   └── website_data.json                                     # Benchmark data payload
├── indian_legal_slm_results/                                 # Official experimental results
│   ├── charts/                                               # Publication figures (.png)
│   │   ├── f1_comparison.png
│   │   ├── rouge_comparison.png
│   │   ├── latency_comparison.png
│   │   ├── parameter_comparison.png
│   │   ├── quality_vs_parameters.png
│   │   └── quality_vs_latency.png
│   ├── evaluation_dataset.csv                                # 50 held-out constitutional query samples
│   ├── example_comparisons.csv                               # Side-by-side model outputs & scores
│   ├── experiment_config.json                                # Experimental generation configuration
│   ├── final_rankings.csv                                    # Master leaderboard rankings & composite scores
│   ├── metrics.json                                          # Machine-readable metric JSON
│   ├── model_metadata.csv                                    # Architectural specifications for each model
│   ├── model_summary.csv                                     # Aggregated performance summary
│   ├── qualitative_analysis.csv                              # Full per-sample outputs, risk scores & holdings
│   ├── raw_results.csv                                       # Raw per-sample token & latency logs
│   ├── raw_results.json                                      # Raw JSON inference logs
│   └── raw_results_checkpoint_model_*.csv                    # Sequential checkpoint logs per model
└── backend/
    └── inference_server.py                                   # Local GPU/CPU PyTorch inference server
```

### Reproducing via Google Colab / Jupyter Notebook
1. Open [`Comparative_Study_of_SLMs_on_Indian_Legal_Data_v1.ipynb`](./Comparative_Study_of_SLMs_on_Indian_Legal_Data_v1.ipynb) in Google Colab (with a GPU runtime).
2. Execute Cells 1 through 21 sequentially:
   * **Sections 1–4:** Hardware diagnostics and model verification.
   * **Sections 5–8:** Dataset extraction, preprocessing, and 80/20 held-out splitting.
   * **Sections 9–10:** Sequential benchmark inference with VRAM memory purging between checkpoints.
   * **Sections 11–14:** Multi-dimensional metric calculation (Token F1, ROUGE-1/2/L, MiniLM cosine similarity).
   * **Sections 15–18:** Chart rendering and multi-criteria ranking formulation.
   * **Sections 19–20:** Exporting `website_data.json` and zipped results directory.

---

## 9. Local Model Inference Server (`backend/inference_server.py`)

A lightweight Python HTTP server is provided to execute parallel live model inference locally on CUDA GPU or CPU:

### Prerequisites
```bash
pip install torch transformers accelerate
```

### Starting the Server
```bash
cd backend
python inference_server.py --port 8000
```
* **Endpoint:** `POST http://127.0.0.1:8000/api/compare`
* **Device Selection:** Automatically selects `cuda` with `bfloat16` if an NVIDIA GPU is present; gracefully falls back to `cpu` with `float32`.
* **Prompt Adaptation:** Dynamically applies ChatML templates for instruct models and case-precedent headers for base models.

### API Protocol

#### Request (`POST /api/compare`)
```json
{
  "question": "Does an arbitrary employment termination clause violate Article 14?",
  "context": "Central Inland Water Transport Corp. Ltd. vs Brojo Nath Ganguly, 1986 AIR 1571"
}
```

#### Response
```json
{
  "results": [
    {
      "modelId": "model_1",
      "modelName": "SmolLM2-135M (Ayn Fallback)",
      "answer": "The Supreme Court applied a broad interpretation of 'State' under Article 12...",
      "latencyMs": 950,
      "status": "success",
      "isInstruct": false
    },
    {
      "modelId": "model_2",
      "modelName": "Qwen2.5-0.5B-Instruct",
      "answer": "Under Article 14 of the Indian Constitution, arbitrary state action is impermissible...",
      "latencyMs": 1420,
      "status": "success",
      "isInstruct": true
    },
    {
      "modelId": "model_3",
      "modelName": "Indian-Legal-Qwen2.5-1.5B",
      "answer": "In accordance with Indian statutory and constitutional doctrine...",
      "latencyMs": 2150,
      "status": "success",
      "isInstruct": true
    }
  ],
  "timestamp": 1728394422.0
}
```

---

## 10. Academic Citation & Research Disclaimer

### Research Disclaimer
```text
This benchmark is conducted exclusively for academic machine learning research as part
of a B.Tech AI & Data Science Capstone Project. Model inferences may contain inaccuracies,
omissions, or hallucinations and must not be treated as professional legal counsel,
statutory advice, or binding judicial doctrine. Always consult the official Supreme Court
Reports (SCR) or an enrolled advocate for authoritative legal counsel.
```

### Suggested Citation
```bibtex
@misc{juris_slm_benchmark_2026,
  title={Can Small Language Models Understand Indian Law? An Empirical Study Benchmarking SLMs on Indian Judicial Precedents & Constitutional Rights},
  author={AI & Data Science Capstone Research Group},
  year={2026},
  howpublished={\url{https://github.com/Thundercloud12/aisc-mpr}},
  note={Empirical study evaluating sub-2B parameter SLMs on Indian Constitutional Law}
}
```
