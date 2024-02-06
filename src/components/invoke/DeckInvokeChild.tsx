import { UserCardInterface, RoleInvoke, PlayerInvoke } from '../../interface';
import { useBoundStore } from '../../store';
import '../../css/invoke.css';

import close from '/assets/images/Playmat/close.png';
import { setBaseSlotName } from '../../utils';

interface Props {
  data?: UserCardInterface | null;
  card?: UserCardInterface | null;
  displaySmall?: boolean;
  role: RoleInvoke;
  player: PlayerInvoke;
}

export function DeckInvokeCard({ card, displaySmall, role, player, data }: Props) {
  const { invoke, setInvokeState } = useBoundStore();
  const { modalPlayerSelection, lockInvoke, invokeDraft } = invoke;

  const roleShorthand = (role: RoleInvoke) => {
    switch (role) {
      case RoleInvoke.EXP:
        return 'EXP';
      case RoleInvoke.MID:
        return 'MID';
      case RoleInvoke.GOLD:
        return 'GD';
      case RoleInvoke.JUNGLE:
        return 'JGL';
      case RoleInvoke.ROAM:
        return 'RM';

      default:
        break;
    }
  };

  const handleClickSlot = () => {
    if (lockInvoke === false) {
      setInvokeState({ modalPlayerSelection: { [role]: true } });
    } else if (!card) {
      return;
    } else {
      setInvokeState({ invokePreview: true, viewInvoke: card });
    }
  };

  const handleRemoveCard = () => {
    //@ts-ignore
    const removeCard = { ...invokeDraft.draft, [player]: null, [setBaseSlotName(player)]: null };
    setInvokeState({ invokeDraft: { draft: removeCard } });
  };

  const Role = () => {
    return (
      <div className={`flexcenter-col gap-y-3 ${displaySmall ? 'mt-1 scale-[0.7]' : 'mt-3'}`}>
        {!displaySmall && <p className="deadjim text-center text-[16px] text-[#8D8D8D]">{role?.toUpperCase()}</p>}
        {displaySmall && (
          <p className="roboto-condensed-bold text-center text-[22px] tracking-widest text-[#8D8D8D]">
            {roleShorthand(role)}
          </p>
        )}
      </div>
    );
  };

  const InvokeData = () => {
    return (
      <>
        {player && invokeDraft.draft[player]?.card?.details?.image ? (
          <div className="mt-2 h-full w-full">
            <img
              src={player && invokeDraft.draft[player]?.card?.details?.image}
              className={`${displaySmall ? 'crop absolute scale-[1.6]' : 'scale-[1.1]'}`}
              alt=""
            />
          </div>
        ) : (
          <Role />
        )}
      </>
    );
  };

  const InvokeUI = () => {
    return (
      <div className={`${displaySmall ? 'mt-2' : 'flexcenter'} h-full w-full`}>
        {card?.card?.details?.image ? (
          <>
            {card && displaySmall && (
              <img
                src={close}
                onClick={() => handleRemoveCard()}
                className="absolute -right-1 -top-1 z-10 w-4 cursor-pointer"
                alt=""
              />
            )}
            <img
              src={card?.card?.details?.image}
              className={`${displaySmall ? 'crop absolute scale-[1.6]' : 'scale-[1.1]'}`}
              alt=""
            />
          </>
        ) : (
          <Role />
        )}
      </div>
    );
  };

  // const KDAdetail = () => (
  //   <div className="flexcenter roboto-condensed mt-4 justify-start bg-[#464545] text-center text-[14px]">
  //     <div className="bg-[#242424] p-2">
  //       <p className="kda">KDA</p>
  //     </div>
  //     <div className="flexcenter w-full">
  //       <p className="kda text-[12px]">
  //         {invokeDraft?.results?.[player]?.kill ?? '-'} / {invokeDraft?.results?.[player]?.death ?? '-'} /
  //         {invokeDraft?.results?.[player]?.assist ?? '-'}
  //       </p>
  //     </div>
  //   </div>
  // );

  const RoleAndName = () => (
    <div className="flexcenter roboto-condensed mt-4 justify-start bg-[#464545] text-center text-[14px]">
      <div className="bg-[#242424] p-2">
        <p className="kda">{roleShorthand(role)}</p>
      </div>
      <div className="flexcenter w-full">
        <p className="kda text-[12px]">
          {card?.card?.details?.name?.split(' ').slice(-1).toString().toUpperCase() || '-'}
        </p>
      </div>
    </div>
  );

  const previewCard = () => {
    setInvokeState({ selectItem: card, cardPreview: true });
  };

  return (
    <div>
      <>
        <button
          onClick={lockInvoke ? () => previewCard() : () => handleClickSlot()}
          className={`flexcenter-col relative ${
            displaySmall
              ? modalPlayerSelection[role]
                ? 'color-anim deck-active deck-playmat-selection rounded-md'
                : 'deck-playmat-selection gradient-border'
              : 'invoke-card-size'
          } `}
        >
          {data ? <InvokeData /> : <InvokeUI />}
        </button>
        {!displaySmall && <RoleAndName />}
      </>
    </div>
  );
}
