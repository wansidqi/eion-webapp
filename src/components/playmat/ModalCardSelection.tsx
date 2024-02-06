import { useEffect, useRef } from 'react';

// import close from '/assets/images/Layout/close.png';
import grid2active from '/assets/images/Invoke/grid-2-active.png';
import grid2inactive from '/assets/images/Invoke/grid-2-inactive.png';
import grid4active from '/assets/images/Invoke/grid-4-active.png';
import grid4inactive from '/assets/images/Invoke/grid-4-inactive.png';

import { CardTypes, DraftCardsEnum, ModalPlaymat } from '../../types';
import { CloseIcon, DeckChild } from '..';
import { useBoundStore } from '../../store';
import { initialModal } from '../../store/slices/playmat.slice';
import { CardDetails } from '../../interface';
import { RefinementLevel } from '../../layout';
import { useSelectCardHandler } from '../../handlers';
// import { UseImageLoader } from '../../Hook';

type Props = {
  modal: ModalPlaymat;
  card: DraftCardsEnum | null;
};

export function ModalCardSelection({ modal, card }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { cards, checkSlotIndicator, handleCloseModal, handleSelectRarity, checkingCardSelected } =
    useSelectCardHandler();
  const { playmat, setPlaymatState } = useBoundStore();

  const { cardTypes, modalCardSelection, gridView } = playmat;

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
    if (modalCardSelection[modal]) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ modalCardSelection: initialModal });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [modalCardSelection[modal], modal]);

  return (
    <div className="">
      {modalCardSelection[modal] && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-20 bg-[#242424]">
            <div className="text-[16px]">
              <div className="scrollbar-hidden flex flex-col items-center overflow-y-auto ">
                {/*  */}
                <div className="flexcenter relative mb-2 w-screen bg-gradient-to-b from-[#010E1A] to-[#000000] py-7">
                  <button onClick={() => handleCloseModal(modal)} className="absolute left-4 scale-[1.2]">
                    {/* <img src={close} alt="" className="h-max" /> */}
                    <CloseIcon />
                  </button>
                  {cardTypes === CardTypes.LEADER && <b className="roboto-condensed">Leader Card Selection</b>}
                  {cardTypes === CardTypes.SUPPORT && <b className="roboto-condensed">Support Card Selection</b>}
                  {cardTypes === CardTypes.PLAYER && <b className="roboto-condensed">Player Card Selection</b>}
                  {cardTypes === CardTypes.SKILL && <b className="roboto-condensed">Skill Card Selection</b>}
                  <div className="absolute right-5 rounded-md border border-[#0586FD] p-1">
                    <div className="flexcenter">
                      {gridButtons.map(item => (
                        <button onClick={() => setPlaymatState({ gridView: item.grid })}>
                          <img src={gridView === item.grid ? item.active : item.inactive} alt="" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div
                  className={`scrollbar-hidden grid max-h-[85vh] pb-[5rem] grid-cols-${gridView} mx-5 gap-3 overflow-x-auto overflow-y-auto pb-8`}
                >
                  {cards?.map((item, index: number) => {
                    const cardDetails: CardDetails = item?.card?.details as CardDetails;
                    return (
                      <>
                        <button
                          disabled={checkingCardSelected(item) && !checkSlotIndicator(card, item)}
                          onClick={
                            checkingCardSelected(item)
                              ? () => handleSelectRarity(modal, item, 'update')
                              : () => handleSelectRarity(modal, item, 'add')
                          }
                          key={index + 1}
                          className={`relative ${checkSlotIndicator(card, item) ? 'color-anim border-[3px]' : ''}`}
                        >
                          <RefinementLevel
                            isTrial={Boolean(item?.singleUseOnly)}
                            className="left-0 top-0 z-10"
                            level={item?.refinementLevel}
                          />
                          {cardDetails?.image === '' ? (
                            <p className="text-[10px]">{cardDetails?.name}</p>
                          ) : (
                            <img
                              src={cardDetails?.image}
                              alt=""
                              className={`${checkingCardSelected(item) ? 'brightness-[20%] grayscale filter' : ''}`}
                            />
                            // <UseImageLoader
                            //   src={cardDetails?.image as string}
                            //   className={`${checkingCardSelected(item) ? 'brightness-[20%] grayscale filter' : ''}`}
                            // />
                          )}
                        </button>
                      </>
                    );
                  })}
                </div>
                {/*  */}
                <MiniPlaymat />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const MiniPlaymat = () => {
  const { playmat } = useBoundStore();
  const { cardTypes, draftUI } = playmat;

  return (
    <>
      <div className="mini-playmat fixed bottom-0 z-40 w-screen py-6 text-[16px]">
        <div className="flexcenter gap-x-4 text-[9px]">
          {cardTypes === CardTypes.LEADER && (
            <DeckChild
              isPlayerSkill={false}
              modal={ModalPlaymat.leader}
              card={draftUI?.draft.leader}
              cardType={CardTypes.LEADER}
              displaySmall={true}
              cardData={DraftCardsEnum.leader}
            />
          )}
          {cardTypes === CardTypes.SUPPORT && (
            <>
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.support1}
                card={draftUI?.draft.support1}
                cardType={CardTypes.SUPPORT}
                displaySmall={true}
                cardData={DraftCardsEnum.support1}
              />
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.support2}
                card={draftUI?.draft.support2}
                cardType={CardTypes.SUPPORT}
                displaySmall={true}
                cardData={DraftCardsEnum.support2}
              />
            </>
          )}
          {cardTypes === CardTypes.PLAYER && (
            <>
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.player1}
                card={draftUI?.draft.player1}
                cardType={CardTypes.PLAYER}
                displaySmall={true}
                cardData={DraftCardsEnum.player1}
              />
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.player2}
                card={draftUI?.draft.player2}
                cardType={CardTypes.PLAYER}
                displaySmall={true}
                cardData={DraftCardsEnum.player2}
              />
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.player3}
                card={draftUI?.draft.player3}
                cardType={CardTypes.PLAYER}
                displaySmall={true}
                cardData={DraftCardsEnum.player3}
              />
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.player4}
                card={draftUI?.draft.player4}
                cardType={CardTypes.PLAYER}
                displaySmall={true}
                cardData={DraftCardsEnum.player4}
              />
              <DeckChild
                isPlayerSkill={false}
                modal={ModalPlaymat.player5}
                card={draftUI?.draft.player5}
                cardType={CardTypes.PLAYER}
                displaySmall={true}
                cardData={DraftCardsEnum.player5}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
