import { useRef, useState } from 'react';
import { BoosterPackCard } from '../../interface';

export function Highlight({ boosterPackCards }: { boosterPackCards: BoosterPackCard[] | undefined }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [clickedImage, setClickedImage] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [_, setModalIndex] = useState<number>(0);

  const bpCards = boosterPackCards?.sort((a, b) => {
    const rarityOrder = { basic: 0, gold: 1, silver: 2, aa: 3 };
    const rarityA = a?.card?.details?.rarity?.toLowerCase();
    const rarityB = b?.card?.details?.rarity?.toLowerCase();
    //@ts-ignore
    return rarityOrder[rarityA] - rarityOrder[rarityB];
  });

  const counts = [1, 2, 3, 4, 5];

  const handleClick = (index: number) => {
    const imageURL = boosterPackCards?.[index].card?.details?.image;
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
    <>
      {/* <div className="linear-bg relative mt-2 flex items-center justify-between rounded-md px-3 py-2 pl-1">
        <p className="px-4">Highlight</p>
      </div> */}

      <div className="roboto my-auto flex max-h-[500px] w-full flex-row flex-wrap overflow-y-scroll rounded-md bg-[#181818] p-4 text-[14px]">
        <>
          {counts?.map((_, index) => {
            const cardImg = bpCards && bpCards[index]?.card?.details?.image;
            return (
              <div key={index} onClick={() => handleClick(index)} className="w-1/5 p-1">
                <img src={cardImg} alt="" />
              </div>
            );
          })}
        </>
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
    </>
  );
}
