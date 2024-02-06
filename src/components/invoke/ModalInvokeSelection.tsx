import { useEffect, useRef } from 'react';

import close from '/assets/images/Layout/close.png';
import grid2active from '/assets/images/Invoke/grid-2-active.png';
import grid2inactive from '/assets/images/Invoke/grid-2-inactive.png';
import grid4active from '/assets/images/Invoke/grid-4-active.png';
import grid4inactive from '/assets/images/Invoke/grid-4-inactive.png';

import { UserCardInterface, RoleInvoke, PlayerInvoke } from '../../interface';
import { DeckInvokeCard } from '..';
import { useBoundStore } from '../../store';
import { initInvokeModal } from '../../store/slices/invoke.slice';
import { useSelectCardInvokeHandler } from '../../handlers';

type Props = {
  role: RoleInvoke;
  player: PlayerInvoke;
};

export function ModalInvokeSelection({ role }: Props) {
  const { checkCardSelected, handleOpenModalSelectRarity, cardsRole, handleCloseSelectCardModal } =
    useSelectCardInvokeHandler(role);

  const modalRef = useRef<HTMLDivElement>(null);
  const { invoke, setInvokeState } = useBoundStore();
  const { invokeDraft, modalPlayerSelection, gridView } = invoke;

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

  useEffect(() => {
    if (modalPlayerSelection[role]) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setInvokeState({ modalPlayerSelection: initInvokeModal });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [modalPlayerSelection[role], role]);

  return (
    <div>
      {modalPlayerSelection[role] && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-10 bg-[#242424]">
            <div className="bg-opacity-90 text-[16px]">
              <div className="scrollbar-hidden flex flex-col items-center overflow-y-auto">
                {/*  */}
                <div className="flexcenter relative mb-2 w-screen bg-gradient-to-b from-[#010E1A] to-[#000000] py-7">
                  <button onClick={() => handleCloseSelectCardModal()} className="absolute left-0 scale-[1.2]">
                    <img src={close} alt="" className="h-max" />
                  </button>
                  <p className="roboto-condensed">Choose your {role?.toUpperCase()}</p>
                  <div className="absolute right-5 rounded-md border border-[#0586FD] p-1">
                    <div className="flexcenter">
                      {gridButtons.map(item => (
                        <button onClick={() => setInvokeState({ gridView: item.grid })}>
                          <img src={gridView === item.grid ? item.active : item.inactive} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className={`scrollbar-hidden grid max-h-[75vh] grid-cols-${gridView} mx-5 gap-3 overflow-x-auto`}>
                  {cardsRole?.map((item: UserCardInterface, index: number) => (
                    <>
                      <button
                        onClick={
                          checkCardSelected(item)
                            ? () => handleOpenModalSelectRarity(item, role, 'update')
                            : () => handleOpenModalSelectRarity(item, role, 'add')
                        }
                        key={index + 1}
                        className={`relative  ${checkCardSelected(item) ? 'border-[3px] border-blue-600' : ''}`}
                      >
                        <img
                          src={item?.card?.details?.image}
                          alt={item?.card?.details?.name}
                          className={`${checkCardSelected(item) ? 'grayscale filter' : ''}`}
                        />
                      </button>
                    </>
                  ))}
                </div>
                {/*  */}
                <div className="mini-playmat fixed bottom-0 w-screen pb-14 pt-4 text-[16px]">
                  <div className="flexcenter gap-x-4 text-[9px]">
                    <DeckInvokeCard
                      player={PlayerInvoke.player1}
                      role={RoleInvoke.ROAM}
                      card={invokeDraft.draft.player1}
                      displaySmall={true}
                    />
                    <DeckInvokeCard
                      player={PlayerInvoke.player2}
                      role={RoleInvoke.JUNGLE}
                      card={invokeDraft.draft.player2}
                      displaySmall={true}
                    />
                    <DeckInvokeCard
                      player={PlayerInvoke.player3}
                      role={RoleInvoke.EXP}
                      card={invokeDraft.draft.player3}
                      displaySmall={true}
                    />
                    <DeckInvokeCard
                      player={PlayerInvoke.player4}
                      role={RoleInvoke.MID}
                      card={invokeDraft.draft.player4}
                      displaySmall={true}
                    />
                    <DeckInvokeCard
                      player={PlayerInvoke.player5}
                      role={RoleInvoke.GOLD}
                      card={invokeDraft.draft.player5}
                      displaySmall={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
