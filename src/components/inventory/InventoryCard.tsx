import leaderIcon from '/assets/images/Playmat/leaderIcon.svg';
import playerIcon from '/assets/images/Playmat/playerIcon.svg';
import supportIcon from '/assets/images/Playmat/supportIcon.svg';
import skillIcon from '/assets/images/Playmat/skillIcon.svg';
// import filterIcon from '/assets/images/Vault/filter-icon.svg';

import { UserCardInterface } from '../../interface';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import { CardTypes, FilterInventory, RarityTypes, levelRarity } from '../../types';
import { useBoundStore } from '../../store';
import { InventoryProps } from '..';
import { RefinementLevel } from '../../layout';
import { useEffect, useState } from 'react';
// import { UseImageLoader } from '../../Hook';

// export function InventoryCard({ setDisplayTitle, handleSelectCard, filteredCards }: InventoryProps) {
export function InventoryCard({ handleSelectCard, filteredCards }: InventoryProps) {
  const { useGetInventory } = useRepositories();
  const { inventory, setinventoryState } = useBoundStore();
  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const inventories = useGetInventory(userId).data;

  const { search, selectButton, filters, sort, isRefinement, cardStacks, gridView } = inventory;
  const [basicCounter, setBasicCounter] = useState<Record<string, number>>();

  const filterButtons = [
    // {
    //   icon: filterIcon,
    //   callback: () => {
    //     setinventoryState({ showBreakdown: true });
    //     setDisplayTitle(false);
    //   },
    // },
    {
      title: CardTypes.LEADER,
      icon: leaderIcon,
      callback: () => {
        if (selectButton.includes(CardTypes.LEADER)) {
          setinventoryState({ selectButton: selectButton.filter(item => item !== CardTypes.LEADER) });
        } else {
          setinventoryState({ selectButton: selectButton.concat(CardTypes.LEADER) });
        }
      },
    },
    {
      title: CardTypes.PLAYER,
      icon: playerIcon,
      callback: () => {
        if (selectButton.includes(CardTypes.PLAYER)) {
          setinventoryState({ selectButton: selectButton.filter(item => item !== CardTypes.PLAYER) });
        } else {
          setinventoryState({ selectButton: selectButton.concat(CardTypes.PLAYER) });
        }
      },
    },

    {
      title: CardTypes.SKILL,
      icon: skillIcon,
      callback: () => {
        if (selectButton.includes(CardTypes.SKILL)) {
          setinventoryState({ selectButton: selectButton.filter(item => item !== CardTypes.SKILL) });
        } else {
          setinventoryState({ selectButton: selectButton.concat(CardTypes.SKILL) });
        }
      },
    },
    {
      title: CardTypes.SUPPORT,
      icon: supportIcon,
      callback: () => {
        if (selectButton.includes(CardTypes.SUPPORT)) {
          setinventoryState({ selectButton: selectButton.filter(item => item !== CardTypes.SUPPORT) });
        } else {
          setinventoryState({ selectButton: selectButton.concat(CardTypes.SUPPORT) });
        }
      },
    },
  ];

  useEffect(() => {
    function init() {
      let filteredCards: UserCardInterface[] | undefined;

      filteredCards = inventories?.cards?.filter(card => {
        const role = selectButton.length === 0 || selectButton.includes(card?.card?.type);
        const searchName = card?.card?.details?.name?.toLowerCase().includes(search);
        const searchDesc = card?.card?.details?.description?.toLowerCase().includes(search);
        const filterType = filters.Type?.length === 0 || filters.Type?.includes(card?.card?.type);
        const filterRole = filters.Role?.length === 0 || filters.Role?.includes(card?.card?.details?.lane ?? '');
        const filterTeam =
          filters.Team?.length === 0 || filters.Team?.includes(card?.card?.details?.team?.shortName ?? '');

        let filterBreakdown = filterType && filterRole && filterTeam;

        if (isRefinement) {
          const isBasic = card?.card?.details?.rarity === RarityTypes.basic;
          const isLevel10 = card?.refinementLevel === 10;
          filterBreakdown = filterBreakdown && isBasic && !isLevel10;
        } else {
          const filterRarity =
            filters.Rarity?.length === 0 || filters.Rarity?.includes(card?.card?.details?.rarity ?? '');
          filterBreakdown = filterBreakdown && filterRarity;
        }

        return (searchName || searchDesc) && role && filterBreakdown;
      });

      let counter: Record<string, number> = {};

      let reduced = filteredCards?.reduce((prev, curr) => {
        const cardName = curr.card.details?.name as string;
        const isRefined = curr.refinementLevel > 0;
        const rarity = curr.card?.details?.rarity as string;
        const isTrial = curr?.singleUseOnly ? 'trial' : 'permanent';
        const cardKey = `${cardName}_${rarity}_${isTrial}`;

        if (!isRefined && !counter[cardKey]) {
          counter[cardKey] = 1;
          prev[curr?.id] = curr;
          return prev;
        } else if (!isRefined) {
          counter[cardKey] += 1;
          return prev;
        }

        prev[curr.id] = curr;
        return prev;
      }, {} as Record<string, UserCardInterface>);

      if (reduced) {
        setinventoryState({ cardStacks: Object.values(reduced) });
        setBasicCounter(counter);
      }
    }
    init();
  }, [inventories, search, selectButton, filters, isRefinement]);

  cardStacks.sort((a, b) => {
    const rarityA = a?.card?.details?.rarity ?? '';
    const rarityB = b?.card?.details?.rarity ?? '';

    const dateA = new Date(a?.createdAt as Date);
    const dateB = new Date(b?.createdAt as Date);

    const refinementA = a.refinementLevel ?? 0;
    const refinementB = b.refinementLevel ?? 0;

    const nameA = a.card?.details?.name || '';
    const nameB = b.card?.details?.name || '';

    switch (sort) {
      case FilterInventory.HIGHEST_RARITY:
        return levelRarity[rarityB] - levelRarity[rarityA];
      case FilterInventory.LOWEST_RARITY:
        return levelRarity[rarityA] - levelRarity[rarityB];
      case FilterInventory.HIGHEST_REFINEMENT:
        return refinementB - refinementA;
      case FilterInventory.LOWEST_REFINEMENT:
        return refinementA - refinementB;
      case FilterInventory.MOST_RECENT:
        return dateA > dateB ? -1 : 1;
      case FilterInventory.A_TO_Z:
        return nameA < nameB ? -1 : 1;
      default:
        return 0;
    }
  });

  const cardArray = filteredCards ? filteredCards(cardStacks) : cardStacks;

  return (
    <div className="relative">
      <div className="mb-8">
        <div className={`grid grid-cols-${gridView} gap-2 gap-y-5`}>
          {cardArray?.map(userCard => {
            const cardName = userCard?.card.details?.name as string;
            const rarity = userCard?.card?.details?.rarity as string;
            const isTrial = userCard?.singleUseOnly ? 'trial' : 'permanent';
            const cardKey = `${cardName}_${rarity}_${isTrial}`;

            return (
              <button
                onClick={() => handleSelectCard && handleSelectCard(userCard)}
                key={userCard.id}
                className="relative"
              >
                <RefinementLevel
                  className="left-0 top-0"
                  level={userCard.refinementLevel}
                  isTrial={Boolean(userCard?.singleUseOnly)}
                />
                <div
                  className={
                    userCard?.refinementLevel === 0
                      ? 'roboto-bold absolute right-0 rounded-md bg-yellow-300 px-1 text-[10px] text-black'
                      : 'hidden'
                  }
                >
                  {basicCounter?.[cardKey]}×
                </div>
                {/* <UseImageLoader src={userCard?.card?.details?.image as string} alt="" /> */}
                <img src={userCard?.card?.details?.image} alt="" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-12 left-1/2 z-10 w-full max-w-[calc(80%-2rem)] -translate-x-1/2 transform rounded-md border border-[#D9D9D9] bg-[#212121] py-7 opacity-80" />
      <div className="fixed bottom-14 left-1/2 z-10 w-full max-w-[calc(80%-2rem)] -translate-x-1/2 transform">
        <div className="w-full">
          {/* <div className="flexcenter gap-4"> */}
          <div className="flexcenter gap-5">
            {filterButtons.map(item => (
              <>
                {/* {i === 1 && <div key={i} className="h-[40px] w-[2px] bg-white" />} */}
                <button
                  key={item.title}
                  onClick={item.callback}
                  //   className={`flexcenter h-[40px] w-[40px] rounded-md border bg-[#212121]  ${
                  //     item.title && selectButton.includes(item.title) ? 'border-2 border-[#168FFF]' : ''
                  //   }
                  //   ${i === 0 ? 'bg-black' : ''}
                  //   `}
                  // >
                  className={`flexcenter h-[40px] w-[40px] rounded-md border bg-[#212121]  ${
                    item.title && selectButton.includes(item.title) ? 'border-2 border-[#168FFF]' : ''
                  } 
                  `}
                >
                  <img src={item.icon} alt="" />
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
