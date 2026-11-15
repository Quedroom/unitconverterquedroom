import ToolPage from "@/components/ToolPage";
import UnitConverterTool from "@/components/UnitConverterTool";

const digitalDataUnits = [
  { name: "Bit", symbol: "bit", factor: 0.125 },
  { name: "Byte", symbol: "B", factor: 1 },
  { name: "Kilobyte (decimal)", symbol: "kB", factor: 1_000 },
  { name: "Megabyte (decimal)", symbol: "MB", factor: 1_000_000 },
  { name: "Gigabyte (decimal)", symbol: "GB", factor: 1_000_000_000 },
  { name: "Terabyte (decimal)", symbol: "TB", factor: 1_000_000_000_000 },
  { name: "Kibibyte (binary)", symbol: "KiB", factor: 1_024 },
  { name: "Mebibyte (binary)", symbol: "MiB", factor: 1_048_576 },
  { name: "Gibibyte (binary)", symbol: "GiB", factor: 1_073_741_824 },
  { name: "Tebibyte (binary)", symbol: "TiB", factor: 1_099_511_627_776 },
];

const faqs = [
  {
    question: "What is the difference between MB and MiB?",
    answer: "A megabyte (MB) uses decimal units: 1 MB is 1,000,000 bytes. A mebibyte (MiB) uses binary units: 1 MiB is 1,048,576 bytes.",
  },
  {
    question: "How many bits are in a byte?",
    answer: "One byte (B) contains 8 bits (bit). Network speeds are often measured in bits per second, while file sizes are usually shown in bytes.",
  },
  {
    question: "Does this converter send my values anywhere?",
    answer: "No. The conversion runs in your browser. The value you enter is not uploaded or stored by this tool.",
  },
];

const DigitalDataConverter = () => (
  <ToolPage
    title="Digital Data Converter – bits, bytes, KB, MB, GB"
    description="Convert bits, bytes, decimal KB–TB and binary KiB–TiB with this free digital data converter. Instant, private results in your browser."
    path="/digital-data-converter"
    h1="Digital Data Converter — Bits, Bytes & Storage Units"
    intro="Convert file sizes and digital storage between bits, bytes, decimal units and binary units."
    crumbs={[
      { label: "Text Tools", path: "/word-counter" },
      { label: "Digital Data Converter" },
    ]}
    faqs={faqs}
    tool={
      <UnitConverterTool
        units={digitalDataUnits}
        storageKey="digital-data"
        defaultFrom="MB"
        defaultTo="MiB"
      />
    }
  >
    <h2>Convert digital data and storage sizes</h2>
    <p>
      Use this digital data converter to translate a value between bits, bytes and common storage units. Choose a
      starting unit and a result unit, then enter the number you want to convert. The answer updates immediately;
      you can swap units, copy the result and review recent conversions saved in this browser. The tool is useful
      when comparing a file size with a storage limit, interpreting a device specification or converting between
      the units used for downloads and network speeds.
    </p>
    <p>
      Digital storage labels use both decimal and binary conventions. Decimal prefixes increase by 1,000: one
      kilobyte (kB) is 1,000 bytes, and one megabyte (MB) is 1,000,000 bytes. Binary prefixes increase by 1,024:
      one kibibyte (KiB) is 1,024 bytes, and one mebibyte (MiB) is 1,048,576 bytes. These are distinct units, so
      this converter labels them separately instead of treating KB and KiB as interchangeable. A bit is one
      eighth of a byte; bits per second and bytes per second therefore differ by a factor of eight when comparing
      the same data quantity per unit of time.
    </p>

    <h2>Digital data conversion formula</h2>
    <p>
      Convert through bytes: <strong>result = input × source-unit bytes ÷ target-unit bytes</strong>. For example,
      2 MB is 2 × 1,000,000 bytes. To express that in MiB, divide by 1,048,576, giving approximately 1.90735 MiB.
      For bits, the byte factor is 0.125; for a byte, it is 1.
    </p>

    <h2>Digital storage conversion table</h2>
    <div className="overflow-x-auto">
      <table className="seo-table">
        <thead>
          <tr><th>Unit</th><th>Symbol</th><th>Bytes</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Bit</td><td>bit</td><td>0.125</td><td>8 bit = 1 B</td></tr>
          <tr><td>Byte</td><td>B</td><td>1</td><td>1,000 B = 1 kB</td></tr>
          <tr><td>Kilobyte</td><td>kB</td><td>1,000</td><td>1,000 kB = 1 MB</td></tr>
          <tr><td>Megabyte</td><td>MB</td><td>1,000,000</td><td>1,000 MB = 1 GB</td></tr>
          <tr><td>Kibibyte</td><td>KiB</td><td>1,024</td><td>1,024 KiB = 1 MiB</td></tr>
          <tr><td>Mebibyte</td><td>MiB</td><td>1,048,576</td><td>1,024 MiB = 1 GiB</td></tr>
          <tr><td>Gibibyte</td><td>GiB</td><td>1,073,741,824</td><td>1,024 GiB = 1 TiB</td></tr>
        </tbody>
      </table>
    </div>
    <p>
      All calculations run locally in your browser. No sign-up is required, and the values entered in this converter
      are never uploaded or saved on a server.
    </p>
  </ToolPage>
);

export default DigitalDataConverter;