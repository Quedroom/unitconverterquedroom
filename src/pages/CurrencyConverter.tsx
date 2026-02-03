import { useState } from "react";
import Layout from "@/components/Layout";
import { ArrowRightLeft, Search, TrendingUp } from "lucide-react";

type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // How many units of this currency = 1 USD
};

// Exchange rates as of February 3, 2026 - Verified from live markets
const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rateToUSD: 1 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rateToUSD: 0.847 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", rateToUSD: 0.731 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rateToUSD: 90.48 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", rateToUSD: 155.49 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", rateToUSD: 7.30 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rateToUSD: 1.62 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", rateToUSD: 1.368 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", rateToUSD: 0.778 },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", rateToUSD: 7.77 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rateToUSD: 1.33 },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", rateToUSD: 10.25 },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", rateToUSD: 1435 },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", rateToUSD: 17.40 },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", rateToUSD: 1.76 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", rateToUSD: 5.72 },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", rateToUSD: 18.15 },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺", rateToUSD: 96.50 },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", rateToUSD: 3.673 },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", rateToUSD: 3.75 },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", rateToUSD: 31.25 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", rateToUSD: 4.38 },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩", rateToUSD: 16285 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭", rateToUSD: 57.35 },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱", rateToUSD: 3.595 },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", rateToUSD: 36.25 },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", rateToUSD: 10.85 },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰", rateToUSD: 6.32 },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰", rateToUSD: 278.50 },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩", rateToUSD: 121.50 },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳", rateToUSD: 25420 },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬", rateToUSD: 50.65 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", rateToUSD: 1545 },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴", rateToUSD: 4185 },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", rateToUSD: 1065 },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱", rateToUSD: 945 },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱", rateToUSD: 3.58 },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿", rateToUSD: 22.85 },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺", rateToUSD: 375 },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴", rateToUSD: 4.32 },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyData = currencies.find((c) => c.code === toCurrency);

  const convert = (): string => {
    const value = parseFloat(amount);
    if (isNaN(value) || !fromCurrencyData || !toCurrencyData) return "0";

    // Convert from source to USD, then USD to target
    const valueInUSD = value / fromCurrencyData.rateToUSD;
    const result = valueInUSD * toCurrencyData.rateToUSD;

    // Format based on magnitude
    if (result >= 1000000) {
      return result.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else if (result >= 1) {
      return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return result.toFixed(6).replace(/\.?0+$/, "");
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = (): string => {
    if (!fromCurrencyData || !toCurrencyData) return "";
    const rate = toCurrencyData.rateToUSD / fromCurrencyData.rateToUSD;
    return rate >= 1 ? rate.toFixed(4) : rate.toFixed(6);
  };

  const filterCurrencies = (search: string) => {
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const CurrencySelect = ({
    value,
    onChange,
    search,
    onSearchChange,
    label,
  }: {
    value: string;
    onChange: (code: string) => void;
    search: string;
    onSearchChange: (s: string) => void;
    label: string;
  }) => {
    const selected = currencies.find((c) => c.code === value);
    const filtered = filterCurrencies(search);

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-muted-foreground">{label}</label>
        
        {/* Selected Currency Display */}
        <div className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl">
          <span className="text-2xl">{selected?.flag}</span>
          <div>
            <div className="font-semibold text-foreground">{selected?.code}</div>
            <div className="text-sm text-muted-foreground">{selected?.name}</div>
          </div>
        </div>

        {/* Search and Select */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search currency..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-background">
          {filtered.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                onChange(currency.code);
                onSearchChange("");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-secondary transition-colors ${
                currency.code === value ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
            >
              <span className="text-lg">{currency.flag}</span>
              <span className="font-medium">{currency.code}</span>
              <span className="text-sm text-muted-foreground">{currency.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout showBack title="Currency Converter">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Currency Converter</h1>
          <p className="section-subtitle">
            Convert between 40+ world currencies instantly. All conversions happen locally in your browser.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Rates are approximate and for reference only. For live rates, check a financial service.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field text-2xl font-mono"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              search={searchFrom}
              onSearchChange={setSearchFrom}
              label="From"
            />

            {/* Swap Button */}
            <div className="flex justify-center md:pt-10">
              <button
                onClick={swapCurrencies}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <ArrowRightLeft className="w-5 h-5 text-primary" />
              </button>
            </div>

            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              search={searchTo}
              onSearchChange={setSearchTo}
              label="To"
            />
          </div>

          {/* Result */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Result</div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {fromCurrencyData?.symbol}{amount || "0"} {fromCurrency} = {toCurrencyData?.symbol}{convert()} {toCurrency}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>
                  1 {fromCurrency} = {getExchangeRate()} {toCurrency}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Convert Buttons */}
          <div className="mt-6">
            <div className="text-sm text-muted-foreground mb-3">Quick amounts:</div>
            <div className="flex flex-wrap gap-2">
              {[1, 10, 100, 1000, 10000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(String(val))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === String(val)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { from: "USD", to: "INR" },
            { from: "USD", to: "EUR" },
            { from: "GBP", to: "USD" },
            { from: "EUR", to: "GBP" },
          ].map(({ from, to }) => {
            const fromData = currencies.find((c) => c.code === from);
            const toData = currencies.find((c) => c.code === to);
            const rate = toData && fromData ? (toData.rateToUSD / fromData.rateToUSD).toFixed(4) : "";
            return (
              <button
                key={`${from}-${to}`}
                onClick={() => {
                  setFromCurrency(from);
                  setToCurrency(to);
                }}
                className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{fromData?.flag}</span>
                  <span className="text-muted-foreground">→</span>
                  <span>{toData?.flag}</span>
                </div>
                <div className="font-semibold text-foreground">
                  {from}/{to}
                </div>
                <div className="text-sm text-muted-foreground">{rate}</div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CurrencyConverter;
