import { StateCreator } from 'zustand';
// import { resetters } from '..';

export type Onboarding = {
  welcomeMessage: boolean;
  beforePack: boolean;
  cardObtained: boolean;
  isFirstTime: boolean;
  sequence: number;
};

const initialOnboarding = {
  onboarding: {
    isFirstTime: false,
    welcomeMessage: true,
    beforePack: true,
    cardObtained: false,
    sequence: 0,
  },
};

export interface OnboardingSlice {
  onboarding: Onboarding;
  setOnboardingState: (onboarding: Partial<Onboarding>) => void;
  resetOnboarding: () => void;
}

export const createOnboardingSlice: StateCreator<OnboardingSlice, [], [], OnboardingSlice> = set => {
  // resetters.push(() => set(initialOnboarding));

  return {
    ...initialOnboarding,

    setOnboardingState: (onboarding: Partial<Onboarding>) => {
      set(state => ({ onboarding: { ...state.onboarding, ...onboarding } }));
    },

    resetOnboarding: () => {
      set({ ...initialOnboarding });
    },
  };
};
