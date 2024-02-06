// import crown from '/assets/images/Playmat/crown.svg';
import { CardTypes, DraftCardsEnum, ModalPlaymat } from '../../types';
import { DeckChild, ModalCardSelection, SelectRarity } from '..';
import { useBoundStore } from '../../store';

export function LeaderSupport() {
  const { playmat } = useBoundStore();
  const { draftUI } = playmat;

  return (
    <>
      <div className="flex justify-center gap-2">
        <div className="relative px-4 py-3">
          <div>
            <DeckChild
              isPlayerSkill={false}
              modal={ModalPlaymat.leader}
              card={draftUI?.draft.leader}
              cardType={CardTypes.LEADER}
              cardData={DraftCardsEnum.leader}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-x-3 px-4 py-3">
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.support1}
            card={draftUI?.draft.support1}
            cardType={CardTypes.SUPPORT}
            cardData={DraftCardsEnum.support1}
          />
          <DeckChild
            isPlayerSkill={false}
            modal={ModalPlaymat.support2}
            card={draftUI?.draft.support2}
            cardType={CardTypes.SUPPORT}
            cardData={DraftCardsEnum.support2}
          />
        </div>
      </div>

      <ModalCardSelection modal={ModalPlaymat.leader} card={DraftCardsEnum.leader} />
      <ModalCardSelection modal={ModalPlaymat.support1} card={DraftCardsEnum.support1} />
      <ModalCardSelection modal={ModalPlaymat.support2} card={DraftCardsEnum.support2} />

      <SelectRarity modal={ModalPlaymat.leader} nextModal={null} card={DraftCardsEnum.leader} />
      <SelectRarity modal={ModalPlaymat.support1} nextModal={ModalPlaymat.support2} card={DraftCardsEnum.support1} />
      <SelectRarity modal={ModalPlaymat.support2} nextModal={null} card={DraftCardsEnum.support2} />
    </>
  );
}
