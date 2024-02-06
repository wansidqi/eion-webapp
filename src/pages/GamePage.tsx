import close from '/assets/images/Layout/close.png';
import diamond from '/assets/images/Store/diamond.png';

import { useNavigate, useParams } from 'react-router-dom';
import { useRepositories } from '../repositories';
import { TeamInterface } from '../interface';
import { useBoundStore } from '../store';
import { LoadingComponent } from '../layout';
import { MatchStatus } from '../types';
import { useEffect } from 'react';
import { useQueriesHandler } from '../handlers';

interface GameInfo {
  id?: string;
  score?: {
    id?: number;
    totalFP?: number;
    totalLP?: number;
  };
  teamWin: TeamInterface;
}

export function GamePage() {
  const { useGetMatchByUserId } = useRepositories();
  const { resetPlaymat } = useBoundStore();
  const { matchID, userID } = useParams();
  const { userQry } = useQueriesHandler();
  const navigate = useNavigate();

  const { data: match, isLoading, refetch } = useGetMatchByUserId(matchID || '', userQry.id);
  const draftInfo = match?.games?.map(game => game?.draft);
  const drafts = draftInfo as unknown as GameInfo[];

  const styleByIndex = (i: number) => {
    const gameEndNotJoin = 'match-inactive text-gray-400 grayscale flexcenter filter';

    if (Boolean(drafts[i])) {
      return 'blue-wood';
    } else if (MatchStatus.PAST === match?.status && !drafts[i]) {
      return gameEndNotJoin;
    } else if (!Boolean(drafts[i])) {
      return 'black-wood';
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    if (userID) {
      navigate(-1);
    } else {
      navigate('/lobby');
    }
  };

  const navigateToPlaymat = (gameID: string) => {
    navigate(`/draft/${matchID}/${gameID}`);
  };

  const redirectShare = (gameID: string) => navigate(`/result/${matchID}/${gameID}`);

  useEffect(() => {
    resetPlaymat();
  }, []);

  useEffect(() => {
    refetch();
  }, [isLoading]);

  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="home-bg">
        <div className="flexcenter relative gap-x-4 bg-[#010E1A] bg-opacity-80 px-5 py-[0.85rem] text-[20px]">
          <button onClick={handleBack} className="absolute -left-2 scale-[1.1]">
            <img src={close} alt="" />
          </button>
          <div className="flexcenter gap-14">
            <img src={match?.team1?.logo} width={'43px'} alt="" />
            <b className="deadjim">BO{match?.games?.length}</b>
            <img src={match?.team2.logo} width={'43px'} alt="" />
          </div>
        </div>
        <div className="mx-3">
          <div className="mx-6 mb-4 mt-10 flex justify-between text-[14px]">
            <p>Match</p>
            <p>Prediction</p>
            <p>Shards</p>
          </div>
          <div className="flexcenter-col gap-1">
            {match?.games?.map((game, i) => (
              <button
                disabled={
                  (game?.lockDraft && !Boolean(drafts[i])) || (MatchStatus.PAST === match?.status && !drafts[i])
                }
                // disabled={game?.lockDraft || MatchStatus.PAST === match?.status && !drafts[i]}
                onClick={
                  MatchStatus.PAST === match?.status ? () => redirectShare(game?.id) : () => navigateToPlaymat(game.id)
                }
                key={game?.id}
                className={`${styleByIndex(i)}  mt-2 flex w-full justify-between gap-3 px-5 py-5 text-[14px]`}
              >
                <div className="flexcenter">
                  <p className="deadjim">{game?.name?.replace(/(\d+)/, ' $1')?.toUpperCase()}</p>
                </div>
                <div className="flexcenter h-[35px] gap-3">
                  {Boolean(drafts[i]) ? <img className="h-[35px]" src={drafts[i]?.teamWin?.logo} alt="" /> : <p>-</p>}
                </div>
                {Boolean(drafts[i]) ? (
                  <div className="flexcenter">
                    <p>{drafts[i]?.score?.totalFP ?? '-'}</p>
                    <img src={diamond} alt="" />
                  </div>
                ) : (
                  <div className="flexcenter">
                    <p>-</p>
                    <img src={diamond} alt="" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
