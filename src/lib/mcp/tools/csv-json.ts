import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

function splitLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else quoted = !quoted;
    } else if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((v) => v.trim());
}

function csvToJson(csv: string) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error("CSV needs a header row and at least one data row.");
  const headers = splitLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = splitLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? ""]));
  });
}

function escapeCell(value: unknown) {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function jsonToCsv(json: string) {
  const parsed = JSON.parse(json);
  const rows: Record<string, unknown>[] = Array.isArray(parsed) ? parsed : [parsed];
  if (rows.length === 0) return "";
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r ?? {}))));
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escapeCell(r?.[h])).join(","))].join("\n");
}

export default defineTool({
  name: "csv_json",
  title: "CSV / JSON convert",
  description: "Convert CSV text to a JSON array of objects, or JSON records to CSV text.",
  inputSchema: {
    mode: z.enum(["csv_to_json", "json_to_csv"]).describe("Direction of the conversion."),
    text: z.string().min(1).describe("The CSV or JSON source text."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ mode, text }: { mode: "csv_to_json" | "json_to_csv"; text: string }) => {
    try {
      const result = mode === "csv_to_json" ? JSON.stringify(csvToJson(text), null, 2) : jsonToCsv(text);
      return { content: [{ type: "text" as const, text: result }], structuredContent: { mode, result } };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Conversion failed: ${(error as Error).message}` }],
        isError: true,
      };
    }
  },
});
