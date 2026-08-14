import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { useRecentConversions } from "@/hooks/useRecentConversions";
import RecentList from "@/components/RecentList";

const faqs = [
  { question: "How is age calculated in years, months and days?", answer: "We subtract your date of birth from the target date calendar-wise: full years first, then remaining full months, then the leftover days. Month lengths and leap years are handled automatically." },
  { question: "Does this age calculator work for future dates?", answer: "Yes. Change the 'Age at date' field to any date to see how old you (or anyone) will be on that day." },
  { question: "Is my date of birth stored anywhere?", answer: "No. The calculation runs entirely in your browser and nothing is uploaded or saved on a server." },
  { question: "How many days old am I?", answer: "The result card shows your total age in days, weeks and months alongside the years-months-days breakdown." },
];

const pad = (n: number) => String(n).padStart(2, "0");
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const AgeCalculator = () => {
  const [dob, setDob] = useState("2000-01-01");
  const [to, setTo] = useState(today());
  const [copied, setCopied] = useState(false);
  const { items, add, clear } = useRecentConversions("age");

  const start = new Date(dob);
  const end = new Date(to);
  const valid = !isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start;

  let years = 0, months = 0, days = 0, totalDays = 0;
  if (valid) {
    years = end.getFullYear() - start.getFullYear();
    months = end.getMonth() - start.getMonth();
    days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    totalDays = Math.floor((end.getTime() - start.getTime()) / 86400000);
  }

  const sentence = valid ? `${years} years, ${months} months, ${days} days` : "";

  const copy = async () => {
    if (!sentence) return;
    await navigator.clipboard.writeText(sentence);
    setCopied(true);
    add(`${dob} → ${to} = ${sentence}`);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolPage
      title="Age Calculator – Exact Age in Years, Months & Days"
      description="Free online age calculator. Enter your date of birth to get your exact age in years, months, days, weeks and total days. Private, instant and mobile friendly."
      path="/age-calculator"
      h1="Age Calculator"
      intro="Find your exact age in years, months and days from any date of birth — calculated in your browser."
      crumbs={[{ label: "Finance", path: "/emi-calculator" }, { label: "Age Calculator" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Date of birth</span>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Age at date</span>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input-field" />
            </label>
          </div>

          <div className="mt-6">
            <div className="result-display text-center">
              {valid ? sentence : "Enter a valid date of birth"}
            </div>
            {valid && (
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="rounded-xl bg-muted p-3">
                  <div className="font-mono font-bold">{totalDays.toLocaleString("en-US")}</div>
                  <div className="text-xs text-muted-foreground">days</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="font-mono font-bold">{Math.floor(totalDays / 7).toLocaleString("en-US")}</div>
                  <div className="text-xs text-muted-foreground">weeks</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="font-mono font-bold">{(years * 12 + months).toLocaleString("en-US")}</div>
                  <div className="text-xs text-muted-foreground">months</div>
                </div>
              </div>
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
      <h2>How to calculate your age correctly</h2>
      <p>
        Age is a calendar difference, not a simple division of days by 365. Because months have 28 to 31 days and leap
        years add a 29th of February, the accurate method is to count full years first, then the remaining full months,
        and finally the leftover days. This age calculator does exactly that: it compares your date of birth with the
        target date, borrows days from the previous month when needed, and borrows a month from the year count when the
        month difference goes negative.
      </p>

      <h3>Age formula</h3>
      <ul>
        <li>Years = target year − birth year</li>
        <li>Months = target month − birth month (if negative, add 12 and subtract 1 year)</li>
        <li>Days = target day − birth day (if negative, add the length of the previous month and subtract 1 month)</li>
      </ul>

      <h3>Worked example</h3>
      <p>
        Born on 15 August 1998, calculated on 10 March 2026: the day difference is negative (10 − 15), so we borrow 28
        days from February, leaving 23 days and reducing the months. The month difference then becomes 6, giving a final
        age of 27 years, 6 months and 23 days.
      </p>

      <h2>Where an age calculator helps</h2>
      <p>
        Exam and government forms usually ask for age as on a specific cut-off date, insurance premiums depend on your
        completed years, and retirement or pension planning needs the exact date you cross a threshold. Entering the
        cut-off date in the second field answers all of these instantly. Parents also use it to track a baby's age in
        weeks and months, which is how paediatric milestones are measured.
      </p>

      <h3>Leap years and 29 February</h3>
      <p>
        If you were born on 29 February, most legal systems treat 28 February (or 1 March) as your birthday in non-leap
        years. This calculator counts real elapsed calendar time, so the day count stays accurate either way.
      </p>
    </ToolPage>
  );
};

export default AgeCalculator;
