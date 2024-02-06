import { useEffect, useState } from 'react';
import { ProfileIcon } from '..';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import { useBoundStore } from '../../store';
import EION from '/assets/images/eion-logo.png';
import { TitleLayout } from '../../layout';
import { profanityList } from '../../data';

export function SetUsername() {
  const { useUpdateUsername } = useRepositories();
  const { setModalState, setAlertState } = useBoundStore();
  const [username, setUsername] = useState('');
  const [profanityExist, setProfanityExist] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState<null | string>(null);

  useEffect(() => {
    setAlertState({ message: null, type: null });
  }, []);

  const disableSpace = (e: any) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleUsername = (e: any) => {
    let profanityFound = false;
    profanityList.forEach(word => {
      if (e.target.value.toLowerCase().includes(word)) {
        profanityFound = true;
      }
    });
    setProfanityExist(profanityFound);
    setUsername(e.target.value);
  };

  const { mutateAsync: updateUsername } = useUpdateUsername();
  const data = useGetQueryData([RQ_KEY.USER_DATA]) as AuthResponse;

  const onUpdateUsername = async (e: any) => {
    e.preventDefault();
    const isValidUsername = username !== '';
    if (!isValidUsername) return false; // handle error

    try {
      const response = await updateUsername({ username, id: data.user.id });
      if (response.status === 200) setModalState({ setUsername: { isOpen: false, isSkipped: false } });
    } catch (e: any) {
      setUsernameMessage(e.error.username);
      console.error(e);
    }
  };

  // const onSkipUsername = async (e: any) => {
  //   e.preventDefault();
  //   setModalState({ setUsername: { isOpen: false, isSkipped: true } });
  // };

  // useEffect(() => {
  //   if(usernameMessage){
  //     setTimeout(() => {},)
  //   }
  // }, [username]);

  return (
    <div className="authentication-bg max-h-[100vh] overflow-hidden bg-[#111111]">
      <section className="">
        <TitleLayout title="SET USERNAME" hasClose={false} />
        {/* <div className="flexcenter relative gap-x-4 bg-title px-5 py-5 text-[20px]">
          <b className="text-base tracking-widest deadjim">SET USERNAME</b>
        </div> */}
        <div className="">
          <main className="flexcenter mx-8">
            <div className="relative h-screen w-full">
              <div className="flexcenter mt-4">
                <img className="" width={'200px'} src={EION} alt="" />
              </div>
              <p className="flexcenter deadjim mt-4 text-center text-[20px] tracking-widest lg:text-[24px] ">
                Step into the Fantasy Realm of Esports
              </p>

              <div className="flexcenter roboto-condensed mt-20 text-[20px]">
                <p>Choose your username</p>
              </div>

              <form action="#" className="mt-8 grid grid-cols-6 gap-2">
                <div className="relative col-span-6">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">
                    {<ProfileIcon />}
                  </div>
                  <input
                    value={username}
                    onKeyDown={disableSpace}
                    onChange={handleUsername}
                    placeholder="Username"
                    type="text"
                    id="Email"
                    name="username"
                    className="mt-1 h-[46px] w-full rounded-md border bg-gray-800 px-12 text-sm text-gray-200 shadow-sm focus:outline-none"
                  />
                  {profanityExist && <p className="mt-3 text-[10px] text-red-600">Profanity Detected!</p>}
                  <>
                    {usernameMessage && (
                      <div className="m-1 text-[11px] font-extrabold text-red-700">{usernameMessage}</div>
                    )}
                  </>
                </div>

                <button
                  disabled={profanityExist}
                  onClick={onUpdateUsername}
                  className="roboto-condensed signup-btn col-span-6 mt-4 w-full py-3 text-sm font-medium text-white transition hover:bg-transparent  focus:outline-none focus:ring  dark:hover:text-white"
                >
                  Confirm
                </button>
              </form>

              {/* <div className="absolute bottom-40 w-full">
                <button
                  onClick={onSkipUsername}
                  className="flexcenter w-full rounded-sm border bg-gradient-to-r from-gray-700 via-gray-800 to-black py-3 text-[16px]"
                >
                  <p>Skip</p>
                </button>
                <div className="flexcenter col-span-6 mt-2 sm:flex sm:items-center sm:gap-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">You’ll be able to set your username later</p>
                </div>
              </div> */}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
