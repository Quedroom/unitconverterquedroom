import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";

// Factors relative to one second.
const timeUnits = [
  { name: "Millisecond", symbol: "ms", factor: 0.001 },
  { name: "Second", symbol: "s", factor: 1 },
  { name: "Minute", symbol: "min", factor: 60 },
  { name: "Hour", symbol: "h", factor: 3600 },
  { name: "Day", symbol: "d", factor: 86400 },
  { name: "Week", symbol: "wk", factor: 604800 },
  { name: "Month (avg)", symbol: "mo", factor: 2629800 },
  { name: "Year", symbol: "yr", factor: 31556952 },
];

const faqs = [
  { question: "How many seconds are in a day?", answer: "One day has 86,400 seconds (24 hours × 60 minutes × 60 seconds)." },
  { question: "How many hours are in a year?", answer: "A common calendar year has 8,760 hours (365 × 24), and a leap year has 8,784. The average Gregorian year is 8,765.82 hours." },
  { question: "How long is a month in seconds?", answer: "There is no fixed answer because months run 28 to 31 days. This converter uses the average Gregorian month of 30.4369 days, about 2,629,800 seconds." },
  { question: "Is this time converter free?", answer: "Yes. The time converter is completely free, needs no sign-up, and runs entirely inside your browser so no measurement you type is ever uploaded or stored." },
];

const TimeConverter = () => (
  <ToolPage
    title="Time Converter – hours to minutes, days to seconds"
    description="Free time converter for hours to minutes, days to seconds, weeks, months and years. Instant results, conversion table and formulas — 100% in your browser."
    path="/time-converter"
    h1="Time Converter — seconds, minutes, hours, days"
    intro="Convert time units instantly — milliseconds, seconds, minutes, hours, days, weeks, months and years. Type a value and copy the result."
    crumbs={[{ label: "Time", path: "/time-converter" }, { label: "Time Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={timeUnits}
        storageKey="time"
        defaultFrom="h"
        defaultTo="min"
      />
    }
  >
    <h2>How to use the time converter</h2>
    <p>
      Time conversions appear in daily planning and technical work alike: converting meeting hours to minutes,
      project durations into days, video lengths into seconds, or a salary period into weeks. This converter handles
      every common span from milliseconds to years in one card: enter a number, choose the unit you are starting
      from, choose the unit you want, and the answer appears instantly. The swap button reverses the direction and
      the copy button puts the exact figure on your clipboard.
    </p>
    <p>
      Every calculation runs locally in your browser, so results are accurate to eight decimal places and nothing you
      type leaves your device. Your last five conversions stay in your own browser storage and can be cleared with
      one click.
    </p>

    <h2>Time conversion formulas</h2>
    <ul>
      <li>Minutes = hours × 60</li>
      <li>Seconds = minutes × 60</li>
      <li>Hours = days × 24</li>
      <li>Days = weeks × 7</li>
      <li>Years = days ÷ 365.2425 (average Gregorian year)</li>
      <li>Millisecond = second ÷ 1,000</li>
    </ul>

    <h2>Time conversion table</h2>
    <table className="seo-table">
      <thead>
        <tr><th>From</th><th>To</th><th>Multiply by</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Hour</td><td>Minute</td><td>60</td><td>2.5 h = 150 min</td></tr>
        <tr><td>Minute</td><td>Second</td><td>60</td><td>90 min = 5,400 s</td></tr>
        <tr><td>Day</td><td>Hour</td><td>24</td><td>3 d = 72 h</td></tr>
        <tr><td>Day</td><td>Second</td><td>86,400</td><td>1 d = 86,400 s</td></tr>
        <tr><td>Week</td><td>Day</td><td>7</td><td>6 wk = 42 d</td></tr>
        <tr><td>Year</td><td>Day</td><td>365.2425</td><td>1 yr = 365.24 d</td></tr>
        <tr><td>Year</td><td>Hour</td><td>8,765.82</td><td>1 yr = 8,765.8 h</td></tr>
      </tbody>
    </table>

    <h3>Why years are not exactly 365 days</h3>
    <p>
      The Earth takes about 365.2422 days to orbit the Sun, which is why the Gregorian calendar adds a leap day every
      four years and skips three of them every four centuries. This tool uses the average Gregorian year of 365.2425
      days (31,556,952 seconds) for year conversions, and the matching average month of 30.4369 days. Converting
      whole calendar months or specific dates needs a date calculator instead, because real months differ from each
      other.
    </p>
  </ToolPage>
);

export default TimeConverter;
