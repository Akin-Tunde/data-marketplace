export type DataCategory =
  | "Computer Vision"
  | "NLP"
  | "Audio"
  | "Tabular"
  | "Medical Imaging"
  | "Multimodal"
  | "Time Series"
  | "Geospatial";

export type DataFormat = "CSV" | "JSON" | "Parquet" | "Images" | "Audio" | "Video" | "HDF5";
export type License = "CC0" | "CC-BY" | "Commercial" | "Research Only";
export type PricingModel = "One-time" | "Subscription" | "Pay-per-access";

export interface Provider {
  id: string;
  address: string;
  name: string;
  avatar: string;
  verified: boolean;
  totalDatasets: number;
  totalSales: number;
  totalEarnings: string;
  rating: number;
  joinedAt: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: DataCategory;
  format: DataFormat[];
  license: License;
  pricingModel: PricingModel;
  price: string;
  priceUsd: string;
  size: string;
  rows: string;
  samples: number;
  provider: Provider;
  tags: string[];
  qualityScore: number;
  accessCount: number;
  rating: number;
  reviews: number;
  isVerified: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  sampleImages?: string[];
  computeReady: boolean;
  tokenId: string;
}

export interface ComputeJob {
  id: string;
  datasetId: string;
  datasetTitle: string;
  status: "queued" | "running" | "completed" | "failed";
  modelType: string;
  startedAt: string;
  completedAt?: string;
  duration?: string;
  cost: string;
}

export interface Purchase {
  id: string;
  datasetId: string;
  datasetTitle: string;
  category: DataCategory;
  price: string;
  purchasedAt: string;
  accessType: PricingModel;
  txHash: string;
  expiresAt?: string;
}

const PROVIDERS: Provider[] = [
  {
    id: "p1",
    address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    name: "DeepData Labs",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=deepdata&backgroundColor=00bcd4",
    verified: true,
    totalDatasets: 14,
    totalSales: 312,
    totalEarnings: "48.6 ETH",
    rating: 4.9,
    joinedAt: "2024-01-15",
  },
  {
    id: "p2",
    address: "0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c",
    name: "NeuralForge",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=neural&backgroundColor=7c3aed",
    verified: true,
    totalDatasets: 9,
    totalSales: 178,
    totalEarnings: "31.2 ETH",
    rating: 4.7,
    joinedAt: "2024-02-20",
  },
  {
    id: "p3",
    address: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
    name: "BioML Research",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=bioml&backgroundColor=10b981",
    verified: true,
    totalDatasets: 6,
    totalSales: 89,
    totalEarnings: "22.4 ETH",
    rating: 4.8,
    joinedAt: "2024-03-10",
  },
  {
    id: "p4",
    address: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    name: "SoundWave AI",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=soundwave&backgroundColor=f59e0b",
    verified: false,
    totalDatasets: 4,
    totalSales: 56,
    totalEarnings: "8.9 ETH",
    rating: 4.5,
    joinedAt: "2024-04-05",
  },
  {
    id: "p5",
    address: "0x7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a",
    name: "GeoVision Systems",
    avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=geovision&backgroundColor=ef4444",
    verified: true,
    totalDatasets: 7,
    totalSales: 203,
    totalEarnings: "36.1 ETH",
    rating: 4.6,
    joinedAt: "2023-12-01",
  },
];

export const DATASETS: Dataset[] = [
  {
    id: "ds001",
    title: "ImageNet-Scale Scene Understanding",
    description: "1.2M labeled images across 1,000 scene categories with bounding boxes, semantic segmentation masks, and depth maps.",
    longDescription: "A comprehensive computer vision dataset featuring 1.2 million high-resolution images annotated with scene categories, object bounding boxes, semantic segmentation masks, and monocular depth estimation labels. Suitable for training scene understanding, object detection, and depth estimation models. Collected from diverse global sources with rigorous quality control and privacy filtering.",
    category: "Computer Vision",
    format: ["Images", "JSON"],
    license: "Commercial",
    pricingModel: "One-time",
    price: "4.5 ETH",
    priceUsd: "$14,400",
    size: "380 GB",
    rows: "1.2M images",
    samples: 1200000,
    provider: PROVIDERS[0],
    tags: ["scene understanding", "segmentation", "depth", "object detection", "ImageNet"],
    qualityScore: 97,
    accessCount: 184,
    rating: 4.9,
    reviews: 42,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-03-01",
    updatedAt: "2024-11-15",
    computeReady: true,
    tokenId: "DT-0x8a2b3c4d",
  },
  {
    id: "ds002",
    title: "Multilingual Legal Text Corpus",
    description: "42M legal documents in 28 languages sourced from court filings, contracts, regulations, and legislation.",
    longDescription: "A massive multilingual corpus of legal texts spanning 28 languages and covering 15 jurisdictions worldwide. Includes court opinions, contracts, statutes, regulations, and legal briefs. Pre-processed with sentence tokenization, entity recognition labels, and cross-lingual alignment annotations. Ideal for training legal LLMs, contract analysis systems, and cross-jurisdictional legal research tools.",
    category: "NLP",
    format: ["JSON", "Parquet"],
    license: "Research Only",
    pricingModel: "Subscription",
    price: "2.1 ETH/mo",
    priceUsd: "$6,720/mo",
    size: "1.8 TB",
    rows: "42M documents",
    samples: 42000000,
    provider: PROVIDERS[1],
    tags: ["legal", "multilingual", "NLP", "contracts", "LLM training"],
    qualityScore: 93,
    accessCount: 97,
    rating: 4.7,
    reviews: 28,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-12-01",
    computeReady: true,
    tokenId: "DT-0x1f2e3d4c",
  },
  {
    id: "ds003",
    title: "Clinical Radiology DICOM Archive",
    description: "850K anonymized radiology scans (CT, MRI, X-Ray) with radiologist annotations and diagnostic labels.",
    longDescription: "A landmark medical imaging dataset containing 850,000 fully anonymized DICOM studies from three academic medical centers. Covers chest CT, abdominal MRI, brain MRI, and chest X-Ray modalities. Each study includes radiologist-verified diagnostic labels, segmentation masks for key anatomical structures, and standardized metadata. Compliant with HIPAA, GDPR, and medical data sharing frameworks.",
    category: "Medical Imaging",
    format: ["HDF5", "JSON"],
    license: "Research Only",
    pricingModel: "Pay-per-access",
    price: "0.08 ETH/1K",
    priceUsd: "$256/1K",
    size: "12 TB",
    rows: "850K studies",
    samples: 850000,
    provider: PROVIDERS[2],
    tags: ["medical", "radiology", "DICOM", "CT", "MRI", "anonymized"],
    qualityScore: 99,
    accessCount: 63,
    rating: 4.9,
    reviews: 19,
    isVerified: true,
    isPrivate: true,
    createdAt: "2024-05-10",
    updatedAt: "2024-12-10",
    computeReady: true,
    tokenId: "DT-0x9c8b7a6f",
  },
  {
    id: "ds004",
    title: "E-Commerce Behavioral Signals",
    description: "240M anonymized user sessions with click streams, purchase sequences, and product interaction graphs.",
    longDescription: "Massive behavioral dataset from a top-10 global e-commerce platform, covering 240 million anonymized user sessions over 18 months. Features include product view sequences, cart add/remove events, purchase completions, search queries, and category navigation paths. Graph-structured product interaction data enables training of recommendation systems and purchase prediction models.",
    category: "Tabular",
    format: ["Parquet", "CSV"],
    license: "Commercial",
    pricingModel: "One-time",
    price: "3.2 ETH",
    priceUsd: "$10,240",
    size: "2.4 TB",
    rows: "240M sessions",
    samples: 240000000,
    provider: PROVIDERS[0],
    tags: ["e-commerce", "behavioral", "recommendation", "sessions", "purchase prediction"],
    qualityScore: 91,
    accessCount: 231,
    rating: 4.6,
    reviews: 67,
    isVerified: true,
    isPrivate: false,
    createdAt: "2023-11-01",
    updatedAt: "2024-10-20",
    computeReady: false,
    tokenId: "DT-0x3e4f5a6b",
  },
  {
    id: "ds005",
    title: "Environmental Audio Scenes v3",
    description: "600K multi-channel recordings of real-world acoustic environments with event labels and spatial metadata.",
    longDescription: "High-quality environmental audio dataset featuring 600,000 stereo and ambisonic recordings from 240 distinct acoustic scenes worldwide. Includes urban soundscapes, natural environments, indoor spaces, and industrial settings. Annotated with temporal event labels, sound source localization data, and environmental conditions metadata. Supports training of acoustic scene classification, sound event detection, and spatial audio models.",
    category: "Audio",
    format: ["Audio", "JSON"],
    license: "CC-BY",
    pricingModel: "One-time",
    price: "1.8 ETH",
    priceUsd: "$5,760",
    size: "890 GB",
    rows: "600K recordings",
    samples: 600000,
    provider: PROVIDERS[3],
    tags: ["audio", "soundscapes", "acoustic", "event detection", "spatial"],
    qualityScore: 88,
    accessCount: 142,
    rating: 4.5,
    reviews: 34,
    isVerified: false,
    isPrivate: false,
    createdAt: "2024-02-14",
    updatedAt: "2024-09-30",
    computeReady: true,
    tokenId: "DT-0x7d8e9f0a",
  },
  {
    id: "ds006",
    title: "Satellite Crop Yield Time Series",
    description: "30-year multispectral satellite imagery with aligned crop yield records spanning 85 countries.",
    longDescription: "Unique geospatial dataset combining 30 years of multispectral Landsat and Sentinel-2 imagery with verified crop yield records from 85 countries. Preprocessed into spatially aligned data cubes at 10m resolution with cloud-free composites. Includes soil composition, weather variables, and irrigation data as auxiliary features. Enables training of precision agriculture, yield prediction, and climate impact models.",
    category: "Geospatial",
    format: ["HDF5", "Parquet"],
    license: "CC0",
    pricingModel: "One-time",
    price: "5.0 ETH",
    priceUsd: "$16,000",
    size: "28 TB",
    rows: "1.4B pixels/year",
    samples: 1400000000,
    provider: PROVIDERS[4],
    tags: ["satellite", "agriculture", "geospatial", "time series", "multispectral"],
    qualityScore: 95,
    accessCount: 88,
    rating: 4.8,
    reviews: 23,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-04-01",
    updatedAt: "2024-12-05",
    computeReady: true,
    tokenId: "DT-0x5b6c7d8e",
  },
  {
    id: "ds007",
    title: "Instruction-Tuned Conversation Pairs",
    description: "8.5M high-quality human-written instruction-response pairs across 120 task categories.",
    longDescription: "Premium fine-tuning dataset containing 8.5 million human-crafted instruction-response pairs across 120 task categories. Developed by professional annotators with domain expertise, covering code generation, reasoning, creative writing, data analysis, and multilingual tasks. Each pair includes quality scores, difficulty ratings, and task metadata enabling curriculum learning approaches.",
    category: "NLP",
    format: ["JSON", "Parquet"],
    license: "Commercial",
    pricingModel: "One-time",
    price: "6.5 ETH",
    priceUsd: "$20,800",
    size: "145 GB",
    rows: "8.5M pairs",
    samples: 8500000,
    provider: PROVIDERS[1],
    tags: ["instruction tuning", "RLHF", "fine-tuning", "LLM", "human-annotated"],
    qualityScore: 98,
    accessCount: 319,
    rating: 4.9,
    reviews: 89,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-06-01",
    updatedAt: "2024-12-12",
    computeReady: true,
    tokenId: "DT-0x2a3b4c5d",
  },
  {
    id: "ds008",
    title: "Autonomous Driving Sensor Fusion",
    description: "3.6M synchronized frames from cameras, LiDAR, radar, and GPS with 3D object annotations.",
    longDescription: "Comprehensive autonomous driving dataset featuring 3.6 million synchronized sensor frames captured in diverse weather conditions, lighting scenarios, and geographic locations. Includes RGB cameras (8 angles), 64-beam LiDAR, 4D radar, GPS/IMU, and HD map data. Annotated with 3D bounding boxes, lane segmentation, drivable area masks, and predicted trajectories. Supports training of perception, prediction, and planning modules.",
    category: "Multimodal",
    format: ["HDF5", "JSON"],
    license: "Research Only",
    pricingModel: "Subscription",
    price: "8.0 ETH/mo",
    priceUsd: "$25,600/mo",
    size: "45 TB",
    rows: "3.6M frames",
    samples: 3600000,
    provider: PROVIDERS[4],
    tags: ["autonomous driving", "LiDAR", "sensor fusion", "3D detection", "ADAS"],
    qualityScore: 96,
    accessCount: 74,
    rating: 4.8,
    reviews: 18,
    isVerified: true,
    isPrivate: true,
    createdAt: "2024-07-15",
    updatedAt: "2024-12-01",
    computeReady: true,
    tokenId: "DT-0x6e7f8a9b",
  },
  {
    id: "ds009",
    title: "Protein Structure Prediction Dataset",
    description: "2.1M protein sequences with experimental structure annotations, binding sites, and functional classifications.",
    longDescription: "Large-scale bioinformatics dataset combining sequence data with experimentally validated 3D structures from PDB and novel structures predicted by AlphaFold. Includes 2.1 million proteins annotated with secondary structure, binding site residues, post-translational modifications, functional GO terms, and disease associations. Preprocessed for immediate use with graph neural network frameworks and sequence transformers.",
    category: "Tabular",
    format: ["Parquet", "JSON"],
    license: "CC0",
    pricingModel: "One-time",
    price: "2.8 ETH",
    priceUsd: "$8,960",
    size: "780 GB",
    rows: "2.1M proteins",
    samples: 2100000,
    provider: PROVIDERS[2],
    tags: ["protein", "biology", "AlphaFold", "drug discovery", "bioinformatics"],
    qualityScore: 94,
    accessCount: 112,
    rating: 4.7,
    reviews: 31,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-08-10",
    updatedAt: "2024-11-30",
    computeReady: true,
    tokenId: "DT-0xc1d2e3f4",
  },
  {
    id: "ds010",
    title: "Financial Transaction Anomaly Dataset",
    description: "18 months of synthetic-real mixed transaction records with labeled fraud patterns and risk scores.",
    longDescription: "Highly curated financial dataset mixing real anonymized transaction records with synthetically generated fraud scenarios. Covers 18 months of transaction activity across payment networks, e-wallets, and banking systems. Each transaction is labeled with fraud type, risk score, network graph features, and temporal patterns. Designed for training fraud detection, risk scoring, and anomaly detection models with balanced class distributions.",
    category: "Time Series",
    format: ["Parquet", "CSV"],
    license: "Commercial",
    pricingModel: "Subscription",
    price: "1.5 ETH/mo",
    priceUsd: "$4,800/mo",
    size: "320 GB",
    rows: "500M transactions",
    samples: 500000000,
    provider: PROVIDERS[0],
    tags: ["finance", "fraud detection", "anomaly", "transactions", "risk"],
    qualityScore: 92,
    accessCount: 167,
    rating: 4.6,
    reviews: 45,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-09-01",
    updatedAt: "2024-12-15",
    computeReady: false,
    tokenId: "DT-0x4f5a6b7c",
  },
  {
    id: "ds011",
    title: "Video-Language Grounding Pairs",
    description: "5M video clips paired with dense natural language descriptions, temporal event labels, and visual Q&A.",
    longDescription: "Multimodal dataset featuring 5 million short video clips (5-30s) each paired with multiple natural language descriptions, temporal event annotations, and visual question-answer pairs. Covers diverse domains including instructional videos, social media, documentary footage, and synthetic scenarios. Supports training of video-language models, temporal grounding systems, and video captioning architectures.",
    category: "Multimodal",
    format: ["Video", "JSON"],
    license: "CC-BY",
    pricingModel: "One-time",
    price: "7.2 ETH",
    priceUsd: "$23,040",
    size: "8.5 TB",
    rows: "5M clips",
    samples: 5000000,
    provider: PROVIDERS[1],
    tags: ["video", "language grounding", "multimodal", "temporal", "VQA"],
    qualityScore: 90,
    accessCount: 59,
    rating: 4.5,
    reviews: 14,
    isVerified: true,
    isPrivate: false,
    createdAt: "2024-10-01",
    updatedAt: "2024-12-10",
    computeReady: true,
    tokenId: "DT-0x8b9c0d1e",
  },
  {
    id: "ds012",
    title: "Urban Mobility Trajectory Dataset",
    description: "Anonymized GPS trajectories of 4M commuters across 12 global megacities with POI and transport labels.",
    longDescription: "Comprehensive mobility dataset containing anonymized GPS trajectories from 4 million urban commuters across 12 global megacities over 24 months. Each trajectory is enriched with point-of-interest categories, transport mode labels, activity recognition annotations, and demographic cluster assignments. Enables training of mobility prediction, transport demand forecasting, and urban planning optimization models.",
    category: "Geospatial",
    format: ["Parquet", "CSV"],
    license: "CC-BY",
    pricingModel: "Pay-per-access",
    price: "0.05 ETH/1K",
    priceUsd: "$160/1K",
    size: "1.1 TB",
    rows: "4M trajectories",
    samples: 4000000,
    provider: PROVIDERS[4],
    tags: ["mobility", "GPS", "urban", "transport", "trajectories"],
    qualityScore: 87,
    accessCount: 93,
    rating: 4.4,
    reviews: 22,
    isVerified: false,
    isPrivate: false,
    createdAt: "2024-09-15",
    updatedAt: "2024-12-08",
    computeReady: false,
    tokenId: "DT-0xf0a1b2c3",
  },
];

export const MY_PROVIDER: Provider = {
  id: "me",
  address: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
  name: "My Organization",
  avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=myorg&backgroundColor=186 85% 45%",
  verified: false,
  totalDatasets: 3,
  totalSales: 28,
  totalEarnings: "5.4 ETH",
  rating: 4.3,
  joinedAt: "2024-08-01",
};

export const MY_DATASETS: Dataset[] = [
  {
    ...DATASETS[4],
    id: "my-ds-001",
    provider: MY_PROVIDER,
    title: "Custom Drone Footage Dataset",
    accessCount: 12,
  },
];

export const MY_PURCHASES: Purchase[] = [
  {
    id: "pur001",
    datasetId: "ds001",
    datasetTitle: "ImageNet-Scale Scene Understanding",
    category: "Computer Vision",
    price: "4.5 ETH",
    purchasedAt: "2024-11-20",
    accessType: "One-time",
    txHash: "0xabc123def456789...",
  },
  {
    id: "pur002",
    datasetId: "ds007",
    datasetTitle: "Instruction-Tuned Conversation Pairs",
    category: "NLP",
    price: "6.5 ETH",
    purchasedAt: "2024-12-01",
    accessType: "One-time",
    txHash: "0x987fed654321abc...",
  },
  {
    id: "pur003",
    datasetId: "ds002",
    datasetTitle: "Multilingual Legal Text Corpus",
    category: "NLP",
    price: "2.1 ETH/mo",
    purchasedAt: "2024-12-10",
    accessType: "Subscription",
    txHash: "0x456789abcdef012...",
    expiresAt: "2025-01-10",
  },
];

export const MY_COMPUTE_JOBS: ComputeJob[] = [
  {
    id: "job001",
    datasetId: "ds003",
    datasetTitle: "Clinical Radiology DICOM Archive",
    status: "completed",
    modelType: "ResNet-50 Classifier",
    startedAt: "2024-12-10 14:22",
    completedAt: "2024-12-10 18:45",
    duration: "4h 23m",
    cost: "0.12 ETH",
  },
  {
    id: "job002",
    datasetId: "ds007",
    datasetTitle: "Instruction-Tuned Conversation Pairs",
    status: "running",
    modelType: "LLaMA-3 Fine-tune",
    startedAt: "2024-12-15 09:00",
    cost: "0.28 ETH",
  },
  {
    id: "job003",
    datasetId: "ds006",
    datasetTitle: "Satellite Crop Yield Time Series",
    status: "queued",
    modelType: "ConvLSTM Forecaster",
    startedAt: "2024-12-15 11:30",
    cost: "0.09 ETH",
  },
];

export const STATS = {
  totalDatasets: 2847,
  totalProviders: 514,
  totalVolume: "18,420 ETH",
  totalTransactions: 12900,
  avgQualityScore: 93,
  computeJobsRun: 4831,
};

export const CATEGORIES: { name: DataCategory; icon: string; count: number; color: string }[] = [
  { name: "Computer Vision", icon: "Eye", count: 634, color: "from-blue-500/20 to-blue-600/5" },
  { name: "NLP", icon: "MessageSquare", count: 521, color: "from-violet-500/20 to-violet-600/5" },
  { name: "Tabular", icon: "Table", count: 489, color: "from-emerald-500/20 to-emerald-600/5" },
  { name: "Medical Imaging", icon: "Stethoscope", count: 287, color: "from-red-500/20 to-red-600/5" },
  { name: "Audio", icon: "Mic", count: 243, color: "from-amber-500/20 to-amber-600/5" },
  { name: "Geospatial", icon: "Map", count: 198, color: "from-teal-500/20 to-teal-600/5" },
  { name: "Time Series", icon: "TrendingUp", count: 312, color: "from-cyan-500/20 to-cyan-600/5" },
  { name: "Multimodal", icon: "Layers", count: 163, color: "from-pink-500/20 to-pink-600/5" },
];
