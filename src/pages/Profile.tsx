import { useNavigate, useParams } from 'react-router-dom';
import { ProfileSettingButton, TitleLayout } from '../layout/';
import { ProfileInfo, Inventory, CardSelectionPreview, MatchList, FeaturedCards } from '../components';
import '../css/profile.css';
import { useEffect, useState } from 'react';
import { useBoundStore } from '../store';
import { MatchStatus, MatchTypes, ProfileSetting, RegionFilter } from '../types';
import close from '/assets/images/Layout/close.png';
import { UserCardInterface } from '../interface';
import { useRepositories } from '../repositories';
import { User } from '../store/slices/user.slice';

export function ProfilePage() {
  const { setButtonState } = useBoundStore();
  const { userID } = useParams();
  const navigate = useNavigate();
  const { profile, setProfileState, setLobbyState } = useBoundStore();
  const { showInventory } = profile;
  // const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;

  const { useGetUserById } = useRepositories();

  const otherUser: User = useGetUserById(userID || '').data;

  const [displayTitle, setDisplayTitle] = useState(true);

  const closeInventory = () => setProfileState({ showInventory: false });

  useEffect(() => {
    setButtonState({ profileSetting: ProfileSetting.PROFILE });
    setLobbyState({ matchType: MatchTypes.MY_MATCH, matchStatus: MatchStatus.PAST, regionFilter: RegionFilter.ALL });

    return () => {
      setLobbyState({ matchType: MatchTypes.ALL_MATCH });
    };
  }, []);

  useEffect(() => {}, [userID]);

  const handleSelectCard = (item: UserCardInterface) => {
    setProfileState({ selectCard: item, previewCard: true });
  };

  // const redirectToMatchPage = (match: MatchInterface) => {
  //   navigate(`/game/${data.username}-matches/${match.id}`);
  // };

  return (
    <div className="">
      {showInventory ? (
        <div className="eion-bg roboto-condensed">
          {displayTitle && (
            <div className="flexcenter relative gap-x-4 bg-opacity-80 px-5 py-5 text-[20px]">
              <button onClick={closeInventory} className="absolute -left-2 scale-[1.1]">
                <img src={close} alt="" />
              </button>
              <b className="roboto-condensed">Favourite Card</b>
            </div>
          )}
          <Inventory setDisplayTitle={setDisplayTitle} handleSelectCard={handleSelectCard} />
        </div>
      ) : (
        <div className="authentication-bg h-auto w-screen overflow-y-auto">
          <TitleLayout
            title={!userID ? 'Profile' : otherUser?.username}
            hasClose={true}
            callback={() => navigate(-1)}
          />
          <div className="mx-4">
            {!userID && <ProfileSettingButton />}
            <div className="mx-3">
              <ProfileInfo />
              <div className="mt-10">
                <MatchList />
              </div>
              <FeaturedCards />
            </div>
          </div>
        </div>
      )}
      <CardSelectionPreview />
    </div>
  );
}
