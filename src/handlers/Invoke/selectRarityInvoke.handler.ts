import { useQueriesHandler } from '..';
import { PlayerInvoke, RoleInvoke, UserCardInterface } from '../../interface';
import { useBoundStore } from '../../store';
import { RarityTypes } from '../../types';
import { setBaseSlotName } from '../../utils';

interface CardModal {
  player: PlayerInvoke;
  role: RoleInvoke;
  nextModal: RoleInvoke | null;
}

export function useSelectRarityInvokeHandler() {
  const { inventoryQry } = useQueriesHandler();
  const { invoke, setInvokeState } = useBoundStore();

  const { selectItem, selectBaseItem, invokeDraft, selectRarityModal, modalPlayerSelection } = invoke;

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
      item?.id === invokeDraft.draft.player1?.id ||
      item?.id === invokeDraft.draft.player2?.id ||
      item?.id === invokeDraft.draft.player3?.id ||
      item?.id === invokeDraft.draft.player4?.id ||
      item?.id === invokeDraft.draft.player5?.id
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
          setInvokeState({ selectItem: card });
          return card;
        }
      }
    }
    return null;
  };

  const handleAddCard = ({ player, nextModal, role }: CardModal) => {
    setInvokeState({
      invokeDraft: {
        draft: {
          ...invokeDraft.draft,
          [player]: selectItem,
          [setBaseSlotName(player)]: selectBaseItem,
        },
      },
      modalPlayerSelection: {
        ...modalPlayerSelection,
        [nextModal!]: true,
        [role]: false,
      },
      selectRarityModal: {
        ...selectRarityModal,
        [role]: false,
      },
    });
    if (!nextModal && role === RoleInvoke.ROAM) {
      setInvokeState({
        modalPlayerSelection: {
          ...modalPlayerSelection,
          [role]: true,
        },
      });
    }
  };

  const handleRemoveCard = ({ player, role }: Partial<CardModal>) => {
    setInvokeState({
      invokeDraft: {
        draft: {
          ...invokeDraft.draft,
          [player!]: null,
          [setBaseSlotName(player)]: null,
        },
      },
      selectRarityModal: { ...selectRarityModal, [role!]: false },
    });
  };

  return { rarity, handleSelectSkin, handleAddCard, handleRemoveCard, checkingRarityPicked };
}
