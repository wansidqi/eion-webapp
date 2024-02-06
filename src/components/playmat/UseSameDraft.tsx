import { useRef } from 'react';
import { useBoundStore } from '../../store';
import { useSameDraftHandler } from '../../handlers';

export function UseSameDraft() {
  const { handleUseSameDraft, handleCancelUseSameDraft } = useSameDraftHandler();

  const modalRef = useRef<HTMLDivElement>(null);
  const { playmat } = useBoundStore();

  const { sameDraftModal } = playmat;

  return (
    <div>
      {sameDraftModal && (
        <>
          <div ref={modalRef} className="roboto-condensed flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-50">
            <div className="mx-12 border border-[#0185FF] bg-[#242424] p-6 text-[14px]">
              <p>Would you like to re-use your previous draft for this game?</p>
              <p className="mt-4">Note: Trial Cards will not appear in your next game.</p>
              <div className="mt-6 flex gap-12">
                <button onClick={handleCancelUseSameDraft} className="w-full rounded-sm border py-3 text-[16px]">
                  No
                </button>
                <button onClick={handleUseSameDraft} className="blue-radial w-full rounded-sm py-3 text-[16px]">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
