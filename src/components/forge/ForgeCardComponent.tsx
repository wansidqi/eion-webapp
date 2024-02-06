import { useEffect, useState } from 'react';
import { ForgeProgressbar } from '..';
import { useBoundStore } from '../../store';
import loadingIcon from '/assets/images/Layout/loading.png';

import { RefinementLevel } from '../../layout';
import { useLevelUpHandler } from '../../handlers';

export function ForgeCardComponent(): JSX.Element {
  const { onClickDuplicate, expStats } = useLevelUpHandler();
  const { forge, setForgeState, resetForge } = useBoundStore();
  const { showForgeCard, selectCard, forging, loading, isForgeCompleted, cardToConsume, cardStacks } = forge;
  const [isHidden, setIsHidden] = useState(false);

  const handleRefineCard = () => {
    setForgeState({ forgeConfirmation: true, cardToConsumeIds: cardToConsume?.map(el => el.id) });
  };

  const handleConfirm = () => resetForge();

  useEffect(() => {
    if (forging) {
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [forging]);

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 1000);
  }, [isHidden]);

  const handleClose = () => {
    setForgeState({ selectCard: null, showForgeCard: false, selectCardModal: true, cardToConsume: [] });
  };

  return (
    <div className="">
      {showForgeCard && (
        <div className="flexcenter-col max-w-screen relative mt-5">
          <div className="flexcenter mb-5 gap-3">
            <button onClick={handleClose}>{closeBtn}</button>
            <b className="roboto-condensed text-[16px] font-extrabold">Choose duplicates to use as material</b>
          </div>
          <div className="flexcenter-col mt-1">
            <div
              className={`flexcenter blueborder min-w-20 relative ${
                isHidden ? 'animate-scale mt-40 scale-[1.5]' : ''
                // isHidden ? 'animate-scale mt-40 scale-[1.5]' : isForgeCompleted ? 'animate-scale-down' : ''
              }`}
            >
              <RefinementLevel
                isTrial={Boolean(selectCard?.singleUseOnly)}
                className="left-5 top-4 min-w-[30px] scale-[1.6] border border-transparent"
                level={isForgeCompleted ? expStats.currentLevel : selectCard?.refinementLevel ?? 0}
              />
              <img
                src={selectCard?.card?.details?.image && selectCard?.card?.details?.image}
                className=" h-[370px]"
                alt=""
              />
            </div>

            {!isHidden && (
              <ForgeProgressbar
                currentLevel={expStats.currentLevel}
                totalExp={expStats.totalExp}
                currentExp={expStats.currentExp}
              />
            )}
          </div>
          {!isHidden && (
            <>
              {!forging && (
                /* max-w-[calc(80%-2rem)] */
                <div id="card-selection" className={`${forging ? 'animate-fadeOut' : ''} `}>
                  <b className="roboto-condensed flexcenter mt-1 w-full text-center text-[16px]">
                    {cardStacks.length > 0 ? 'Duplicates Available' : 'Duplicates not Available'}
                  </b>
                  <div className="scrollbar-hidden relative my-5 flex w-[360px] items-center overflow-x-auto overflow-y-hidden">
                    <div className="flex gap-3">
                      {cardStacks?.map(userCard => (
                        <button
                          key={userCard.id}
                          className="h-[80px] w-[80px]"
                          onClick={() => onClickDuplicate(userCard)}
                        >
                          <RefinementLevel
                            isTrial={Boolean(userCard?.singleUseOnly)}
                            className="z-20 min-w-[30px]"
                            level={isForgeCompleted ? expStats.currentLevel : userCard.refinementLevel}
                          />
                          <img
                            className={`crop-refinement scale-[1.3] ${
                              cardToConsume.includes(userCard) ? 'grayscale filter' : ''
                            } `}
                            src={userCard?.card?.details?.image}
                            alt=""
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className={`${isForgeCompleted ? 'animate-fadeOut' : ''}  w-full `}>
                <div className={`${isForgeCompleted ? 'mt-20' : ''} metal mx-8 mt-1`}>
                  <button
                    disabled={cardStacks.length <= 0 || cardToConsume.length <= 0}
                    onClick={isForgeCompleted ? () => handleConfirm() : () => handleRefineCard()}
                    className={` ${
                      cardStacks.length <= 0 || cardToConsume.length <= 0 ? 'bg-[#808080]' : 'blue-radial-btn'
                    }  relative w-full p-3`}
                  >
                    {isForgeCompleted ? <p>Confirm</p> : loading ? <p>Refining</p> : <p>Refine Card</p>}

                    {loading && (
                      <div className="loader absolute right-14 top-2">
                        <img src={loadingIcon} alt="" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const closeBtn = (
  <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1124_368)">
      <path
        d="M16.0003 15.8665L19.867 19.7332C20.1114 19.9776 20.4225 20.0998 20.8003 20.0998C21.1781 20.0998 21.4892 19.9776 21.7337 19.7332C21.9781 19.4887 22.1003 19.1776 22.1003 18.7998C22.1003 18.4221 21.9781 18.1109 21.7337 17.8665L17.867 13.9998L21.7337 10.1332C21.9781 9.88873 22.1003 9.57761 22.1003 9.19984C22.1003 8.82206 21.9781 8.51095 21.7337 8.2665C21.4892 8.02206 21.1781 7.89984 20.8003 7.89984C20.4225 7.89984 20.1114 8.02206 19.867 8.2665L16.0003 12.1332L12.1337 8.2665C11.8892 8.02206 11.5781 7.89984 11.2003 7.89984C10.8225 7.89984 10.5114 8.02206 10.267 8.2665C10.0225 8.51095 9.90033 8.82206 9.90033 9.19984C9.90033 9.57761 10.0225 9.88873 10.267 10.1332L14.1337 13.9998L10.267 17.8665C10.0225 18.1109 9.90033 18.4221 9.90033 18.7998C9.90033 19.1776 10.0225 19.4887 10.267 19.7332C10.5114 19.9776 10.8225 20.0998 11.2003 20.0998C11.5781 20.0998 11.8892 19.9776 12.1337 19.7332L16.0003 15.8665ZM16.0003 27.3332C14.1559 27.3332 12.4225 26.9829 10.8003 26.2825C9.1781 25.5821 7.76699 24.6323 6.56699 23.4332C5.36699 22.2332 4.41721 20.8221 3.71766 19.1998C3.0181 17.5776 2.66788 15.8443 2.66699 13.9998C2.66699 12.1554 3.01721 10.4221 3.71766 8.79984C4.4181 7.17762 5.36788 5.7665 6.56699 4.5665C7.76699 3.3665 9.1781 2.41673 10.8003 1.71717C12.4225 1.01762 14.1559 0.667393 16.0003 0.666504C17.8448 0.666504 19.5781 1.01673 21.2003 1.71717C22.8225 2.41762 24.2337 3.36739 25.4337 4.5665C26.6337 5.7665 27.5839 7.17762 28.2843 8.79984C28.9848 10.4221 29.3345 12.1554 29.3337 13.9998C29.3337 15.8443 28.9834 17.5776 28.283 19.1998C27.5825 20.8221 26.6328 22.2332 25.4337 23.4332C24.2337 24.6332 22.8225 25.5834 21.2003 26.2838C19.5781 26.9843 17.8448 27.3341 16.0003 27.3332Z"
        fill="url(#paint0_linear_1124_368)"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1124_368"
        x="-1.33301"
        y="0.666504"
        width="34.667"
        height="34.6665"
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
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1124_368" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1124_368" result="shape" />
      </filter>
      <linearGradient id="paint0_linear_1124_368" x1="3" y1="5.5" x2="29" y2="27" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8A8A8A" />
        <stop offset="1" stopColor="#979797" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
