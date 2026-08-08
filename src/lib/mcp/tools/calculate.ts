import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { create, all } from "mathjs";

const radMath = create(all, {});
const degMath = create(all, {});

const D = Math.PI / 180;
degMath.import(
  {
    sin: (x: number) => Math.sin(x * D),
    cos: (x: number) => Math.cos(x * D),
    tan: (x: number) => Math.tan(x * D),
    asin: (x: number) => Math.asin(x) / D,
    acos: (x: number) => Math.acos(x) / D,
    atan: (x: number) => Math.atan(x) / D,
  },
  { override: true },
);

export default defineTool({
  name: "calculate",
  title: "Calculate expression",
  description:
    "Evaluate a scientific math expression (arithmetic, trigonometry, logarithms, powers, roots, constants like pi and e).",
  inputSchema: {
    expression: z.string().min(1).describe("Expression to evaluate, e.g. 'sqrt(2) * sin(pi/4)'."),
    angleUnit: z
      .enum(["rad", "deg"])
      .describe("Angle unit for trigonometric functions. Use 'rad' unless degrees are requested."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ expression, angleUnit }: { expression: string; angleUnit: "rad" | "deg" }) => {
    try {
      const engine = angleUnit === "deg" ? degMath : radMath;
      const result = engine.evaluate(expression);
      if (typeof result === "function") throw new Error("Expression must produce a value.");
      const text = engine.format(result, { precision: 14 });
      return {
        content: [{ type: "text" as const, text: `${expression} = ${text}` }],
        structuredContent: { expression, angleUnit, result: text },
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Invalid expression: ${(error as Error).message}` }],
        isError: true,
      };
    }
  },
});
