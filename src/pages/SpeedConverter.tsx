import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";

// Factors relative to one metre per second.
const speedUnits = [
  { name: "Meter/second", symbol: "m/s", factor: 1 },
  { name: "Kilometer/hour", symbol: "km/h", factor: 0.277777778 },
  { name: "Mile/hour", symbol: "mph", factor: 0.44704 },
  { name: "Knot", symbol: "kn", factor: 0.514444444 },
  { name: "Foot/second", symbol: "ft/s", factor: 0.3048 },
  { name: "Kilometer/second", symbol: "km/s", factor: 1000 },
];

const faqs = [
  { question: "How fast is 100 km/h in mph?", answer: "100 km/h is about 62.14 mph. To convert km/h to mph multiply by 0.621371; to convert mph to km/h multiply by 1.60934." },
  { question: "How many km/h is one knot?", answer: "One knot is exactly one nautical mile per hour, which is 1.852 km/h or about 1.151 mph. Knots are used in aviation and shipping worldwide." },
  { question: "What is m/s used for?", answer: "Meters per second is the SI unit of speed, used in physics and engineering. One m/s equals 3.6 km/h or about 2.237 mph." },
  { question: "Is this speed converter free?", answer: "Yes. The speed converter is completely free, needs no sign-up, and runs entirely inside your browser so no measurement you type is ever uploaded or stored." },
];

const SpeedConverter = () => (
  <ToolPage
    title="Speed Converter – km/h to mph, m/s, knots"
    description="Free speed converter for km/h to mph, meters per second, knots and more. Instant results, conversion table and formulas — 100% in your browser."
    path="/speed-converter"
    h1="Speed Converter — km/h, mph, m/s, knots"
    intro="Convert speed and pace units instantly. Type a value, pick your units and copy the result."
    crumbs={[{ label: "Speed", path: "/speed-converter" }, { label: "Speed Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={speedUnits}
        storageKey="speed"
        defaultFrom="km/h"
        defaultTo="mph"
      />
    }
  >
    <h2>How to use the speed converter</h2>
    <p>
      Speed is measured differently depending on where you are and what you are doing. Road signs and car speedometers
      in India and most of the world use kilometers per hour, the United States uses miles per hour, physics problems
      use meters per second, and aviation and shipping use knots. This converter moves a value between all of them in
      one card: enter a number, choose the unit you have, choose the unit you want, and the answer appears instantly.
      The swap button reverses the direction and the copy button puts the exact result on your clipboard.
    </p>
    <p>
      Every calculation runs locally in your browser using exact conversion factors, so results are accurate to eight
      decimal places and nothing you type leaves your device. Your last five conversions stay in your own browser
      storage and can be cleared with one click.
    </p>

    <h2>Speed conversion formulas</h2>
    <ul>
      <li>mph = km/h × 0.621371</li>
      <li>km/h = mph × 1.60934</li>
      <li>km/h = m/s × 3.6</li>
      <li>m/s = km/h ÷ 3.6</li>
      <li>km/h = knots × 1.852</li>
      <li>mph = knots × 1.15078</li>
    </ul>

    <h2>Speed conversion table</h2>
    <table className="seo-table">
      <thead>
        <tr><th>From</th><th>To</th><th>Multiply by</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Kilometer/hour</td><td>Mile/hour</td><td>0.621371</td><td>100 km/h = 62.14 mph</td></tr>
        <tr><td>Mile/hour</td><td>Kilometer/hour</td><td>1.60934</td><td>60 mph = 96.56 km/h</td></tr>
        <tr><td>Meter/second</td><td>Kilometer/hour</td><td>3.6</td><td>10 m/s = 36 km/h</td></tr>
        <tr><td>Knot</td><td>Kilometer/hour</td><td>1.852</td><td>15 kn = 27.78 km/h</td></tr>
        <tr><td>Knot</td><td>Mile/hour</td><td>1.15078</td><td>20 kn = 23.02 mph</td></tr>
        <tr><td>Foot/second</td><td>Meter/second</td><td>0.3048</td><td>100 ft/s = 30.48 m/s</td></tr>
      </tbody>
    </table>

    <h3>Why the nautical mile differs from the land mile</h3>
    <p>
      The knot is one nautical mile per hour, and the nautical mile (1,852 meters) is defined as one minute of
      latitude, which is why it is longer than the statute mile (1,609.344 meters). Navigators favour it because a
      nautical mile corresponds directly to a position on the Earth's surface, making chart work straightforward.
      Converting knots to km/h is therefore always 1.852 times the value — exactly what this tool applies.
    </p>
  </ToolPage>
);

export default SpeedConverter;
