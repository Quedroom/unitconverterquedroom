import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const faqs = [
  { question: "How does the word counter count words?", answer: "Text is split on spaces, tabs and line breaks, so any sequence of characters separated by whitespace counts as one word. Hyphenated words count as a single word." },
  { question: "How is reading time estimated?", answer: "Reading time uses an average silent reading speed of 200 words per minute, the figure most publishers use for adult readers." },
  { question: "Is my text uploaded anywhere?", answer: "No. The counter runs entirely in your browser using JavaScript. Your text never leaves your device and is not stored after you close the page." },
  { question: "Can I count characters for a Twitter or meta description limit?", answer: "Yes. The character count with and without spaces updates live, which makes it easy to stay inside limits such as 280 characters for a post or 160 characters for a meta description." },
];

const WordCounter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || 1 : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    return {
      words,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences,
      paragraphs,
      readingTime: Math.max(words ? 1 : 0, Math.round(words / 200)),
    };
  }, [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const cards = [
    ["Words", stats.words],
    ["Characters", stats.characters],
    ["Characters (no spaces)", stats.charactersNoSpaces],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Reading time (min)", stats.readingTime],
  ] as const;

  return (
    <ToolPage
      title="Word Counter – Free Word & Character Count Tool"
      description="Count words, characters, sentences, paragraphs and reading time instantly. Free online word counter for essays, blogs and social posts — nothing is uploaded."
      path="/word-counter"
      h1="Word Counter & Character Counter"
      intro="Paste or type your text to see live word, character, sentence and reading-time counts."
      crumbs={[{ label: "Text Tools", path: "/word-counter" }, { label: "Word Counter" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="wc-text">Your text</label>
          <textarea
            id="wc-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="input-field min-h-[220px] mt-2 resize-y"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
            {cards.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-muted p-4 text-center">
                <p className="text-2xl font-bold font-mono text-primary">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={copy} className="btn-primary" disabled={!text}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied!" : "Copy Text"}
            </button>
            <button onClick={() => setText("")} className="btn-secondary" disabled={!text}>Clear</button>
          </div>
        </div>
      }
    >
      <h2>Why word and character counts matter</h2>
      <p>
        Almost every kind of writing comes with a limit. University essays specify a word range, scholarship statements
        cap you at 500 words, meta descriptions are truncated by Google after roughly 160 characters, and social
        platforms enforce hard character limits. Writing first and counting later wastes time, so this tool updates
        every statistic as you type: words, characters with and without spaces, sentences, paragraphs and an estimated
        reading time.
      </p>
      <p>
        The counter is also useful for editing. Watching the sentence count next to the word count shows your average
        sentence length; if it climbs above roughly 25 words per sentence, readers will find the text heavy. Paragraph
        count helps you spot walls of text that need breaking up before publishing.
      </p>

      <h2>Common length limits</h2>
      <table className="seo-table">
        <thead><tr><th>Where</th><th>Recommended length</th></tr></thead>
        <tbody>
          <tr><td>SEO page title</td><td>50–60 characters</td></tr>
          <tr><td>Meta description</td><td>140–160 characters</td></tr>
          <tr><td>Social post</td><td>up to 280 characters</td></tr>
          <tr><td>Blog article</td><td>800–2,000 words</td></tr>
          <tr><td>College essay</td><td>500–650 words</td></tr>
        </tbody>
      </table>

      <h3>How reading time is calculated</h3>
      <p>
        Reading time divides the word count by 200 words per minute, an average silent reading speed for adults on
        screen. Technical writing with formulas or code reads more slowly, while conversational blog content reads
        faster, so treat the figure as a guide rather than a guarantee. Publishers display it because readers are far
        more likely to start an article when they know it will take four minutes rather than an unknown amount of time.
      </p>
    </ToolPage>
  );
};

export default WordCounter;
