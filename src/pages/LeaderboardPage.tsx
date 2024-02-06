import { useEffect, useState } from 'react';
import '../css/leaderboard.css';
import ReactPaginate from 'react-paginate';
import weekly from '/assets/images/Leaderboard/weekly.png';
import season from '/assets/images/Leaderboard/Artboard-16 1.png';
// import lock from '/assets/images/Leaderboard/lock.png';
import PreviousIcon from '/assets/images/Leaderboard/previousIcon.png';
import NextIcon from '/assets/images/Leaderboard/nextIcon.png';

import {
  DropdownData,
  LeaderboardRank,
  LeaderboardWindow,
  SeasonalRewardWindow,
  // WeeklyRewardWindow,
} from '../components';
import { useBoundStore } from '../store';
import { TitleLayout } from '../layout';
import { useNavigate } from 'react-router-dom';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';
import { LeaderboardData, LeaderboardType } from '../interface';
import { weeks, seasonal } from '../data';

export function LeaderboardPage() {
  const navigate = useNavigate();
  const { leaderboard, setLeaderboardSlice, setWindowState } = useBoundStore();
  // const { displayRegion, selectRegion } = leaderboard;
  const { selectWeekly, leaderboardType, selectSeason, displaySeason, displayWeekly, info } = leaderboard;
  const { useGetLeaderboard } = useRepositories();
  const { data: leaderboardRanks, mutateAsync } = useGetLeaderboard();

  const handleOpenRewards = () => {
    // leaderboardType === 'Weekly'
    //   ? setWindowState({ weeklyRewardWindow: true }) :
    setWindowState({ seasonalRewardWindow: true });
  };

  const getLeaderboardData = (data: LeaderboardData) => {
    mutateAsync(data);
  };

  useEffect(() => {
    switch (leaderboardType) {
      case 'Weekly':
        getLeaderboardData({
          type: 'fp',
          startDate: selectWeekly?.startDate,
          endDate: selectWeekly?.endDate,
          // country: selectRegion,
        });
        break;
      case 'Seasonal':
        getLeaderboardData({
          type: 'fp',
          startDate: '2023-10-02T05:00:01.000Z',
        });
        break;
      case 'Fame':
        getLeaderboardData({ type: 'pp' });
        break;

      default:
        break;
    }
    // }, [selectWeekly, leaderboardType, selectRegion]);
  }, [selectWeekly, leaderboardType]);

  const rankLists = leaderboardRanks?.filter(rank => Boolean(rank?.username));
  const user = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;

  const buttons = [
    {
      label: 'Weekly' as LeaderboardType,
      icon: weekly,
      disable: false,
    },
    {
      label: 'Seasonal' as LeaderboardType,
      icon: season,
      disable: false,
    },
    // {
    //   label: 'Fame' as LeaderboardType,
    //   icon: lock,
    //   disable: false,
    // },
  ];

  const ranksPerPage = 10;
  // const ranks = rankLists ? rankLists.slice(0, 12) : [];
  const [pageNumber, setPageNumber] = useState(0);
  const [displayedPage, setDisplayedPage] = useState(0);
  const pagesVisited = pageNumber * ranksPerPage;
  const pageCount = rankLists ? Math.ceil(rankLists.length / ranksPerPage) : 0;

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const goBack = () => {
    navigate('/home');
  };

  const findMyRank = () => {
    const num = rankLists && rankLists.findIndex(entry => entry?.username === user.username);
    setLeaderboardSlice({ userRank: num });
    const myRankIndex = rankLists ? rankLists.findIndex((_, i) => i === num) : 0;
    const myRankPageNumber = Math.floor(myRankIndex / ranksPerPage);
    setPageNumber(myRankPageNumber);
  };

  useEffect(() => {
    setDisplayedPage(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <LeaderboardWindow />
      {/* <WeeklyRewardWindow /> */}
      <SeasonalRewardWindow />
      <div className="home-bg">
        <TitleLayout hasClose={true} callback={goBack} title="LEADERBOARD" />
        <div className="roboto-condensed mx-4">
          <div className=" m-3 my-3 flex gap-3 py-3">
            {buttons.map(item => (
              <button
                disabled={item.disable}
                className={`${
                  item.label === leaderboardType ? 'blue-wood' : 'white-wood'
                } flexcenter-col deadjim h-[80px] w-full gap-1`}
                onClick={() => {
                  setLeaderboardSlice({ selectDropdown: null, leaderboardType: item.label });
                }}
              >
                <img src={item.icon} alt="" />
                <p className={`${item.disable ? 'text-gray-400' : 'text-white'}`}>{item.label}</p>
              </button>
            ))}
          </div>
          <div className="flexcenter mx-2 justify-between gap-2">
            <button onClick={handleOpenRewards} className="flexcenter lb-rewards h-11 border px-4">
              <p className="text-[14px]">REWARDS</p>
            </button>
            {/* {leaderboardType === 'Weekly' && (
              <DropdownComponent
                propertyDisplay="displayRegion"
                propertySelect="selectRegion"
                displayDropdown={displayRegion}
                selectDropdown={selectRegion}
                items={regions}
              />
            )} */}
            {leaderboardType === 'Weekly' && (
              <DropdownData
                propertySelect="selectWeekly"
                selectDropdown={selectWeekly}
                displayDropdown={displayWeekly}
                propertyDisplay={'displayWeekly'}
                items={weeks}
              />
            )}
            {leaderboardType === 'Seasonal' && (
              <DropdownData
                propertyDisplay="displaySeason"
                propertySelect="selectSeason"
                displayDropdown={displaySeason}
                selectDropdown={selectSeason}
                items={seasonal}
              />
            )}
            {/* <div className="flex flex-col">
              <div className="mx-3 flex flex-row space-x-2">
                <p className="m-0 text-sm font-semibold ">{selectWeekly?.date ?? weeks[0].date}</p>
                <div
                  className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#A6A6A6] text-sm text-white"
                  onClick={handleInfoClick}
                  onMouseOver={() => setInfo(true)}
                  onMouseLeave={() => setInfo(false)}
                >
                  !
                </div>
              </div>
              <div className="mx-3">
                <p className="mt-0.5 text-sm  font-semibold text-[#0185FF] ">Ongoing</p>
              </div>
            </div> */}
          </div>
          {/* pagination box */}
          <div>
            <LeaderboardRank
              rankLists={rankLists}
              pagesVisited={pagesVisited}
              ranksPerPage={ranksPerPage}
              findRank={findMyRank}
            />
            <div className="roboto text-[16px]">
              <ReactPaginate
                pageCount={pageCount}
                forcePage={displayedPage}
                onPageChange={changePage}
                previousLabel={'<'}
                nextLabel={'>'}
                containerClassName={'paginationBtns flexcenter gap-5 my-3'}
                previousLinkClassName={PreviousIcon}
                nextLinkClassName={NextIcon}
                disabledClassName={''}
                activeClassName={'bg-black text-white w-5 h-5 flexcenter'}
              />
            </div>
          </div>
        </div>
        {info && (
          <div className="roboto-condensed absolute right-[2rem] top-44 z-20 w-[43%] bg-black p-2 text-[12px]">
            {/* <p>The weekly leaderboard will reset every monday 5:00am SGT</p> */}
            <p className="mt-0">You can only earn SP through Invoke</p>
          </div>
        )}
      </div>
    </>
  );
}
