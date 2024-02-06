import { useQueriesHandler } from '..';
import { RoleInvoke, UserCardInterface } from '../../interface';
import { useBoundStore } from '../../store';

export function useSelectCardInvokeHandler(role: RoleInvoke) {
  const { inventoryQry } = useQueriesHandler();
  const { invoke, setInvokeState } = useBoundStore();
  const { invokeDraft, modalPlayerSelection } = invoke;

  const checkCardSelected = (item: UserCardInterface) => {
    return (
      item.id === invokeDraft.draft?.basePlayer1?.id ||
      item.id === invokeDraft.draft?.basePlayer2?.id ||
      item.id === invokeDraft.draft?.basePlayer3?.id ||
      item.id === invokeDraft.draft?.basePlayer4?.id ||
      item.id === invokeDraft.draft?.basePlayer5?.id
    );
  };

  const filteredCards: UserCardInterface[] | undefined = inventoryQry?.cards
    ?.filter(card => card?.card?.details?.lane === role && card?.card.details.rarity === 'basic')
    ?.filter(noTrial => !noTrial?.singleUseOnly);

  const sortingCards = (cards: UserCardInterface[] | undefined) => {
    return cards
      ?.sort((a, b) => {
        const teamNameA = (a?.card?.details?.team?.name || '').toLowerCase();
        const teamNameB = (b?.card?.details?.team?.name || '').toLowerCase();

        if (teamNameA < teamNameB) return -1;
        if (teamNameA > teamNameB) return 1;

        return 0;
      })
      ?.sort((a, b) => {
        const nameA = (a?.card?.details?.name || '').toLowerCase();
        const nameB = (b?.card?.details?.name || '').toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
      ?.sort((a, b) => {
        const isSelectedA = checkCardSelected(a);
        const isSelectedB = checkCardSelected(b);

        if (isSelectedA && !isSelectedB) return -1;
        if (!isSelectedA && isSelectedB) return 1;

        return 0;
      });
  };

  let cardsRole = sortingCards(filteredCards);

  const handleOpenModalSelectRarity = (
    i: UserCardInterface | null,
    role: RoleInvoke,
    modalPreviewMode: 'add' | 'update'
  ) => {
    setInvokeState({ selectItem: i, selectBaseItem: i, selectRarityModal: { [role]: true }, modalPreviewMode });
  };

  const handleCloseSelectCardModal = () => {
    setInvokeState({ modalPlayerSelection: { ...modalPlayerSelection, [role]: false } });
  };

  return { cardsRole, handleOpenModalSelectRarity, checkCardSelected, handleCloseSelectCardModal };

  //check is invokeDraft.draft selected (to filter)
  // const checkInclude = (item: UserCardInterface) => invokeDraft.draft[player]?.id === item.id;

  // const handleRemoveCard = () => {
  //   let updatedInvokeDraft = { ...invokeDraft.draft };
  //   updatedInvokeDraft = { ...updatedInvokeDraft, [player]: null };
  //   setInvokeState({ invokeDraft.draft: updatedInvokeDraft });
  // };
}
