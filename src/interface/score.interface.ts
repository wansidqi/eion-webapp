export interface ScoreInterface {
  id?: string;
  totalFP?: number;
  totalLP?: number;
}

export interface ScoreBreakdown {
  cardFp?: number;
  fp: number;
  lp: number;
  pp: number;
}
