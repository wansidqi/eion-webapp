import { useNavigate } from 'react-router-dom';
import { useBoundStore } from '../../store';
import { MatchStatus } from '../../types';

export function InfoReferral() {
  const navigate = useNavigate();
  const { setLobbyState } = useBoundStore();

  const enterLocker = () => {
    navigate('/lobby');
    setLobbyState({ matchStatus: MatchStatus.UPCOMING });
  };

  return (
    <>
      <div className="mx-4 w-full bg-[#242424] bg-opacity-60 ">
        <div className="flex w-full flex-col">
          <div className="refbgcolor w-full">
            <p className="deadjim px-2 py-2 text-center text-[16px] ">EARN SHARDS FROM LOCKER</p>
          </div>
          <div className="roboto-condensed mx-1 my-5 text-left text-base">
            <p className="mt-2 text-base">Every game you play in Locker you will earn 200 Shards.</p>
            {/* <br /> */}
            <p className="mt-2 text-base">
              Guess the winning team correctly and you will earn an additional 200 Shards.
            </p>
            {/* <br /> */}
            <p className="mt-2 text-base">For every correct card prediction you will earn additional Shards.</p>
          </div>
          <button onClick={enterLocker} className="blue-radial mx-20 mb-2 mt-1 rounded-md py-2 text-[16px]">ENTER LOCKER</button>
        </div>
      </div>
    </>
  );
}
