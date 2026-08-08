import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const bases = { binary: 2, octal: 8, decimal: 10, hexadecimal: 16 } as const;
type BaseName = keyof typeof bases;

export default defineTool({
  name: "convert_number_base",
  title: "Convert number base",
  description: "Convert an integer between binary, octal, decimal and hexadecimal representations.",
  inputSchema: {
    value: z.string().describe("The number as text, e.g. '1010' or 'ff'."),
    from: z.enum(["binary", "octal", "decimal", "hexadecimal"]).describe("Base of the input value."),
    to: z.enum(["binary", "octal", "decimal", "hexadecimal"]).describe("Base of the output value."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ value, from, to }: { value: string; from: BaseName; to: BaseName }) => {
    const cleaned = value.trim().replace(/^0[bxo]/i, "");
    const parsed = parseInt(cleaned, bases[from]);
    if (!Number.isFinite(parsed)) {
      return {
        content: [{ type: "text" as const, text: `"${value}" is not a valid ${from} number.` }],
        isError: true,
      };
    }
    const result = parsed.toString(bases[to]);
    return {
      content: [{ type: "text" as const, text: `${value} (${from}) = ${result} (${to})` }],
      structuredContent: { input: value, from, to, result, decimal: parsed },
    };
  },
});
