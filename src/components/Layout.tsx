import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Shield, Menu as MenuIcon, ChevronRight } from "lucide-react";
import { menu, searchTools } from "@/data/tools";

export interface Crumb {
  label: string;
  path?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Crumb[];
  /** kept for backwards compatibility with existing pages */
  showBack?: boolean;
}

const Layout = ({ children, breadcrumbs }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchTools(query, 8);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => setActive(0), [query]);

  const go = (path: string) => {
    setQuery("");
    setOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].path);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-3">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center">
                CH
              </span>
              <span className="hidden sm:block leading-tight">
                <span className="block font-bold text-foreground">ConvertHub</span>
                <span className="block text-[11px] text-muted-foreground">Free Everyday Converters</span>
              </span>
            </Link>

            <div className="relative flex-1 max-w-md mx-auto" ref={boxRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search all tools... (Ctrl + K)"
                aria-label="Search all converters and calculators"
                role="combobox"
                aria-expanded={open && query.trim().length > 0}
                aria-controls="tool-search-results"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {open && query.trim().length > 0 && (
                <ul
                  id="tool-search-results"
                  role="listbox"
                  className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden z-50 max-h-80 overflow-y-auto"
                >
                  {results.length === 0 ? (
                    <li className="px-4 py-3 text-sm text-muted-foreground">
                      No tool matches “{query}”. Try “kg”, “inch”, “percent” or “base64”.
                    </li>
                  ) : (
                    results.map((r, i) => (
                      <li key={r.path} role="option" aria-selected={i === active}>
                        <button
                          onMouseEnter={() => setActive(i)}
                          onClick={() => go(r.path)}
                          className={`w-full text-left px-4 py-2.5 text-sm ${i === active ? "bg-muted" : ""}`}
                        >
                          {r.name}
                          <span className="text-muted-foreground text-xs ml-2">{r.category}</span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>


            <button
              className="md:hidden p-2 text-muted-foreground"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <MenuIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 pb-3">
            {menu.map((m) => (
              <Link
                key={m.path}
                to={m.path}
                className={`text-sm nav-link ${location.pathname === m.path ? "active" : ""}`}
              >
                {m.label}
              </Link>
            ))}
            <Link to="/blog" className={`text-sm nav-link ${location.pathname.startsWith("/blog") ? "active" : ""}`}>
              Blog
            </Link>
          </nav>

          {mobileOpen && (
            <nav className="md:hidden grid grid-cols-2 gap-2 pb-4">
              {[...menu, { label: "Blog", path: "/blog" }].map((m) => (
                <button
                  key={m.path}
                  onClick={() => go(m.path)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-muted text-foreground"
                >
                  {m.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-2">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-primary">Home</Link>
              {breadcrumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  {c.path ? (
                    <Link to={c.path} className="hover:text-primary">{c.label}</Link>
                  ) : (
                    <span className="text-foreground">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 md:py-10 flex-1">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  CH
                </span>
                <span className="font-bold">ConvertHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simple, fast and private converters for students &amp; creators. Every calculation runs in your
                browser — your data is never stored or saved.
              </p>
              <p className="privacy-badge mt-4">
                <Shield className="w-3.5 h-3.5" /> No data stored
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-3">Popular Converters</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/length-converter" className="hover:text-primary">Length Converter</Link></li>
                <li><Link to="/weight-converter" className="hover:text-primary">Weight Converter</Link></li>
                <li><Link to="/temperature-converter" className="hover:text-primary">Temperature Converter</Link></li>
                <li><Link to="/percentage-calculator" className="hover:text-primary">Percentage Calculator</Link></li>
                <li><Link to="/emi-calculator" className="hover:text-primary">EMI Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-3">Other Tools</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/word-counter" className="hover:text-primary">Word Counter</Link></li>
                <li><Link to="/image-compressor" className="hover:text-primary">Image Compressor</Link></li>
                <li><Link to="/media" className="hover:text-primary">Image Converter</Link></li>
                <li><Link to="/data-converter" className="hover:text-primary">Data Converter</Link></li>
                <li><Link to="/scientific-calculator" className="hover:text-primary">Scientific Calculator</Link></li>
                <li><Link to="/unit" className="hover:text-primary">Engineering Units</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-3">Company</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2026 ConvertHub by Quedroom. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
