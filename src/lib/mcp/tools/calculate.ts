import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { create, all } from "mathjs";

const math = create(all, {});
// Remove unsafe evaluation entry points.
math.import(
  {
    import: function () {
      throw new Error("Disabled");
    },
    createUnit: function () {
      throw new Error("Disabled");
    },
    evaluate: function () {
      throw new Error("Disabled");
    },
    parse: function () {
      throw new Error("Disabled");
    },
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
      const expr =
        angleUnit === "deg"
          ? expression.replace(/\b(sin|cos|tan)\s*\(/g, "$1(pi/180*(") .replace(/\b(sin|cos|tan)\(pi\/180\*\(/g, "$1(pi/180*(")
          : expression;
      const balanced = angleUnit === "deg" ? balanceParens(expr) : expr;
      const result = (math as unknown as { evaluate: (e: string) => unknown }).evaluate
        ? math.parse(balanced).compile().evaluate()
        : math.parse(balanced).compile().evaluate();
      const text = math.format(result, { precision: 14 });
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

function balanceParens(expr: string) {
  const open = (expr.match(/\(/g) ?? []).length;
  const close = (expr.match(/\)/g) ?? []).length;
  return expr + ")".repeat(Math.max(0, open - close));
}
