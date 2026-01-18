import { useState, useCallback, useRef } from "react";
import Layout from "@/components/Layout";
import { Upload, Download, X, Image as ImageIcon, Check } from "lucide-react";

type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

interface ConvertedImage {
  name: string;
  originalFormat: string;
  blob: Blob;
  url: string;
}

const MediaConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/png");
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatOptions: { value: ImageFormat; label: string; ext: string }[] = [
    { value: "image/jpeg", label: "JPEG", ext: "jpg" },
    { value: "image/png", label: "PNG", ext: "png" },
    { value: "image/webp", label: "WebP", ext: "webp" },
  ];

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Clean up previous preview
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (convertedImage?.url) URL.revokeObjectURL(convertedImage.url);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setConvertedImage(null);
  }, [previewUrl, convertedImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const convertImage = async () => {
    if (!selectedFile) return;

    setIsConverting(true);

    try {
      const img = new Image();
      img.src = previewUrl!;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d")!;
      
      // For JPEG, fill with white background (no transparency support)
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (b) => resolve(b!),
          targetFormat,
          quality / 100
        );
      });

      const ext = formatOptions.find(f => f.value === targetFormat)?.ext || "png";
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, "");

      // Clean up previous converted image
      if (convertedImage?.url) URL.revokeObjectURL(convertedImage.url);

      setConvertedImage({
        name: `${baseName}.${ext}`,
        originalFormat: selectedFile.type,
        blob,
        url: URL.createObjectURL(blob),
      });
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    link.href = convertedImage.url;
    link.download = convertedImage.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetConverter = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (convertedImage?.url) URL.revokeObjectURL(convertedImage.url);
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedImage(null);
  };

  return (
    <Layout showBack title="Media Converter">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Image Converter</h1>
          <p className="section-subtitle">
            Convert images between JPG, PNG, and WebP formats
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {!selectedFile ? (
            /* Drop Zone */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`drop-zone cursor-pointer ${isDragging ? "active" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">
                Drop your image here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, WebP, and GIF
              </p>
            </div>
          ) : (
            /* Conversion Interface */
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <button
                  onClick={resetConverter}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="bg-secondary/30 rounded-xl p-4 flex items-center justify-center min-h-[200px]">
                  <img
                    src={convertedImage?.url || previewUrl!}
                    alt="Preview"
                    className="max-h-[300px] max-w-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {convertedImage?.name || selectedFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {convertedImage
                        ? `Converted from ${selectedFile.type.split("/")[1].toUpperCase()}`
                        : `Original: ${selectedFile.type.split("/")[1].toUpperCase()}`}
                    </p>
                  </div>
                </div>
                {convertedImage && (
                  <span className="flex items-center gap-1 text-sm text-primary">
                    <Check className="w-4 h-4" />
                    Converted
                  </span>
                )}
              </div>

              {/* Conversion Options */}
              {!convertedImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Output Format
                    </label>
                    <select
                      value={targetFormat}
                      onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
                      className="select-field"
                    >
                      {formatOptions.map((format) => (
                        <option key={format.value} value={format.value}>
                          {format.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!convertedImage ? (
                  <button
                    onClick={convertImage}
                    disabled={isConverting}
                    className="btn-primary flex-1"
                  >
                    {isConverting ? "Converting..." : "Convert Image"}
                  </button>
                ) : (
                  <>
                    <button onClick={downloadImage} className="btn-primary flex-1">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button onClick={resetConverter} className="btn-secondary flex-1">
                      Convert Another
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Images are processed entirely in your browser. Nothing is uploaded to any server.
        </p>
      </div>
    </Layout>
  );
};

export default MediaConverter;
