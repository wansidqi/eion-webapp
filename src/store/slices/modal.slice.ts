import { StateCreator } from 'zustand';
import { resetters } from '..';

export type ModalState = {
  isOpen: boolean;
  isSkipped?: boolean;
};

export type Modal = {
  setUsername: ModalState;
  register: ModalState;
  gameOverview: ModalState;
  showSidebar: ModalState;
  profileMenu: ModalState;
  forgetPasswordPage: ModalState;
  unlinkGoogle: ModalState;
  deleteAccount: ModalState;
  changePassword: ModalState;
  forgetPassword: ModalState;
};

export interface ModalSlice {
  modal: Modal;
  setModalState: (modal: Partial<Modal>) => void;
  resetModal: () => void;
}

const initialModal = {
  modal: {
    setUsername: { isOpen: false, isSkipped: false },
    register: { isOpen: true },
    gameOverview: { isOpen: false },
    showSidebar: { isOpen: false },
    profileMenu: { isOpen: false },
    forgetPasswordPage: { isOpen: false },
    unlinkGoogle: { isOpen: false },
    deleteAccount: { isOpen: false },
    changePassword: { isOpen: false },
    forgetPassword: { isOpen: false },
  },
};

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = set => {
  resetters.push(() => set(initialModal));

  return {
    ...initialModal,
    setModalState: (modal: Partial<Modal>) => {
      set(state => ({
        modal: Object.assign(state.modal, modal),
      }));
    },
    resetModal: () => {
      set({ ...initialModal });
    },
  };
};
