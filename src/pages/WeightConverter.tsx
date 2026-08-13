import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";
import { unitCategories } from "@/lib/mcp/units";

const faqs = [
  { question: "How many pounds are in a kilogram?", answer: "One kilogram equals 2.20462 pounds. To convert kilograms to pounds multiply by 2.20462; to convert pounds to kilograms multiply by 0.453592." },
  { question: "How do I convert grams to kilograms?", answer: "Divide the number of grams by 1000. For example, 2500 g ÷ 1000 = 2.5 kg." },
  { question: "What is the difference between weight and mass?", answer: "Mass measures how much matter an object contains and is expressed in grams or kilograms. Weight is the force gravity exerts on that mass. In everyday use the two terms are used interchangeably, and this converter works with mass units." },
  { question: "Is my data stored when I use this converter?", answer: "No. All conversions run in your browser. Nothing you type is uploaded, logged or stored on a server." },
];

const WeightConverter = () => (
  <ToolPage
    title="Weight Converter – kg to lbs, gram to kg, ounce to pound"
    description="Free weight and mass converter: kg to lbs, grams to kg, ounces, stones and tons. Instant results with formulas and conversion tables, all in your browser."
    path="/weight-converter"
    h1="Weight Converter — kg, lbs, grams, ounces"
    intro="Convert kilograms, pounds, grams, ounces, stones and tons instantly with exact factors."
    crumbs={[{ label: "Weight", path: "/weight-converter" }, { label: "Weight Converter" }]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={unitCategories.weight.units}
        storageKey="weight"
        defaultFrom="kg"
        defaultTo="lb"
      />
    }
  >
    <h2>Convert kilograms, pounds and grams the easy way</h2>
    <p>
      Weight conversion comes up constantly: shipping a parcel priced by the kilogram, following a recipe written in
      ounces, tracking body weight in pounds while your scale reads kilograms, or scaling a chemistry experiment from
      milligrams to grams. This converter covers milligrams, grams, kilograms, metric tons, ounces, pounds and stones in
      one place, updating the result as you type. Use the swap button to reverse the direction of a conversion and the
      copy button to grab the answer for a spreadsheet or message.
    </p>
    <p>
      All factors are based on the international avoirdupois pound, defined in 1959 as exactly 0.45359237 kilograms.
      Because the tool runs entirely on your device, results are instant even on a slow connection and no measurement
      you enter is ever transmitted.
    </p>

    <h2>Weight conversion formulas</h2>
    <ul>
      <li>Pounds = kilograms × 2.20462</li>
      <li>Kilograms = pounds × 0.453592</li>
      <li>Kilograms = grams ÷ 1000</li>
      <li>Grams = ounces × 28.3495</li>
      <li>Stones = kilograms ÷ 6.35029</li>
    </ul>

    <h2>Kg to lbs conversion table</h2>
    <table className="seo-table">
      <thead><tr><th>Kilograms</th><th>Pounds</th><th>Stones</th></tr></thead>
      <tbody>
        <tr><td>1 kg</td><td>2.205 lb</td><td>0.157 st</td></tr>
        <tr><td>5 kg</td><td>11.023 lb</td><td>0.787 st</td></tr>
        <tr><td>10 kg</td><td>22.046 lb</td><td>1.575 st</td></tr>
        <tr><td>25 kg</td><td>55.116 lb</td><td>3.937 st</td></tr>
        <tr><td>50 kg</td><td>110.231 lb</td><td>7.874 st</td></tr>
        <tr><td>70 kg</td><td>154.324 lb</td><td>11.023 st</td></tr>
        <tr><td>100 kg</td><td>220.462 lb</td><td>15.747 st</td></tr>
      </tbody>
    </table>

    <h3>Grams, kilograms and metric prefixes</h3>
    <p>
      The metric system makes mass conversions simple because each step is a power of ten: 1000 milligrams make a gram,
      1000 grams make a kilogram, and 1000 kilograms make a metric ton. Recipes and postal rates usually switch between
      grams and kilograms, while industrial quantities move up to tons. When you see a decimal answer with many digits,
      it is because imperial units such as ounces do not divide evenly into metric units — the converter keeps up to
      eight decimal places so rounding never hides a meaningful difference.
    </p>
  </ToolPage>
);

export default WeightConverter;
