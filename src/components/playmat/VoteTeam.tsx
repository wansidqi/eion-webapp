import { useBoundStore } from '../../store';
import { useQueriesHandler, useVoteTeamHandler } from '../../handlers';

export function VoteTeam() {
  const { team1, team2, gameName, matchQry } = useQueriesHandler();
  const { handleVoteTeam, selectTeam, setSelectTeam } = useVoteTeamHandler();
  const { playmat } = useBoundStore();
  const { showVote } = playmat;

  return (
    <>
      {showVote && (
        <div className="fixed inset-0 z-50 bg-[#000000] bg-opacity-50">
          <div className="flex min-h-screen flex-col items-center bg-black ">
            <b className="deadjim my-12 text-[24px]">{gameName?.toUpperCase()}</b>
            <div className="roboto-condensed mx-5 text-center">
              <b className="text-[16px]">Who will win?</b>
              <p className="mt-5 text-[14px]">
                Boost your score by accurately choosing the winning team for every game and earn valuable bonus points.
              </p>
            </div>
            <div className="my-14 flex gap-4">
              <button
                onClick={() => setSelectTeam(team1)}
                className={`flexcenter gradient h-[170px] w-[170px] border ${
                  !selectTeam ? 'grey-gradient' : selectTeam === team1 ? 'blue-gradient' : 'grey-gradient'
                }`}
              >
                <img width={'140px'} src={matchQry?.team1?.logo} alt="" />
              </button>
              <button
                onClick={() => setSelectTeam(team2)}
                className={`flexcenter  h-[170px] w-[170px] border ${
                  !selectTeam ? 'grey-gradient' : selectTeam === team2 ? 'blue-gradient' : 'grey-gradient'
                }`}
              >
                <img width={'140px'} src={matchQry?.team2?.logo} alt="" />
              </button>
            </div>
            <button
              onClick={handleVoteTeam}
              disabled={selectTeam === null}
              className={`${selectTeam === null ? 'bg-[#555B60]' : 'blue-radial'}  mt-10 w-[90%] rounded-sm py-3`}
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}
    </>
  );
}
