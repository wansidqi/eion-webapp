import { RQ_KEY, useGetQueryData } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import { useBoundStore } from '../../store';
import google from '/assets/images/Authentication/google-btn.svg';

export function GoogleAccountSetting() {
  const { setModalState } = useBoundStore();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { email, auth } = data?.user;
  return (
    <div className="mt-12">
      <p className="text-[22px]">Connected Account</p>

      <div className="my-2 flex items-center gap-3">
        <img src={google} alt="" />
        <p>{auth['google']?.email ?? 'Not linked'}</p>

        {email && auth['google']?.email && (
          <>
            <button
              onClick={() => setModalState({ unlinkGoogle: { isOpen: true } })}
              className="ml-auto rounded-sm bg-red-600 px-4 py-1 text-[12px]"
            >
              Unlink
            </button>
          </>
        )}
      </div>
    </div>
  );
}
