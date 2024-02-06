import { DraftInterface, MatchInterface } from '.';

export interface GameInterface {
  id: string;
  lockGame: boolean;
  lockDraft: boolean;
  name: string;
  matchId: string;
  winner?: string;
  draft: DraftInterface;
  match?: MatchInterface;
}
