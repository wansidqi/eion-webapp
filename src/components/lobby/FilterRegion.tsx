import { useBoundStore } from '../../store';
import { RegionFilter } from '../../types';

export function FilterRegion() {
  const { setLobbyState, lobby } = useBoundStore();
  const { regionFilter } = lobby;

  const regionBtn = (name: any) => (
    <div className={`flexcenter ${regionFilter === name ? 'active' : 'inactive'} h-[48px] w-[80px] -skew-x-[-20deg]`}>
      <p className="-skew-x-[20deg]">{name}</p>
    </div>
  );

  const endBtn = (name: any) => (
    <div className="-ml-4">
      <svg width="86" height="56" viewBox="0 0 86 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_di_34_31911)">
          <path
            d="M4 4H82V52H21.3129L4 4Z"
            fill="url(#paint0_radial_34_31911)"
            fillOpacity="0.7"
            shapeRendering="crispEdges"
          />
        </g>
        <text x="53%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF">
          {name}
        </text>
        <defs>
          <filter
            id="filter0_di_34_31911"
            x="0"
            y="0"
            width="86"
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
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_31911" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_31911" result="shape" />
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
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_34_31911" />
          </filter>
          <radialGradient
            id="paint0_radial_34_31911"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(69.5149 4) rotate(90) scale(45.7846 73.8953)"
          >
            {regionFilter === name ? (
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
    </div>
  );

  const startBtn = (name: any) => (
    <div className="-mr-4">
      <svg width="96" height="56" viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_di_34_31905)">
          <path
            d="M4 4H73.6119L92 52H4V4Z"
            fill="url(#paint0_radial_34_31905)"
            fillOpacity="0.7"
            shapeRendering="crispEdges"
          />
        </g>
        <text x="45%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF">
          {name}
        </text>
        <defs>
          <filter
            id="filter0_di_34_31905"
            x="0"
            y="0"
            width="96"
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
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_31905" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_31905" result="shape" />
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
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_34_31905" />
          </filter>
          <radialGradient
            id="paint0_radial_34_31905"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(40.2178 4) rotate(90) scale(46.08 88.791)"
          >
            {regionFilter === name ? (
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
    </div>
  );

  const regionTypes = [
    {
      label: RegionFilter.ALL,
      value: RegionFilter.ALL,
      tag: startBtn(RegionFilter.ALL),
    },
    {
      label: RegionFilter.MY,
      value: RegionFilter.MY,
      tag: regionBtn(RegionFilter.MY),
    },
    {
      label: RegionFilter.PH,
      value: RegionFilter.PH,
      tag: regionBtn(RegionFilter.PH),
    },
    {
      label: RegionFilter.SG,
      value: RegionFilter.SG,
      tag: regionBtn(RegionFilter.SG),
    },
    {
      label: RegionFilter.KH,
      value: RegionFilter.KH,
      tag: endBtn(RegionFilter.KH),
    },
  ];

  return (
    <div className="flexcenter deadjim gap-0 text-[16px]">
      {regionTypes.map(regionType => (
        <button key={regionType.label} onClick={() => setLobbyState({ regionFilter: regionType.value })}>
          {regionType.tag}
        </button>
      ))}
    </div>
  );
}
