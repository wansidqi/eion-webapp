import { useNavigate } from 'react-router';
// import { Currency } from '..';
import diamond from '/assets/images/Store/diamond.png';
import { DraftInterface, ScoreBreakdown, UserCardInterface } from '../../interface';
import { useState } from 'react';
import card from '/assets/images/Playmat/card-example.png';
import { RefinementLevel } from '../../layout';
import { UseImageLoader } from '../../Hook';

interface Props {
  draft: DraftInterface | undefined;
  button?: boolean;
  buttonFx?: () => any;
}

export default function DraftPointLayout({ draft, button, buttonFx }: Props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);
  const hasScore = Boolean(draft?.draft?.score);
  const gameName = draft?.draft?.game?.name?.toUpperCase();

  const draftKeys = ['leader', 'support1', 'support2', 'player1', 'player2', 'player3', 'player4', 'player5'];

  const draftCard = draftKeys.map(key => ({
    draft: draft?.draft?.[key] as UserCardInterface,
    results: draft?.results?.[`base${key.charAt(0).toUpperCase() + key.slice(1)}`] as ScoreBreakdown,
  }));

  const points = [
    {
      label: 'SHARDS',
      point: draft?.draft?.score?.totalLP || 0,
      img: diamond,
    },
  ];

  const dateTime = draft?.draft?.game?.match?.dateTime;

  function formatDate(): string {
    const date = new Date(dateTime || '');
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <>
      {/* <ShareDraftModal /> */}
      {/* <div id="screenshot" className="playmat-bg flexcenter-col text-center"> */}
      <div id="" className="playmat-bg flexcenter-col text-center">
        {!hasScore ? (
          <p className="deadjim pt-8 text-[20px]">
            PRE-GAME SCORE
            <span className="relative">
              <div
                onMouseOver={() => setInfo(true)}
                onMouseLeave={() => setInfo(false)}
                className="absolute -right-5 top-0"
              >
                <ToolTip />
              </div>
            </span>
          </p>
        ) : (
          <p className="deadjim pt-8 text-[20px]">POST-GAME SCORE</p>
        )}
        {info && (
          <div className="roboto-condensed absolute top-20 w-3/4 bg-black p-2 text-start text-[12px]">
            <p>
              The scores displayed here are rough estimates and do not represent the final scores your cards will
              attain. They are meant to provide you with guidance while drafting your cards. Please keep in mind that
              the actual event scores might differ.{' '}
            </p>
          </div>
        )}
        <div className={`flexcenter gap-8 pt-4`}>
          <UseImageLoader src={draft?.draft?.teamWin?.logo as string} className="h-[75px] w-[75px]" alt="" />
          {/* <img src={draft?.draft?.teamWin?.logo} className="h-[65px] w-[65px]" alt="" /> */}
          <div className="flexcenter-col">
            <p className="deadjim text-[16px]">{gameName}</p>
            <p className="text-[12px]">{formatDate()}</p>
          </div>
          <UseImageLoader src={draft?.draft?.teamLose?.logo as string} className="h-[75px] w-[75px]" alt="" />
          {/* <img src={draft?.draft?.teamLose?.logo} className="h-[65px] w-[65px]" alt="" /> */}
        </div>
        <div className="flexcenter-col mb-5">
          <b className="deadjim text-center">{draft?.draft?.user?.username?.toUpperCase()}</b>
        </div>
        <div className="flexcenter gap-3">
          {points.map(point => (
            <div className="flexcenter-col w-24 border bg-gradient-to-br from-[#272727] to-[#505050] py-2">
              <p className="deadjim text-[16px]">{point.label}</p>
              <div className="flexcenter">
                <p className="roboto-condensed text-[12px] italic">{point.point || '-'}</p>
                <UseImageLoader src={point.img as string} alt="" />
                {/* <img src={point.img} alt="" /> */}
              </div>
            </div>
          ))}
        </div>
        <div className="m-5 py-0">
          <div className="grid grid-cols-5 place-items-center py-2">
            <div className="col-span-2 flex h-full flex-col items-center justify-between">
              <div className="flexcenter h-full">
                <div className="h-[100px] w-[100px]">
                  <UseImageLoader src={draft?.draft?.teamWin?.logo as string} className="mr-2" alt="" />
                  {/* <img src={draft?.draft?.teamWin?.logo} className="mr-2" alt="" /> */}
                </div>
              </div>
              <HexSeasonal number={hasScore ? draft?.results?.teamWin?.lp || draft?.results?.teamLose?.lp : '-'} />
            </div>
            {draftCard.slice(0, 3).map((item, i) => (
              <div key={i} className="flexcenter-col relative">
                <>
                  {item?.draft?.refinementLevel !== undefined && (
                    <RefinementLevel
                      level={item?.draft?.refinementLevel}
                      isTrial={Boolean(item?.draft?.singleUseOnly)}
                      className="left-2 top-1 z-10 scale-[0.9]"
                    />
                  )}
                  <>
                    <UseImageLoader
                      src={(item?.draft?.card?.details?.image as string) || card}
                      className={` ${item?.draft?.card?.details?.image ? '' : 'brightness-0 grayscale filter'}`}
                    />
                    {/* <img
                      src={item?.draft?.card?.details?.image || card}
                      className={` ${item?.draft?.card?.details?.image ? '' : 'brightness-0 grayscale filter'}`}
                      alt=""
                    /> */}
                    <div className="flexcenter -mt-2">
                      <HexSeasonal number={hasScore ? item?.results?.lp || 0 : item?.draft?.card?.fp || '-'} />
                    </div>
                  </>
                </>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 place-items-center py-2">
            {draftCard.slice(3, 9).map((item, i) => (
              <div key={i} className="flexcenter-col relative">
                <>
                  {item?.draft?.refinementLevel !== undefined && (
                    <RefinementLevel
                      level={item?.draft?.refinementLevel}
                      isTrial={Boolean(item?.draft?.singleUseOnly)}
                      className="left-2 top-1 z-10 scale-[0.9]"
                    />
                  )}
                  <>
                    <UseImageLoader
                      src={(item?.draft?.card?.details?.image as string) || card}
                      className={` ${item?.draft?.card?.details?.image ? '' : 'brightness-0 grayscale filter'}`}
                      alt=""
                    />
                    {/* <img
                      src={item?.draft?.card?.details?.image || card}
                      className={` ${item?.draft?.card?.details?.image ? '' : 'brightness-0 grayscale filter'}`}
                      alt=""
                    /> */}
                    <div className="flexcenter -mt-2">
                      <HexSeasonal number={hasScore ? item?.results?.lp || 0 : item?.draft?.card?.fp || '-'} />
                    </div>
                  </>
                </>
              </div>
            ))}
          </div>

          {/* flow yg lama di bawah  */}
          {/* <div className="grid grid-cols-5 place-items-center py-2">
            <div>
              <img src={draft?.draft?.teamWin?.logo} className="col-span-2 mr-2 h-[60px] w-[60px]" alt="" />
              <HexSeasonal number={hasScore ? draft?.results?.teamWin?.fp || draft?.results?.teamLose?.fp : '-'} />
            </div>
            {draftCard.map((item, i) => (
              <div key={i} className="flexcenter-col relative">
                <>
                  {item?.draft?.refinementLevel !== undefined && (
                    <RefinementLevel
                      level={item?.draft?.refinementLevel}
                      isTrial={Boolean(item?.draft?.singleUseOnly)}
                      className="left-2 top-1 z-10 scale-[0.9]"
                    />
                  )}
                  {/* {i === -1 ? (
                    <div className="placeholder-card relative">
                      <div className="absolute">
                        <div className="flexcenter">
                          <HexSeasonal number={hasScore ? item?.results?.fp || 0 : item?.draft?.card?.fp} />
                        </div>
                      </div>
                    </div>
                  ) : (
                  <>
                    <img
                      src={item?.draft?.card?.details?.image || card}
                      className={`scale-[0.9] ${
                        item?.draft?.card?.details?.image ? '' : 'brightness-0 grayscale filter'
                      }`}
                      alt=""
                    />
                    <div className="flexcenter -mt-2">
                      <HexSeasonal number={hasScore ? item?.results?.fp || 0 : item?.draft?.card?.fp || '-'} />
                    </div>
                  </>
                  {/* // )}
                </>
              </div>
            ))}
          </div> */}
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const HexSeasonal = ({ number }: { number: any }) => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_di_3265_798)">
        <path
          d="M6 10.5L18 6L30 10.5V25.5L18 30L6 25.5V10.5Z"
          fill="#0377FF"
          fillOpacity="0.88"
          shapeRendering="crispEdges"
        />
        <path
          d="M18 6.534L29.5 10.8465V25.1535L18 29.466L6.5 25.1535V10.8465L18 6.534Z"
          stroke="url(#paint0_linear_3265_798)"
          shapeRendering="crispEdges"
        />
        {/* Add Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          font-size="12px"
          font-family="Roboto Condensed"
          fill="white"
        >
          {number}
        </text>
      </g>
      <defs>
        <filter
          id="filter0_di_3265_798"
          x="0"
          y="0"
          width="36"
          height="36"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3265_798" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3265_798" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.69 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_3265_798" />
        </filter>
        <linearGradient
          id="paint0_linear_3265_798"
          x1="6.5"
          y1="10.5"
          x2="28.5"
          y2="25.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#0185FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ToolTip = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.83173 10.3157C1.25867 9.76225 0.801575 9.10018 0.487121 8.36816C0.172667 7.63613 0.00714944 6.84881 0.000226541 6.05214C-0.00669636 5.25546 0.145114 4.46538 0.446799 3.72801C0.748484 2.99063 1.194 2.32072 1.75736 1.75736C2.32072 1.194 2.99063 0.748484 3.72801 0.446799C4.46538 0.145114 5.25546 -0.00669636 6.05214 0.000226541C6.84881 0.00714944 7.63613 0.172667 8.36816 0.487121C9.10018 0.801575 9.76225 1.25867 10.3157 1.83173C11.4087 2.96334 12.0134 4.47896 11.9998 6.05214C11.9861 7.62532 11.3551 9.13019 10.2426 10.2426C9.13019 11.3551 7.62532 11.9861 6.05214 11.9998C4.47896 12.0134 2.96334 11.4087 1.83173 10.3157ZM9.46973 9.46973C10.3704 8.56905 10.8764 7.34748 10.8764 6.07373C10.8764 4.79998 10.3704 3.5784 9.46973 2.67773C8.56905 1.77705 7.34748 1.27106 6.07373 1.27106C4.79998 1.27106 3.5784 1.77705 2.67773 2.67773C1.77705 3.5784 1.27106 4.79998 1.27106 6.07373C1.27106 7.34748 1.77705 8.56905 2.67773 9.46973C3.5784 10.3704 4.79998 10.8764 6.07373 10.8764C7.34748 10.8764 8.56905 10.3704 9.46973 9.46973ZM5.47373 3.07373H6.67373V6.67373H5.47373V3.07373ZM5.47373 7.87373H6.67373V9.07373H5.47373V7.87373Z"
        fill="white"
      />
    </svg>
  );
};
