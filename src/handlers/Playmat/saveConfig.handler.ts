import { useQueriesHandler } from '..';
import { DraftInterface } from '../../interface';
import { useRepositories } from '../../repositories';
import { useBoundStore } from '../../store';

export function useSaveConfigHandler() {
  const { userQry } = useQueriesHandler();
  const { useGetAllDraftsByUserId } = useRepositories();
  const { setPlaymatState, playmat } = useBoundStore();

  const { draftUI } = playmat;

  const { data: userDraftLists } = useGetAllDraftsByUserId(userQry.id);

  const recentDraft =
    userDraftLists && userDraftLists.length > 0
      ? userDraftLists.reduce((latest, current) => {
          const currentCreatedAt = new Date(current?.createdAt as string);
          const latestCreatedAt = new Date(latest?.createdAt as string);
          return currentCreatedAt > latestCreatedAt ? current : latest;
        })
      : null;

  const configDraftUI: DraftInterface = { draft: {} };
  if (recentDraft) {
    for (const [key, value] of Object.entries(recentDraft)) {
      const isKey = ['support', 'leader'].some(substring => key.toLowerCase().includes(substring));
      const availableKey = recentDraft[key];
      if (isKey && availableKey) configDraftUI.draft[key] = value;
    }
  }

  const handleUseConfig = () => {
    setPlaymatState({
      draftUI: {
        draft: {
          ...draftUI.draft,
          ...configDraftUI.draft,
        },
      },
      configDraftModal: false,
    });
  };

  const hasPrevDraft = userDraftLists && userDraftLists?.length > 0;

  return { hasPrevDraft, handleUseConfig };
}
