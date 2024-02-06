import React, { useRef, useState } from 'react';

import '../../css/scroll.css';
import { BoosterPackCard } from '../../interface';

export function CardPools({ boosterPackCards }: { boosterPackCards: BoosterPackCard[] | undefined }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [clickedImage, setClickedImage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [_, setModalIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    const imageURL = boosterPackCards?.[index].card.details?.image;
    setClickedImage(imageURL ?? '');
    setModalIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClickedImage(null);
    setModalIndex(0);
  };

  return (
    <div className="bg-[#242424] flexcenter-col">
      <div className="linear-bg2 w-full relative flex items-center justify-between px-3 py-2 pl-1">
        <p className="px-4">Card Pool</p>
      </div>
      <div className="roboto my-auto grid max-h-[500px] grid-cols-4 flex-row gap-3 overflow-y-scroll p-4 text-[14px]">
        {boosterPackCards?.map((bpCard, index) => (
          <React.Fragment key={index}>
            <img src={bpCard?.card.details?.image} alt="" className="flexcenter" onClick={() => handleClick(index)} />
          </React.Fragment>
        ))}
      </div>

      {showModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] bg-opacity-90"
          onClick={handleCloseModal}
        >
          <div className="flex min-h-screen items-center justify-center">
            <img src={clickedImage ?? ''} alt="" className="min-h-[500px]" />
          </div>
        </div>
      )}
    </div>
  );
}
