import { useRef } from 'react';
import { useBoundStore } from '../../store';
import { useSaveConfigHandler } from '../../handlers';

export function ConfigModal() {
  const { handleUseConfig } = useSaveConfigHandler();
  const modalRef = useRef<HTMLDivElement>(null);
  const { playmat, setPlaymatState } = useBoundStore();
  const { configDraftModal } = playmat;

  return (
    <div>
      {configDraftModal && (
        <>
          <div ref={modalRef} className="roboto-condensed flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-50">
            <div className="mx-12 border border-[#0185FF] bg-[#242424] p-6 text-[14px]">
              <p>Would you like to use your most recent draft for this match?</p>
              <div className="mt-6 flex gap-12">
                <button
                  onClick={() => setPlaymatState({ configDraftModal: false })}
                  className="w-full rounded-sm border py-3 text-[16px]"
                >
                  No
                </button>
                <button onClick={handleUseConfig} className="blue-radial w-full rounded-sm py-3 text-[16px]">
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
