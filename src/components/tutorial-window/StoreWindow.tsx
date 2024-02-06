import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import storeBg from '/assets/images/onboard/storeBg.png';

export function StoreWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.store}
        totalSequence={2}
        data={[
          {
            welcomeTo: 'WELCOME TO EION!',
            title: 'STORE',
            img: storeBg,
            buttonText: 'NEXT',
            content: [
              <p>
                Eion is free to play, use Shards earned from <TextBlue content="Locker" />,{' '}
                <TextBlue content="Invoke" />, etc to open standard packs.
              </p>,
              <p>You may also purchase player cards from your favorite teams which have a higher gold drop rate.</p>,
              <>
                <div className="my-2 w-full">
                  <span className="mx-1 rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">STANDARD PACK</span>
                  <span className="mx-1 rounded-md bg-[#262626] px-3 py-1 text-[#0185FF]">ROTATING UTILITY PACK</span>
                </div>
                <div className="-mt-1 w-full">
                  <span className="rounded-md bg-[#262626] px-3 py-1 text-left text-[#0185FF]">TEAM SPECIFIC PACK</span>
                </div>
              </>,
            ],
          },
          {
            welcomeTo: 'Store: Boost your cards collection!',
            buttonText: 'Close',
            content: [
              <p>
                Discover our exciting Card Booster Packs to expand your collection. There are three enticing options:
              </p>,
              <p className="mt-5">
                1. <TextBlue content="Standard Pack" />: Your gateway to all things Eion! This pack includes Esports
                Player cards, Support cards, and Leader cards. Only purchasable through Shards.
              </p>,
              <p>
                2. <TextBlue content="Rotating Utility Pack" />: Embrace variety! This dynamic pack offers a higher
                chance of pulling Support cards and Leader cards. It changes weekly, so grab it with cash.
              </p>,
              <p>
                3. <TextBlue content="Team Specific Pack" />: Show your team spirit! Unwrap your favorite Esports team's
                cards with a guaranteed chance of pulling your favorite players.
              </p>,
            ],
          },
        ]}
      />
    </div>
  );
}
