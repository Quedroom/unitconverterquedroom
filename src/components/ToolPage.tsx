import Layout, { Crumb } from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import AdSlot from "@/components/AdSlot";
import FaqBlock, { Faq } from "@/components/FaqBlock";

interface ToolPageProps {
  title: string;
  description: string;
  path: string;
  h1: string;
  intro: string;
  crumbs: Crumb[];
  faqs: Faq[];
  tool: React.ReactNode;
  children: React.ReactNode; // SEO content
}

const ToolPage = ({ title, description, path, h1, intro, crumbs, faqs, tool, children }: ToolPageProps) => (
  <Layout breadcrumbs={crumbs}>
    <PageSEO
      title={title}
      description={description}
      path={path}
      schemaData={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: h1,
        url: `https://unitconverterquedroom.lovable.app${path}`,
        description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }}
    />

    {/* Ad Space Top - 728x90 */}
    <AdSlot slot="top" />

    <div className="lg:flex lg:gap-8 lg:items-start">
      <div className="flex-1 min-w-0">
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{h1}</h1>
          <p className="section-subtitle max-w-2xl mx-auto">{intro}</p>
        </header>

        {tool}

        {/* Ad Space Below Tool - 336x280 */}
        <AdSlot slot="below-tool" />

        <article className="prose-seo max-w-3xl mx-auto">{children}</article>

        <FaqBlock faqs={faqs} schemaId={`schema-faq-${path.replace(/\//g, "")}`} />
      </div>

      {/* Ad Space Sidebar - 300x600 sticky */}
      <aside className="hidden xl:block">
        <AdSlot slot="sidebar" />
      </aside>
    </div>
  </Layout>
);

export default ToolPage;
