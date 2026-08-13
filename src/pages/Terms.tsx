import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";

const Terms = () => (
  <Layout breadcrumbs={[{ label: "Terms of Service" }]}>
    <PageSEO
      title="Terms of Service – ConvertHub"
      description="Terms of service for ConvertHub: acceptable use, accuracy disclaimer, intellectual property and limitation of liability for our free browser-based converters."
      path="/terms"
    />
    <article className="prose-seo max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Last updated: 14 August 2026</p>

      <h2>Acceptance</h2>
      <p>
        By using ConvertHub you agree to these terms. If you do not agree, please do not use the site. ConvertHub is
        operated by the Quedroom team, Guwahati, Assam, India.
      </p>

      <h2>Use of the tools</h2>
      <p>
        All converters and calculators are provided free of charge for personal and commercial use. You may not attempt
        to disrupt the site, scrape it at a rate that degrades service for others, or republish it as your own product.
      </p>

      <h2>Accuracy disclaimer</h2>
      <p>
        We take accuracy seriously and publish the formula behind every tool, but results are provided "as is" without
        warranty. Financial outputs such as EMI figures are indicative estimates and are not financial advice or a loan
        offer. Always verify critical engineering, medical, legal or financial calculations with a qualified
        professional before acting on them.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The ConvertHub name, design, written guides and blog articles are owned by Quedroom. You may quote short
        extracts with a link back, but you may not copy substantial content without permission.
      </p>

      <h2>Advertising</h2>
      <p>
        The site is supported by advertising, which may be served by Google AdSense. Advertisements are clearly separated
        from tool results and never affect the values a calculator produces.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, ConvertHub and Quedroom are not liable for any loss or damage arising
        from use of, or inability to use, this website or its results.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms: quedroom007@gmail.com.</p>
    </article>
  </Layout>
);

export default Terms;
