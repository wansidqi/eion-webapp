import { useState } from 'react';
import { InvokeField, InvokeKeys } from '../../interface';
import { useBoundStore } from '../../store';
import { useRepositories } from '../../repositories';
import { useQueriesHandler } from '..';

export function useLockStateHandler() {
  const { userQry, invokeQry } = useQueriesHandler();
  const { invoke, setInvokeState } = useBoundStore();
  const { usePostInvoke, useUpdateInvoke } = useRepositories();
  const [clickConfirm, setClickConfirm] = useState(false);

  const { mutateAsync: postInvoke } = usePostInvoke();
  const { mutateAsync: updateInvoke } = useUpdateInvoke();
  const { lockInvoke, invokeDraft } = invoke;

  const submitInvokeDraft = async (data: InvokeField) => {
    if (!Boolean(invokeQry?.draft)) {
      console.log('post draft');
      await postInvoke(data);
    } else {
      console.log('update draft');
      await updateInvoke(data);
    }
  };

  const handleLockInvoke = async () => {
    let draft = { userId: userQry.id } as InvokeField;
    for (const [key, value] of Object.entries(invokeDraft.draft)) {
      if (InvokeKeys.includes(`${key}UserCardId`)) {
        draft[`${key}UserCardId` as keyof InvokeField] = value?.id ?? null;
      }
    }

    setClickConfirm(true);

    try {
      await submitInvokeDraft(draft);
      setInvokeState({
        invokeWarningModal: false,
        lockInvoke: true,
        message: 'Your Dream Team is locked and ready!',
      });
      setClickConfirm(false);
    } catch (error) {
      setInvokeState({ invokeWarningModal: false, message: 'There is error to lock Invoke' });
      setClickConfirm(false);
      console.log(error);
    }
  };

  const handleUnlockInvoke = () => {
    setClickConfirm(true);
    setTimeout(() => {
      setInvokeState({
        invokeWarningModal: false,
        lockInvoke: false,
        unlockMessage: true,
        invokeDraft: { draft: { ...invokeDraft.draft } },
      });
      setClickConfirm(false);
    }, 2000);
  };

  const toggleLockInvoke = () => {
    lockInvoke ? handleUnlockInvoke() : handleLockInvoke();
  };

  return { clickConfirm, toggleLockInvoke, handleUnlockInvoke };
}
