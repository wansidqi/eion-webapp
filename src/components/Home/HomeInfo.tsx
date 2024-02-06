import basic from '/assets/images/Home/basic-card.png';
import silver from '/assets/images/Home/silver-card.png';
import gold from '/assets/images/Home/gold-card.png';
import aa from '/assets/images/Home/aa-card.png';
import { useGetQueryData, AuthResponse, RQ_KEY, useRepositories } from '../../repositories';
import { RarityTypes } from '../../types';

export function HomeInfo() {
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;
  const { useGetInventory } = useRepositories();
  const inventories = useGetInventory(user.id).data;

  const getRarityCount = (rarity: RarityTypes) => {
    const rarityArr = inventories?.cards.filter(card => card?.card?.details?.rarity === rarity);
    return rarityArr?.length;
  };

  const cardRarity = [
    {
      label: 'paper',
      logo: basic,
      color: 'bg-[#D9D9D9]',
      count: getRarityCount(RarityTypes.basic),
    },
    {
      label: 'silver',
      logo: silver,
      color: 'bg-[#838383]',
      count: getRarityCount(RarityTypes.silver),
    },
    {
      label: 'gold',
      logo: gold,
      color: 'bg-[#FFC700]',
      count: getRarityCount(RarityTypes.gold),
    },
    {
      label: 'alternative art',
      logo: aa,
      color: 'bg-gradient-to-br from-[#FF0000] to-[#168FFF]',
      count: getRarityCount(RarityTypes.aa),
    },
  ];

  return (
    <>
      <>
        <div className="gradient-cards my-4 flex justify-between">
          <b className="text-[16px]">Cards Owned</b>
          <div className="flex items-center justify-end gap-4 sm:gap-7">
            {cardRarity.map(item => (
              <div key={item.label} className="inline-flex h-[15px] items-center gap-1">
                {/* <div className={`h-[14px] w-[14px] ${item.color}`} /> */}
                <p className="text-[16px]">{item.count}</p>
                <img src={item.logo} alt="" />
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
