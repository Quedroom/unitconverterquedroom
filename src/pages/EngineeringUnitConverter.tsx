import { useState } from "react";
import Layout from "@/components/Layout";
import { 
  ArrowRightLeft, 
  Ruler, 
  Scale, 
  Thermometer, 
  Square, 
  Box, 
  Gauge, 
  Clock,
  ArrowLeft,
  Compass,
  ArrowDownUp,
  Settings,
  Zap,
  Power,
  Radio,
  Droplets,
  Wind,
  Activity,
  Waves,
  RotateCw,
  Search
} from "lucide-react";

type UnitCategory = {
  name: string;
  description: string;
  icon: React.ElementType;
  units: { name: string; value: string; factor: number }[];
  isTemperature?: boolean;
};

const allCategories: Record<string, UnitCategory> = {
  // Basic Units
  length: {
    name: "Length",
    description: "Distance and dimensional measurements",
    icon: Ruler,
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
    name: "Mass & Weight",
    description: "Mass and weight measurements",
    icon: Scale,
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
    description: "Thermal measurements",
    icon: Thermometer,
    isTemperature: true,
    units: [
      { name: "Celsius", value: "°C", factor: 1 },
      { name: "Fahrenheit", value: "°F", factor: 1 },
      { name: "Kelvin", value: "K", factor: 1 },
    ],
  },
  area: {
    name: "Area",
    description: "Surface measurements",
    icon: Square,
    units: [
      { name: "Sq Millimeter", value: "mm²", factor: 0.000001 },
      { name: "Sq Centimeter", value: "cm²", factor: 0.0001 },
      { name: "Sq Meter", value: "m²", factor: 1 },
      { name: "Sq Kilometer", value: "km²", factor: 1000000 },
      { name: "Hectare", value: "ha", factor: 10000 },
      { name: "Acre", value: "ac", factor: 4046.86 },
      { name: "Sq Foot", value: "ft²", factor: 0.092903 },
    ],
  },
  volume: {
    name: "Volume",
    description: "Capacity and volume",
    icon: Box,
    units: [
      { name: "Milliliter", value: "mL", factor: 0.001 },
      { name: "Liter", value: "L", factor: 1 },
      { name: "Cubic Meter", value: "m³", factor: 1000 },
      { name: "Gallon (US)", value: "gal", factor: 3.78541 },
      { name: "Quart", value: "qt", factor: 0.946353 },
      { name: "Pint", value: "pt", factor: 0.473176 },
      { name: "Fluid Ounce", value: "fl oz", factor: 0.0295735 },
    ],
  },
  time: {
    name: "Time",
    description: "Time duration",
    icon: Clock,
    units: [
      { name: "Millisecond", value: "ms", factor: 0.001 },
      { name: "Second", value: "s", factor: 1 },
      { name: "Minute", value: "min", factor: 60 },
      { name: "Hour", value: "h", factor: 3600 },
      { name: "Day", value: "d", factor: 86400 },
      { name: "Week", value: "wk", factor: 604800 },
      { name: "Year", value: "yr", factor: 31556952 },
    ],
  },
  // Engineering Units
  pressure: {
    name: "Pressure & Stress",
    description: "Force per unit area",
    icon: Gauge,
    units: [
      { name: "Pascal", value: "Pa", factor: 1 },
      { name: "Kilopascal", value: "kPa", factor: 1000 },
      { name: "Megapascal", value: "MPa", factor: 1000000 },
      { name: "Bar", value: "bar", factor: 100000 },
      { name: "PSI", value: "psi", factor: 6894.76 },
      { name: "Atmosphere", value: "atm", factor: 101325 },
      { name: "mmHg", value: "mmHg", factor: 133.322 },
    ],
  },
  force: {
    name: "Force",
    description: "Force measurements",
    icon: ArrowDownUp,
    units: [
      { name: "Newton", value: "N", factor: 1 },
      { name: "Kilonewton", value: "kN", factor: 1000 },
      { name: "Meganewton", value: "MN", factor: 1000000 },
      { name: "Dyne", value: "dyn", factor: 0.00001 },
      { name: "Pound-force", value: "lbf", factor: 4.44822 },
      { name: "Kilogram-force", value: "kgf", factor: 9.80665 },
    ],
  },
  torque: {
    name: "Torque",
    description: "Rotational force",
    icon: Settings,
    units: [
      { name: "Newton-meter", value: "N·m", factor: 1 },
      { name: "Kilonewton-meter", value: "kN·m", factor: 1000 },
      { name: "Pound-foot", value: "lb·ft", factor: 1.35582 },
      { name: "Pound-inch", value: "lb·in", factor: 0.112985 },
      { name: "Kilogram-meter", value: "kg·m", factor: 9.80665 },
    ],
  },
  energy: {
    name: "Energy & Work",
    description: "Work and energy",
    icon: Zap,
    units: [
      { name: "Joule", value: "J", factor: 1 },
      { name: "Kilojoule", value: "kJ", factor: 1000 },
      { name: "Megajoule", value: "MJ", factor: 1000000 },
      { name: "Calorie", value: "cal", factor: 4.184 },
      { name: "Kilocalorie", value: "kcal", factor: 4184 },
      { name: "Watt-hour", value: "Wh", factor: 3600 },
      { name: "Kilowatt-hour", value: "kWh", factor: 3600000 },
      { name: "BTU", value: "BTU", factor: 1055.06 },
    ],
  },
  power: {
    name: "Power",
    description: "Rate of energy transfer",
    icon: Power,
    units: [
      { name: "Watt", value: "W", factor: 1 },
      { name: "Kilowatt", value: "kW", factor: 1000 },
      { name: "Megawatt", value: "MW", factor: 1000000 },
      { name: "Horsepower (metric)", value: "hp", factor: 735.499 },
      { name: "Horsepower (imperial)", value: "hp(I)", factor: 745.7 },
      { name: "BTU/hour", value: "BTU/h", factor: 0.293071 },
    ],
  },
  speed: {
    name: "Speed & Velocity",
    description: "Rate of motion",
    icon: Wind,
    units: [
      { name: "Meter/second", value: "m/s", factor: 1 },
      { name: "Kilometer/hour", value: "km/h", factor: 0.277778 },
      { name: "Mile/hour", value: "mph", factor: 0.44704 },
      { name: "Knot", value: "kn", factor: 0.514444 },
      { name: "Foot/second", value: "ft/s", factor: 0.3048 },
    ],
  },
  acceleration: {
    name: "Acceleration",
    description: "Rate of velocity change",
    icon: Activity,
    units: [
      { name: "m/s²", value: "m/s²", factor: 1 },
      { name: "km/h/s", value: "km/h/s", factor: 0.277778 },
      { name: "ft/s²", value: "ft/s²", factor: 0.3048 },
      { name: "g (gravity)", value: "g", factor: 9.80665 },
      { name: "Gal", value: "Gal", factor: 0.01 },
    ],
  },
  density: {
    name: "Density",
    description: "Mass per unit volume",
    icon: Droplets,
    units: [
      { name: "kg/m³", value: "kg/m³", factor: 1 },
      { name: "g/cm³", value: "g/cm³", factor: 1000 },
      { name: "g/mL", value: "g/mL", factor: 1000 },
      { name: "kg/L", value: "kg/L", factor: 1000 },
      { name: "lb/ft³", value: "lb/ft³", factor: 16.0185 },
    ],
  },
  flowRate: {
    name: "Flow Rate",
    description: "Volumetric and mass flow",
    icon: Waves,
    units: [
      { name: "m³/s", value: "m³/s", factor: 1 },
      { name: "m³/h", value: "m³/h", factor: 1 / 3600 },
      { name: "L/s", value: "L/s", factor: 0.001 },
      { name: "L/min", value: "L/min", factor: 0.001 / 60 },
      { name: "gal/min (US)", value: "gpm", factor: 0.0000630902 },
      { name: "ft³/min", value: "cfm", factor: 0.000471947 },
    ],
  },
  frequency: {
    name: "Frequency",
    description: "Cycles per unit time",
    icon: Radio,
    units: [
      { name: "Hertz", value: "Hz", factor: 1 },
      { name: "Kilohertz", value: "kHz", factor: 1000 },
      { name: "Megahertz", value: "MHz", factor: 1000000 },
      { name: "Gigahertz", value: "GHz", factor: 1000000000 },
      { name: "RPM", value: "rpm", factor: 1 / 60 },
    ],
  },
  angle: {
    name: "Angle",
    description: "Angular measurements",
    icon: RotateCw,
    units: [
      { name: "Degree", value: "°", factor: 1 },
      { name: "Radian", value: "rad", factor: 180 / Math.PI },
      { name: "Gradian", value: "grad", factor: 0.9 },
      { name: "Arcminute", value: "'", factor: 1 / 60 },
      { name: "Arcsecond", value: "\"", factor: 1 / 3600 },
      { name: "Revolution", value: "rev", factor: 360 },
    ],
  },
  dataStorage: {
    name: "Data Storage",
    description: "Digital storage units",
    icon: Box,
    units: [
      { name: "Bit", value: "b", factor: 1 },
      { name: "Byte", value: "B", factor: 8 },
      { name: "Kilobyte", value: "KB", factor: 8 * 1024 },
      { name: "Megabyte", value: "MB", factor: 8 * 1024 * 1024 },
      { name: "Gigabyte", value: "GB", factor: 8 * 1024 * 1024 * 1024 },
      { name: "Terabyte", value: "TB", factor: 8 * 1024 * 1024 * 1024 * 1024 },
    ],
  },
};

const EngineeringUnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const category = selectedCategory ? allCategories[selectedCategory] : null;

  const filteredCategories = Object.entries(allCategories).filter(([_, cat]) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    if (from === "°C") celsius = value;
    else if (from === "°F") celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;
    
    if (to === "°C") return celsius;
    else if (to === "°F") return celsius * 9/5 + 32;
    else return celsius + 273.15;
  };

  const convert = (): string => {
    if (!category) return "";
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "";

    if (category.isTemperature) {
      return convertTemperature(value, fromUnit, toUnit).toFixed(6).replace(/\.?0+$/, "");
    }

    const fromUnitData = category.units.find((u) => u.value === fromUnit);
    const toUnitData = category.units.find((u) => u.value === toUnit);

    if (!fromUnitData || !toUnitData) return "";

    const baseValue = value * fromUnitData.factor;
    const result = baseValue / toUnitData.factor;

    if (Math.abs(result) < 0.0001 || Math.abs(result) > 1000000) {
      return result.toExponential(6);
    }
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const units = allCategories[cat].units;
    setFromUnit(units[0].value);
    setToUnit(units[1]?.value || units[0].value);
    setInputValue("");
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setInputValue("");
  };

  return (
    <Layout showBack title="Engineering Unit Converter">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Engineering Unit Converter</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Search for any unit or select a category below. Convert pressure, length, force, 
            temperature, volume, mass, and more. Perfect for mechanical engineering, physics, and science students.
          </p>
        </div>

        {!selectedCategory ? (
          <>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search units... (e.g., 'psi', 'meter', 'temperature')"
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredCategories.map(([key, cat], index) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="group converter-card text-left animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="converter-card-icon">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 text-sm">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No categories found matching "{searchQuery}"
              </div>
            )}
          </>
        ) : (
          /* Converter Interface */
          <div className="animate-fade-in">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to categories</span>
            </button>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                {category && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </>
                )}
              </div>

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
                    {category?.units.map((unit) => (
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
                    {category?.units.map((unit) => (
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

              {/* Tip */}
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Tip: Enter a value and see instant results. Use the swap button to reverse the conversion direction.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EngineeringUnitConverter;
