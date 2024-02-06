import { RegionFilter } from '../types';

export interface LeaderboardInterface {
  id?: string;
  username?: string;
  country?: string;
  totalFP?: string;
  totalPP?: string;
  rank?: number;
}

export interface LeaderboardBody {
  title?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
}

export type LBPoints = 'pp' | 'fp';

export type LeaderboardType = 'Weekly' | 'Seasonal' | 'Fame';

export interface LeaderboardData {
  type: LBPoints;
  startDate?: string | Date;
  endDate?: string | Date;
  country?: RegionFilter;
}
