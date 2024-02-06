import diamond from '/assets/images/Store/diamond.png';
import NoImg from '/assets/images/Store/no-image.png';
// import shard from '/assets/images/Store/shard.png';
// import noshard from '/assets/images/Store/noshard.png';
// import open from '/assets/images/Store/open.png';
// import video from '/assets/video/vid.mp4';
import { useBoundStore } from '../../store';
import { BoosterPackInterface, UserCardInterface } from '../../interface';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { useEffect, useState } from 'react';
import { PackType } from '../../types';
import StripeModal from './StripeModal';

export function BuyPack({
  buyDetails,
  boosterPack,
}: {
  buyDetails: { numberOfPack: number };
  boosterPack: BoosterPackInterface;
  }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { store, setStoreState } = useBoundStore();
  const { displayStripeModal, stripePaymentSuccess } = store;

  const { useCheckBalance, useOpenBoosterPack, useGetInventory } = useRepositories();
  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { data: userInventory } = useGetInventory(userId);

  const { mutateAsync: openBoosterPack } = useOpenBoosterPack();
  const { mutateAsync: checkBalance } = useCheckBalance();
  const { numberOfPack } = buyDetails;

  const [balanceMessage, setBalanceMessage] = useState(false);

  async function handleOpenClick() {
    try {
      setIsButtonDisabled(true);

      const isEnoughBalance = await checkBalance({ userId, amount: boosterPack.loyaltyPoint * numberOfPack });

      if (!isEnoughBalance) {
        setBalanceMessage(true);
        return;
      }

      const response = await openBoosterPack({
        userId,
        inventoryId: userInventory?.id as string,
        boosterPackId: boosterPack?.id,
        numberOfPack,
        totalAmount: boosterPack.loyaltyPoint * numberOfPack,
      });

      if (response?.success) {
        setStoreState({ showOpenImage: false, showVideo: true });

        const inventoryGrouped = userInventory?.cards.reduce((prev, curr) => {
          const cardName = curr.card.details?.name as string;
          if (!prev[cardName]) prev[cardName] = [];
          prev[cardName].push(curr);
          return prev;
        }, {} as Record<string, UserCardInterface[]>);

        const tagged = response.cards?.map(bpCard => {
          const cardName = bpCard.card.details?.name as string;
          return { ...bpCard, isNew: Boolean(inventoryGrouped?.[cardName]?.length) ? false : true };
        });

        setStoreState({ latestCardObtained: tagged });

        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 15000);
      }
    } catch (e) {}
  }

  useEffect(() => {
    async function open() {
      try {
        const response = await openBoosterPack({
          userId,
          inventoryId: userInventory?.id as string,
          boosterPackId: boosterPack?.id,
          numberOfPack,
          totalAmount: boosterPack.loyaltyPoint * numberOfPack,
        });

        if (response?.success) {
          setStoreState({
            showOpenImage: false,
            showVideo: true,
          });

          const inventoryGrouped = userInventory?.cards.reduce((prev, curr) => {
            const cardName = curr.card.details?.name as string;
            if (!prev[cardName]) prev[cardName] = [];
            prev[cardName].push(curr);
            return prev;
          }, {} as Record<string, UserCardInterface[]>);

          const tagged = response.cards?.map(bpCard => {
            const cardName = bpCard.card.details?.name as string;
            return { ...bpCard, isNew: Boolean(inventoryGrouped?.[cardName]?.length) ? false : true };
          });

          setStoreState({
            latestCardObtained: tagged,
            stripePaymentSuccess: false,
          });
        }
      } catch (e) {}
    }

    if (stripePaymentSuccess) open();
  }, [stripePaymentSuccess]);

  async function handleCheckout() {
    setStoreState({ displayStripeModal: true });
  }

  const css: React.CSSProperties = {
    // width: '100%',
    // height: '100%',
    // objectFit: 'cover',
    backgroundImage: `url(${boosterPack?.image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      <div className="flexcenter-col mx-3 rounded-lg bg-[#242424] pb-8">
        <p className="roboto-condensed mx-auto my-4 w-full text-center text-xl font-bold">Purchase Pack</p>
        <div className="flex w-full flex-col px-6 py-4">
          <div className="linear-bg3 w-full bg-[#000000]">
            <p className="deadjim px-2 py-2 text-left text-[16px]">{boosterPack.name}</p>
          </div>
          <div style={css} className="flex h-28 w-full items-center justify-center bg-[#322F35]">
            {!boosterPack?.image && <img src={NoImg} className="w-1/6" alt="" />}
          </div>
          <div className="my-2">
            <p className="roboto-condensed text-xs text-[#696969]">Quantity</p>
            <div className="roboto-condensed my-1 bg-[#3C3C3C] text-center text-base">{buyDetails.numberOfPack}</div>
          </div>

          {boosterPack?.type === PackType.STANDARD ? (
            <div className="my-2">
              <p className="roboto-condensed text-xs text-[#696969]">Shards</p>
              <div className="flex flex-row items-center bg-[#3C3C3C]">
                <img src={diamond} alt="Shards" className="bg-[#006FD7]" />
                <span className="roboto-condensed my-[0.15rem] flex-1 text-center text-base">
                  {boosterPack?.loyaltyPoint
                    ? boosterPack?.loyaltyPoint * buyDetails.numberOfPack
                    : boosterPack?.loyaltyPoint}
                </span>
              </div>
              {/* Error insufficient  */}
              {balanceMessage && (
                <div className="flex justify-end">
                  <span className="roboto-condensed text-right text-sm font-medium text-[#D73A08]">
                    Insufficient Shards
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="my-2">
              <p className="roboto-condensed text-xs text-[#696969]">US$</p>
              <div className="flex flex-row items-center bg-[#3C3C3C]">
                <span className="roboto-condensed my-[0.15rem] flex-1 text-center text-base">
                  {boosterPack?.price ? boosterPack?.price * buyDetails.numberOfPack : boosterPack?.price}
                </span>
              </div>
              {/* Error insufficient  */}
              {balanceMessage && (
                <div className="flex justify-end">
                  <span className="roboto-condensed text-right text-sm font-medium text-[#D73A08]">
                    Insufficient Money
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {boosterPack?.type === PackType.STANDARD ? (
          <button
            onClick={handleOpenClick} className="metal flexcenter mt-4 w-full max-w-[calc(90%-0rem)]"
            disabled={isButtonDisabled}
          >
            <div
              className={`${
              balanceMessage ? 'grey-blue' : isButtonDisabled ? 'disabled-button' : 'blue-gradient'
            } flexcenter roboto-condensed w-full py-[0.3rem] text-[16px]`}
            >
              {isButtonDisabled ? 'Processing Purchase...' : 'Use Shards'}
            </div>
          </button>
        ) : (
          <>
            <button onClick={handleCheckout} className="metal flexcenter mt-4 w-full max-w-[calc(90%-0rem)]">
              <div
                className={`${
                  balanceMessage ? 'grey-blue' : 'blue-gradient'
                } flexcenter roboto-condensed w-full py-[0.3rem] text-[16px]`}
              >
                Checkout
              </div>
            </button>
          </>
        )}
      </div>

      {displayStripeModal && (
        <div className="absolute z-[99] h-full w-full rounded border bg-white px-10 pt-10">
          <StripeModal
            boosterPackId={boosterPack.id}
            userId={userId}
            amount={numberOfPack * boosterPack.price * 100}
            currency={'usd'}
          />
        </div>
      )}

      {/* <div className='w-full absolute top-0 left-0 z-50'>
            {showVideo && (
            <video className={`w-screen h-screen ${showOpenImage ? 'hidden' : ''}`} controls autoPlay>
                <source src={video} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            )}
        </div> */}
    </>
  );
}
