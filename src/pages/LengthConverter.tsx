import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";
import { unitCategories } from "@/lib/mcp/units";

const faqs = [
  { question: "How many centimeters are in one inch?", answer: "One inch is exactly 2.54 centimeters. To convert inches to centimeters multiply by 2.54; to convert centimeters to inches divide by 2.54." },
  { question: "How do I convert meters to feet?", answer: "Multiply the number of meters by 3.28084. For example, 10 meters × 3.28084 = 32.8084 feet." },
  { question: "How many kilometers is one mile?", answer: "One mile equals 1.609344 kilometers, and one kilometer equals about 0.621371 miles." },
  { question: "Is this length converter free?", answer: "Yes. The length converter is completely free, needs no sign-up, and runs entirely inside your browser so no measurement you type is ever uploaded or stored." },
];

const LengthConverter = () => (
  <ToolPage
    title="Length Converter – cm to inch, meter to feet, km to mile"
    description="Free length converter for cm to inch, meter to feet, km to mile and more. Instant results, conversion tables and formulas — 100% in your browser."
    path="/length-converter"
    h1="Length Converter — cm, inch, meter, feet, km, mile"
    intro="Convert any length or distance unit instantly. Type a value, pick your units and copy the result."
    crumbs={[{ label: "Length", path: "/length-converter" }, { label: "Length Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={unitCategories.length.units}
        storageKey="length"
        defaultFrom="cm"
        defaultTo="in"
      />
    }
  >
    <h2>How to use the length converter</h2>
    <p>
      Length is the most frequently converted measurement in daily life. Students convert centimeters to inches for
      geometry homework, tailors switch between feet and meters, runners compare kilometers with miles, and creators
      resize physical print dimensions before exporting artwork. This converter handles all of those cases in a single
      card: enter a number, choose the unit you are converting from, choose the unit you want, and the answer appears
      immediately. The swap button flips the two units so you can check a conversion in the opposite direction without
      retyping anything, and the copy button places the result on your clipboard.
    </p>
    <p>
      Every calculation happens locally in your browser using exact SI-based conversion factors, so results are accurate
      to eight decimal places and nothing you type leaves your device. Your last five conversions are kept in your own
      browser storage for convenience and can be cleared with one click.
    </p>

    <h2>Length conversion formulas</h2>
    <h3>Metric to imperial</h3>
    <ul>
      <li>Inches = centimeters ÷ 2.54</li>
      <li>Feet = meters × 3.28084</li>
      <li>Miles = kilometers × 0.621371</li>
      <li>Yards = meters × 1.09361</li>
    </ul>
    <h3>Imperial to metric</h3>
    <ul>
      <li>Centimeters = inches × 2.54</li>
      <li>Meters = feet × 0.3048</li>
      <li>Kilometers = miles × 1.609344</li>
    </ul>

    <h2>Length conversion table</h2>
    <table className="seo-table">
      <thead>
        <tr><th>From</th><th>To</th><th>Multiply by</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Centimeter</td><td>Inch</td><td>0.393701</td><td>10 cm = 3.937 in</td></tr>
        <tr><td>Inch</td><td>Centimeter</td><td>2.54</td><td>12 in = 30.48 cm</td></tr>
        <tr><td>Meter</td><td>Foot</td><td>3.28084</td><td>5 m = 16.404 ft</td></tr>
        <tr><td>Foot</td><td>Meter</td><td>0.3048</td><td>6 ft = 1.8288 m</td></tr>
        <tr><td>Kilometer</td><td>Mile</td><td>0.621371</td><td>5 km = 3.107 mi</td></tr>
        <tr><td>Mile</td><td>Kilometer</td><td>1.609344</td><td>26.2 mi = 42.165 km</td></tr>
        <tr><td>Meter</td><td>Yard</td><td>1.09361</td><td>100 m = 109.361 yd</td></tr>
      </tbody>
    </table>

    <h3>Why the metric and imperial systems differ</h3>
    <p>
      The metric system defines the meter from the speed of light and scales every other unit by powers of ten, which is
      why converting millimeters to kilometers only moves a decimal point. Imperial units grew out of historical body
      measurements and trade standards, so their relationships (12 inches to a foot, 5,280 feet to a mile) are not
      decimal. Since 1959 the international yard and pound agreement fixed one inch at exactly 2.54 centimeters, which
      is the constant this tool uses for every metric-to-imperial conversion.
    </p>
  </ToolPage>
);

export default LengthConverter;
