import '../css/lobby.css';

import { MatchList, FilterLobby, SkeletonMatch, LockerWindow } from '../components/';
import { useBoundStore } from '../store';
import { useRepositories } from '../repositories';
import { useEffect } from 'react';
import { Navigation } from '../layout';
import { MatchTypes } from '../types';
import { Link } from 'react-router-dom';

export function LobbyPage() {
  const { useGetAllMatch } = useRepositories();
  const { isFetching, data } = useGetAllMatch();
  const { setLobbyState, lobby } = useBoundStore();

  const { matchType } = lobby;

  useEffect(() => {}, [isFetching]);

  return (
    <>
      <LockerWindow />
      <div className="home-bg">
        <Navigation />
        <FilterLobby />
        <div className="mx-4">
          <div className="my-5 flex items-center justify-between">
            <p className="deadjim text-[20px]">{matchType === MatchTypes.ALL_MATCH ? 'PLAY' : 'MY MATCHES'}</p>
            <button
              onClick={
                matchType === MatchTypes.ALL_MATCH
                  ? () => setLobbyState({ matchType: MatchTypes.MY_MATCH })
                  : () => setLobbyState({ matchType: MatchTypes.ALL_MATCH })
              }
              className="rounded-md border border-[#168FFF] px-3 py-2 text-[14px]"
            >
              {matchType === MatchTypes.ALL_MATCH ? 'My Matches' : 'All Matches'}
            </button>
          </div>
          <div className="my-4">{!data ? <SkeletonMatch /> : <MatchList />}</div>
        </div>
      </div>
      <Link target="_blank" to={`${import.meta.env.VITE_EION_WEB}how-to-play`}>
        <button className="how-to-play-bg fixed bottom-5 left-1/2 w-full max-w-[calc(98%-1rem)] -translate-x-1/2 transform rounded-md border py-7">
          <p className="flexcenter deadjim text-[20px]">HOW TO PLAY</p>
        </button>
      </Link>
    </>
  );
}
