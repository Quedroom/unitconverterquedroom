import { useRef, useState } from "react";
import { Upload, Download, ImageIcon, X } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const faqs = [
  { question: "How do I compress a JPG to 50 KB?", answer: "Upload the image, choose the 50 KB target size and press Compress. The tool repeatedly lowers JPEG quality (and scales the image if needed) until the file fits under the target." },
  { question: "Will compressing reduce image quality?", answer: "Some quality is always lost when a photo is compressed to a very small size. Targets of 100 KB or 200 KB usually look identical on screen, while 20 KB is best for thumbnails or ID uploads." },
  { question: "Are my images uploaded to a server?", answer: "No. Compression uses the HTML canvas inside your browser. Your photo never leaves your device, which is why the tool works even offline once the page has loaded." },
  { question: "Which formats are supported?", answer: "You can upload JPG, PNG or WebP images. Output is JPEG or WebP, the two formats that support quality-based compression." },
];

const targets = [20, 50, 100, 200];

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [target, setTarget] = useState(100);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState<{ url: string; size: number; name: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    if (preview) URL.revokeObjectURL(preview);
    if (output) URL.revokeObjectURL(output.url);
    setOutput(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();

      const targetBytes = target * 1024;
      let scale = 1;
      let best: Blob | null = null;

      for (let attempt = 0; attempt < 5 && !best; attempt++) {
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) break;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        for (let q = 0.92; q >= 0.05; q -= 0.07) {
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, q));
          if (blob && blob.size <= targetBytes) {
            best = blob;
            break;
          }
          if (blob && q <= 0.12 && attempt === 4) best = blob;
        }
        scale *= 0.75;
      }

      URL.revokeObjectURL(img.src);
      if (best) {
        const ext = format === "image/webp" ? "webp" : "jpg";
        setOutput({
          url: URL.createObjectURL(best),
          size: best.size,
          name: `${file.name.replace(/\.[^.]+$/, "")}-compressed.${ext}`,
        });
      }
    } finally {
      setBusy(false);
    }
  };

  const kb = (b: number) => `${(b / 1024).toFixed(1)} KB`;

  return (
    <ToolPage
      title="Image Compressor – Compress JPG & PNG to 20KB, 50KB, 100KB"
      description="Compress JPG, PNG and WebP images to 20KB, 50KB, 100KB or 200KB online. Drag and drop or choose a file on mobile — images never leave your browser."
      path="/image-compressor"
      h1="Image Compressor — JPG & PNG to 20KB, 50KB, 100KB"
      intro="Reduce photo file size to an exact target for forms, uploads and faster websites."
      crumbs={[{ label: "Image Tools", path: "/image-compressor" }, { label: "Image Compressor" }]}
      faqs={faqs}
      tool={
        <div className="tool-card max-w-3xl mx-auto">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) pick(f); }}
            className={`drop-zone ${dragging ? "active" : ""}`}
          >
            <Upload className="w-8 h-8 mx-auto text-primary mb-3" />
            <p className="font-medium mb-1">Drag &amp; drop an image here</p>
            <p className="text-sm text-muted-foreground mb-4">JPG, PNG or WebP — processed on your device</p>
            <button onClick={() => inputRef.current?.click()} className="btn-primary">
              <ImageIcon className="w-4 h-4" /> Choose File
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) pick(f); }}
            />
          </div>

          {file && (
            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-4">
                {preview && <img src={preview} alt={`Preview of ${file.name}`} className="w-20 h-20 object-cover rounded-xl border border-border" />}
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">Original: {kb(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setPreview(null); setOutput(null); }} aria-label="Remove image" className="p-2 text-muted-foreground hover:text-destructive">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Target size</p>
                <div className="flex flex-wrap gap-2">
                  {targets.map((t) => (
                    <button key={t} onClick={() => setTarget(t)} className={`category-tab ${target === t ? "active" : ""}`}>
                      {t} KB
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Output format</p>
                <div className="flex gap-2">
                  {([["image/jpeg", "JPG"], ["image/webp", "WebP"]] as const).map(([v, l]) => (
                    <button key={v} onClick={() => setFormat(v)} className={`category-tab ${format === v ? "active" : ""}`}>{l}</button>
                  ))}
                </div>
              </div>

              <button onClick={compress} className="btn-primary w-full sm:w-auto" disabled={busy}>
                {busy ? "Compressing..." : `Compress to ${target} KB`}
              </button>

              {output && (
                <div className="rounded-xl bg-accent p-4 flex flex-wrap items-center gap-4">
                  <img src={output.url} alt="Compressed result" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Compressed: {kb(output.size)}</p>
                    <p className="text-sm text-muted-foreground">
                      Saved {Math.max(0, Math.round((1 - output.size / file.size) * 100))}% vs original
                    </p>
                  </div>
                  <a href={output.url} download={output.name} className="btn-primary">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      }
    >
      <h2>Compress images to an exact file size</h2>
      <p>
        Government portals, job applications, exam forms and school websites almost always cap photo uploads at a
        specific size such as 20 KB, 50 KB, 100 KB or 200 KB. Camera photos are several megabytes, so they are rejected
        immediately. This compressor repeatedly re-encodes your image at lower quality — and downsizes its dimensions if
        necessary — until the file drops under the target you selected, then offers it for download.
      </p>
      <p>
        On desktop you can drag a file straight onto the drop zone. On phones, where drag and drop does not work, use the
        Choose File button to open the gallery or camera. Because everything runs on the HTML canvas inside your browser,
        your photo is never uploaded, which matters when the image is an ID document or a personal photograph.
      </p>

      <h2>Which target size should I pick?</h2>
      <table className="seo-table">
        <thead><tr><th>Target</th><th>Best for</th><th>Expected quality</th></tr></thead>
        <tbody>
          <tr><td>20 KB</td><td>Signature and thumbnail uploads</td><td>Visible softening</td></tr>
          <tr><td>50 KB</td><td>Passport photos on forms</td><td>Good at small sizes</td></tr>
          <tr><td>100 KB</td><td>Website images, blog thumbnails</td><td>Very good</td></tr>
          <tr><td>200 KB</td><td>Full-width hero images</td><td>Near original</td></tr>
        </tbody>
      </table>

      <h3>JPG or WebP?</h3>
      <p>
        JPG is accepted everywhere and is the safe choice for official uploads. WebP reaches the same visual quality at
        roughly 25–35% smaller file size and is the better choice for your own website, since every modern browser
        supports it. Note that PNG is not offered as an output format here: PNG uses lossless compression and cannot be
        squeezed to an arbitrary target size the way JPG and WebP can. If you need a PNG copy of an image without a size
        target, use the image converter instead.
      </p>

      <h3>How compression actually works</h3>
      <p>
        JPEG and WebP discard detail the human eye is least sensitive to, mostly fine colour variation. Lowering the
        quality setting discards more of it. When quality alone cannot reach the target, reducing the pixel dimensions is
        far more effective — halving width and height removes about three quarters of the data. This tool applies both
        steps automatically so you only pick the number you need.
      </p>
    </ToolPage>
  );
};

export default ImageCompressor;
