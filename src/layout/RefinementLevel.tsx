export function RefinementLevel({
  level,
  className,
  isTrial,
}: {
  level: number | undefined;
  className: string;
  isTrial: boolean;
}) {
  const hideLvl0 = !isTrial && level === 0;

  return (
    <>
      <div
        className={`${
          hideLvl0 ? 'hidden' : ''
        } aero border-1 angular absolute ${className} border-[#585858] text-[10px]`}
      >
        <div className={`${isTrial ? 'bg-red-500' : 'bg-blue-500'} px-1`}>
          {isTrial && (
            <div className="flex gap-x-[0.35rem]">
              <p>1</p>
              <p>USE</p>
            </div>
          )}
          {!isTrial && <p>+ {level && level}</p>}
        </div>
      </div>
    </>
  );
}
