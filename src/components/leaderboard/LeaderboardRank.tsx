///data : ranks
///pagesVisited : pagesVisited
///ranksPerPage: ranksPerPage

// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LeaderboardInterface } from '../../interface';
import { useGetQueryData, AuthResponse, RQ_KEY } from '../../repositories';
import { useEffect, useState } from 'react';
import { useBoundStore } from '../../store';

type Props = {
  pagesVisited: any;
  ranksPerPage: any;
  findRank: () => void;
  rankLists: LeaderboardInterface[] | undefined;
};

export function LeaderboardRank({ pagesVisited, ranksPerPage, findRank, rankLists }: Props) {
  const user = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;
  const myRankCSS = 'blue-wood';
  const otherRank = 'black-wood';

  const { leaderboard } = useBoundStore();
  const { leaderboardType } = leaderboard;

  const myFP = rankLists?.find(rank => rank?.username === user.username)?.totalFP;
  const myPP = rankLists?.find(rank => rank?.username === user.username)?.totalPP;
  const myRank = rankLists && rankLists?.findIndex(entry => entry?.username === user.username) + 1;
  const shortName = (name: string) => (name?.length > 12 ? name.slice(0, 15) + '...' : name);

  const [curr, setCurr] = useState('SP');

  useEffect(() => {
    switch (leaderboardType) {
      case 'Weekly':
        setCurr('SP');
        break;
      case 'Seasonal':
        setCurr('SP');
        break;
      case 'Fame':
        setCurr('FAME');
        break;
      default:
        break;
    }
  }, [leaderboardType]);

  return (
    <div className="mx-4">
      <button
        onClick={() => findRank()}
        id="my-rank"
        className={`my-3 mt-10 flex w-full justify-between rounded-md ${myRankCSS}`}
      >
        <div className="px-4 py-3">{myRank}</div>
        <div className="px-4 py-3">{user.username.toUpperCase()}</div>
        <div className="px-4 py-3">{myFP || myPP}</div>
      </button>
      <>
        <div className="mx-4 my-5 flex flex-row  justify-between rounded border-[#000000] text-[16px] ">
          <div className="">RANK</div>
          <div className="">USER</div>
          <div className="">{curr}</div>
        </div>
        <>
          <div>
            {rankLists
              ?.slice(pagesVisited, pagesVisited + ranksPerPage)
              .map((rank: LeaderboardInterface, i: number) => {
                const displayedRank = i + pagesVisited + 1;
                return (
                  <>
                    <Link key={rank.id} to={`/profile/${rank?.id}`}>
                      <button
                        disabled={displayedRank === myRank}
                        key={i}
                        className={`${
                          displayedRank === myRank ? myRankCSS : otherRank
                        } my-3 flex w-full justify-between`}
                      >
                        <div className="px-4 py-3">{displayedRank}</div>
                        <div className="px-4 py-3">{shortName(rank.username?.toUpperCase() as string)}</div>
                        <div className="px-4 py-3">{rank.totalFP ?? rank?.totalPP}</div>
                      </button>
                    </Link>
                  </>
                );
              })}
          </div>
        </>
      </>
    </div>
  );
}
