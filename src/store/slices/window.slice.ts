import { StateCreator } from 'zustand';
import { resetters } from '..';

export type Window = {
  lockerWindow: boolean;
  invokeWindow: boolean;
  storeWindow: boolean;
  earnShardsWindow: boolean;
  vaultWindow: boolean;
  leaderboardWindow: boolean;
  weeklyRewardWindow: boolean;
  seasonalRewardWindow: boolean;
};

const initialWindow = {
  window: {
    lockerWindow: true,
    invokeWindow: true,
    storeWindow: true,
    earnShardsWindow: true,
    vaultWindow: true,
    leaderboardWindow: true,
    weeklyRewardWindow: false,
    seasonalRewardWindow: false,
  },
};

export interface WindowSlice {
  window: Window;
  setWindowState: (window: Partial<Window>) => void;
  resetWindow: () => void;
}

export const createWindowSlice: StateCreator<WindowSlice, [], [], WindowSlice> = set => {
  resetters.push(() => set(initialWindow));

  return {
    ...initialWindow,

    setWindowState: (window: Partial<Window>) => {
      set(state => ({ window: { ...state.window, ...window } }));
    },

    resetWindow: () => {
      set({ ...initialWindow });
    },
  };
};
