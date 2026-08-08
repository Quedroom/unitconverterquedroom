import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

function encode(text: string) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}

function decode(text: string) {
  const binary = atob(text.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default defineTool({
  name: "base64",
  title: "Base64 encode / decode",
  description: "Encode text to Base64 or decode a Base64 string back to UTF-8 text.",
  inputSchema: {
    mode: z.enum(["encode", "decode"]).describe("Whether to encode or decode."),
    text: z.string().min(1).describe("The text or Base64 string to process."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ mode, text }: { mode: "encode" | "decode"; text: string }) => {
    try {
      const result = mode === "encode" ? encode(text) : decode(text);
      return {
        content: [{ type: "text" as const, text: result }],
        structuredContent: { mode, result },
      };
    } catch {
      return {
        content: [{ type: "text" as const, text: "Invalid Base64 input." }],
        isError: true,
      };
    }
  },
});
