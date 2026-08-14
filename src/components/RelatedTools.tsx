import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { relatedTools } from "@/data/tools";

interface RelatedToolsProps {
  path: string;
}

/** Internal linking block shown at the bottom of every tool page. */
const RelatedTools = ({ path }: RelatedToolsProps) => {
  const items = relatedTools(path);
  if (!items.length) return null;

  return (
    <section className="max-w-3xl mx-auto my-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Related converters &amp; calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((t) => (
          <Link
            key={t.path}
            to={t.path}
            className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <span>
              <span className="block text-sm font-semibold text-foreground">{t.name}</span>
              {t.desc && <span className="block text-xs text-muted-foreground">{t.desc}</span>}
            </span>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTools;
