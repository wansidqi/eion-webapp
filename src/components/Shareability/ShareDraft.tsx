import { useRepositories } from '../../repositories';
// import card from '/assets/images/Playmat/card-example.png';
import { useParams } from 'react-router-dom';
import { DraftInterface } from '../../interface';
import { LoadingComponent } from '../../layout';
import DraftPointLayout from '../playmat/DraftPointLayout';

export function ShareDraft() {
  const { draftID } = useParams();

  const { useGetDraftById } = useRepositories();
  const { data: draftData, isLoading: draftLoading } = useGetDraftById(draftID || '');
  const draft: DraftInterface = draftData;

  if (draftLoading) return <LoadingComponent />;

  return (
    <div className="">
      <DraftPointLayout draft={draft} />
    </div>
  );
}
