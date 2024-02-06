import { BackBtn, NextBtn } from '..';
import { useRepositories } from '../../repositories';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoundStore } from '../../store';
import { useEffect } from 'react';
import { initialDraft } from '../../store/slices/playmat.slice';
import { usePopupHandler, useQueriesHandler } from '../../handlers';

export function GameName() {
  usePopupHandler();
  const { currentIndex, gamesQry, matchQry } = useQueriesHandler();
  const navigate = useNavigate();
  const { matchID } = useParams();
  const { setPlaymatState } = useBoundStore();

  const { useGetMatchById } = useRepositories();
  const { refetch } = useGetMatchById(matchID || '');

  const handleBack = () => {
    if (currentIndex === 0) {
      navigate(`/match/${matchID}`);
    }
    if (currentIndex > 0) {
      const gameID = gamesQry[currentIndex - 1]?.id;
      navigate(`/draft/${matchID}/${gameID}`);
    }
  };

  const handleNext = () => {
    setPlaymatState({ draftUI: initialDraft });
    if (currentIndex < gamesQry.length - 1) {
      const gameID = gamesQry[currentIndex + 1]?.id;
      navigate(`/draft/${matchID}/${gameID}`);
    }
  };

  useEffect(() => {
    if (!matchQry) {
      refetch();
    }
  }, [matchQry]);

  return (
    <>
      <div className="roboto relative flex bg-gradient-to-b from-[#084A87] to-black pb-[0.05rem] text-[11px]">
        <button onClick={handleBack} className="absolute left-0">
          <BackBtn />
        </button>
        <button
          disabled={currentIndex === gamesQry?.length - 1}
          // disabled={index === gamesQry?.length - 1 || (gamesQry && gamesQry[index]?.lockGame)}
          onClick={handleNext}
          className="absolute right-0"
        >
          <NextBtn active={currentIndex === gamesQry?.length - 1} />
          {/* <NextBtn active={index === gamesQry?.length - 1 || (gamesQry && gamesQry[index]?.lockGame)} /> */}
        </button>
        <div className="flexcenter mx-auto my-1 gap-x-14 py-2">
          <div className="flexcenter gap-x-2">
            <img src={matchQry?.team1?.logo} width={'40px'} alt="" />
          </div>
          <div className="mt-1">
            <b className="deadjim text-[20px]">{(gamesQry && gamesQry[currentIndex]?.name?.toUpperCase()) || 'GAME'}</b>
          </div>
          <div className="flexcenter gap-x-2">
            <img src={matchQry?.team2?.logo} width={'40px'} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
