import { StateCreator } from 'zustand';
import { resetters } from '..';

export type Alert = {
  message: string | null;
  type: 'success' | 'error' | null;
};

export interface AlertSlice {
  alert: Alert;
  setAlertState: (alert: Partial<Alert>) => void;
  showError?: (message: string) => void;
  hideError?: () => void;
  showSuccess?: (message: string) => void;
  hideSuccess?: () => void;
}

const initialAlert = {
  alert: {
    message: null,
    type: null,
  },
};

export const createAlertSlice: StateCreator<AlertSlice, [], [], AlertSlice> = set => {
  resetters.push(() => set(initialAlert));

  return {
    ...initialAlert,
    setAlertState: (alert: Partial<Alert>) => {
      set(state => ({ alert: Object.assign(state.alert, alert) }));

      setTimeout(() => {
        set(_ => ({ alert: { message: null, type: null } }));
      }, 3000);
    },
  };
};
