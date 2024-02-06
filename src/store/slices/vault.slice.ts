import { StateCreator } from 'zustand';
import { resetters } from '..';
import { UserCardInterface } from '../../interface';

export type Vault = {
  previewCard: boolean;
  selectCard: UserCardInterface | null;
};

const initialVault = {
  vault: {
    previewCard: false,
    selectCard: null,
  },
};

export interface VaultSlice {
  vault: Vault;
  setVaultState: (vault: Partial<Vault>) => void;
  resetVault: () => void;
}

export const createVaultSlice: StateCreator<VaultSlice, [], [], VaultSlice> = set => {
  resetters.push(() => set(initialVault));

  return {
    ...initialVault,

    setVaultState: (vault: Partial<Vault>) => {
      set(state => ({ vault: { ...state.vault, ...vault } }));
    },

    resetVault: () => {
      set({ ...initialVault });
    },
  };
};
