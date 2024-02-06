import { CardGeneral, TeamInterface } from '.';

export type GachaLogic = {
  type: 'number_roll' | 'randomizer';
  weightedRandom?: number;
};

export type BoosterPackCard = {
  atLeast: boolean;
  percentage: number;
  card: CardGeneral;
  cardId: string;
  isNew?: boolean;
};

export interface BoosterPackInterface {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  oddsImage?: string;
  price: number;
  loyaltyPoint: number;
  stripePriceApi: string;
  gachaType: GachaLogic[];
  cards: BoosterPackCard[];
  team?: TeamInterface;
}
