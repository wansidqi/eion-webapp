import { StateCreator } from 'zustand';
import { resetters } from '..';
import { MatchStatus, MatchTypes, RegionFilter } from '../../types';

export type Lobby = {
  matchStatus: MatchStatus;
  regionFilter: RegionFilter;
  matchType: MatchTypes;
};

export interface LobbySlice {
  lobby: Lobby;
  setLobbyState: (lobby: Partial<Lobby>) => void;
}

const initialLobby = {
  lobby: {
    matchStatus: MatchStatus.UPCOMING,
    regionFilter: RegionFilter.ALL,
    matchType: MatchTypes.ALL_MATCH,
  },
};

export const createLobbySlice: StateCreator<LobbySlice, [], [], LobbySlice> = set => {
  resetters.push(() => set(initialLobby));

  return {
    ...initialLobby,
    setLobbyState: (lobby: Partial<Lobby>) => {
      set(state => ({
        lobby: Object.assign(state.lobby, lobby),
      }));
    },
  };
};
