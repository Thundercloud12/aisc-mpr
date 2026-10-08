# Can Small Language Models Understand Indian Law?
## An Empirical Study Benchmarking SLMs on Indian Judicial Precedents & Constitutional Rights

This repository houses the research benchmark suite and interactive web presentation for the capstone project:
**"Can Small Language Models Understand Indian Law?"**

The study evaluates three small language model (<2B parameter) paradigms on grounded Indian legal question answering:
1. **Ayn-88M / SmolLM2-135M**: Base Causal Language Model (Pretrained Foundation)
2. **Qwen2.5-0.5B-Instruct**: Compact General-Purpose Instruction SLM
3. **Indian-Legal-Qwen2.5-1.5B**: Domain Fine-Tuned SLM (Specialized on Indian statutory law)

---

## 1. Quick Start (Website)

### Prerequisites
- Node.js `v18+` (v20+ recommended)
- npm or yarn or pnpm

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 2. Providing Benchmark Data (`website_data.json`)

The application is completely data-driven and does not hardcode benchmark scores. All charts, metric tables, rankings, and case studies read dynamically from:
- `data/website_data.json`
- `public/data/website_data.json`

### Updating with New Colab Execution Runs
When running the Google Colab benchmark notebook (`Comparative_Study_of_SLMs_on_Indian_Legal_Data.ipynb`), the notebook exports:
- `indian_legal_slm_results/website_data.json`
- `indian_legal_slm_results/charts/*.png`

Simply copy the newly generated files to update the website:
```bash
cp indian_legal_slm_results/website_data.json data/website_data.json
cp indian_legal_slm_results/website_data.json public/data/website_data.json
cp indian_legal_slm_results/charts/*.png public/charts/
```

---

## 3. Live Model Playground & Inference Architecture

The website features an interactive **"Ask the Models"** playground allowing users to input arbitrary legal questions and compare parallel outputs across all three models.

### Difference Between Benchmark Mode and Live Inference
* **Benchmark Results (Static / Evaluated)**:
  Computed on a strictly held-out test split of 50 Indian Constitutional precedents with known ground-truth holdings. Evaluated across Token F1, ROUGE-L, MiniLM semantic similarity, and lexical overlap.
* **Live Inference (Dynamic / Playground)**:
  Runs in real time on arbitrary user queries. Because no ground truth judicial holding exists for custom input, **no automated correctness or hallucination scores are computed**.

---

## 4. Running Model Inference Locally

You can run model inference directly on your local machine using our included Python inference server:

### Step 1: Install Python Requirements
```bash
pip install torch transformers accelerate
```

### Step 2: Start the Local Inference Server
```bash
python inference_server.py --port 8000
```
This launches a lightweight local HTTP server on `http://127.0.0.1:8000` listening for `POST /api/compare`.
- Automatically utilizes CUDA GPU acceleration if available (e.g. NVIDIA GPU with `bfloat16` or `float16`).
- Gracefully falls back to CPU execution if no GPU is detected.

### Step 3: Configure Next.js Environment
Create a `.env.local` file in the root directory:
```bash
INFERENCE_API_URL=http://127.0.0.1:8000/api/compare
```
When you click **"Ask All Models"** on the website, Next.js will proxy requests to your local Python server running the real Hugging Face models in parallel.

---

## 5. Inference API Protocol (`POST /api/compare`)

Any external inference provider (FastAPI, vLLM, Hugging Face Inference Endpoints, Cloud GPU) can serve as the backend by adhering to this schema:

### Request
```json
{
  "question": "Does an arbitrary employment termination clause violate Article 14?",
  "context": "Central Inland Water Transport Corp. Ltd. vs Brojo Nath Ganguly, 1986 AIR 1571"
}
```

### Response
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
  ]
}
```

If one model encounters an error or out-of-memory condition, the API supports partial failure: set `status: "error"` and provide `error: "..."` for that candidate while returning successful responses for the remaining models.

---

## 6. Academic Citation & Disclaimer

```text
This project is for educational and academic research purposes only as part of a
B.Tech AI & Data Science Capstone Project. Model outputs may contain inaccuracies or
omissions and must not be treated as professional legal counsel or statutory advice.
```
