import { useRef } from 'react';
import { useBoundStore } from '../../store';

import rsg from '/assets/images/Logo Team/rsgph.png';
import { TitleLayout } from '../../layout';
export function GameOverview(): JSX.Element {
  const { modal, setModalState } = useBoundStore();
  const { gameOverview } = modal;
  const modalRef = useRef<HTMLDivElement>(null);

  const counts = [1, 2, 3];

  const hanldeClose = () => {
    setModalState({ gameOverview: { isOpen: false } });
  };

  const sword = (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.49999 13.42L3.57999 14.5L1.27999 16.78C0.999992 17.07 0.499992 17.07 0.219992 16.78C-0.060008 16.49 -0.070008 16 0.219992 15.72L2.49999 13.42ZM16.29 1.42V0L9.99999 6.29L3.70999 0V1.42L9.28999 7L5.49999 10.81C4.31999 9.97 2.67999 10.07 1.62999 11.12L5.87999 15.37C6.92999 14.32 7.02999 12.68 6.19999 11.5L16.29 1.42ZM19.78 15.72L17.5 13.42L16.42 14.5L18.72 16.78C19 17.07 19.5 17.07 19.78 16.78C20.06 16.49 20.07 16 19.78 15.72ZM14.5 10.81L11.42 7.71L10.71 8.42L13.81 11.5C12.97 12.68 13.07 14.32 14.12 15.37L18.37 11.12C17.32 10.07 15.68 9.97 14.5 10.81Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div>
      {gameOverview.isOpen && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-100">
            <TitleLayout callback={hanldeClose} hasClose={true} title="GAME OVERVIEW" />
            <div className="mx-3">
              <div className="my-5 flex w-full items-center gap-3 bg-gradient-to-r from-[#5097D9]/60 to-[#000000]/0 py-3">
                <div className="pl-4">{sword}</div>
                <p className="text-[16px]">
                  You have drafted <span className="text-[#E45A2F]">3</span> games
                </p>
              </div>
              <>
                <div className="mx-6 my-4 flex justify-between text-[14px]">
                  <p>Match</p>
                  <p>Team</p>
                  <p>Point</p>
                </div>
                {counts.map(i => (
                  <button key={i} className="card mt-2 flex w-full justify-between px-5 py-4 text-[14px]">
                    <p>Game 1</p>
                    <div className="flexcenter gap-2">
                      <img src={rsg} className="h-[24px] w-[24px]" alt="" />
                      <p>RSG MY</p>
                    </div>
                    <p>500 FP</p>
                  </button>
                ))}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
