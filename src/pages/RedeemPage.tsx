import { useState } from 'react';
import { Navigation } from '../layout';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';

// import diamond from '/assets/images/Store/diamond.png';

export function RedeemCode() {
  const [code, setCode] = useState('');
//   const [shard, setShard] = useState('');
//   const [codeID, setCodeID] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { useUseRedeemCode, useCheckRedeemCodeAvailability } = useRepositories();

  const { mutateAsync: useRedeemCode } = useUseRedeemCode();
  const { mutateAsync: checkRedeemCodeAvailability } = useCheckRedeemCodeAvailability();

  const handleCodeChange = (event:any) => {
    setCode(event.target.value);
  };

//   const handleConfirmClick = () => {
//     setIsRedeeming(true);
//     setTimeout(() => {
//         setShowSuccessMessage(true);
//         setIsRedeeming(false);
//     }, 3000);
//   };

    const handleConfirmClick = async () => {
        setIsRedeeming(true);

        try {
            let isAvailable = await checkRedeemCodeAvailability({ userId, code });
            if (isAvailable?.success) {
                await useRedeemCode({ userId, code: code as string });
                setShowSuccessMessage(true);
            } else {
                setShowErrorMessage(true);
            }
        } catch (e) {
        setShowErrorMessage(true);
        }
        setIsRedeeming(false);
    };

    return (
      <>
        <Navigation/>
        <div className="home-bg flex justify-center items-center h-screen ">
            <div className="w-full bg-[#242424] bg-opacity-60 mx-4 ">
                <div className="flex flex-col w-full">
                    <div className="bg-[#000000] border-2 border-[#5097D9] w-full">
                        <p className="deadjim text-left text-[16px] px-2 py-2">REDEEM CODE</p>
                    </div>
                    <form className="my-5 flex flex-col items-center justify-center  mx-2">
                        <p className="roboto-condensed text-base">Claim your reward here</p>
                        <input
                            name="code"
                            value={code}
                            onChange={handleCodeChange}
                            className="roboto-condensed border-2 border-[#0185FF] my-2 bg-[#1E1E1E] text-base w-full text-left text-white px-2 py-2"
                        />
                        {isRedeeming ? (
                            <div className="metal flexcenter mt-4 w-full">
                                <p className="flexcenter roboto-condensed w-full py-[0.3rem] text-[16px] grey-blue uppercase">Redeeming. . .</p>
                            </div>
                        ) : (
                            <div className="metal flexcenter mt-4 w-full" >
                                <button
                                    onClick={handleConfirmClick}
                                    disabled={!code}
                                    className="flexcenter roboto-condensed w-full py-[0.3rem] text-[16px] blue-gradient"
                                >
                                    CONFIRM
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {showSuccessMessage && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#242424] p-8 rounded-md flex flex-col items-start gap-4 relative roboto-condensed border-2 border-white mx-4 text-left">
                    <p className="text-white font-bold">Reward Redemption Success</p>
                    <p className="text-white">
                        Your code has been accepted. Use Shards to buy Standard Packs and unlock more cards!
                    </p>
                    {/* <div className="w-full flex flex-row justify-between">
                        <p className="text-white font-bold">Shards redeemed:</p>
                        <div className="flex flex-row">
                        <span className="text-white font-bold">{shard}</span>
                        <img src={diamond} alt="Shards" className="ml-2" />
                        </div>
                    </div> */}
                    <button
                        onClick={() => setShowSuccessMessage(false)}
                        className="flexcenter w-full rounded-sm border bg-transparent py-3 text-[16px] my-4"
                    >
                        <p>CLOSE</p>
                    </button>
                    </div>
                </div>
            )}
            {showErrorMessage && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
                    <div className="bg-[#242424] p-8 rounded-md flex flex-col items-start gap-4 relative roboto-condensed border-2 border-white mx-4 text-left">
                        <p className="text-white font-bold ">Reward Redemption Error</p>
                        <p className="text-white">
                            Oh no! It seems there was a hiccup while trying to redeem your code. Please double-check the code you entered and ensure it's correct. If you're still encountering issues, feel free to reach out to our support team for assistance.
                        </p>
                        <button
                            onClick={() => setShowErrorMessage(false)}
                            className="flexcenter w-full rounded-sm border bg-transparent py-3 text-[16px] my-4"
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
