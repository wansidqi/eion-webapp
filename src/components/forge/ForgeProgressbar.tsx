import { useBoundStore } from '../../store';

type Props = {
  currentLevel: number;
  totalExp: number;
  currentExp: number;
};

export const ForgeProgressbar = ({ currentExp, totalExp, currentLevel }: Props) => {
  const { forge } = useBoundStore();
  const { forging } = forge;

  let levelUp = 0;

  let progress = (currentExp / totalExp) * 100;

  const handleLevelUps = () => {
    totalExp *= 2;
    levelUp += 1;

    if (currentExp > totalExp) {
      handleLevelUps();
    }
  };

  const handleLevelUp = () => {
    progress = 0;
    totalExp *= 2;
    levelUp += 1;

    if (currentExp > totalExp) {
      handleLevelUps();
    }
  };

  if (currentExp > totalExp) {
    handleLevelUp();
  }

  return (
    <div className={` -mt-10 w-full ${forging ? 'animate-fadeOut' : ''}`}>
      <div className="roboto-condensed mt-4 flex justify-between text-[16px]">
        <p>
          {currentLevel} <span className="text-[#168FFF]">{`> ${currentLevel + 1}`}</span>{' '}
        </p>
        <p>
          <span className="text-[#168FFF]">{currentExp}</span> /{totalExp}
        </p>
      </div>
      <div className="bar relative flex h-[32px] w-[242px] rounded-md border border-[#158AF6]">
        <p className="roboto-condensed absolute left-3 top-1 text-[16px]">EXP</p>
        <>
          <div className="current-exp " style={{ width: `${progress}%` }} />
        </>
      </div>
    </div>
  );
};
