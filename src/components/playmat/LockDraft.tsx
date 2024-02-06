import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBoundStore } from '../../store';
import { useRepositories } from '../../repositories';
import loading from '/assets/images/Layout/loading.png';
import { MatchStatus } from '../../types';
import { BsDiscord } from 'react-icons/bs';
import { useLockDraftHandler, useQueriesHandler } from '../../handlers';

// const red = 'bg-[#AD3843] border'
// const blue = 'dark-blue-gradient border'

export function LockDraft() {
  const { MessageComponent, handleToggleButton } = useLockDraftHandler();
  const { matchQry, draftQry } = useQueriesHandler();
  const { gameID, matchID } = useParams();
  const navigate = useNavigate();
  const { useGetGameByID } = useRepositories();
  const { playmat, setPlaymatState } = useBoundStore(state => state);

  const { lockDraft, showLoading, message } = playmat;

  const { data } = useGetGameByID(gameID || '');
  const games = data && data[0];
  const lockdraftAdmin = Boolean(games?.lockDraft);

  return (
    <>
      <div className="roboto-condensed flex justify-center">
        {message && <MessageComponent />}
        <div className="relative flex-1 gap-y-0">
          <div className="flexcenter mb-16 mt-6 gap-3">
            <button
              disabled={matchQry?.status === MatchStatus.PAST || lockdraftAdmin}
              onClick={() => setPlaymatState({ clearDraftModal: true })}
              className={`${
                matchQry?.status === MatchStatus.PAST
                  ? 'hidden'
                  : 'flexcenter h-[45px] w-full rounded-sm border border-[#C2C2C2] text-[#C2C2C2]'
              } `}
            >
              Clear
            </button>
            <div className="metal h-[45px] w-[65px]">
              <button
                disabled={!Boolean(draftQry)}
                onClick={() => navigate(`/result/${matchID}/${gameID}`)}
                className={
                  matchQry?.status === MatchStatus.PAST
                    ? 'hidden'
                    : 'black-gradient flexcenter flexcenter h-full w-full rounded-sm'
                }
              >
                {shareIcon}
              </button>
            </div>
            <div className="metal h-[45px] w-[65px] ">
              <Link
                to={'https://discord.gg/W2UfXf7NsU'}
                target="_blank"
                className="black-gradient flexcenter flexcenter h-full w-full rounded-sm"
              >
                <BsDiscord className="text-[#C2C2C2]" />
              </Link>
            </div>
          </div>
          <div className="flexcenter my-4 gap-6">
            <div className="metal w-1/3">
              <button onClick={() => navigate(`/match/${matchID}`)} className={`black-gradient w-full rounded-sm py-3`}>
                <b className="text-[16px]">LOBBY</b>
              </button>
            </div>
            <div className="metal w-2/3">
              <button
                onClick={handleToggleButton}
                disabled={lockdraftAdmin}
                className={`${
                  matchQry?.status === MatchStatus.PAST
                    ? 'hidden'
                    : lockdraftAdmin
                    ? 'bg-[#808080]'
                    : lockDraft
                    ? 'border bg-[#AD3843]'
                    : 'blue-radial-btn'
                } relative w-full rounded-sm py-3`}
              >
                <b className="text-[16px]">{lockDraft ? 'UNLOCK' : 'SUBMIT'} DRAFT</b>
                {showLoading && (
                  <div className="loader absolute right-6 top-[0.6rem]">
                    <img src={loading} alt="" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const shareIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 10.25C5.24264 10.25 6.25 9.24264 6.25 8C6.25 6.75736 5.24264 5.75 4 5.75C2.75736 5.75 1.75 6.75736 1.75 8C1.75 9.24264 2.75736 10.25 4 10.25Z"
      stroke="#C2C2C2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
      stroke="#C2C2C2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6.25C13.2426 6.25 14.25 5.24264 14.25 4C14.25 2.75736 13.2426 1.75 12 1.75C10.7574 1.75 9.75 2.75736 9.75 4C9.75 5.24264 10.7574 6.25 12 6.25Z"
      stroke="#C2C2C2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 9L10 11M6 7L10 5" stroke="#C2C2C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
