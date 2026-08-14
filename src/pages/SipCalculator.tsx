import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { useRecentConversions } from "@/hooks/useRecentConversions";
import RecentList from "@/components/RecentList";

const faqs = [
  { question: "What is a SIP calculator?", answer: "A SIP calculator estimates the maturity value of a Systematic Investment Plan by compounding a fixed monthly investment at an assumed annual return for the chosen number of years." },
  { question: "What is the SIP formula?", answer: "M = P × ({[1 + i]^n − 1} ÷ i) × (1 + i), where P is the monthly instalment, i is the monthly rate (annual rate ÷ 12 ÷ 100) and n is the total number of instalments." },
  { question: "Are SIP returns guaranteed?", answer: "No. Mutual fund returns are market-linked. The calculator shows a projection based on the rate you enter, not a promise of future performance." },
  { question: "Is my data saved?", answer: "No. Everything is calculated in your browser and nothing is sent to a server." },
];

const inr = (n: number) =>
  isFinite(n) ? "₹" + Math.round(n).toLocaleString("en-IN") : "—";

const SipCalculator = () => {
  const [amount, setAmount] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [copied, setCopied] = useState(false);
  const { items, add, clear } = useRecentConversions("sip");

  const p = parseFloat(amount);
  const r = parseFloat(rate);
  const y = parseFloat(years);
  const valid = p > 0 && r >= 0 && y > 0;

  const i = r / 12 / 100;
  const n = Math.round(y * 12);
  const maturity = valid ? (i === 0 ? p * n : p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)) : 0;
  const invested = valid ? p * n : 0;
  const gain = maturity - invested;
  const gainPct = invested ? (gain / invested) * 100 : 0;

  const copy = async () => {
    if (!valid) return;
    const text = `SIP ${inr(p)}/month for ${y} yrs @ ${r}% = ${inr(maturity)}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    add(text);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolPage
      title="SIP Calculator – Mutual Fund Monthly Investment Returns"
      description="Free SIP calculator: estimate the maturity value, invested amount and total gains of your monthly mutual fund SIP. Instant, private and mobile friendly."
      path="/sip-calculator"
      h1="SIP Calculator"
      intro="Estimate what your monthly mutual fund SIP could grow to, with invested amount and total gains."
      crumbs={[{ label: "Finance", path: "/emi-calculator" }, { label: "SIP Calculator" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Monthly investment (₹)</span>
              <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Expected return (% p.a.)</span>
              <input type="number" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="input-field" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Time period (years)</span>
              <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" />
            </label>
          </div>

          <div className="mt-6">
            <div className="result-display text-center">
              {valid ? `Maturity value ${inr(maturity)}` : "Enter valid values"}
            </div>

            {valid && (
              <>
                <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                  <div className="rounded-xl bg-muted p-3">
                    <div className="font-mono font-bold">{inr(invested)}</div>
                    <div className="text-xs text-muted-foreground">Invested</div>
                  </div>
                  <div className="rounded-xl bg-accent p-3">
                    <div className="font-mono font-bold text-primary">{inr(gain)}</div>
                    <div className="text-xs text-muted-foreground">Estimated gains</div>
                  </div>
                </div>
                <div className="mt-4 h-3 w-full rounded-full bg-muted overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.min(100, Math.max(0, (invested / maturity) * 100))}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Gains are {gainPct.toFixed(1)}% of the amount you invested over {n} instalments.
                </p>
              </>
            )}

            <button onClick={copy} className="btn-secondary mt-4 w-full sm:w-auto">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>

          <RecentList items={items} onClear={clear} />
        </div>
      }
    >
      <h2>How SIP returns are calculated</h2>
      <p>
        A Systematic Investment Plan invests a fixed amount every month, so each instalment compounds for a different
        length of time. The first instalment grows for the whole tenure, the last one for a single month. Adding all of
        them together gives the future value of an annuity due, which is the formula this SIP calculator uses.
      </p>

      <h3>SIP formula</h3>
      <p>
        M = P × ( [ (1 + i)<sup>n</sup> − 1 ] ÷ i ) × (1 + i)
      </p>
      <ul>
        <li>P — monthly instalment amount</li>
        <li>i — monthly rate of return = annual rate ÷ 12 ÷ 100</li>
        <li>n — number of monthly instalments = years × 12</li>
      </ul>

      <h3>Example</h3>
      <p>
        ₹5,000 invested every month for 10 years at an assumed 12% annual return gives 120 instalments, a total
        investment of ₹6,00,000 and an estimated maturity value of roughly ₹11.6 lakh — meaning the compounding does
        almost as much work as your own contributions.
      </p>

      <h2>SIP vs lump sum</h2>
      <p>
        A SIP spreads your entry across market highs and lows, which averages your purchase cost and removes the need to
        time the market. A lump sum can outperform when markets are rising from the day you invest, but it carries far
        more timing risk. Most salaried investors prefer SIPs because the instalment matches monthly cash flow.
      </p>

      <h3>Points to remember</h3>
      <ul>
        <li>Returns are projections, not guarantees — equity funds fluctuate year to year.</li>
        <li>Increasing the tenure usually matters more than increasing the rate assumption.</li>
        <li>Consider inflation: a 12% nominal return is closer to 6–7% in real terms.</li>
        <li>Exit loads and capital gains tax reduce the amount actually received.</li>
      </ul>
    </ToolPage>
  );
};

export default SipCalculator;
