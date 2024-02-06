import { useRef, useEffect } from 'react';
import { useBoundStore } from '../../store';
import { RefinementLevel } from '../../layout';
// import { RefinementLevel } from '../../layout';
// import { ImgIcon } from '..';

export function VaultCardPreview(): JSX.Element {
  const { vault, setVaultState } = useBoundStore();
  const { previewCard, selectCard } = vault;
  const modalRef = useRef<HTMLDivElement>(null);

  // const counts = [1, 2, 3];

  useEffect(() => {
    if (previewCard) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setVaultState({ previewCard: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [previewCard]);

  return (
    <div>
      {previewCard && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="w-full bg-opacity-90 text-[16px]">
              <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">
                <div className="relative">
                  <RefinementLevel
                    className="left-10 top-6 scale-[2]"
                    isTrial={Boolean(selectCard?.singleUseOnly)}
                    level={selectCard?.refinementLevel}
                  />
                  <div className="flexcenter blueborder h-auto w-[380px]">
                    <img
                      src={(selectCard?.card?.details?.image && selectCard?.card?.details.image) ?? ''}
                      className=""
                      alt=""
                    />
                  </div>
                </div>
                {/* <div className="flexcenter-col my-5">
                  <b className="roboto-condensed my-3 text-[14px] font-extrabold">SKINS ARE AVAILABLE</b>
                  <div className="flex gap-4">
                    {counts.map(count => (
                      <button key={count} className="flexcenter gradient-border my-2 h-[56px] w-[56px]">
                        <ImgIcon />
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
