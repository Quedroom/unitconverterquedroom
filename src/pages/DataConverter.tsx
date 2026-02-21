import { useState } from "react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Copy, Check, ArrowRightLeft } from "lucide-react";

type ConverterType = "binary-decimal" | "decimal-hex" | "text-base64" | "csv-json";

const DataConverter = () => {
  const [converterType, setConverterType] = useState<ConverterType>("binary-decimal");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const converters: Record<ConverterType, { name: string; fromLabel: string; toLabel: string }> = {
    "binary-decimal": { name: "Binary ↔ Decimal", fromLabel: "Binary", toLabel: "Decimal" },
    "decimal-hex": { name: "Decimal ↔ Hexadecimal", fromLabel: "Decimal", toLabel: "Hexadecimal" },
    "text-base64": { name: "Text ↔ Base64", fromLabel: "Text", toLabel: "Base64" },
    "csv-json": { name: "CSV ↔ JSON", fromLabel: "CSV", toLabel: "JSON" },
  };

  const convert = (): string => {
    if (!input.trim()) return "";

    try {
      switch (converterType) {
        case "binary-decimal": {
          if (/^[01\s]+$/.test(input)) {
            // Binary to Decimal
            return parseInt(input.replace(/\s/g, ""), 2).toString();
          } else if (/^\d+$/.test(input)) {
            // Decimal to Binary
            return parseInt(input).toString(2);
          }
          return "Invalid input";
        }

        case "decimal-hex": {
          if (/^[0-9a-fA-F]+$/.test(input) && /[a-fA-F]/.test(input)) {
            // Hex to Decimal
            return parseInt(input, 16).toString();
          } else if (/^\d+$/.test(input)) {
            // Decimal to Hex
            return parseInt(input).toString(16).toUpperCase();
          }
          return "Invalid input";
        }

        case "text-base64": {
          try {
            // Try to decode as Base64 first
            const decoded = atob(input);
            if (btoa(decoded) === input) {
              return decoded;
            }
          } catch {
            // Not valid Base64, encode as text
          }
          return btoa(input);
        }

        case "csv-json": {
          const trimmed = input.trim();
          // Try parsing as JSON first
          try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const headers = Object.keys(parsed[0]);
              const rows = parsed.map((obj: Record<string, unknown>) =>
                headers.map((h) => String(obj[h] ?? "")).join(",")
              );
              return [headers.join(","), ...rows].join("\n");
            }
          } catch {
            // Not JSON, try CSV to JSON
            const lines = trimmed.split("\n").filter((l) => l.trim());
            if (lines.length >= 1) {
              const headers = lines[0].split(",").map((h) => h.trim());
              const data = lines.slice(1).map((line) => {
                const values = line.split(",").map((v) => v.trim());
                return headers.reduce((obj, header, i) => {
                  obj[header] = values[i] || "";
                  return obj;
                }, {} as Record<string, string>);
              });
              return JSON.stringify(data, null, 2);
            }
          }
          return "Invalid input";
        }

        default:
          return "";
      }
    } catch {
      return "Conversion error";
    }
  };

  const copyToClipboard = async () => {
    const result = convert();
    if (result && result !== "Invalid input" && result !== "Conversion error") {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const result = convert();

  return (
    <Layout showBack title="Data Converter">
      <PageSEO
        title="Data Converter – Binary, Hex, Base64, CSV/JSON | ConvertHub"
        description="Convert between binary, decimal, hexadecimal, Base64, CSV and JSON formats instantly. Free online data converter with zero data storage."
        path="/data"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Data Format Converter",
          url: "https://unitconverterquedroom.lovable.app/data",
          description: "Convert between binary, decimal, hexadecimal, Base64, CSV and JSON formats instantly in your browser.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Data Converter</h1>
          <p className="section-subtitle">
            Convert between different data formats and encodings
          </p>
        </div>

        {/* Converter Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(converters).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => {
                setConverterType(key as ConverterType);
                setInput("");
              }}
              className={`category-tab ${converterType === key ? "active" : ""}`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Input
                </label>
                <span className="text-xs text-muted-foreground">
                  Auto-detects direction
                </span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Enter ${converters[converterType].fromLabel} or ${converters[converterType].toLabel}`}
                className="input-field min-h-[200px] font-mono resize-none"
              />
            </div>

            {/* Output */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Result
                </label>
                <button
                  onClick={copyToClipboard}
                  disabled={!result || result === "Invalid input" || result === "Conversion error"}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="result-display min-h-[200px] overflow-auto whitespace-pre-wrap text-sm">
                {result || "Result will appear here"}
              </div>
            </div>
          </div>

          {/* Hints */}
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {converterType === "binary-decimal" && (
                <>Enter binary (e.g., 1010) to get decimal, or decimal (e.g., 10) to get binary.</>
              )}
              {converterType === "decimal-hex" && (
                <>Enter decimal (e.g., 255) to get hex, or hex (e.g., FF) to get decimal.</>
              )}
              {converterType === "text-base64" && (
                <>Enter plain text to encode to Base64, or Base64 string to decode to text.</>
              )}
              {converterType === "csv-json" && (
                <>Enter CSV (with headers) to convert to JSON, or JSON array to convert to CSV.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataConverter;
