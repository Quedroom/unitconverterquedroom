import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is ConvertHub really free to use?",
    answer:
      "Yes, ConvertHub is 100% free. All conversion tools — unit converter, data converter, scientific calculator, and media converter — are available at no cost with no sign-up required.",
  },
  {
    question: "Does ConvertHub store or track my data?",
    answer:
      "No. All conversions happen entirely in your browser. We never store, upload, or log any of your data. There are no cookies, no accounts, and no tracking.",
  },
  {
    question: "What types of units can I convert?",
    answer:
      "ConvertHub supports 18+ unit categories including length, weight, temperature, pressure, energy, power, torque, speed, volume, area, force, and more — all with scientific precision.",
  },
  {
    question: "Can I convert images with ConvertHub?",
    answer:
      "Yes. The Media Converter lets you convert images between JPG, PNG, and WebP formats instantly using drag-and-drop — all processed locally in your browser.",
  },
  {
    question: "What data formats does the Data Converter support?",
    answer:
      "The Data Converter handles binary, decimal, hexadecimal, octal, Base64 encoding/decoding, and CSV-to-JSON conversions with built-in format validation.",
  },
  {
    question: "Does the Scientific Calculator support trigonometric functions?",
    answer:
      "Yes. The calculator includes sin, cos, tan and their inverses, logarithmic functions, factorial, power, and square root — with both radian and degree modes.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
export { faqs };
