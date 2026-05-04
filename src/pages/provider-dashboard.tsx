import { useState } from "react";
import { Link } from "wouter";
import { MY_DATASETS, MY_PROVIDER, DATASETS } from "@/data/mock-data";
import { cn, truncateAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Upload, Database, TrendingUp, DollarSign, Users, Plus,
  CheckCircle2, Eye, Settings, BarChart3, AlertCircle,
  ArrowUpRight, Clock, Zap
} from "lucide-react";

const MY_LISTED = DATASETS.filter((d) => d.provider.id === "p1").slice(0, 3);

const EARNINGS_DATA = [
  { month: "Aug", eth: 0.8 },
  { month: "Sep", eth: 1.2 },
  { month: "Oct", eth: 0.9 },
  { month: "Nov", eth: 2.1 },
  { month: "Dec", eth: 1.4 },
];

const MAX_ETH = Math.max(...EARNINGS_DATA.map((d) => d.eth));

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState<"datasets" | "earnings" | "publish">("datasets");
  const [publishStep, setPublishStep] = useState(1);
  const [formData, setFormData] = useState({ title: "", category: "", description: "", pricing: "One-time", price: "", format: "", license: "CC-BY" });

  const STATS = [
    { label: "Published Datasets", value: "3", icon: Database, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Sales", value: "28", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Total Earnings", value: "5.4 ETH", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Avg Quality Score", value: "91%", icon: BarChart3, color: "text-violet-400", bg: "bg-violet-500/10" },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your datasets and track earnings</p>
        </div>
        <Button className="gap-2 font-semibold shadow-md shadow-primary/20 self-start" onClick={() => setActiveTab("publish")}>
          <Plus className="w-4 h-4" /> Publish New Dataset
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}>
              <div className="bg-card border border-border/40 rounded-xl p-4">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", s.bg)}>
                  <Icon className={cn("w-4 h-4", s.color)} />
                </div>
                <p className={cn("font-mono text-2xl font-bold", s.color)}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-border/40 mb-6">
        <div className="flex gap-0.5">
          {(["datasets", "earnings", "publish"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("px-4 py-2.5 text-sm font-medium capitalize transition-all relative",
                activeTab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t === "publish" ? "Publish Data" : t.charAt(0).toUpperCase() + t.slice(1)}
              {activeTab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "datasets" && (
        <div className="flex flex-col gap-4">
          {MY_LISTED.map((ds, i) => (
            <motion.div key={ds.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}>
              <div className="bg-card border border-border/40 rounded-xl p-5 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/datasets/${ds.id}`}>
                      <h3 className="font-semibold text-sm hover:text-primary transition-colors cursor-pointer">{ds.title}</h3>
                    </Link>
                    {ds.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{ds.size}</span>
                    <span>·</span>
                    <span>{ds.category}</span>
                    <span>·</span>
                    <span>{ds.license}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {ds.updatedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold">{ds.accessCount}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold text-primary">{ds.price}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Price</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold">{ds.qualityScore}%</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Quality</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/30 hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/30 hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <button onClick={() => setActiveTab("publish")}
            className="flex items-center justify-center gap-2 border-2 border-dashed border-border/40 rounded-xl p-6 text-sm text-muted-foreground hover:text-foreground hover:border-border/70 transition-all">
            <Plus className="w-4 h-4" /> Add a new dataset
          </button>
        </div>
      )}

      {activeTab === "earnings" && (
        <div className="flex flex-col gap-6">
          {/* Earnings chart */}
          <div className="bg-card border border-border/40 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Monthly Earnings</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 5 months</p>
              </div>
              <span className="font-mono text-xl font-bold text-primary">5.4 ETH</span>
            </div>
            <div className="flex items-end gap-3 h-32">
              {EARNINGS_DATA.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-primary">{d.eth}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.eth / MAX_ETH) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-primary/20 border border-primary/30 rounded-t-md relative overflow-hidden"
                    style={{ minHeight: 4 }}>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/10" />
                  </motion.div>
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border/40">
              <h3 className="font-semibold text-sm">Recent Transactions</h3>
            </div>
            <div className="divide-y divide-border/30">
              {[
                { dataset: "ImageNet-Scale Scene Understanding", buyer: "0x7f8a...5f6a", amount: "4.5 ETH", date: "Dec 14, 2024" },
                { dataset: "E-Commerce Behavioral Signals", buyer: "0x9b8c...1b0c", amount: "3.2 ETH", date: "Dec 10, 2024" },
                { dataset: "Financial Transaction Anomaly", buyer: "0x2c3d...0c1d", amount: "1.5 ETH", date: "Dec 08, 2024" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/10 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.dataset}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">Buyer: {tx.buyer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-bold text-emerald-400">+{tx.amount}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "publish" && (
        <div className="max-w-2xl">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                  publishStep >= step ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border/40")}>
                  {publishStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                </div>
                <span className={cn("text-sm hidden sm:block", publishStep >= step ? "text-foreground font-medium" : "text-muted-foreground")}>
                  {step === 1 ? "Dataset Info" : step === 2 ? "Pricing & Access" : "Review & Tokenize"}
                </span>
                {step < 3 && <div className={cn("h-0.5 w-8 rounded-full mx-1", publishStep > step ? "bg-primary" : "bg-border/40")} />}
              </div>
            ))}
          </div>

          {publishStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Dataset Title *</label>
                <input placeholder="e.g., Large-Scale Face Recognition Dataset" value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-10 px-3 bg-muted/20 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 bg-muted/20 border border-border/40 rounded-xl text-sm focus:outline-none appearance-none">
                  <option value="">Select category...</option>
                  {["Computer Vision", "NLP", "Tabular", "Medical Imaging", "Audio", "Geospatial", "Time Series", "Multimodal"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Description *</label>
                <textarea placeholder="Describe your dataset: content, collection method, annotations, use cases..." value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4} className="w-full px-3 py-2.5 bg-muted/20 border border-border/40 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" />
              </div>
              <div className="border-2 border-dashed border-border/40 rounded-xl p-8 text-center hover:border-border/70 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Upload dataset files or provide IPFS CID</p>
                <p className="text-xs text-muted-foreground/60">Supports CSV, Parquet, JSON, Images, Audio, HDF5 · Max 50 TB</p>
              </div>
              <Button className="w-full font-semibold gap-2" onClick={() => setPublishStep(2)}>
                Continue <ArrowUpRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {publishStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Pricing Model *</label>
                <div className="grid grid-cols-3 gap-3">
                  {["One-time", "Subscription", "Pay-per-access"].map((p) => (
                    <button key={p} onClick={() => setFormData({ ...formData, pricing: p })}
                      className={cn("px-3 py-3 rounded-xl border text-sm font-medium transition-all text-center",
                        formData.pricing === p ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/20 border-border/40 text-muted-foreground hover:border-border/70")}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Price (ETH) *</label>
                <div className="relative">
                  <input type="number" placeholder="0.00" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-10 pl-3 pr-16 bg-muted/20 border border-border/40 rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                    {formData.pricing === "Subscription" ? "ETH/mo" : formData.pricing === "Pay-per-access" ? "ETH/1K" : "ETH"}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">License *</label>
                <select value={formData.license} onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  className="w-full h-10 px-3 bg-muted/20 border border-border/40 rounded-xl text-sm focus:outline-none appearance-none">
                  {["CC0", "CC-BY", "Commercial", "Research Only"].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">A <strong className="text-foreground">2.5% platform fee</strong> is deducted on each sale. Payments are settled instantly via smart contract on Polygon.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-border/40" onClick={() => setPublishStep(1)}>Back</Button>
                <Button className="flex-1 font-semibold" onClick={() => setPublishStep(3)}>Continue</Button>
              </div>
            </motion.div>
          )}

          {publishStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
              <div className="bg-card border border-border/40 rounded-xl p-5">
                <h3 className="font-semibold text-sm mb-4">Review Details</h3>
                <div className="flex flex-col gap-3 text-sm">
                  {[
                    { l: "Title", v: formData.title || "—" },
                    { l: "Category", v: formData.category || "—" },
                    { l: "Pricing", v: formData.pricing },
                    { l: "Price", v: formData.price ? `${formData.price} ETH` : "—" },
                    { l: "License", v: formData.license },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{r.l}</span>
                      <span className="font-medium">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-violet-500/5 border border-violet-500/15 rounded-xl">
                <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">Tokenizing mints an <strong className="text-foreground">ERC-721 Data NFT</strong> on Polygon representing ownership and access rights to this dataset. Gas fee: ~0.001 ETH.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-border/40" onClick={() => setPublishStep(2)}>Back</Button>
                <Button className="flex-1 font-semibold gap-2 shadow-md shadow-primary/20" onClick={() => { setPublishStep(1); setActiveTab("datasets"); }}>
                  <Zap className="w-4 h-4" /> Tokenize & Publish
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
