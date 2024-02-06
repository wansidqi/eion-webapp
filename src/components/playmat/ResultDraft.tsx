import { useGetQueryData, AuthResponse, RQ_KEY, useRepositories } from '../../repositories';
import { useParams } from 'react-router-dom';
import DraftPointLayout from './DraftPointLayout';

export function ResultDraft() {
  const { gameID } = useParams();

  const { useGetDraft } = useRepositories();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;
  const { data: draft } = useGetDraft(user.id, gameID || '');

  //TODO: change url for production
  const link = {
    live: `${import.meta.env.VITE_EION_PLAY}/img/${draft?.draft?.id}`,
    dev: `${import.meta.env.VITE_EION_DEV_PLAY}/img/${draft?.draft?.id}`,
    local: `${`http://localhost:5173`}/img/${draft?.draft?.id}`,
  };

  const url = link.live;

  const handleShare = async () => {
    try {
      await navigator.share({
        text: Boolean(draft?.draft?.score)
          ? `Check out my latest score for ${draft?.draft?.teamWin?.shortName} vs ${draft?.draft?.teamLose?.shortName} on Eion. Predict and compete on the latest matches on Eion!`
          : `I just submitted my draft ${draft?.draft?.teamWin?.shortName} vs ${draft?.draft?.teamLose?.shortName} on Eion. Predict and compete on the latest matches on Eion!`,
        url,
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <>
      <DraftPointLayout draft={draft} button={true} buttonFx={handleShare} />
    </>
  );
}
