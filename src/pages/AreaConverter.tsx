import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";

// Factors relative to one square metre.
const areaUnits = [
  { name: "Sq Millimeter", symbol: "mm2", factor: 0.000001 },
  { name: "Sq Centimeter", symbol: "cm2", factor: 0.0001 },
  { name: "Sq Meter", symbol: "m2", factor: 1 },
  { name: "Sq Kilometer", symbol: "km2", factor: 1000000 },
  { name: "Hectare", symbol: "ha", factor: 10000 },
  { name: "Acre", symbol: "ac", factor: 4046.8564224 },
  { name: "Sq Foot", symbol: "ft2", factor: 0.09290304 },
  { name: "Sq Inch", symbol: "in2", factor: 0.00064516 },
  { name: "Bigha (Assam)", symbol: "bigha", factor: 1337.803776 },
  { name: "Katha (Assam)", symbol: "katha", factor: 267.5607552 },
  { name: "Lecha (Assam)", symbol: "lecha", factor: 13.37803776 },
];

const faqs = [
  { question: "How many square feet is one bigha in Assam?", answer: "In Assam one bigha equals 5 katha, one katha equals 20 lecha, and one lecha is 144 square feet. That gives 2,880 square feet per katha and 14,400 square feet per bigha, or about 1,337.8 square metres. Bigha sizes differ in other Indian states, so always use the Assam definition for Assam land records." },
  { question: "How many katha in one acre?", answer: "One acre is 43,560 square feet. Since one Assam katha is 2,880 square feet, one acre is about 15.12 katha, or roughly 3.02 bigha." },
  { question: "How many square meters in one hectare?", answer: "One hectare is exactly 10,000 square meters, which is 2.471 acres or about 7.47 Assam bigha." },
  { question: "Is this area converter free?", answer: "Yes. The area converter is completely free, needs no sign-up, and runs entirely inside your browser so no measurement you type is ever uploaded or stored." },
];

const AreaConverter = () => (
  <ToolPage
    title="Area Converter – bigha to sq ft, acre to hectare"
    description="Free area converter for bigha to square feet (Assam), katha, lecha, acre to hectare, sq meter and more. Instant results, tables and formulas — 100% in your browser."
    path="/area-converter"
    h1="Area Converter — bigha, sq ft, acre, hectare"
    intro="Convert land and area units instantly, including Assam's bigha, katha and lecha. Type a value, pick your units and copy the result."
    crumbs={[{ label: "Area", path: "/area-converter" }, { label: "Area Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={areaUnits}
        storageKey="area"
        defaultFrom="bigha"
        defaultTo="ft2"
      />
    }
  >
    <h2>How to use the area converter</h2>
    <p>
      Area conversion shows up everywhere from school geometry to property deals. Home buyers in Assam think in bigha,
      katha and lecha while builders, banks and registration documents quote square feet; farmers compare hectares and
      acres; students convert square meters to square centimeters for homework. This converter bridges all of those
      systems in one card: enter a number, choose the unit you have, choose the unit you want, and the answer appears
      instantly. The swap button flips the direction so you can check the reverse conversion without retyping, and the
      copy button places the exact result on your clipboard.
    </p>
    <p>
      Every calculation runs locally in your browser using exact conversion factors, so results are accurate to eight
      decimal places and nothing you type leaves your device. Your last five conversions stay in your own browser
      storage and can be cleared with one click.
    </p>

    <h2>Area conversion formulas</h2>
    <ul>
      <li>Sq feet = sq meters × 10.7639</li>
      <li>Acre = sq feet ÷ 43,560</li>
      <li>Hectare = sq meters ÷ 10,000</li>
      <li>Bigha (Assam) = sq feet ÷ 14,400</li>
      <li>Katha (Assam) = sq feet ÷ 2,880</li>
      <li>Lecha (Assam) = sq feet ÷ 144</li>
    </ul>

    <h2>Assam land conversion table</h2>
    <table className="seo-table">
      <thead>
        <tr><th>From</th><th>To</th><th>Multiply by</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Bigha (Assam)</td><td>Sq Foot</td><td>14,400</td><td>2 bigha = 28,800 sq ft</td></tr>
        <tr><td>Bigha (Assam)</td><td>Sq Meter</td><td>1,337.8</td><td>1 bigha = 1,337.8 m²</td></tr>
        <tr><td>Katha (Assam)</td><td>Sq Foot</td><td>2,880</td><td>5 katha = 14,400 sq ft</td></tr>
        <tr><td>Lecha (Assam)</td><td>Sq Foot</td><td>144</td><td>20 lecha = 2,880 sq ft</td></tr>
        <tr><td>Acre</td><td>Hectare</td><td>0.404686</td><td>10 ac = 4.0469 ha</td></tr>
        <tr><td>Sq Meter</td><td>Sq Foot</td><td>10.7639</td><td>50 m² = 538.2 sq ft</td></tr>
        <tr><td>Hectare</td><td>Bigha (Assam)</td><td>7.4746</td><td>2 ha = 14.95 bigha</td></tr>
      </tbody>
    </table>

    <h3>Why bigha is not the same everywhere</h3>
    <p>
      Bigha was never standardised nationally. Assam fixes one bigha at 14,400 square feet (5 katha of 2,880 sq ft
      each), Uttar Pradesh traditionally uses 27,000 square feet and Rajasthan around 17,424. This tool uses the Assam
      definition, which matches the state's land records. Before any property transaction, confirm the unit on the
      patta or sale deed — a bigha quoted for another state can be nearly twice the size.
    </p>
  </ToolPage>
);

export default AreaConverter;
