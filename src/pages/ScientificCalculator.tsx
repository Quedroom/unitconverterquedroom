import { useState } from "react";
import { evaluate as mathEvaluate } from "mathjs";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Delete, RotateCcw } from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState(true);

  const handleNumber = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    // Find the last number in the expression
    const lastNumber = display.split(/[\+\-\×\÷\(\)\^]/).pop() || "";
    if (!lastNumber.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: string) => {
    setDisplay(display + op);
  };

  const handleFunction = (func: string) => {
    if (display === "0") {
      setDisplay(func + "(");
    } else {
      setDisplay(display + func + "(");
    }
  };

  const handleParenthesis = (paren: string) => {
    if (paren === "(") {
      if (display === "0") {
        setDisplay("(");
      } else {
        setDisplay(display + "(");
      }
    } else {
      setDisplay(display + ")");
    }
  };

  const evaluateExpression = (expr: string): number => {
    // Replace display operators with JS operators
    let evalExpr = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    // Handle trig functions with degree/radian conversion
    const trigFuncs = ["sin", "cos", "tan", "asin", "acos", "atan"];
    
    trigFuncs.forEach((func) => {
      const regex = new RegExp(`${func}\\(([^)]+)\\)`, "g");
      evalExpr = evalExpr.replace(regex, (match, arg) => {
        const value = evaluateExpression(arg);
        let result: number;
        
        if (func === "sin") {
          result = isRadians ? Math.sin(value) : Math.sin((value * Math.PI) / 180);
        } else if (func === "cos") {
          result = isRadians ? Math.cos(value) : Math.cos((value * Math.PI) / 180);
        } else if (func === "tan") {
          result = isRadians ? Math.tan(value) : Math.tan((value * Math.PI) / 180);
        } else if (func === "asin") {
          result = isRadians ? Math.asin(value) : (Math.asin(value) * 180) / Math.PI;
        } else if (func === "acos") {
          result = isRadians ? Math.acos(value) : (Math.acos(value) * 180) / Math.PI;
        } else if (func === "atan") {
          result = isRadians ? Math.atan(value) : (Math.atan(value) * 180) / Math.PI;
        } else {
          result = value;
        }
        return String(result);
      });
    });

    // Handle other functions
    evalExpr = evalExpr.replace(/sqrt\(([^)]+)\)/g, (_, arg) => String(Math.sqrt(evaluateExpression(arg))));
    evalExpr = evalExpr.replace(/cbrt\(([^)]+)\)/g, (_, arg) => String(Math.cbrt(evaluateExpression(arg))));
    evalExpr = evalExpr.replace(/log\(([^)]+)\)/g, (_, arg) => String(Math.log10(evaluateExpression(arg))));
    evalExpr = evalExpr.replace(/ln\(([^)]+)\)/g, (_, arg) => String(Math.log(evaluateExpression(arg))));
    evalExpr = evalExpr.replace(/abs\(([^)]+)\)/g, (_, arg) => String(Math.abs(evaluateExpression(arg))));
    evalExpr = evalExpr.replace(/exp\(([^)]+)\)/g, (_, arg) => String(Math.exp(evaluateExpression(arg))));

    // Replace constants
    evalExpr = evalExpr.replace(/π/g, String(Math.PI));
    evalExpr = evalExpr.replace(/e(?![x])/g, String(Math.E));

    try {
      return mathEvaluate(evalExpr);
    } catch {
      return NaN;
    }
  };

  const handleEquals = () => {
    try {
      const result = evaluateExpression(display);
      if (isNaN(result) || !isFinite(result)) {
        setDisplay("Error");
      } else {
        setDisplay(String(parseFloat(result.toPrecision(12))));
      }
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      // Check if we need to remove a function name
      const funcs = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "cbrt", "log", "ln", "abs", "exp"];
      for (const func of funcs) {
        if (display.endsWith(func + "(")) {
          setDisplay(display.slice(0, -(func.length + 1)) || "0");
          return;
        }
      }
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleScientific = (func: string) => {
    const num = parseFloat(display);
    let result: number;

    switch (func) {
      case "square":
        setDisplay(display + "^2");
        return;
      case "cube":
        setDisplay(display + "^3");
        return;
      case "reciprocal":
        result = 1 / num;
        break;
      case "factorial":
        result = factorial(num);
        break;
      case "10^x":
        result = Math.pow(10, num);
        break;
      case "negate":
        if (display === "0") return;
        // Toggle negative sign
        if (display.startsWith("-")) {
          setDisplay(display.slice(1));
        } else {
          setDisplay("-" + display);
        }
        return;
      case "percent":
        result = num / 100;
        break;
      default:
        return;
    }

    setDisplay(String(parseFloat(result.toPrecision(12))));
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const handleConstant = (constant: string) => {
    if (display === "0") {
      setDisplay(constant);
    } else {
      setDisplay(display + constant);
    }
  };

  const handleMemory = (action: string) => {
    const num = parseFloat(display);
    switch (action) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        if (display === "0") {
          setDisplay(String(memory));
        } else {
          setDisplay(display + memory);
        }
        break;
      case "M+":
        setMemory(memory + num);
        break;
      case "M-":
        setMemory(memory - num);
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
      <PageSEO
        title="Scientific Calculator – Trig, Log, Powers | ConvertHub"
        description="Free online scientific calculator with trigonometric, logarithmic, and power functions. Supports radians and degrees — runs entirely in your browser."
        path="/calculator"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Scientific Calculator",
          url: "https://unitconverterquedroom.lovable.app/calculator",
          description: "Free online scientific calculator with trigonometric, logarithmic, and power functions.",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
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
            <div className="text-right text-3xl font-mono font-bold text-foreground overflow-x-auto whitespace-nowrap">
              {display}
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
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
            <Button variant="function" onClick={() => handleFunction("sin")}>
              sin
            </Button>
            <Button variant="function" onClick={() => handleFunction("cos")}>
              cos
            </Button>
            <Button variant="function" onClick={() => handleFunction("tan")}>
              tan
            </Button>
            <Button variant="function" onClick={() => handleConstant("π")}>
              π
            </Button>
            <Button variant="function" onClick={() => handleConstant("e")}>
              e
            </Button>
          </div>

          {/* Scientific Functions Row 2 */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button variant="function" onClick={() => handleFunction("asin")}>
              sin⁻¹
            </Button>
            <Button variant="function" onClick={() => handleFunction("acos")}>
              cos⁻¹
            </Button>
            <Button variant="function" onClick={() => handleFunction("atan")}>
              tan⁻¹
            </Button>
            <Button variant="function" onClick={() => handleFunction("ln")}>
              ln
            </Button>
            <Button variant="function" onClick={() => handleFunction("log")}>
              log
            </Button>
          </div>

          {/* Scientific Functions Row 3 */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button variant="operator" onClick={() => handleOperator("^")}>
              xʸ
            </Button>
            <Button variant="function" onClick={() => handleScientific("square")}>
              x²
            </Button>
            <Button variant="function" onClick={() => handleFunction("sqrt")}>
              √x
            </Button>
            <Button variant="function" onClick={() => handleFunction("cbrt")}>
              ³√x
            </Button>
            <Button variant="function" onClick={() => handleScientific("factorial")}>
              n!
            </Button>
          </div>

          {/* Scientific Functions Row 4 */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <Button variant="function" onClick={() => handleParenthesis("(")}>
              (
            </Button>
            <Button variant="function" onClick={() => handleParenthesis(")")}>
              )
            </Button>
            <Button variant="function" onClick={() => handleFunction("exp")}>
              eˣ
            </Button>
            <Button variant="function" onClick={() => handleScientific("10^x")}>
              10ˣ
            </Button>
            <Button variant="function" onClick={() => handleScientific("reciprocal")}>
              1/x
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
