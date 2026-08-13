export interface ToolLink {
  name: string;
  path: string;
  category: string;
  keywords: string;
}

export const tools: ToolLink[] = [
  { name: "Length Converter", path: "/length-converter", category: "Length", keywords: "cm inch meter feet km mile length" },
  { name: "Weight Converter", path: "/weight-converter", category: "Weight", keywords: "kg lbs pound gram mass weight" },
  { name: "Temperature Converter", path: "/temperature-converter", category: "Temperature", keywords: "celsius fahrenheit kelvin temp" },
  { name: "Percentage Calculator", path: "/percentage-calculator", category: "Finance", keywords: "percent percentage increase discount" },
  { name: "EMI Calculator", path: "/emi-calculator", category: "Finance", keywords: "loan emi interest finance mortgage" },
  { name: "Word Counter", path: "/word-counter", category: "Text Tools", keywords: "word character count text reading time" },
  { name: "Image Compressor", path: "/image-compressor", category: "Image Tools", keywords: "compress image jpg png 20kb 50kb 100kb" },
  { name: "Image Converter", path: "/media", category: "Image Tools", keywords: "jpg png webp convert image media" },
  { name: "Data Converter", path: "/data-converter", category: "Text Tools", keywords: "base64 binary hex csv json data" },
  { name: "Scientific Calculator", path: "/scientific-calculator", category: "Finance", keywords: "scientific calculator trig log math" },
  { name: "Engineering Unit Converter", path: "/unit", category: "Length", keywords: "engineering pressure torque energy power units" },
];

export const menu = [
  { label: "Length", path: "/length-converter" },
  { label: "Weight", path: "/weight-converter" },
  { label: "Temp", path: "/temperature-converter" },
  { label: "Finance", path: "/emi-calculator" },
  { label: "Text Tools", path: "/word-counter" },
  { label: "Image Tools", path: "/image-compressor" },
];
