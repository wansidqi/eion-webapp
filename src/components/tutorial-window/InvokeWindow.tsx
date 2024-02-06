import { Link } from 'react-router-dom';
import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import invokeBg from '/assets/images/onboard/invoke.png';

export function InvokeWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.invoke}
        totalSequence={2}
        data={[
          {
            welcomeTo: 'WELCOME TO INVOKE!',
            title: 'INVOKE',
            img: invokeBg,
            buttonText: 'NEXT',
            content: [
              <p>Field your best five players and complete in the leaderboard with your dream team. </p>,
              <p>
                Gain access to <span className="roboto-condensed-bold text-[#0185FF]">Team Rewards</span> from your
                beloved esports teams. Show your allegiance and be part of the action both in-game and in the real
                world!
              </p>,
              <Link target="_blank" to={import.meta.env.VITE_HOW_TO_PLAY_INVOKE}>
                <b className="flexcenter mb-10 mt-2 text-[#0185FF] underline">CLICK HERE TO WATCH A TUTORIAL</b>
              </Link>,
            ],
          },
          {
            welcomeTo: 'Assemble Your Ultimate Dream Team! ',
            buttonText: 'Close',
            content: [
              <p>
                Player Cards will earn points based on their K/D/A (Kills/Deaths/Assists), following the same scoring
                system as Locker.
              </p>,
              <div className="my-2">
                <p>Scoring:</p>
              </div>,
              <div className="roboto-condensed-bold flex flex-col">
                <TextBlue content="Kills: +10SP" />
                <TextBlue content="Death: -10SP" />
                <TextBlue content="Assists: +5SP" />
              </div>,
              <p className="mt-2">
                K/D/A scores will be updated weekly. The objective is to identify the top Player Cards in the gold,
                roam, mid, jungle, and exp roles of week.
              </p>,
            ],
          },
        ]}
      />
    </div>
  );
}
