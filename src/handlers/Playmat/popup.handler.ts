import { useEffect } from 'react';
import { useQueriesHandler } from '..';
import { useRepositories } from '../../repositories';
import { useBoundStore } from '../../store';

export function usePopupHandler() {
  const { userQry, currentIndex, previousGameId, booleanQry } = useQueriesHandler();
  const { isDraftExists, isDraftLocked, isGame1 } = booleanQry;

  const { setPlaymatState } = useBoundStore();
  const { useGetDraft } = useRepositories();

  const { data: previousDraft, isLoading } = useGetDraft(userQry.id, previousGameId as string);

  useEffect(() => {
    async function init() {
      const isPreviousDraftExists = Boolean(previousDraft?.draft);

      if (!isGame1 && !isDraftLocked && !isDraftExists && isPreviousDraftExists) {
        setPlaymatState({ sameDraftModal: true, showVote: false });
        return;
      }

      if (!isDraftLocked && !isDraftExists && !isLoading) {
        setPlaymatState({ sameDraftModal: false, showVote: true });
        return;
      }

      setPlaymatState({ sameDraftModal: false, showVote: false });
      return;
    }
    init();
  }, [currentIndex, previousDraft]);
}
