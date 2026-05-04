import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Database, Search, X, LayoutDashboard, ShoppingBag, Upload,
  ChevronDown, Wallet, Menu, Bell, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WALLETS = [
  { label: "Provider Wallet", address: "0x3c4d5e6f...1c2d", balance: "12.4 ETH" },
  { label: "Consumer Wallet", address: "0x7a8b9c0d...5e6f", balance: "8.1 ETH" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [walletOpen, setWalletOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(WALLETS[0]);
  const searchRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { href: "/marketplace", label: "Marketplace", icon: Database },
    { href: "/provider", label: "Publish Data", icon: Upload },
    { href: "/consumer", label: "My Data", icon: ShoppingBag },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group mr-1">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Cpu className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base tracking-tight text-foreground">DataChain</span>
              <span className="text-primary text-xs font-mono ml-1 opacity-70">.ai</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || location.startsWith(`${item.href}/`);
              return (
                <Link key={item.href} href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all relative",
                    isActive
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}>
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search datasets, providers..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-9 pl-9 pr-10 bg-muted/20 border border-border/40 rounded-xl text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/30 font-mono hidden lg:block">⌘K</kbd>
            </div>
          </form>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Notifications */}
            <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>

            {/* Wallet */}
            {connected ? (
              <div className="relative">
                <button
                  onClick={() => setWalletOpen(!walletOpen)}
                  className="flex items-center gap-2 h-9 px-3 bg-muted/30 border border-border/40 rounded-xl text-sm hover:bg-muted/50 transition-all"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="font-mono text-xs hidden sm:block">{selectedWallet.address}</span>
                  <span className="text-xs font-semibold text-primary hidden md:block">{selectedWallet.balance}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                {walletOpen && (
                  <div className="absolute right-0 top-11 w-64 bg-popover border border-border/50 rounded-xl shadow-2xl p-2 z-50">
                    {WALLETS.map((w) => (
                      <button key={w.address} onClick={() => { setSelectedWallet(w); setWalletOpen(false); }}
                        className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-muted/40 transition-all",
                          selectedWallet.address === w.address && "bg-muted/40")}>
                        <div className="text-left">
                          <p className="font-medium text-xs">{w.label}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">{w.address}</p>
                        </div>
                        <span className="font-mono text-xs font-semibold text-primary">{w.balance}</span>
                      </button>
                    ))}
                    <div className="border-t border-border/40 mt-1 pt-1">
                      <button onClick={() => { setConnected(false); setWalletOpen(false); }}
                        className="w-full px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:bg-muted/30 rounded-lg transition-all text-left">
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button size="sm" className="h-9 px-4 gap-2 text-xs font-semibold shadow-md shadow-primary/20" onClick={() => setConnected(true)}>
                <Wallet className="w-3.5 h-3.5" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile menu */}
            <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 px-4 py-3 bg-background/95 flex flex-col gap-1">
            <form onSubmit={handleSearch} className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search datasets..." value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-muted/30 border border-border/40 rounded-xl text-sm focus:outline-none" />
            </form>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                  className={cn("flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium",
                    isActive ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                  <Icon className="w-4 h-4" />{item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-16 bg-card/20">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="font-bold text-base">DataChain<span className="text-primary">.ai</span></span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The decentralized marketplace for high-quality AI training data. Secure, transparent, privacy-preserving.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Polygon Mainnet</span>
              </div>
            </div>
            {[
              { title: "Marketplace", links: [{ href: "/marketplace", label: "Browse Datasets" }, { href: "/marketplace?cat=Computer+Vision", label: "Computer Vision" }, { href: "/marketplace?cat=NLP", label: "Natural Language" }, { href: "/marketplace?cat=Medical+Imaging", label: "Medical" }] },
              { title: "Providers", links: [{ href: "/provider", label: "Publish Data" }, { href: "/provider", label: "Dashboard" }, { href: "/provider", label: "Pricing Models" }, { href: "/provider", label: "API Access" }] },
              { title: "Resources", links: [{ href: "/", label: "Documentation" }, { href: "/", label: "Smart Contracts" }, { href: "/", label: "Compute-to-Data" }, { href: "/", label: "Blog" }] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{col.title}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} DataChain.ai · Built on Polygon</p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms", "Smart Contracts"].map((l) => (
                <span key={l} className="text-xs text-muted-foreground/40 cursor-not-allowed">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
