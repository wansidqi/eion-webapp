import { create } from 'zustand';
import { UserSlice, createUserSlice } from './slices/user.slice';
import { ModalSlice, createModalSlice } from './slices/modal.slice';
import { LobbySlice, createLobbySlice } from './slices/lobby.slice';
import { MenuSlice, createMenuSlice } from './slices/menu.slice';
import { ButtonSlice, createButtonSlice } from './slices/button.slice';
import { AlertSlice, createAlertSlice } from './slices/alert.slice';
import { PlaymatSlice, createPlaymatSlice } from './slices/playmat.slice';
import { StoreSlice, createStoreSlice } from './slices/store.slice';
import { LeaderboardSlice, createLeaderboardSlice } from './slices/leaderboard.slice';
import { VaultSlice, createVaultSlice } from './slices/vault.slice';
import { ForgeSlice, createForgeSlice } from './slices/forge.slice';
import { InvokeSlice, createInvokeSlice } from './slices/invoke.slice';
import { createinventorySlice, inventorySlice } from './slices/inventory.slice';
import { ProfileSlice, createProfileSlice } from './slices/profile.slice';
import { OnboardingSlice, createOnboardingSlice } from './slices/onboarding.slice';
import { WindowSlice, createWindowSlice } from './slices/window.slice';
import { MetaSlice, createMetaSlice } from './slices/meta.slice';

type ResetAllSlices = { resetAllSlices: () => void };
type BoundStoreType = UserSlice &
  ModalSlice &
  LobbySlice &
  MenuSlice &
  ButtonSlice &
  AlertSlice &
  StoreSlice &
  PlaymatSlice &
  LeaderboardSlice &
  VaultSlice &
  ForgeSlice &
  InvokeSlice &
  inventorySlice &
  ProfileSlice &
  OnboardingSlice &
  WindowSlice &
  MetaSlice &
  ResetAllSlices;

export const resetters: (() => void)[] = [];

export const useBoundStore = create<BoundStoreType>()((...a) => ({
  ...createUserSlice(...a),
  ...createModalSlice(...a),
  ...createLobbySlice(...a),
  ...createMenuSlice(...a),
  ...createButtonSlice(...a),
  ...createAlertSlice(...a),
  ...createStoreSlice(...a),
  ...createPlaymatSlice(...a),
  ...createLeaderboardSlice(...a),
  ...createVaultSlice(...a),
  ...createForgeSlice(...a),
  ...createInvokeSlice(...a),
  ...createinventorySlice(...a),
  ...createProfileSlice(...a),
  ...createOnboardingSlice(...a),
  ...createWindowSlice(...a),
  ...createMetaSlice(...a),

  resetAllSlices: () => resetters.forEach(resetter => resetter()),
}));
