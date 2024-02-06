import { useParams } from 'react-router-dom';
import { useQueriesHandler } from '..';
import { DraftField, DraftInterface, TeamInterface, UserCardInterface, slots } from '../../interface';
import { useBoundStore } from '../../store';
import { setBaseSlotName } from '../../utils';
import { useRepositories } from '../../repositories';
import { LockMessage } from '../../components';
import { useEffect } from 'react';

export function useLockDraftHandler() {
  const { gameID } = useParams();
  const { playmat, setPlaymatState } = useBoundStore();
  const { draftQry, userQry } = useQueriesHandler();
  const { usePostDraft, useUpdateDraft, useUpdateSingleUseUserCard } = useRepositories();

  const { draftUI, lockDraft, message } = playmat;
  const { mutateAsync: postDraft, isSuccess } = usePostDraft(gameID as string);
  const { mutateAsync: updateDraft } = useUpdateDraft(gameID as string);
  const { mutateAsync: updateSingleUseUserCard } = useUpdateSingleUseUserCard();

  const draftField = { userId: userQry.id, gameId: gameID } as DraftField;
  for (const [key, value] of Object.entries(draftUI.draft)) {
    const draftValue = value as UserCardInterface & TeamInterface;
    const isCard = ['player', 'support', 'leader'].some(substring => key.toLowerCase().includes(substring));
    const fieldKey = isCard ? `${key}UserCardId` : `${key}Id`;
    draftField[fieldKey as keyof DraftField] = draftValue?.id ?? null;
  }
  delete draftField.support3UserCardId;
  delete draftField.baseSupport3UserCardId;

  const overwriteDraftUI: DraftInterface = { draft: {} };
  if (draftQry && draftQry.draft && typeof draftQry.draft === 'object') {
    for (const [key, value] of Object.entries(draftQry.draft)) {
      const isKey = ['player', 'support', 'leader', 'team'].some(substring => key.toLowerCase().includes(substring));
      if (isKey) overwriteDraftUI.draft[key] = value;
    }
  }

  function singleUseOnlyCardsToBeDeleted(): Omit<UserCardInterface, 'card' | 'skins'>[] {
    const singleUseOnly: Omit<UserCardInterface, 'card' | 'skins'>[] = [];

    slots.forEach(slot => {
      let uc = draftUI.draft[setBaseSlotName(slot)] as UserCardInterface;

      if (Boolean(uc?.singleUseOnly)) {
        const { card, skins, ...userCard } = uc;

        userCard.favourite = Boolean(userCard.favourite);
        userCard.singleUseOnly = Boolean(userCard.singleUseOnly);
        userCard.deletedAt = new Date();

        singleUseOnly.push(userCard);
      }
    });
    return singleUseOnly;
  }

  function singleUseOnlyCardToUpdate(): Omit<UserCardInterface, 'card' | 'skins'>[] {
    const singleUseOnly: Omit<UserCardInterface, 'card' | 'skins'>[] = [];

    let before: Record<string, Omit<UserCardInterface, 'card' | 'skins'>> = {};
    let after: Record<string, Omit<UserCardInterface, 'card' | 'skins'>> = {};

    slots.forEach(slot => {
      let initial = draftQry?.draft[setBaseSlotName(slot)] as UserCardInterface;
      let final = draftUI?.draft[setBaseSlotName(slot)] as UserCardInterface;

      const initialSingleUseOnly = Boolean(initial?.singleUseOnly);
      const finalSingleUseOnly = Boolean(final?.singleUseOnly);

      if (initialSingleUseOnly) {
        const { card, skins, ...userCard } = initial as UserCardInterface;
        userCard.favourite = Boolean(userCard.favourite);
        userCard.singleUseOnly = Boolean(userCard.singleUseOnly);
        before[userCard.id as string] = userCard as UserCardInterface;
      }

      if (finalSingleUseOnly) {
        const { card, skins, ...userCard } = final as UserCardInterface;
        userCard.favourite = Boolean(userCard.favourite);
        userCard.singleUseOnly = Boolean(userCard.singleUseOnly);
        after[userCard.id as string] = userCard as UserCardInterface;
      }
    });

    Object.keys(before).forEach(baseUserCardId => {
      if (after[baseUserCardId]) {
        delete before[baseUserCardId];
        delete after[baseUserCardId];
      }
    });

    Object.values(before).forEach(userCard => {
      userCard.deletedAt = null;
      singleUseOnly.push(userCard);
    });

    Object.values(after).forEach(userCard => {
      userCard.deletedAt = new Date();
      singleUseOnly.push(userCard);
    });

    return singleUseOnly;
  }

  function handleUpdateDraftField() {
    const { gameId, userId, ...rest } = draftField;
    return updateDraft({ draftId: draftQry?.draft.id as string, data: rest });
  }

  const onClickLock = async ({
    mode,
    callback: execute,
  }: {
    mode: 'POST' | 'PATCH';
    callback: () => Promise<void>;
  }) => {
    setPlaymatState({ showLoading: true });

    try {
      await execute();

      if (mode === 'POST') {
        const cards = singleUseOnlyCardsToBeDeleted();
        if (cards.length > 0) await updateSingleUseUserCard({ userId: userQry.id, data: cards });
      }

      if (mode === 'PATCH') {
        const cards = singleUseOnlyCardToUpdate();
        if (cards.length > 0) await updateSingleUseUserCard({ userId: userQry.id, data: cards });
      }
      setPlaymatState({
        lockDraft: true,
        showLoading: false,
        message: 'Draft Successfully Saved: Your draft has been successfully saved. Your selections are now secured',
      });
    } catch (error) {
      setPlaymatState({
        lockDraft: false,
        showLoading: false,
        message: 'Draft Not Saved: An error occurred while attempting to save your draft. Please try again later',
      });
      console.log(error);
    }
  };

  const handleToggleButton = () => {
    if (!lockDraft) {
      draftQry && draftQry?.draft?.id
        ? onClickLock({
            mode: 'PATCH',
            callback: () => handleUpdateDraftField(),
          })
        : onClickLock({
            mode: 'POST',
            callback: () => postDraft(draftField),
          });
    } else {
      setPlaymatState({
        draftUI: overwriteDraftUI,
        lockDraft: false,
        message: 'Draft Successfully Unlocked: Your draft has been successfully unlocked. You can change your draft',
      });
    }
  };

  const MessageComponent = () => {
    return (
      <>
        {isSuccess && <LockMessage message={message} />}
        {!isSuccess && <LockMessage message={message} />}
      </>
    );
  };

  useEffect(() => {
    setPlaymatState({ lockDraft: Boolean(draftQry) });
  }, [draftQry, gameID]);

  return { handleToggleButton, MessageComponent };
}
