import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { convertTemperature, findUnit, unitCategories } from "../units";

export default defineTool({
  name: "convert_unit",
  title: "Convert unit",
  description:
    "Convert a numeric value between two units within a category (length, weight, temperature, pressure, energy, power, and more).",
  inputSchema: {
    category: z.string().describe("Category id, e.g. length, weight, temperature, pressure."),
    value: z.number().describe("The numeric value to convert."),
    from: z.string().describe("Source unit symbol or name, e.g. 'm' or 'Meter'."),
    to: z.string().describe("Target unit symbol or name, e.g. 'ft' or 'Foot'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, value, from, to }) => {
    const key = category.toLowerCase().trim();
    const cat = unitCategories[key];
    if (!cat) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Unknown category "${category}". Available: ${Object.keys(unitCategories).join(", ")}`,
          },
        ],
        isError: true,
      };
    }

    const fromUnit = findUnit(cat, from);
    const toUnit = findUnit(cat, to);
    if (!fromUnit || !toUnit) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Unknown unit in category "${key}". Available: ${cat.units
              .map((u) => `${u.symbol} (${u.name})`)
              .join(", ")}`,
          },
        ],
        isError: true,
      };
    }

    const result = cat.isTemperature
      ? convertTemperature(value, fromUnit.symbol, toUnit.symbol)
      : (value * fromUnit.factor) / toUnit.factor;

    return {
      content: [{ type: "text" as const, text: `${value} ${fromUnit.symbol} = ${result} ${toUnit.symbol}` }],
      structuredContent: { category: key, value, from: fromUnit.symbol, to: toUnit.symbol, result },
    };
  },
});
