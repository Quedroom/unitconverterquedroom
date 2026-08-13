import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";
import { unitCategories } from "@/lib/mcp/units";

const faqs = [
  { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply the Celsius value by 9/5 and add 32. For example, 25 °C × 1.8 + 32 = 77 °F." },
  { question: "How do I convert Fahrenheit to Celsius?", answer: "Subtract 32 from the Fahrenheit value and multiply by 5/9. For example, (98.6 − 32) × 5/9 = 37 °C." },
  { question: "At what temperature are Celsius and Fahrenheit equal?", answer: "Celsius and Fahrenheit read the same value at −40 degrees: −40 °C is exactly −40 °F." },
  { question: "What is absolute zero in Celsius?", answer: "Absolute zero is 0 Kelvin, which equals −273.15 °C or −459.67 °F. It is the lowest temperature physically possible." },
];

const TemperatureConverter = () => (
  <ToolPage
    title="Temperature Converter – Celsius to Fahrenheit & Kelvin"
    description="Convert Celsius to Fahrenheit, Fahrenheit to Celsius and Kelvin instantly. Free temperature converter with formulas, chart and FAQs — runs in your browser."
    path="/temperature-converter"
    h1="Temperature Converter — Celsius, Fahrenheit, Kelvin"
    intro="Convert °C to °F, °F to °C and Kelvin instantly with exact formulas."
    crumbs={[{ label: "Temperature", path: "/temperature-converter" }, { label: "Temperature Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={unitCategories.temperature.units}
        storageKey="temperature"
        defaultFrom="C"
        defaultTo="F"
        isTemperature
      />
    }
  >
    <h2>Celsius to Fahrenheit made simple</h2>
    <p>
      Temperature is unusual among units because the scales do not share a zero point. Converting metres to feet is a
      single multiplication, but Celsius and Fahrenheit need both a scale factor and an offset. That is why a quick
      mental shortcut ("double it and add 30") gets you close but is never exact. This converter applies the precise
      formulas so that oven temperatures, weather forecasts, body temperature readings and laboratory values are always
      correct to the decimal.
    </p>
    <p>
      Enter a value, choose the scale you have and the scale you want, then press swap to reverse the direction. The
      copy button puts the answer on your clipboard, and your recent conversions stay in your own browser only.
    </p>

    <h2>Temperature conversion formulas</h2>
    <ul>
      <li>°F = (°C × 9/5) + 32</li>
      <li>°C = (°F − 32) × 5/9</li>
      <li>K = °C + 273.15</li>
      <li>°C = K − 273.15</li>
    </ul>

    <h2>Celsius to Fahrenheit chart</h2>
    <table className="seo-table">
      <thead><tr><th>Celsius</th><th>Fahrenheit</th><th>Kelvin</th><th>Reference</th></tr></thead>
      <tbody>
        <tr><td>−40 °C</td><td>−40 °F</td><td>233.15 K</td><td>Scales meet</td></tr>
        <tr><td>0 °C</td><td>32 °F</td><td>273.15 K</td><td>Water freezes</td></tr>
        <tr><td>20 °C</td><td>68 °F</td><td>293.15 K</td><td>Room temperature</td></tr>
        <tr><td>37 °C</td><td>98.6 °F</td><td>310.15 K</td><td>Body temperature</td></tr>
        <tr><td>100 °C</td><td>212 °F</td><td>373.15 K</td><td>Water boils</td></tr>
        <tr><td>180 °C</td><td>356 °F</td><td>453.15 K</td><td>Baking oven</td></tr>
      </tbody>
    </table>

    <h3>When to use Kelvin</h3>
    <p>
      Kelvin is the SI base unit of temperature and starts at absolute zero, the point where molecular motion stops. It
      has no negative values and no degree symbol, which makes it the standard in physics, chemistry and engineering
      calculations such as gas laws where ratios of temperature must be meaningful. A one-Kelvin change is the same size
      as a one-degree-Celsius change, so converting between the two only requires adding or subtracting 273.15.
    </p>
  </ToolPage>
);

export default TemperatureConverter;
