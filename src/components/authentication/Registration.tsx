import { useState } from 'react';
import { EmailIcon, EyeVisibilityIcon, KeyIcon } from '..';
import { Link, useParams } from 'react-router-dom';
import { useRepositories } from '../../repositories';
import EION from '/assets/images/eion-logo.png';

import { useBoundStore } from '../../store';
import { AuthResponse } from '../../repositories/authentication.repository';
import { TitleLayout } from '../../layout';
// import { TitleLayout } from '../../layout';

export function Registration() {
  const { referralID, affiliateID } = useParams();
  const { usePostSignup, useCheckEmailExists } = useRepositories();
  const { setAlertState } = useBoundStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowReassword] = useState(false);

  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);

  const [credential, setCredential] = useState({
    email: '',
    password: '',
    repassword: '',
    ...(referralID && { referrerId: referralID }),
    ...(affiliateID && { affiliateCode: affiliateID }),
  });

  const [isEmailUsed, SetIsEmailUsed] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    repassword: '',
  });

  const isPasswordLengthCorrect = () => {
    if (credential.password.length < 8) {
      setIsPasswordShort(true);
      return false;
    } else {
      setIsPasswordShort(false);
      return true;
    }
  };

  const isPasswordMatching = () => {
    if (credential.password === credential.repassword) {
      setIsPasswordNotMatch(false);
      return true;
    } else {
      setIsPasswordNotMatch(true);
      return false;
    }
  };

  const isGmailWithPassword = () => {
    return /^[\w.+\-]+@gmail\.com$/.test(credential.email);
  };

  const onInputChange = (event: any) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync: signup } = usePostSignup();
  const { mutateAsync: checkEmailExists } = useCheckEmailExists();

  const onBlurEmail = async () => {
    if (isGmailWithPassword()) {
      setErrorMessage(prev => ({ ...prev, email: 'Please use Google Sign in for Gmail account' }));
      SetIsEmailUsed(true);
      return;
    }

    try {
      const res = await checkEmailExists(credential.email);
      setErrorMessage(prev => ({ ...prev, email: res.message }));
      SetIsEmailUsed(false);
    } catch (e: unknown) {
      const err = e as AuthResponse;
      setErrorMessage(prev => ({ ...prev, email: err.error['email'] }));
      SetIsEmailUsed(true);
    }
  };

  const onClickSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!isPasswordLengthCorrect()) return;
    if (!isPasswordMatching()) return;
    if (isGmailWithPassword()) return;

    try {
      const { repassword, ...creds } = credential;
      const res = await signup(creds);
      setAlertState({ message: res.message, type: 'success' });
    } catch (e) {
      const err = e as AuthResponse;
      if (typeof err.error === 'string') setAlertState({ message: err.error, type: 'error' });
    }
  };

  const onClickGoogleLogin = () => {
    if (referralID) {
      window.open(`${import.meta.env.VITE_LOCKER_ROOM_BACKEND_URL}/auth/google?rid=${referralID}`, '_self');
    } else if (affiliateID) {
      window.open(`${import.meta.env.VITE_LOCKER_ROOM_BACKEND_URL}/auth/google?aco=${affiliateID}`, '_self');
    } else {
      window.open(`${import.meta.env.VITE_LOCKER_ROOM_BACKEND_URL}/auth/google`, '_self');
    }
  };

  const enterToRegister = (e: any) => {
    if (e.key === 'Enter') {
      onClickSignup(e);
      e.preventDefault();
    }
  };

  const inputStyle =
    'px-12 h-[46px] mt-1 w-full rounded-md border text-sm text-gray-200 shadow-sm bg-gray-800 focus:outline-none focus:border-transparent focus:outline-blue-600';

  return (
    <div className="sm:h-auto 2xl:h-full 2xl:overflow-auto">
      <section className="">
        <TitleLayout hasClose={false} title="REGISTER" />
        {/* <div className="flexcenter bg-title relative gap-x-4 px-5 py-5 text-[20px]">
          <b className="deadjim text-base tracking-widest">REGISTER</b>
        </div> */}
        <div className="relative">
          <main className="flex items-center justify-center px-8 py-0 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-6">
            <div className="flexcenter-col max-w-xl lg:max-w-3xl">
              <img className="mt-4" width={'200px'} src={EION} alt="" />
              <p className="flexcenter deadjim mt-4 text-center text-[20px] tracking-widest lg:text-[24px] ">
                Step into the Fantasy Realm of Esports
              </p>

              <div className="flexcenter roboto-condensed mt-10 text-[20px] lg:mt-5">
                <p>Create your account</p>
              </div>

              <form action="#" className="mt-8 grid w-full grid-cols-12 gap-2 lg:w-[500px]">
                <div className="relative col-span-12">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">
                    {<EmailIcon />}
                  </div>
                  <input
                    onKeyDown={enterToRegister}
                    value={credential.email}
                    onChange={onInputChange}
                    onBlur={onBlurEmail}
                    placeholder="Email"
                    type="email"
                    id="Email"
                    name="email"
                    className={inputStyle}
                  />
                  {errorMessage.email && (
                    <>
                      {isEmailUsed ? (
                        <div className="m-1 text-[10px] text-red-700">{errorMessage.email}</div>
                      ) : (
                        <div className="m-1 text-[10px] text-green-500">{errorMessage.email}</div>
                      )}
                    </>
                  )}
                </div>

                <div className="relative col-span-12">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">{<KeyIcon />}</div>
                  <input
                    onKeyDown={enterToRegister}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onInputChange}
                    onFocus={() => setIsPasswordShort(false)}
                    placeholder="Password"
                    id="Password"
                    name="password"
                    className={`mt-1 h-[46px] w-full rounded-md border bg-gray-800 px-12 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600 ${
                      isPasswordShort ? 'border-2 border-red-600' : ''
                    }`}
                    value={credential.password}
                  />
                  <button
                    onClick={e => {
                      setShowPassword(!showPassword);
                      e.preventDefault();
                    }}
                    className="flexcenter absolute right-5 top-4"
                  >
                    {<EyeVisibilityIcon />}
                  </button>
                  {isPasswordShort && (
                    <>
                      <div className="m-1 text-[10px] text-red-700">Use 8 characters or more for your password</div>
                    </>
                  )}
                </div>

                <div className="relative col-span-12">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">{<KeyIcon />}</div>
                  <input
                    onKeyDown={enterToRegister}
                    type={showRepassword ? 'text' : 'password'}
                    onChange={onInputChange}
                    onFocus={() => setIsPasswordNotMatch(false)}
                    value={credential.repassword}
                    placeholder="Confirm Password"
                    id="PasswordConfirmation"
                    name="repassword"
                    className={`mt-1 h-[46px] w-full rounded-md border bg-gray-800 px-12 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600 ${
                      isPasswordNotMatch ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  <button
                    onClick={e => {
                      setShowReassword(!showRepassword);
                      e.preventDefault();
                    }}
                    className="flexcenter absolute right-5 top-4"
                  >
                    {<EyeVisibilityIcon />}
                  </button>
                  {isPasswordNotMatch && <div className="m-1 text-[10px] text-red-700">Password does not match</div>}
                </div>

                <button
                  // disabled={true}
                  onClick={e => onClickSignup(e)}
                  className="signup-btn col-span-12 mt-6 inline-block w-full shrink-0 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring dark:hover:text-white"
                >
                  Sign Up
                </button>
              </form>
              <div className="roboto-condensed condensed flexcenter my-6 gap-4 text-[14px]">
                <div className="left" />
                Or continue with
                <div className="right" />
              </div>
              {/* //TODO: enable the button for production */}
              <button
                disabled={false}
                onClick={onClickGoogleLogin}
                className="flexcenter google-btn mb-6 w-full border py-3"
              >
                <img src={'/assets/images/Authentication/google-btn.svg'} alt="" />
              </button>
              <div className="col-span-6 w-full gap-1 2xl:my-4">
                <p className="roboto-condensed px-2 text-left text-[14px] text-white sm:px-0">
                  By signing up, you agree to{' '}
                  <Link to={'https://eion.gg/terms'} className={'font-extrabold text-white underline'}>
                    {'Term of Services'}
                  </Link>{' '}
                  and{' '}
                  <Link to={'https://eion.gg/policy'} className={'font-extrabold text-white underline'}>
                    {'Privacy Policy'}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </main>
          <div className="my-10">
            <p className="roboto-condensed mt-4 text-center text-sm text-white dark:text-gray-400 sm:mt-0">
              Have an account?{' '}
              <Link to={'/sign-in'} className="roboto-condensed text-gray-200 hover:underline hover:underline-offset-2">
                {'SIGN IN'}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
