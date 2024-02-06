import { StateCreator } from 'zustand';
import { resetters } from '..';
import { ProfileSetting } from '../../types';

export type Button = {
  profileSetting: ProfileSetting;
};

export interface ButtonSlice {
  button: Button;
  setButtonState: (button: Partial<Button>) => void;
}

const initialButton = {
  button: {
    profileSetting: ProfileSetting.SETTING,
  },
};

export const createButtonSlice: StateCreator<ButtonSlice, [], [], ButtonSlice> = set => {
  resetters.push(() => set(initialButton));

  return {
    ...initialButton,
    setButtonState: (button: Partial<Button>) => {
      set(state => ({
        button: Object.assign(state.button, button),
      }));
    },
  };
};
