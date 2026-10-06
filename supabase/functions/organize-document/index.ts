import { createOpenAI } from "npm:@ai-sdk/openai@2";
import { streamText } from "npm:ai@5";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const json = (body: unknown, status = 200, extra: HeadersInit = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, ...extra, "Content-Type": "application/json" } });

const SYSTEM = `You turn messy pasted text into a clean, well-structured document.
Rules:
- Keep the author's meaning and facts. Do not invent content. Fix spelling, grammar, punctuation and spacing.
- Organise into a logical structure with a short title and section headings where helpful.
- Output ONLY this simple markup, nothing else (no code fences, no bold/italic markers):
  "# " title (one line), "## " section heading, "### " sub-heading,
  "- " bullet item, "1. " numbered item, and plain lines for paragraphs.
- Separate blocks with a blank line. Use the same language as the input.`;

const MAX_CHARS = 30000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured for this site." }, 500);

  let text = "";
  try {
    text = String((await req.json())?.text ?? "").trim();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (!text) return json({ error: "Please paste some text first." }, 400);
  if (text.length > MAX_CHARS) return json({ error: `Text is too long (max ${MAX_CHARS.toLocaleString()} characters).` }, 400);

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  let failure: { status: number; message: string } | null = null;
  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM,
      messages: [{ role: "user", content: text }],
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
      onError: ({ error }) => {
        const e = error as { statusCode?: number; message?: string; responseBody?: string };
        let msg = e?.message ?? "AI request failed.";
        try { msg = JSON.parse(e.responseBody ?? "")?.error?.message ?? JSON.parse(e.responseBody ?? "")?.message ?? msg; } catch { /* keep */ }
        failure = { status: e?.statusCode ?? 502, message: msg };
      },
    });
    const output = (await result.text).trim();
    const runId = runIdFetch.getRunId();
    const extra = runId ? { "X-Lovable-AIG-Run-ID": runId } : {};
    if (failure) {
      const f = failure as { status: number; message: string };
      const friendly =
        f.status === 402 ? "The site's AI credits have run out. Please try again later."
        : f.status === 429 ? "Too many requests right now. Please wait a minute and try again."
        : f.message;
      return json({ error: friendly }, f.status, extra);
    }
    if (!output) return json({ error: "The AI could not organise this text." }, 422, extra);
    return json({ document: output }, 200, extra);
  } catch (error) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: cors });
    const f = failure as { status: number; message: string } | null;
    return json({ error: f?.message ?? (error instanceof Error ? error.message : "AI request failed.") }, f?.status ?? 502);
  }
});
