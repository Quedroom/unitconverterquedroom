import { defineTool } from "@lovable.dev/mcp-js";
import { unitCategories } from "../units";

export default defineTool({
  name: "list_unit_categories",
  title: "List unit categories",
  description: "List every supported unit category and the units available in each, for use with convert_unit.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const categories = Object.entries(unitCategories).map(([id, cat]) => ({
      id,
      name: cat.name,
      units: cat.units.map((u) => ({ symbol: u.symbol, name: u.name })),
    }));

    const text = categories
      .map((c) => `${c.id} (${c.name}): ${c.units.map((u) => u.symbol).join(", ")}`)
      .join("\n");

    return { content: [{ type: "text" as const, text }], structuredContent: { categories } };
  },
});
