import { useBoundStore } from '../../store';

export function InvokeMessage() {
  const { invoke } = useBoundStore();
  const { lockInvoke, unlockMessage, message } = invoke;

  return (
    <>
      {message && (
        <div
          className={`appear roboto-condensed absolute left-1/2 top-[45%] w-[320px]  -translate-x-1/2 -translate-y-1/2 transform rounded-lg border border-[#0185FF] bg-[#242424] py-6 text-center text-[16px]`}
        >
          <p>{message}</p>
        </div>
      )}
      {unlockMessage && !lockInvoke && (
        <div className="appear roboto-condensed absolute left-1/2 top-[45%] w-[320px]  -translate-x-1/2 -translate-y-1/2 transform rounded-lg border border-[#FF3D00] bg-[#242424] p-6 text-justify text-[16px]">
          <p>Your draft has been successfully unlocked. You can now change your draft for the next Invoke.</p>
        </div>
      )}
    </>
  );
}
