import { StateCreator } from 'zustand';
import { resetters } from '..';
import { LBPoints, LeaderboardBody, LeaderboardType } from '../../interface';
import { RegionFilter } from '../../types';
import { weeks } from '../../data';

export type Leaderboard = {
  selectDropdown: string | null;
  dispalyDropdown: boolean;
  info: boolean;
  userRank: number;
  selectWeekly: LeaderboardBody | null;
  selectSeason: LeaderboardBody | null;
  displayWeekly: boolean;
  selectRegion: RegionFilter;
  displayRegion: boolean;
  displaySeason: boolean;
  pointsType: LBPoints;
  leaderboardType: LeaderboardType;
};

const initialLeaderboard = {
  leaderboard: {
    leaderboardType: 'Weekly' as LeaderboardType,
    selectDropdown: null,
    dispalyDropdown: false,
    selectWeekly: weeks[0],
    displayWeekly: false,
    selectRegion: RegionFilter.MY,
    displayRegion: false,
    displaySeason: false,
    selectSeason: null,
    userRank: 0,
    pointsType: 'fp' as LBPoints,
    info: false,
  },
};

export interface LeaderboardSlice {
  leaderboard: Leaderboard;
  setLeaderboardSlice: (leaderboard: Partial<Leaderboard>) => void;
  resetLeaderboard: () => void;
}

export const createLeaderboardSlice: StateCreator<LeaderboardSlice, [], [], LeaderboardSlice> = set => {
  resetters.push(() => set(initialLeaderboard));

  return {
    ...initialLeaderboard,

    setLeaderboardSlice: (leaderboard: Partial<Leaderboard>) => {
      set(state => ({ leaderboard: { ...state.leaderboard, ...leaderboard } }));
    },

    resetLeaderboard: () => {
      set({ ...initialLeaderboard });
    },
  };
};
