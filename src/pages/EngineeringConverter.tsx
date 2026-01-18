import { useState } from "react";
import Layout from "@/components/Layout";
import { ArrowRightLeft } from "lucide-react";

type EngineeringCategory = {
  name: string;
  units: { name: string; value: string; factor: number }[];
};

const engineeringCategories: Record<string, EngineeringCategory> = {
  pressure: {
    name: "Pressure",
    units: [
      { name: "Pascal", value: "Pa", factor: 1 },
      { name: "Kilopascal", value: "kPa", factor: 1000 },
      { name: "Megapascal", value: "MPa", factor: 1000000 },
      { name: "Bar", value: "bar", factor: 100000 },
      { name: "PSI", value: "psi", factor: 6894.76 },
      { name: "Atmosphere", value: "atm", factor: 101325 },
      { name: "mmHg", value: "mmHg", factor: 133.322 },
      { name: "Torr", value: "Torr", factor: 133.322 },
    ],
  },
  energy: {
    name: "Energy",
    units: [
      { name: "Joule", value: "J", factor: 1 },
      { name: "Kilojoule", value: "kJ", factor: 1000 },
      { name: "Megajoule", value: "MJ", factor: 1000000 },
      { name: "Calorie", value: "cal", factor: 4.184 },
      { name: "Kilocalorie", value: "kcal", factor: 4184 },
      { name: "Watt-hour", value: "Wh", factor: 3600 },
      { name: "Kilowatt-hour", value: "kWh", factor: 3600000 },
      { name: "BTU", value: "BTU", factor: 1055.06 },
      { name: "Electron volt", value: "eV", factor: 1.602e-19 },
    ],
  },
  power: {
    name: "Power",
    units: [
      { name: "Watt", value: "W", factor: 1 },
      { name: "Kilowatt", value: "kW", factor: 1000 },
      { name: "Megawatt", value: "MW", factor: 1000000 },
      { name: "Horsepower (metric)", value: "hp", factor: 735.499 },
      { name: "Horsepower (imperial)", value: "hp(I)", factor: 745.7 },
      { name: "BTU/hour", value: "BTU/h", factor: 0.293071 },
      { name: "Foot-pound/second", value: "ft·lb/s", factor: 1.35582 },
    ],
  },
  torque: {
    name: "Torque",
    units: [
      { name: "Newton-meter", value: "N·m", factor: 1 },
      { name: "Kilonewton-meter", value: "kN·m", factor: 1000 },
      { name: "Pound-foot", value: "lb·ft", factor: 1.35582 },
      { name: "Pound-inch", value: "lb·in", factor: 0.112985 },
      { name: "Kilogram-meter", value: "kg·m", factor: 9.80665 },
      { name: "Dyne-centimeter", value: "dyn·cm", factor: 1e-7 },
    ],
  },
  frequency: {
    name: "Frequency",
    units: [
      { name: "Hertz", value: "Hz", factor: 1 },
      { name: "Kilohertz", value: "kHz", factor: 1000 },
      { name: "Megahertz", value: "MHz", factor: 1000000 },
      { name: "Gigahertz", value: "GHz", factor: 1000000000 },
      { name: "RPM", value: "rpm", factor: 1 / 60 },
      { name: "Radians/second", value: "rad/s", factor: 1 / (2 * Math.PI) },
    ],
  },
  force: {
    name: "Force",
    units: [
      { name: "Newton", value: "N", factor: 1 },
      { name: "Kilonewton", value: "kN", factor: 1000 },
      { name: "Meganewton", value: "MN", factor: 1000000 },
      { name: "Dyne", value: "dyn", factor: 0.00001 },
      { name: "Pound-force", value: "lbf", factor: 4.44822 },
      { name: "Kilogram-force", value: "kgf", factor: 9.80665 },
      { name: "Kip", value: "kip", factor: 4448.22 },
    ],
  },
  density: {
    name: "Density",
    units: [
      { name: "kg/m³", value: "kg/m³", factor: 1 },
      { name: "g/cm³", value: "g/cm³", factor: 1000 },
      { name: "g/mL", value: "g/mL", factor: 1000 },
      { name: "kg/L", value: "kg/L", factor: 1000 },
      { name: "lb/ft³", value: "lb/ft³", factor: 16.0185 },
      { name: "lb/gal", value: "lb/gal", factor: 119.826 },
    ],
  },
  flowRate: {
    name: "Flow Rate",
    units: [
      { name: "m³/s", value: "m³/s", factor: 1 },
      { name: "m³/h", value: "m³/h", factor: 1 / 3600 },
      { name: "L/s", value: "L/s", factor: 0.001 },
      { name: "L/min", value: "L/min", factor: 0.001 / 60 },
      { name: "gal/min (US)", value: "gpm", factor: 0.0000630902 },
      { name: "ft³/s", value: "ft³/s", factor: 0.0283168 },
      { name: "ft³/min", value: "cfm", factor: 0.000471947 },
    ],
  },
};

const EngineeringConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("pressure");
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("Pa");
  const [toUnit, setToUnit] = useState<string>("psi");

  const category = engineeringCategories[selectedCategory];

  const convert = (): string => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "";

    const fromUnitData = category.units.find((u) => u.value === fromUnit);
    const toUnitData = category.units.find((u) => u.value === toUnit);

    if (!fromUnitData || !toUnitData) return "";

    const baseValue = value * fromUnitData.factor;
    const result = baseValue / toUnitData.factor;

    // Format with appropriate precision
    if (Math.abs(result) < 0.0001 || Math.abs(result) > 1000000) {
      return result.toExponential(6);
    }
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const units = engineeringCategories[cat].units;
    setFromUnit(units[0].value);
    setToUnit(units[1]?.value || units[0].value);
    setInputValue("");
  };

  return (
    <Layout showBack title="Engineering Converter">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Engineering Unit Converter</h1>
          <p className="section-subtitle">
            Precision conversions for engineering and scientific calculations
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {Object.entries(engineeringCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedCategory === key
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Converter Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {category.name} Conversion
          </h2>

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

          {/* Quick Reference */}
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Common Conversions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {selectedCategory === "pressure" && (
                <>
                  <span className="text-muted-foreground">1 bar = 14.5038 psi</span>
                  <span className="text-muted-foreground">1 atm = 101.325 kPa</span>
                </>
              )}
              {selectedCategory === "energy" && (
                <>
                  <span className="text-muted-foreground">1 kWh = 3.6 MJ</span>
                  <span className="text-muted-foreground">1 cal = 4.184 J</span>
                </>
              )}
              {selectedCategory === "power" && (
                <>
                  <span className="text-muted-foreground">1 hp = 0.7355 kW</span>
                  <span className="text-muted-foreground">1 kW = 1.341 hp</span>
                </>
              )}
              {selectedCategory === "torque" && (
                <>
                  <span className="text-muted-foreground">1 N·m = 0.7376 lb·ft</span>
                  <span className="text-muted-foreground">1 lb·ft = 1.3558 N·m</span>
                </>
              )}
              {selectedCategory === "frequency" && (
                <>
                  <span className="text-muted-foreground">1 MHz = 1000 kHz</span>
                  <span className="text-muted-foreground">60 rpm = 1 Hz</span>
                </>
              )}
              {selectedCategory === "force" && (
                <>
                  <span className="text-muted-foreground">1 kgf = 9.807 N</span>
                  <span className="text-muted-foreground">1 lbf = 4.448 N</span>
                </>
              )}
              {selectedCategory === "density" && (
                <>
                  <span className="text-muted-foreground">1 g/cm³ = 1000 kg/m³</span>
                  <span className="text-muted-foreground">Water ≈ 1000 kg/m³</span>
                </>
              )}
              {selectedCategory === "flowRate" && (
                <>
                  <span className="text-muted-foreground">1 L/s = 15.85 gpm</span>
                  <span className="text-muted-foreground">1 m³/h = 4.403 gpm</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EngineeringConverter;
