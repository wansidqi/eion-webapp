import { useEffect, useRef, useState } from 'react';
import { useBoundStore } from '../../store';
import { RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { AuthResponse } from '../../repositories/authentication.repository';
import { useNavigate } from 'react-router-dom';

export function DeleteAccountModal(): JSX.Element {
  const { useDeleteUser } = useRepositories();
  const { modal, setModalState } = useBoundStore();

  const { deleteAccount } = modal;
  const modalRef = useRef<HTMLDivElement>(null);

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteAccount.isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [deleteAccount]);

  const { mutateAsync: deleteUser } = useDeleteUser();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);

  const onClickDelete = async () => {
    try {
      await deleteUser({ id: data.user.id });
      setIsConfirmationVisible(false);
      setIsSuccessVisible(true);
    } catch (e) {
      // Handle error here if needed
    }
  };

  const onClickConfirm = () => {
    setIsConfirmationVisible(true);
  };

  const onClickClose = () => {
    setIsConfirmationVisible(false);
  };

  const onClickSuccessClose = () => {
    setIsSuccessVisible(false);
    setModalState({ deleteAccount: { isOpen: false } });
    navigate('/register');
  };

  return (
    <div>
      {deleteAccount.isOpen && (
        <>
          {isConfirmationVisible ? (
            <div ref={modalRef} className="flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
              <div className="relative w-full bg-opacity-90 text-[16px]">
                <div className="mx-5 flex flex-col rounded-md border border-red-700 bg-[#242424] px-5">
                  <b className="deadjim mt-6 text-[20px]">DELETE ACCOUNT</b>
                  <p className="my-6 font-bold">Please confirm your password to proceed </p>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="mb-4 rounded-md border px-3 py-2"
                  />
                  <div className="my-7 flex gap-6">
                    <button onClick={onClickClose} className="w-full border py-2">
                      Close
                    </button>
                    <button onClick={onClickDelete} className="w-full bg-red-600 py-2">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div ref={modalRef} className="flexcenter fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
              <div className="relative w-full bg-opacity-90 text-[16px]">
                <div className="mx-5 flex flex-col rounded-md border border-red-700 bg-[#242424] px-5">
                  <b className="deadjim mt-6 text-[20px]">DELETE ACCOUNT</b>
                  <p className="my-6 font-bold">Are you sure you want to delete your account?</p>
                  <p className="text-justify">
                    Deleting your account will result in permanent data loss. Please note that all your game progress,
                    achievements, items, and purchases will be irreversibly erased.
                  </p>
                  <p className="mt-3 text-justify">
                    To prevent data loss, we strongly recommend reviewing your decision before proceeding with the
                    account deletion.
                  </p>
                  <div className="my-7 flex gap-6">
                    <button
                      onClick={() => setModalState({ deleteAccount: { isOpen: false } })}
                      className="w-full border py-2"
                    >
                      Close
                    </button>
                    <button onClick={onClickConfirm} className="w-full bg-red-600 py-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isSuccessVisible && (
            <div className="modal">
              <div className="modal-content">
                <b className="deadjim mt-6 text-[20px]">DELETE ACCOUNT</b>
                <p className="">Success: Your account has been deleted.</p>
                <button onClick={onClickSuccessClose}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
