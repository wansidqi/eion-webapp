import { ModalLayout } from '../../layout';
import { useBoundStore } from '../../store';
import '../../css/onboard.css';

import teamBg from '/assets/images/onboard/teamBg.png';

export function BeforePack() {
  const { onboarding, setOnboardingState } = useBoundStore();
  const { beforePack } = onboarding;

  const onClickNext = async () => {
    setOnboardingState({ beforePack: false });
  };

  const TextBlue = ({ content }: { content: string }) => (
    <span className="roboto-condensed-bold text-[#0185FF]">{content}</span>
  );

  return (
    <ModalLayout modalState={beforePack}>
      <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
        <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
          <p className="flex-1 text-center">YOU HAVE STEPPED INTO THE WORLD OF EION!</p>
        </div>

        <div className="flexcenter-col gap-3 px-3 py-6 text-[14px]">
          <div className="my-8">
            <img className="mb-2" src={teamBg} alt="" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2 text-left">
            <p>
              We are glad to have you join us! You will be granted <TextBlue content="Trial Cards" /> to kickstart your
              experience.
            </p>
            <p>
              Pick your favorite teams of <TextBlue content="each regions" />.
            </p>
            <p>
              <TextBlue content="Trial cards are limited to 1 use only. It will be removed from your inventory once used." />
            </p>
          </div>
          <button onClick={onClickNext} className="mt-4 w-full border py-2">
            PICK YOUR STARTER
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
