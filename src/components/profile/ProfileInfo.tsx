import { useEffect, useState } from 'react';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import { useParams } from 'react-router-dom';
import { User } from '../../store/slices/user.slice';
import copyIcon from '/assets/images/copy-icon.png';

export function ProfileInfo() {
  const { useGetInventory, useGetAllDraftsByUserId, useGetOtherInventory, useGetLeaderboard, useGetGlobalRank } =
    useRepositories();

  const { userID } = useParams();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const otherUser = useGetQueryData<User>([RQ_KEY.OTHER_USER]);
  const { user } = data;

  const { data: drafts } = useGetAllDraftsByUserId(userID || user.id);
  const inventory = useGetInventory(user.id).data;
  const totalGamesPlayed = drafts?.length;

  const { data: lbData, mutateAsync: getLeaderboard } = useGetLeaderboard();
  const { data: globalRank, mutateAsync: getGlobalRank } = useGetGlobalRank();
  const [SP, setSP] = useState<any>();

  const getOtherUserInfo = (userID: string) => {
    const inventoryOther = useGetOtherInventory(userID || '').data;
    const totalCards = inventoryOther?.cards?.length;

    return { totalCards };
  };

  useEffect(() => {
    getLeaderboard({ type: 'fp' });
  }, []);

  useEffect(() => {
    if (userID) {
      getGlobalRank(otherUser?.id);
      const getSP = lbData?.find(item => item?.username === otherUser?.username)?.totalFP;
      setSP(getSP);
    } else {
      getGlobalRank(user.id);
      const getSP = lbData?.find(item => item?.username === user.username)?.totalFP;
      setSP(getSP);
    }
  }, [lbData, userID, otherUser]);

  const infos = [
    {
      key: 'Games Played',
      value: totalGamesPlayed,
    },
    {
      key: 'Card Owned',
      value: Boolean(userID) ? getOtherUserInfo(userID || '').totalCards : inventory?.cards?.length,
    },
    {
      key: 'Total SP Earned',
      value: `${SP} SP`,
    },
  ];

  const [showCopiedText, setShowCopiedText] = useState(false);

  const copyToClipboard = () => {
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = Boolean(userID) ? otherUser?.username : user?.username ?? '';

      // Append the textarea element to the document
      document.body.appendChild(textarea);

      // Select the text in the textarea and copy it to the clipboard
      textarea.select();
      document.execCommand('copy');

      // Remove the temporary textarea element from the document
      document.body.removeChild(textarea);

      // Show the "Copied" message for a short period of time
      setShowCopiedText(true);
      setTimeout(() => {
        setShowCopiedText(false);
      }, 1000);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const shortName = (name: string) => (name?.length > 12 ? name.slice(0, 10) + '...' : name);

  useEffect(() => {}, [userID]);

  return (
    <div className="deadjim">
      <div className="my-8 flex justify-between text-[16px]">
        <div className="relative flex items-center gap-2">
          <p>{Boolean(userID) ? shortName(otherUser?.username) : shortName(user?.username) ?? ''}</p>
          <button onClick={copyToClipboard}>
            <img src={copyIcon} alt="" />
          </button>
          {showCopiedText && <p className="fadeaway absolute -top-5 right-0 text-xs">Copied!</p>}
        </div>
        <p>Global Rank: {globalRank?.leaderboard?.rank || 'n/a'}</p>
      </div>

      {infos.map((item, i) => (
        <div key={i} className="game-info my-2 flex justify-between">
          <>
            <p>{item.key}</p>
            <p>{item.value}</p>
          </>
        </div>
      ))}
    </div>
  );
}
