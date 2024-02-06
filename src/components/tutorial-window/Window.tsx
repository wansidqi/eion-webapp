import { ModalLayout } from '../../layout';
import '../../css/onboard.css';
import { useState } from 'react';
import { getToken, setToken } from '../../datasources/localstorage.datasource';
import { WINDOW_STATE } from '../../types';

interface Data {
  welcomeTo: string;
  title?: string;
  img?: string;
  buttonText: string;
  content: JSX.Element[];
}

interface Props {
  data: Data[];
  totalSequence: number;
  isReward?: boolean;
  windowState: WINDOW_STATE;
}

export const TextBlue = ({ content }: { content: string }) => (
  <span className="roboto-condensed-bold text-[#0185FF]">{content}</span>
);

export function WindowTemplate({ data, totalSequence, isReward, windowState }: Props) {
  const [sequence, setSequence] = useState(0);
  const getState = getToken(windowState) === null ? true : false;
  const [state, setState] = useState<boolean>(getState);
  const [tick, setTick] = useState(false);

  const onClickNext = () => {
    if (sequence === data.length - 1) {
      setState(false);
      if (tick) {
        setToken(windowState, 'false');
      } else {
        return;
      }
    } else {
      setSequence(prev => (prev += 1));
    }
  };

  return (
    <ModalLayout modalState={state}>
      <div className="roboto-condensed mx-2 rounded-md border border-[#0185FF] bg-[#00061D] text-left lg:px-20">
        <div className="flex w-full items-center justify-between bg-[#4584BF] py-3">
          <p className="flex-1 text-center">{data[sequence].welcomeTo}</p>
          {!isReward && <p className="mr-2">{`[${sequence + 1}/${totalSequence}]`}</p>}
        </div>

        <div className="flex flex-col gap-3 px-4 py-6 text-[14px]">
          <p className="roboto-condensed-bold text-ob text-center text-[32px]">{data[sequence].title}</p>
          <div className="flexcenter">
            {data[sequence].img && <img className="mb-2 w-40" src={data[sequence].img} alt="" />}
          </div>
          <div className="flex flex-col gap-2">{data[sequence].content.map(item => item)}</div>
          {sequence === data.length - 1 && (
            <div className="mt-4 flex w-full gap-2">
              <input onChange={() => setTick(!tick)} checked={tick} type="checkbox" />
              <p>Never show this again</p>
            </div>
          )}
          <button onClick={onClickNext} className="mt-4 w-full border py-2">
            {data[sequence].buttonText}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
