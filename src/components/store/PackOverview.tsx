/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { PackDetails, PackType, RarityTypes } from '../../types';
import { useBoundStore } from '../../store';

import NoImg from '/assets/images/Store/no-image.png';
import diamond from '/assets/images/Store/diamond.png';
import { CardPools, Details, Highlight, Odds } from '..';
// import { useNavigate } from 'react-router-dom';
import { BuyPack } from './BuyPack';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';

export function PackOverwiew(): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const { store, setStoreState } = useBoundStore();

  const { packOverview, packDetails, buy, currentPackId, cardObtained } = store;

  const { useGetBoosterPackById } = useRepositories();
  const { data: boosterPack } = useGetBoosterPackById(currentPackId);
  const [buyDetails, setBuyDetails] = useState({ numberOfPack: 1 });

  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;
  const { useGetTotalLP } = useRepositories();
  const { data: totalLP, refetch: refetchLP } = useGetTotalLP(user.id);

  useEffect(() => {
    refetchLP();
  }, [cardObtained, totalLP]);

  function onClickBuy(quantity: number) {
    setBuyDetails({ numberOfPack: quantity });
    setStoreState({ buy: true });
  }

  if (boosterPack) {
    boosterPack.cards = boosterPack?.cards?.sort((a, b) => {
      if (!a.card?.details?.rarity || !b.card?.details?.rarity) return 0;
      if (a.card?.details.rarity === RarityTypes.basic) return 1;
      return -1;
    });
  }

  const pack2 = [
    // {
    //   name: 'Highlight',
    //   type: PackDetails.HIGHLIGHT,
    //   image: [Img_1, Img_2, Img_3, Img_4, Img_1],
    // },
    {
      name: 'Details',
      type: PackDetails.DETAILS,
    },
    {
      name: 'Card Pool',
      type: PackDetails.CARD_POOLS,
    },
    {
      name: 'Odds',
      type: PackDetails.ODDS,
    },
  ];

  const pack3 = [
    // {
    //   name: 'Highlight',
    //   type: PackDetails.HIGHLIGHT,
    //   image: [Img_1, Img_2, Img_3, Img_4, Img_1],
    // },
    {
      name: 'Details',
      type: PackDetails.DETAILS,
    },
    {
      name: 'Card Pool',
      type: PackDetails.CARD_POOLS,
    },
    {
      name: 'Odds',
      type: PackDetails.ODDS,
    },
  ];

  const button = [
    {
      id: 1,
      label: 'Buy 1 Pack',
      css: 'one-pack-bg',
      price: boosterPack?.type === PackType.STANDARD ? boosterPack?.loyaltyPoint : boosterPack?.price ?? 0,
      quantity: 1,
    },
    {
      id: 2,
      label: 'Buy 10 Pack',
      css: 'ten-pack-bg',
      price:
        boosterPack?.type === PackType.STANDARD && boosterPack
          ? boosterPack?.loyaltyPoint * 10
          : boosterPack?.price
          ? boosterPack.price * 10
          : 0,
      quantity: 10,
    },
  ];

  // dropdown
  // const [openIndex, setOpenIndex] = useState<number | null>(null);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleDropDownFocus = (index: number) => {
  //   setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  // };

  // open second modal based on type
  const [SelectedPack, setSelectedPack] = useState(null);

  const openModal = (type: any) => {
    setSelectedPack(type);
    setStoreState({ packDetails: true });
  };

  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate('/purchase');
  // };

  const close = (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.5"
        d="M15 30C7.929 30 4.3935 30 2.196 27.8025C0 25.608 0 22.071 0 15C0 7.929 0 4.3935 2.196 2.196C4.395 0 7.929 0 15 0C22.071 0 25.6065 0 27.8025 2.196C30 4.395 30 7.929 30 15C30 22.071 30 25.6065 27.8025 27.8025C25.608 30 22.071 30 15 30Z"
        fill="#E9E9E9"
      />
      <path
        d="M10.455 10.455C10.6659 10.2443 10.9519 10.126 11.25 10.126C11.5481 10.126 11.834 10.2443 12.045 10.455L15 13.41L17.955 10.455C18.058 10.3445 18.1822 10.2558 18.3202 10.1943C18.4582 10.1328 18.6071 10.0998 18.7582 10.0971C18.9093 10.0944 19.0593 10.1222 19.1994 10.1788C19.3395 10.2354 19.4667 10.3196 19.5735 10.4264C19.6804 10.5333 19.7646 10.6605 19.8212 10.8006C19.8778 10.9407 19.9055 11.0907 19.9029 11.2418C19.9002 11.3928 19.8671 11.5418 19.8057 11.6798C19.7442 11.8178 19.6555 11.942 19.545 12.045L16.59 15L19.545 17.955C19.6555 18.058 19.7442 18.1822 19.8057 18.3202C19.8671 18.4582 19.9002 18.6071 19.9029 18.7582C19.9055 18.9093 19.8778 19.0593 19.8212 19.1994C19.7646 19.3395 19.6804 19.4667 19.5735 19.5735C19.4667 19.6804 19.3395 19.7646 19.1994 19.8212C19.0593 19.8778 18.9093 19.9055 18.7582 19.9029C18.6071 19.9002 18.4582 19.8671 18.3202 19.8057C18.1822 19.7442 18.058 19.6555 17.955 19.545L15 16.59L12.045 19.545C11.8317 19.7437 11.5497 19.8519 11.2582 19.8467C10.9668 19.8416 10.6887 19.7235 10.4826 19.5174C10.2764 19.3113 10.1584 19.0332 10.1532 18.7418C10.1481 18.4503 10.2563 18.1682 10.455 17.955L13.41 15L10.455 12.045C10.2443 11.834 10.126 11.5481 10.126 11.25C10.126 10.9519 10.2443 10.6659 10.455 10.455Z"
        fill="#E9E9E9"
      />
    </svg>
  );

  const arrow = (
    <svg
      fill="#ffffff"
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 511.949 511.949"
      xmlSpace="preserve"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <path d="M386.235,248.308L140.902,2.975c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l237.76,237.76 l-237.76,237.867c-4.267,4.053-4.373,10.88-0.213,15.04c4.053,4.267,10.88,4.373,15.04,0.213c0.107-0.107,0.213-0.213,0.213-0.213 l245.333-245.333C390.395,259.188,390.395,252.468,386.235,248.308z"></path>
          </g>
        </g>
      </g>
    </svg>
  );

  useEffect(() => {
    // if (packDetails) {
    //   document.body.style.overflowY = 'hidden';
    // } else {
    //   document.body.style.overflowY = 'scroll';
    // }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setStoreState({ packDetails: false, buy: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [packDetails, buy]);

  const css: React.CSSProperties = {
    // width: '100%',
    // height: '100%',
    objectFit: 'cover',
    backgroundImage: `url(${boosterPack?.image})`,
    // backgroundSize: 'contain',
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      {/* First Modal  */}
      {packOverview && (
        <>
          <div ref={modalRef} className="home-bg scrollbar-hidden fixed inset-0 z-50 overflow-auto bg-opacity-100">
            <div className="flexcenter relative gap-x-4 bg-[#010E1A] bg-opacity-80 p-4">
              <button
                onClick={() => setStoreState({ packOverview: false, currentPackId: 0 })}
                className="absolute left-5"
              >
                {close}
              </button>
              <p className="deadjim text-[16px]">{boosterPack?.name}</p>
            </div>
            <div className="my-2 flex items-center justify-end">
              {boosterPack?.type === PackType.STANDARD ? (
                <>
                  <p className="deadjim text-[16px] text-white">{totalLP?.loyaltyPoints ?? 0}</p>
                  <img src={diamond} alt="Shards" className="ml-1" />
                </>
              ) : (
                <p className="roboto-bold mr-2 text-[16px] text-white">US$ {boosterPack?.price}</p>
              )}
            </div>
            {boosterPack?.type === PackType.TEAM ? (
              <>
                <div>{''}</div>
              </>
            ) : (
              <div style={css} className="my-5 flex h-40 items-center justify-center bg-[#322F35]">
                {!boosterPack?.image && <img src={NoImg} className="w-1/6" />}
              </div>
            )}
            {/* <div style={css} className="my-5 flex h-40 items-center justify-center bg-[#322F35]">
              {!boosterPack?.image && <img src={NoImg} className="w-1/6" />}
            </div> */}

            <div className="mx-3">
              <div className="bg-[#181818]">
                <div className="deadjim linear-bg relative mt-2 flex items-center justify-between px-3 py-2 pl-2">
                  <p>HIGHLIGHT</p>
                </div>
                <Highlight boosterPackCards={boosterPack?.cards} />
              </div>
              {boosterPack?.type === PackType.STANDARD
                ? pack2.map((packs, index) => (
                    <div
                      className="app-drop-down-container deadjim relative flex w-full flex-col"
                      // ref={dropdownRef}
                      key={index}
                    >
                      <button
                        onClick={() => openModal(packs.type)}
                        className="linear-bg relative mt-2 flex items-center justify-between px-3 py-2 pl-2"
                      >
                        <p>{packs.name}</p>
                        {arrow}
                      </button>
                    </div>
                  ))
                : pack3.map((packs, index) => (
                    <div
                      className="app-drop-down-container deadjim relative flex w-full flex-col"
                      // ref={dropdownRef}
                      key={index}
                    >
                      <button
                        onClick={() => openModal(packs.type)}
                        className="linear-bg relative mt-2 flex items-center justify-between px-3 py-2 pl-2"
                      >
                        <p>{packs.name}</p>
                        {arrow}
                      </button>
                    </div>
                  ))}

              {/* {pack2.map((packs, index) => (
                <div
                  className="app-drop-down-container deadjim relative flex w-full flex-col"
                  // ref={dropdownRef}
                  key={index}
                >
                  <button
                    onClick={() => openModal(packs.type)}
                    className="linear-bg relative mt-2 flex items-center justify-between px-3 py-2 pl-2"
                  >
                    <p>{packs.name}</p>
                    {arrow}
                  </button>
                </div>
              ))}*/}
            </div>

            {/* button */}
            <div className="flexcenter-col my-10 w-full items-center justify-center gap-2 px-2">
              {button.map((buttons, index) => (
                <button key={index} className="mx-4 w-full">
                  <div className="silver-bg mx top-0 z-20 flex w-full flex-row items-center">
                    <div className="w-2/3 bg-gradient-to-r from-[#5097D9]/50 to-[#000000]/0">
                      <div
                        className={`deadjim m-1 bg-black py-2 text-[16px] ${buttons.css}`}
                        onClick={() => onClickBuy(buttons.quantity)}
                      >
                        {buttons.label}
                      </div>
                    </div>
                    <div className="roboto-bold mx-auto flex flex-row items-center">
                      {boosterPack?.type !== PackType.STANDARD && <span className='mr-2'>US$</span>}
                      <span>{buttons.price}</span>
                      {boosterPack?.type === PackType.STANDARD && <img src={diamond} alt="Shards" className="ml-1" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Second Modal  */}
            {packDetails && SelectedPack && (
              <>
                <div className="fixed inset-0 z-50 flex items-center bg-[#000000] bg-opacity-90">
                  <div ref={modalRef} className="modal w-full">
                    <div className="app-drop-down-container deadjim relative flex w-full flex-col">
                      <div
                        onClick={() => setStoreState({ packDetails: false })}
                        className="absolute right-6 top-2 z-20 cursor-pointer"
                      >
                        X
                      </div>
                      <div className="mx-4">
                        {SelectedPack === PackDetails.HIGHLIGHT && <Highlight boosterPackCards={boosterPack?.cards} />}
                        {SelectedPack === PackDetails.DETAILS && <Details description={boosterPack?.description} />}
                        {SelectedPack === PackDetails.CARD_POOLS && <CardPools boosterPackCards={boosterPack?.cards} />}
                        {SelectedPack === PackDetails.ODDS && <Odds oddImg={boosterPack?.oddsImage} packName={boosterPack?.name} />}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {buy && (
              <div className="fixed inset-0 z-50 flex items-center bg-[#000000] bg-opacity-50">
                <div ref={modalRef} className="modal w-full">
                  <div className="app-drop-down-container deadjim relative flex w-full flex-col">
                    <div
                      onClick={() => setStoreState({ buy: false })}
                      className="absolute right-6 top-2 z-20 cursor-pointer"
                    >
                      X
                    </div>
                    {boosterPack && <BuyPack buyDetails={buyDetails} boosterPack={boosterPack} />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
