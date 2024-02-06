import { useParams } from 'react-router-dom';
import {
  DraftInterface,
  GameInterface,
  InventoryInterface,
  InvokeDraftInterface,
  InvokeState,
  MatchInterface,
  SeasonInterface,
  TeamInterface,
} from '../interface';
import { useGetQueryData, AuthResponse, RQ_KEY } from '../repositories';

export function useQueriesHandler() {
  const { gameID, matchID } = useParams();

  const userQry = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;
  const matchQry = useGetQueryData<MatchInterface>([RQ_KEY.MATCH, matchID]);
  const matchesQry = useGetQueryData<MatchInterface[]>([RQ_KEY.MATCHES]);
  const teamQry = useGetQueryData<TeamInterface>([RQ_KEY.TEAM]);
  const inventoryQry = useGetQueryData<InventoryInterface>([RQ_KEY.INVENTORY]);

  const draftQry = useGetQueryData<DraftInterface>([RQ_KEY.DRAFT, gameID]);
  // delete draftQry.draft?.support3UserCardId;
  // delete draftQry.draft?.baseSupport3UserCardId;

  const invokeQry = useGetQueryData<InvokeDraftInterface>([RQ_KEY.INVOKE]);
  const invokeStateQry = useGetQueryData<InvokeState[]>([RQ_KEY.INVOKE_STATE]);
  const seasonQry: SeasonInterface = useGetQueryData([RQ_KEY.SEASON]);

  const gameQry = useGetQueryData<GameInterface>([RQ_KEY.GAME, gameID]);
  const gamesQry = matchQry?.games?.sort(function (a, b) {
    var numA = parseInt((a?.name?.match(/\d+/) || ['0'])[0]);
    var numB = parseInt((b?.name?.match(/\d+/) || ['0'])[0]);
    return numA - numB;
  });

  const team1 = matchQry?.team1;
  const team2 = matchQry?.team2;
  const gameName = gamesQry?.find(game => game.id === gameID)?.name;

  const currentIndex = gamesQry?.findIndex(game => game?.id === gameID) ?? -1;
  const previousGameId = currentIndex !== -1 ? gamesQry[currentIndex - 1]?.id : undefined;

  const booleanQry = {
    isDraftLocked: Boolean(gamesQry?.[currentIndex]?.lockDraft),
    isDraftExists: Boolean(draftQry?.draft),
    isGame1: currentIndex === 0,
  };

  return {
    userQry,
    matchQry,
    matchesQry,
    teamQry,
    inventoryQry,
    gameQry,
    gamesQry,
    draftQry,
    previousGameId,
    currentIndex,
    booleanQry,
    team1,
    team2,
    gameName,
    invokeQry,
    seasonQry,
    invokeStateQry,
  };
}
