import { useQueriesHandler } from '..';
import { UserCardInterface } from '../../interface';
import { useBoundStore } from '../../store';
import { DraftCardsEnum, ModalPlaymat, RarityTypes } from '../../types';
import { setBaseSlotName } from '../../utils';

interface CardModal {
  card: DraftCardsEnum | null;
  modal: ModalPlaymat;
  nextModal: ModalPlaymat | null;
}

export function useSelectRarityHandler() {
  const { inventoryQry } = useQueriesHandler();
  const { playmat, setPlaymatState } = useBoundStore();

  const { modalRaritySelection, selectItem, selectBaseItem, draftUI, modalCardSelection } = playmat;

  const matchedCard = inventoryQry?.cards?.filter(
    card => card?.card?.details?.name === selectItem?.card?.details?.name
  );

  function getRarityType(type: RarityTypes) {
    return matchedCard?.filter(card => card?.card?.details?.rarity === type) || [];
  }

  function getRarityImage(cards: UserCardInterface[]) {
    return cards?.[0]?.card?.details?.image;
  }

  const rarityTypes = [RarityTypes.silver, RarityTypes.gold, RarityTypes.aa];

  const rarity = rarityTypes.map(type => ({
    type: getRarityType(type),
    display: getRarityImage(getRarityType(type)),
  }));

  rarity.unshift({
    type: selectBaseItem ? [selectBaseItem] : [],
    display: selectBaseItem?.card?.details?.image,
  });

  const checkingRarityPicked = (item: UserCardInterface | null) => {
    return (
      item?.id === draftUI.draft.player1?.id ||
      item?.id === draftUI.draft.player2?.id ||
      item?.id === draftUI.draft.player3?.id ||
      item?.id === draftUI.draft.player4?.id ||
      item?.id === draftUI.draft.player5?.id
    );
  };

  const handleSelectSkin = (cards: UserCardInterface[]) => {
    if (cards && cards?.length > 0) {
      let shuffledCards = [...cards];
      for (let i = shuffledCards?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
      }

      for (const card of shuffledCards) {
        if (!checkingRarityPicked(card)) {
          setPlaymatState({ selectItem: card });
          return card;
        }
      }
    }
    return null;
  };

  const handleAddCard = ({ card, modal, nextModal }: CardModal) => {
    setPlaymatState({
      modalCardSelection: { ...modalCardSelection, [modal]: false, [nextModal!]: true },
      modalRaritySelection: { ...modalRaritySelection, [modal]: false },
      draftUI: {
        draft: {
          ...draftUI.draft,
          [card!]: selectItem,
          [setBaseSlotName(card!)]: selectBaseItem,
        },
      },
    });
  };

  const handleRemoveCard = ({ card, modal }: Partial<CardModal>) => {
    let updatedDraftUI = { ...draftUI };
    updatedDraftUI = {
      draft: {
        ...updatedDraftUI.draft,
        [card!]: null,
        [setBaseSlotName(card!)]: null,
      },
    };

    setPlaymatState({
      draftUI: updatedDraftUI,
      modalRaritySelection: { [modal as string]: false },
      modalPreviewMode: 'add',
    });
  };

  return { handleSelectSkin, handleAddCard, handleRemoveCard, rarity, checkingRarityPicked };

  //   const paper = selectBaseItem ? [selectBaseItem] : [];
  //   const silver = matchedCard?.filter(card => card?.card?.details?.rarity === RarityTypes.silver);
  //   const gold = matchedCard?.filter(card => card?.card?.details?.rarity === RarityTypes.gold);
  //   const aa = matchedCard?.filter(card => card?.card?.details?.rarity === RarityTypes.aa);

  //   const rarityOld = [
  //     { type: paper, display: selectBaseItem?.card?.details?.image },
  //     { type: silver, display: silver && silver[0] && silver[0]?.card?.details?.image },
  //     { type: gold, display: gold && gold[0] && gold[0]?.card?.details?.image },
  //     { type: aa, display: aa && aa[0] && aa[0]?.card?.details?.image },
  //   ];

  //#region sort skin
  //   const sorted = inventoryQry?.cards?.sort((a, b) => {
  //     if (!a.card.details?.rarity || !b.card.details?.rarity) return 0;
  //     if (a.card.details.rarity === RarityTypes.basic) return 1;
  //     return -1;
  //   });

  //   const groupedByCardName = sorted?.reduce((prev, curr) => {
  //     let cardName = curr.card.details?.name as string;
  //     let basicType = curr.card.details?.rarity === RarityTypes.basic;

  //     if (!prev[cardName]) prev[cardName] = [];
  //     let isRarityAdded = prev[cardName].some(el => el.card.details?.rarity === curr.card.details?.rarity);

  //     if (!isRarityAdded && !basicType) prev[cardName].push(curr);

  //     if (basicType) {
  //       curr.skins = prev[cardName];
  //     }

  //     return prev;
  //   }, {} as Record<string, UserCardInterface[]>);

  //   if (selectItem && selectBaseItem) {
  //     const order = ['basic', 'silver', 'gold', 'alternative_art'];

  //     const selectedUserCardName = selectItem.card.details?.name as string;

  //     groupedByCardName[selectedUserCardName]?.sort(function (a, b) {
  //       return order.indexOf(a.card.details?.rarity as string) - order.indexOf(b.card.details?.rarity as string);
  //     });

  //     selectItem.skins = groupedByCardName[selectedUserCardName];
  //     selectItem.skins.unshift(selectBaseItem);
  //   }
  //#endregion
}
