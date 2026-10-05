import { useRef, useState } from "react";
import { FileText, Upload, Download, Loader2 } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const faqs = [
  { question: "Is my PDF uploaded to a server?", answer: "No. The PDF is read and converted entirely inside your browser. The file never leaves your device and nothing is stored." },
  { question: "Will the formatting be kept exactly?", answer: "The converter keeps your text, line order, paragraphs and page breaks, and marks larger text as headings. Complex layouts, images and tables are not copied, so you may need small touch-ups in Word." },
  { question: "Can it convert scanned PDFs?", answer: "Scanned PDFs are pictures of pages with no real text inside, so there is nothing to extract. Use a PDF that was created from a text document." },
  { question: "Which Word versions open the file?", answer: "The output is a standard .docx file that opens in Microsoft Word 2007 and newer, Google Docs, LibreOffice and Pages." },
];

type Line = { text: string; size: number; gapBefore: number };

async function extractPages(file: File, onProgress: (p: number, t: number) => void) {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: Line[][] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const rows = new Map<number, { x: number; str: string; size: number }[]>();
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      const y = Math.round(item.transform[5]);
      const key = [...rows.keys()].find((k) => Math.abs(k - y) < 3) ?? y;
      const size = Math.abs(item.transform[3]) || 12;
      (rows.get(key) ?? rows.set(key, []).get(key)!).push({ x: item.transform[4], str: item.str, size });
    }
    const ys = [...rows.keys()].sort((a, b) => b - a);
    let prev: number | null = null;
    const lines: Line[] = ys.map((y) => {
      const parts = rows.get(y)!.sort((a, b) => a.x - b.x);
      const size = Math.max(...parts.map((p) => p.size));
      const line = { text: parts.map((p) => p.str).join(" ").replace(/\s+/g, " ").trim(), size, gapBefore: prev === null ? 0 : prev - y };
      prev = y;
      return line;
    });
    pages.push(lines);
    onProgress(i, pdf.numPages);
  }
  return pages;
}

async function buildDocx(pages: Line[][]) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak } = await import("docx");
  const all = pages.flat();
  const sizes = all.map((l) => l.size).sort((a, b) => a - b);
  const body = sizes[Math.floor(sizes.length / 2)] || 12;
  const children: InstanceType<typeof Paragraph>[] = [];
  pages.forEach((lines, pi) => {
    let buf = "";
    let bufSize = body;
    const flush = () => {
      if (!buf) return;
      const heading = bufSize > body * 1.4 ? HeadingLevel.HEADING_1 : bufSize > body * 1.15 ? HeadingLevel.HEADING_2 : undefined;
      children.push(new Paragraph({ heading, spacing: { after: 160 }, children: [new TextRun(buf)] }));
      buf = "";
    };
    lines.forEach((l) => {
      const newPara = !buf || l.gapBefore > l.size * 1.8 || Math.abs(l.size - bufSize) > 1;
      if (newPara) { flush(); bufSize = l.size; buf = l.text; }
      else buf = buf.endsWith("-") ? buf.slice(0, -1) + l.text : `${buf} ${l.text}`;
    });
    flush();
    if (pi < pages.length - 1) children.push(new Paragraph({ children: [new PageBreak()] }));
  });
  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ children }],
  });
  return Packer.toBlob(doc);
}

const PdfToWord = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; name: string; words: number; pages: number } | null>(null);

  const pick = (f?: File) => {
    setError(""); setResult(null);
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) return setError("Please choose a PDF file.");
    setFile(f);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError(""); setResult(null);
    try {
      const pages = await extractPages(file, (p, t) => setStatus(`Reading page ${p} of ${t}…`));
      const words = pages.flat().reduce((n, l) => n + l.text.split(/\s+/).filter(Boolean).length, 0);
      if (!words) throw new Error("No text found. This PDF may be a scanned image.");
      setStatus("Creating Word document…");
      const blob = await buildDocx(pages);
      setResult({ url: URL.createObjectURL(blob), name: file.name.replace(/\.pdf$/i, "") + ".docx", words, pages: pages.length });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not convert this PDF.");
    } finally {
      setBusy(false); setStatus("");
    }
  };

  return (
    <ToolPage
      title="PDF to Word Converter – Free, Private & Offline"
      description="Convert PDF to editable Word (.docx) free in your browser. No upload, no sign-up — your file never leaves your device."
      path="/pdf-to-word"
      h1="PDF to Word Converter"
      intro="Turn a PDF into an editable Word document. Everything happens in your browser — your file is never uploaded."
      crumbs={[{ label: "Text Tools", path: "/word-counter" }, { label: "PDF to Word" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${drag ? "border-primary bg-primary/5" : "border-border bg-muted/40"}`}
          >
            <Upload className="w-10 h-10 mx-auto text-primary" aria-hidden />
            <p className="mt-3 font-medium">Drag & drop your PDF here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <button type="button" onClick={() => inputRef.current?.click()} className="btn-primary mt-3">Choose File</button>
            <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
            {file && (
              <p className="mt-4 text-sm flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={convert} disabled={!file || busy} className="btn-primary">
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} {busy ? "Converting…" : "Convert to Word"}
            </button>
            {result && (
              <a href={result.url} download={result.name} className="btn-secondary">
                <Download className="w-4 h-4" /> Download {result.name}
              </a>
            )}
          </div>
          {status && <p className="text-sm text-muted-foreground mt-3" role="status">{status}</p>}
          {error && <p className="text-sm text-destructive mt-3" role="alert">{error}</p>}
          {result && (
            <p className="text-sm text-muted-foreground mt-3">Done: {result.pages} page(s), {result.words.toLocaleString()} words converted.</p>
          )}
        </div>
      }
    >
      <h2>How to convert PDF to Word for free</h2>
      <p>
        Choose a PDF or drag it into the box, press Convert to Word, then download your .docx file. The converter reads
        the text from every page, rebuilds the paragraphs, marks bigger text as headings and keeps a page break between
        pages, so the document is ready to edit in Microsoft Word, Google Docs or LibreOffice.
      </p>
      <p>
        Unlike most online converters, nothing is uploaded. Contracts, resumes, assignments and bank letters stay on your
        own device, which makes this tool safe for private documents and usable even on a slow connection.
      </p>

      <h2>What gets converted</h2>
      <table className="seo-table">
        <thead><tr><th>Content</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>Text and paragraphs</td><td>Kept and editable</td></tr>
          <tr><td>Headings (larger text)</td><td>Word Heading styles</td></tr>
          <tr><td>Page breaks</td><td>Kept</td></tr>
          <tr><td>Images and tables</td><td>Not copied</td></tr>
          <tr><td>Scanned pages</td><td>Not supported (no text inside)</td></tr>
        </tbody>
      </table>

      <h3>Tips for the best result</h3>
      <p>
        PDFs exported from Word, Google Docs or a web browser convert best because they contain real text. If a PDF was
        made by scanning paper, it only holds pictures of the pages; nothing can be extracted without text recognition.
        For multi-column layouts, check the reading order after conversion and adjust a few paragraphs if needed.
      </p>
    </ToolPage>
  );
};

export default PdfToWord;
