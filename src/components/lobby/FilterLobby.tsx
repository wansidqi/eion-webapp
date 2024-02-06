import { useState } from 'react';
import { MatchStatus, RegionFilter } from '../../types';
import { useBoundStore } from '../../store';
import ClickAwayListener from 'react-click-away-listener';

export function FilterLobby() {
  const { setLobbyState, lobby } = useBoundStore();
  const { regionFilter, matchStatus } = lobby;

  //#region
  const [displayRegion, setDisplayRegion] = useState(false);
  const [_, setDisplayRegionText] = useState<string>('All Region');

  const regions = [
    { name: 'All Region', value: RegionFilter.ALL },
    { name: 'Malaysia', value: RegionFilter.MY },
    { name: 'Philippines', value: RegionFilter.PH },
    { name: 'Singapore', value: RegionFilter.SG },
  ];

  const handleDisplayRegion = (item: any, value: RegionFilter) => {
    setDisplayRegionText(item);
    setDisplayRegion(false);
    setLobbyState({ regionFilter: value });
  };

  const [displayMatch, setDisplayMatch] = useState(false);
  const matches = [MatchStatus.UPCOMING, MatchStatus.LIVE, MatchStatus.PAST];

  const handleDisplayMatch = (item: MatchStatus) => {
    setDisplayMatch(false);
    setLobbyState({ matchStatus: item });
  };
  //#endregion

  return (
    <div className="flex justify-between gap-x-4 bg-[#010E1A] px-4 py-4">
      <div className="deadjim relative flex w-full flex-col">
        {/* <ClickAwayListener  onClickAway={() => setDisplayMatch(false)}>
          </ClickAwayListener> */}
        <button
          onClick={() => {
            setDisplayRegion(!displayRegion);
            setDisplayMatch(false);
          }}
          className="relative flex items-center justify-between rounded-md border border-[#0185FF] py-2 pl-3"
        >
          <p>{regions.find(region => region.value === regionFilter)?.name}</p>
          <div className="absolute right-3">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00001 10L0.928345 2.93L3.28668 0.573334L8.00001 5.28667L12.7133 0.573334L15.0717 2.93L8.00001 10.0017V10Z"
                fill="white"
              />
            </svg>
          </div>
        </button>
        <div>
          {displayRegion && (
            <ClickAwayListener onClickAway={() => setDisplayRegion(false)}>
              <div className="roboto absolute z-10 mt-2 flex w-full flex-col rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] py-2 text-[14px]">
                {regions.map((region, i) => (
                  <button
                    onClick={() => handleDisplayRegion(region.name, region.value)}
                    className={`py-2 pl-2 text-left ${
                      regionFilter === region.value ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0' : ''
                    }`}
                    key={i}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>

      <div className="deadjim relative flex w-full flex-col">
        <button
          onClick={() => {
            setDisplayMatch(!displayMatch);
            setDisplayRegion(false);
          }}
          className="relative flex items-center justify-between rounded-md border border-[#E45A2F] py-2 pl-3"
        >
          <p>{matchStatus}</p>
          <div className="absolute right-3">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00001 10L0.928345 2.93L3.28668 0.573334L8.00001 5.28667L12.7133 0.573334L15.0717 2.93L8.00001 10.0017V10Z"
                fill="white"
              />
            </svg>
          </div>
        </button>
        <div>
          {displayMatch && (
            <ClickAwayListener onClickAway={() => setDisplayMatch(false)}>
              <div className="roboto absolute z-10 mt-2 flex w-full flex-col rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] py-2 text-[14px]">
                {matches.map((match, i) => (
                  <button
                    onClick={() => handleDisplayMatch(match)}
                    className={`py-2 pl-2 text-left ${
                      matchStatus === match ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0' : ''
                    }`}
                    key={i}
                  >
                    {match}
                  </button>
                ))}
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
}
