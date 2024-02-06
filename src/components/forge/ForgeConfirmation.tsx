import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';

export function ForgeConfirmation(): JSX.Element {
  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { forge, setForgeState } = useBoundStore();
  const { useRefineCard } = useRepositories();
  const { mutateAsync: refineCard } = useRefineCard();
  const { forgeConfirmation, cardToConsumeIds, selectCard } = forge;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forgeConfirmation) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [forgeConfirmation]);

  const handleConfirm = async () => {
    if (!selectCard) return;

    try {
      await refineCard({ cardId: selectCard.card.id, cardToConsumeIds, targetCardId: selectCard.id, userId });
      setForgeState({ loading: true, forgeConfirmation: false });
      setTimeout(() => {
        setForgeState({ loading: false, forging: true, isForgeCompleted: true });
      }, 3000);
    } catch (error) {}
  };

  return (
    <div>
      {forgeConfirmation && (
        <>
          <div ref={modalRef} className="flexcenter roboto-condensed fixed inset-0 z-50 bg-[#000000] bg-opacity-70">
            <div className="relative w-full bg-opacity-90 text-[16px]">
              <div className="mx-5 flex flex-col rounded-md border border-[#0185FF] bg-[#242424] px-5">
                <b className="mt-6 text-[20px]">Card Refinement Confirmation:</b>
                <p className="text-justify">
                  1. No refunds for wrong card choices. Make sure to carefully consider your decision before proceeding.
                </p>
                <p className="mt-3 text-justify">
                  2.Refining your cards will consume the selected cards. Ensure sufficient cards for gameplay after
                  refinement.
                </p>
                <div className="my-7 flex gap-6">
                  <button onClick={() => setForgeState({ forgeConfirmation: false })} className="w-full border py-2">
                    Close
                  </button>
                  <button onClick={handleConfirm} className="w-full bg-[#0185FF] py-2">
                    Confirm
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
