import { UserCardInterface, TeamInterface, GameInterface, ResultInterface } from '.';
import { User } from '../store/slices/user.slice';
import { ScoreInterface } from './score.interface';

export const slots = [
  'leader',
  'support1',
  'support2',
  'player1',
  'player2',
  'player3',
  'player4',
  'player5',
] as const;

export interface DraftInterface {
  draft: DraftBreakdown;
  results?: ResultInterface;
}
export interface DraftField {
  id?: string;
  leaderUserCardId?: string | null;
  player1UserCardId?: string | null;
  player2UserCardId?: string | null;
  player3UserCardId?: string | null;
  player4UserCardId?: string | null;
  player5UserCardId?: string | null;
  support1UserCardId?: string | null;
  support2UserCardId?: string | null;
  teamWinId: string;
  teamLoseId: string;
  gameId: string;
  userId: string;
  score?: number | null;
  //shortcut for skin
  baseLeaderUserCardId?: string | null;
  basePlayer1UserCardId?: string | null;
  basePlayer2UserCardId?: string | null;
  basePlayer3UserCardId?: string | null;
  basePlayer4UserCardId?: string | null;
  basePlayer5UserCardId?: string | null;
  baseSupport1UserCardId?: string | null;
  baseSupport2UserCardId?: string | null;

  [key: string]: string | number | null | undefined;
}

export interface DraftBreakdown {
  id?: string;
  user?: User;
  userId?: string;
  gameId?: string;
  game?: GameInterface;
  score?: ScoreInterface;
  leader?: null | UserCardInterface;
  support1?: null | UserCardInterface;
  support2?: null | UserCardInterface;
  player1?: null | UserCardInterface;
  player2?: null | UserCardInterface;
  player3?: null | UserCardInterface;
  player4?: null | UserCardInterface;
  player5?: null | UserCardInterface;
  teamWin?: null | TeamInterface;
  teamLose?: null | TeamInterface;
  [key: string]: undefined | string | null | UserCardInterface | TeamInterface | ScoreInterface | Date;
  // shortcut for skin
  baseLeader?: null | UserCardInterface;
  baseSupport1?: null | UserCardInterface;
  baseSupport2?: null | UserCardInterface;
  basePlayer1?: null | UserCardInterface;
  basePlayer2?: null | UserCardInterface;
  basePlayer3?: null | UserCardInterface;
  basePlayer4?: null | UserCardInterface;
  basePlayer5?: null | UserCardInterface;

  createdAt?: string | Date;
}
