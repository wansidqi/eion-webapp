import { Link } from 'react-router-dom';
import { TextBlue, WindowTemplate } from '..';
import { WINDOW_STATE } from '../../types';

import lockerBg from '/assets/images/onboard/lockerBg.png';
import lockerBg2 from '/assets/images/onboard/lockerBg2.png';

export function LockerWindow() {
  return (
    <div>
      <WindowTemplate
        windowState={WINDOW_STATE.locker}
        totalSequence={3}
        data={[
          {
            welcomeTo: 'WELCOME TO LOCKER!',
            title: 'LOCKER',
            img: lockerBg,
            buttonText: 'NEXT',
            content: [
              <p>
                Use <TextBlue content="Leader" />, <TextBlue content="Support" /> and <TextBlue content="Player" />{' '}
                cards to predict on the outcome of matches.{' '}
              </p>,
              <p>
                Make correct predictions, collect <TextBlue content="Shards" />, open packs and acquire more player
                cards! These cards are your key to building your ultimate dream team.
              </p>,
            ],
          },
          {
            welcomeTo: 'Step into the Lobby of Legends!',
            buttonText: 'NEXT',
            content: [
              <p>
                Locker a prediction based collectible card game designed for esports viewers and fans! The goal of the
                game is to attain the highest score possible through drafting the outcomes of Esports games and matches.
              </p>,
              <p>Select leader, players and support cards to earn points based on your predictions.</p>,
              <div className="flexcenter">
                <img src={lockerBg2} alt="" />
              </div>,
              <Link target="_blank" to={import.meta.env.VITE_HOW_TO_PLAY}>
                <b className="flexcenter mb-10 mt-2 text-[#0185FF] underline">CLICK HERE TO WATCH A TUTORIAL</b>
              </Link>,
            ],
          },
          {
            welcomeTo: 'Predict, Collect and Invoke!',
            buttonText: 'Close',
            content: [
              <p>In the Lobby, the world of Esports unfolds before your eyes. Check out what's in store:</p>,
              <p className="mt-5">
                <TextBlue content="Upcoming Matches" />: These are scheduled matches that have not begun. Draft ahead of
                time before the game day!
              </p>,
              <p>
                <TextBlue content="Live Matches" />: These are matches that have already begun. Don’t worry you can
                still draft for the games that have yet to start!
              </p>,
              <p>
                <TextBlue content="Past Matches" />: View the past matches that you have competed in. Review previous
                strategies and refine your game plan for the future games.
              </p>,
              <p>
                <TextBlue content="Share Your Matches" />: Share your game drafts with fellow Esports enthusiasts.
                Showcase your strategies and boast on your achievements.
              </p>,
            ],
          },
        ]}
      />
    </div>
  );
}
