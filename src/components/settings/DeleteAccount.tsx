// import { useRepositories } from '../../repositories';
import { useBoundStore } from '../../store';

export function DeleteAccount() {
  const { setModalState } = useBoundStore();

  return (
    <div className="my-14">
      <p className="text-[22px]">Delete Account</p>
      <p className="mt-2 text-[14px]">
        Permanently destroy your Eion account and history of account data. This action cannot be undone.
      </p>
      <button
        onClick={() => setModalState({ deleteAccount: { isOpen: true } })}
        className="my-10 w-full rounded-md bg-red-600 py-3"
      >
        Delete Account
      </button>
    </div>
  );
}
