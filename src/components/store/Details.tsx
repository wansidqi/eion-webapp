export function Details({ description }: { description: string | undefined }) {
  return (
    <div className="flexcenter">
      <div className="w-screen bg-[#242424]">
        <div className="linear-bg2 relative flex items-center justify-between rounded-md px-3 py-2 pl-1">
          <p className="px-4">Details</p>
        </div>
        <div className="roboto-condensed my-2 flex w-full flex-row p-4 text-[14px]">{description}</div>
      </div>
    </div>
  );
}
