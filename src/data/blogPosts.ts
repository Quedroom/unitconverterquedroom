export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  body: { heading?: string; paragraphs: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bigha-to-square-feet-assam",
    title: "Bigha to Square Feet Conversion in Assam",
    description:
      "How many square feet is one bigha in Assam? Understand katha, lecha and bigha land measurement with an exact conversion table.",
    date: "2026-08-01",
    readingTime: "4 min read",
    category: "Land Measurement",
    body: [
      {
        paragraphs: [
          "Land in Assam is still bought, sold and recorded in traditional units — bigha, katha and lecha — while builders, banks and architects work in square feet. Mixing the two systems is the single most common source of confusion in a property deal, because a bigha is not the same size in every Indian state.",
          "In Assam, one bigha equals 5 katha, one katha equals 20 lecha, and one lecha equals 144 square feet. Multiplying through gives 14,400 square feet to a bigha and 2,880 square feet to a katha.",
        ],
      },
      {
        heading: "Assam land conversion table",
        paragraphs: [
          "1 lecha = 144 sq ft. 1 katha = 20 lecha = 2,880 sq ft. 1 bigha = 5 katha = 14,400 sq ft ≈ 1,337.8 square metres ≈ 0.3306 acre. 3 bigha ≈ 1 acre (43,200 sq ft against 43,560 sq ft).",
        ],
      },
      {
        heading: "Why bigha differs across states",
        paragraphs: [
          "Bigha was never standardised nationally. In West Bengal a bigha is about 14,400 sq ft as well, but in Uttar Pradesh it can be 27,000 sq ft and in Rajasthan around 17,424 sq ft. Always confirm the local definition on the land record (patta) before converting, and never rely on a figure quoted for another state.",
        ],
      },
      {
        heading: "Checking a plot yourself",
        paragraphs: [
          "Measure the plot in feet, multiply length by width to get square feet, then divide by 2,880 for katha or 14,400 for bigha. For irregular plots, split the area into rectangles and triangles, convert each, and add the results. You can run the arithmetic in our length and area converters, which keep eight decimal places so rounding never distorts a boundary calculation.",
        ],
      },
    ],
  },
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG vs PNG vs WebP: Which Image Format Should You Use?",
    description:
      "A practical comparison of JPG, PNG and WebP — compression type, transparency, quality and file size — so you pick the right format every time.",
    date: "2026-08-05",
    readingTime: "5 min read",
    category: "Image Tools",
    body: [
      {
        paragraphs: [
          "Choosing an image format is a trade-off between file size, visual quality and features such as transparency. Getting it wrong costs you either page speed or image quality, and on a content site it costs both.",
        ],
      },
      {
        heading: "JPG — photographs",
        paragraphs: [
          "JPG uses lossy compression that discards detail your eye is least sensitive to. It produces small files for photographs with smooth colour gradients, and it is supported by every device and every upload form ever built. It does not support transparency, and repeated re-saving degrades the image because each save discards more data.",
        ],
      },
      {
        heading: "PNG — graphics and transparency",
        paragraphs: [
          "PNG is lossless: what you save is exactly what you opened. That makes it ideal for logos, screenshots, charts and any image with sharp edges or text, and it is the only one of the three classic formats with reliable alpha transparency. The cost is size — a photograph saved as PNG is often five to ten times larger than the same photo as JPG.",
        ],
      },
      {
        heading: "WebP — the modern default",
        paragraphs: [
          "WebP supports both lossy and lossless modes plus transparency and animation, and typically produces files 25–35% smaller than JPG at equivalent quality. Every current browser supports it, so for your own website WebP is usually the best choice. Keep a JPG fallback only for third-party upload forms that still reject WebP.",
        ],
      },
      {
        heading: "Quick guidance",
        paragraphs: [
          "Photos on your own site: WebP. Photos for an official upload form: JPG. Logos, icons, screenshots and anything needing transparency: PNG, or lossless WebP if the destination accepts it. Need to hit a size limit? Use the image compressor, which targets 20 KB, 50 KB, 100 KB or 200 KB in JPG or WebP without uploading your photo anywhere.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-percentage-correctly",
    title: "How to Calculate Percentage Correctly",
    description:
      "Percentage of a number, percentage increase and decrease, discounts and marks — with formulas, worked examples and the mistakes to avoid.",
    date: "2026-08-10",
    readingTime: "5 min read",
    category: "Maths",
    body: [
      {
        paragraphs: [
          "A percentage is a fraction out of 100, which is why it is the fairest way to compare quantities of different sizes. Three formulas cover almost every real situation you will meet.",
        ],
      },
      {
        heading: "The three core formulas",
        paragraphs: [
          "Percent of a number: (Value × Percent) ÷ 100. Part as a percentage: (Part ÷ Whole) × 100. Percentage change: ((New − Old) ÷ Old) × 100, where a negative answer means a decrease.",
        ],
      },
      {
        heading: "Worked examples",
        paragraphs: [
          "18% GST on ₹1,200 is 1200 × 18 ÷ 100 = ₹216, so the total is ₹1,416. Scoring 45 out of 60 is 45 ÷ 60 × 100 = 75%. A price moving from ₹800 to ₹1,000 is (1000 − 800) ÷ 800 × 100 = a 25% increase.",
        ],
      },
      {
        heading: "The mistake almost everyone makes",
        paragraphs: [
          "A 25% increase followed by a 25% decrease does not return you to the start. ₹100 rises to ₹125, and 25% off ₹125 is ₹93.75. Each percentage is calculated against a different base, so always identify which value the percentage refers to before applying it.",
        ],
      },
      {
        heading: "Reversing a discount",
        paragraphs: [
          "To find the original price from a discounted one, divide rather than add back the percentage: original = discounted price ÷ (1 − discount ÷ 100). A shirt bought for ₹1,200 after 20% off originally cost 1200 ÷ 0.8 = ₹1,500. Our percentage calculator handles all three modes if you would rather not do it by hand.",
        ],
      },
    ],
  },
];
