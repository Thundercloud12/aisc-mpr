#!/usr/bin/env python3
"""
Local Inference Server for Indian Legal SLM Project
Allows running live inference across the 3 benchmark models on local GPU or CPU.

Usage:
    python inference_server.py [--port 8000] [--device auto] [--precision bfloat16]
"""

import os
import sys
import json
import time
import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler

# Model configurations
MODELS = {
    "model_1": {
        "id": "model_1",
        "name": "SmolLM2-135M (Ayn Fallback)",
        "hf_id": "HuggingFaceTB/SmolLM2-135M",
        "is_instruct": False
    },
    "model_2": {
        "id": "model_2",
        "name": "Qwen2.5-0.5B-Instruct",
        "hf_id": "Qwen/Qwen2.5-0.5B-Instruct",
        "is_instruct": True
    },
    "model_3": {
        "id": "model_3",
        "name": "Indian-Legal-Qwen2.5-1.5B",
        "hf_id": "GSMS-B/Indian-Legal-Qwen2.5-1.5B",
        "is_instruct": True
    }
}

loaded_models = {}
loaded_tokenizers = {}

def format_prompt(model_info: dict, question: str, context: str = "") -> str:
    if model_info.get("is_instruct"):
        sys_prompt = "You are an expert legal assistant specializing in Indian constitutional law and Supreme Court jurisprudence. Provide an accurate and concise judicial analysis."
        ctx_part = f"Case Citation / Context:\n{context}\n\n" if context else ""
        return f"<|im_start|>system\n{sys_prompt}<|im_end|>\n<|im_start|>user\n{ctx_part}Legal Question:\n{question}<|im_end|>\n<|im_start|>assistant\n"
    else:
        ctx_part = f"Case Citation: {context}\n" if context else ""
        return f"Indian Legal Case Precedents and Supreme Court Jurisprudence:\n\n{ctx_part}Legal Question: {question}\nJudicial Reasoning and Holding:\n"

def run_inference_for_model(m_key: str, question: str, context: str = "") -> dict:
    m_info = MODELS.get(m_key)
    if not m_info:
        return {"modelId": m_key, "modelName": m_key, "answer": "", "latencyMs": 0, "status": "error", "error": "Unknown model"}

    t0 = time.perf_counter()
    prompt = format_prompt(m_info, question, context)

    # Check if transformers is available for live execution
    try:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        hf_id = m_info["hf_id"]
        if m_key not in loaded_tokenizers:
            print(f"[LOAD] Loading tokenizer for {hf_id}...")
            loaded_tokenizers[m_key] = AutoTokenizer.from_pretrained(hf_id)
        tok = loaded_tokenizers[m_key]
        if tok.pad_token is None:
            tok.pad_token = tok.eos_token or tok.unk_token

        if m_key not in loaded_models:
            print(f"[LOAD] Loading model weights for {hf_id}...")
            device = "cuda" if torch.cuda.is_available() else "cpu"
            dtype = torch.bfloat16 if (torch.cuda.is_available() and getattr(torch.cuda, "is_bf16_supported", lambda: False)()) else torch.float32
            loaded_models[m_key] = AutoModelForCausalLM.from_pretrained(
                hf_id,
                torch_dtype=dtype,
                device_map="auto" if device == "cuda" else None
            )
            if device == "cpu":
                loaded_models[m_key] = loaded_models[m_key].to("cpu")
            loaded_models[m_key].eval()

        model = loaded_models[m_key]
        device = model.device

        inputs = tok(prompt, return_tensors="pt", truncation=True, max_length=1024).to(device)
        with torch.no_grad():
            outputs = model.generate(
                inputs["input_ids"],
                attention_mask=inputs.get("attention_mask"),
                max_new_tokens=140,
                temperature=0.2,
                top_p=0.9,
                repetition_penalty=1.15,
                do_sample=True,
                pad_token_id=tok.pad_token_id
            )

        gen_tokens = outputs[0][inputs["input_ids"].shape[-1]:]
        text = tok.decode(gen_tokens, skip_special_tokens=True).strip()

        # Base model post-cleaning
        if not m_info.get("is_instruct"):
            for stop in ["\nIndian Legal", "\nCase Citation:", "\nLegal Question:"]:
                if stop in text:
                    text = text.split(stop)[0].strip()

        elapsed_ms = int((time.perf_counter() - t0) * 1000)
        return {
            "modelId": m_key,
            "modelName": m_info["name"],
            "answer": text,
            "latencyMs": elapsed_ms,
            "status": "success",
            "isInstruct": m_info["is_instruct"]
        }

    except Exception as e:
        elapsed_ms = int((time.perf_counter() - t0) * 1000)
        return {
            "modelId": m_key,
            "modelName": m_info["name"],
            "answer": f"Error running local inference: {str(e)}",
            "latencyMs": elapsed_ms,
            "status": "error",
            "error": str(e),
            "isInstruct": m_info["is_instruct"]
        }

class InferenceHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        status_payload = {
            "status": "online",
            "models_supported": list(MODELS.keys()),
            "loaded_models": list(loaded_models.keys()),
            "endpoint": "/api/compare"
        }
        self.wfile.write(json.dumps(status_payload).encode("utf-8"))

    def do_POST(self):
        if self.path != "/api/compare":
            self.send_response(404)
            self.end_headers()
            return

        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            req_json = json.loads(post_data.decode("utf-8"))
            question = req_json.get("question", "").strip()
            context = req_json.get("context", "").strip()

            if not question:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Question is required"}).encode("utf-8"))
                return

            print(f"[QUERY] Received legal question: '{question[:80]}...'")
            results = []
            for m_key in ["model_1", "model_2", "model_3"]:
                res = run_inference_for_model(m_key, question, context)
                results.append(res)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"results": results, "timestamp": time.time()}).encode("utf-8"))

        except Exception as err:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(err)}).encode("utf-8"))

def main():
    parser = argparse.ArgumentParser(description="Indian Legal SLM Local Inference Server")
    parser.add_argument("--port", type=int, default=8000, help="Port to run server on (default: 8000)")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host address (default: 127.0.0.1)")
    args = parser.parse_args()

    server_address = (args.host, args.port)
    httpd = HTTPServer(server_address, InferenceHandler)
    print(f"================================================================")
    print(f"  INDIAN LEGAL SLM LOCAL INFERENCE SERVER ACTIVE")
    print(f"  Listening on: http://{args.host}:{args.port}")
    print(f"  Endpoint    : http://{args.host}:{args.port}/api/compare")
    print(f"================================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server gracefully...")
        httpd.server_close()

if __name__ == "__main__":
    main()
