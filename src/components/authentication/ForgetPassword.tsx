import { useState } from 'react';
import { useBoundStore } from '../../store';
import { useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';

export function ForgetPassword() {
  const { usePostForgotPassword } = useRepositories();

  const { setModalState, setAlertState } = useBoundStore();

  const [email, setEmail] = useState('');
  const handleEmail = (e: any) => setEmail(e.target.value);

  const { mutateAsync: forgotPassword } = usePostForgotPassword();

  const handleSubmit = async () => {
    try {
      const res = await forgotPassword({ email });
      setAlertState({ message: res.message, type: 'success' });
      setModalState({ forgetPassword: { isOpen: false } });
    } catch (e) {
      const err = e as AuthResponse;
      setAlertState({ message: err.error['email'], type: 'error' });
    }
  };

  return (
    <div className="text-center">
      <div className="mx-10">
        <p className="deadjim mt-40 text-[20px]">Forgotten Password</p>
        <p className="my-5 text-[14px]">Enter the email address associated with your Locker account</p>
        <input
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          type="email"
          id="Email"
          name="email"
          className={`mt-10 h-[46px] w-full rounded-md border bg-gray-800 px-5 text-sm text-gray-200 shadow-sm focus:border-transparent focus:outline-none focus:outline-blue-600`}
        />
        <button onClick={handleSubmit} className="mt-4 w-full rounded-md bg-blue-600 py-3 text-[16px]">
          Submit
        </button>
      </div>
    </div>
  );
}
