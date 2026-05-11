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

export type FootballPrediction = {
  winner: string;
  confidence: number;
  fairOdd: number;
  recommendation: string;
  market: string;
};

export type FootballOdds = {
  fairOdd: number;
  valueBet?: boolean;
};

export type FootballMatch = {
  homeTeam: string;
  awayTeam: string;
  league: string;
  status: string;
};

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
};