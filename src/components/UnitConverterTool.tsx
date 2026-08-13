import { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import { Unit, convertTemperature } from "@/lib/mcp/units";
import { useRecentConversions } from "@/hooks/useRecentConversions";
import RecentList from "./RecentList";

interface UnitConverterToolProps {
  units: Unit[];
  storageKey: string;
  defaultFrom: string;
  defaultTo: string;
  isTemperature?: boolean;
}

const format = (n: number) => {
  if (!isFinite(n)) return "—";
  if (n !== 0 && (Math.abs(n) < 0.000001 || Math.abs(n) >= 1e12)) return n.toExponential(6);
  return parseFloat(n.toFixed(8)).toLocaleString("en-US", { maximumFractionDigits: 8 });
};

const UnitConverterTool = ({
  units,
  storageKey,
  defaultFrom,
  defaultTo,
  isTemperature = false,
}: UnitConverterToolProps) => {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [copied, setCopied] = useState(false);
  const { items, add, clear } = useRecentConversions(storageKey);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    if (isTemperature) return format(convertTemperature(num, from, to));
    const f = units.find((u) => u.symbol === from);
    const t = units.find((u) => u.symbol === to);
    if (!f || !t) return "";
    return format((num * f.factor) / t.factor);
  }, [value, from, to, units, isTemperature]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    add(`${value} ${from} = ${result} ${to}`);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="tool-card max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="from-value">From</label>
          <input
            id="from-value"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-field"
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="select-field" aria-label="Convert from unit">
            {units.map((u) => (
              <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          aria-label="Swap units"
          className="btn-secondary h-12 w-full md:w-12 md:px-0 justify-center"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">To</label>
          <div className="result-display py-3.5">{result || "—"}</div>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="select-field" aria-label="Convert to unit">
            {units.map((u) => (
              <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <button onClick={copy} className="btn-primary" disabled={!result}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Result"}
        </button>
        <p className="text-sm text-muted-foreground">
          {value || 0} {from} = {result || "—"} {to}
        </p>
      </div>

      <RecentList items={items} onClear={clear} />
    </div>
  );
};

export default UnitConverterTool;
