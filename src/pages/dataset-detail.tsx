import { useParams, Link } from "wouter";
import { DATASETS } from "@/data/mock-data";
import { cn, truncateAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CheckCircle2, Lock, Cpu, Star, ArrowLeft, Database,
  FileText, Globe, Tag, BarChart3, Users, Clock, ShoppingCart,
  Shield, ExternalLink, Copy, AlertCircle, Zap
} from "lucide-react";
import { useState } from "react";

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

export default function DatasetDetail() {
  const { id } = useParams<{ id: string }>();
  const ds = DATASETS.find((d) => d.id === id);
  const [purchased, setPurchased] = useState(false);
  const [computeModalOpen, setComputeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "samples" | "provenance">("overview");

  if (!ds) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-24 text-center">
        <Database className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Dataset Not Found</h2>
        <p className="text-muted-foreground mb-6">The dataset you're looking for doesn't exist.</p>
        <Link href="/marketplace"><Button size="sm">Back to Marketplace</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link href="/marketplace" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Marketplace
        </Link>
        <span>/</span>
        <span className={cn("px-2 py-0.5 rounded-full border text-[10px] font-semibold", CATEGORY_COLORS[ds.category] ?? "")}>{ds.category}</span>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{ds.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Column ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Title block */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-start gap-3 flex-wrap mb-3">
              <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", CATEGORY_COLORS[ds.category] ?? "")}>{ds.category}</span>
              {ds.isVerified && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border text-primary bg-primary/8 border-primary/20">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              )}
              {ds.isPrivate && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border text-amber-400 bg-amber-500/8 border-amber-500/20">
                  <Lock className="w-3 h-3" /> Private — Compute Only
                </span>
              )}
              {ds.computeReady && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border text-violet-400 bg-violet-500/8 border-violet-500/20">
                  <Cpu className="w-3 h-3" /> Compute-to-Data
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{ds.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <img src={ds.provider.avatar} alt={ds.provider.name} className="w-5 h-5 rounded-full" />
                <span>by <span className="text-foreground font-medium">{ds.provider.name}</span></span>
                {ds.provider.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{ds.rating}</span>
                <span>({ds.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{ds.accessCount} purchasers</span>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-border/40">
            <div className="flex gap-0.5">
              {(["overview", "samples", "provenance"] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={cn("px-4 py-2.5 text-sm font-medium capitalize transition-all relative",
                    activeTab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {t}
                  {activeTab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-semibold text-sm mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ds.longDescription}</p>
              </div>
              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Size", value: ds.size, icon: Database },
                  { label: "Records", value: ds.rows, icon: FileText },
                  { label: "Formats", value: ds.format.join(", "), icon: Globe },
                  { label: "License", value: ds.license, icon: Shield },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-muted/20 border border-border/40 rounded-xl p-3">
                      <Icon className="w-4 h-4 text-muted-foreground mb-2" />
                      <p className="font-mono text-xs font-semibold">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                  );
                })}
              </div>
              {/* Quality bar */}
              <div className="bg-muted/20 border border-border/40 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Quality Score</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-primary">{ds.qualityScore}/100</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${ds.qualityScore}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Verified by DataChain.ai quality assessment protocol</p>
              </div>
              {/* Tags */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {ds.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-muted/30 border border-border/40 rounded-full text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" />{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "samples" && (
            <div className="flex flex-col gap-4">
              <div className="bg-muted/10 border border-border/40 rounded-xl p-5 text-center">
                <Database className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Sample Preview</p>
                <p className="text-xs text-muted-foreground mb-4">Purchase access to view full dataset samples and schema documentation.</p>
                <div className="font-mono text-xs bg-background/50 border border-border/40 rounded-lg p-4 text-left text-muted-foreground overflow-x-auto">
                  <pre>{`{
  "dataset_id": "${ds.id}",
  "total_records": ${ds.samples.toLocaleString()},
  "format": ${JSON.stringify(ds.format)},
  "sample_available": false,
  "preview": "Purchase required",
  "compute_to_data": ${ds.computeReady}
}`}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "provenance" && (
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
                {[
                  { event: "Dataset Published", date: ds.createdAt, hash: ds.tokenId, type: "publish" },
                  { event: "Quality Verified", date: ds.updatedAt, hash: "0xf1e2d3c4...", type: "verify" },
                  { event: "Last Updated", date: ds.updatedAt, hash: "0xa5b6c7d8...", type: "update" },
                ].map((p, i) => (
                  <div key={i} className={cn("flex items-center gap-4 px-5 py-4", i < 2 && "border-b border-border/30")}>
                    <div className={cn("w-2 h-2 rounded-full shrink-0", p.type === "publish" ? "bg-primary" : p.type === "verify" ? "bg-emerald-400" : "bg-blue-400")} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.event}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[10px] text-muted-foreground">{p.hash}</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary">On-chain provenance</p>
                  <p className="text-xs text-muted-foreground mt-0.5">All dataset events are permanently recorded on Polygon. Token ID: <span className="font-mono">{ds.tokenId}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Purchase Panel ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="bg-card border border-border/40 rounded-2xl p-5">
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{ds.pricingModel}</p>
                <p className="text-3xl font-bold font-mono text-primary">{ds.price}</p>
                <p className="text-xs text-muted-foreground mt-1">{ds.priceUsd} USD equivalent</p>
              </div>

              {purchased ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-sm text-emerald-400 font-medium">Access Granted</p>
                  </div>
                  <Button className="w-full gap-2" size="sm">
                    <Database className="w-3.5 h-3.5" /> Access Dataset
                  </Button>
                  {ds.computeReady && (
                    <Button variant="outline" className="w-full gap-2 border-border/40 text-sm" size="sm" onClick={() => setComputeModalOpen(true)}>
                      <Cpu className="w-3.5 h-3.5" /> Run Compute Job
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button className="w-full gap-2 h-11 font-semibold shadow-md shadow-primary/20" onClick={() => setPurchased(true)}>
                    <ShoppingCart className="w-4 h-4" /> Purchase Access
                  </Button>
                  {ds.computeReady && (
                    <Button variant="outline" className="w-full gap-2 border-border/40" size="sm">
                      <Cpu className="w-3.5 h-3.5" /> Try Compute-to-Data
                    </Button>
                  )}
                </div>
              )}

              <div className="border-t border-border/40 mt-4 pt-4 flex flex-col gap-3">
                {[
                  { icon: Shield, text: "Smart contract escrow" },
                  { icon: CheckCircle2, text: "Verified data quality" },
                  { icon: Zap, text: "Instant access on payment" },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                      {f.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Provider card */}
            <div className="bg-card border border-border/40 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Provider</p>
              <div className="flex items-center gap-3 mb-3">
                <img src={ds.provider.avatar} alt={ds.provider.name} className="w-9 h-9 rounded-xl border border-border/40" />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm">{ds.provider.name}</p>
                    {ds.provider.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground">{truncateAddress(ds.provider.address)}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "Datasets", v: ds.provider.totalDatasets },
                  { l: "Sales", v: ds.provider.totalSales },
                  { l: "Rating", v: ds.provider.rating },
                ].map((s) => (
                  <div key={s.l} className="bg-muted/20 rounded-lg py-2">
                    <p className="font-mono text-xs font-bold">{s.v}</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Token ID */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border border-border/40 rounded-xl">
              <Database className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="font-mono text-[10px] text-muted-foreground flex-1 truncate">{ds.tokenId}</p>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compute modal */}
      {computeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setComputeModalOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
            className="bg-popover border border-border/50 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg flex items-center gap-2"><Cpu className="w-5 h-5 text-primary" /> Compute-to-Data</h2>
              <button onClick={() => setComputeModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/15 rounded-xl mb-4">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">Your model trains on this private dataset <strong className="text-foreground">without the data ever leaving</strong> the provider's secure environment.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Model Type</label>
                <select className="w-full h-9 px-3 bg-muted/20 border border-border/40 rounded-xl text-sm focus:outline-none">
                  <option>Custom Python Script</option>
                  <option>Pre-built: ResNet Classifier</option>
                  <option>Pre-built: LLM Fine-tune</option>
                  <option>Pre-built: XGBoost Tabular</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Compute Budget</label>
                <input type="number" placeholder="0.10" className="w-full h-9 px-3 bg-muted/20 border border-border/40 rounded-xl text-sm font-mono focus:outline-none" />
                <p className="text-[10px] text-muted-foreground mt-1">ETH · Estimated: ~2-4 hours compute</p>
              </div>
              <Button className="w-full gap-2 mt-2 font-semibold" onClick={() => { setComputeModalOpen(false); }}>
                <Zap className="w-3.5 h-3.5" /> Submit Compute Job
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Inline X icon for modal close
function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
