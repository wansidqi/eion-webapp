import { useEffect, useState } from 'react';
import { useBoundStore } from '../../store';
import { useQueriesHandler } from '..';
import { RarityTypes } from '../../types';
import { UserCardInterface } from '../../interface';

export function useLevelUpHandler() {
  type ExpStats = {
    totalExp: number;
    currentExp: number;
    currentLevel: number;
    newExp: number;
  };

  const { inventoryQry } = useQueriesHandler();
  const { forge, setForgeState } = useBoundStore();

  const { selectCard, cardToConsume, sacrificeCard } = forge;

  const expChart: { [key: number]: { max: number } } = {
    0: { max: 1 },
    1: { max: 2 },
    2: { max: 4 },
    3: { max: 8 },
    4: { max: 16 },
    5: { max: 32 },
    6: { max: 64 },
    7: { max: 128 },
    8: { max: 256 },
    9: { max: 512 },
  };

  const [expStats, setExpStats] = useState<ExpStats>({
    totalExp: 0,
    currentExp: 0,
    currentLevel: 0,
    newExp: 0,
    // newLevel: 0,
  });

  function canLevelUp(currentExp: number, maxExp: number) {
    return currentExp >= maxExp;
  }

  function levelUp({
    refinementLevel,
    currentExp,
    maxExp,
  }: {
    refinementLevel: number;
    currentExp: number;
    maxExp: number;
  }) {
    return { newLevel: (refinementLevel += 1), newExp: currentExp - maxExp };
  }

  function onChangeExpStats(data: Partial<ExpStats>) {
    setExpStats(prev => ({ ...prev, ...data }));
  }

  function onConsumeCard(data: UserCardInterface) {
    setForgeState({
      sacrificeCard: data,
      // cardStacks: cardStacks.filter(el => el.id !== data.id),
      cardToConsume: [...cardToConsume, data],
    });
  }

  function removeCardToConsume(data: UserCardInterface) {
    // Calculate and adjust experience points
    let NEW_EXP = expStats.currentExp;
    let NEW_LEVEL = expStats.currentLevel;
    let EXP_NEEDED_TO_LEVELUP = expChart[NEW_LEVEL].max;

    // Deduct experience points based on the card being removed
    const expToDeduct = expChart[data.refinementLevel].max;
    NEW_EXP -= expToDeduct;

    // Check if the new experience points are negative, indicating a level down
    while (NEW_EXP < 0) {
      if (NEW_LEVEL === 0) {
        // Ensure the level does not go below 0
        NEW_EXP = 0;
        break;
      }

      // Level down and adjust experience points accordingly
      NEW_LEVEL -= 1;
      EXP_NEEDED_TO_LEVELUP = expChart[NEW_LEVEL].max;
      NEW_EXP += EXP_NEEDED_TO_LEVELUP;
    }

    // Update expStats accordingly
    onChangeExpStats({
      currentExp: NEW_EXP,
      currentLevel: NEW_LEVEL,
      totalExp: EXP_NEEDED_TO_LEVELUP,
    });

    const updatedCardToConsume = cardToConsume.filter(card => card !== data);
    setForgeState({
      cardToConsume: updatedCardToConsume,
      sacrificeCard: undefined,
    });
  }

  function onClickDuplicate(userCard: UserCardInterface) {
    const selectCard = cardToConsume.includes(userCard);
    onConsumeCard(userCard);
    return selectCard ? removeCardToConsume(userCard) : onConsumeCard(userCard);
  }

  useEffect(() => {
    if (selectCard) {
      setExpStats({
        totalExp: expChart[selectCard.refinementLevel].max,
        currentExp: selectCard.currentExp,
        currentLevel: selectCard.refinementLevel,
        newExp: 0,
        // newLevel: selectCard.refinementLevel + 1,
      });
    }

    if (inventoryQry) {
      const setCardStacks = inventoryQry?.cards
        .reduce((prev, curr) => {
          if (curr.id === selectCard?.id) return prev;

          const cardName = curr.card.details?.name as string;
          const isBasic = curr.card.details?.rarity === RarityTypes.basic;
          if (!isBasic) return prev;
          if (curr.refinementLevel === 10) return prev;
          if (selectCard?.card.details?.name === cardName) prev.push(curr);
          return prev;
        }, [] as UserCardInterface[])
        ?.filter(card => !card?.singleUseOnly);
      setForgeState({ cardStacks: setCardStacks });
    }
  }, []);

  useEffect(() => {
    function calculateExpStats() {
      if (!sacrificeCard) return;
      const TOTAL_EXP_GAIN = expChart[sacrificeCard.refinementLevel].max;

      let NEW_EXP = expStats.currentExp;
      let NEW_LEVEL = expStats.currentLevel;
      let EXP_NEEDED_TO_LEVELUP = expChart[NEW_LEVEL].max;

      NEW_EXP += TOTAL_EXP_GAIN;

      while (canLevelUp(NEW_EXP, EXP_NEEDED_TO_LEVELUP)) {
        let { newExp, newLevel } = levelUp({
          refinementLevel: NEW_LEVEL,
          currentExp: NEW_EXP,
          maxExp: EXP_NEEDED_TO_LEVELUP,
        });

        NEW_EXP = newExp;
        NEW_LEVEL = newLevel;
        EXP_NEEDED_TO_LEVELUP = expChart[newLevel].max;
      }

      onChangeExpStats({
        currentExp: NEW_EXP,
        currentLevel: NEW_LEVEL,
        totalExp: EXP_NEEDED_TO_LEVELUP,
      });
      setForgeState({ sacrificeCard: undefined });
    }

    if (sacrificeCard) calculateExpStats();
  }, [sacrificeCard]);

  return { onClickDuplicate, expStats };
}
