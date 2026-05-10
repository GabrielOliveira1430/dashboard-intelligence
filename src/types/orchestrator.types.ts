
// src/types/orchestrator.types.ts

// ======================================
// 📊 HOT/COLD
// ======================================

export type NumberScore = {

  number: string;

  score: number;
};


// ======================================
// 📊 ANALYTICS
// ======================================

export type AnalyticsData = {

  hotNumbers: NumberScore[];

  coldNumbers: NumberScore[];
};


// ======================================
// 🎲 GENERATED NUMBER
// ======================================

export type GeneratedNumber = {

  number: string;

  confidence: number;

  source: string;

  cluster: string;

  patternScore: number;

  patternTags: string[];
};


// ======================================
// 🎲 GENERATED
// ======================================

export type GeneratedData = {

  total: number;

  numbers: GeneratedNumber[];
};


// ======================================
// 🧠 STRATEGY RANKING
// ======================================

export type StrategyRanking = {

  strategy: string;

  score: number;

  accuracy: number;

  coverage: number;

  diversity: number;
};


// ======================================
// 🤖 DECISION
// ======================================

export type DecisionData = {

  bestStrategy: string;

  ranking: StrategyRanking[];
};


// ======================================
// 🧬 EVOLUTION
// ======================================

export type EvolutionData = {

  mutationsCreated: number;

  evolvedStrategies: string[];

  recommendations: string[];
};


// ======================================
// 🧠 SUMMARY
// ======================================

export type SummaryData = {

  bestStrategy: string;

  totalStrategies: number;

  bestScore: number;

  bestAccuracy: number;

  bestCoverage: number;

  bestDiversity: number;

  systemHealth: number;

  exploration: number;

  exploitation: number;

  mode: string;

  retiredStrategies: number;
};


// ======================================
// 🚀 ORCHESTRATOR RESPONSE
// ======================================

export type OrchestratorResponse = {

  analytics: AnalyticsData;

  generated: GeneratedData;

  decision: DecisionData;

  evolution: EvolutionData;

  summary: SummaryData;
};

