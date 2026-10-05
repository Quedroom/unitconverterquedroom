export interface ToolLink {
  name: string;
  path: string;
  category: string;
  keywords: string;
  /** Shown in the homepage "Popular tools" grid */
  popular?: boolean;
  desc?: string;
}

export const tools: ToolLink[] = [
  { name: "Length Converter", path: "/length-converter", category: "Length", keywords: "cm inch meter feet km mile length centimeter", popular: true, desc: "cm to inch, meter to feet, km to mile" },
  { name: "Weight Converter", path: "/weight-converter", category: "Weight", keywords: "kg lbs pound gram mass weight ounce stone", popular: true, desc: "kg to lbs, grams, ounces, stones" },
  { name: "Temperature Converter", path: "/temperature-converter", category: "Temperature", keywords: "celsius fahrenheit kelvin temp c to f", popular: true, desc: "Celsius, Fahrenheit and Kelvin" },
  { name: "Percentage Calculator", path: "/percentage-calculator", category: "Finance", keywords: "percent percentage increase discount marks", popular: true, desc: "Percent of, discounts, increase & decrease" },
  { name: "EMI Calculator", path: "/emi-calculator", category: "Finance", keywords: "loan emi interest finance mortgage home loan", popular: true, desc: "Loan EMI, interest and total payment" },
  { name: "SIP Calculator", path: "/sip-calculator", category: "Finance", keywords: "sip mutual fund investment returns monthly compounding", popular: true, desc: "Monthly SIP returns and maturity value" },
  { name: "Age Calculator", path: "/age-calculator", category: "Finance", keywords: "age calculator date of birth dob years months days", popular: true, desc: "Exact age in years, months and days" },
  { name: "Word Counter", path: "/word-counter", category: "Text Tools", keywords: "word character count text reading time", popular: true, desc: "Words, characters and reading time" },
  { name: "PDF to Word Converter", path: "/pdf-to-word", category: "Text Tools", keywords: "pdf to word docx convert pdf document editable", desc: "Convert PDF to editable .docx" },
  { name: "Image Compressor", path: "/image-compressor", category: "Image Tools", keywords: "compress image jpg png 20kb 50kb 100kb 200kb", desc: "Compress JPG & PNG to 20–200 KB" },
  { name: "Image Converter", path: "/media", category: "Image Tools", keywords: "jpg png webp convert image media", desc: "JPG, PNG and WebP conversion" },
  { name: "Data Converter", path: "/data-converter", category: "Text Tools", keywords: "base64 binary hex csv json data binary to text", desc: "Base64, binary, hex, CSV & JSON" },
  { name: "Scientific Calculator", path: "/scientific-calculator", category: "Finance", keywords: "scientific calculator trig log math", desc: "Trigonometry, logs and powers" },
  { name: "Engineering Unit Converter", path: "/unit", category: "Length", keywords: "engineering pressure torque energy power units area volume", desc: "Pressure, torque, energy, power & more" },
];

/** High-intent search phrases surfaced on the homepage. */
export const popularSearches: { label: string; path: string; title: string }[] = [
  { label: "cm to inch", path: "/length-converter", title: "Convert cm to inch with the Length Converter" },
  { label: "kg to lbs", path: "/weight-converter", title: "Convert kg to lbs with the Weight Converter" },
  { label: "C to F", path: "/temperature-converter", title: "Convert Celsius to Fahrenheit with the Temperature Converter" },
  { label: "% calculator", path: "/percentage-calculator", title: "Work out percentages with the Percentage Calculator" },
  { label: "EMI calculator", path: "/emi-calculator", title: "Calculate loan EMI with the EMI Calculator" },
  { label: "Word Counter", path: "/word-counter", title: "Count words and characters with the Word Counter" },
  { label: "JPG to PNG", path: "/media", title: "Convert JPG to PNG with the Image Converter" },
  { label: "Image Compressor", path: "/image-compressor", title: "Compress JPG and PNG images to 20–200 KB" },
  { label: "Age Calculator", path: "/age-calculator", title: "Find your exact age with the Age Calculator" },
  { label: "Binary to Text", path: "/data-converter", title: "Convert binary to text with the Data Converter" },
  { label: "SIP Calculator", path: "/sip-calculator", title: "Estimate mutual fund returns with the SIP Calculator" },
  { label: "Bigha to Sqft", path: "/blog/bigha-to-square-feet-assam", title: "Read the Bigha to Square Feet conversion guide for Assam" },
];


export const menu = [
  { label: "Length", path: "/length-converter" },
  { label: "Weight", path: "/weight-converter" },
  { label: "Temp", path: "/temperature-converter" },
  { label: "Finance", path: "/emi-calculator" },
  { label: "Text Tools", path: "/word-counter" },
  { label: "Image Tools", path: "/image-compressor" },
];

/** Simple relevance search across name, category and keywords. */
export const searchTools = (q: string, limit = 8): ToolLink[] => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  const words = term.split(/\s+/);
  return tools
    .map((t) => {
      const hay = `${t.name} ${t.category} ${t.keywords} ${t.desc ?? ""}`.toLowerCase();
      const score = words.reduce((s, w) => {
        if (t.name.toLowerCase().startsWith(w)) return s + 3;
        if (hay.includes(w)) return s + 1;
        return s;
      }, 0);
      return { t, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.t);
};

/** Other tools to cross-link from a tool page. */
export const relatedTools = (path: string, limit = 6): ToolLink[] => {
  const current = tools.find((t) => t.path === path);
  const rest = tools.filter((t) => t.path !== path);
  const sameCat = current ? rest.filter((t) => t.category === current.category) : [];
  const others = rest.filter((t) => !sameCat.includes(t));
  return [...sameCat, ...others].slice(0, limit);
};
