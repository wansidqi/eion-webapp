import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store';
import loading from '/assets/images/Layout/loading.png';
import { useLockStateHandler, useQueriesHandler } from '../../handlers';

export function InvokeWarningModal() {
  const { invokeStateQry } = useQueriesHandler();
  const { clickConfirm, toggleLockInvoke } = useLockStateHandler();
  const modalRef = useRef<HTMLDivElement>(null);

  const { invoke, setInvokeState } = useBoundStore();
  const { lockInvoke, invokeWarningModal } = invoke;

  const isLock = invokeStateQry && invokeStateQry[0].locked;

  useEffect(() => {
    if (invokeWarningModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [invokeWarningModal]);

  const SubmitMessage = () => (
    <div>
      <p className="">
        Are you sure you want to lock your selection? Your draft will be used for the upcoming matches.
      </p>
      <p className="my-2">You are free to resubmit your draft each day before the first match begins. </p>
      {isLock && (
        <p className="mt-4 text-[#F65353]">
          Note: Invoke is currently LIVE. Your draft will only be used for the next match day.
        </p>
      )}
    </div>
  );

  const ForfeitMessage = () => (
    <div>
      <p className="">
        Are you sure you want to <span className="text-[#FF3D00]">forfeit</span> your draft? You will not receive any
        scores for the <span className="text-[#FF3D00]">current day matches.</span>
      </p>
      <p className="my-4">
        Any changes that you have made today will only be reflected in the
        <span className="text-[#FF3D00]"> subsequent INVOKE day</span>.
      </p>
    </div>
  );

  return (
    <div>
      {invokeWarningModal && (
        <>
          <div ref={modalRef} className="flexcenter roboto-condensed fixed inset-0 z-50 bg-[#000000] bg-opacity-70">
            <div className="relative w-full bg-opacity-90 text-[16px]">
              <div
                className={`mx-5 flex flex-col rounded-md border ${
                  !lockInvoke ? 'border-[#0185FF]' : 'border-red-600'
                } bg-[#242424] px-3 py-10`}
              >
                {lockInvoke ? <ForfeitMessage /> : <SubmitMessage />}

                <div className="mt-4 flex gap-6">
                  <button onClick={() => setInvokeState({ invokeWarningModal: false })} className="w-full border py-2">
                    <p>Close</p>
                  </button>
                  <button
                    onClick={toggleLockInvoke}
                    className={`${!lockInvoke ? 'blue-radial-light' : 'red-radial'} flexcenter relative  w-full py-2`}
                  >
                    {!clickConfirm && <p>Confirm</p>}
                    {clickConfirm && (
                      <div className="loader absolute">
                        <img src={loading} alt="" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
