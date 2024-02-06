import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRepositories } from '../../repositories';
import { UserCardInterface } from '../../interface';
// import { useQueriesHandler } from '../../handlers';

import diamond from '/assets/images/Store/diamond.png';
import logo from '/assets/images/Invoke/logo.png';
import { useEffect, useState } from 'react';
import { convertDate } from '../../utils';

import { ReactHelmet } from '../../layout';
import { UseScreenshotHandler } from '../../handlers';

interface Props {
  button?: boolean;
  buttonFx?: () => any;
  url?: string;
}

interface CardProps {
  data: UserCardInterface;
  kill: number | string;
  death: number | string;
  assist: number | string;
  role: string;
}

export function ShareInvokeLayout({ button, buttonFx }: Props) {
  // const { seasonQry } = useQueriesHandler();
  const {} = UseScreenshotHandler();
  const navigate = useNavigate();
  const { id } = useParams();
  const { useGetInvokeDraft } = useRepositories();

  const { data: invokeData } = useGetInvokeDraft(id as string);
  const [info, setInfo] = useState(false);
  const [today, setToday] = useState<string | Date>(new Date());
  // const { data: totalLP } = useGetTotalLP(id as any);

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
      name: 'Shards',
      score: (invokeData?.rewards && invokeData?.rewards[0].dailyLP) || '0',
    },
    {
      name: 'Daily SP',
      score: (invokeData?.rewards && invokeData?.rewards[0].dailyLP) || '0',
    },
  ];

  const CardDisplay = ({ data, kill, death, assist, role }: CardProps) => {
    const image = data?.card?.details?.image;
    return (
      <div className="invoke-card-size flexcenter relative scale-[1]">
        {Boolean(data) ? (
          <img src={image} alt="" />
        ) : (
          <p className="deadjim text-center text-[16px] text-[#8D8D8D]">{role}</p>
        )}

        <div className="flexcenter roboto-condensed absolute -bottom-10 w-full justify-between gap-2 bg-[#464545] text-center text-[14px]">
          <div className="bg-[#242424] p-2">
            <p className="kda">KDA</p>
          </div>
          <div className="flexcenter w-full">
            <p className="kda text-[12px]">
              {kill}/{death}/{assist}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="screenshot" className="playmat-bg flexcenter-col justify-start">
      <ReactHelmet />
      <div className="mt-5">
        <img src={logo} alt="" />
      </div>
      <div>
        <Link to={'https://eion.gg/'} target="_blank">
          <p className="roboto-condensed flexcenter my-2 gap-2 text-[16px]">
            www.eion.gg
            <span
              className="flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[#A6A6A6] text-sm text-white"
              onClick={handleInfoClick}
              onMouseLeave={() => setInfo(false)}
            >
              !
            </span>
          </p>
        </Link>
      </div>
      {/* <div className="flexcenter gap-3 text-[18px]">
        <p className="roboto-condensed-bold">Season {seasonQry?.season ?? '1'}</p>|<p>Week 1</p>|
        <p>{today.toString()}</p>
      </div> */}
      <p className="deadjim my-2 text-[20px]">
        {invokeData?.draft?.User && invokeData?.draft?.User.username.toUpperCase()}
      </p>

      <div className="flexcenter gap-3">
        {scores.map((score, i) => (
          <div
            className={`flexcenter-col roudned-md mb-6 mt-1 w-32 bg-gradient-to-r from-[#272727] to-[#505050] py-2 shadow-xl`}
          >
            <p className="deadjim text-[16px]">{score.name}</p>
            <div className="flexcenter">
              <p className="roboto-condensed text-[16px] italic">{score.score}</p>
              <img className={i === 0 ? '' : 'hidden'} src={diamond} alt="" />
            </div>
          </div>
        ))}
      </div>

      <div className="my-5 grid grid-cols-3 justify-center gap-x-5 gap-y-20">
        <div className="col-span-3 flex justify-center gap-8">
          <CardDisplay
            role="ROAM"
            data={invokeData?.draft?.player1 as UserCardInterface}
            kill={invokeData?.results?.basePlayer1?.kill ?? '-'}
            assist={invokeData?.results?.basePlayer1?.assist ?? '-'}
            death={invokeData?.results?.basePlayer1?.death ?? '-'}
          />
          <CardDisplay
            role="JUNGLE"
            data={invokeData?.draft?.player2 as UserCardInterface}
            kill={invokeData?.results?.basePlayer2?.kill ?? '-'}
            assist={invokeData?.results?.basePlayer2?.assist ?? '-'}
            death={invokeData?.results?.basePlayer2?.death ?? '-'}
          />
        </div>
        <div className="col-span-3 mt-3 flex justify-center gap-4">
          <CardDisplay
            role="EXP"
            data={invokeData?.draft?.player3 as UserCardInterface}
            kill={invokeData?.results?.basePlayer3?.kill ?? '-'}
            assist={invokeData?.results?.basePlayer3?.assist ?? '-'}
            death={invokeData?.results?.basePlayer3?.death ?? '-'}
          />
          <CardDisplay
            role="MID"
            data={invokeData?.draft?.player4 as UserCardInterface}
            kill={invokeData?.results?.basePlayer4?.kill ?? '-'}
            assist={invokeData?.results?.basePlayer4?.assist ?? '-'}
            death={invokeData?.results?.basePlayer4?.death ?? '-'}
          />
          <CardDisplay
            role="GOLD"
            data={invokeData?.draft?.player5 as UserCardInterface}
            kill={invokeData?.results?.basePlayer5?.kill ?? '-'}
            assist={invokeData?.results?.basePlayer5?.assist ?? '-'}
            death={invokeData?.results?.basePlayer5?.death ?? '-'}
          />
        </div>
      </div>

      {button && (
        <div className="my-10 w-full">
          <div className="flexcenter m-5 gap-6">
            <div className="metal w-1/3">
              <button onClick={() => navigate(-1)} className={`black-gradient w-full rounded-sm py-3`}>
                <b className="text-[16px]">BACK</b>
              </button>
            </div>
            <div className="metal w-2/3">
              <button onClick={buttonFx} className={`${'blue-radial-btn'} relative w-full rounded-sm py-3`}>
                <b className="text-[16px]"> SHARE</b>
              </button>
            </div>
            {/* <ShareSocialMedia url={url as string} /> */}
          </div>
        </div>
      )}
      {info && (
        <div className="roboto-condensed absolute right-[2rem] top-16 z-20 w-[70%] bg-black p-2 text-justify text-[12px]">
          <p>
            This is the Active Draft screen. Your current Invoke Draft scores are updated here once all matches of the
            day has concluded.
          </p>
          <p className="mt-2">Your Active draft scores will reset everyday at 5am SGT.</p>
          <p className="mt-2">Note: This is the draft that is currently in play.</p>
        </div>
      )}
    </div>
  );
}
