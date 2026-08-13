import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";

const About = () => (
  <Layout breadcrumbs={[{ label: "About Us" }]}>
    <PageSEO
      title="About ConvertHub – Free Everyday Converters by Quedroom"
      description="ConvertHub is a free, privacy-first collection of everyday converters and calculators built by the Quedroom team in Guwahati, Assam. Learn about our mission."
      path="/about"
    />
    <article className="prose-seo max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About ConvertHub</h1>
      <p>
        ConvertHub is a free collection of everyday converters and calculators for students, creators, small business
        owners and engineers. It started as a single unit converter built for our own work and grew into a hub covering
        length, weight, temperature, percentages, loan EMIs, text statistics, image compression and data formats.
      </p>

      <h2>Our mission</h2>
      <p>
        Most online conversion sites ask you to accept trackers, wait through interstitials, or upload personal files to
        an unknown server just to resize a photo. We think a converter should do one thing well: give you the right
        answer instantly. Every tool on ConvertHub runs entirely inside your browser using standard web APIs, so results
        appear as you type and nothing you enter is transmitted, logged or stored anywhere.
      </p>

      <h2>How we build</h2>
      <ul>
        <li>Exact, documented conversion factors — every formula is published on the tool page.</li>
        <li>No account, no paywall, no download required.</li>
        <li>Mobile-first layouts with large touch targets and readable text.</li>
        <li>Fast pages with minimal scripting so tools load on slow connections.</li>
      </ul>

      <h2>Who we are</h2>
      <p>
        ConvertHub is made by the Quedroom team in Guwahati, Assam, India. We are a small group of developers and
        writers who publish practical web tools and explainers. If you spot an error in a formula, want a converter we
        do not cover yet, or would like to work with us, we would genuinely like to hear from you.
      </p>
      <p>
        Reach us any time at <a className="text-primary underline" href="mailto:quedroom007@gmail.com">quedroom007@gmail.com</a>{" "}
        or through the <Link className="text-primary underline" to="/contact">contact page</Link>.
      </p>

      <h2>Editorial approach</h2>
      <p>
        Our guides and blog posts are written by the Quedroom team and reviewed against primary sources such as the
        international yard and pound agreement, SI definitions and official lender documentation. Where a figure is an
        estimate — for example indicative EMI tables — we say so on the page. We do not publish sponsored conversion
        results, and advertising shown on the site never influences the numbers a tool produces.
      </p>
    </article>
  </Layout>
);

export default About;
