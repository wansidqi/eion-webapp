import { Link } from 'react-router-dom';
import { TextBlue } from '..';
import { ModalLayout } from '../../layout';
import { useBoundStore } from '../../store';
import lbBg3 from '/assets/images/onboard/lbBg3.png';

export function SeasonalRewardWindow() {
  const { window, setWindowState } = useBoundStore();
  const { seasonalRewardWindow } = window;

  const data = {
    welcomeTo: 'SEASONAL LEADERBOARD',
    buttonText: 'Close',
    content: [
      <div>
        <div className="flexcenter">
          <img src={lbBg3} alt="" />
        </div>
        {/* <p className="text-ob mt-6 text-center text-[23px]">US$ 2,500 + 25% Booster Pack Sale</p> */}
        <p className="mt-14">
          Get ready to chase greatness on Eion's Seasonal Leaderboard! Winners will earn the chance to access and claim
          interesting
          <span className="text-[#0185FF] underline">
            <TextBlue content="Team Rewards" />
          </span>{' '}
          from your beloved esports teams.
        </p>
        <p className="mt-2">
          At the end of the season, we will crown the true champions. Will it be you? Will you bask in the glory of
          victory and riches? Game on!
        </p>
      </div>,
      <Link target="_blank" to={import.meta.env.VITE_VIEW_REWARDS}>
        <b className="flexcenter mb-10 mt-2 text-[#0185FF] underline">CLICK HERE TO VIEW REWARDS</b>
      </Link>,
    ],
  };

  return (
    <div>
      <ModalLayout modalState={seasonalRewardWindow}>
        <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
          <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
            <p className="flex-1 text-center">{data.welcomeTo}</p>
          </div>

          <div className="flex flex-col gap-3 px-4 py-6 text-[14px]">
            <div className="flexcenter"></div>
            <div className="flex flex-col gap-2">{data.content.map(item => item)}</div>
            <button onClick={() => setWindowState({ seasonalRewardWindow: false })} className="mt-4 w-full border py-2">
              {data.buttonText}
            </button>
          </div>
        </div>
      </ModalLayout>
    </div>
  );
}
