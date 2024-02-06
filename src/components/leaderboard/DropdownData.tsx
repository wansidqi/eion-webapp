import { LeaderboardBody } from '../../interface';
import { useBoundStore } from '../../store';

interface Props {
  items: LeaderboardBody[];
  displayDropdown: boolean;
  propertyDisplay: string;
  propertySelect: string;
  selectDropdown: LeaderboardBody | null;
}

export const DropdownData = ({ items, displayDropdown, propertyDisplay, propertySelect, selectDropdown }: Props) => {
  const { setLeaderboardSlice, leaderboard } = useBoundStore();
  const { info } = leaderboard;
  const currentDate = new Date();

  const handleInfoClick = () => {
    setLeaderboardSlice({ info: !info });
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="roboto-condensed relative z-10 flex-row justify-between rounded-md bg-black  text-[14px]">
        <button
          onClick={() => setLeaderboardSlice({ [propertyDisplay]: !displayDropdown })}
          className="h-11 flex items-center justify-between rounded-md border border-[#0185FF] "
        >
          <p className={`my-3 ml-2`}>{selectDropdown?.title ?? items[0].title}</p>
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
            <div className="roboto absolute z-10 mt-2 flex max-h-52  w-full flex-col overflow-y-auto overflow-x-hidden rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] pt-2 text-[14px]">
              {items.map((item: LeaderboardBody, i: number) => (
                <button
                  onClick={() => {
                    setLeaderboardSlice({ [propertyDisplay]: false, [propertySelect]: item });
                  }}
                  className={`my-1 ml-2 py-2 pl-2 text-left ${
                    item.title === (selectDropdown?.title ?? items[0].title)
                      ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0'
                      : ''
                  }`}
                  key={i}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-3 flex flex-row space-x-2">
          <p className="m-0 text-sm font-semibold ">{selectDropdown?.date ?? items[0].date}</p>
          <div
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-[#A6A6A6] text-sm text-white"
            onClick={handleInfoClick}
            // onMouseOver={() => setLeaderboardSlice({ info: true })}
            onMouseLeave={() => setLeaderboardSlice({ info: false })}
          >
            !
          </div>
        </div>
        <div className="mx-3">
          <p className="mt-0.5 text-sm font-semibold text-[#0185FF]">
            {selectDropdown
              ? selectDropdown.endDate
                ? currentDate <= new Date(selectDropdown.endDate)
                  ? 'Ongoing'
                  : 'Ended'
                : items[0]?.endDate
                ? currentDate <= new Date(items[0].endDate)
                  ? 'Ongoing'
                  : 'Ended'
                : null
              : items[0]?.endDate
              ? currentDate <= new Date(items[0].endDate)
                ? 'Ongoing'
                : 'Ended'
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};
