import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  Ruler, 
  Binary, 
  Image, 
  Calculator, 
  ArrowRight,
  Shield,
  Zap,
  Lock
} from "lucide-react";

const converterCategories = [
  {
    title: "Unit Converter",
    description: "Length, weight, temperature, area, volume, speed, and time conversions",
    icon: Ruler,
    path: "/unit",
    features: ["Real-time conversion", "7 categories", "Precise results"]
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
  },
  {
    title: "Engineering Converter",
    description: "Pressure, energy, power, torque, and frequency conversions",
    icon: Calculator,
    path: "/engineering",
    features: ["Scientific precision", "Engineering units", "Instant results"]
  }
];

const Index = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {converterCategories.map((category, index) => (
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
