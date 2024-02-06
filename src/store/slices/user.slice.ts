import { StateCreator } from 'zustand';
import { resetters } from '..';

export type User = {
  id: string;
  email: string;
  username: string;
  confirmed: boolean;
  country: string;
  rank: string;
  auth: {
    [key: string]: { email: string };
  };
  isAuthenticated: boolean;
};

export interface UserSlice {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const initialUser = {
  user: {
    id: '',
    email: '',
    username: '',
    confirmed: false,
    role: '',
    country: '',
    rank: '',
    auth: { google: { email: '' } },
    isAuthenticated: false,
  },
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => {
  resetters.push(() => set(initialUser));

  return {
    ...initialUser,
    setUser: user => {
      set(state => ({
        user: Object.assign(state.user, user),
      }));
    },
    resetUser: () => {
      set({ ...initialUser });
    },
  };
};
