import { useState } from "react";
import { Check, Sparkles, Ban, FileText, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import FaqBlock from "@/components/FaqBlock";

// Paddle checkout is connected once the workspace is on a paid plan.
// Until then the signup button opens a waitlist email.
const PADDLE_READY = false;

const plans = {
  monthly: { price: "$2", per: "/month", note: "Billed monthly. Cancel anytime." },
  yearly: { price: "$15", per: "/year", note: "Save 37% — billed once a year." },
};

const features = [
  { icon: Ban, title: "No ads", text: "A clean, distraction-free ConvertHub on every page." },
  { icon: Sparkles, title: "More AI Text to Word", text: "Higher daily limits for organising notes into Word documents." },
  { icon: FileText, title: "Bigger files", text: "Convert larger PDFs and compress more images at once." },
  { icon: Zap, title: "Early access", text: "Try new converters and calculators before everyone else." },
  { icon: Shield, title: "Same privacy promise", text: "Your files and calculations still stay in your browser." },
];

const faqs = [
  { question: "Are the free tools going away?", answer: "No. Every converter stays free. Pro removes ads and adds extras for people who use ConvertHub every day." },
  { question: "How is payment handled?", answer: "Payments are processed securely by Paddle, which also handles tax, receipts and refunds. ConvertHub never sees your card details." },
  { question: "Can I cancel anytime?", answer: "Yes. You can cancel whenever you like and keep Pro until the end of the period you paid for." },
];

const Pro = () => {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  const plan = plans[cycle];

  const signup = () => {
    if (!PADDLE_READY) {
      window.location.href = `mailto:quedroom007@gmail.com?subject=${encodeURIComponent("ConvertHub Pro waitlist")}&body=${encodeURIComponent(`Please add me to the ConvertHub Pro waitlist (${cycle} plan).`)}`;
    }
  };

  return (
    <Layout breadcrumbs={[{ label: "ConvertHub Pro" }]}>
      <PageSEO
        title="ConvertHub Pro – Ad-Free Converters & More AI"
        description="Upgrade to ConvertHub Pro: no ads, higher AI Text to Word limits, bigger files and early access to new tools. From $15/year."
        path="/pro"
      />
      <section className="text-center max-w-2xl mx-auto mb-10">
        <span className="privacy-badge"><Sparkles className="w-3.5 h-3.5" /> ConvertHub Pro</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-3">Everyday converters, without the ads</h1>
        <p className="section-subtitle">Support ConvertHub and unlock extras made for students and creators who convert every day.</p>
      </section>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-xl bg-muted p-1" role="group" aria-label="Billing period">
          {(["monthly", "yearly"] as const).map((c) => (
            <button key={c} onClick={() => setCycle(c)} aria-pressed={cycle === c}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${cycle === c ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {c === "monthly" ? "Monthly" : "Yearly (save 37%)"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="tool-card">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-4xl font-bold my-3">$0</p>
          <ul className="space-y-2 text-sm">
            {["All converters and calculators", "AI Text to Word (standard limit)", "Ads shown"].map((f) => (
              <li key={f} className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5" /> {f}</li>
            ))}
          </ul>
        </div>
        <div className="tool-card border-2 border-primary">
          <h2 className="text-xl font-semibold text-primary">Pro</h2>
          <p className="my-3"><span className="text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground">{plan.per}</span></p>
          <p className="text-xs text-muted-foreground mb-4">{plan.note}</p>
          <ul className="space-y-2 text-sm mb-6">
            {features.map((f) => (
              <li key={f.title} className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5" /> {f.title}</li>
            ))}
          </ul>
          <button onClick={signup} className="btn-primary w-full justify-center">
            {PADDLE_READY ? "Get Pro" : "Join the Pro waitlist"}
          </button>
          {!PADDLE_READY && <p className="text-xs text-muted-foreground mt-2 text-center">Checkout opens soon. Join the waitlist and we'll email you first.</p>}
        </div>
      </div>

      <section className="max-w-4xl mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="tool-card">
            <f.icon className="w-6 h-6 text-primary mb-2" aria-hidden />
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <FaqBlock faqs={faqs} schemaId="schema-faq-pro" />
    </Layout>
  );
};

export default Pro;
