import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Faq {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  faqs: Faq[];
  title?: string;
  schemaId?: string;
}

const FaqBlock = ({ faqs, title = "Frequently Asked Questions", schemaId = "schema-faq" }: FaqBlockProps) => {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => document.getElementById(schemaId)?.remove();
  }, [faqs, schemaId]);

  return (
    <section className="max-w-3xl mx-auto my-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqBlock;
