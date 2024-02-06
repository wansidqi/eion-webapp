import { useNavigate, useParams } from 'react-router-dom';
import { MatchInterface } from '../interface';
import { useBoundStore } from '../store';
import { MatchStatus, MatchTypes, RegionFilter } from '../types';
import blue from '/assets/images/Lobby/blue.png';
import clear from '/assets/images/Lobby/clear.png';
import red from '/assets/images/Lobby/red.png';
import { useQueriesHandler } from '.';
import { useRepositories } from '../repositories';

export function useMatchHandler() {
  const { matchesQry, userQry } = useQueriesHandler();

  const navigate = useNavigate();
  const { userID } = useParams();
  const { lobby } = useBoundStore();
  const { matchStatus, regionFilter, matchType } = lobby;

  const { useGetMyMatch, useGetOtherMatch } = useRepositories();
  const { data: otherMatch } = useGetOtherMatch(userID as string);
  const { data: myMatch } = useGetMyMatch(userQry.id);

  let matches = (Boolean(userID) ? otherMatch : matchType === MatchTypes.MY_MATCH ? myMatch : matchesQry)
    ?.filter((match: MatchInterface) =>
      regionFilter === RegionFilter.ALL
        ? match.status === matchStatus
        : match.country === regionFilter && match.status === matchStatus
    )
    .sort((a: any, b: any) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return matchStatus === MatchStatus.PAST ? dateB - dateA : dateA - dateB;
    }) as MatchInterface[];

  const liveMatches = matchesQry
    ?.filter((match: MatchInterface) => match.status === MatchStatus.LIVE)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return dateA - dateB;
    }) as MatchInterface[];

  const winIndicator = (i: number): string[] => {
    const match = matches[i];
    if (!match) return [];

    const team1 = match.team1?.id;

    if (!team1) return [];

    const result =
      match.games?.map(game => {
        const winner = game?.winner;
        if (winner === null) return clear;
        return winner === team1 ? blue : red;
      }) || [];

    const blueElements = result.filter(element => element === blue);
    const redElements = result.filter(element => element === red);
    const clearElements = result.filter(element => element === clear);

    return [...blueElements, ...clearElements, ...redElements];
  };

  const findActiveGame = (i: number) => {
    return (
      matches[i]?.games
        ?.sort(function (a, b) {
          var numA = parseInt((a?.name?.match(/\d+/) || ['0'])[0]);
          var numB = parseInt((b?.name?.match(/\d+/) || ['0'])[0]);
          return numA - numB;
        })
        ?.find(game => Boolean(!game?.lockDraft))?.name ?? 'LOCKED'
    );
  };

  const handleEnterMatch = (redirect: ((match: MatchInterface) => any) | undefined, match: MatchInterface) => {
    redirect ? redirect(match) : navigate(`/match/${match.id}`);
  };

  return { winIndicator, findActiveGame, handleEnterMatch, matches, liveMatches };
}
