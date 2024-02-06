import { StateCreator } from 'zustand';
import { resetters } from '..';
import { PackType, RegionFilter, StoreType } from '../../types';
import { BoosterPackCard } from '../../interface';

export type Store = {
  storeType: StoreType;
  packType: PackType;
  packRegion: RegionFilter;
  packDetails: boolean;
  packOverview: boolean;
  imageState: boolean;
  showVideo: boolean;
  showOpenImage: boolean;
  buy: boolean;
  cardObtained: boolean;
  latestCardObtained: BoosterPackCard[];
  currentPackId: number;
  stripePaymentSuccess: boolean;
  displayStripeModal: boolean;
};

export interface StoreSlice {
  store: Store;
  setStoreState: (store: Partial<Store>) => void;
}

const initialStore = {
  store: {
    storeType: StoreType.BOOSTER,
    packType: PackType.STANDARD,
    packRegion: RegionFilter.ALL,
    packDetails: false,
    packOverview: false,
    imageState: false,
    showVideo: false,
    showOpenImage: true,
    buy: false,
    cardObtained: false,
    currentPackId: 0,
    latestCardObtained: [],
    stripePaymentSuccess: false,
    displayStripeModal: false,
  },
};

export const createStoreSlice: StateCreator<StoreSlice, [], [], StoreSlice> = set => {
  resetters.push(() => set(initialStore));

  return {
    ...initialStore,
    setStoreState: (store: Partial<Store>) => {
      set(state => ({
        store: Object.assign(state.store, store),
      }));
    },
  };
};
