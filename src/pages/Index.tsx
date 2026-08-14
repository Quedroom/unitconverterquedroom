import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import AdSlot from "@/components/AdSlot";
import FaqBlock from "@/components/FaqBlock";
import { tools, popularSearches } from "@/data/tools";
import {
  Ruler, Weight, Thermometer, Percent, Landmark, Type, ImageIcon, Binary, FlaskConical, Calculator,
  Shield, Zap, Lock, TrendingUp, CalendarDays, Search as SearchIcon, ArrowRight,
} from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/length-converter": Ruler,
  "/weight-converter": Weight,
  "/temperature-converter": Thermometer,
  "/percentage-calculator": Percent,
  "/emi-calculator": Landmark,
  "/sip-calculator": TrendingUp,
  "/age-calculator": CalendarDays,
  "/word-counter": Type,
  "/image-compressor": ImageIcon,
  "/media": ImageIcon,
  "/data-converter": Binary,
  "/scientific-calculator": FlaskConical,
  "/unit": Calculator,
};

const popular = tools.filter((t) => t.popular).slice(0, 8);
const rest = tools.filter((t) => !t.popular);

const faqs = [
  { question: "Is ConvertHub really free?", answer: "Yes. Every converter and calculator is free with no sign-up, no download and no usage limit." },
  { question: "Does ConvertHub store my data?", answer: "No. All conversions run in your browser. Nothing you type or upload is sent to a server, and we set no tracking cookies of our own." },
  { question: "Which converters are available?", answer: "Length, weight, temperature, percentage, loan EMI, SIP, age, word count, image compression, image format conversion, data formats such as Base64 and hex, a scientific calculator, and 18+ engineering unit categories." },
  { question: "Do the image tools upload my photos?", answer: "Never. Image compression and conversion use your browser's canvas, so photos stay on your device — the tools even work offline once loaded." },
  { question: "Can I use ConvertHub on mobile?", answer: "Yes. The layout is fully responsive with large inputs, and image tools include a Choose File button because drag and drop does not work on phones." },
];

const Index = () => (
  <Layout>
    <PageSEO
      title="ConvertHub – Free Everyday Converters & Calculators"
      description="Free unit, finance, text and image converters. Convert length, weight, temperature, percentages, EMI, SIP and images instantly — 100% in your browser, no data stored."
      path="/"
      schemaData={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ConvertHub",
        url: "https://unitconverterquedroom.lovable.app/",
        description: "Simple, fast and private converters for students and creators.",
      }}
    />

    <section className="text-center py-8 md:py-14">
      <p className="privacy-badge mb-4"><Shield className="w-3.5 h-3.5" /> 100% browser-based · No data stored</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
        All-in-One Unit &amp; Daily Life Converter
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
        Convert length, weight, finance, text and images instantly — 100% in your browser
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
        <span className="feature-pill"><Lock className="w-4 h-4 text-primary" /> No data stored</span>
        <span className="feature-pill"><Zap className="w-4 h-4 text-primary" /> Instant results</span>
        <span className="feature-pill"><Shield className="w-4 h-4 text-primary" /> No tracking</span>
      </div>
    </section>

    {/* Ad Space Top - 728x90 */}
    <AdSlot slot="top" />

    <section className="py-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <SearchIcon className="w-5 h-5 text-primary" /> Popular Searches
      </h2>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((s) => (
          <Link
            key={s.label}
            to={s.path}
            className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>

    <section className="py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Popular Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {popular.map((c) => {
          const Icon = icons[c.path] ?? Calculator;
          return (
            <Link key={c.path} to={c.path} className="converter-card">
              <div className="converter-card-icon"><Icon className="w-5 h-5" /></div>
              <h3 className="text-lg font-semibold mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">More Converters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rest.map((c) => (
          <Link
            key={c.path}
            to={c.path}
            className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <span>
              <span className="block text-sm font-semibold">{c.name}</span>
              <span className="block text-xs text-muted-foreground">{c.desc}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </section>

    <section className="py-6 max-w-3xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">Guides from the blog</h2>
      <p className="text-muted-foreground mb-4">
        Learn the formulas behind the tools with our conversion guides.
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <Link className="btn-secondary" to="/blog/bigha-to-square-feet-assam">Bigha to Square Feet (Assam)</Link>
        <Link className="btn-secondary" to="/blog/jpg-vs-png-vs-webp">JPG vs PNG vs WebP</Link>
        <Link className="btn-secondary" to="/blog/how-to-calculate-percentage-correctly">Calculate Percentage Correctly</Link>
      </div>
    </section>

    <FaqBlock faqs={faqs} schemaId="schema-faq-home" />

    <section className="max-w-3xl mx-auto text-center tool-card my-10">
      <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
      <h2 className="text-xl font-bold mb-2">Your privacy is the default</h2>
      <p className="text-muted-foreground">
        Every calculation happens on your device. No accounts, no uploads, no history on our servers — your data is
        never stored or saved.
      </p>
    </section>
  </Layout>
);

export default Index;
