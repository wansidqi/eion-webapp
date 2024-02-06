import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSetting } from '../../types';
import { useBoundStore } from '../../store';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';

export function Profilebar() {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const { menu, setMenuState, setButtonState } = useBoundStore();
  const { profileMenu } = menu;
  const { usePostLogout } = useRepositories();
  const { mutateAsync: logout, isSuccess } = usePostLogout();

  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;

  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleClick = (event: any) => {
      if (profileRef.current && event.target === profileRef.current) {
        setMenuState({ profileMenu: { isOpen: false } });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [profileMenu]);

  useEffect(() => {
    // console.log(isSuccess)
  }, [isSuccess]);

  const logoutIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_139_32480)">
        <path
          d="M15.3334 2.66663H4.66671C4.31309 2.66663 3.97395 2.8071 3.7239 3.05715C3.47385 3.3072 3.33337 3.64634 3.33337 3.99996V20C3.33337 20.3536 3.47385 20.6927 3.7239 20.9428C3.97395 21.1928 4.31309 21.3333 4.66671 21.3333H15.3334C15.687 21.3333 16.0261 21.1928 16.2762 20.9428C16.5262 20.6927 16.6667 20.3536 16.6667 20V16H10.42C10.2432 16 10.0737 15.9297 9.94864 15.8047C9.82361 15.6797 9.75337 15.5101 9.75337 15.3333C9.75337 15.1565 9.82361 14.9869 9.94864 14.8619C10.0737 14.7369 10.2432 14.6666 10.42 14.6666H16.6667V3.99996C16.6667 3.64634 16.5262 3.3072 16.2762 3.05715C16.0261 2.8071 15.687 2.66663 15.3334 2.66663Z"
          fill="white"
        />
        <path
          d="M18.7733 11.52C18.6458 11.4108 18.4817 11.3538 18.3139 11.3602C18.1461 11.3667 17.987 11.4363 17.8683 11.555C17.7495 11.6737 17.68 11.8329 17.6735 12.0007C17.667 12.1685 17.7241 12.3325 17.8333 12.46L20.0866 14.6667H16.6666V16H20.0866L17.8333 18.3067C17.7635 18.3665 17.7068 18.44 17.6668 18.5227C17.6268 18.6054 17.6043 18.6955 17.6008 18.7873C17.5972 18.8792 17.6127 18.9707 17.6462 19.0563C17.6797 19.1418 17.7306 19.2195 17.7955 19.2845C17.8605 19.3494 17.9382 19.4003 18.0237 19.4338C18.1093 19.4673 18.2008 19.4828 18.2927 19.4792C18.3845 19.4757 18.4746 19.4532 18.5573 19.4132C18.64 19.3732 18.7135 19.3165 18.7733 19.2467L22.6666 15.38L18.7733 11.52Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_139_32480">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const handleProfileClick = (nav: string) => {
    navigate(nav);
    setMenuState({ profileMenu: { isOpen: false } });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
    setMenuState({ profileMenu: { isOpen: false } });
  };

  const shortName = (name: string) => (name?.length > 12 ? name.slice(0, 10) + '...' : name);

  return (
    <>
      {profileMenu.isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-80" />}
      <div
        ref={profileRef}
        className={`roboto fixed inset-0 z-30 h-screen bg-opacity-80  ${
          profileMenu.isOpen
            ? 'translate-x-0 transform transition-transform duration-300 ease-in-out'
            : 'translate-x-full transform transition-transform duration-300 ease-in-out'
        }`}
      >
        {/* <div className={`mr-4 mt-12 flex justify-end`}> */}
        <div className={`float-right mr-4 mt-12`}>
          <div className="border border-[#FFFFFF] bg-gradient-to-b from-[#0D0D0D] via-[#072138] to-[#00498C] text-[16px]">
            <div className="py-4">
              <h1 className="deadjim ml-4 text-[20px]">{shortName(user.username)}</h1>
              <div className="deadjim mt-3 flex flex-col text-[16px]">
                <button
                  value={'profile'}
                  onClick={() => {
                    handleProfileClick('/profile');
                    setButtonState({ profileSetting: ProfileSetting.PROFILE });
                  }}
                  className={`flex py-2 pl-4 ${
                    currentPath === '/profile' ? 'bg-gradient-to-r from-[#00519B] to-transparent' : ''
                  }`}
                >
                  Profile
                </button>
                <button
                  value={'setting'}
                  onClick={() => {
                    handleProfileClick('/setting');
                    setButtonState({ profileSetting: ProfileSetting.SETTING });
                  }}
                  className={`flex py-2 pl-4 ${
                    currentPath === '/setting' ? 'bg-gradient-to-r from-[#00519B] to-transparent' : ''
                  }`}
                >
                  Setting
                </button>
                <div className="mb-2 mt-3 border-t"></div>
                {/* <button onClick={handleLogout} className="flex items-center justify-between gap-20 px-4">
                  <button value={'logout'}>
                    <a href="/sign-in">Logout</a>
                  </button>
                  <div>{logoutIcon}</div>
                </button> */}
                <button onClick={handleLogout} className="flex items-center justify-between gap-20 px-4">
                  <b>Logout</b>
                  <div>{logoutIcon}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
