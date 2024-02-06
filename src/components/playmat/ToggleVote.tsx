import { useParams } from 'react-router-dom';
import { DraftInterface, MatchInterface, TeamInterface } from '../../interface';
import { useGetQueryData, RQ_KEY } from '../../repositories';
import { useBoundStore } from '../../store';
import { MatchStatus } from '../../types';

export function ToggleVote() {
  const { gameID, matchID } = useParams();
  const { playmat, setPlaymatState } = useBoundStore();

  const match = useGetQueryData<MatchInterface>([RQ_KEY.MATCH, matchID]);
  const draftData = useGetQueryData<DraftInterface>([RQ_KEY.DRAFT, gameID]);

  const { draftUI, lockDraft } = playmat;
  const team1 = match?.team1;
  const team2 = match?.team2;

  const handleSelectTeam = (selectTeam: TeamInterface | null) => {
    setPlaymatState({
      draftUI: {
        draft: {
          ...draftUI?.draft,
          teamWin: selectTeam,
          teamLose: selectTeam === team1 ? team2 : team1,
        },
      },
    });
  };


  const DataSelectTeam = () => (
    <div className="flexcenter my-3 h-[48px] gap-1 rounded-md border-2 border-[#626262] bg-[#242424]">
      <div
        className={`flexcenter mx-1 h-[40px] w-[43px] cursor-pointer ${
          draftData?.draft?.teamWin?.id === team1?.id
            ? 'blue-gradient scale-[1.1] border border-[#FFFFFF]'
            : 'scale-[0.9] opacity-50'
        }`}
      >
        <button disabled={lockDraft} onClick={() => handleSelectTeam(team1)}>
          <img src={match?.team1?.logo} className="p-1" alt="" />
        </button>
      </div>
      <div
        className={`flexcenter mx-1 h-[40px] w-[43px] cursor-pointer ${
          draftData?.draft?.teamWin?.id === team2?.id
            ? 'blue-gradient scale-[1.1] border border-[#FFFFFF]'
            : 'scale-[0.9] opacity-50'
        }`}
      >
        <button disabled={lockDraft} onClick={() => handleSelectTeam(team2)}>
          <img src={match?.team2?.logo} className="p-1" alt="" />
        </button>
      </div>
    </div>
  );

  const selectTeamComponent = () => (
    <div className="flexcenter my-3 h-[48px] gap-1 rounded-md border-2 border-[#626262] bg-[#242424]">
      <div
        className={`flexcenter mx-1 h-[40px] w-[43px] cursor-pointer ${
          draftUI?.draft.teamWin?.id === team1?.id
            ? 'blue-gradient scale-[1.1] border border-[#FFFFFF]'
            : draftUI?.draft.teamWin === null
            ? 'scale-[0.9] opacity-50'
            : ''
        }`}
      >
        <button onClick={() => handleSelectTeam(team1)}>
          <img src={match?.team1?.logo} className="p-1" alt="" />
        </button>
      </div>
      <div
        className={`flexcenter mx-1 h-[40px] w-[43px] cursor-pointer ${
          draftUI?.draft.teamLose?.id === team2?.id
            ? 'scale-[0.9] opacity-50'
            : draftUI?.draft.teamLose === null
            ? 'scale-[0.9] opacity-50'
            : 'blue-gradient scale-[1.1] border border-[#FFFFFF]'
        }`}
      >
        <button onClick={() => handleSelectTeam(team2)}>
          <img src={match?.team2?.logo} className="p-1" alt="" />
        </button>
      </div>
    </div>
  );

  return <div>{lockDraft || match?.status === MatchStatus.PAST ? DataSelectTeam() : selectTeamComponent()}</div>;
}
