import { useGetQueryData, RQ_KEY, useRepositories } from '../repositories';
import { AuthResponse } from '../repositories/authentication.repository';
import { useBoundStore } from '../store';
import { SetUsername } from '../components';
import EION from '/assets/images/eion-logo.png';

export function SuccessRegister() {
  const { modal } = useBoundStore();
  const { usePostLogout } = useRepositories();
  const { mutateAsync: logout, isSuccess } = usePostLogout();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);

  const redirectToEion = () => {
    window.location.href = import.meta.env.VITE_EION_WEB;
  };

  const onClickLogout = async () => {
    await logout();
    if (isSuccess)
      setTimeout(() => {
        redirectToEion();
      }, 1000);
  };

  return (
    <div className="authentication-bg flexcenter">
      {modal.setUsername.isOpen && <SetUsername />}
      {!modal.setUsername.isOpen && (
        <div className="flexcenter ">
          <div className="roboto-condensed flexcenter-col mx-10 h-[80vh] text-justify text-[16px] lg:w-1/2 ">
            <div className="flexcenter-col bg-congrats rounded-md border border-[#0185FF] px-4 py-6 lg:px-20">
              <img className="" width={'400px'} src={EION} alt="" />
              <b>
                Congratulations, <span className="text-[#0185FF]">@{data.user.username}</span>
              </b>
              <p className="my-5">
                You have successfully pre-registered for our upcoming launch. Get ready to embark on an exciting journey
                filled with thrilling gameplay, exclusive rewards, and unforgettable experiences.
              </p>
              <button onClick={onClickLogout} className="signup-btn w-full py-1">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
