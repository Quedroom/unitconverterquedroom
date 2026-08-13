import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";

const PrivacyPolicy = () => (
  <Layout breadcrumbs={[{ label: "Privacy Policy" }]}>
    <PageSEO
      title="Privacy Policy – ConvertHub Stores No User Data"
      description="ConvertHub's privacy policy: all conversions run in your browser, we store no personal data, set no tracking cookies of our own, and never upload your files."
      path="/privacy-policy"
    />
    <article className="prose-seo max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: 14 August 2026</p>

      <h2>The short version</h2>
      <p>
        ConvertHub does not collect, store or sell your personal data. Every converter and calculator on this site runs
        entirely inside your web browser. The numbers, text and images you enter are processed on your own device and are
        never uploaded to us or to anyone else.
      </p>

      <h2>Information we do not collect</h2>
      <ul>
        <li>No accounts, sign-ups, names, email addresses or phone numbers.</li>
        <li>No values you type into any converter or calculator.</li>
        <li>No images or files — image tools use your browser's canvas, so photos never leave your device.</li>
        <li>No conversion history on our servers.</li>
      </ul>

      <h2>Local storage on your device</h2>
      <p>
        Some tools offer a "recent conversions" list. That list is written to your browser's own localStorage on your
        device, is readable only by you, and can be erased at any time with the Clear button or by clearing your browser
        data. It is never transmitted to ConvertHub.
      </p>

      <h2>Contact form</h2>
      <p>
        The contact form does not send data to a server. It opens your own email application with the message
        pre-filled, so you decide whether to send it. If you email us at quedroom007@gmail.com we keep the message only
        as long as needed to answer you.
      </p>

      <h2>Advertising and third parties</h2>
      <p>
        We may display advertising from Google AdSense to keep ConvertHub free. Google and its partners may use cookies
        or device identifiers to serve and measure ads, including personalised ads based on your prior visits to this or
        other websites. This happens through Google's own systems; ConvertHub itself sets no advertising cookies and
        receives no personal information from them. You can opt out of personalised advertising in{" "}
        <a className="text-primary underline" href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>{" "}
        and review Google's practices in the{" "}
        <a className="text-primary underline" href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">How Google uses information</a> page.
      </p>

      <h2>Children's privacy</h2>
      <p>
        ConvertHub is a general-audience utility site and is not directed at children under 13. Because we collect no
        personal information from anyone, we do not knowingly collect it from children.
      </p>

      <h2>Your rights</h2>
      <p>
        Because we hold no personal data about you, there is nothing for us to export, correct or delete. If you have
        emailed us and want that correspondence removed, write to quedroom007@gmail.com and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we ever add a feature that changes how data is handled, we will update this page and revise the date above.
        Continued use of the site after an update means you accept the revised policy.
      </p>
    </article>
  </Layout>
);

export default PrivacyPolicy;
