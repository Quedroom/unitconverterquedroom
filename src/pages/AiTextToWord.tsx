import { useState } from "react";
import { Sparkles, Download, Loader2, Info } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { supabase } from "@/integrations/supabase/client";

const MAX = 30000;

const faqs = [
  { question: "Is my text sent anywhere?", answer: "Yes. Unlike our other tools, this one sends your pasted text to Lovable AI for processing so it can be organised. It is not saved by ConvertHub. Do not paste passwords or highly sensitive information." },
  { question: "Can I edit the document before downloading?", answer: "Yes. After the AI organises your text, the result appears in an editable box. Change anything you like, then download the .docx file." },
  { question: "Does the AI change my meaning?", answer: "It is told to keep your facts and meaning, and only fix grammar, spelling and structure. Always read the result before using it." },
  { question: "What formatting is supported?", answer: "Title, section headings, sub-headings, paragraphs, bullet lists and numbered lists, all as real Word styles." },
];

type Block = { kind: "h1" | "h2" | "h3" | "bullet" | "number" | "p"; text: string };

function parse(doc: string): Block[] {
  return doc.split(/\n+/).map((l) => l.trim()).filter(Boolean).map((l) => {
    if (l.startsWith("### ")) return { kind: "h3", text: l.slice(4) };
    if (l.startsWith("## ")) return { kind: "h2", text: l.slice(3) };
    if (l.startsWith("# ")) return { kind: "h1", text: l.slice(2) };
    if (/^[-*•]\s+/.test(l)) return { kind: "bullet", text: l.replace(/^[-*•]\s+/, "") };
    if (/^\d+[.)]\s+/.test(l)) return { kind: "number", text: l.replace(/^\d+[.)]\s+/, "") };
    return { kind: "p", text: l };
  });
}

async function buildDocx(blocks: Block[]) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat, AlignmentType } = await import("docx");
  const children = blocks.map((b) => {
    const run = [new TextRun(b.text)];
    if (b.kind === "h1") return new Paragraph({ heading: HeadingLevel.TITLE, children: run });
    if (b.kind === "h2") return new Paragraph({ heading: HeadingLevel.HEADING_1, children: run });
    if (b.kind === "h3") return new Paragraph({ heading: HeadingLevel.HEADING_2, children: run });
    if (b.kind === "bullet") return new Paragraph({ bullet: { level: 0 }, children: run });
    if (b.kind === "number") return new Paragraph({ numbering: { reference: "num", level: 0 }, children: run });
    return new Paragraph({ spacing: { after: 160 }, children: run });
  });
  const doc = new Document({
    numbering: { config: [{ reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.START }] }] },
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ children }],
  });
  return Packer.toBlob(doc);
}

const preview: Record<Block["kind"], string> = {
  h1: "text-2xl font-bold", h2: "text-xl font-semibold mt-3", h3: "text-lg font-semibold mt-2",
  bullet: "pl-5 list-item list-disc ml-4", number: "pl-5", p: "",
};

const AiTextToWord = () => {
  const [input, setInput] = useState("");
  const [doc, setDoc] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  const organize = async () => {
    setBusy(true); setError("");
    try {
      const { data, error } = await supabase.functions.invoke("organize-document", { body: { text: input } });
      if (error) {
        let msg = "Could not organise the text. Please try again.";
        try { msg = (await (error as { context?: Response }).context?.json())?.error ?? msg; } catch { /* keep */ }
        throw new Error(msg);
      }
      if (!data?.document) throw new Error(data?.error ?? "No result returned.");
      setDoc(data.document);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    const blocks = parse(doc);
    const blob = await buildDocx(blocks);
    const name = (blocks.find((b) => b.kind === "h1")?.text || "document").replace(/[^\w\- ]+/g, "").trim().slice(0, 60) || "document";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.docx`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  let n = 0;
  const blocks = parse(doc);

  return (
    <ToolPage
      title="AI Text to Word – Organise Notes into a Polished Document"
      description="Paste messy notes and let AI organise them into a clean, editable Word (.docx) document with headings and lists. Free, no sign-up."
      path="/ai-text-to-word"
      h1="AI Text to Word Document"
      intro="Paste rough notes or messy text. AI tidies it into a structured document you can edit and download as Word."
      crumbs={[{ label: "Text Tools", path: "/word-counter" }, { label: "AI Text to Word" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto space-y-4">
          <div className="flex gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm" role="note">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
            <p>
              <strong>Heads up:</strong> unlike our other tools, this one sends your pasted text to Lovable AI for
              processing. ConvertHub does not store it. Avoid pasting passwords or sensitive personal data.
            </p>
          </div>

          <label htmlFor="ai-input" className="font-medium block">Paste your text</label>
          <textarea
            id="ai-input" value={input} maxLength={MAX} onChange={(e) => setInput(e.target.value)}
            rows={9} placeholder="e.g. meeting notes, rough essay draft, list of points…"
            className="w-full rounded-2xl border border-input bg-background p-4 text-base"
          />
          <p className="text-xs text-muted-foreground">{input.length.toLocaleString()} / {MAX.toLocaleString()} characters</p>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            I understand my text will be sent to Lovable AI for processing.
          </label>

          <button onClick={organize} disabled={!input.trim() || !consent || busy} className="btn-primary">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {busy ? "Organising…" : "Organise with AI"}
          </button>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          {doc && (
            <div className="space-y-3 pt-2 border-t border-border">
              <label htmlFor="ai-output" className="font-medium block">Edit your document</label>
              <p className="text-xs text-muted-foreground"># Title · ## Heading · ### Sub-heading · - bullet · 1. numbered</p>
              <textarea id="ai-output" value={doc} onChange={(e) => setDoc(e.target.value)} rows={12}
                className="w-full rounded-2xl border border-input bg-background p-4 font-mono text-sm" />
              <div className="rounded-2xl border border-border bg-card p-5 space-y-2" aria-label="Preview">
                {blocks.map((b, i) => {
                  if (b.kind === "number") n++; else n = 0;
                  return <p key={i} className={preview[b.kind]}>{b.kind === "number" ? `${n}. ` : ""}{b.text}</p>;
                })}
              </div>
              <button onClick={download} className="btn-primary"><Download className="w-4 h-4" /> Download Word (.docx)</button>
            </div>
          )}
        </div>
      }
    >
      <h2>Turn messy notes into a clean Word document</h2>
      <p>
        Paste lecture notes, meeting minutes, a rough draft or a list of points. The AI fixes spelling and grammar,
        adds a title and section headings, and turns loose points into bullet or numbered lists — without changing
        your meaning. You can then edit the result and download a real .docx file that opens in Word, Google Docs or LibreOffice.
      </p>
      <h3>How it works</h3>
      <p>
        1. Paste your text. 2. Tick the notice and press Organise with AI. 3. Edit the result if needed.
        4. Download your Word file. The Word file itself is created in your browser.
      </p>
    </ToolPage>
  );
};

export default AiTextToWord;
