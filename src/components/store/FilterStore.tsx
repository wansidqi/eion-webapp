import { StoreType } from '../../types';
import { useBoundStore } from '../../store';

export function FilterStore() {
  const { store, setStoreState } = useBoundStore();
  const { storeType } = store;

  const storeTypes = [
    { label: 'BOOSTER PACK', type: StoreType.BOOSTER },
    { label: lockIcon, type: StoreType.COSMETICS },
  ];

  const buttonClass = 'w-full h-[52px]';
  const activeButtonClass = `${buttonClass} blue-gradient`;
  const inactiveButtonClass = `${buttonClass} inactive`;

  return (
    <>
      <div className="flexcenter deadjim m-2 gap-2 text-[16px] font-bold">
        {storeTypes.map((item, index) => (
          <div key={item.type} className="metal  w-full">
            <button
              key={index}
              className={storeType === item.label ? activeButtonClass : inactiveButtonClass}
              // className={storeType === item.label ? activeButtonClass : inactiveButtonClass}
              onClick={() => {
                if (item.type !== StoreType.COSMETICS) {
                  setStoreState({ storeType: item.type });
                }
              }}
              // Disable the "COSMETICS" button
              disabled={item.type === StoreType.COSMETICS}
            >
              <div className="flexcenter text-[18px]">{item.label}</div>
              {/* {item.type === StoreType.COSMETICS ? <span className="text-[14px]">Coming Soon</span> : <span></span>} */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

const lockIcon = (
  <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.9054 0C11.3041 0 11.7035 0 12.1028 0C12.5722 0.0773453 13.0464 0.132424 13.5103 0.234966C17.1481 1.03713 19.9727 4.06942 20.3595 7.72339C20.4691 8.75759 20.4176 9.8082 20.4391 10.8512C20.4415 10.9748 20.4391 11.099 20.4391 11.2508C21.0606 11.2508 21.6467 11.2485 22.2328 11.2514C22.7417 11.2537 22.9974 11.4928 22.998 11.9803C22.9998 17.1437 23.0022 22.3065 22.9962 27.4699C22.995 28.2978 22.6729 29.0109 21.9688 29.4791C21.603 29.7228 21.1426 29.8307 20.7253 30H2.28409C2.26673 29.9906 2.25056 29.9748 2.232 29.9725C0.926233 29.8055 -0.00714323 28.7056 4.11901e-05 27.2654C0.024588 22.1998 0.00962042 17.1343 0.00962042 12.0688C0.00962042 11.4758 0.23593 11.2526 0.83523 11.2514C1.4016 11.2502 1.96738 11.2514 2.56907 11.2514C2.56907 11.119 2.56907 11.0147 2.56907 10.9104C2.56907 10.2371 2.57266 9.56327 2.56907 8.89002C2.5577 6.91654 3.13005 5.12647 4.33764 3.54206C5.57156 1.92367 7.18985 0.840837 9.18054 0.313483C9.74272 0.164066 10.3294 0.101955 10.9054 0ZM16.5973 11.235C16.5973 10.3338 16.6266 9.44725 16.5859 8.56364C16.5637 8.08375 16.4865 7.58804 16.3254 7.13627C15.504 4.82939 13.305 3.52038 10.7958 3.80632C8.43934 4.07469 6.46363 6.18293 6.41573 8.49333C6.39777 9.34178 6.40675 10.1914 6.40495 11.0405C6.40495 11.1049 6.41932 11.1694 6.4277 11.235H16.5973ZM11.5017 25.006C11.8807 25.006 12.2597 25.006 12.6386 25.006C12.6488 25.006 12.6584 25.006 12.6686 25.006C13.1966 24.9808 13.4654 24.6901 13.4098 24.1968C13.287 23.1116 13.1583 22.0276 13.044 20.9418C13.0344 20.8486 13.0865 20.7156 13.1571 20.6524C13.8127 20.0688 14.1156 19.3627 14.0276 18.4879C13.8839 17.0558 12.5057 15.9941 10.9736 16.3134C9.92951 16.5308 9.24699 17.2029 9.01769 18.2236C8.80515 19.1687 9.09731 19.9932 9.84809 20.6483C9.91634 20.708 9.9804 20.8252 9.97142 20.9084C9.85647 21.9942 9.73014 23.0782 9.60142 24.1628C9.53976 24.679 9.7948 24.9854 10.3348 25.003C10.7234 25.0159 11.1125 25.006 11.5017 25.006Z"
      fill="url(#paint0_linear_2842_1183)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2842_1183"
        x1="4.4"
        y1="1.6097e-07"
        x2="22.117"
        y2="30.5127"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D6D6D6" />
        <stop offset="1" stopColor="#A29393" />
      </linearGradient>
    </defs>
  </svg>
);
