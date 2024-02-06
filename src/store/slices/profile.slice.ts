import { StateCreator } from 'zustand';
import { resetters } from '..';
import { UserCardInterface } from '../../interface';

export type Profile = {
  showInventory: boolean;
  previewCard: boolean;
  selectCard: UserCardInterface | null;
};

const initialProfile = {
  profile: {
    showInventory: false,
    previewCard: false,
    selectCard: null,
  },
};

export interface ProfileSlice {
  profile: Profile;
  setProfileState: (profile: Partial<Profile>) => void;
  resetProfile: () => void;
}

export const createProfileSlice: StateCreator<ProfileSlice, [], [], ProfileSlice> = set => {
  resetters.push(() => set(initialProfile));

  return {
    ...initialProfile,

    setProfileState: (profile: Partial<Profile>) => {
      set(state => ({ profile: { ...state.profile, ...profile } }));
    },

    resetProfile: () => {
      set({ ...initialProfile });
    },
  };
};
