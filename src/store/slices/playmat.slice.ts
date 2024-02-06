import { StateCreator } from 'zustand';
import { resetters } from '..';
import { CardTypes } from '../../types';
import { UserCardInterface, DraftInterface } from '../../interface';

export const initialDraft = {
  draft: {
    leader: null,
    support1: null,
    support2: null,
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    teamWin: null,
    teamLose: null,
  },
};

export const initialModal = {
  leader: false,
  support1: false,
  support2: false,
  player1: false,
  player2: false,
  player3: false,
  player4: false,
  player5: false,
  teamWin: '',
  teamLose: '',
};

type ModalPlaymat = {
  leader?: boolean;
  support1?: boolean;
  support2?: boolean;
  player1?: boolean;
  player2?: boolean;
  player3?: boolean;
  player4?: boolean;
  player5?: boolean;
};

export type Playmat = {
  errorModal: boolean;
  scoreModal: boolean;
  draftPreview: boolean;
  viewDraft: any;
  lockDraft: boolean;
  modalRaritySelection: ModalPlaymat;
  modalCardSelection: ModalPlaymat;
  selectItem: UserCardInterface | null;
  draftUI: DraftInterface;
  cardTypes: null | CardTypes;
  showVote: boolean;
  gameIndex: number;
  sameDraftModal: boolean;
  configDraftModal: boolean;
  clearDraftModal: boolean;
  showLoading: boolean;
  showShare: boolean;
  gridView: number;
  screenshotCanvas: null | HTMLCanvasElement;
  // shortcut for skin
  selectBaseItem: UserCardInterface | null;
  modalPreviewMode: string;
  message: string | null;
};

const initialPlaymat = {
  playmat: {
    errorModal: false,
    scoreModal: false,
    draftPreview: false,
    viewDraft: '',
    lockDraft: false,
    selectItem: null,
    draftUI: initialDraft,
    cardTypes: null,
    modalRaritySelection: initialModal,
    modalCardSelection: initialModal,
    showVote: false,
    gameIndex: 1,
    sameDraftModal: false,
    configDraftModal: false,
    clearDraftModal: false,
    showLoading: false,
    showShare: false,
    screenshotCanvas: null,
    // shortcut for skin
    selectBaseItem: null,
    modalPreviewMode: 'add',
    message: null,
    gridView: 4,
  },
};

export interface PlaymatSlice {
  playmat: Playmat;
  setPlaymatState: (playmat: Partial<Playmat>) => void;
  resetPlaymat: () => void;
}

export const createPlaymatSlice: StateCreator<PlaymatSlice, [], [], PlaymatSlice> = set => {
  resetters.push(() => set(initialPlaymat));

  return {
    ...initialPlaymat,

    setPlaymatState: (playmat: Partial<Playmat>) => {
      set(state => ({ playmat: { ...state.playmat, ...playmat } }));
      // set(state => ({playmat: Object.assign(state.playmat, playmat)}));
      setTimeout(() => {
        set(state => ({ playmat: { ...state.playmat, message: null } }));
      }, 3000);
    },

    resetPlaymat: () => {
      set({ ...initialPlaymat });
    },
  };
};
