import { ModalLayout } from '../../layout';
import { useBoundStore } from '../../store';
import '../../css/onboard.css';

import teamBg from '/assets/images/onboard/teamBg.png';

export function CardObtainedWindow() {
  const { onboarding, setOnboardingState } = useBoundStore();
  const { cardObtained } = onboarding;

  const onClickNext = async () => {
    setOnboardingState({ cardObtained: false });
  };

  const TextBlue = ({ content }: { content: string }) => (
    <span className="roboto-condensed-bold text-[#0185FF]">{content}</span>
  );

  return (
    <ModalLayout modalState={cardObtained}>
      <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
        <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
          <p className="flex-1 text-center">YOU HAVE STEPPED INTO THE WORLD OF EION!</p>
        </div>

        <div className="flexcenter-col gap-3 px-3 py-6 text-[14px]">
          <img className="mb-2" src={teamBg} alt="" />
          <div className="flex flex-col items-start justify-center gap-2 text-left">
            <p>
              We have awarded you <TextBlue content="10,000 Shards" /> to start opening free standard booster packs.
            </p>
            <p>
              Open <TextBlue content="Booster Packs" /> to get more cards to play on <TextBlue content="Invoke" /> and{' '}
              <TextBlue content="Locker" />.
            </p>
            <p>Happy Adventuring!</p>
          </div>
          <button onClick={onClickNext} className="mt-4 w-full border py-2">
            START YOUR JOURNEY
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
