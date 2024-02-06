import { ProfileSetting } from '../types';
import { useNavigate } from 'react-router-dom';
import { useBoundStore } from '../store';

export function ProfileSettingButton() {
  const navigate = useNavigate();

  const { button, setButtonState } = useBoundStore();
  const { profileSetting } = button;

  const profileBtn = (
    <svg width="305" height="56" viewBox="0 0 305 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_di_259_31888)">
        <path
          d="M4.0001 4H288L301 52H4L4.0001 4Z"
          fill="url(#paint0_radial_259_31888)"
          fillOpacity="0.7"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M103.625 34V22.8281H108.625C110.906 22.8281 112.047 23.8776 112.047 25.9766C112.047 28.2526 110.487 29.6302 107.367 30.1094L107.07 28.2656C108.945 27.9271 109.883 27.1849 109.883 26.0391C109.883 25.112 109.419 24.6484 108.492 24.6484H105.695V34H103.625ZM113.422 33.9844V22.8281H118.5C120.781 22.8281 121.922 23.8255 121.922 25.8203C121.922 27.1693 121.034 28.2865 119.258 29.1719L122.797 34H120.188L116.789 29.1328V28.1875C118.768 27.849 119.758 27.0807 119.758 25.8828C119.758 25.0599 119.294 24.6484 118.367 24.6484H115.531V33.9844H113.422ZM125.539 28.3828C125.539 30.9818 126.693 32.2812 129 32.2812C131.25 32.2812 132.375 30.9818 132.375 28.3828C132.375 25.8255 131.25 24.5469 129 24.5469C126.693 24.5469 125.539 25.8255 125.539 28.3828ZM123.391 28.4297C123.391 24.6432 125.26 22.75 129 22.75C132.682 22.75 134.523 24.6432 134.523 28.4297C134.523 32.1953 132.682 34.0781 129 34.0781C125.427 34.0781 123.557 32.1953 123.391 28.4297ZM143.82 22.8281V24.6094H138.539V27.4219H143.555V29.2734H138.516V34H136.484V22.8281H143.82ZM147.648 22.8281V34H145.578V22.8281H147.648ZM152.07 22.8281V32.2031H156.508V34H150V22.8281H152.07ZM166.117 22.8281V24.6094H160.523V27.4219H165.852V29.2734H160.5V32.2031H166.227V34H158.469V22.8281H166.117Z"
        fill="#B7B7B7"
      />
      <defs>
        <filter
          id="filter0_di_259_31888"
          x="0"
          y="0"
          width="305"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_259_31888" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_259_31888" result="shape" />
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
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_259_31888" />
        </filter>
        <radialGradient
          id="paint0_radial_259_31888"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(137.284 4) rotate(90) scale(44.64 280.724)"
        >
          {profileSetting === ProfileSetting.PROFILE ? (
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

  const settingBtn = (
    <svg width="87" height="56" viewBox="0 0 87 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_di_259_31890)">
        <path
          d="M4 4H82.375V52H19L4 4Z"
          fill="url(#paint0_radial_259_31890)"
          fillOpacity="0.7"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M46.9024 23.4451C45.8513 23.4451 44.8669 23.8529 44.1216 24.5982C43.3798 25.3436 42.9684 26.3279 42.9684 27.3791C42.9684 28.4303 43.3798 29.4146 44.1216 30.16C44.8669 30.9018 45.8513 31.3131 46.9024 31.3131C47.9536 31.3131 48.938 30.9018 49.6833 30.16C50.4251 29.4146 50.8364 28.4303 50.8364 27.3791C50.8364 26.3279 50.4251 25.3436 49.6833 24.5982C49.3192 24.2314 48.886 23.9406 48.4086 23.7426C47.9312 23.5447 47.4192 23.4435 46.9024 23.4451ZM61.3973 31.7244L59.0981 29.7592C59.2071 29.0912 59.2634 28.4092 59.2634 27.7307C59.2634 27.0521 59.2071 26.3666 59.0981 25.7021L61.3973 23.7369C61.571 23.5882 61.6953 23.3902 61.7537 23.1691C61.8121 22.9481 61.8019 22.7145 61.7243 22.4994L61.6927 22.408C61.0599 20.6386 60.1118 18.9984 58.8942 17.567L58.8309 17.4932C58.6831 17.3193 58.486 17.1944 58.2658 17.1347C58.0455 17.0751 57.8123 17.0836 57.597 17.1592L54.7423 18.1752C53.6876 17.3104 52.5134 16.6283 51.2407 16.1537L50.6888 13.1689C50.6471 12.9441 50.538 12.7372 50.376 12.5759C50.214 12.4145 50.0067 12.3062 49.7817 12.2654L49.6868 12.2479C47.8587 11.9174 45.9321 11.9174 44.104 12.2479L44.0091 12.2654C43.7841 12.3062 43.5768 12.4145 43.4148 12.5759C43.2527 12.7372 43.1437 12.9441 43.102 13.1689L42.5466 16.1678C41.286 16.6462 40.1116 17.3265 39.0696 18.1822L36.1938 17.1592C35.9786 17.083 35.7452 17.0742 35.5248 17.1339C35.3044 17.1935 35.1073 17.3188 34.9598 17.4932L34.8966 17.567C33.6812 18.9999 32.7333 20.6397 32.0981 22.408L32.0665 22.4994C31.9083 22.9389 32.0384 23.4311 32.3934 23.7369L34.7208 25.7232C34.6118 26.3842 34.5591 27.0592 34.5591 27.7271C34.5591 28.4021 34.6118 29.0771 34.7208 29.7311L32.4005 31.7174C32.2268 31.8661 32.1025 32.0641 32.0441 32.2852C31.9857 32.5062 31.9959 32.7398 32.0735 32.9549L32.1052 33.0463C32.7415 34.8146 33.6802 36.4494 34.9036 37.8873L34.9669 37.9611C35.1147 38.135 35.3118 38.2599 35.5321 38.3196C35.7523 38.3792 35.9855 38.3707 36.2009 38.2951L39.0766 37.2721C40.1243 38.1334 41.2915 38.8154 42.5536 39.2865L43.1091 42.2854C43.1507 42.5102 43.2598 42.7171 43.4218 42.8784C43.5838 43.0398 43.7911 43.1481 44.0161 43.1889L44.111 43.2064C45.9571 43.5387 47.8477 43.5387 49.6938 43.2064L49.7887 43.1889C50.0138 43.1481 50.221 43.0398 50.3831 42.8784C50.5451 42.7171 50.6541 42.5102 50.6958 42.2854L51.2477 39.3006C52.5204 38.8225 53.6946 38.1439 54.7493 37.2791L57.604 38.2951C57.8193 38.3713 58.0526 38.3801 58.273 38.3204C58.4934 38.2608 58.6905 38.1355 58.838 37.9611L58.9012 37.8873C60.1247 36.4424 61.0634 34.8146 61.6997 33.0463L61.7313 32.9549C61.8825 32.5189 61.7524 32.0303 61.3973 31.7244ZM46.9024 33.5596C43.4888 33.5596 40.722 30.7928 40.722 27.3791C40.722 23.9654 43.4888 21.1986 46.9024 21.1986C50.3161 21.1986 53.0829 23.9654 53.0829 27.3791C53.0829 30.7928 50.3161 33.5596 46.9024 33.5596Z"
        fill="#E1E1E1"
      />
      <defs>
        <filter
          id="filter0_di_259_31890"
          x="0"
          y="0"
          width="86.375"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_259_31890" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_259_31890" result="shape" />
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
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_259_31890" />
        </filter>
        <radialGradient
          id="paint0_radial_259_31890"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(49.2185 4) rotate(90) scale(44.64 65.7292)"
        >
          {profileSetting === ProfileSetting.SETTING ? (
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

  const handleBtnClick = (name: ProfileSetting, link: any) => {
    setButtonState({ profileSetting: name });
    navigate(link);
  };

  return (
    <div className="flexcenter my-3">
      {/* <a href="/profile"> */}
      <button className="-mr-2" onClick={() => handleBtnClick(ProfileSetting.PROFILE, '/profile')}>
        {profileBtn}
      </button>
      {/* </a> */}
      {/* <a href="/setting"> */}
      <button className="-ml-2" onClick={() => handleBtnClick(ProfileSetting.SETTING, '/setting')}>
        {settingBtn}
      </button>
      {/* </a> */}
    </div>
  );
}
