import { useState } from "react";
import { Search, ArrowLeft, Check } from "lucide-react";

type FormulaInput = {
  name: string;
  symbol: string;
  unit: string;
  value: string;
};

type Formula = {
  name: string;
  equation: string;
  inputs: Omit<FormulaInput, "value">[];
  calculate: (inputs: Record<string, number>) => { result: number; unit: string };
  resultSymbol: string;
};

type FormulaCategory = {
  name: string;
  formulas: Formula[];
};

const formulaCategories: Record<string, FormulaCategory> = {
  mechanics: {
    name: "Mechanics",
    formulas: [
      {
        name: "Velocity",
        equation: "v = s / t",
        resultSymbol: "v",
        inputs: [
          { name: "Distance", symbol: "s", unit: "m" },
          { name: "Time", symbol: "t", unit: "s" },
        ],
        calculate: (inputs) => ({ result: inputs.s / inputs.t, unit: "m/s" }),
      },
      {
        name: "Acceleration",
        equation: "a = (v - u) / t",
        resultSymbol: "a",
        inputs: [
          { name: "Final Velocity", symbol: "v", unit: "m/s" },
          { name: "Initial Velocity", symbol: "u", unit: "m/s" },
          { name: "Time", symbol: "t", unit: "s" },
        ],
        calculate: (inputs) => ({ result: (inputs.v - inputs.u) / inputs.t, unit: "m/s²" }),
      },
      {
        name: "Force",
        equation: "F = m × a",
        resultSymbol: "F",
        inputs: [
          { name: "Mass", symbol: "m", unit: "kg" },
          { name: "Acceleration", symbol: "a", unit: "m/s²" },
        ],
        calculate: (inputs) => ({ result: inputs.m * inputs.a, unit: "N" }),
      },
      {
        name: "Work",
        equation: "W = F × d",
        resultSymbol: "W",
        inputs: [
          { name: "Force", symbol: "F", unit: "N" },
          { name: "Distance", symbol: "d", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs.F * inputs.d, unit: "J" }),
      },
      {
        name: "Kinetic Energy",
        equation: "KE = ½mv²",
        resultSymbol: "KE",
        inputs: [
          { name: "Mass", symbol: "m", unit: "kg" },
          { name: "Velocity", symbol: "v", unit: "m/s" },
        ],
        calculate: (inputs) => ({ result: 0.5 * inputs.m * Math.pow(inputs.v, 2), unit: "J" }),
      },
      {
        name: "Momentum",
        equation: "p = m × v",
        resultSymbol: "p",
        inputs: [
          { name: "Mass", symbol: "m", unit: "kg" },
          { name: "Velocity", symbol: "v", unit: "m/s" },
        ],
        calculate: (inputs) => ({ result: inputs.m * inputs.v, unit: "kg·m/s" }),
      },
    ],
  },
  strengthOfMaterials: {
    name: "Strength of Materials",
    formulas: [
      {
        name: "Stress",
        equation: "σ = F / A",
        resultSymbol: "σ",
        inputs: [
          { name: "Force", symbol: "F", unit: "N" },
          { name: "Area", symbol: "A", unit: "m²" },
        ],
        calculate: (inputs) => ({ result: inputs.F / inputs.A, unit: "Pa" }),
      },
      {
        name: "Strain",
        equation: "ε = ΔL / L",
        resultSymbol: "ε",
        inputs: [
          { name: "Change in Length", symbol: "ΔL", unit: "m" },
          { name: "Original Length", symbol: "L", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs["ΔL"] / inputs.L, unit: "" }),
      },
      {
        name: "Young's Modulus",
        equation: "E = σ / ε",
        resultSymbol: "E",
        inputs: [
          { name: "Stress", symbol: "σ", unit: "Pa" },
          { name: "Strain", symbol: "ε", unit: "" },
        ],
        calculate: (inputs) => ({ result: inputs["σ"] / inputs["ε"], unit: "Pa" }),
      },
      {
        name: "Bending Moment",
        equation: "M = F × L",
        resultSymbol: "M",
        inputs: [
          { name: "Force", symbol: "F", unit: "N" },
          { name: "Distance", symbol: "L", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs.F * inputs.L, unit: "N·m" }),
      },
    ],
  },
  pressureFluids: {
    name: "Pressure & Fluids",
    formulas: [
      {
        name: "Pressure",
        equation: "P = F / A",
        resultSymbol: "P",
        inputs: [
          { name: "Force", symbol: "F", unit: "N" },
          { name: "Area", symbol: "A", unit: "m²" },
        ],
        calculate: (inputs) => ({ result: inputs.F / inputs.A, unit: "Pa" }),
      },
      {
        name: "Hydrostatic Pressure",
        equation: "P = ρgh",
        resultSymbol: "P",
        inputs: [
          { name: "Density", symbol: "ρ", unit: "kg/m³" },
          { name: "Gravity", symbol: "g", unit: "m/s²" },
          { name: "Height", symbol: "h", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs["ρ"] * inputs.g * inputs.h, unit: "Pa" }),
      },
      {
        name: "Flow Rate",
        equation: "Q = A × v",
        resultSymbol: "Q",
        inputs: [
          { name: "Area", symbol: "A", unit: "m²" },
          { name: "Velocity", symbol: "v", unit: "m/s" },
        ],
        calculate: (inputs) => ({ result: inputs.A * inputs.v, unit: "m³/s" }),
      },
      {
        name: "Reynolds Number",
        equation: "Re = ρvD/μ",
        resultSymbol: "Re",
        inputs: [
          { name: "Density", symbol: "ρ", unit: "kg/m³" },
          { name: "Velocity", symbol: "v", unit: "m/s" },
          { name: "Diameter", symbol: "D", unit: "m" },
          { name: "Viscosity", symbol: "μ", unit: "Pa·s" },
        ],
        calculate: (inputs) => ({ result: (inputs["ρ"] * inputs.v * inputs.D) / inputs["μ"], unit: "" }),
      },
    ],
  },
  energyTorque: {
    name: "Energy & Torque",
    formulas: [
      {
        name: "Torque",
        equation: "τ = F × r",
        resultSymbol: "τ",
        inputs: [
          { name: "Force", symbol: "F", unit: "N" },
          { name: "Radius", symbol: "r", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs.F * inputs.r, unit: "N·m" }),
      },
      {
        name: "Power",
        equation: "P = W / t",
        resultSymbol: "P",
        inputs: [
          { name: "Work", symbol: "W", unit: "J" },
          { name: "Time", symbol: "t", unit: "s" },
        ],
        calculate: (inputs) => ({ result: inputs.W / inputs.t, unit: "W" }),
      },
      {
        name: "Potential Energy",
        equation: "PE = mgh",
        resultSymbol: "PE",
        inputs: [
          { name: "Mass", symbol: "m", unit: "kg" },
          { name: "Gravity", symbol: "g", unit: "m/s²" },
          { name: "Height", symbol: "h", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs.m * inputs.g * inputs.h, unit: "J" }),
      },
      {
        name: "Rotational Kinetic Energy",
        equation: "KE = ½Iω²",
        resultSymbol: "KE",
        inputs: [
          { name: "Moment of Inertia", symbol: "I", unit: "kg·m²" },
          { name: "Angular Velocity", symbol: "ω", unit: "rad/s" },
        ],
        calculate: (inputs) => ({ result: 0.5 * inputs.I * Math.pow(inputs["ω"], 2), unit: "J" }),
      },
    ],
  },
  frequency: {
    name: "Frequency",
    formulas: [
      {
        name: "Frequency",
        equation: "f = 1 / T",
        resultSymbol: "f",
        inputs: [
          { name: "Period", symbol: "T", unit: "s" },
        ],
        calculate: (inputs) => ({ result: 1 / inputs.T, unit: "Hz" }),
      },
      {
        name: "Angular Frequency",
        equation: "ω = 2πf",
        resultSymbol: "ω",
        inputs: [
          { name: "Frequency", symbol: "f", unit: "Hz" },
        ],
        calculate: (inputs) => ({ result: 2 * Math.PI * inputs.f, unit: "rad/s" }),
      },
      {
        name: "Wave Speed",
        equation: "v = f × λ",
        resultSymbol: "v",
        inputs: [
          { name: "Frequency", symbol: "f", unit: "Hz" },
          { name: "Wavelength", symbol: "λ", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs.f * inputs["λ"], unit: "m/s" }),
      },
    ],
  },
  electrical: {
    name: "Electrical",
    formulas: [
      {
        name: "Ohm's Law",
        equation: "V = I × R",
        resultSymbol: "V",
        inputs: [
          { name: "Current", symbol: "I", unit: "A" },
          { name: "Resistance", symbol: "R", unit: "Ω" },
        ],
        calculate: (inputs) => ({ result: inputs.I * inputs.R, unit: "V" }),
      },
      {
        name: "Power (Electrical)",
        equation: "P = V × I",
        resultSymbol: "P",
        inputs: [
          { name: "Voltage", symbol: "V", unit: "V" },
          { name: "Current", symbol: "I", unit: "A" },
        ],
        calculate: (inputs) => ({ result: inputs.V * inputs.I, unit: "W" }),
      },
      {
        name: "Resistance",
        equation: "R = V / I",
        resultSymbol: "R",
        inputs: [
          { name: "Voltage", symbol: "V", unit: "V" },
          { name: "Current", symbol: "I", unit: "A" },
        ],
        calculate: (inputs) => ({ result: inputs.V / inputs.I, unit: "Ω" }),
      },
      {
        name: "Capacitance Energy",
        equation: "E = ½CV²",
        resultSymbol: "E",
        inputs: [
          { name: "Capacitance", symbol: "C", unit: "F" },
          { name: "Voltage", symbol: "V", unit: "V" },
        ],
        calculate: (inputs) => ({ result: 0.5 * inputs.C * Math.pow(inputs.V, 2), unit: "J" }),
      },
    ],
  },
  thermodynamics: {
    name: "Thermodynamics",
    formulas: [
      {
        name: "Heat Transfer",
        equation: "Q = mcΔT",
        resultSymbol: "Q",
        inputs: [
          { name: "Mass", symbol: "m", unit: "kg" },
          { name: "Specific Heat", symbol: "c", unit: "J/(kg·K)" },
          { name: "Temperature Change", symbol: "ΔT", unit: "K" },
        ],
        calculate: (inputs) => ({ result: inputs.m * inputs.c * inputs["ΔT"], unit: "J" }),
      },
      {
        name: "Ideal Gas Law",
        equation: "PV = nRT",
        resultSymbol: "P",
        inputs: [
          { name: "Moles", symbol: "n", unit: "mol" },
          { name: "Gas Constant", symbol: "R", unit: "J/(mol·K)" },
          { name: "Temperature", symbol: "T", unit: "K" },
          { name: "Volume", symbol: "V", unit: "m³" },
        ],
        calculate: (inputs) => ({ result: (inputs.n * inputs.R * inputs.T) / inputs.V, unit: "Pa" }),
      },
      {
        name: "Thermal Conductivity",
        equation: "Q = kAΔT/d",
        resultSymbol: "Q",
        inputs: [
          { name: "Conductivity", symbol: "k", unit: "W/(m·K)" },
          { name: "Area", symbol: "A", unit: "m²" },
          { name: "Temp Difference", symbol: "ΔT", unit: "K" },
          { name: "Thickness", symbol: "d", unit: "m" },
        ],
        calculate: (inputs) => ({ result: (inputs.k * inputs.A * inputs["ΔT"]) / inputs.d, unit: "W" }),
      },
    ],
  },
  hydraulics: {
    name: "Hydraulics",
    formulas: [
      {
        name: "Hydraulic Force",
        equation: "F = P × A",
        resultSymbol: "F",
        inputs: [
          { name: "Pressure", symbol: "P", unit: "Pa" },
          { name: "Area", symbol: "A", unit: "m²" },
        ],
        calculate: (inputs) => ({ result: inputs.P * inputs.A, unit: "N" }),
      },
      {
        name: "Bernoulli's Equation",
        equation: "P + ½ρv² + ρgh",
        resultSymbol: "P_total",
        inputs: [
          { name: "Pressure", symbol: "P", unit: "Pa" },
          { name: "Density", symbol: "ρ", unit: "kg/m³" },
          { name: "Velocity", symbol: "v", unit: "m/s" },
          { name: "Height", symbol: "h", unit: "m" },
        ],
        calculate: (inputs) => ({ 
          result: inputs.P + 0.5 * inputs["ρ"] * Math.pow(inputs.v, 2) + inputs["ρ"] * 9.81 * inputs.h, 
          unit: "Pa" 
        }),
      },
      {
        name: "Pump Power",
        equation: "P = ρgQH",
        resultSymbol: "P",
        inputs: [
          { name: "Density", symbol: "ρ", unit: "kg/m³" },
          { name: "Gravity", symbol: "g", unit: "m/s²" },
          { name: "Flow Rate", symbol: "Q", unit: "m³/s" },
          { name: "Head", symbol: "H", unit: "m" },
        ],
        calculate: (inputs) => ({ result: inputs["ρ"] * inputs.g * inputs.Q * inputs.H, unit: "W" }),
      },
    ],
  },
};

interface EngineeringFormulasProps {
  onBack: () => void;
}

const EngineeringFormulas = ({ onBack }: EngineeringFormulasProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("mechanics");
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, Record<string, string>>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [calculationResult, setCalculationResult] = useState<{
    formula: Formula;
    inputs: Record<string, number>;
    result: number;
    unit: string;
  } | null>(null);

  const currentCategory = formulaCategories[selectedCategory];

  const filteredFormulas = currentCategory.formulas.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.equation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (formulaName: string, symbol: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [formulaName]: {
        ...prev[formulaName],
        [symbol]: value,
      },
    }));
  };

  const handleCalculate = (formula: Formula) => {
    const formulaInputs = inputValues[formula.name] || {};
    const numericInputs: Record<string, number> = {};
    
    for (const input of formula.inputs) {
      const value = parseFloat(formulaInputs[input.symbol] || "0");
      if (isNaN(value)) return;
      numericInputs[input.symbol] = value;
    }

    try {
      const { result, unit } = formula.calculate(numericInputs);
      if (!isNaN(result) && isFinite(result)) {
        setCalculationResult({
          formula,
          inputs: numericInputs,
          result,
          unit,
        });
      }
    } catch (e) {
      console.error("Calculation error:", e);
    }
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1000000) {
      return num.toExponential(4);
    }
    return num.toFixed(4).replace(/\.?0+$/, "");
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-semibold">Engineering Formula Calculator</span>
      </button>

      {/* Search Bar */}
      <div className="max-w-2xl mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas by name, equation, or category..."
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(formulaCategories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setExpandedFormula(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulas List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Formulas</h3>
          {filteredFormulas.map((formula) => {
            const isExpanded = expandedFormula === formula.name;
            const formulaInputs = inputValues[formula.name] || {};

            return (
              <div
                key={formula.name}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFormula(isExpanded ? null : formula.name)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-semibold text-foreground">{formula.name}</span>
                  <span className="font-mono text-primary">{formula.equation}</span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                    {formula.inputs.map((input) => (
                      <div key={input.symbol} className="flex items-center gap-4">
                        <label className="w-32 text-sm text-muted-foreground">
                          {input.name} ({input.symbol})
                        </label>
                        <input
                          type="number"
                          value={formulaInputs[input.symbol] || ""}
                          onChange={(e) =>
                            handleInputChange(formula.name, input.symbol, e.target.value)
                          }
                          placeholder="0"
                          className="flex-1 input-field font-mono"
                        />
                        <span className="text-sm text-muted-foreground w-16">{input.unit}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => handleCalculate(formula)}
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Calculate
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFormulas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No formulas found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Calculation Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Calculation Notes</h3>
          <div className="bg-card border border-border rounded-xl p-6">
            {calculationResult ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Formula</span>
                  </div>
                  <p className="font-mono text-lg">{calculationResult.formula.equation}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Given</span>
                  </div>
                  <div className="space-y-1">
                    {calculationResult.formula.inputs.map((input) => (
                      <p key={input.symbol} className="font-mono">
                        {input.symbol} = {calculationResult.inputs[input.symbol]} {input.unit}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Calculation</span>
                  </div>
                  <p className="font-mono">
                    {calculationResult.formula.resultSymbol} ={" "}
                    {calculationResult.formula.inputs
                      .map((i) => calculationResult.inputs[i.symbol])
                      .join(" / ")}
                  </p>
                  <p className="font-mono">
                    {calculationResult.formula.resultSymbol} = {formatNumber(calculationResult.result)}{" "}
                    {calculationResult.unit}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Answer</span>
                  </div>
                  <p className="font-mono text-2xl font-bold">
                    {formatNumber(calculationResult.result)} {calculationResult.unit}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Select a formula and enter values to see calculation notes here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringFormulas;
