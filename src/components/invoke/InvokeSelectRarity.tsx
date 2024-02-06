import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store';
// import { ImgIcon } from '..';
import { PlayerInvoke, RoleInvoke } from '../../interface';
import { useSelectRarityInvokeHandler } from '../../handlers';

type Props = {
  role: RoleInvoke;
  player: PlayerInvoke;
  nextModal: RoleInvoke | null; ///modalPlayerSelection
};

export function InvokeSelectRarity({ role, nextModal, player }: Props): JSX.Element {
  /*  */
  const { rarity, handleAddCard, handleRemoveCard, handleSelectSkin, checkingRarityPicked } =
    useSelectRarityInvokeHandler();
  const modalRef = useRef<HTMLDivElement>(null);
  const { invoke, setInvokeState } = useBoundStore();
  const { selectRarityModal, selectItem, modalPreviewMode } = invoke;

  useEffect(() => {
    if (selectRarityModal[role]) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setInvokeState({ selectRarityModal: { ...selectRarityModal, [role]: false } });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [selectRarityModal[role]]);

  return (
    <div>
      {role && selectRarityModal[role] && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="roboto-condensed flexcenter absolute bottom-1/2 left-1/2 right-1/2 top-1/2  bg-opacity-90 text-[16px]">
              <div className="">
                <div className="h-[490px] w-[335px]">
                  <img src={selectItem ? selectItem?.card?.details?.image : ''} className="h-full w-full" alt="" />
                </div>
                <div className="flexcenter-col my-5">
                  <b>CLICK TO EQUIP</b>
                  <div className="flex gap-4">
                    {/* {counts.map(count => (
                      <button key={count} className="flexcenter gradient-border my-2 h-[56px] w-[56px]">
                        <ImgIcon />
                      </button>
                    ))} */}
                    {rarity?.map((userCard, i) => {
                      const selectedCard = userCard?.type?.filter(card => !checkingRarityPicked(card)).length;
                      return (
                        <>
                          {userCard.type?.length > 0 && (
                            <button
                              disabled={selectedCard === 0}
                              onClick={() => handleSelectSkin(userCard.type)}
                              key={i}
                              className={`
                              flexcenter relative mb-2 mt-4 h-20 w-16 p-1`}
                            >
                              <img src={userCard?.display} alt="" />
                              {i !== 0 && (
                                <div className="roboto absolute -top-1 left-1 rounded-sm border bg-black px-[0.2rem] text-[12px] text-white">
                                  {selectedCard}×
                                </div>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddCard({ nextModal, player, role })}
                    className="flexcenter blue-radial w-full rounded-sm py-4"
                  >
                    <b className="text-20 roboto-condensed bottom-6 italic">Add Card</b>
                  </button>
                  {modalPreviewMode === 'update' && (
                    <button
                      onClick={() => handleRemoveCard({ player, role })}
                      className="flexcenter w-full rounded-sm bg-red-600 py-4"
                    >
                      <b className="text-20 roboto-condensed bottom-6 italic">Remove Card</b>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
