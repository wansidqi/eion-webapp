import { ForgeCardComponent, ForgeConfirmation } from '../components';
import HomeForge from '../components/forge/HomeForge';
import { SelectCardForge } from '../components/forge/SelectCardForge';
import {  Navigation } from '../layout';
import { useBoundStore } from '../store';
import '../css/forge.css';

export function ForgePage() {
  const { forge } = useBoundStore();
  const { selectCardModal, showForgeCard } = forge;
  return (
    <>
      <div className="home-bg">
        <div>
          {selectCardModal ? (
            <SelectCardForge />
          ) : (
            <>
              <Navigation />
              {showForgeCard ? <ForgeCardComponent /> : <HomeForge />}
            </>
          )}
          <ForgeConfirmation />
        </div>
      </div>
    </>
  );
}
