import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  Calculator, 
  Binary, 
  Image, 
  ArrowRight,
  Shield,
  Zap,
  Lock,
  FlaskConical,
  Search,
  Coins
} from "lucide-react";

const converterCategories = [
  {
    title: "Engineering Unit Converter",
    description: "Convert length, weight, temperature, pressure, energy, power, torque, and more",
    icon: Calculator,
    path: "/unit",
    features: ["18+ categories", "Real-time results", "Scientific precision"]
  },
  {
    title: "Scientific Calculator",
    description: "Advanced calculator with trigonometric, logarithmic, and scientific functions",
    icon: FlaskConical,
    path: "/calculator",
    features: ["Trig functions", "Memory storage", "RAD/DEG modes"]
  },
  {
    title: "Currency Converter",
    description: "Convert between 40+ world currencies including USD, EUR, GBP, INR, and more",
    icon: Coins,
    path: "/currency",
    features: ["40+ currencies", "Quick amounts", "Swap currencies"]
  },
  {
    title: "Data Converter",
    description: "Binary, decimal, hexadecimal, Base64, and CSV/JSON conversions",
    icon: Binary,
    path: "/data",
    features: ["Text processing", "Copy to clipboard", "Format validation"]
  },
  {
    title: "Media Converter",
    description: "Convert images between JPG, PNG, and WebP formats instantly",
    icon: Image,
    path: "/media",
    features: ["Drag & drop", "Fast processing", "Multiple formats"]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCategories = converterCategories.filter((category) => {
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.features.some((f) => f.toLowerCase().includes(query))
    );
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Privacy-First Engineering Tool</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          All-in-One Converter
          <br />
          <span className="text-primary">Zero Data Storage</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Free, fast and privacy-focused conversion tools. Convert units, data, and media 
          instantly — all in your browser with zero data storage.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search converters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-20 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border rounded text-muted-foreground">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">No data stored</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">Instant results</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">No tracking</span>
          </div>
        </div>
      </section>

      {/* Converter Categories Grid */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Choose a Converter</h2>
        
        {filteredCategories.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>No converters found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredCategories.map((category, index) => (
              <Link
                key={category.path}
                to={category.path}
                className="group converter-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="converter-card-icon">
                  <category.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.features.map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Start Converting</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="py-16 text-center">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Privacy is Our Priority</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All conversions happen directly in your browser. We don't store, track, or log 
            any of your data. No accounts, no cookies, no history.
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <Lock className="w-4 h-4" />
            <span>Your data is never stored or saved</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
