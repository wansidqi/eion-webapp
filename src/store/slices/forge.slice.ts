import { StateCreator } from 'zustand';
import { resetters } from '..';
import { UserCardInterface } from '../../interface';

export type Forge = {
  selectCardModal: boolean;
  showForgeCard: boolean;
  forgeConfirmation: boolean;
  forging: boolean;
  loading: boolean;
  selectCard: UserCardInterface | null;
  cardToConsumeIds: string[];
  isForgeCompleted: boolean;

  cardToConsume: UserCardInterface[];
  sacrificeCard: UserCardInterface | undefined;
  cardStacks: UserCardInterface[];
};

const initialForge = {
  forge: {
    selectCardModal: false,
    showForgeCard: false,
    forgeConfirmation: false,
    forging: false,
    loading: false,
    selectCard: null,
    cardToConsumeIds: [],
    isForgeCompleted: false,

    cardToConsume: [],
    sacrificeCard: undefined,
    cardStacks: [],
  },
};

export interface ForgeSlice {
  forge: Forge;
  setForgeState: (forge: Partial<Forge>) => void;
  resetForge: () => void;
}

export const createForgeSlice: StateCreator<ForgeSlice, [], [], ForgeSlice> = set => {
  resetters.push(() => set(initialForge));

  return {
    ...initialForge,

    setForgeState: (forge: Partial<Forge>) => {
      set(state => ({ forge: { ...state.forge, ...forge } }));
    },

    resetForge: () => {
      set({ ...initialForge });
    },
  };
};
