import { StateCreator } from 'zustand';
import { resetters } from '..';

export type Menu = {
  sidebarMenu: string;
  profileMenu: { isOpen: boolean };
};

export interface MenuSlice {
  menu: Menu;
  setMenuState: (menu: Partial<Menu>) => void;
}

const initialMenu = {
  menu: {
    sidebarMenu: '',
    profileMenu: { isOpen: false },
  },
};

export const createMenuSlice: StateCreator<MenuSlice, [], [], MenuSlice> = set => {
  resetters.push(() => set(initialMenu));

  return {
    ...initialMenu,
    setMenuState: (menu: Partial<Menu>) => {
      set(state => ({
        menu: Object.assign(state.menu, menu),
      }));
    },
  };
};
