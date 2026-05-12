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

  market:
    | 'HOME_WIN'
    | 'AWAY_WIN'
    | 'DRAW'
    | 'OVER_1_5'
    | 'OVER_2_5'
    | 'LOW_CONFIDENCE';

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
// ⚽ MATCH
// ==========================================

export type FootballMatch = {

  homeTeam: string;

  awayTeam: string;

  league: string;

  status: string;

  date?: string;

  homeScore?: number;

  awayScore?: number;
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

  updatedAt?: string;
};