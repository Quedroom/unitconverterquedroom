import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";

// Factors relative to one litre.
const volumeUnits = [
  { name: "Milliliter", symbol: "mL", factor: 0.001 },
  { name: "Liter", symbol: "L", factor: 1 },
  { name: "Cubic Meter", symbol: "m3", factor: 1000 },
  { name: "Gallon (US)", symbol: "gal", factor: 3.785411784 },
  { name: "Quart (US)", symbol: "qt", factor: 0.946352946 },
  { name: "Pint (US)", symbol: "pt", factor: 0.473176473 },
  { name: "Fluid Ounce (US)", symbol: "floz", factor: 0.0295735296 },
  { name: "Cup (US)", symbol: "cup", factor: 0.2365882365 },
  { name: "Tablespoon", symbol: "tbsp", factor: 0.0147867648 },
  { name: "Teaspoon", symbol: "tsp", factor: 0.0049289216 },
];

const faqs = [
  { question: "How many milliliters are in one cup?", answer: "One US cup is about 236.59 milliliters. For cooking, 240 mL is often rounded to one cup; this converter uses the exact US legal cup of 236.59 mL." },
  { question: "How many tablespoons in a cup?", answer: "One US cup contains 16 tablespoons, and one tablespoon contains 3 teaspoons. So 1 cup = 16 tbsp = 48 tsp." },
  { question: "How many liters in a gallon?", answer: "One US gallon is 3.785 liters. Note that a UK (imperial) gallon is larger, at 4.546 liters — this tool uses the US gallon." },
  { question: "Is this volume converter free?", answer: "Yes. The volume converter is completely free, needs no sign-up, and runs entirely inside your browser so no measurement you type is ever uploaded or stored." },
];

const VolumeConverter = () => (
  <ToolPage
    title="Volume Converter – liters to gallons, cups to ml"
    description="Free volume converter for liters to gallons, cups to ml, tablespoons to teaspoons, pints and more. Instant results with cooking units — 100% in your browser."
    path="/volume-converter"
    h1="Volume Converter — liters, gallons, cups, ml"
    intro="Convert volume and cooking units instantly — milliliters, liters, gallons, cups, tablespoons and teaspoons. Type a value and copy the result."
    crumbs={[{ label: "Volume", path: "/volume-converter" }, { label: "Volume Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={volumeUnits}
        storageKey="volume"
        defaultFrom="cup"
        defaultTo="mL"
      />
    }
  >
    <h2>How to use the volume converter</h2>
    <p>
      Volume conversions come up in two very different settings. In the kitchen, recipes written in the United States
      measure in cups, tablespoons and fluid ounces while Indian and European recipes use milliliters and liters —
      and guessing the conversion is a fast way to ruin a bake. Elsewhere, you might convert liters to gallons for
      fuel, or cubic meters to liters for a water tank. This converter covers both: enter a number, choose the unit
      you are starting from, choose the unit you want, and the answer appears immediately. Swap flips the direction,
      and copy places the exact figure on your clipboard.
    </p>
    <p>
      Every calculation runs locally in your browser using exact US customary conversion factors, so results are
      accurate to eight decimal places and nothing you type leaves your device. Your last five conversions stay in
      your own browser storage and can be cleared with one click.
    </p>

    <h2>Volume conversion formulas</h2>
    <h3>Kitchen units</h3>
    <ul>
      <li>Milliliters = cups × 236.588</li>
      <li>Tablespoons = cups × 16</li>
      <li>Teaspoons = tablespoons × 3</li>
      <li>Fluid ounces = milliliters ÷ 29.5735</li>
    </ul>
    <h3>Larger units</h3>
    <ul>
      <li>Liters = gallons × 3.78541</li>
      <li>Gallons = liters ÷ 3.78541</li>
      <li>Liters = cubic meters × 1,000</li>
      <li>Pints = liters × 2.11338</li>
    </ul>

    <h2>Volume conversion table</h2>
    <table className="seo-table">
      <thead>
        <tr><th>From</th><th>To</th><th>Multiply by</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Cup</td><td>Milliliter</td><td>236.588</td><td>2 cups = 473.18 ml</td></tr>
        <tr><td>Cup</td><td>Tablespoon</td><td>16</td><td>0.5 cup = 8 tbsp</td></tr>
        <tr><td>Tablespoon</td><td>Teaspoon</td><td>3</td><td>2 tbsp = 6 tsp</td></tr>
        <tr><td>Liter</td><td>Gallon (US)</td><td>0.264172</td><td>10 L = 2.642 gal</td></tr>
        <tr><td>Gallon (US)</td><td>Liter</td><td>3.78541</td><td>5 gal = 18.927 L</td></tr>
        <tr><td>Liter</td><td>Pint (US)</td><td>2.11338</td><td>1 L = 2.113 pt</td></tr>
        <tr><td>Cubic Meter</td><td>Liter</td><td>1,000</td><td>0.5 m³ = 500 L</td></tr>
      </tbody>
    </table>

    <h3>US versus metric measuring cups</h3>
    <p>
      A US measuring cup holds about 236.59 mL, while many metric countries treat one cup as a rounded 250 mL. If a
      recipe is written with grams and milliliters, prefer weighing with a scale; if it is written in cups, use the
      US cup this tool assumes. Consistency matters more than the rounding itself — pick one system for a recipe and
      stay with it throughout.
    </p>
  </ToolPage>
);

export default VolumeConverter;
