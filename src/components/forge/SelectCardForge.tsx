import { useEffect, useState } from 'react';
import { Inventory } from '..';
import { UserCardInterface } from '../../interface';
import { TitleLayout } from '../../layout';
import { useBoundStore } from '../../store';

export function SelectCardForge() {
  const { forge, setForgeState, setinventoryState } = useBoundStore();
  const { selectCardModal } = forge;
  const [displayTitle, setDisplayTitle] = useState(true);

  const handleClose = () => {
    setForgeState({ selectCardModal: false });
    setinventoryState({ isRefinement: false });
  };

  const handleSelectCard = (item: UserCardInterface) => {
    setForgeState({ selectCard: item, showForgeCard: true, selectCardModal: false, cardToConsumeIds: [] });
  };

  const filtered = (card: UserCardInterface[]) => card?.filter(card => !Boolean(card?.singleUseOnly));

  useEffect(() => {
    setinventoryState({ isRefinement: true });
    setForgeState({ cardStacks: [] });
  }, []);

  return (
    <div>
      {selectCardModal && (
        <>
          {displayTitle && <TitleLayout hasClose={true} callback={handleClose} title="Enhance Card" />}
          <Inventory filteredCards={filtered} handleSelectCard={handleSelectCard} setDisplayTitle={setDisplayTitle} />
        </>
      )}
    </div>
  );
}
