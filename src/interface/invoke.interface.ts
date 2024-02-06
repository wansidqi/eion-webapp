import { RewardsInterface, UserCardInterface } from '.';
import { User } from '../store/slices/user.slice';

export interface InvokeInterface {
  dtScore?: null | number;
  player1?: UserCardInterface;
  player2?: UserCardInterface;
  player3?: UserCardInterface;
  player4?: UserCardInterface;
  player5?: UserCardInterface;
  basePlayer1?: UserCardInterface;
  basePlayer2?: UserCardInterface;
  basePlayer3?: UserCardInterface;
  basePlayer4?: UserCardInterface;
  basePlayer5?: UserCardInterface;
  [key: string]: undefined | null | number | UserCardInterface;
}
export interface InvokeField {
  id?: string;
  player1UserCardId?: string;
  player2UserCardId?: string;
  player3UserCardId?: string;
  player4UserCardId?: string;
  player5UserCardId?: string;
  basePlayer1UserCardId?: string;
  basePlayer2UserCardId?: string;
  basePlayer3UserCardId?: string;
  basePlayer4UserCardId?: string;
  basePlayer5UserCardId?: string;
  userId: string;
  [key: string]: string | undefined | null;
}

export const InvokeKeys = [
  'userId',
  'player1UserCardId',
  'player2UserCardId',
  'player3UserCardId',
  'player4UserCardId',
  'player5UserCardId',
  'basePlayer1UserCardId',
  'basePlayer2UserCardId',
  'basePlayer3UserCardId',
  'basePlayer4UserCardId',
  'basePlayer5UserCardId',
];

export enum RoleInvoke {
  EXP = 'exp',
  MID = 'mid',
  GOLD = 'gold',
  JUNGLE = 'jungle',
  ROAM = 'roam',
}

export enum PlayerInvoke {
  player1 = 'player1',
  player2 = 'player2',
  player3 = 'player3',
  player4 = 'player4',
  player5 = 'player5',
}

export interface InvokeCards {
  User?: User;
  player1: null | UserCardInterface;
  player2: null | UserCardInterface;
  player3: null | UserCardInterface;
  player4: null | UserCardInterface;
  player5: null | UserCardInterface;
  basePlayer1: null | UserCardInterface;
  basePlayer2: null | UserCardInterface;
  basePlayer3: null | UserCardInterface;
  basePlayer4: null | UserCardInterface;
  basePlayer5: null | UserCardInterface;
  [key: string]: null | UserCardInterface | User | undefined;
}

export type InvokeResults = Record<
  'basePlayer1' | 'basePlayer2' | 'basePlayer3' | 'basePlayer4' | 'basePlayer5',
  { kill: number | null | undefined; death: number | null | undefined; assist: number | null | undefined }
>;

export interface InvokeState {
  id: number | string;
  locked: boolean;
  startDate: string | Date;
  endDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface InvokeDraftInterface {
  draft: InvokeCards;
  results?: InvokeResults;
  rewards?: RewardsInterface[];
}
