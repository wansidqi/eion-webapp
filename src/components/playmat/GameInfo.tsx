import diamond from '/assets/images/Store/diamond.png';

import { useNavigate, useParams } from 'react-router-dom';
import { ToggleVote } from '..';
import { DraftInterface } from '../../interface';
import { useGetQueryData, RQ_KEY, useRepositories } from '../../repositories';
import { epochTime } from '../../utils';

export function GameInfo() {
  const { gameID, matchID } = useParams();
  const navigate = useNavigate();
  const { useGetGameByID } = useRepositories();

  const game = useGetGameByID(gameID as string)?.data;
  const draft = useGetQueryData<DraftInterface>([RQ_KEY.DRAFT, gameID]);

  const { days, hours, minutes } = epochTime((game?.[0] && game?.[0]?.match?.dateTime) as Date);

  return (
    <div className="roboto-condensed relative mx-3 my-8 text-[14px]">
      <div className="flexcenter scale-[0.9] gap-4 text-center ">
        <ToggleVote />

        <div className="flexcenter-col draft-timer px-2 py-2">
          <div className="flexcenter gap-3 text-[20px] font-extrabold">
            <b>{days || '00'}</b>
            <b>:</b>
            <b>{hours || '00'}</b>
            <b>:</b>
            <b>{minutes || '00'}</b>
          </div>
          <div className="flexcenter gap-6 text-[12px] text-[#A4A4A4]">
            <b>Day</b>
            <b>Hour</b>
            <b>Min</b>
          </div>
        </div>

        <button
          disabled={!Boolean(draft)}
          onClick={() => navigate(`/result/${matchID}/${gameID}`)}
          className="flexcenter gap-[0.15rem]"
        >
          <div className="flexcenter h-[48px] rounded-sm border-[1.5px] border-[#626262] bg-[#242424] px-3">
            <img src={diamond} className="scale-[1.4]" alt="" />
          </div>
          <div className="blue-radial-btn flexcenter relative h-[48px] rounded-sm border-[1.5px] px-4">
            {/* <div className="absolute -right-1 -top-1 h-[10px] w-[10px] rounded-full bg-red-600"></div> */}
            <b className="text-[16px]">{draft?.draft?.score?.totalFP ?? 0}</b>
          </div>
        </button>
      </div>
    </div>
  );
}
