import { useEffect } from "react";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  schemaData?: object;
}

const PageSEO = ({ title, description, path, schemaData }: PageSEOProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", description, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://unitconverterquedroom.lovable.app${path}`, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://unitconverterquedroom.lovable.app${path}`;

    // JSON-LD
    const schemaId = `schema-page-${path.replace(/\//g, "")}`;
    if (schemaData) {
      const existing = document.getElementById(schemaId);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      document.getElementById(schemaId)?.remove();
    };
  }, [title, description, path, schemaData]);

  return null;
};

export default PageSEO;
