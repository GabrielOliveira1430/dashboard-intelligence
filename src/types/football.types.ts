// src/types/football.types.ts

// ==========================================
// ⚽ MARKET
// ==========================================

export type Market =
  | 'HOME_WIN'
  | 'AWAY_WIN'
  | 'DRAW'
  | 'OVER_1_5'
  | 'OVER_2_5'
  | 'BTTS'
  | 'NO_BET'
  | 'LOW_CONFIDENCE';

// ==========================================
// ⚽ TEAM STATS
// ==========================================

export type TeamStats = {

  team: string;

  matches: number;

  wins: number;

  draws: number;

  losses: number;

  goals: number;

  conceded: number;

  performance: number;
};

// ==========================================
// ⚽ MATCH
// ==========================================

export type FootballMatch = {

  id?: string;

  homeTeam: string;

  awayTeam: string;

  league: string;

  status: string;

  date?: string;

  minute?: number;

  homeScore?: number;

  awayScore?: number;

  country?: string;

  season?: string;

  venue?: string;

  referee?: string;
};

// ==========================================
// ⚽ PRESSURE
// ==========================================

export type MatchPressure = {

  momentumShift?: boolean;

  goalProbability?: number;

  pressureIndex?: number;
};

// ==========================================
// ⚽ PREDICTION
// ==========================================

export type FootballPrediction = {

  homeTeam: string;

  awayTeam: string;

  winner: string;

  prediction:
    | 'HOME'
    | 'AWAY'
    | 'DRAW';

  confidence: number;

  fairOdd: number;

  risk: number;

  edge: number;

  recommendation: string;

  market: Market;

  expectedGoalsHome?: number;

  expectedGoalsAway?: number;

  chaosIndex?: number;

  matchIntensity?:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'EXTREME';

  pressure?: MatchPressure;

  reasons: string[];
};

// ==========================================
// ⚽ ODDS
// ==========================================

export type FootballOdds = {

  homeTeam: string;

  awayTeam: string;

  winner: string;

  probability: number;

  fairOdd: number;

  impliedProbability: number;

  valueBet: boolean;
};

// ==========================================
// ⚛️ QUANTUM
// ==========================================

export type QuantumSimulation = {

  match: string;

  homeTeam: string;

  awayTeam: string;

  simulations: number;

  expectedGoalsHome: number;

  expectedGoalsAway: number;

  totalExpectedGoals: number;

  winProbabilityHome: number;

  winProbabilityAway: number;

  drawProbability: number;

  nextGoalProbabilityHome: number;

  nextGoalProbabilityAway: number;

  chaosLevel: number;

  volatilityIndex: number;

  confidence: number;

  marketConfidence: number;

  dominantTeam: string;

  valueRating:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'ELITE';

  momentumTrend:
    | 'UP'
    | 'DOWN'
    | 'STABLE';

  pressureTrend:
    | 'STABLE'
    | 'RISING'
    | 'EXPLODING';

  dangerousMoments: number;

  explosivePotential: number;

  comebackProbability: number;

  collapseProbability: number;

  generatedAt: string;
};

// ==========================================
// ⚽ TACTICAL
// ==========================================

export type TacticalSnapshot = {

  match: string;

  homeTeam: string;

  awayTeam: string;

  homeDanger: number;

  awayDanger: number;

  possessionHome: number;

  possessionAway: number;

  intensity: number;

  zones?: any[];

  momentumFlow?: any[];
};

// ==========================================
// ⚽ RESPONSE
// ==========================================

export type FootballResponse = {

  success: boolean;

  matches: FootballMatch[];

  totalMatches: number;

  analytics: TeamStats[];

  topTeams: TeamStats[];

  hottestTeam: TeamStats | null;

  predictions: FootballPrediction[];

  bestPrediction: FootballPrediction | null;

  odds: FootballOdds[];

  totalPredictions: number;

  totalOdds: number;

  quantum?: QuantumSimulation[];

  tactical?: TacticalSnapshot[];

  liveEvents?: any[];

  valueBets?: any[];

  rankedMatches?: any[];

  topSignals?: any[];

  aiCore?: any;

  updatedAt?: string;
};