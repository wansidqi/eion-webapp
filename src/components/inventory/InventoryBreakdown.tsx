import { InventoryProps } from '..';
import { InventoryInterface, RoleInvoke } from '../../interface';
import { TitleLayout } from '../../layout';
import { RQ_KEY, useGetQueryData } from '../../repositories';
import { useBoundStore } from '../../store';
import { Filter, FiltersContent, initialFilters } from '../../store/slices/inventory.slice';
import { RarityTypes } from '../../types';
import downArrow from '/assets/images/Vault/down-arrow.png';
import upArrow from '/assets/images/Vault/up-arrow.png';

type FilterChoice = {
  label: keyof Filter;
  isOpen: boolean;
  toggle: () => void;
  lists: string[];
  hasColor: boolean;
};

export function InventoryBreakdown({ setDisplayTitle }: InventoryProps): JSX.Element {
  const { inventory, setinventoryState } = useBoundStore();
  const { filtersContent, filters } = inventory;
  const myInventory = useGetQueryData<InventoryInterface>([RQ_KEY.INVENTORY]).cards;
  const myTeam = myInventory
    .map(card => card?.card?.details?.team?.shortName)
    .filter(card => card !== undefined)
    .filter((team, index, self) => self.indexOf(team) === index)
    .sort();

  const handleFilterBreakdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const updatedFilter: Filter = { ...filters };
    const filterValues = filters[name] as string[];

    if (['Rarity', 'Type', 'Duplicates', 'Team', 'Season', 'Role'].includes(name)) {
      updatedFilter[name] = checked ? [...filterValues, value] : filterValues.filter(item => item !== value);
    }

    setinventoryState({ filters: updatedFilter });
  };

  function getOptionColor(option: string) {
    switch (option) {
      case RarityTypes.basic:
        return 'bg-[#D9D9D9]';
      case RarityTypes.silver:
        return 'bg-[#838383]';
      case RarityTypes.gold:
        return 'bg-[#FFC700]';
      case RarityTypes.aa:
        return 'bg-gradient-to-br from-[#FF0000] to-[#168FFF]';
    }
  }

  const toggle = (item: keyof FiltersContent) => {
    const updatedFilters = {
      ...filtersContent,
      [item]: !filtersContent[item],
    };
    setinventoryState({
      filtersContent: updatedFilters,
    });
  };

  const closeBreakdown = () => {
    setinventoryState({ showBreakdown: false });
    setDisplayTitle(true);
  };

  const resetFilter = () => {
    setinventoryState({ filters: initialFilters, showBreakdown: false });
    closeBreakdown();
  };

  const filterChoices: FilterChoice[] = [
    {
      label: 'Rarity',
      isOpen: filtersContent.rarity,
      toggle: () => toggle('rarity'),
      lists: [RarityTypes.basic, RarityTypes.silver, RarityTypes.gold, RarityTypes.aa],
      hasColor: true,
    },
    {
      label: 'Duplicates',
      isOpen: filtersContent.duplicates,
      toggle: () => toggle('duplicates'),
      lists: ['Only show duplicates'],
      hasColor: false,
    },
    {
      label: 'Team',
      isOpen: filtersContent.team,
      toggle: () => toggle('team'),
      lists: myTeam as string[],
      // [
      //   'BLCK',
      //   'ECHO',
      //   'Homebois',
      //   'Homebois SG',
      //   'ONIC',
      //   'RSG MY',
      //   'RSG PH',
      //   'RSG SG',
      //   'Stellark',
      //   'Team HAQ',
      //   'TNC',
      //   'Todak',
      // ],
      hasColor: false,
    },
    {
      label: 'Type',
      isOpen: filtersContent.type,
      toggle: () => toggle('type'),
      lists: ['leader', 'player', 'skill', 'support'],
      hasColor: false,
    },
    {
      label: 'Role',
      isOpen: filtersContent.role,
      toggle: () => toggle('role'),
      lists: [RoleInvoke.ROAM, RoleInvoke.MID, RoleInvoke.JUNGLE, RoleInvoke.EXP, RoleInvoke.GOLD],
      hasColor: false,
    },
    {
      label: 'Season',
      isOpen: filtersContent.season,
      toggle: () => toggle('season'),
      lists: ['Season 1'],
      hasColor: false,
    },
  ];

  return (
    <div className="z-50 min-h-screen bg-[#000000] bg-opacity-100">
      <div className="h-full w-full capitalize">
        <TitleLayout callback={closeBreakdown} hasClose={true} title="Filter" />
        {/*  */}
        <div className="mx-10">
          <div className="mt-10">
            {filterChoices.map(item => (
              <>
                <div className="border-b border-[#2D2D2D] py-5 text-[20px]">
                  <button onClick={item.toggle} className="flex w-full items-center justify-between">
                    <p>{item.label}</p>
                    <img src={item.isOpen ? upArrow : downArrow} alt="" />
                  </button>
                  {item.isOpen && (
                    <div className="mt-5 flex flex-col gap-2">
                      {item.lists?.map((option: string) => (
                        <div key={option} className="flex justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            {item.hasColor && <div className={`${getOptionColor(option)} h-[13px] w-[13px]`} />}
                            <p>{option}</p>
                          </div>
                          <input
                            name={item.label.toString()}
                            type="checkbox"
                            value={option}
                            className="h-4 w-4 rounded-md"
                            checked={filters?.[item.label]?.includes(option)}
                            onChange={handleFilterBreakdown}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
          <div className="border-b border-[#2D2D2D] py-5 text-[20px]">
            <button onClick={() => toggle('refinement')} className="flex w-full items-center justify-between">
              <p>Refinement</p>
              <img src={filtersContent.refinement ? upArrow : downArrow} alt="" />
            </button>
            {filtersContent.refinement && (
              <div className="mt-5 flex gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    className="h-[40px] w-[130px] rounded-md border border-[#7B7B7B] bg-transparent px-4 text-[16px] text-white"
                  />
                </div>
                <div>
                  <p>-</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="20"
                    className="h-[40px] w-[130px] rounded-md border border-[#7B7B7B] bg-transparent px-4 text-[16px] text-white"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="roboto-condensed mt-8 flex gap-4 text-[16px]">
            <button onClick={resetFilter} className="w-full border py-3">
              Clear All
            </button>
            <button onClick={closeBreakdown} className="blue-radial w-full py-3">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
