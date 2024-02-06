import { useBoundStore } from '../../store';

interface Props {
  items: string[];
  displayDropdown: boolean;
  propertyDisplay: string;
  propertySelect: string;
  selectDropdown: string | null | undefined;
}

export const DropdownComponent = ({
  items,
  displayDropdown,
  selectDropdown,
  propertyDisplay,
  propertySelect,
}: Props) => {
  const { setLeaderboardSlice } = useBoundStore();

  return (
    <div className="flex flex-row items-center">
      <div className="roboto-condensed relative z-10 flex-row rounded-md bg-black  text-[14px]">
        <button
          onClick={() => setLeaderboardSlice({ [propertyDisplay]: !displayDropdown })}
          className=" flex items-center justify-between rounded-md border border-[#0185FF] "
        >
          <p className={`my-3 ml-2`}>{selectDropdown ?? items[0]}</p>
          <div className="m-2 p-2">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00001 10L0.928345 2.93L3.28668 0.573334L8.00001 5.28667L12.7133 0.573334L15.0717 2.93L8.00001 10.0017V10Z"
                fill="white"
              />
            </svg>
          </div>
        </button>
        <div>
          {displayDropdown && (
            <div className="roboto absolute z-10  mt-2 flex w-full flex-col rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] py-2 text-[14px]">
              {items.map((item: any, i: number) => (
                <button
                  onClick={() => {
                    setLeaderboardSlice({ [propertyDisplay]: false, [propertySelect]: item });
                  }}
                  className={`my-1 ml-2 py-2 pl-2 text-left ${
                    item === (selectDropdown ?? items[0])
                      ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0'
                      : ''
                  }`}
                  key={i}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
