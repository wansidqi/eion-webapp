import { useEffect, useRef } from 'react';
import point from '/assets/images/Playmat/point.svg';
import { useBoundStore } from '../../store';

export function ScoreModal() {
  const { playmat, setPlaymatState } = useBoundStore();
  const { scoreModal } = playmat;
  const modalRef = useRef<HTMLDivElement>(null);

  const score = {
    totalScore: 475,
    leaderScore: 99,
    playerScore: 75,
    skillScore: 75,
    comboScore: 75,
    supportScore: 75,
  };

  const scoresTitle = [
    {
      title: 'LEADER',
      score: score?.leaderScore ?? 0,
    },
    {
      title: 'PLAYER',
      score: score?.playerScore ?? 0,
    },
    {
      title: 'SKILL',
      score: score?.skillScore ?? 0,
    },
    {
      title: 'SUPPORT',
      score: score?.supportScore ?? 0,
    },
    {
      title: 'COMBO',
      score: score?.comboScore ?? 0,
    },
  ];

  useEffect(() => {
    if (scoreModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setPlaymatState({ scoreModal: false });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [scoreModal]);

  useEffect(() => {}, [score]);

  return (
    <div>
      {scoreModal && (
        <>
          <div ref={modalRef} className="flexcenter fixed inset-0 z-10 bg-[#000000] bg-opacity-70">
            <div className="border-2 border-[#164F84] bg-black">
              <div className="relative text-[14px]">
                <img src={point} alt="" className="" />
                <div className="text-secondary absolute bottom-1 right-5 flex justify-between">
                  <b className="text-primary text-[16px]">{score?.totalScore ?? 0}</b>
                </div>
              </div>
              <div className="mx-5 flex flex-col gap-y-3 p-[0.7rem]">
                {scoresTitle.map(title => (
                  <>
                    <div className="flex justify-between">
                      <p>{title.title}</p>
                      <p>{title.score}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
