import { useBoundStore } from '../../store';
import forgeIcon from '/assets/images/Forge/forge-icon.png';

export default function HomeForge() {
  const { setForgeState, setinventoryState } = useBoundStore();

  const handleOpen = () => {
    setForgeState({ selectCardModal: true });
    setinventoryState({ isRefinement: true });
  };

  return (
    <div className="flexcenter-col">
      <div className="mt-5">
        <b className="deadjim text-[30px]">REFINE YOUR CARDS</b>
      </div>
      <div className="my-8">
        <p className="roboto-condensed text-[16px]">Choose a Card to Refine</p>
      </div>
      <button onClick={handleOpen} className="">
        <img src={forgeIcon} alt="" />
      </button>
    </div>
  );
}
