import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { useRecentConversions } from "@/hooks/useRecentConversions";
import RecentList from "@/components/RecentList";

const faqs = [
  { question: "What is EMI?", answer: "EMI stands for Equated Monthly Instalment — the fixed amount you pay the lender every month until the loan is repaid. Each EMI contains an interest portion and a principal portion." },
  { question: "How is EMI calculated?", answer: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments." },
  { question: "Does a longer tenure reduce my EMI?", answer: "Yes, a longer tenure lowers the monthly instalment but increases the total interest you pay over the life of the loan. Compare the total interest figure before choosing a tenure." },
  { question: "Is my loan data saved?", answer: "No. The EMI calculator runs completely in your browser. Loan amounts, rates and tenures are never uploaded or stored on any server." },
];

const money = (n: number) =>
  isFinite(n) ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : "—";

const EmiCalculator = () => {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("9.5");
  const [years, setYears] = useState("5");
  const [copied, setCopied] = useState(false);
  const { items, add, clear } = useRecentConversions("emi");

  const { emi, total, interest, principalPct } = useMemo(() => {
    const P = parseFloat(amount);
    const annual = parseFloat(rate);
    const n = parseFloat(years) * 12;
    if (!P || !annual || !n) return { emi: 0, total: 0, interest: 0, principalPct: 0 };
    const r = annual / 12 / 100;
    const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const t = e * n;
    return { emi: e, total: t, interest: t - P, principalPct: (P / t) * 100 };
  }, [amount, rate, years]);

  const copy = async () => {
    if (!emi) return;
    await navigator.clipboard.writeText(money(emi));
    setCopied(true);
    add(`${money(parseFloat(amount))} @ ${rate}% for ${years}y → EMI ${money(emi)}`);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolPage
      title="EMI Calculator – Loan EMI, Interest & Total Payment"
      description="Free loan EMI calculator with interest breakdown chart. Calculate monthly instalments for home, car and personal loans instantly — private, browser-only."
      path="/emi-calculator"
      h1="Loan EMI Calculator"
      intro="Find your monthly instalment, total interest and total payment for any loan."
      crumbs={[{ label: "Finance", path: "/emi-calculator" }, { label: "EMI Calculator" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Loan amount</label>
              <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Interest rate (% per year)</label>
              <input type="number" inputMode="decimal" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tenure (years)</label>
              <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-accent p-4">
              <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-2xl font-bold text-primary font-mono">{money(emi)}</p>
            </div>
            <div className="rounded-xl bg-muted p-4">
              <p className="text-xs text-muted-foreground mb-1">Total interest</p>
              <p className="text-xl font-semibold font-mono">{money(interest)}</p>
            </div>
            <div className="rounded-xl bg-muted p-4">
              <p className="text-xs text-muted-foreground mb-1">Total payment</p>
              <p className="text-xl font-semibold font-mono">{money(total)}</p>
            </div>
          </div>

          {/* Principal vs interest breakdown chart */}
          <div className="mt-6">
            <div className="flex h-4 rounded-full overflow-hidden bg-muted" role="img" aria-label="Principal versus interest split">
              <div className="bg-primary" style={{ width: `${principalPct}%` }} />
              <div className="bg-primary/30" style={{ width: `${100 - principalPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Principal {principalPct ? principalPct.toFixed(1) : 0}%</span>
              <span>Interest {principalPct ? (100 - principalPct).toFixed(1) : 0}%</span>
            </div>
          </div>

          <button onClick={copy} className="btn-primary mt-5" disabled={!emi}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied!" : "Copy EMI"}
          </button>

          <RecentList items={items} onClear={clear} />
        </div>
      }
    >
      <h2>How the EMI calculator works</h2>
      <p>
        An Equated Monthly Instalment keeps your repayment amount identical every month, but the split between interest
        and principal changes over time. Early instalments are mostly interest because the outstanding balance is high;
        later instalments repay far more principal. Understanding that split matters before you commit to a home loan,
        car loan or personal loan, because a small change in interest rate or tenure can shift the total interest by a
        large amount.
      </p>
      <p>
        Enter the loan amount, the annual interest rate offered by your lender and the tenure in years. The calculator
        immediately shows your monthly EMI, the total interest you will pay, the total amount repaid and a bar that
        visualises how much of that total is principal versus interest. Adjust the tenure to see the trade-off between a
        comfortable monthly payment and a cheaper overall loan.
      </p>

      <h2>EMI formula</h2>
      <p>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
      <ul>
        <li>P — principal, the amount borrowed</li>
        <li>r — monthly interest rate = annual rate ÷ 12 ÷ 100</li>
        <li>n — total number of monthly instalments = years × 12</li>
      </ul>

      <h2>Example: how tenure changes your loan</h2>
      <table className="seo-table">
        <thead><tr><th>Loan</th><th>Rate</th><th>Tenure</th><th>EMI</th><th>Total interest</th></tr></thead>
        <tbody>
          <tr><td>5,00,000</td><td>9.5%</td><td>3 years</td><td>16,015</td><td>76,540</td></tr>
          <tr><td>5,00,000</td><td>9.5%</td><td>5 years</td><td>10,501</td><td>1,30,060</td></tr>
          <tr><td>5,00,000</td><td>9.5%</td><td>7 years</td><td>8,177</td><td>1,86,868</td></tr>
          <tr><td>5,00,000</td><td>11%</td><td>5 years</td><td>10,871</td><td>1,52,260</td></tr>
        </tbody>
      </table>
      <p>
        Figures are indicative and rounded. Lenders may add processing fees, insurance or a different compounding
        convention, so treat the result as a close estimate for planning rather than a formal quotation.
      </p>

      <h3>Tips to reduce your total interest</h3>
      <ul>
        <li>Choose the shortest tenure your monthly budget can comfortably support.</li>
        <li>Make part-prepayments early in the loan, when the interest share is highest.</li>
        <li>Compare the effective annual rate, not just the headline rate, across lenders.</li>
      </ul>
    </ToolPage>
  );
};

export default EmiCalculator;
