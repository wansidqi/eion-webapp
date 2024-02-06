import { TeamInterface } from '.';
import { CardTypes } from '../types';

export interface UserCardInterface {
  card: CardGeneral;
  currentExp: number;
  id: string;
  createdAt?: Date;
  premiumPoint: number;
  refinementLevel: number;
  inventoryId?: string;
  favourite: boolean | number;
  skins: UserCardInterface[]; // shortcut to group card skin by card.details.name
  singleUseOnly: boolean;
  deletedAt: Date | null;
}
export interface CardGeneral {
  id: string;
  type: CardTypes;
  fp: number;
  country?: null | string;
  details?: CardDetails;
  refinementLevel?: number;
  singleUseOnly?: boolean;
}

export interface CardDetails {
  id?: string;
  name?: string;
  description?: string;
  rarity?: null | string;
  lane?: null | string;
  image?: string;
  cardId?: string;
  teamId?: string;
  team?: null | Partial<TeamInterface>;
}

export interface FavCards {
  userCardId?: string;
  favourite?: boolean;
}

export interface FavCardData {
  id?: string;
  cards?: UserCardInterface[];
}
