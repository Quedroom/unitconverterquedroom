import { defineMcp } from "@lovable.dev/mcp-js";
import convertUnitTool from "./tools/convert-unit";
import listUnitCategoriesTool from "./tools/list-unit-categories";
import convertNumberBaseTool from "./tools/convert-number-base";
import base64Tool from "./tools/base64";
import csvJsonTool from "./tools/csv-json";
import calculateTool from "./tools/calculate";

export default defineMcp({
  name: "converthub-mcp",
  title: "ConvertHub MCP",
  version: "0.1.0",
  instructions:
    "Privacy-first conversion tools from ConvertHub. Use `list_unit_categories` to discover categories, `convert_unit` for engineering unit conversions, `convert_number_base` for binary/hex/decimal, `base64` for encoding, `csv_json` for data format conversion, and `calculate` to evaluate math expressions. All tools are stateless and store no data.",
  tools: [
    listUnitCategoriesTool,
    convertUnitTool,
    convertNumberBaseTool,
    base64Tool,
    csvJsonTool,
    calculateTool,
  ],
});
