import { useEffect, useRef } from 'react';
import { DraftCardsEnum, ModalPlaymat } from '../../types';
import { useBoundStore } from '../../store';
import { RefinementLevel } from '../../layout';
import { useSelectRarityHandler } from '../../handlers';
// import { UseImageLoader } from '../../Hook';

type Props = {
  modal: ModalPlaymat;
  nextModal: ModalPlaymat | null;
  card: DraftCardsEnum | null;
};

export function SelectRarity({ modal, nextModal, card }: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const { playmat, setPlaymatState } = useBoundStore();
  const { handleAddCard, handleRemoveCard, handleSelectSkin, rarity, checkingRarityPicked } = useSelectRarityHandler();

  const { modalRaritySelection, modalPreviewMode, selectItem } = playmat;

  useEffect(() => {
    if (modalRaritySelection[modal]) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ modalRaritySelection: { ...modalRaritySelection, [modal]: false } });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [modalRaritySelection[modal]]);

  return (
    <div>
      {modal && modalRaritySelection[modal] && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="roboto-condensed flexcenter absolute bottom-1/2 left-1/2 right-1/2 top-1/2  scale-[0.8] bg-opacity-90 text-[16px]">
              <div className="">
                <div className="relative mb-10 h-[530px] w-[430px]">
                  {selectItem?.card?.details?.image && (
                    <RefinementLevel
                      className="left-14 top-4 scale-[2]"
                      level={selectItem?.refinementLevel}
                      isTrial={selectItem?.singleUseOnly}
                    />
                  )}
                  {/* <UseImageLoader src={selectItem?.card?.details?.image as string} /> */}
                  <img src={selectItem?.card?.details?.image} className="" alt="" />
                </div>
                <div className="flexcenter-col mt-20">
                  <b>CHOOSE CARD RARITY</b>
                  <div className="flex gap-4">
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
                              {/* <UseImageLoader src={userCard?.display as string} /> */}
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
                <div className="flexcenter gap-4">
                  {modalPreviewMode === 'update' && (
                    <button
                      onClick={() => handleRemoveCard({ card, modal })}
                      className={`flexcenter mt-5 w-full rounded-sm bg-[#AD3843] py-4`}
                    >
                      <b className="text-20 roboto-condensed italic">Remove Card</b>
                    </button>
                  )}
                  <button
                    onClick={() => handleAddCard({ card, modal, nextModal })}
                    className={`blue-radial flexcenter mt-5 w-full rounded-sm py-4`}
                  >
                    <b className="text-20 roboto-condensed italic">Add Card</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
