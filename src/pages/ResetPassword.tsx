import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../store';
import { useRepositories } from '../repositories';
import { AuthResponse } from '../repositories/authentication.repository';
import { TitleLayout } from '../layout';

export function ResetPassword(): JSX.Element {
  const { usePostResetPassword } = useRepositories();
  const { modal, setModalState, setAlertState } = useBoundStore();
  const { changePassword } = modal;

  const modalRef = useRef<HTMLDivElement>(null);

  // const [showPassword, setShowPassword] = useState(false);
  // const [password, setPassword] = useState('');
  // const handlePassword = (e: any) => setPassword(e.target.value);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const handleNewPassword = (e: any) => setNewPassword(e.target.value);

  const [showNewRepassword, setShowNewRepassword] = useState(false);
  const [newRepassword, setNewRepassword] = useState('');
  const handleNewRepassword = (e: any) => setNewRepassword(e.target.value);

  // const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);

  useEffect(() => {
    if (changePassword.isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [changePassword]);

  // const checkPasswordCorrect = () => {
  //   if (password === currentPassword) {
  //     setIsPasswordWrong(false);
  //   } else {
  //     setIsPasswordWrong(true);
  //   }
  // };

  // const checkPasswordLength = () => {
  //   if (newPassword.length < 8) {
  //     setIsPasswordShort(true);
  //   } else {
  //     setIsPasswordShort(false);
  //   }
  // };

  // const checkPasswordMatch = () => {
  //   if (newPassword === newRepassword) {
  //     setIsPasswordNotMatch(false);
  //   } else {
  //     setIsPasswordNotMatch(true);
  //   }
  // };

  const { mutateAsync } = usePostResetPassword();

  const handleClick = async () => {
    try {
      await mutateAsync({ password: newPassword });
    } catch (e) {
      const err = e as AuthResponse;
      setAlertState({ message: err.error['password'], type: 'error' });
    }

    // if (password === currentPassword && newPassword.length < 8 && newPassword === newRepassword) {
    //   /* execute */
    // } else {
    //   checkPasswordLength();
    //   checkPasswordMatch();
    //   checkPasswordCorrect();
    // }
  };

  const showPasswordIcon = (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.73112 1.23144C3.65681 1.14766 3.5666 1.07947 3.46573 1.03082C3.36487 0.982166 3.25535 0.954015 3.14353 0.947999C3.0317 0.941983 2.91979 0.958222 2.81429 0.995774C2.70879 1.03333 2.61179 1.09144 2.52891 1.16676C2.44604 1.24208 2.37893 1.33309 2.33149 1.43453C2.28405 1.53598 2.25722 1.64582 2.25254 1.75771C2.24787 1.8696 2.26544 1.98131 2.30426 2.08635C2.34307 2.19139 2.40235 2.28769 2.47866 2.36966L3.607 3.61437C1.17753 5.23214 0.123227 7.55372 0.0724515 7.66302C0.0246752 7.77134 0 7.88843 0 8.00682C0 8.12521 0.0246752 8.24229 0.0724515 8.35061C0.0985446 8.40844 0.716316 9.77938 2.08162 11.144C3.90672 12.967 6.20785 13.9303 8.74663 13.9303C9.98051 13.9371 11.2033 13.6974 12.3432 13.2251L13.76 14.7836C13.9118 14.9466 14.1216 15.0432 14.3441 15.0525C14.5666 15.0618 14.7838 14.983 14.9486 14.8333C15.1134 14.6835 15.2125 14.4748 15.2245 14.2525C15.2364 14.0301 15.1603 13.812 15.0125 13.6454L3.73112 1.23144ZM8.74663 12.2378C6.65989 12.2378 4.83479 11.4811 3.3228 9.98954C2.72806 9.40065 2.2163 8.73349 1.80165 8.00647C2.1733 7.34991 3.12675 5.89786 4.76356 4.88306L11.1169 11.8725C10.3507 12.1171 9.55093 12.2404 8.74663 12.2378ZM17.4208 8.35061C17.3954 8.40773 16.7861 9.76105 15.4462 11.1122C15.3695 11.1974 15.2762 11.2661 15.1722 11.3142C15.0681 11.3622 14.9553 11.3886 14.8407 11.3918C14.7262 11.3949 14.6121 11.3748 14.5056 11.3325C14.399 11.2903 14.3021 11.2268 14.2208 11.146C14.1395 11.0652 14.0755 10.9687 14.0326 10.8624C13.9897 10.756 13.9689 10.6421 13.9714 10.5275C13.9739 10.4129 13.9996 10.3 14.047 10.1956C14.0945 10.0913 14.1626 9.99765 14.2473 9.92043C14.8102 9.34816 15.2957 8.70472 15.6916 8.00647C15.2772 7.27928 14.7654 6.61209 14.1705 6.02339C12.6578 4.53186 10.8334 3.77516 8.74663 3.77516C8.51038 3.77516 8.27414 3.78503 8.04141 3.80478C7.92927 3.81679 7.81585 3.80627 7.70783 3.77382C7.5998 3.74137 7.49936 3.68766 7.41239 3.61584C7.32542 3.54402 7.25369 3.45554 7.20141 3.35559C7.14913 3.25565 7.11735 3.14627 7.10795 3.03387C7.09855 2.92147 7.11171 2.80833 7.14666 2.70109C7.18161 2.59386 7.23765 2.49469 7.31148 2.40941C7.3853 2.32414 7.47543 2.25449 7.57656 2.20455C7.67769 2.15461 7.78779 2.12538 7.90037 2.1186C8.17752 2.09462 8.46455 2.08263 8.74663 2.08263C11.2854 2.08263 13.5865 3.04667 15.4102 4.86966C16.7748 6.23425 17.3926 7.6059 17.4187 7.66302C17.4668 7.7712 17.4918 7.88821 17.4922 8.0066C17.4926 8.12498 17.4683 8.24215 17.4208 8.35061Z"
        fill="#A4A4A4"
      />
    </svg>
  );

  return (
    <div>
      <>
        <div ref={modalRef} className="fixed inset-0 z-50 bg-[#111827] bg-opacity-100">
          <TitleLayout
            hasClose={true}
            title="Change Your Password"
            callback={() => setModalState({ changePassword: { isOpen: false } })}
          />
          <div className="mx-5">
            <>
              <div className="mt-8">
                <p className="text-[20px]">New Password</p>
                <div className="relative mt-3">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    onChange={handleNewPassword}
                    placeholder="Password"
                    id="Password"
                    name="password"
                    onFocus={() => setIsPasswordShort(false)}
                    className={`${
                      isPasswordShort ? 'border-2 border-red-600' : 'border'
                    } h-[46px] w-full rounded-md bg-gray-800 px-6 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600`}
                    value={newPassword}
                  />
                  {isPasswordShort && (
                    <p className="m-2 text-[10px] text-red-600">Password length must be minimum 8 length</p>
                  )}
                  <button
                    onClick={e => {
                      setShowNewPassword(!showNewPassword);
                      e.preventDefault();
                    }}
                    className="flexcenter absolute right-5 top-4"
                  >
                    {showPasswordIcon}
                  </button>
                </div>
              </div>
            </>
            <>
              <div className="mt-8">
                <p className="text-[20px]">Confirm New Password</p>
                <div className="relative mt-3">
                  <input
                    type={showNewRepassword ? 'text' : 'password'}
                    onChange={handleNewRepassword}
                    placeholder="Password"
                    id="Password"
                    name="password"
                    onFocus={() => setIsPasswordNotMatch(false)}
                    className={`${
                      isPasswordNotMatch ? 'border-2 border-red-600' : 'border'
                    } h-[46px] w-full rounded-md bg-gray-800 px-6 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600`}
                    value={newRepassword}
                  />
                  <>
                    {isPasswordNotMatch && (
                      <>
                        <div className="m-1 text-[10px] text-red-700">Password does not match</div>
                      </>
                    )}
                  </>
                  <button
                    onClick={e => {
                      setShowNewRepassword(!showNewRepassword);
                      e.preventDefault();
                    }}
                    className="flexcenter absolute right-5 top-4"
                  >
                    {showPasswordIcon}
                  </button>
                </div>
              </div>
            </>
            <div className="mt-10">
              <button className="w-full rounded-md bg-blue-600 py-3" onClick={handleClick}>
                Change
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
