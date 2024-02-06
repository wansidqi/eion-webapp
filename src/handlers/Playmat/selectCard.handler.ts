import { useQueriesHandler } from '..';
import { UserCardInterface } from '../../interface';
import { useRepositories } from '../../repositories';
import { useBoundStore } from '../../store';
import { CardTypes, DraftCardsEnum, ModalPlaymat, RarityTypes } from '../../types';
import { setBaseSlotName } from '../../utils';

export function useSelectCardHandler() {
  const { matchQry, userQry } = useQueriesHandler();
  const { playmat, setPlaymatState } = useBoundStore();
  const { useGetInventory } = useRepositories();

  const { cardTypes, modalCardSelection, draftUI } = playmat;
  const { data: inventory } = useGetInventory(userQry.id);

  const team1 = matchQry?.team1?.shortName;
  const team2 = matchQry?.team2?.shortName;

  const displayCards = inventory?.cards
    ?.filter(card => card?.card?.details?.rarity === RarityTypes.basic)
    ?.filter(card => card?.card?.type === cardTypes);

  const filterPlayerCardsByTeam = displayCards?.filter(card =>
    [team1, team2].includes(card?.card?.details?.team?.shortName as string)
  );

  const checkingCardSelected = (item: UserCardInterface) => {
    return (
      item.id === draftUI?.draft.baseLeader?.id ||
      item.card?.details?.name === draftUI?.draft.baseLeader?.card?.details?.name ||
      item.card?.details?.name === draftUI?.draft.baseSupport1?.card?.details?.name ||
      item.card?.details?.name === draftUI?.draft.baseSupport2?.card?.details?.name ||
      item.id === draftUI?.draft.baseSupport1?.id ||
      item.id === draftUI?.draft.baseSupport2?.id ||
      item.id === draftUI?.draft.basePlayer1?.id ||
      item.id === draftUI?.draft.basePlayer2?.id ||
      item.id === draftUI?.draft.basePlayer3?.id ||
      item.id === draftUI?.draft.basePlayer4?.id ||
      item.id === draftUI?.draft.basePlayer5?.id 

    );
  };

  const sortingCards = (cards: UserCardInterface[] | undefined) => {
    return cards
      ?.sort((a, b) => {
        const nameA = (a?.card?.details?.name || '').toLowerCase();
        const nameB = (b?.card?.details?.name || '').toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
      .sort((a, b) => {
        const isSelectedA = checkingCardSelected(a);
        const isSelectedB = checkingCardSelected(b);

        if (isSelectedA && !isSelectedB) return -1;
        if (!isSelectedA && isSelectedB) return 1;

        return 0;
      });
  };

  const handleSelectRarity = (modal: ModalPlaymat, i: UserCardInterface | null, modalPreviewMode: 'add' | 'update') => {
    setPlaymatState({
      selectItem: i,
      selectBaseItem: i,
      modalRaritySelection: { [modal]: true },
      modalPreviewMode,
    });
  };

  const checkSlotIndicator = (card: DraftCardsEnum | null, item: UserCardInterface) => {
    return (
      draftUI?.draft[card!]?.id === item?.id ||
      //@ts-ignore
      draftUI?.draft[setBaseSlotName(card!)]?.id === item?.id
    );
  };

  const handleCloseModal = (modal: ModalPlaymat) => {
    setPlaymatState({ modalCardSelection: { ...modalCardSelection, [modal]: false } });
  };

  const cards = cardTypes === CardTypes.PLAYER ? sortingCards(filterPlayerCardsByTeam) : sortingCards(displayCards);

  return { cards, handleSelectRarity, checkSlotIndicator, handleCloseModal, checkingCardSelected };
}
