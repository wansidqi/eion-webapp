import { useBoundStore } from '../../store';
import { FilterInventory } from '../../types/filter.inventory';

import grid2active from '/assets/images/Invoke/grid-2-active.png';
import grid2inactive from '/assets/images/Invoke/grid-2-inactive.png';
import grid4active from '/assets/images/Invoke/grid-4-active.png';
import grid4inactive from '/assets/images/Invoke/grid-4-inactive.png';

export function FilterSearchDropdown() {
  const { inventory, setinventoryState } = useBoundStore();
  const { showDropdown, showDropdownFilter, isRefinement, search, sort, gridView } = inventory;

  const filtersDropdown = isRefinement
    ? [FilterInventory.MOST_RECENT, FilterInventory.HIGHEST_REFINEMENT, FilterInventory.LOWEST_REFINEMENT]
    : [
        FilterInventory.MOST_RECENT,
        FilterInventory.HIGHEST_RARITY,
        FilterInventory.LOWEST_RARITY,
        // FilterInventory.HIGHEST_REFINEMENT,
        // FilterInventory.LOWEST_REFINEMENT,
        FilterInventory.A_TO_Z,
      ];

  const handleDropdownFilter = (i: FilterInventory) => {
    setinventoryState({ showDropdown: false, sort: i });
  };

  const gridButtons = [
    {
      grid: 2,
      active: grid2active,
      inactive: grid2inactive,
    },
    {
      grid: 4,
      active: grid4active,
      inactive: grid4inactive,
    },
  ];

  return (
    <div className="z-50 grid grid-cols-7 gap-2">
      <div className={`flex w-full gap-3 ${showDropdownFilter ? 'col-span-2' : 'col-span-7'}`}>
        <div className={` flexcenter roboto-condensed ${showDropdownFilter ? '' : 'w-full'} text-[16px]`}>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">{lens}</div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={event => setinventoryState({ search: event.target.value })}
              onFocus={() => setinventoryState({ showDropdownFilter: false, showDropdown: false })}
              className="h-[44px] w-full rounded-md border border-[#0185FF] bg-transparent pl-8 focus:outline-none"
            />
          </div>
        </div>
        {!showDropdownFilter && (
          <button
            onClick={() => setinventoryState({ showDropdownFilter: true, search: '' })}
            className="flexcenter h-[44px] w-[44px] rounded-md border border-[#0185FF]"
          >
            {close}
          </button>
        )}
      </div>
      {showDropdownFilter && (
        <div className="flexcenter rounded-md border border-[#0586FD] mx-1 col-span-2">
          {gridButtons.map(item => (
            <button onClick={() => setinventoryState({ gridView: item.grid })}>
              <img src={gridView === item.grid ? item.active : item.inactive} alt="" />
            </button>
          ))}
        </div>
      )}
      {showDropdownFilter && (
        <div className="roboto-condensed z-10 col-span-3 flex items-center">
          <div className="deadjim roboto relative w-full flex-row rounded-md text-[14px]">
            <button
              onClick={() => setinventoryState({ showDropdown: !showDropdown })}
              className="flex h-[44px] w-full items-center justify-between rounded-md border border-[#0185FF]"
            >
              <p className="roboto-condensed m-3">{sort}</p>
              <div className="px-3">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00001 10L0.928345 2.93L3.28668 0.573334L8.00001 5.28667L12.7133 0.573334L15.0717 2.93L8.00001 10.0017V10Z"
                    fill="white"
                  />
                </svg>
              </div>
            </button>
            <div>
              {showDropdown && (
                <div className=" roboto absolute z-10  mt-2 flex w-full flex-col rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] py-2 text-[14px]">
                  {filtersDropdown.map((item: any, i: number) => (
                    <button
                      onClick={() => handleDropdownFilter(item)}
                      className={`my-1 px-4 py-2 text-left ${
                        item === sort
                          ? 'w-full border border-[#00519B] bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0'
                          : ''
                      }`}
                      key={i}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const lens = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.0007 14.0002L11.01 11.0042M12.6673 7.00016C12.6673 8.50306 12.0703 9.9444 11.0076 11.0071C9.94488 12.0698 8.50354 12.6668 7.00065 12.6668C5.49776 12.6668 4.05642 12.0698 2.99371 11.0071C1.93101 9.9444 1.33398 8.50306 1.33398 7.00016C1.33398 5.49727 1.93101 4.05593 2.99371 2.99322C4.05642 1.93052 5.49776 1.3335 7.00065 1.3335C8.50354 1.3335 9.94488 1.93052 11.0076 2.99322C12.0703 4.05593 12.6673 5.49727 12.6673 7.00016Z"
      stroke="#B0ADAD"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const close = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white" />
  </svg>
);
