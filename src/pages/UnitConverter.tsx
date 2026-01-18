import { useState } from "react";
import Layout from "@/components/Layout";
import { ArrowRightLeft } from "lucide-react";

type UnitCategory = {
  name: string;
  units: { name: string; value: string; factor: number }[];
  baseUnit: string;
};

const unitCategories: Record<string, UnitCategory> = {
  length: {
    name: "Length",
    baseUnit: "meter",
    units: [
      { name: "Millimeter", value: "mm", factor: 0.001 },
      { name: "Centimeter", value: "cm", factor: 0.01 },
      { name: "Meter", value: "m", factor: 1 },
      { name: "Kilometer", value: "km", factor: 1000 },
      { name: "Inch", value: "in", factor: 0.0254 },
      { name: "Foot", value: "ft", factor: 0.3048 },
      { name: "Yard", value: "yd", factor: 0.9144 },
      { name: "Mile", value: "mi", factor: 1609.344 },
    ],
  },
  weight: {
    name: "Weight",
    baseUnit: "kilogram",
    units: [
      { name: "Milligram", value: "mg", factor: 0.000001 },
      { name: "Gram", value: "g", factor: 0.001 },
      { name: "Kilogram", value: "kg", factor: 1 },
      { name: "Metric Ton", value: "t", factor: 1000 },
      { name: "Ounce", value: "oz", factor: 0.0283495 },
      { name: "Pound", value: "lb", factor: 0.453592 },
      { name: "Stone", value: "st", factor: 6.35029 },
    ],
  },
  temperature: {
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { name: "Celsius", value: "°C", factor: 1 },
      { name: "Fahrenheit", value: "°F", factor: 1 },
      { name: "Kelvin", value: "K", factor: 1 },
    ],
  },
  area: {
    name: "Area",
    baseUnit: "square meter",
    units: [
      { name: "Sq Millimeter", value: "mm²", factor: 0.000001 },
      { name: "Sq Centimeter", value: "cm²", factor: 0.0001 },
      { name: "Sq Meter", value: "m²", factor: 1 },
      { name: "Sq Kilometer", value: "km²", factor: 1000000 },
      { name: "Hectare", value: "ha", factor: 10000 },
      { name: "Acre", value: "ac", factor: 4046.86 },
      { name: "Sq Foot", value: "ft²", factor: 0.092903 },
      { name: "Sq Yard", value: "yd²", factor: 0.836127 },
    ],
  },
  volume: {
    name: "Volume",
    baseUnit: "liter",
    units: [
      { name: "Milliliter", value: "mL", factor: 0.001 },
      { name: "Liter", value: "L", factor: 1 },
      { name: "Cubic Meter", value: "m³", factor: 1000 },
      { name: "Gallon (US)", value: "gal", factor: 3.78541 },
      { name: "Quart", value: "qt", factor: 0.946353 },
      { name: "Pint", value: "pt", factor: 0.473176 },
      { name: "Cup", value: "cup", factor: 0.236588 },
      { name: "Fluid Ounce", value: "fl oz", factor: 0.0295735 },
    ],
  },
  speed: {
    name: "Speed",
    baseUnit: "m/s",
    units: [
      { name: "Meter/second", value: "m/s", factor: 1 },
      { name: "Kilometer/hour", value: "km/h", factor: 0.277778 },
      { name: "Mile/hour", value: "mph", factor: 0.44704 },
      { name: "Knot", value: "kn", factor: 0.514444 },
      { name: "Foot/second", value: "ft/s", factor: 0.3048 },
    ],
  },
  time: {
    name: "Time",
    baseUnit: "second",
    units: [
      { name: "Millisecond", value: "ms", factor: 0.001 },
      { name: "Second", value: "s", factor: 1 },
      { name: "Minute", value: "min", factor: 60 },
      { name: "Hour", value: "h", factor: 3600 },
      { name: "Day", value: "d", factor: 86400 },
      { name: "Week", value: "wk", factor: 604800 },
      { name: "Month", value: "mo", factor: 2629746 },
      { name: "Year", value: "yr", factor: 31556952 },
    ],
  },
};

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("length");
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");

  const category = unitCategories[selectedCategory];

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    // Convert to Celsius first
    if (from === "°C") celsius = value;
    else if (from === "°F") celsius = (value - 32) * 5/9;
    else celsius = value - 273.15; // Kelvin
    
    // Convert from Celsius to target
    if (to === "°C") return celsius;
    else if (to === "°F") return celsius * 9/5 + 32;
    else return celsius + 273.15; // Kelvin
  };

  const convert = (): string => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "";

    if (selectedCategory === "temperature") {
      return convertTemperature(value, fromUnit, toUnit).toFixed(6);
    }

    const fromUnitData = category.units.find((u) => u.value === fromUnit);
    const toUnitData = category.units.find((u) => u.value === toUnit);

    if (!fromUnitData || !toUnitData) return "";

    const baseValue = value * fromUnitData.factor;
    const result = baseValue / toUnitData.factor;

    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const units = unitCategories[cat].units;
    setFromUnit(units[0].value);
    setToUnit(units[1]?.value || units[0].value);
    setInputValue("");
  };

  return (
    <Layout showBack title="Unit Converter">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Unit Converter</h1>
          <p className="section-subtitle">
            Convert between different units of measurement instantly
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(unitCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`category-tab ${selectedCategory === key ? "active" : ""}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            {/* From */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-muted-foreground">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="select-field"
              >
                {category.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.name} ({unit.value})
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="input-field text-xl font-mono"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pb-3">
              <button
                onClick={swapUnits}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <ArrowRightLeft className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* To */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-muted-foreground">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="select-field"
              >
                {category.units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.name} ({unit.value})
                  </option>
                ))}
              </select>
              <div className="result-display text-xl">
                {convert() || "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnitConverter;
