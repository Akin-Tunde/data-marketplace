import { useState } from "react";
import { Link } from "wouter";
import { MY_PURCHASES, MY_COMPUTE_JOBS } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ShoppingBag, Cpu, Database, Clock, CheckCircle2, AlertCircle,
  Play, XCircle, ArrowRight, Zap, BarChart3, ExternalLink
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

const STATUS_CONFIG = {
  queued: { color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: Clock, label: "Queued" },
  running: { color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Play, label: "Running" },
  completed: { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2, label: "Completed" },
  failed: { color: "text-red-400 bg-red-500/10 border-red-500/20", icon: XCircle, label: "Failed" },
};

export default function ConsumerDashboard() {
  const [activeTab, setActiveTab] = useState<"datasets" | "compute">("datasets");

  const STATS = [
    { label: "Purchased Datasets", value: MY_PURCHASES.length.toString(), icon: Database, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Spent", value: "13.1 ETH", icon: ShoppingBag, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Compute Jobs", value: MY_COMPUTE_JOBS.length.toString(), icon: Cpu, color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Models Trained", value: "1", icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Data</h1>
          <p className="text-sm text-muted-foreground mt-1">Your purchased datasets and compute jobs</p>
        </div>
        <Link href="/marketplace">
          <Button className="gap-2 font-semibold self-start">
            <Database className="w-4 h-4" /> Browse More Datasets
          </Button>
        </Link>
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
          {(["datasets", "compute"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("px-4 py-2.5 text-sm font-medium capitalize transition-all relative",
                activeTab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t === "compute" ? "Compute Jobs" : "Purchased Datasets"}
              {activeTab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "datasets" && (
        <div className="flex flex-col gap-4">
          {MY_PURCHASES.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}>
              <div className="bg-card border border-border/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-muted-foreground/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link href={`/datasets/${p.datasetId}`}>
                      <h3 className="font-semibold text-sm hover:text-primary transition-colors cursor-pointer">{p.datasetTitle}</h3>
                    </Link>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[p.category] ?? "text-muted-foreground bg-muted/30 border-border/40")}>
                      {p.category}
                    </span>
                    <span className="text-xs text-muted-foreground">Purchased {p.purchasedAt}</span>
                    {p.expiresAt && (
                      <span className="text-xs text-amber-400/80">· Expires {p.expiresAt}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground/60">{p.txHash}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/40" />
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-primary">{p.price}</p>
                    <p className="text-[10px] text-muted-foreground">{p.accessType}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Button size="sm" className="h-8 text-xs gap-1.5 font-medium">
                      <Database className="w-3 h-3" /> Access
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 border-border/40">
                      <Cpu className="w-3 h-3" /> Compute
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="flex items-center justify-center gap-2 p-6 border border-dashed border-border/40 rounded-xl">
            <p className="text-sm text-muted-foreground">Looking for more data?</p>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                Browse marketplace <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {activeTab === "compute" && (
        <div className="flex flex-col gap-4">
          {MY_COMPUTE_JOBS.map((job, i) => {
            const cfg = STATUS_CONFIG[job.status];
            const Icon = cfg.icon;
            return (
              <motion.div key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}>
                <div className="bg-card border border-border/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border", cfg.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{job.modelType}</h3>
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", cfg.color)}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{job.datasetTitle}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Started {job.startedAt}</span>
                      {job.duration && <span>· Duration: {job.duration}</span>}
                    </div>
                    {job.status === "running" && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-blue-400 rounded-full"
                            initial={{ width: "30%" }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 3, ease: "easeInOut" }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">Processing... ~2h remaining</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold">{job.cost}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cost</p>
                    </div>
                    {job.status === "completed" && (
                      <Button size="sm" className="h-8 text-xs gap-1.5">
                        <BarChart3 className="w-3 h-3" /> Results
                      </Button>
                    )}
                    {job.status === "running" && (
                      <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 border-border/40 text-muted-foreground">
                        <Clock className="w-3 h-3" /> View Logs
                      </Button>
                    )}
                    {job.status === "queued" && (
                      <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 border-border/40 text-muted-foreground">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="flex items-center gap-3 p-5 bg-primary/5 border border-primary/15 rounded-xl">
            <Zap className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-semibold">Run a Compute-to-Data Job</p>
              <p className="text-xs text-muted-foreground mt-0.5">Train your AI models on private datasets without data leaving the provider's environment.</p>
            </div>
            <Link href="/marketplace" className="ml-auto shrink-0">
              <Button size="sm" className="gap-1.5 text-xs">Find datasets <ArrowRight className="w-3 h-3" /></Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
