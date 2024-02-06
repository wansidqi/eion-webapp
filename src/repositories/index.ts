import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { AuthenticationRepository } from './authentication.repository';
import { UserRepository } from './user.repository';
import { TeamRepository } from './team.repository';
import { MatchRepository } from './match.repository';
import { GameRepository } from './game.repository';
import { DraftRepository } from './draft.repository';
import { InventoryRepository } from './inventory.repository';
import { InvokeRepository } from './invoke.repository';
import { ResultRepository } from './result.repository';
import { LeaderboardRepository } from './leaderboard.repository';
import { BoosterPackRepository } from './booster-pack.repository';
import { PaymentRepository } from './payment.repository';
import { SeasonRepository } from './season.repository';
import { ReferralRepository } from './referral.repository';

export enum RQ_KEY {
  POST_LOGIN = 'post_login',
  CHECK_EMAIL = 'check_email',
  USER_DATA = 'user_data',
  OTHER_USER = 'other_user',
  TEAMS = 'teams',
  TEAM = 'team',
  MATCHES = 'matches',
  LOCKSTATUS = 'lock_status',
  MATCH = 'match',
  MY_MATCH = 'my_match',
  OTHER_MATCH = 'other_match',
  GAMES = 'games',
  GAME = 'game',
  INVENTORY = 'inventory',
  OTHER_INVENTORY = 'other_inventory',
  FAV_CARD = 'fav_card',
  OTHER_FAV_CARD = 'other_fav_card',
  DRAFT = 'draft',
  DRAFT_USER = 'draft user',
  RESULT = 'result',
  INVOKE = 'invoke',
  LEADERBOARD = 'leaderboard',
  LP = 'lp',
  BOOSTER_PACK = 'booster_pack',
  CHECK_BALANCE = 'check_balance',
  CODE = 'code',
  STRIPE_PUBLISHABLE_KEY = 'stripe_publishable_key',
  STRIPE_CHECKOUT_SESSION = 'stripe_checkout_session',
  GLOBAL_RANK = 'global rank',
  SEASON = 'season',
  INVOKE_STATE = 'invoke state',
}

export function useGetQueryData<T>(key: QueryKey): T {
  return useQueryClient().getQueryData(key) as T;
}

export const useRepositories = () => ({
  ...AuthenticationRepository,
  ...BoosterPackRepository,
  ...UserRepository,
  ...TeamRepository,
  ...MatchRepository,
  ...GameRepository,
  ...DraftRepository,
  ...InventoryRepository,
  ...InvokeRepository,
  ...ResultRepository,
  ...LeaderboardRepository,
  ...PaymentRepository,
  ...SeasonRepository,
  ...ReferralRepository,
});

export * from './authentication.repository';
export * from './booster-pack.repository';
export * from './draft.repository';
export * from './game.repository';
export * from './inventory.repository';
export * from './match.repository';
export * from './team.repository';
export * from './user.repository';
export * from './invoke.repository';
export * from './leaderboard.repository';
export * from './payment.repository';
export * from './season.repository';
