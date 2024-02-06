import { StateCreator } from 'zustand';
import { resetters } from '..';
import { InvokeCards, InvokeResults, UserCardInterface } from '../../interface';

type ModalInvoke = {
  roam: boolean;
  exp: boolean;
  jungle: boolean;
  gold: boolean;
  mid: boolean;
};

export const initialInvokeDraft = {
  draft: {
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    basePlayer1: null,
    basePlayer2: null,
    basePlayer3: null,
    basePlayer4: null,
    basePlayer5: null,
  },
  results: {
    basePlayer1: { kill: null, death: null, assist: null },
    basePlayer2: { kill: null, death: null, assist: null },
    basePlayer3: { kill: null, death: null, assist: null },
    basePlayer4: { kill: null, death: null, assist: null },
    basePlayer5: { kill: null, death: null, assist: null },
  },
};

export const initInvokeModal = {
  roam: false,
  exp: false,
  jungle: false,
  gold: false,
  mid: false,
};

export type Invoke = {
  modalPlayerSelection: Partial<ModalInvoke>;
  selectRarityModal: Partial<ModalInvoke>;
  invokeDraft: { draft: InvokeCards; results?: InvokeResults };
  lockInvoke: boolean;
  invokePreview: boolean;
  invokeWarningModal: boolean;
  viewInvoke?: any;
  selectItem: UserCardInterface | null;
  selectBaseItem: UserCardInterface | null;
  unlockMessage: boolean;
  message: string | null;
  modalPreviewMode: string;
  cardPreview: boolean;
  gridView: number;
  dummyLive: boolean;
};

const initialInvoke = {
  invoke: {
    selectRarityModal: initInvokeModal,
    modalPlayerSelection: initInvokeModal,
    invokeDraft: initialInvokeDraft,
    lockInvoke: false,
    invokePreview: false,
    invokeWarningModal: false,
    viewInvoke: '',
    selectItem: null,
    selectBaseItem: null,
    unlockMessage: false,
    message: null,
    modalPreviewMode: 'add',
    cardPreview: false,
    gridView: 4,
    dummyLive: true,
  },
};

export interface InvokeSlice {
  invoke: Invoke;
  setInvokeState: (invoke: Partial<Invoke>) => void;
  resetInvoke: () => void;
}

export const createInvokeSlice: StateCreator<InvokeSlice, [], [], InvokeSlice> = set => {
  resetters.push(() => set(initialInvoke));

  return {
    ...initialInvoke,

    setInvokeState: (invoke: Partial<Invoke>) => {
      set(state => ({ invoke: { ...state.invoke, ...invoke } }));
      setTimeout(() => {
        set(state => ({ invoke: { ...state.invoke, message: null, unlockMessage: false } }));
      }, 8000);
    },

    resetInvoke: () => {
      set({ ...initialInvoke });
    },
  };
};
