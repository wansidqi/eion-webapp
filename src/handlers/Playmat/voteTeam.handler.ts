import { useState } from 'react';
import { useQueriesHandler, useSaveConfigHandler } from '..';
import { TeamInterface } from '../../interface';
import { useBoundStore } from '../../store';
import { useRepositories } from '../../repositories';

export function useVoteTeamHandler() {
  const { userQry, previousGameId, booleanQry, team1, team2 } = useQueriesHandler();
  const { hasPrevDraft } = useSaveConfigHandler();
  const { playmat, setPlaymatState } = useBoundStore();
  const { useGetDraft } = useRepositories();

  const { isDraftExists, isDraftLocked } = booleanQry;
  const { draftUI } = playmat;

  const [selectTeam, setSelectTeam] = useState<TeamInterface | null>(null);

  const { data: previousDraft } = useGetDraft(userQry.id, previousGameId || '');
  const isPreviousDraftExists = Boolean(previousDraft?.draft);

  const handleVoteTeam = () => {
    setPlaymatState({
      draftUI: {
        ...draftUI,
        draft: {
          teamWin: selectTeam,
          teamLose: selectTeam === team1 ? team2 : team1,
        },
      },
      showVote: false,
      configDraftModal: !isPreviousDraftExists && hasPrevDraft && !isDraftLocked && !isDraftExists,
    });
  };

  return { handleVoteTeam, selectTeam, setSelectTeam };
}
