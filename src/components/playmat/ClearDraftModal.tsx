import { useRef } from 'react';
import { useBoundStore } from '../../store';
import { useClearDraftHandler } from '../../handlers';

export function ClearDraftModal() {
  const { cancelClearDraft, handleClearDraft } = useClearDraftHandler();

  const modalRef = useRef<HTMLDivElement>(null);
  const { playmat } = useBoundStore();
  const { clearDraftModal } = playmat;

  return (
    <div>
      {clearDraftModal && (
        <>
          <div ref={modalRef} className="roboto-condensed flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-50">
            <div className="mx-6 border border-[#0185FF] bg-[#242424] px-6 py-6 text-[16px]">
              <p>
                Are you sure you want to clear your current draft? This action cannot be undone, and all your selections
                will be reset
              </p>
              <div className="mt-6 flex gap-4">
                <button onClick={cancelClearDraft} className="w-full rounded-sm border py-2">
                  Cancel
                </button>
                <button onClick={handleClearDraft} className="blue-radial w-full rounded-sm py-2">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
