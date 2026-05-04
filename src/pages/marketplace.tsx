import { useState, useEffect } from "react";
import { useSearch, Link } from "wouter";
import { DATASETS, CATEGORIES, type DataCategory, type DataFormat, type License, type PricingModel } from "@/data/mock-data";
import { cn, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, X, CheckCircle2, Lock, Cpu,
  Database, LayoutGrid, List, ChevronDown, Star
} from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  "Computer Vision": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "NLP": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Tabular": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Medical Imaging": "text-red-400 bg-red-500/10 border-red-500/20",
  "Audio": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Geospatial": "text-teal-400 bg-teal-500/10 border-teal-500/20",
  "Time Series": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Multimodal": "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "quality", label: "Highest Quality" },
];

type SortKey = "popular" | "newest" | "price_asc" | "price_desc" | "quality";

export default function Marketplace() {
  const searchStr = useSearch();
  const urlParams = new URLSearchParams(searchStr);
  const urlQ = urlParams.get("q") ?? "";
  const urlCat = urlParams.get("cat") ?? "all";

  const [search, setSearch] = useState(urlQ);
  const [category, setCategory] = useState<string>(urlCat);
  const [sort, setSort] = useState<SortKey>("popular");
  const [pricing, setPricing] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [computeReady, setComputeReady] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => { setSearch(urlQ); }, [urlQ]);
  useEffect(() => { setCategory(urlCat); }, [urlCat]);

  const filtered = DATASETS.filter((ds) => {
    const matchSearch = !search.trim() ||
      ds.title.toLowerCase().includes(search.toLowerCase()) ||
      ds.description.toLowerCase().includes(search.toLowerCase()) ||
      ds.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "all" || ds.category === category;
    const matchPricing = pricing === "all" || ds.pricingModel === pricing;
    const matchVerified = !verifiedOnly || ds.isVerified;
    const matchCompute = !computeReady || ds.computeReady;
    return matchSearch && matchCat && matchPricing && matchVerified && matchCompute;
  }).sort((a, b) => {
    if (sort === "popular") return b.accessCount - a.accessCount;
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "quality") return b.qualityScore - a.qualityScore;
    if (sort === "price_asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sort === "price_desc") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  const hasFilters = search !== "" || category !== "all" || pricing !== "all" || verifiedOnly || computeReady;

  const clearAll = () => {
    setSearch(""); setCategory("all"); setPricing("all");
    setVerifiedOnly(false); setComputeReady(false);
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Marketplace</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            <span className="font-mono font-semibold text-foreground">{filtered.length}</span> datasets available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/30 rounded-lg p-0.5 border border-border/40">
            {(["grid", "list"] as const).map((m) => (
              <button key={m} onClick={() => setViewMode(m)}
                className={cn("p-1.5 rounded-md transition-all", viewMode === m ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {m === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 h-9 px-3 bg-muted/30 border border-border/40 rounded-xl text-sm hover:bg-muted/50 transition-all">
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="hidden sm:block">{SORT_OPTIONS.find((s) => s.value === sort)?.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-11 w-48 bg-popover border border-border/50 rounded-xl shadow-2xl p-1.5 z-20">
                {SORT_OPTIONS.map((s) => (
                  <button key={s.value} onClick={() => { setSort(s.value as SortKey); setSortOpen(false); }}
                    className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                      sort === s.value ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/40 text-muted-foreground hover:text-foreground")}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col gap-5 w-56 shrink-0">
          {/* Search */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Search</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input placeholder="Keywords, tags..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-muted/20 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" />
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Category</p>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => setCategory("all")}
                className={cn("text-left px-3 py-2 rounded-lg text-sm transition-all",
                  category === "all" ? "bg-muted/60 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                All Categories
              </button>
              {CATEGORIES.map((c) => (
                <button key={c.name} onClick={() => setCategory(c.name)}
                  className={cn("flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                    category === c.name ? "bg-muted/60 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                  <span className="truncate">{c.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/60 ml-1">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pricing Model</p>
            <div className="flex flex-col gap-0.5">
              {[{ v: "all", l: "All Models" }, { v: "One-time", l: "One-time Purchase" }, { v: "Subscription", l: "Subscription" }, { v: "Pay-per-access", l: "Pay-per-access" }].map((p) => (
                <button key={p.v} onClick={() => setPricing(p.v)}
                  className={cn("text-left px-3 py-2 rounded-lg text-sm transition-all",
                    pricing === p.v ? "bg-muted/60 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                  {p.l}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Filters</p>
            <div className="flex flex-col gap-2">
              {[
                { val: verifiedOnly, set: setVerifiedOnly, label: "Verified Only", icon: CheckCircle2 },
                { val: computeReady, set: setComputeReady, label: "Compute-to-Data", icon: Cpu },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <button key={f.label} onClick={() => f.set(!f.val)}
                    className={cn("flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all border",
                      f.val ? "bg-primary/10 text-primary border-primary/20 font-medium" : "text-muted-foreground border-transparent hover:bg-muted/30 hover:text-foreground")}>
                    <Icon className="w-3.5 h-3.5" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {hasFilters && (
            <Button variant="outline" size="sm" onClick={clearAll} className="gap-1.5 text-xs border-border/40">
              <X className="w-3 h-3" /> Clear all
            </Button>
          )}
        </aside>

        {/* ── Grid ── */}
        <div className="flex-1 min-w-0">
          {/* Mobile search */}
          <div className="flex gap-2 mb-4 lg:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
              <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-muted/20 border border-border/40 rounded-xl text-sm focus:outline-none" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border/40 rounded-xl bg-muted/5">
              <Database className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No datasets match your filters.</p>
              <Button variant="outline" size="sm" onClick={clearAll}>Clear filters</Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={viewMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className={cn("grid gap-4", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {filtered.map((ds, i) => (
                  <motion.div key={ds.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}>
                    <Link href={`/datasets/${ds.id}`}>
                      <div className={cn(
                        "group bg-card border border-border/40 rounded-xl hover:border-primary/30 hover:shadow-xl hover:shadow-black/20 transition-all cursor-pointer",
                        viewMode === "grid" ? "p-5 flex flex-col h-full" : "p-4 flex items-center gap-4"
                      )}>
                        {viewMode === "grid" ? (
                          <>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[ds.category] ?? "text-muted-foreground bg-muted/30 border-border/40")}>
                                {ds.category}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {ds.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                                {ds.computeReady && <Cpu className="w-3.5 h-3.5 text-violet-400" />}
                                {ds.isPrivate && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                              </div>
                            </div>
                            <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{ds.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">{ds.description}</p>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {[{ l: "Size", v: ds.size }, { l: "Rows", v: ds.rows }, { l: "Quality", v: `${ds.qualityScore}%` }].map((s) => (
                                <div key={s.l} className="bg-muted/20 rounded-lg px-2 py-1.5 text-center">
                                  <p className="font-mono text-xs font-semibold">{s.v}</p>
                                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{s.l}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-border/30">
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
                                <p className="font-mono text-sm font-bold text-primary">{ds.price}</p>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="font-medium">{ds.rating}</span>
                                <span>({ds.reviews})</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-center shrink-0">
                              <Database className="w-5 h-5 text-muted-foreground/50" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">{ds.title}</h3>
                                {ds.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                                {ds.computeReady && <Cpu className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[ds.category] ?? "text-muted-foreground bg-muted/30 border-border/40")}>{ds.category}</span>
                                <span className="text-[10px] text-muted-foreground">{ds.size}</span>
                                <span className="text-[10px] text-muted-foreground">·</span>
                                <span className="text-[10px] text-muted-foreground">{ds.rows}</span>
                              </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-6 shrink-0">
                              <div className="text-right">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Quality</p>
                                <p className="font-mono text-sm font-semibold">{ds.qualityScore}%</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
                                <p className="font-mono text-sm font-bold text-primary">{ds.price}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
