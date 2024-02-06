import { useEffect, useState } from 'react';
import google from '/assets/images/Authentication/google-btn.svg';
import { Link } from 'react-router-dom';
import { useRepositories } from '../../repositories';
import { EmailIcon, KeyIcon, EyeVisibilityIcon } from '..';
import { useBoundStore } from '../../store';
import { AuthResponse } from '../../repositories/authentication.repository';
import EION from '/assets/images/eion-logo.png';

export function Login() {
  const { setModalState, setAlertState } = useBoundStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const [emailMessage] = useState(true);
  const [isEmailValid] = useState(true);

  const inputStyle =
    'px-12 h-[46px] mt-1 w-full rounded-md border text-sm text-gray-200 shadow-sm bg-gray-800 focus:outline-none focus:border-transparent focus:outline-blue-600';

  const { usePostLogin } = useRepositories();
  // const { usePostLogin, usePostGoogleLogin } = useRepositories();
  const [credential, setCredential] = useState({ email: '', password: '' });

  const onInputChange = (event: any) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const isGmailWithPassword = () => {
    return /^[\w.+\-]+@gmail\.com$/.test(credential.email);
  };

  const onBlurChange = () => {
    if (isGmailWithPassword()) setErrMsg('Please use Google Sign in for Gmail account');
  };

  const { mutateAsync: login } = usePostLogin();
  // const { refetch } = usePostGoogleLogin();

  useEffect(() => {
    // refetch();
  }, []);

  const onClickGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_LOCKER_ROOM_BACKEND_URL}/auth/google`, '_self');
  };

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isGmailWithPassword()) return;

    try {
      await login(credential);
    } catch (e) {
      const err = e as AuthResponse;
      if (typeof err.error === 'string') setAlertState({ message: err.error, type: 'error' });
    }
  };

  const enterToSignIn = (e: any) => {
    if (e.key === 'Enter') {
      onClickLogin(e);
      e.preventDefault();
    }
  };

  return (
    <div className="">
      <section className="">
        <div className="relative">
          <main className="flex items-center justify-center px-8 py-0 sm:px-12 lg:col-span-7 lg:px-16 lg:py-0 xl:col-span-12">
            <div className="flexcenter-col max-w-xl lg:max-w-3xl">
              <img className="mt-4" width={'200px'} src={EION} alt="" />
              {/* <p className="threat flexcenter mt-6 text-2xl text-[24px] text-gray-900 dark:text-white lg:text-[40px]">
                LOCKER
              </p> */}
              <p className="flexcenter deadjim mt-4 text-center text-[20px] tracking-widest lg:text-[24px] ">
                Step into the Fantasy Realm of Esports
              </p>

              <div className="flexcenter roboto-condensed mt-12 text-[20px] md:mt-5">
                <p>Sign in to your account</p>
              </div>

              <form action="#" className="mt-8 grid w-full grid-cols-12 gap-2 lg:w-[500px]">
                <div className="relative col-span-12">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">
                    {<EmailIcon />}
                  </div>
                  <input
                    onKeyDown={enterToSignIn}
                    value={credential.email}
                    onBlur={onBlurChange}
                    onChange={onInputChange}
                    placeholder="Email"
                    type="email"
                    id="Email"
                    name="email"
                    className={inputStyle}
                  />
                  {errMsg && <div className="m-1 text-[10px] text-red-700">{errMsg}</div>}
                  {emailMessage && (
                    <>{!isEmailValid ? <div className="m-1 text-[10px] text-red-700">Invalid email</div> : null}</>
                  )}
                </div>

                <div className="relative col-span-12">
                  <div className="flexcenter absolute left-4 top-4 gap-3 text-[14px] text-gray-500">{<KeyIcon />}</div>
                  <input
                    onKeyDown={enterToSignIn}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onInputChange}
                    placeholder="Password"
                    id="Password"
                    name="password"
                    className={inputStyle}
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

                  <div className="text-right">
                    <button
                      onClick={e => {
                        e.preventDefault();
                        setModalState({ forgetPassword: { isOpen: true } });
                      }}
                      className="sansation text-[12px]"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <button
                  onClick={e => onClickLogin(e)}
                  className="signup-btn col-span-12 mt-6 inline-block w-full shrink-0 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Sign In
                </button>
              </form>
              <div className="flexcenter my-6 gap-4 text-[12px]">
                <div className="left" />
                Or continue with
                <div className="right" />
              </div>
              {/* //TODO: enable the button for production */}
              <button disabled={false} onClick={onClickGoogleLogin} className="flexcenter google-btn mb-6 w-full py-3">
                <img src={google} alt="" />
              </button>
            </div>
          </main>
          <div className="flexcenter my-10 w-full sm:flex sm:items-center sm:gap-4 md:bottom-24">
            <p className="roboto-condensed mt-0 text-sm text-white dark:text-gray-400 sm:mt-0">
              Dont have an account?{' '}
              <Link to="/register" className=" roboto-condensed text-white hover:underline hover:underline-offset-2">
                {'REGISTER'}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
