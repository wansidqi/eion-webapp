import { useState } from 'react';
import { PackType, RegionFilter } from '../../types';
import { useBoundStore } from '../../store';
import diamond from '/assets/images/Store/diamond.png';

import NoImg from '/assets/images/Store/no-image.png';
import { useRepositories } from '../../repositories';

export function FilterPack() {
  const { store, setStoreState } = useBoundStore();
  const { packType } = store;
  const { packRegion } = store;
  // const [selectedPackType, setSelectedPackType] = useState<PackType>(PackType.STANDARD);

  const { useGetAllBoosterPack } = useRepositories();
  const { data: boosterPacks } = useGetAllBoosterPack();

  const packTypes = [
    { label: 'standard', type: PackType.STANDARD, price: 1000 },
    { label: 'rate up', type: PackType.RATE_UP, price: 15 },
    { label: 'team', type: PackType.TEAM, price: 15 },
  ];

  //region
  const [displayRegion, setDisplayRegion] = useState(false);

  const regions = [
    { name: 'All Region', value: RegionFilter.ALL },
    { name: 'Malaysia', value: RegionFilter.MY },
    { name: 'Philippines', value: RegionFilter.PH },
    { name: 'Singapore', value: RegionFilter.SG },
    // { name: 'Cambodia', value: RegionFilter.KH },
  ];

  const handleDisplayRegion = (value: RegionFilter) => {
    setDisplayRegion(false);
    setStoreState({ packRegion: value });
  };

  //open modal
  const goPackOverview = (boosterPackId: number) => {
    setStoreState({ packOverview: true, currentPackId: boosterPackId });
  };

  const buttonClass = 'w-full h-[48px] -skew-x-[-20deg]';
  const activeButtonClass = `${buttonClass} active`;
  const inactiveButtonClass = `${buttonClass} inactive`;

  return (
    <>
      <div className="flexcenter roboto-condensed text-[16px]">
        {packTypes.map(item => (
          <button
            key={item.label}
            className={packType === item.type ? activeButtonClass : inactiveButtonClass}
            onClick={() => setStoreState({ packType: item.type })}
          >
            <p className="-skew-x-[20deg]">{item.label.toUpperCase()}</p>
          </button>
        ))}
      </div>

      <div className="">
        {packType === PackType.STANDARD && (
          <div>
            {boosterPacks
              ?.filter(pack => pack.type === PackType.STANDARD)
              .map(pack => {
                const css: React.CSSProperties = {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundImage: `url(${pack?.image})`,
                  backgroundRepeat: 'round',
                  backgroundSize: 'cover',
                  // backgroundSize: 'center',
                  // backgroundRepeat: 'round',
                };
                return (
                  <button
                    style={css}
                    key={pack.id}
                    onClick={() => goPackOverview(pack.id)}
                    className="my-4 w-full bg-[#322F35]"
                  >
                    <div className="flex h-40 flex-col">
                      <div className="w-[30%] border-2 border-[#5097D9] bg-[#000000]">
                        <p className="deadjim px-2 py-2 text-left text-[16px]">{pack.type?.toUpperCase()}</p>
                      </div>
                      <div className="my-5 flex h-16 items-center justify-center">
                        {!pack?.image && <img src={NoImg} className="w-1/6" alt={pack.type?.toUpperCase()} />}
                      </div>
                      <div className="flex justify-end">
                        <p className="roboto-bold flex items-center justify-center border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[16px]">
                          {pack.loyaltyPoint}
                          <img src={diamond} alt="Shards" className="ml-2" />
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}

        {packType === PackType.RATE_UP && (
          <div>
            {boosterPacks
              ?.filter(pack => pack.type === PackType.RATE_UP)
              .map(pack => {
                const css: React.CSSProperties = {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundImage: `url(${pack?.image})`,
                  backgroundRepeat: 'round',
                  backgroundSize: 'cover',
                  // backgroundSize: 'center',
                  // backgroundRepeat: 'round',
                };
                return (
                  <button
                    style={css}
                    key={pack.id}
                    onClick={() => goPackOverview(pack.id)}
                    className="my-4 w-full bg-[#322F35]"
                  >
                    <div className="flex flex-col">
                      <div className="w-[30%] border-2 border-[#5097D9] bg-[#000000]">
                        <p className="deadjim px-2 py-2 text-left text-[16px]">
                          {pack.type?.toUpperCase()?.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="my-5 flex h-16 items-center justify-center">
                        {!pack?.image && <img src={NoImg} className="w-1/6" alt={pack.type?.toUpperCase()} />}
                      </div>
                      <div className="flex justify-end">
                        <p className="roboto-bold border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[16px]">
                          US$ {pack.price}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}

        {/* {packType === PackType.RATE_UP && (
          <div>
            {boosterPacks
              ?.filter(pack => pack.type === PackType.RATE_UP)
              .map(pack => (
                <button key={pack.id} onClick={() => goPackOverview(pack.id)} className="my-4 w-full bg-[#322F35]">
                  <div className="flex flex-col">
                    <div className="w-[30%] border-2 border-[#5097D9] bg-[#000000]">
                      <p className="deadjim px-2 py-2 text-left text-[16px]">
                        {pack.type?.toUpperCase()?.replace('_', ' ')}
                      </p>
                    </div>
                    <div className="my-5 flex h-16 items-center justify-center bg-[#322F35]">
                      {!pack?.image && <img src={NoImg} className="w-1/6" alt={pack.type?.toUpperCase()} />}
                    </div>
                    <div className="flex justify-end">
                      <p className="deadjim border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[16px]">
                        $ {pack.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        )} */}

        {packType === PackType.TEAM && (
          <div className="flex-col">
            <div className="deadjim relative my-4 flex flex-col justify-items-end">
              <button
                onClick={() => setDisplayRegion(!displayRegion)}
                className="relative right-0 flex items-center justify-between rounded-md border border-[#0185FF] py-2 pl-3 text-[14px]"
              >
                <p>{regions.find(region => region.value === packRegion)?.name}</p>
                <div className="absolute right-3">
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.00001 10L0.928345 2.93L3.28668 0.573334L8.00001 5.28667L12.7133 0.573334L15.0717 2.93L8.00001 10.0017V10Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
              <div>
                {displayRegion && (
                  <div className="roboto absolute z-50 mt-2 flex w-full flex-col rounded-md bg-gradient-to-br from-[#0D0D0E] to-[#0A1B41] py-2 text-[14px]">
                    {regions.map((region, i) => (
                      <button
                        onClick={() => handleDisplayRegion(region.value)}
                        className={`py-2 pl-2 text-left ${
                          packRegion === region.value ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0' : ''
                        }`}
                        key={i}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="grid grid-cols-3 gap-2 w-full">
                {packRegion === RegionFilter.ALL
                  ? boosterPacks
                      ?.filter(pack => pack.type === PackType.TEAM)
                      .map(pack => {
                        const css: React.CSSProperties = {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          backgroundImage: `url(${pack?.image})`,
                          backgroundSize: 'center',
                          backgroundRepeat: 'round',
                        };
                        return (
                          <button
                            key={pack.id}
                            style={css}
                            onClick={() => goPackOverview(pack.id)}
                            className="bg-[#322F35]"
                          >
                            <div className="">
                              <div className="border-2 border-[#5097D9] bg-[#000000] px-3 py-1">
                                <p className="deadjim text-center text-[14px]">{pack?.type?.toUpperCase()}</p>
                              </div>
                              <div className="my-5 flex h-16 items-center justify-center">
                                {!pack.image && <img src={NoImg} className="w-3/4" alt={pack.name} />}
                              </div>
                              <div className="flex justify-end">
                                <p className="roboto-bold  border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[14px]">
                                  US$ {pack.price}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })
                  : boosterPacks
                      ?.filter(pack => pack.type === PackType.TEAM && pack.team?.country === packRegion)
                      .map(pack => {
                        const css: React.CSSProperties = {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          backgroundImage: `url(${pack?.image})`,
                          backgroundSize: 'center',
                          backgroundRepeat: 'round',
                        };
                        return (
                          <button
                            key={pack.id}
                            style={css}
                            onClick={() => goPackOverview(pack.id)}
                            className="bg-[#322F35]"
                          >
                            <div className="">
                              <div className="border-2 border-[#5097D9] bg-[#000000] px-3 py-1">
                                {/* <p className="deadjim text-center text-[14px]">{pack?.name?.toUpperCase()}</p> */}
                                <p className="deadjim text-center text-[14px]">{pack?.type?.toUpperCase()}</p>
                              </div>
                              <div className="my-5 flex h-16 items-center justify-center">
                                {!pack.image && <img src={NoImg} className="w-3/4" alt={pack.name} />}
                              </div>
                              <div className="flex justify-end">
                                <p className="roboto-bold border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[14px]">
                                  US$ {pack.price}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
