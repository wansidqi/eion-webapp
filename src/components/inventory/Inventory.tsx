import { UserCardInterface } from '../../interface';
import { useBoundStore } from '../../store';
import { FilterSearchDropdown, FilterTag, InventoryBreakdown, InventoryCard } from '..';

export type InventoryProps = {
  handleSelectCard?: (item: UserCardInterface) => void | null;
  setDisplayTitle?: any;
  filteredCards?: (card: UserCardInterface[]) => UserCardInterface[];
};

export function Inventory({ handleSelectCard, setDisplayTitle, filteredCards }: InventoryProps) {
  const { inventory } = useBoundStore();
  const { showBreakdown } = inventory;

  return (
    <>
      {!showBreakdown && (
        <div className="mx-4 my-6 h-screen overflow-hidden">
          <FilterSearchDropdown />
          <FilterTag />
          <div className="scrollbar-hidden h-[80vh] overflow-auto">
            <InventoryCard
              handleSelectCard={handleSelectCard}
              filteredCards={filteredCards}
              setDisplayTitle={setDisplayTitle}
            />
          </div>
        </div>
      )}
      {showBreakdown && <InventoryBreakdown setDisplayTitle={setDisplayTitle} />}
    </>
  );
}
