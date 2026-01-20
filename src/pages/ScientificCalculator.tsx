import { useState } from "react";
import Layout from "@/components/Layout";
import { Delete, RotateCcw } from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (isNewNumber) {
      setDisplay("0.");
      setIsNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setIsNewNumber(true);
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      // Replace operators for eval
      const evalEquation = fullEquation
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");
      const result = eval(evalEquation);
      setDisplay(String(parseFloat(result.toPrecision(12))));
      setEquation("");
      setIsNewNumber(true);
    } catch {
      setDisplay("Error");
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setIsNewNumber(true);
    }
  };

  const handleScientific = (func: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (func) {
      case "sin":
        result = isRadians ? Math.sin(num) : Math.sin((num * Math.PI) / 180);
        break;
      case "cos":
        result = isRadians ? Math.cos(num) : Math.cos((num * Math.PI) / 180);
        break;
      case "tan":
        result = isRadians ? Math.tan(num) : Math.tan((num * Math.PI) / 180);
        break;
      case "asin":
        result = isRadians ? Math.asin(num) : (Math.asin(num) * 180) / Math.PI;
        break;
      case "acos":
        result = isRadians ? Math.acos(num) : (Math.acos(num) * 180) / Math.PI;
        break;
      case "atan":
        result = isRadians ? Math.atan(num) : (Math.atan(num) * 180) / Math.PI;
        break;
      case "log":
        result = Math.log10(num);
        break;
      case "ln":
        result = Math.log(num);
        break;
      case "sqrt":
        result = Math.sqrt(num);
        break;
      case "cbrt":
        result = Math.cbrt(num);
        break;
      case "square":
        result = num * num;
        break;
      case "cube":
        result = num * num * num;
        break;
      case "reciprocal":
        result = 1 / num;
        break;
      case "factorial":
        result = factorial(num);
        break;
      case "abs":
        result = Math.abs(num);
        break;
      case "exp":
        result = Math.exp(num);
        break;
      case "10^x":
        result = Math.pow(10, num);
        break;
      case "negate":
        result = -num;
        break;
      case "percent":
        result = num / 100;
        break;
      default:
        return;
    }

    setDisplay(String(parseFloat(result.toPrecision(12))));
    setIsNewNumber(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const handleConstant = (constant: string) => {
    switch (constant) {
      case "pi":
        setDisplay(String(Math.PI));
        break;
      case "e":
        setDisplay(String(Math.E));
        break;
    }
    setIsNewNumber(true);
  };

  const handleMemory = (action: string) => {
    const num = parseFloat(display);
    switch (action) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        setDisplay(String(memory));
        setIsNewNumber(true);
        break;
      case "M+":
        setMemory(memory + num);
        setIsNewNumber(true);
        break;
      case "M-":
        setMemory(memory - num);
        setIsNewNumber(true);
        break;
    }
  };

  const Button = ({
    children,
    onClick,
    className = "",
    variant = "default",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: "default" | "operator" | "function" | "equals" | "memory";
  }) => {
    const baseClasses =
      "h-12 rounded-lg font-medium text-sm transition-all active:scale-95 ";
    const variants = {
      default: "bg-secondary hover:bg-secondary/80 text-foreground",
      operator: "bg-primary/20 hover:bg-primary/30 text-primary",
      function: "bg-card hover:bg-card/80 text-muted-foreground border border-border",
      equals: "bg-primary hover:bg-primary/90 text-primary-foreground",
      memory: "bg-muted hover:bg-muted/80 text-muted-foreground text-xs",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <Layout showBack title="Scientific Calculator">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="section-title">Scientific Calculator</h1>
          <p className="section-subtitle">
            Advanced calculations with trigonometric, logarithmic, and scientific functions
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          {/* Display */}
          <div className="bg-background border border-border rounded-xl p-4 mb-4">
            <div className="text-right text-sm text-muted-foreground h-5 overflow-hidden">
              {equation}
            </div>
            <div className="text-right text-3xl font-mono font-bold text-foreground overflow-x-auto">
              {display}
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRadians(true)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isRadians
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                RAD
              </button>
              <button
                onClick={() => setIsRadians(false)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  !isRadians
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                DEG
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {memory !== 0 && <span className="bg-primary/20 px-2 py-1 rounded">M: {memory}</span>}
            </div>
          </div>

          {/* Memory Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <Button variant="memory" onClick={() => handleMemory("MC")}>
              MC
            </Button>
            <Button variant="memory" onClick={() => handleMemory("MR")}>
              MR
            </Button>
            <Button variant="memory" onClick={() => handleMemory("M+")}>
              M+
            </Button>
            <Button variant="memory" onClick={() => handleMemory("M-")}>
              M-
            </Button>
          </div>

          {/* Scientific Functions Row 1 */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button variant="function" onClick={() => handleScientific("sin")}>
              sin
            </Button>
            <Button variant="function" onClick={() => handleScientific("cos")}>
              cos
            </Button>
            <Button variant="function" onClick={() => handleScientific("tan")}>
              tan
            </Button>
            <Button variant="function" onClick={() => handleScientific("log")}>
              log
            </Button>
            <Button variant="function" onClick={() => handleScientific("ln")}>
              ln
            </Button>
          </div>

          {/* Scientific Functions Row 2 */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button variant="function" onClick={() => handleScientific("asin")}>
              sin⁻¹
            </Button>
            <Button variant="function" onClick={() => handleScientific("acos")}>
              cos⁻¹
            </Button>
            <Button variant="function" onClick={() => handleScientific("atan")}>
              tan⁻¹
            </Button>
            <Button variant="function" onClick={() => handleScientific("exp")}>
              eˣ
            </Button>
            <Button variant="function" onClick={() => handleScientific("10^x")}>
              10ˣ
            </Button>
          </div>

          {/* Scientific Functions Row 3 */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button variant="function" onClick={() => handleScientific("sqrt")}>
              √
            </Button>
            <Button variant="function" onClick={() => handleScientific("cbrt")}>
              ³√
            </Button>
            <Button variant="function" onClick={() => handleScientific("square")}>
              x²
            </Button>
            <Button variant="function" onClick={() => handleScientific("cube")}>
              x³
            </Button>
            <Button variant="function" onClick={() => handleOperator("^")}>
              xʸ
            </Button>
          </div>

          {/* Scientific Functions Row 4 */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <Button variant="function" onClick={() => handleScientific("factorial")}>
              n!
            </Button>
            <Button variant="function" onClick={() => handleScientific("reciprocal")}>
              1/x
            </Button>
            <Button variant="function" onClick={() => handleScientific("abs")}>
              |x|
            </Button>
            <Button variant="function" onClick={() => handleConstant("pi")}>
              π
            </Button>
            <Button variant="function" onClick={() => handleConstant("e")}>
              e
            </Button>
          </div>

          {/* Main Calculator Grid */}
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={handleClear} className="text-red-400">
              <RotateCcw className="w-4 h-4 mx-auto" />
            </Button>
            <Button onClick={handleBackspace}>
              <Delete className="w-4 h-4 mx-auto" />
            </Button>
            <Button variant="function" onClick={() => handleScientific("percent")}>
              %
            </Button>
            <Button variant="operator" onClick={() => handleOperator("÷")}>
              ÷
            </Button>

            <Button onClick={() => handleNumber("7")}>7</Button>
            <Button onClick={() => handleNumber("8")}>8</Button>
            <Button onClick={() => handleNumber("9")}>9</Button>
            <Button variant="operator" onClick={() => handleOperator("×")}>
              ×
            </Button>

            <Button onClick={() => handleNumber("4")}>4</Button>
            <Button onClick={() => handleNumber("5")}>5</Button>
            <Button onClick={() => handleNumber("6")}>6</Button>
            <Button variant="operator" onClick={() => handleOperator("-")}>
              −
            </Button>

            <Button onClick={() => handleNumber("1")}>1</Button>
            <Button onClick={() => handleNumber("2")}>2</Button>
            <Button onClick={() => handleNumber("3")}>3</Button>
            <Button variant="operator" onClick={() => handleOperator("+")}>
              +
            </Button>

            <Button onClick={() => handleScientific("negate")}>±</Button>
            <Button onClick={() => handleNumber("0")}>0</Button>
            <Button onClick={handleDecimal}>.</Button>
            <Button variant="equals" onClick={handleEquals}>
              =
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScientificCalculator;
