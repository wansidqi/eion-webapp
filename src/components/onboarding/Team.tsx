import hbmy from '/assets/images/onboard/Homebois MY.png';
import lunatix from '/assets/images/onboard/Lunatix.png';
import rsgmy from '/assets/images/onboard/RSG MY.png';
import thq from '/assets/images/onboard/HAQ - RESIZED.png';
import tdk from '/assets/images/onboard/TODAK.png';
import blck from '/assets/images/onboard/BLCK - RESIZED.png';
import echo from '/assets/images/onboard/Echo.png';
import onic from '/assets/images/onboard/Onic.png';
import rsgph from '/assets/images/onboard/RSG PH.png';
import tnc from '/assets/images/onboard/TNC.png';
import hbsg from '/assets/images/onboard/Homebois SG.png';
import rsgsg from '/assets/images/onboard/RSG SG.png';
import stlk from '/assets/images/onboard/Stellark.png';
import tf from '/assets/images/onboard/Flash.png';
import { useEffect, useState } from 'react';
import { useBoundStore } from '../../store';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { ModalLayout } from '../../layout';
import crystal from '/assets/images/favicon.png';
import { BeforePack } from '..';

const teampack = [
  {
    id: 1,
    country: 'my',
    name: 'Hombois MY',
    shortName: 'hb_my', // based on team data from backend(space replaced with underscore & lowercase)
    image: hbmy,
    price: 'FREE',
  },
  {
    id: 2,
    country: 'my',
    name: 'Lunatix',
    shortName: 'ltx', //  based on team data from backend(space replaced with underscore & lowercase)
    image: lunatix,
    price: 'FREE',
  },
  {
    id: 3,
    country: 'my',
    name: 'RSG MY',
    shortName: 'rsg_my', //  based on team data from backend(space replaced with underscore & lowercase)
    image: rsgmy,
    price: 'FREE',
  },
  {
    id: 4,
    country: 'my',
    name: 'Team HAQ',
    shortName: 'thq', //  based on team data from backend(space replaced with underscore & lowercase)
    image: thq,
    price: 'FREE',
  },
  {
    id: 5,
    country: 'my',
    name: 'Todak',
    shortName: 'tdk', //  based on team data from backend(space replaced with underscore & lowercase)
    image: tdk,
    price: 'FREE',
  },
  {
    id: 6,
    country: 'ph',
    name: 'Blacklist',
    shortName: 'blck', //  based on team data from backend(space replaced with underscore & lowercase)
    image: blck,
    price: 'FREE',
  },
  {
    id: 7,
    country: 'ph',
    name: 'echo',
    shortName: 'echo', //  based on team data from backend(space replaced with underscore & lowercase)
    image: echo,
    price: 'FREE',
  },
  {
    id: 8,
    country: 'ph',
    name: 'Onic',
    shortName: 'onic_ph', //  based on team data from backend(space replaced with underscore & lowercase)
    image: onic,
    price: 'FREE',
  },
  {
    id: 9,
    country: 'ph',
    name: 'RSG PH',
    shortName: 'rsg_ph', //  based on team data from backend(space replaced with underscore & lowercase)
    image: rsgph,
    price: 'FREE',
  },
  {
    id: 10,
    country: 'ph',
    name: 'TNC',
    shortName: 'tnc', //  based on team data from backend(space replaced with underscore & lowercase)
    image: tnc,
    price: 'FREE',
  },
  {
    id: 12,
    country: 'sg',
    name: 'homebois sg',
    shortName: 'hb_sg', //  based on team data from backend(space replaced with underscore & lowercase)
    image: hbsg,
    price: 'FREE',
  },
  {
    id: 13,
    country: 'sg',
    name: 'RSG SG',
    shortName: 'rsg_sg', //  based on team data from backend(space replaced with underscore & lowercase)
    image: rsgsg,
    price: 'FREE',
  },
  {
    id: 14,
    country: 'sg',
    name: 'Stellark',
    shortName: 'stlk', //  based on team data from backend(space replaced with underscore & lowercase)
    image: stlk,
    price: 'FREE',
  },
  {
    id: 15,
    country: 'sg',
    name: 'Team flash',
    shortName: 'flash', //  based on team data from backend(space replaced with underscore & lowercase)
    image: tf,
    price: 'FREE',
  },
];

enum SelectableCountry {
  MY = 'my',
  PH = 'ph',
  SG = 'sg',
}

export function Team() {
  const [selectedCountry, setSelectedCountry] = useState('my');
  const [isLoading, setIsLoading] = useState(false);
  const teampackByCountry = teampack.filter(team => team.country === selectedCountry);
  const [selectedTeam, setSelectedTeam] = useState<
    Record<SelectableCountry, { image: string | null; shortName: string }>
  >({
    my: { shortName: '', image: null },
    ph: { shortName: '', image: null },
    sg: { shortName: '', image: null },
  });

  const allTeamsSelected =
    selectedTeam[SelectableCountry.MY].image !== null &&
    selectedTeam[SelectableCountry.PH].image !== null &&
    selectedTeam[SelectableCountry.SG].image !== null;

  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;

  const { setStoreState, setOnboardingState } = useBoundStore();
  const { useOpenOnboardingPack, useGetInventory } = useRepositories();
  const { mutateAsync: openOnboardingPack } = useOpenOnboardingPack();
  const { data: inventory } = useGetInventory(userId);

  const [isBoosterPackOpened, setIsBoosterPackOpened] = useState(false);

  const handleTeamSelect = (country: SelectableCountry, teamImage: any, shortName: string) => {
    setSelectedTeam(prev => ({ ...prev, [country]: { image: teamImage, shortName } }));

    if (country === SelectableCountry.MY) {
      setSelectedCountry(SelectableCountry.PH);
    } else if (country === SelectableCountry.PH) {
      setSelectedCountry(SelectableCountry.SG);
    }
  };

  async function handleOpenClick() {
    const teams = Object.values(selectedTeam).map(el => el.shortName);
    if (teams.length < 0) return;
    if (isBoosterPackOpened) return;
    try {
      let response = await openOnboardingPack({ teams, inventoryId: inventory?.id as string });

      if (response?.success) {
        console.log('inside success');
        setStoreState({ showOpenImage: false, showVideo: true });
        setStoreState({ latestCardObtained: response.cards });
        setIsBoosterPackOpened(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(selectedTeam);

  useEffect(() => {
    const showLoading = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(showLoading);
    };
  }, []);

  if (isLoading)
    return (
      <ModalLayout opacity="0" modalState={isLoading}>
        <div className="flexcenter eion-bg h-screen">
          <img height={50} width={100} src={crystal} alt="" />
        </div>
      </ModalLayout>
    );

  useEffect(() => {
    setOnboardingState({ isFirstTime: true });
  }, []);

  return (
    <>
      <BeforePack />
      <div className="fixed inset-0 bg-black px-4">
        <div className="mb-6 mt-16 rounded-lg border-2 border-[#5097D9] bg-[#242424] px-4 py-2">
          <p className="roboto-condensed text-base">Pick one team pack from each region to form your ultimate squad</p>
        </div>
        <div className="">
          <div
            className="my-2 rounded-lg border-2 border-[#5097D9] px-6 py-2"
            style={{ background: 'linear-gradient(134deg, #072050 0%, #00274C 100%)' }}
          >
            <div className="my-4 grid grid-cols-3 gap-4">
              <div
                className={`deadjim black-wood ${selectedCountry === SelectableCountry.MY ? 'color-anim' : ''}`}
                onClick={() => setSelectedCountry(SelectableCountry.MY)}
              >
                {selectedTeam[SelectableCountry.MY] && selectedTeam[SelectableCountry.MY].image ? (
                  <img src={selectedTeam[SelectableCountry.MY].image} alt="MY" className="" />
                ) : (
                  <span className="px-2 py-[3.65rem]">MY</span>
                )}
              </div>
              <div
                className={`deadjim black-wood ${selectedCountry === SelectableCountry.PH ? 'color-anim' : ''}`}
                onClick={() => setSelectedCountry(SelectableCountry.PH)}
              >
                {selectedTeam[SelectableCountry.PH] && selectedTeam[SelectableCountry.PH].image ? (
                  <img src={selectedTeam[SelectableCountry.PH].image} alt="PH" className="" />
                ) : (
                  'PH'
                )}
              </div>
              <div
                className={`deadjim black-wood ${selectedCountry === SelectableCountry.SG ? 'color-anim' : ''}`}
                onClick={() => setSelectedCountry(SelectableCountry.SG)}
              >
                {selectedTeam[SelectableCountry.SG] && selectedTeam[SelectableCountry.SG].image ? (
                  <img src={selectedTeam[SelectableCountry.SG].image} alt="SG" className="" />
                ) : (
                  'SG'
                )}
              </div>
            </div>
            {/* <button className="metal flexcenter mt-4 w-full" onClick={handleOpenClick}>
            <div
              className={`${
                allTeamsSelected ? 'blue-gradient' : 'grey-blue disable'
              } flexcenter roboto-condensed w-full py-[0.3rem] text-[16px]`}
              // className="flexcenter roboto-condensed blue-gradient w-full py-[0.3rem] text-[16px]"
            >
              CONFIRM
            </div>
          </button> */}
            {allTeamsSelected ? (
              <button className="metal flexcenter mt-4 w-full" onClick={handleOpenClick}>
                <div className="flexcenter roboto-condensed blue-gradient w-full py-[0.3rem] text-[16px]">CONFIRM</div>
              </button>
            ) : (
              <button className="metal flexcenter mt-4 w-full" disabled>
                <div className="flexcenter roboto-condensed grey-blue w-full py-[0.3rem] text-[16px]">CONFIRM</div>
              </button>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {teampackByCountry.map(team => (
              <div key={team.id} className="w-[30%]">
                <div className="flex flex-row">
                  <button
                    key={team.name}
                    className="border border-[#5097D9]"
                    onClick={() => handleTeamSelect(team.country as SelectableCountry, team.image, team.shortName)}
                  >
                    <div className="">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute left-0 top-0 border-2 border-[#5097D9] bg-[#000000] px-3 py-1">
                          <p className="deadjim text-left text-xs">{team.name}</p>
                        </div>
                        <img src={team.image} className="" alt={team.name?.toUpperCase()} />
                        <div className="deadjim absolute bottom-0 right-0  z-10 border-2 border-[#5097D9] bg-[#000000] px-2 py-1 text-[14px]">
                          {team.price}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
