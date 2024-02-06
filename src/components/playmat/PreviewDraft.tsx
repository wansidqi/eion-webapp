import { useRef, useEffect } from 'react';
import close from '/assets/images/Playmat/close.svg';
import { useBoundStore } from '../../store';

export function PreviewDraft(): JSX.Element {
  const { playmat, setPlaymatState } = useBoundStore();
  const { viewDraft, draftPreview } = playmat;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setPlaymatState({ draftPreview: false });
  };

  useEffect(() => {
    if (draftPreview) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ draftPreview: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [draftPreview]);

  return (
    <div>
      {draftPreview && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="w-full bg-opacity-90 text-[16px]">
              <div className="flexcenter mb-10 text-[16px]">
                <button onClick={handleCloseModal} className="absolute right-4 top-4">
                  <img src={close} alt="" />
                </button>
              </div>

              <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">
                <div className="flexcenter h-[490px] w-[335px]">
                  <img src={viewDraft?.card?.details?.image ?? ''} className="h-full w-full" alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
