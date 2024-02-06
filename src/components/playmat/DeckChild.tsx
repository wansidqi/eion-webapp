import { CardTypes, DraftCardsEnum, MatchStatus, ModalPlaymat } from '../../types';
import { useBoundStore } from '../../store';
import leaderIcon from '/assets/images/Playmat/leaderIcon.svg';
import playerIcon from '/assets/images/Playmat/playerIcon.svg';
import supportIcon from '/assets/images/Playmat/supportIcon.svg';
import skillIcon from '/assets/images/Playmat/skillIcon.svg';
import close from '/assets/images/Playmat/close.png';
import { RQ_KEY, useGetQueryData } from '../../repositories';
import { useParams } from 'react-router-dom';
import { DraftInterface, MatchInterface, UserCardInterface } from '../../interface';
import { RefinementLevel } from '../../layout';
import { setBaseSlotName } from '../../utils';

interface Props {
  modal: ModalPlaymat;
  isPlayerSkill: boolean;
  card?: UserCardInterface | null;
  cardType?: any;
  displaySmall?: boolean;
  cardData?: DraftCardsEnum;
}

export function DeckChild({ modal, card, cardType, displaySmall, cardData }: Props) {
  /*  */
  const { gameID, matchID } = useParams();
  const { setPlaymatState, playmat } = useBoundStore();
  const { lockDraft, modalCardSelection, cardTypes, draftUI } = playmat;

  const match = useGetQueryData<MatchInterface>([RQ_KEY.MATCH, matchID]);
  const data = useGetQueryData<DraftInterface>([RQ_KEY.DRAFT, gameID]);

  const handleOpenModal = (i: CardTypes) => {
    setPlaymatState({ cardTypes: i, modalCardSelection: { [modal]: true } });
  };

  const handleClickSlot = (cardTypeToOpen: CardTypes, draftDataToPreview: DraftCardsEnum | undefined) => {
    if (lockDraft === false && match?.status !== MatchStatus.PAST) {
      handleOpenModal(cardTypeToOpen);
    } else if (data && draftDataToPreview && data?.draft[draftDataToPreview]) {
      setPlaymatState({ draftPreview: true, viewDraft: draftDataToPreview && data?.draft[draftDataToPreview] });
    }
  };

  const handleRemoveCard = (draftData: DraftCardsEnum | undefined) => {
    const removeCard = { ...draftUI.draft, [draftData!]: null, [setBaseSlotName(draftData)!]: null };
    setPlaymatState({ draftUI: { draft: removeCard } });
  };

  const RoleIcon = () => {
    return (
      <div className="">
        {CardTypes.LEADER === cardType && <img src={leaderIcon} alt="" />}
        {CardTypes.SUPPORT === cardType && <img src={supportIcon} alt="" />}
        {CardTypes.PLAYER === cardType && <img src={playerIcon} alt="" />}
        {CardTypes.SKILL === cardType && <img src={skillIcon} alt="" />}
      </div>
    );
  };

  const DraftData = () => {
    return (
      <>
        <div className="">
          {cardData && data?.draft[cardData] && (
            <>
              {!displaySmall && (
                <RefinementLevel
                  className="-left-2 -top-2 z-10"
                  level={data?.draft[cardData]?.refinementLevel}
                  isTrial={Boolean(data?.draft[cardData]?.singleUseOnly)}
                />
              )}
            </>
          )}
          {cardData && data?.draft[cardData] ? (
            <div className="h-full w-full">
              <img
                src={data?.draft[cardData]?.card?.details?.image}
                className={`${displaySmall ? 'crop absolute scale-[1.7]' : 'mt-2 scale-[1.1]'}`}
                alt=""
              />
            </div>
          ) : (
            <RoleIcon />
          )}
        </div>
      </>
    );
  };

  const DraftUI = () => {
    return (
      <>
        {card ? (
          <div className="mt-2 h-full w-full">
            {!displaySmall && (
              <RefinementLevel
                className="-left-1 -top-1 z-10"
                level={card?.refinementLevel}
                isTrial={Boolean(card?.singleUseOnly)}
              />
            )}
            <img
              src={card?.card?.details?.image}
              className={`${displaySmall ? 'crop absolute scale-[1.7]' : 'scale-[1.1]'}`}
              alt=""
            />
          </div>
        ) : (
          <RoleIcon />
        )}
      </>
    );
  };

  return (
    <div>
      <button
        onClick={() => handleClickSlot(cardType, cardData)}
        className={`flexcenter-col relative ${
          displaySmall
            ? modalCardSelection[modal] && cardTypes === cardType
              ? 'color-anim deck-active deck-playmat-selection rounded-md'
              : 'deck-playmat-selection gradient-border'
            : 'placeholder-card'
        } `}
      >
        {displaySmall && card && (
          <img
            src={close}
            onClick={() => handleRemoveCard(cardData)}
            className="absolute -right-1 -top-1 z-10 w-4 cursor-pointer"
            alt=""
          />
        )}
        {lockDraft && data?.draft && cardData ? <DraftData /> : <DraftUI />}
        <div className="absolute -top-3 left-1/2 w-max -translate-x-1/2 transform"></div>
      </button>
    </div>
  );
}
