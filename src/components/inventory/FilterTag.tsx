import { useBoundStore } from '../../store';
import { initialFilters } from '../../store/slices/inventory.slice';
import closeIcon from '/assets/images/Vault/close.png';

export function FilterTag() {
  const { inventory, setinventoryState } = useBoundStore();
  const { filters } = inventory;
  const btnSize = 'h-[40px] w-auto';

  const handleRemoveTag = (tag: string) => {
    const updatedFilters = { ...filters };

    for (const key in updatedFilters) {
      if (Array.isArray(updatedFilters[key])) {
        updatedFilters[key] = updatedFilters[key].filter(item => item !== tag);
      }
    }

    setinventoryState({ filters: updatedFilters });
  };

  const resetFilter = () => {
    setinventoryState({ filters: initialFilters, showBreakdown: false });
  };

  return (
    <div className="my-8">
      {Object.values(filters).flat().length > 0 && (
        <div className="roboto-condensed scrollbar-hidden overflow-x-auto text-[16px]">
          <div className="flex gap-2">
            {Object.entries(filters).map(([_, values]) =>
              values.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => handleRemoveTag(tag)}
                  className={`flex flex-shrink-0 items-center justify-evenly gap-5 rounded-md bg-[#555555] px-3 ${btnSize}`}
                >
                  <>
                    <p className="text-sm">{tag}</p>
                    <img src={closeIcon} alt="" />
                  </>
                </button>
              ))
            )}
            <button
              onClick={resetFilter}
              className={`flex flex-shrink-0 items-center justify-evenly gap-5 rounded-md bg-[#0D5597] px-5 ${btnSize}`}
            >
              <>
                <p className="text-sm">Clear All</p>
              </>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
