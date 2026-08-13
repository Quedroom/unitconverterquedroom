import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { useRecentConversions } from "@/hooks/useRecentConversions";
import RecentList from "@/components/RecentList";

const faqs = [
  { question: "How do I calculate a percentage of a number?", answer: "Multiply the number by the percentage and divide by 100. For example, 15% of 200 = (200 × 15) ÷ 100 = 30." },
  { question: "How do I work out percentage increase?", answer: "Subtract the original value from the new value, divide by the original value and multiply by 100. From 80 to 100 is (100 − 80) ÷ 80 × 100 = 25% increase." },
  { question: "How do I calculate a discount price?", answer: "Multiply the price by the discount percentage, divide by 100 and subtract that amount from the price. A 20% discount on ₹1,500 saves ₹300, so you pay ₹1,200." },
  { question: "What percentage is one number of another?", answer: "Divide the part by the whole and multiply by 100. 45 out of 60 is (45 ÷ 60) × 100 = 75%." },
];

const fmt = (n: number) => (isFinite(n) ? parseFloat(n.toFixed(6)).toLocaleString("en-US") : "—");

const PercentageCalculator = () => {
  const [mode, setMode] = useState<"of" | "isWhat" | "change">("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");
  const [copied, setCopied] = useState(false);
  const { items, add, clear } = useRecentConversions("percentage");

  const x = parseFloat(a);
  const y = parseFloat(b);
  const valid = !isNaN(x) && !isNaN(y);

  let result = "";
  let sentence = "";
  if (valid) {
    if (mode === "of") {
      result = fmt((y * x) / 100);
      sentence = `${x}% of ${y} = ${result}`;
    } else if (mode === "isWhat") {
      result = `${fmt((x / y) * 100)}%`;
      sentence = `${x} is ${result} of ${y}`;
    } else {
      const change = ((y - x) / x) * 100;
      result = `${fmt(change)}%`;
      sentence = `From ${x} to ${y} is a ${change >= 0 ? "increase" : "decrease"} of ${fmt(Math.abs(change))}%`;
    }
  }

  const labels = {
    of: ["Percentage (%)", "Of value"],
    isWhat: ["Part value", "Whole value"],
    change: ["Original value", "New value"],
  }[mode];

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    add(sentence);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolPage
      title="Percentage Calculator – Percent Of, Increase & Discount"
      description="Free percentage calculator: find X% of a number, what percent one number is of another, and percentage increase or decrease. Instant, private and mobile friendly."
      path="/percentage-calculator"
      h1="Percentage Calculator"
      intro="Calculate percentages, discounts, marks and percentage increase or decrease in one click."
      crumbs={[{ label: "Finance", path: "/emi-calculator" }, { label: "Percentage Calculator" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {([
              ["of", "X% of Y"],
              ["isWhat", "X is what % of Y"],
              ["change", "% increase / decrease"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`category-tab ${mode === key ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">{labels[0]}</label>
              <input type="number" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">{labels[1]}</label>
              <input type="number" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="mt-6">
            <div className="result-display text-2xl">{result || "—"}</div>
            <p className="text-sm text-muted-foreground mt-2">{sentence}</p>
          </div>

          <button onClick={copy} className="btn-primary mt-5" disabled={!result}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied!" : "Copy Result"}
          </button>

          <RecentList items={items} onClear={clear} />
        </div>
      }
    >
      <h2>How to calculate percentages</h2>
      <p>
        A percentage is simply a fraction with 100 as the denominator, which makes it the easiest way to compare
        quantities of different sizes. Shoppers use percentages for discounts and GST, students use them for exam marks
        and attendance, and creators use them to read growth in views or engagement. This calculator covers the three
        questions people ask most often: what is X percent of a number, what percentage one number is of another, and
        how much a value increased or decreased between two points in time.
      </p>
      <p>
        Choose a mode at the top of the card, type your two numbers, and the answer updates as you type. The full
        sentence under the result explains what the number means so you can paste it straight into a message, invoice or
        assignment. Your last calculations stay in your browser only — nothing is sent to a server.
      </p>

      <h2>Percentage formulas</h2>
      <ul>
        <li>Percent of a number: (Value × Percent) ÷ 100</li>
        <li>Part as a percentage: (Part ÷ Whole) × 100</li>
        <li>Percentage increase: ((New − Old) ÷ Old) × 100</li>
        <li>Percentage decrease: ((Old − New) ÷ Old) × 100</li>
        <li>Discounted price: Price − (Price × Discount% ÷ 100)</li>
      </ul>

      <h2>Common percentage examples</h2>
      <table className="seo-table">
        <thead><tr><th>Question</th><th>Working</th><th>Answer</th></tr></thead>
        <tbody>
          <tr><td>10% of 250</td><td>250 × 10 ÷ 100</td><td>25</td></tr>
          <tr><td>18% GST on 1,200</td><td>1200 × 18 ÷ 100</td><td>216</td></tr>
          <tr><td>45 out of 60 marks</td><td>45 ÷ 60 × 100</td><td>75%</td></tr>
          <tr><td>Price 800 → 1,000</td><td>(1000 − 800) ÷ 800 × 100</td><td>25% increase</td></tr>
          <tr><td>Price 1,000 → 750</td><td>(1000 − 750) ÷ 1000 × 100</td><td>25% decrease</td></tr>
        </tbody>
      </table>

      <h3>Why percentage increase and decrease are not symmetrical</h3>
      <p>
        A common mistake is assuming that a 25% rise followed by a 25% fall returns you to the starting value. It does
        not, because each percentage is applied to a different base. 100 increased by 25% is 125, and 125 reduced by 25%
        is 93.75. Always check which value the percentage is measured against — the original amount for an increase, and
        the higher amount for a discount.
      </p>
    </ToolPage>
  );
};

export default PercentageCalculator;
