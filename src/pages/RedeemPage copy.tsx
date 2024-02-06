import { useState } from 'react';
import diamond from '/assets/images/Store/diamond.png';
import { Navigation } from '../layout';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';

export function RedeemCode() {
  const [code, setCode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { useCheckRedeemCodeAvailability, useUseRedeemCode } = useRepositories();

  const { mutateAsync: useRedeemCode } = useUseRedeemCode();
  const { mutateAsync: checkRedeemCodeAvailability } = useCheckRedeemCodeAvailability();

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  //   const handleConfirmClick = () => {
  //     setIsRedeeming(true);
  //     setTimeout(() => {
  //         setShowSuccessMessage(true);
  //         setIsRedeeming(false);
  //     }, 3000);
  //   };

    async function handleOpenClick(code: string) {
        setIsRedeeming(true);
        try {
            let isAvailable = await checkRedeemCodeAvailability({ userId, code: code as string });
            if (isAvailable?.success) {
                await useRedeemCode({ userId, code: code as string });
                setShowSuccessMessage(true);
                setIsRedeeming(false);
            // alert(JSON.stringify(redeemStatus));
            } else {
                alert(JSON.stringify(isAvailable));
            }
        } catch (e) {
            alert(e);
        }
    }

  return (
    <>
      <Navigation />
      <div className="home-bg flex h-screen items-center justify-center ">
        <div className="mx-4 w-full bg-[#242424] bg-opacity-60 ">
          <div className="flex w-full flex-col">
            <div className="w-full border-2 border-[#5097D9] bg-[#000000]">
              <p className="deadjim px-2 py-2 text-left text-[16px]">REDEEM CODE</p>
            </div>
            <form className="mx-2 my-5 flex flex-col items-center  justify-center">
              <p className="roboto-condensed text-base">Claim your reward here</p>
              <input
                name="code"
                value={code}
                onChange={handleCodeChange}
                className="roboto-condensed my-2 w-full border-2 border-[#0185FF] bg-[#1E1E1E] px-2 py-2 text-left text-base text-white"
              />
              {isRedeeming ? (
                <div className="metal flexcenter mt-4 w-full">
                  <p className="flexcenter roboto-condensed grey-blue w-full py-[0.3rem] text-[16px] uppercase">
                    Redeeming. . .
                  </p>
                </div>
              ) : (
                <div className="metal flexcenter mt-4 w-full" onClick={() => handleOpenClick(code)}>
                  <p className="flexcenter roboto-condensed blue-gradient w-full py-[0.3rem] text-[16px] uppercase">
                    CONFIRM
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        {showSuccessMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="roboto-condensed relative mx-4 flex flex-col items-start gap-4 rounded-md border-2 border-white bg-[#242424] p-8 text-left">
              <p className="font-bold text-white">Reward Redemption Success</p>
              <p className="text-white">
                Your code has been accepted, you have received <span>[amount]</span> Shards. Use Shards to buy Standard
                Packs and unlock more cards!
              </p>
              <div className="flex w-full flex-row justify-between">
                <p className="font-bold text-white">Shards redeemed:</p>
                <div className="flex flex-row">
                  <span className="font-bold text-white">[amount]</span>
                  <img src={diamond} alt="Shards" className="ml-2" />
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="flexcenter my-4 w-full rounded-sm border bg-transparent py-3 text-[16px]"
              >
                <p>CLOSE</p>
              </button>
            </div>
          </div>
        )}
        {showErrorMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="roboto-condensed relative mx-4 flex flex-col items-start gap-4 rounded-md border-2 border-white bg-[#242424] p-8 text-left">
              <p className="font-bold text-white ">Reward Redemption Error</p>
              <p className="text-white">
                Oh no! It seems there was a hiccup while trying to redeem your code. Please double-check the code you
                entered and ensure it's correct. If you're still encountering issues, feel free to reach out to our
                support team for assistance.
              </p>
              <button
                onClick={() => setShowErrorMessage(false)}
                className="flexcenter my-4 w-full rounded-sm border bg-transparent py-3 text-[16px]"
              >
                <p>CLOSE</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
