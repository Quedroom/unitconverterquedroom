import { Link, useLocation } from "react-router-dom";
import { Shield, ArrowLeft, Zap, Lock, Eye } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
}

const Layout = ({ children, showBack = false, title }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isHome ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/unit" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/unit' || location.pathname === '/engineering' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Units
            </Link>
            <Link 
              to="/data" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/data' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Data
            </Link>
            <Link 
              to="/media" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/media' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Media
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBack && (
                <Link
                  to="/"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              )}
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">
                    {title || "ConvertHub"}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Privacy-first conversions
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="privacy-badge animate-pulse-glow">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Zero Data Stored</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Privacy Banner - Show on all pages */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="feature-pill">
              <Lock className="w-4 h-4 text-primary" />
              <span>No data stored</span>
            </div>
            <div className="feature-pill">
              <Zap className="w-4 h-4 text-primary" />
              <span>Instant results</span>
            </div>
            <div className="feature-pill">
              <Eye className="w-4 h-4 text-primary" />
              <span>No tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              <Shield className="w-4 h-4 inline mr-1 text-primary" />
              Your data is never stored or saved. All conversions happen in your browser.
            </p>
            <nav className="flex items-center gap-6">
              <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Home</Link>
              <Link to="/unit" className={`nav-link ${location.pathname === '/unit' || location.pathname === '/engineering' ? 'active' : ''}`}>Units</Link>
              <Link to="/data" className={`nav-link ${location.pathname === '/data' ? 'active' : ''}`}>Data</Link>
              <Link to="/media" className={`nav-link ${location.pathname === '/media' ? 'active' : ''}`}>Media</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
