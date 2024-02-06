import { Login, ForgetPassword } from '../components';
import { useBoundStore } from '../store';
import close from '/assets/images/Layout/close.svg';

export function LoginPage() {
  const { modal, setModalState } = useBoundStore();
  const { forgetPassword } = modal;

  return (
    <div className="authentication-bg">
      <div className="flexcenter bg-[#010E1A] bg-opacity-80 relative gap-x-4 px-5 py-5 text-[20px]">
        <b className="deadjim text-base tracking-widest">SIGN IN</b>
        {forgetPassword.isOpen && (
          <button
            onClick={() => setModalState({ forgetPassword: { isOpen: false } })}
            className="absolute left-0 scale-[0.8]"
          >
            <img src={close} alt="" />
          </button>
        )}
      </div>
      {forgetPassword.isOpen ? (
        <>
          <ForgetPassword />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
