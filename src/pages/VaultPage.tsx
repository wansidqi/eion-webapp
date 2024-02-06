import { useState } from 'react';
import { Inventory, VaultCardPreview, VaultWindow } from '../components';
import { UserCardInterface } from '../interface';
import { Navigation } from '../layout';
import { useBoundStore } from '../store';

export function VaultPage() {
  const [displayTitle, setDisplayTitle] = useState(true);
  const { setVaultState } = useBoundStore();

  const handleSelectCard = (item: UserCardInterface) => {
    setVaultState({ selectCard: item, previewCard: true });
  };

  return (
    <>
      <VaultWindow />
      <div className="eion-bg">
        <>
          {displayTitle && <Navigation />}
          <Inventory handleSelectCard={handleSelectCard} setDisplayTitle={setDisplayTitle} />
        </>
        <VaultCardPreview />
      </div>
    </>
  );
}
