import { useEffect, useRef } from 'react';
import error from '/assets/images/Playmat/error.svg';
import { useBoundStore } from '../../store';

export function ErrorModal({ name, item }: any) {
  // const { errorModal, cardTypes } = useLockerContext();
  const { playmat, setPlaymatState } = useBoundStore();
  const { errorModal, cardTypes } = playmat;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ errorModal: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [errorModal, errorModal]);

  return (
    <div>
      {errorModal && (
        <>
          <div
            ref={modalRef}
            className="roboto fixed inset-0 z-10 flex items-center justify-center bg-[#000000] bg-opacity-70"
          >
            <div className="mx-10 w-screen">
              <div className="flexcenter mb-5">
                <img src={error} alt="" className="flexcenter scale-[2]" />
              </div>
              <b className="ml-3 text-[20px]">{cardTypes}</b>
              {/* {props.children} */}
              <div className="mt-4 flex items-center border bg-black text-[12px]">
                <div className="w-2/5 p-3">
                  <b className="">{name}</b>
                </div>
                <div className="flex w-3/5 flex-col border-l p-3">
                  {item.map((cond: any) => (
                    <p className="mb-2">{cond}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
