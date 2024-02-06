import { StateCreator } from 'zustand';
import { resetters } from '..';
import { CardTypes } from '../../types';
import { FilterInventory } from '../../types/filter.inventory';
import { UserCardInterface } from '../../interface';

export const initialFilterContent = {
  rarity: false,
  duplicates: false,
  region: false,
  role: false,
  season: false,
  team: false,
  type: false,
  refinement: false,
};

export const initialFilters = {
  Role: [],
  Type: [],
  Rarity: [],
  Duplicates: [],
  Team: [],
  Season: [],
};

export interface FiltersContent {
  rarity: boolean;
  duplicates: boolean;
  region: boolean;
  team: boolean;
  type: boolean;
  role: boolean;
  season: boolean;
  refinement: boolean;
}

export interface Filter {
  Role: string[];
  Type: string[];
  Rarity: string[];
  Duplicates: string[];
  Team: string[];
  Season: string[];
  [key: string]: string[];
}

export type inventory = {
  showBreakdown: boolean;
  showDropdown: boolean;
  showDropdownFilter: boolean;
  search: string;
  selectButton: CardTypes[];
  filtersContent: FiltersContent;
  filters: Filter;
  sort: FilterInventory;
  isRefinement: boolean;
  cardStacks: UserCardInterface[];
  gridView: number;
};

const initialinventory = {
  inventory: {
    showBreakdown: false,
    showDropdown: false,
    showDropdownFilter: true,
    search: '',
    selectButton: [],
    filtersContent: initialFilterContent,
    filters: initialFilters,
    sort: FilterInventory.MOST_RECENT,
    isRefinement: false,
    cardStacks: [],
    gridView: 4,
  },
};

export interface inventorySlice {
  inventory: inventory;
  setinventoryState: (inventory: Partial<inventory>) => void;
  resetinventory: () => void;
}

export const createinventorySlice: StateCreator<inventorySlice, [], [], inventorySlice> = set => {
  resetters.push(() => set(initialinventory));

  return {
    ...initialinventory,

    setinventoryState: (inventory: Partial<inventory>) => {
      set(state => ({ inventory: { ...state.inventory, ...inventory } }));
    },

    resetinventory: () => {
      set({ ...initialinventory });
    },
  };
};
