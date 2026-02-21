import { useEffect } from "react";
import { faqs } from "./FAQSection";

const SchemaMarkup = () => {
  useEffect(() => {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "ConvertHub",
      url: "https://unitconverterquedroom.lovable.app",
      description:
        "Free, fast and privacy-focused conversion tools. Convert units, data, and media instantly — all in your browser with zero data storage.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Engineering Unit Converter with 18+ categories",
        "Scientific Calculator with trigonometric functions",
        "Data Converter for binary, hex, Base64, CSV/JSON",
        "Media Converter for JPG, PNG, WebP",
        "Zero data storage - all processing in browser",
        "No tracking or cookies",
      ],
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const addScript = (data: object, id: string) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addScript(websiteSchema, "schema-website");
    addScript(faqSchema, "schema-faq");

    return () => {
      document.getElementById("schema-website")?.remove();
      document.getElementById("schema-faq")?.remove();
    };
  }, []);

  return null;
};

export default SchemaMarkup;
