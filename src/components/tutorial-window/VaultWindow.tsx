import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import vaultBg from '/assets/images/onboard/vaultBg.png';

export function VaultWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.vault}
        totalSequence={2}
        data={[
          {
            welcomeTo: 'WELCOME TO THE VAULT',
            title: 'VAULT',
            img: vaultBg,
            buttonText: 'NEXT',
            content: [
              <p>
                In the Vault, you'll discover your entire card collection, from Leader cards to Player cards and
                everything in between. It's a showcase of your esports journey, your strategies, and your triumphs. Dive
                in and explore the cards that tell your story!
              </p>,
            ],
          },
          {
            welcomeTo: 'HOME TO YOUR CARD COLLECTIONS',
            buttonText: 'Close',
            content: [
              <p>
                Inside the Vault, you'll find two distinct types of cards: <TextBlue content="Permanent" /> and
                <TextBlue content=" Trial" />.
              </p>,
              <div className="flex flex-col gap-2">
                <li className="mt-5">
                  <TextBlue content="Permanent Cards" />: These cards are yours to keep. They never vanish and can be
                  used both in Locker and Invoke matches. Build your ultimate strategy with these reliable cards.
                </li>
                <li>
                  <TextBlue content="Trial Cards" />: These cards are one-time use cards. Once you use them in a Locker
                  match, they vanish from your inventory. Harness their power wisely and gain valuable Shards! Trial
                  cards are only usable in <TextBlue content="Locker" />.
                </li>
              </div>,
              <p className="mt-4">
                Whether you're crafting a legacy with Permanent Cards or seizing the perfect opportunity with Trial
                Cards, the Vault is your sanctuary for strategic mastery. Explore and strategize!  
              </p>,
            ],
          },
        ]}
      />
    </div>
  );
}
