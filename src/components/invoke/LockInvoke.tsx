import { useBoundStore } from '../../store';
import { SeasonInterface } from '../../interface';
import { useGetQueryData, RQ_KEY, AuthResponse } from '../../repositories';
import { Link } from 'react-router-dom';
import { ShareIcon, DiscordIcon } from '..';
import { useLockStateHandler } from '../../handlers';

import loading from '/assets/images/Layout/loading.png';

export function LockInvoke() {
  const { handleUnlockInvoke, clickConfirm } = useLockStateHandler();
  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const season: SeasonInterface = useGetQueryData([RQ_KEY.SEASON]);
  const { setInvokeState, invoke } = useBoundStore();
  const { lockInvoke } = invoke;

  const openModal = () => {
    lockInvoke ? handleUnlockInvoke() : setInvokeState({ invokeWarningModal: true });
  };

  const buttons = [
    {
      name: 'share',
      icon: <ShareIcon />,
      link: `/invoke/share/${userId}`,
      target: '_self',
    },
    {
      name: 'discord',
      icon: <DiscordIcon />,
      link: 'https://discord.gg/W2UfXf7NsU',
      target: '_blank',
    },
  ];

  return (
    <div className="roboto-condensed flex justify-center">
      <div className="relative flex-1 gap-y-0">
        <div className="flexcenter my-10 gap-2">
          {buttons.map(button => (
            <div key={button.name} className="metal h-16 w-16">
              <Link target={button.target} to={button.link}>
                <button className={`black-gradient h-full w-full rounded-sm border border-[#C2C2C2]`}>
                  <div className="flexcenter">{button.icon}</div>
                </button>
              </Link>
            </div>
          ))}
          <div className="metal h-16 w-2/3">
            <button
              disabled={season?.isLocked}
              onClick={openModal}
              className={`${
                season?.isLocked ? 'bg-[#808080]' : lockInvoke ? 'red-radial-btn border' : 'blue-radial-btn'
              } relative h-full w-full rounded-sm py-3`}
            >
              <b className="text-[16px]">{lockInvoke ? 'CHANGE DRAFT' : 'SUBMIT DRAFT'}</b>
              {clickConfirm && (
                <div className="loader absolute right-2  top-[0.65rem]">
                  <img src={loading} alt="" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
