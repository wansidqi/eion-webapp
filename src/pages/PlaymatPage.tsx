import '../css/playmat.css';
import {
  UseSameDraft,
  GameInfo,
  LeaderSupport,
  LockDraft,
  GameName,
  PlayerSkills,
  PreviewDraft,
  ScoreModal,
  VoteTeam,
  ClearDraftModal,
  ConfigModal,
} from '../components';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingComponent } from '../layout';

export function PlaymatPage() {
  const { gameID } = useParams();
  const { useGetDraft } = useRepositories();

  const userid = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { isLoading, isFetching: fetchingDraft } = useGetDraft(userid, gameID as string);

  useEffect(() => {}, [fetchingDraft]);

  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <div className="playmat-bg max-h-screen w-screen overflow-hidden">
        <div className="locker-bg max-w-screen">
          <GameName />
          <GameInfo />
          <div className="flexcenter mb-5 mt-3 text-[12px]" />
          <div className="mx-4">
            <LeaderSupport />
            <PlayerSkills />
            <LockDraft />
          </div>

          <VoteTeam />
          <UseSameDraft />
          <ConfigModal />
          <PreviewDraft />
          <ScoreModal />
          <ClearDraftModal />
        </div>
      </div>
    </>
  );
}
