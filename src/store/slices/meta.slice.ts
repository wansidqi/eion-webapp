import { StateCreator } from 'zustand';
import { resetters } from '..';

export type Meta = {
  img: string;
  link: string;
};

const initialMeta = {
  meta: {
    img: '',
    link: '',
  },
};

export interface MetaSlice {
  meta: Meta;
  setMetaState: (meta: Partial<Meta>) => void;
  resetMeta: () => void;
}

export const createMetaSlice: StateCreator<MetaSlice, [], [], MetaSlice> = set => {
  resetters.push(() => set(initialMeta));

  return {
    ...initialMeta,

    setMetaState: (meta: Partial<Meta>) => {
      set(state => ({ meta: { ...state.meta, ...meta } }));
    },

    resetMeta: () => {
      set({ ...initialMeta });
    },
  };
};
