// Standalone unit tables for the MCP server.
// Kept free of React/UI imports so the MCP bundle stays import-safe.

export type Unit = { name: string; symbol: string; factor: number };
export type UnitCategory = { name: string; units: Unit[]; isTemperature?: boolean };

export const unitCategories: Record<string, UnitCategory> = {
  length: {
    name: "Length",
    units: [
      { name: "Millimeter", symbol: "mm", factor: 0.001 },
      { name: "Centimeter", symbol: "cm", factor: 0.01 },
      { name: "Meter", symbol: "m", factor: 1 },
      { name: "Kilometer", symbol: "km", factor: 1000 },
      { name: "Inch", symbol: "in", factor: 0.0254 },
      { name: "Foot", symbol: "ft", factor: 0.3048 },
      { name: "Yard", symbol: "yd", factor: 0.9144 },
      { name: "Mile", symbol: "mi", factor: 1609.344 },
    ],
  },
  weight: {
    name: "Weight & Mass",
    units: [
      { name: "Milligram", symbol: "mg", factor: 0.000001 },
      { name: "Gram", symbol: "g", factor: 0.001 },
      { name: "Kilogram", symbol: "kg", factor: 1 },
      { name: "Metric Ton", symbol: "t", factor: 1000 },
      { name: "Ounce", symbol: "oz", factor: 0.0283495 },
      { name: "Pound", symbol: "lb", factor: 0.453592 },
      { name: "Stone", symbol: "st", factor: 6.35029 },
    ],
  },
  temperature: {
    name: "Temperature",
    isTemperature: true,
    units: [
      { name: "Celsius", symbol: "C", factor: 1 },
      { name: "Fahrenheit", symbol: "F", factor: 1 },
      { name: "Kelvin", symbol: "K", factor: 1 },
    ],
  },
  area: {
    name: "Area",
    units: [
      { name: "Sq Millimeter", symbol: "mm2", factor: 0.000001 },
      { name: "Sq Centimeter", symbol: "cm2", factor: 0.0001 },
      { name: "Sq Meter", symbol: "m2", factor: 1 },
      { name: "Sq Kilometer", symbol: "km2", factor: 1000000 },
      { name: "Hectare", symbol: "ha", factor: 10000 },
      { name: "Acre", symbol: "ac", factor: 4046.86 },
      { name: "Sq Foot", symbol: "ft2", factor: 0.092903 },
    ],
  },
  volume: {
    name: "Volume",
    units: [
      { name: "Milliliter", symbol: "mL", factor: 0.001 },
      { name: "Liter", symbol: "L", factor: 1 },
      { name: "Cubic Meter", symbol: "m3", factor: 1000 },
      { name: "Gallon (US)", symbol: "gal", factor: 3.78541 },
      { name: "Quart", symbol: "qt", factor: 0.946353 },
      { name: "Pint", symbol: "pt", factor: 0.473176 },
      { name: "Fluid Ounce", symbol: "floz", factor: 0.0295735 },
    ],
  },
  time: {
    name: "Time",
    units: [
      { name: "Millisecond", symbol: "ms", factor: 0.001 },
      { name: "Second", symbol: "s", factor: 1 },
      { name: "Minute", symbol: "min", factor: 60 },
      { name: "Hour", symbol: "h", factor: 3600 },
      { name: "Day", symbol: "d", factor: 86400 },
      { name: "Week", symbol: "wk", factor: 604800 },
      { name: "Year", symbol: "yr", factor: 31556952 },
    ],
  },
  pressure: {
    name: "Pressure & Stress",
    units: [
      { name: "Pascal", symbol: "Pa", factor: 1 },
      { name: "Kilopascal", symbol: "kPa", factor: 1000 },
      { name: "Megapascal", symbol: "MPa", factor: 1000000 },
      { name: "Bar", symbol: "bar", factor: 100000 },
      { name: "PSI", symbol: "psi", factor: 6894.76 },
      { name: "Atmosphere", symbol: "atm", factor: 101325 },
      { name: "mmHg", symbol: "mmHg", factor: 133.322 },
    ],
  },
  force: {
    name: "Force",
    units: [
      { name: "Newton", symbol: "N", factor: 1 },
      { name: "Kilonewton", symbol: "kN", factor: 1000 },
      { name: "Meganewton", symbol: "MN", factor: 1000000 },
      { name: "Dyne", symbol: "dyn", factor: 0.00001 },
      { name: "Pound-force", symbol: "lbf", factor: 4.44822 },
      { name: "Kilogram-force", symbol: "kgf", factor: 9.80665 },
    ],
  },
  torque: {
    name: "Torque",
    units: [
      { name: "Newton-meter", symbol: "Nm", factor: 1 },
      { name: "Kilonewton-meter", symbol: "kNm", factor: 1000 },
      { name: "Pound-foot", symbol: "lbft", factor: 1.35582 },
      { name: "Pound-inch", symbol: "lbin", factor: 0.112985 },
      { name: "Kilogram-meter", symbol: "kgm", factor: 9.80665 },
    ],
  },
  energy: {
    name: "Energy & Work",
    units: [
      { name: "Joule", symbol: "J", factor: 1 },
      { name: "Kilojoule", symbol: "kJ", factor: 1000 },
      { name: "Megajoule", symbol: "MJ", factor: 1000000 },
      { name: "Calorie", symbol: "cal", factor: 4.184 },
      { name: "Kilocalorie", symbol: "kcal", factor: 4184 },
      { name: "Watt-hour", symbol: "Wh", factor: 3600 },
      { name: "Kilowatt-hour", symbol: "kWh", factor: 3600000 },
      { name: "BTU", symbol: "BTU", factor: 1055.06 },
    ],
  },
  power: {
    name: "Power",
    units: [
      { name: "Watt", symbol: "W", factor: 1 },
      { name: "Kilowatt", symbol: "kW", factor: 1000 },
      { name: "Megawatt", symbol: "MW", factor: 1000000 },
      { name: "Horsepower (metric)", symbol: "hp", factor: 735.499 },
      { name: "Horsepower (imperial)", symbol: "hpI", factor: 745.7 },
      { name: "BTU/hour", symbol: "BTUh", factor: 0.293071 },
    ],
  },
  speed: {
    name: "Speed & Velocity",
    units: [
      { name: "Meter/second", symbol: "m/s", factor: 1 },
      { name: "Kilometer/hour", symbol: "km/h", factor: 0.277778 },
      { name: "Mile/hour", symbol: "mph", factor: 0.44704 },
      { name: "Knot", symbol: "kn", factor: 0.514444 },
      { name: "Foot/second", symbol: "ft/s", factor: 0.3048 },
    ],
  },
  acceleration: {
    name: "Acceleration",
    units: [
      { name: "Meter/second squared", symbol: "m/s2", factor: 1 },
      { name: "Foot/second squared", symbol: "ft/s2", factor: 0.3048 },
      { name: "g (gravity)", symbol: "g", factor: 9.80665 },
      { name: "Gal", symbol: "Gal", factor: 0.01 },
    ],
  },
  data: {
    name: "Digital Storage",
    units: [
      { name: "Bit", symbol: "bit", factor: 0.125 },
      { name: "Byte", symbol: "B", factor: 1 },
      { name: "Kilobyte", symbol: "KB", factor: 1024 },
      { name: "Megabyte", symbol: "MB", factor: 1048576 },
      { name: "Gigabyte", symbol: "GB", factor: 1073741824 },
      { name: "Terabyte", symbol: "TB", factor: 1099511627776 },
    ],
  },
};

const norm = (value: string) => value.toLowerCase().replace(/[\s·°²³_-]/g, "");

export function findUnit(category: UnitCategory, query: string): Unit | undefined {
  const q = norm(query);
  return category.units.find((u) => norm(u.symbol) === q || norm(u.name) === q);
}

export function convertTemperature(value: number, from: string, to: string): number {
  const f = from.toLowerCase()[0];
  const t = to.toLowerCase()[0];
  const celsius = f === "f" ? (value - 32) * (5 / 9) : f === "k" ? value - 273.15 : value;
  return t === "f" ? celsius * (9 / 5) + 32 : t === "k" ? celsius + 273.15 : celsius;
}
