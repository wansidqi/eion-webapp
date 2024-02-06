import { DeckChild, ModalCardSelection, SelectRarity } from '..';
import { useBoundStore } from '../../store';
import { CardTypes, DraftCardsEnum, ModalPlaymat } from '../../types';

export function PlayerSkills() {
  const { playmat } = useBoundStore();
  const { draftUI } = playmat;

  return (
    <div className="">
      {/* <div className="py-3 backdrop-blur-sm"> */}
      <div className="mt-5 py-3 pb-10">
        <div className="grid grid-cols-5 justify-items-center gap-x-3">
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.player1}
            card={draftUI?.draft.player1}
            cardType={CardTypes.PLAYER}
            cardData={DraftCardsEnum.player1}
          />
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.player2}
            card={draftUI?.draft.player2}
            cardType={CardTypes.PLAYER}
            cardData={DraftCardsEnum.player2}
          />
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.player3}
            card={draftUI?.draft.player3}
            cardType={CardTypes.PLAYER}
            cardData={DraftCardsEnum.player3}
          />
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.player4}
            card={draftUI?.draft.player4}
            cardType={CardTypes.PLAYER}
            cardData={DraftCardsEnum.player4}
          />
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.player5}
            card={draftUI?.draft.player5}
            cardType={CardTypes.PLAYER}
            cardData={DraftCardsEnum.player5}
          />
        </div>
      </div>

      <ModalCardSelection modal={ModalPlaymat.player1} card={DraftCardsEnum.player1} />
      <ModalCardSelection modal={ModalPlaymat.player2} card={DraftCardsEnum.player2} />
      <ModalCardSelection modal={ModalPlaymat.player3} card={DraftCardsEnum.player3} />
      <ModalCardSelection modal={ModalPlaymat.player4} card={DraftCardsEnum.player4} />
      <ModalCardSelection modal={ModalPlaymat.player5} card={DraftCardsEnum.player5} />

      <SelectRarity modal={ModalPlaymat.player1} nextModal={ModalPlaymat.player2} card={DraftCardsEnum.player1} />
      <SelectRarity modal={ModalPlaymat.player2} nextModal={ModalPlaymat.player3} card={DraftCardsEnum.player2} />
      <SelectRarity modal={ModalPlaymat.player3} nextModal={ModalPlaymat.player4} card={DraftCardsEnum.player3} />
      <SelectRarity modal={ModalPlaymat.player4} nextModal={ModalPlaymat.player5} card={DraftCardsEnum.player4} />
      <SelectRarity modal={ModalPlaymat.player5} nextModal={null} card={DraftCardsEnum.player5} />
    </div>
  );
}
