import { useParams } from 'react-router-dom';
import { useQueriesHandler } from '..';
import { UserCardInterface, slots } from '../../interface';
import { useRepositories } from '../../repositories';
import { setBaseSlotName } from '../../utils';
import { useBoundStore } from '../../store';
import { initialDraft } from '../../store/slices/playmat.slice';
import { useEffect } from 'react';

export function useClearDraftHandler() {
  const { matchID, gameID } = useParams();
  const { draftQry, userQry } = useQueriesHandler();
  const { useDeleteDraft, useUpdateSingleUseUserCard, useGetDraft } = useRepositories();
  const { setPlaymatState } = useBoundStore();

  const { refetch: refetchDraft } = useGetDraft(userQry.id, gameID as string);
  const { mutateAsync: deleteDraft, data: deleteRes } = useDeleteDraft(matchID as string);
  const { mutateAsync: updateSingleUseUserCard } = useUpdateSingleUseUserCard();

  useEffect(() => {
    refetchDraft();
  }, [deleteRes]);

  function singleUseOnlyCardToRestore() {
    const singleUseOnly: Omit<UserCardInterface, 'card' | 'skins'>[] = [];

    slots.forEach(slot => {
      let uc = draftQry.draft[setBaseSlotName(slot)] as UserCardInterface;

      if (Boolean(uc?.deletedAt)) {
        const { card, skins, ...userCard } = uc;

        userCard.favourite = Boolean(userCard.favourite);
        userCard.singleUseOnly = Boolean(userCard.singleUseOnly);
        userCard.deletedAt = null;

        singleUseOnly.push(userCard);
      }
    });
    return singleUseOnly;
  }

  const handleClearDraft = async () => {
    if (draftQry && draftQry?.draft?.id) {
      try {
        await deleteDraft(draftQry?.draft?.id);

        const cards = singleUseOnlyCardToRestore();
        if (cards.length > 0) await updateSingleUseUserCard({ userId: userQry.id, data: cards });
        setPlaymatState({
          draftUI: initialDraft,
          clearDraftModal: false,
          message: 'Draft Successfully Clear: Your draft has been successfully clear.',
        });
      } catch (error) {
        setPlaymatState({
          message: 'Draft Failed to Clear: Your draft has been failed to clear.',
        });
      }
    } else {
      setPlaymatState({ draftUI: initialDraft, clearDraftModal: false });
    }
  };

  const cancelClearDraft = () => {
    setPlaymatState({ clearDraftModal: false });
  };

  return { handleClearDraft, cancelClearDraft };
}
