import { useNavigate } from 'react-router-dom';
import EION from '/assets/images/eion-logo.png';
import { useEffect } from 'react';

export function SuccessVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, []);

  return (
    <div className="flexcenter test authentication-bg">
      <div className="roboto-condensed flexcenter-col mx-5 text-[16px] lg:w-1/2 ">
        <div className="justify-start-center flex flex-col rounded-md px-4 py-6 lg:px-20">
          <img className="mb-5" width={'400px'} src={EION} alt="" />
          <p className="my-5">
            Congratulations on successfully verifying your email and completing the registration process!
          </p>
          <p>To get started, please sign in to your new account by clicking the link below:</p>
          <a className="my-10 text-[#0185FF]" href="/sign-in">
            Login
          </a>
          <p>
            You will be automatically redirected to the sign-in page within a few seconds. If the redirection doesn't
            happen, simply copy and paste the URL into your web browser's address bar.{' '}
          </p>
          <p className="my-10">Welcome abboard!</p>
        </div>
      </div>
    </div>
  );
}
