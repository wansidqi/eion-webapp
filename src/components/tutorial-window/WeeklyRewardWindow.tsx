import { TextBlue } from '..';
import { ModalLayout } from '../../layout';
import { useBoundStore } from '../../store';
import lbBg2 from '/assets/images/onboard/lbBg2.png';

export function WeeklyRewardWindow() {
  const { window, setWindowState } = useBoundStore();
  const { weeklyRewardWindow } = window;

  const data = {
    welcomeTo: 'WEEKLY LEADERBOARD',
    buttonText: 'Close',
    content: [
      <div>
        <div className="flexcenter">
          <img src={lbBg2} alt="" />
        </div>
        <p className="mt-4">
          Test your gaming prowess against fierce competition! A weekly cash prize of <TextBlue content="US$ 250" />{' '}
          will be paid out every week.
        </p>
      </div>,
    ],
  };

  return (
    <div>
      <ModalLayout modalState={weeklyRewardWindow}>
        <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
          <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
            <p className="flex-1 text-center">{data.welcomeTo}</p>
          </div>

          <div className="flex flex-col gap-3 px-4 py-6 text-[14px]">
            <div className="flexcenter"></div>
            <div className="flex flex-col gap-2">{data.content.map(item => item)}</div>
            <button onClick={() => setWindowState({ weeklyRewardWindow: false })} className="mt-4 w-full border py-2">
              {data.buttonText}
            </button>
          </div>
        </div>
      </ModalLayout>
    </div>
  );
}
