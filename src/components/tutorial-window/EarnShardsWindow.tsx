import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import earnShards from '/assets/images/onboard/earnShards.png';

export function EarnShardsWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.shards}
        totalSequence={2}
        data={[
          {
            welcomeTo: 'EION SHARDS',
            title: 'EARN SHARDS',
            img: earnShards,
            buttonText: 'NEXT',
            content: [
              <p>
                Shards are EION's valuable in-game currency to unlock{' '}
                <span className="roboto-condensed-bold text-[#0185FF]">Booster Packs</span>. Here's how you can earn
                them:
              </p>,
              <div className="flexcenter my-2 gap-2">
                <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">LOCKER MATCHES</p>
                <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">INVOKE</p>
                <p className="rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">REFER A FRIEND</p>
              </div>,
            ],
          },
          {
            welcomeTo: 'Shards: Your Gateway to Rewards!',
            buttonText: 'Close',
            content: [
              <p>
                Shards are EION's valuable in-game currency, and they're your ticket to opening more{' '}
                <TextBlue content="Booster Packs" />. Here's how you can earn them:
              </p>,
              <div className="flex flex-col gap-2">
                <li className="mt-5">
                  <TextBlue content="Invoke" />: Build your dream team in the world of Invoke and earn Shards as you
                  conquer the fantasy league.
                </li>
                <li>
                  <TextBlue content="Locker Matches" />: Showcase your skills in predicting in Esports matches and watch
                  your Shards pile up throughout the season.
                </li>
                <li>
                  <TextBlue content="Referral Bonus" />: Spread the word of EION and bring a friend along! Gain 1000
                  Shards for every successful referral.
                </li>
              </div>,
            ],
          },
        ]}
      />
    </div>
  );
}
