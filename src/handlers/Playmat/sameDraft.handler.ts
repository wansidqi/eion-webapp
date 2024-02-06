import { useParams } from 'react-router-dom';
import { DraftInterface, DraftField, slots, UserCardInterface, TeamInterface } from '../../interface';
import { useRepositories } from '../../repositories';
import { setBaseSlotName } from '../../utils';
import { useBoundStore } from '../../store';
import { useQueriesHandler } from '..';
import { initialDraft } from '../../store/slices/playmat.slice';

export function useSameDraftHandler() {
  const { gameID } = useParams();
  const { setPlaymatState } = useBoundStore();
  const { usePostDraft, useGetDraft } = useRepositories();
  const { userQry, previousGameId } = useQueriesHandler();

  const { data: draftData } = useGetDraft(userQry.id, previousGameId || '');
  const { mutateAsync: postDraft } = usePostDraft(gameID || '');

  const sameDraftUI: DraftInterface = { draft: {} };
  if (draftData && draftData.draft && typeof draftData.draft === 'object') {
    for (const [key, value] of Object.entries(draftData.draft)) {
      const isKey = ['player', 'skill', 'support', 'leader', 'team'].some(substring =>
        key.toLowerCase().includes(substring)
      );
      if (isKey) sameDraftUI.draft[key] = value;
    }
  }

  const draftField = { userId: userQry.id, gameId: gameID } as DraftField;
  for (const [key, value] of Object.entries(sameDraftUI.draft)) {
    const draftValue = value as UserCardInterface & TeamInterface;
    const isCard = ['player', 'skill', 'support', 'leader'].some(substring => key.toLowerCase().includes(substring));
    const fieldKey = isCard ? `${key}UserCardId` : `${key}Id`;
    if (sameDraftUI?.draft[key]) draftField[fieldKey as keyof DraftField] = draftValue?.id ?? null;
  }

  const postDrafts = async () => {
    setPlaymatState({ showLoading: true });
    try {
      setPlaymatState({
        lockDraft: true,
        message:
          'Draft Successfully Saved: Your draftData has been successfully saved. Your selections are now secured',
      });
      await postDraft(draftField);
      setPlaymatState({ showLoading: false });
    } catch (error) {
      setPlaymatState({
        lockDraft: false,
        message: 'Draft Not Saved: An error occurred while attempting to save your draftData. Please try again later',
      });

      console.log(error);
      setPlaymatState({ showLoading: false });
    }
  };

  const handleUseSameDraft = async () => {
    setPlaymatState({ sameDraftModal: false });

    slots.forEach(slot => {
      let userCard = sameDraftUI.draft[setBaseSlotName(slot)] as UserCardInterface;

      if (Boolean(userCard?.deletedAt)) {
        draftField[`${slot}UserCardId`] = null;
        draftField[`${setBaseSlotName(slot)}UserCardId`] = null;
      }
    });

    postDrafts();
  };

  const handleCancelUseSameDraft = () => {
    setPlaymatState({ sameDraftModal: false, showVote: true });
    draftData && setPlaymatState({ draftUI: initialDraft });
    // draftData && setPlaymatState({ draftUI: sameDraftUI });
  };

  return { handleUseSameDraft, handleCancelUseSameDraft };
}
