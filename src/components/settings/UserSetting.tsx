import { useState } from 'react';
import { useBoundStore } from '../../store';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import loading from '/assets/images/Layout/loading.png';
import { profanityList } from '../../data';

export function UserSetting() {
  const { useUpdateUsername } = useRepositories();
  const [newUsername, setNewUsername] = useState('');
  const [isChangeUsernameMode, setIsChangeUsernameMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isErrorMonth, setIsErrorMonth] = useState(false);
  const [profanityExist, setProfanityExist] = useState(false);
  const { setModalState } = useBoundStore();

  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { username, email, auth } = data.user;

  const onInputChange = (e: any) => {
    let profanityFound = false;
    profanityList.forEach(word => {
      if (e.target.value.toLowerCase().includes(word)) {
        profanityFound = true;
      }
    });
    setProfanityExist(profanityFound);
    setNewUsername(e.target.value);
  };

  const disableSpace = (e: any) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const { mutateAsync: updateUsername } = useUpdateUsername();

  const onUpdateUsername = async (e: any) => {
    e.preventDefault();
    const isValidUsername = newUsername !== '';
    if (!isValidUsername) return false; // handle error

    setIsLoading(true); // Show loading indicator inside the button

    try {
      await updateUsername({ username: newUsername, id: data.user.id });
      setIsSuccessVisible(true); // Show success message on successful username update
    } catch (e) {
      const err = e as AuthResponse;
      setIsErrorVisible(true);
      setErrMsg('Error: Username is already taken. Please choose a different username.');
      console.error(err);
    } finally {
      setIsLoading(false); // Hide loading indicator after update attempt, regardless of success or failure
    }
  };

  const closeSuccessMessage = () => {
    setIsSuccessVisible(false);
    setIsChangeUsernameMode(false);
  };

  const closeErrorMessage = () => {
    setIsErrorVisible(false);
  };

  const closeErrorMonthMessage = () => {
    setIsErrorMonth(false);
  };

  return (
    <div>
      <>
        <p className="text-[22px]">Username</p>
        {!isChangeUsernameMode ? (
          <>
            <p className="mt-4 h-[46px] w-full rounded-md border bg-gray-800 px-4 py-3 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600">
              {username}
            </p>
            <button
              onClick={() => setIsChangeUsernameMode(true)} // Enable "change username" mode bg-[#737475]
              className="mt-4 w-full rounded-md  bg-blue-600 py-3 hover:bg-opacity-80"
            >
              Change Username
            </button>
          </>
        ) : (
          <>
            <input
              value={newUsername}
              onChange={onInputChange}
              onKeyDown={disableSpace}
              placeholder={username}
              type="text"
              id="Username"
              name="username"
              className="mt-4 h-[46px] w-full rounded-md border bg-gray-800 px-4 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600"
            />
            {profanityExist && <p className="mt-3 text-[10px] text-red-600">Profanity Detected!</p>}
            <button
              disabled={profanityExist}
              onClick={onUpdateUsername}
              className="relative mt-4 w-full rounded-md bg-red-600 py-3"
              style={{ height: '46px' }}
            >
              {isLoading ? (
                <div className="loader absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                  <img src={loading} alt="" />
                </div>
              ) : (
                'Submit'
              )}
            </button>
            {isSuccessVisible && (
              <div className="modal">
                <div className="modal-content">
                  <p className="">Success: Your username has been changed.</p>
                  <button onClick={closeSuccessMessage}>Close</button>
                </div>
              </div>
            )}
            {isErrorVisible && (
              <div className="modal mx-4">
                <div className="modal-content">
                  {/* <p>Error: Username is already taken. Please choose a different username.</p> */}
                  <p>{errMsg}</p>
                  <button onClick={closeErrorMessage}>Close</button>
                </div>
              </div>
            )}
            {isErrorMonth && (
              <div className="modal">
                <div className="modal-content">
                  <p>Error: Username can only be changed once during a one month period</p>
                  <button onClick={closeErrorMonthMessage}>Close</button>
                </div>
              </div>
            )}
          </>
        )}
      </>
      {email && (
        <>
          <div className="mt-8">
            <p className="text-[22px]">Email</p>
            <p className="mt-1">{email ?? auth['google']?.email}</p>
          </div>

          <div className="mt-8">
            <p className="text-[22px]">Password</p>
            <p className="mt-1">{`************`}</p>
          </div>
          <button
            onClick={() => setModalState({ changePassword: { isOpen: true } })}
            className="mt-6 w-full rounded-md bg-blue-600 py-3"
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
}
