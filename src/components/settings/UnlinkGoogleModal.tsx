import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store';

export function UnlinkGoogleModal(): JSX.Element {
  const { modal, setModalState } = useBoundStore();
  const { unlinkGoogle } = modal;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlinkGoogle.isOpen) {
      console.log('happen');
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [unlinkGoogle]);

  return (
    <div>
      {unlinkGoogle.isOpen && (
        <>
          <div ref={modalRef} className="flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="relative w-full bg-opacity-90 text-[16px]">
              <div className="mx-5 flex flex-col rounded-md border border-red-700 bg-[#242424] px-5">
                <p className="deadjim mt-6 text-[20px]">UNLINK GOOGLE ACCOUNT</p>
                <b className="my-6">Are you sure you want to unlink?</b>
                <p className="text-justify">
                  Unlinking your Google account will result in permanent data loss for your game account. Please note
                  that unless you log in again using the same Google account, all your progress, achievements, items,
                  and purchases will be lost.
                </p>
                <p className="mt-3 text-justify">
                  To avoid losing your data, it is strongly recommended that you log in using the same Google account
                  before proceeding with the unlinking action.
                </p>
                <div className="my-7 flex gap-6">
                  <button
                    onClick={() => setModalState({ unlinkGoogle: { isOpen: false } })}
                    className="w-full border py-2"
                  >
                    Close
                  </button>
                  <button className="w-full bg-red-600 py-2">Unlink</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
