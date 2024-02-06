import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../../store';
// import card from '/assets/images/Playmat/card-example.png';
import { BoosterPackCard } from '../../interface';
// import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { RefinementLevel } from '../../layout';
import { useNavigate } from 'react-router-dom';

export function CardsObtained(): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { store, setStoreState, setOnboardingState, onboarding } = useBoundStore();
  const { isFirstTime } = onboarding;
  const { cardObtained, latestCardObtained } = store;
  const [viewCard, setViewCard] = useState(false);

  // const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  // const { user } = data;
  // const { useGetInventory } = useRepositories();
  // const inventory = useGetInventory(user.id).data;

  const [card, setCard] = useState<BoosterPackCard | undefined>(undefined);

  const hanldePreview = (pic: BoosterPackCard | undefined) => {
    setViewCard(true);
    setCard(pic);
  };

  useEffect(() => {
    if (viewCard) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setViewCard(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [viewCard]);

  const handleConfirmClick = () => {
    // if (inventory?.cards && inventory.cards.length <= 0) {
    if (isFirstTime) {
      navigate('/');
      setStoreState({ cardObtained: false });
      setOnboardingState({ cardObtained: true, isFirstTime: false });
    } else {
      setStoreState({ cardObtained: false, latestCardObtained });
    }
  };

  return (
    <div>
      {cardObtained && (
        <>
          <div className="gatcha-bg fixed inset-0 z-50">
            <div className="flexcenter-col w-full bg-opacity-90 text-[16px]">
              <div className="store-title w-full py-5">
                <p className="deadjim ml-4">Cards obtained</p>
              </div>
              <div className="mx-4 my-4 grid max-h-[70vh] grid-cols-4 overflow-auto">
                {latestCardObtained.map(bpCard => {
                  return (
                    <button onClick={() => hanldePreview(bpCard)} className="flexcenter-col relative">
                      <RefinementLevel
                        className="left-0 top-0"
                        isTrial={bpCard?.card?.singleUseOnly || false}
                        level={bpCard?.card?.refinementLevel ?? 0}
                      />
                      {bpCard?.isNew && <p className="deadjim text-[12px]">new!</p>}
                      <img src={bpCard.card.details?.image} alt="" />
                    </button>
                  );
                })}
              </div>
              <div className="metal fixed bottom-14 mx-8 w-full max-w-[calc(90%-1rem)]">
                <button
                  // onClick={() => setStoreState({ cardObtained: false, latestCardObtained })}
                  onClick={handleConfirmClick}
                  className={`blue-radial-btn relative w-full rounded-sm py-3`}
                >
                  <b className="text-[16px]">CONFIRM</b>
                </button>
              </div>
            </div>
          </div>
          {viewCard && (
            <>
              <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
                <div className="w-full bg-opacity-90 text-[16px]">
                  <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">
                    <div className="flexcenter relative h-[550px] w-[350px]">
                      <RefinementLevel
                        className="left-8 top-6 scale-[2]"
                        isTrial={card?.card?.singleUseOnly || false}
                        level={card?.card?.refinementLevel ?? 0}
                      />
                      <img
                        src={card?.card?.details?.image}
                        // className={`h-full w-full`}
                        className={`h-full w-full`} //${card?.card?.details?.rarity}-shadow
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
