import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DATASETS, STATS, CATEGORIES } from "@/data/mock-data";
import { formatNumber } from "@/lib/utils";
import {
  Database, ArrowRight, Shield, Zap, Lock, Eye,
  MessageSquare, Table, Mic, Map, TrendingUp, Layers,
  Stethoscope, BarChart3, CheckCircle2, ChevronRight, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Eye, MessageSquare, Table, Stethoscope, Mic, Map, TrendingUp, Layers,
};

const FEATURED = DATASETS.slice(0, 4);

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

export default function Home() {
  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Grid background */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -20%, hsl(186 85% 45% / 0.12), transparent), linear-gradient(hsl(220 16% 16% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(220 16% 16% / 0.4) 1px, transparent 1px)", backgroundSize: "auto, 60px 60px, 60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(186_85%_45%/0.06),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 md:px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2 mb-6 text-xs font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-4 py-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Decentralized · Privacy-Preserving · On-Chain
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.06]"
          >
            The Marketplace for
            <br />
            <span className="text-primary">AI Training Data</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Buy and sell high-quality, ethically sourced datasets as on-chain tokens.
            Train AI models on private data without it ever leaving the provider's environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
          >
            <Link href="/marketplace">
              <Button size="lg" className="h-12 px-8 font-semibold text-base gap-2 shadow-lg shadow-primary/20">
                <Database className="w-4 h-4" />
                Browse Datasets
              </Button>
            </Link>
            <Link href="/provider">
              <Button size="lg" variant="outline" className="h-12 px-8 font-semibold text-base gap-2 border-border/50 bg-transparent hover:bg-muted/30">
                Publish Your Data
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Datasets", value: STATS.totalDatasets.toLocaleString() },
              { label: "Providers", value: STATS.totalProviders.toLocaleString() },
              { label: "Volume", value: STATS.totalVolume },
              { label: "Transactions", value: formatNumber(STATS.totalTransactions) },
              { label: "Avg Quality", value: `${STATS.avgQualityScore}%` },
              { label: "Compute Jobs", value: formatNumber(STATS.computeJobsRun) },
            ].map((s, i) => (
              <div key={s.label} className="bg-card/50 border border-border/40 rounded-xl p-3">
                <p className="font-mono font-bold text-lg text-primary">{s.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Browse by Category</h2>
              <p className="text-sm text-muted-foreground mt-1">Find the right data for your AI project</p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground text-xs">
                All datasets <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon] ?? Database;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link href={`/marketplace?cat=${encodeURIComponent(cat.name)}`}>
                    <div className={cn("relative overflow-hidden rounded-xl border p-4 cursor-pointer group hover:border-primary/30 transition-all bg-gradient-to-br", cat.color, "border-border/40 hover:shadow-md hover:shadow-black/20")}>
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-card/60 border border-border/40 flex items-center justify-center group-hover:border-primary/20 transition-all">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold leading-tight">{cat.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{cat.count}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Datasets ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Datasets</h2>
              <p className="text-sm text-muted-foreground mt-1">Top-quality, verified data assets</p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground text-xs">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED.map((ds, i) => (
              <motion.div
                key={ds.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                <Link href={`/datasets/${ds.id}`}>
                  <div className="group bg-card border border-border/40 rounded-xl p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-black/20 transition-all cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[ds.category] ?? "text-muted-foreground bg-muted/30 border-border/40")}>
                        {ds.category}
                      </span>
                      {ds.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {ds.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {ds.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
                        <p className="font-mono text-sm font-bold text-primary">{ds.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Size</p>
                        <p className="font-mono text-xs">{ds.size}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              DataChain.ai uses blockchain technology and smart contracts to enable secure, transparent data exchange.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "For Data Providers",
                steps: [
                  { icon: Database, text: "Upload & describe your dataset with metadata" },
                  { icon: Cpu, text: "Tokenize as ERC-721 Data NFT on-chain" },
                  { icon: Zap, text: "Set pricing: one-time, subscription, or pay-per-access" },
                  { icon: BarChart3, text: "Receive automatic crypto payments and track earnings" },
                ],
                cta: "Start Publishing",
                href: "/provider",
              },
              {
                title: "For AI Developers",
                steps: [
                  { icon: Eye, text: "Discover datasets with advanced search & filters" },
                  { icon: Shield, text: "Preview samples and evaluate quality metrics" },
                  { icon: Lock, text: "Purchase access rights via smart contract" },
                  { icon: Cpu, text: "Train on data with Compute-to-Data (privacy preserved)" },
                ],
                cta: "Browse Datasets",
                href: "/marketplace",
              },
            ].map((side) => (
              <div key={side.title} className="bg-card border border-border/40 rounded-2xl p-6">
                <h3 className="font-bold text-base mb-5">{side.title}</h3>
                <div className="flex flex-col gap-4 mb-6">
                  {side.steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                          <p className="text-sm text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link href={side.href}>
                  <Button size="sm" className="gap-1.5 text-xs w-full">
                    {side.cta} <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Built for Security & Privacy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Lock, title: "Compute-to-Data", desc: "Train AI models on private datasets without data ever leaving the provider's secure environment.", color: "text-primary" },
              { icon: Shield, title: "Smart Contract Escrow", desc: "All transactions processed automatically through audited smart contracts on Polygon.", color: "text-violet-400" },
              { icon: Database, title: "Decentralized Storage", desc: "Datasets and metadata stored on IPFS with Filecoin pinning for resilience.", color: "text-emerald-400" },
              { icon: CheckCircle2, title: "Data Provenance", desc: "Immutable on-chain record of data origin, lineage, and all access history.", color: "text-amber-400" },
              { icon: Zap, title: "Instant Settlement", desc: "Sub-second payment settlement with automatic revenue splits and royalties.", color: "text-cyan-400" },
              { icon: Eye, title: "Quality Scoring", desc: "Community-driven quality metrics and verified annotations for every dataset.", color: "text-pink-400" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}>
                  <div className="bg-card border border-border/40 rounded-xl p-5 hover:border-border/70 transition-all">
                    <Icon className={cn("w-6 h-6 mb-3", f.color)} />
                    <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
