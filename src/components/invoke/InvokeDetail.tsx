import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CloseInvokeIcon } from '..';
// import { useBoundStore } from '../../store';
import { useMatchHandler, useQueriesHandler } from '../../handlers';
import { convertDate, epochTime } from '../../utils';
import { weeks } from '../../data';

export function InvokeDetail() {
  const navigate = useNavigate();
  const { seasonQry, invokeQry, userQry, invokeStateQry } = useQueriesHandler();
  const {} = useMatchHandler();
  const [info, setInfo] = useState(false);
  // const { invoke } = useBoundStore();

  const [today, setToday] = useState<string | Date>(new Date());
  const startDate = invokeStateQry ? invokeStateQry[0].startDate : undefined;
  const endDate = invokeStateQry ? invokeStateQry[0].endDate : undefined;
  const { days: startDays, hours: startHours, minutes: startMinutes} = epochTime(startDate as Date);
  const { days: endDays, hours: endHours, minutes: endMinutes} = epochTime(endDate as Date);
  // const endDate = invokeStateQry ? invokeStateQry[0].endDate : undefined;
  // const { days: endDays, hours: endHours, minutes: endMinutes } = epochTime(endDate as Date);

  const isLive = invokeStateQry && invokeStateQry[0].locked;

  // const { dummyLive } = invoke;

  //FOR WEEK
  const [_, setCurrentWeek] = useState<number>(1);
  const [findWeek, setFindWeek] = useState<string | undefined>('Week 0');
  const todayDatetime = new Date();

  useEffect(() => {
    const checkWeek = () => {
      const findWeekActive = weeks.find(week => {
        const current = todayDatetime >= new Date(week.startDate) && todayDatetime <= new Date(week.endDate);
        return current;
      });
      setFindWeek(findWeekActive?.title);
      return findWeekActive;
    };

    checkWeek();
  }, [todayDatetime]);

  useEffect(() => {
    const checkAndIncrementWeek = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const isMonday = dayOfWeek === 1;
      const isMidnight = now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0;

      if (isMonday && isMidnight) {
        setCurrentWeek(prevWeek => prevWeek + 1);
        console.log('Week Incremented!');
      }
    };

    const intervalId = setInterval(checkAndIncrementWeek, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function init() {
      const format = convertDate(today, 'long');
      setToday(format.date);
    }
    init();
  }, [today]);

  const handleInfoClick = () => {
    setInfo(true);
  };

  const scores = [
    {
      name: 'Daily Shards',
      score: (invokeQry?.rewards && invokeQry?.rewards[0]?.dailyLP) || '0',
      callback: () => {
        navigate(`/invoke/share/${userQry.id}`);
      },
      disable: false,
    },
    {
      name: 'Weekly SP',
      score: (invokeQry?.rewards && invokeQry?.rewards[0]?.weeklyFP) || '0',
      callback: () => {},
      disable: true,
    },
    {
      name: 'Seasonal SP',
      score: (invokeQry?.rewards && invokeQry?.rewards[0]?.seasonalFP) || '0',
      callback: () => {},
      disable: true,
    },
  ];

  const InvokeStatus = () => (
    <>
      {isLive ? (
        <>
          <div className="roboto-condensed-bold text-[14px]">
            INVOKE IS <span className="text-[#0066FF]">LIVE</span>
          </div>
          <div className="text-[14px]">
            Next INVOKE will Commence in {endDays}:{endHours}:{endMinutes}
          </div>
        </>
      ) : (
        <>
          <div className="text-[14px]">Drafting has begun</div>
          <div className="text-[14px]">
            Invoke will be Live in {startDays}:{startHours}:{startMinutes}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="">
      <div className="flexcenter-col relative">
        <div className="absolute left-5 top-0 cursor-pointer" onClick={() => navigate('/')}>
          <CloseInvokeIcon />
        </div>
        <p className="roboto-condensed flex gap-2 text-[16px]">
          Assemble Your Ultimate Dream Team
          <span
            className="mt-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#A6A6A6] text-sm text-white"
            onClick={handleInfoClick}
            onMouseOver={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
          >
            !
          </span>
        </p>

        <div className="roboto-condensed flexcenter-col mt-6 gap-3">
          <div className="flexcenter gap-2 text-[18px]">
            {/* <p className="roboto-condensed-bold">Season {seasonQry?.season ?? '-'}</p>|<p>Week {currentWeek}</p>| */}
            <p className="roboto-condensed-bold">Season {seasonQry?.season ?? '-'}</p>|<p>{findWeek}</p>|
            <p>{today.toString()}</p>
          </div>
          <InvokeStatus />
        </div>

        <div className="flexcenter gap-x-3">
          {scores.map((item, i) => (
            <div className="relative my-7">
              <button
                onClick={item.callback}
                className={`${
                  i === 0 ? '' : 'hidden'
                } absolute -top-5 right-1/2 w-20 translate-x-1/2 text-center text-[10px]`}
              >
                View Score
              </button>
              <button
                disabled={item.disable}
                onClick={item.callback}
                key={item.name}
                className={`flexcenter-col roboto w-28 rounded-sm ${
                  i === 0 ? 'blue-radial-btn border-2 border-[#0185FF]' : 'bg-gradient-to-r from-[#272727] to-[#505050]'
                } py-1 text-[14px] shadow-2xl`}
              >
                <p>{item.name}</p>
                <b>{item.score}</b>
              </button>
            </div>
          ))}
        </div>
      </div>

      {info && (
        <div className="roboto-condensed absolute right-[2rem] top-16 z-20 w-[70%] bg-black p-2 text-justify text-[12px]">
          <p>
            Player Cards will earn points based on their K/D/A (Kills/Deaths/Assists), following the same scoring system
            as Locker (+10 points for kills, -10 points for deaths, and +5 points for assists). K/D/A scores will be
            updated weekly. The objective is to identify the top Player Cards in the gold, roam, mid, jungle, and exp
            roles for the season.
          </p>
          <p className="mt-2">
            Please refer to the{' '}
            <span>
              <Link target="_blank" to={`${import.meta.env.VITE_EION_WEB}/game-rules`}>
                <b className="roboto-bold">Game Rules</b>
              </Link>
            </span>{' '}
            for more details.
          </p>
        </div>
      )}
    </div>
  );
}
