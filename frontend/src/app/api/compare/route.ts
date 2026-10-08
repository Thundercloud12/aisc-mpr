import { NextRequest, NextResponse } from "next/server";
import { InferenceCompareRequest, InferenceCompareResponse, ModelInferenceResult } from "@/types/benchmark";

const INFERENCE_API_URL = process.env.INFERENCE_API_URL || "http://127.0.0.1:8000/api/compare";
const REQUEST_TIMEOUT_MS = 25000;
const MAX_INPUT_CHARS = 1000;

const MODELS_CONFIG = [
  {
    id: "model_1",
    name: "Ayn-88M / SmolLM2-135M",
    isInstruct: false,
    formatPrompt: (q: string, c?: string) =>
      `Indian Legal Case Precedents and Supreme Court Jurisprudence:\n\n${c ? `Case Citation / Context: ${c}\n` : ""}Legal Question: ${q}\nJudicial Reasoning and Holding:\n`
  },
  {
    id: "model_2",
    name: "Qwen2.5-0.5B-Instruct",
    isInstruct: true,
    formatPrompt: (q: string, c?: string) =>
      `<|im_start|>system\nYou are an expert legal assistant specializing in Indian constitutional law and Supreme Court jurisprudence. Provide an accurate and concise judicial analysis.<|im_end|>\n<|im_start|>user\n${c ? `Context: ${c}\n` : ""}Legal Question: ${q}<|im_end|>\n<|im_start|>assistant\n`
  },
  {
    id: "model_3",
    name: "Indian-Legal-Qwen2.5-1.5B",
    isInstruct: true,
    formatPrompt: (q: string, c?: string) =>
      `<|im_start|>system\nYou are a specialized legal assistant trained on Indian legal doctrine. Analyze the query grounded in statutory Indian law.<|im_end|>\n<|im_start|>user\n${c ? `Context: ${c}\n` : ""}Legal Question: ${q}<|im_end|>\n<|im_start|>assistant\n`
  }
];

export async function POST(req: NextRequest) {
  try {
    const body: InferenceCompareRequest = await req.json();
    const { question, context } = body;

    // 1. Validation
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Validation Error: Legal question cannot be empty." },
        { status: 400 }
      );
    }

    if (question.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: `Validation Error: Question exceeds maximum length of ${MAX_INPUT_CHARS} characters.` },
        { status: 400 }
      );
    }

    const cleanQuestion = question.trim();
    const cleanContext = context ? context.trim() : undefined;

    // 2. Try calling remote/local inference backend if available
    let backendResults: ModelInferenceResult[] | null = null;
    let inferenceMode: "live_backend" | "local_runner" | "mock_fallback" = "mock_fallback";

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const backendResponse = await fetch(INFERENCE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion, context: cleanContext }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        if (Array.isArray(data.results)) {
          backendResults = data.results;
          inferenceMode = "live_backend";
        }
      }
    } catch {
      // Backend not running on INFERENCE_API_URL - fallback to controlled generation simulation with model formatting
      backendResults = null;
    }

    if (backendResults && backendResults.length > 0) {
      const responsePayload: InferenceCompareResponse = {
        results: backendResults,
        timestamp: new Date().toISOString(),
        inferenceMode,
      };
      return NextResponse.json(responsePayload);
    }

    // 3. Fallback when external GPU/FastAPI inference backend is not active
    // Generates model-differentiated legal responses demonstrating architecture differences
    const simulatedResults: ModelInferenceResult[] = await Promise.all(
      MODELS_CONFIG.map(async (cfg) => {
        const start = performance.now();
        const baseLatency = cfg.id === "model_3" ? 2200 : cfg.id === "model_2" ? 1400 : 850;
        const latency = Math.round(baseLatency + Math.random() * 300);
        await new Promise((r) => setTimeout(r, Math.min(latency, 1200)));

        const promptText = cfg.formatPrompt(cleanQuestion, cleanContext);
        const qLower = cleanQuestion.toLowerCase();

        let generatedAnswer = "";
        const isMurderQuery = qLower.includes("murder") || qLower.includes("muder") || qLower.includes("302") || qLower.includes("kill") || qLower.includes("homicide");
        const isBailQuery = qLower.includes("bail") || qLower.includes("437") || qLower.includes("438") || qLower.includes("439");

        if (isMurderQuery) {
          if (cfg.id === "model_1") {
            generatedAnswer = `[Base Model Completion]\nIndian Penal Code Section 300 defines culpable homicide amounting to murder. Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine according to section 302 of the Indian Penal Code 1860. The prosecution must establish mens rea beyond reasonable doubt...\n\n(Note: As an unaligned base model, output continues raw training text rather than providing structured chat assistance.)`;
          } else if (cfg.id === "model_2") {
            generatedAnswer = `Under Indian Criminal Law, the punishment for murder is governed by statutory provisions:\n\n1. Statutory Provision: Section 302 of the Indian Penal Code (IPC) / Section 103 of Bharatiya Nyaya Sanhita (BNS).\n2. Prescribed Punishments:\n   - Death Penalty (Capital Punishment), or\n   - Imprisonment for Life (Life Imprisonment)\n   - In addition to imprisonment or death, the convict is also liable to pay a fine.\n\n3. Landmark Principle: Under the Supreme Court's ruling in Bachan Singh v. State of Punjab (1980), capital punishment is restricted strictly to the "rarest of rare cases".`;
          } else {
            generatedAnswer = `Under Indian criminal jurisprudence, punishment for murder is codified under Section 302 of the Indian Penal Code, 1860 (now Section 103(1) of the Bharatiya Nyaya Sanhita, 2023):\n\n• Statutory Penalties:\n  1. Death penalty (subject to confirmation by the High Court under Section 366 CrPC / Section 407 BNSS).\n  2. Imprisonment for life (rigorous imprisonment extending to the remainder of natural life).\n  3. Fine (mandatory component under the statutory text).\n\n• Judicial Guidelines & Aggravating Factors:\n  Pursuant to Bachan Singh v. State of Punjab and Machhi Singh v. State of Punjab, courts must balance aggravating circumstances against mitigating circumstances to determine whether the death penalty is warranted under the "rarest of rare" doctrine.`;
          }
        } else if (isBailQuery) {
          if (cfg.id === "model_1") {
            generatedAnswer = `[Base Model Completion]\nSection 437 and Section 439 of the Code of Criminal Procedure 1973 provide for bail in non-bailable offences. The High Court or Court of Session may direct that any person accused of an offence be released on bail...\n\n(Note: Base model continuation without instruction tuning.)`;
          } else if (cfg.id === "model_2") {
            generatedAnswer = `Under Indian procedural law, bail provisions are categorized as follows:\n\n1. Bailable Offences: Bail is a statutory matter of right (Section 436 CrPC / Section 478 BNSS).\n2. Non-Bailable Offences: Discretionary with the court based on severity (Section 437/439 CrPC / Section 480/483 BNSS).\n3. Anticipatory Bail: Pre-arrest protection granted by Sessions Court or High Court under Section 438 CrPC.\n\nSupreme Court Principle: "Bail is the rule, jail is the exception" (State of Rajasthan v. Balchand).`;
          } else {
            generatedAnswer = `The statutory framework governing bail in India rests on fundamental procedural liberty under Article 21 read with Chapter XXXIII of the CrPC, 1973 (now Chapter XXXV of the BNSS, 2023):\n\n• Regular & Special Powers:\n  - Magistrate discretion under Section 437 CrPC.\n  - Special plenary powers of the High Court and Sessions Court under Section 439 CrPC.\n• Anticipatory Bail:\n  - Governed by Section 438 CrPC; requires objective apprehension of arrest for non-bailable accusation.\n• Guiding Jurisprudence:\n  The Supreme Court in Satender Kumar Antil v. CBI (2022) reaffirmed that unnecessary incarceration violates Article 21, enforcing strict timelines and compliance before remand.`;
          }
        } else {
          if (cfg.id === "model_1") {
            generatedAnswer = `[Base Model Completion] The Supreme Court of India in relevant precedents observed that the statutory provisions governing "${cleanQuestion}" require strict legal compliance. In judicial interpretation, courts examine statutory text, legislative intent, and constitutional mandates under Part III.\n\n(Note: As a base model without instruction fine-tuning, output represents statistical token completion rather than direct conversational assistance.)`;
          } else if (cfg.id === "model_2") {
            generatedAnswer = `Regarding your query on "${cleanQuestion}":\n\nUnder Indian legal jurisprudence, this issue is analyzed through applicable statutory provisions and binding Supreme Court precedents. The Court balances statutory mandates with fundamental fairness under Article 14 and substantive justice under Article 21.\n\nKey Principles:\n1. Statutory interpretation follows the plain meaning rule unless ambiguity requires purposive construction.\n2. State action and judicial discretion must be just, fair, and reasonable.`;
          } else {
            generatedAnswer = `Analysis of legal inquiry: "${cleanQuestion}"\n\nUnder Indian statutory doctrine and judicial precedent, this question requires examining the relevant statutory enactments alongside authoritative Supreme Court rulings. The ratio decidendi across landmark jurisprudence emphasizes that statutory discretion must adhere to constitutional discipline, natural justice, and settled legal doctrine.`;
          }
        }

        const elapsed = Math.round(performance.now() - start);

        return {
          modelId: cfg.id,
          modelName: cfg.name,
          answer: generatedAnswer,
          latencyMs: elapsed,
          status: "success" as const,
          isInstruct: cfg.isInstruct,
          promptFormatUsed: promptText.slice(0, 140) + "...",
        };
      })
    );

    const responsePayload: InferenceCompareResponse = {
      results: simulatedResults,
      timestamp: new Date().toISOString(),
      inferenceMode: "mock_fallback",
    };

    return NextResponse.json(responsePayload);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Inference pipeline failure: ${errorMsg}` },
      { status: 500 }
    );
  }
}
