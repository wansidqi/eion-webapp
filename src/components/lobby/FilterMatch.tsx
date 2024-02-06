import { useBoundStore } from '../../store';
import { MatchStatus } from '../../types';

export function FilterMatch() {
  const { setLobbyState, lobby } = useBoundStore();
  const { matchStatus } = lobby;
  const width = 110;

  const pastBtn = (item: any) => (
    <svg width={width} height="56" viewBox="0 0 112 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_di_34_31901)">
        <path
          d="M4.5 4H108V52H20.5425L4.5 4Z"
          fill="url(#paint0_radial_34_31901)"
          fillOpacity="0.7"
          shapeRendering="crispEdges"
        />
      </g>
      <text x="53%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF">
        {MatchStatus.PAST}
      </text>
      <defs>
        <filter
          id="filter0_di_34_31901"
          x="0.5"
          y="0"
          width="111.5"
          height="56"
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
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.579167 0 0 0 0 0.579167 0 0 0 0 0.579167 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_31901" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_31901" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_34_31901" />
        </filter>
        <radialGradient
          id="paint0_radial_34_31901"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(62.2441 4) rotate(90) scale(44.64 90.7063)"
        >
          {matchStatus === item ? (
            <>
              <stop stopColor="#168FFF" />
              <stop offset="1" stopColor="#005CB1" />
            </>
          ) : (
            <>
              <stop stopColor="#717171" />
              <stop offset="1" stopColor="#151515" />
            </>
          )}
        </radialGradient>
      </defs>
    </svg>
  );

  const liveBtn = (item: any) => (
    <svg width={width} height="56" viewBox="0 0 118 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_di_34_31895)">
        <path
          d="M4.00004 4H97.6842L114 52H4L4.00004 4Z"
          fill="url(#paint0_radial_34_31895)"
          fillOpacity="0.7"
          shapeRendering="crispEdges"
        />
      </g>
      <text x="40%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF">
        {MatchStatus.LIVE}
      </text>
      <defs>
        <filter
          id="filter0_di_34_31895"
          x="0"
          y="0"
          width="118"
          height="56"
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
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.579167 0 0 0 0 0.579167 0 0 0 0 0.579167 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_31895" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_31895" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_34_31895" />
        </filter>
        <radialGradient
          id="paint0_radial_34_31895"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.3643 4) rotate(90) scale(44.64 103.972)"
        >
          {matchStatus === item ? (
            <>
              <stop stopColor="#168FFF" />
              <stop offset="1" stopColor="#005CB1" />
            </>
          ) : (
            <>
              <stop stopColor="#717171" />
              <stop offset="1" stopColor="#151515" />
            </>
          )}
        </radialGradient>
      </defs>
    </svg>
  );

  const upcomingBUtton = (item: any) => (
    <div className={`${matchStatus === item ? 'active' : 'inactive'} flexcenter h-[45.5px] w-[173px] skew-x-[20deg]`}>
      <p className="skew-x-[-20deg]">{MatchStatus.UPCOMING}</p>
    </div>
  );

  const matchTypes = [
    {
      label: MatchStatus.LIVE,
      status: MatchStatus.LIVE,
      tag: liveBtn(MatchStatus.LIVE),
    },
    {
      label: MatchStatus.UPCOMING,
      status: MatchStatus.UPCOMING,
      tag: upcomingBUtton(MatchStatus.UPCOMING),
    },
    {
      label: MatchStatus.PAST,
      status: MatchStatus.PAST,
      tag: pastBtn(MatchStatus.PAST),
    },
  ];

  return (
    <>
      <div className="flexcenter deadjim px-3 text-[16px]">
        {matchTypes.map(matchType => (
          <button key={matchType.label} onClick={() => setLobbyState({ matchStatus: matchType.status })}>
            <div className="-ml-1">{matchType.tag}</div>
          </button>
        ))}
      </div>
    </>
  );
}
