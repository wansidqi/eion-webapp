import live from '/assets/images/Lobby/live.png';
import { MatchStatus } from '../../types';
import { useParams } from 'react-router-dom';
import { MatchInterface } from '../../interface';
import { epochTime, convertDate } from '../../utils';
import { useMatchHandler } from '../../handlers';

interface Props {
  redirect?: (match: MatchInterface) => any;
}

export function MatchList({ redirect }: Props) {
  const { userID } = useParams();
  const { winIndicator, findActiveGame, handleEnterMatch, matches } = useMatchHandler();

  const renderUpcoming = (i: number) => {
    const { days, hours, minutes } = epochTime(matches[i]?.dateTime);

    return (
      <div className="flexcenter-col my-2 gap-1">
        <p className="deadjim text-[16px]">BO{matches[i]?.games?.length}</p>
        <>
          <p className={`text-[12px]`}>
            {convertDate(matches[i]?.dateTime).date} |{' '}
            <span className="text-[10px]">{convertDate(matches[i]?.dateTime).time} GMT +8</span>
          </p>
          <b className="deadjim text-[14px]">{`${days}D ${hours}H ${minutes}M`}</b>
        </>
      </div>
    );
  };

  const renderPast = (i: number) => (
    <div className="my-2">
      <p className="deadjim text-[16px]">BO{matches[i]?.games?.length}</p>
      <div className="flexcenter">
        {winIndicator(i)?.map(img => (
          <img src={img} alt="" className="mx-1 my-2" />
        ))}
      </div>
      <p className="text-[12px]">
        {convertDate(matches[i]?.dateTime).date} |{' '}
        <span className="text-[10px]">{convertDate(matches[i]?.dateTime).time} SST</span>
      </p>
    </div>
  );

  const renderLive = (i: number) => {
    return (
      <div className="my-4">
        <div className="flexcenter gap-2">
          <b className="deadjim text-[16px]">{findActiveGame(i)}</b>
          <div className="flexcenter">
            <p>|</p>
            <img className="fade-in-out scale-[1.3] pl-2" src={live} alt="" />
          </div>
        </div>
        <div className="flexcenter">
          {winIndicator(i)?.map(img => (
            <img src={img} alt="" className="mx-1 my-2" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="scrollbar-hidden h-[50vh] overflow-y-auto">
      <div className="flexcenter-col gap-3">
        {matches?.map((match: MatchInterface, i: number) => (
          <button
            disabled={Boolean(userID)}
            key={match.id}
            onClick={() => handleEnterMatch(redirect, match)}
            className="black-wood flex h-24 w-full items-center justify-between px-6"
          >
            <div className="flexcenter-col gap-2">
              <img className="h-[48px] w-[48px]" src={match?.team1?.logo} alt="img1" />
              <p className="deadjim text-[12px]">{match.team1?.shortName?.toUpperCase()}</p>
            </div>
            <div className="flexcenter-col">
              {match.status === MatchStatus.UPCOMING && renderUpcoming(i)}
              {match.status === MatchStatus.LIVE && renderLive(i)}
              {match.status === MatchStatus.PAST && renderPast(i)}
            </div>
            <div className="flexcenter-col gap-2">
              <img className="h-[48px] w-[48px]" src={match?.team2?.logo} alt="img2" />
              <p className="deadjim text-[12px]">{match.team2?.shortName?.toUpperCase()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export const SkeletonMatch = () => {
  const matches = [1, 2, 3, 4];
  return (
    <div className="scrollbar-hidden h-[50vh] overflow-y-auto">
      <div className="flexcenter-col gap-3">
        {matches?.map(match => (
          <button key={match} className="black-wood flex h-24 w-full items-center justify-between px-6">
            <div className="flexcenter-col mt-2 gap-2">
              <div className="skeleton-screen h-[48px] w-[48px] rounded-full" />
              <p className="skeleton-screen">loading</p>
            </div>
            <div className="flexcenter-col">
              <div className="flexcenter-col my-2 gap-1">
                <p className="skeleton-screen">BO8</p>
                <p className={`skeleton-screen my-1`}>
                  loading..............
                  <span className="text-[10px]">loading...</span>
                </p>
                <b className="skeleton-screen">loading.....</b>
              </div>
            </div>
            <div className="flexcenter-col gap-2">
              <div className="skeleton-screen h-[48px] w-[48px] rounded-full" />
              <p className="skeleton-screen">loading</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
