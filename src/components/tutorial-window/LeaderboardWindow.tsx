import { Link } from 'react-router-dom';
import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import lbBg from '/assets/images/onboard/lbBg.png';
// import lbBg2 from '/assets/images/onboard/lbBg2.png';
import lbBg3 from '/assets/images/onboard/lbBg3.png';

export function LeaderboardWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.leaderboard}
        totalSequence={2}
        data={[
          {
            welcomeTo: 'EION LEADERBOARDS',
            title: 'LEADERBOARD',
            img: lbBg,
            buttonText: 'NEXT',
            content: [
              <p className='mb-10'>
                Eion is taking esports to the next level! We're thrilled to unveil our amazing{' '}
                <TextBlue content="Intangible Rewards" />! Conquer the leaderboards and claim a slice of the action.
              </p>,
              // <div className="flexcenter my-2 gap-2">
              //   <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">WEEKLY LEADERBOARD</p>
              //   <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">SEASONAL LEADERBOARD</p>
              // </div>,
            ],
          },
          // {
          //   welcomeTo: 'WEEKLY LEADERBOARD',
          //   buttonText: 'Next',
          //   content: [
          //     <div>
          //       <div className="flexcenter">
          //         <img src={lbBg2} alt="" />
          //       </div>
          //       <p className="mt-4">
          //         Test your gaming prowess against fierce competition! A weekly cash prize of{' '}
          //         <TextBlue content="US$ 250" /> will be paid out every week.
          //       </p>
          //     </div>,
          //   ],
          // },
          {
            welcomeTo: 'SEASONAL LEADERBOARD',
            buttonText: 'Close',
            content: [
              <div>
                <div className="flexcenter">
                  <img src={lbBg3} alt="" />
                </div>
                {/* <p className="text-ob mt-6 text-center text-[23px]">US$ 2,500 + 25% Booster Pack Sale</p> */}
                <p className="mt-14">
                  Get ready to chase greatness on Eion's Seasonal Leaderboard! Winners will earn the chance to access
                  and claim interesting
                  <span className="text-[#0185FF] underline">
                    <TextBlue content="Team Rewards" />
                  </span>{' '}
                  from your beloved esports teams.
                </p>
                <p className="mt-2">
                  At the end of the season, we will crown the true champions. Will it be you? Will you bask in the glory
                  of victory and riches? Game on!
                </p>
              </div>,
              <Link target="_blank" to={import.meta.env.VITE_VIEW_REWARDS}>
                <b className="flexcenter mb-6 mt-2 text-[#0185FF] underline">CLICK HERE TO VIEW REWARDS</b>
              </Link>,
            ],
          },
        ]}
      />
    </div>
  );
}
