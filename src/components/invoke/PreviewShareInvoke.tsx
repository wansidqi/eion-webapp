import { useEffect } from 'react';
import { ShareInvokeLayout } from '..';
import { AuthResponse, RQ_KEY, useGetQueryData } from '../../repositories';
import { useBoundStore } from '../../store';

export function PreviewShareInvoke() {
  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { meta, setMetaState } = useBoundStore();
  const {} = meta;

  const url = {
    live: `${import.meta.env.VITE_EION_PLAY}/share/invoke/${userId}`,
    dev: `${import.meta.env.VITE_EION_DEV_PLAY}/share/invoke/${userId}`,
    local: `${`http://localhost:5173`}/share/invoke/${userId}`,
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        text: 'share invoke',
        // Boolean(draft?.draft?.score)
        //   ? `Check out my latest score for ${draft?.draft?.teamWin?.shortName} vs ${draft?.draft?.teamLose?.shortName} on Eion. Predict and compete on the latest matches on Eion!`
        //   : `I just submitted my draft ${draft?.draft?.teamWin?.shortName} vs ${draft?.draft?.teamLose?.shortName} on Eion. Predict and compete on the latest matches on Eion!`,
        url: url.live,
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    setMetaState({ link: url.dev });
  }, []);

  return (
    <div>
      <ShareInvokeLayout button={true} buttonFx={handleShare} url={url.dev} />
    </div>
  );
}
