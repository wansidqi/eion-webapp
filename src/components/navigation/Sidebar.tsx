import { useEffect, useRef } from 'react';
import { MatchStatus } from '../../types';
import { useBoundStore } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import EION from '/assets/images/eion-logo.png';
// import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';

export function Sidebar() {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { setLobbyState, modal, setModalState, menu, setMenuState } = useBoundStore();
  const { showSidebar } = modal;

  useEffect(() => {
    if (showSidebar.isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (sidebarRef.current && event.target === sidebarRef.current) {
        setModalState({ showSidebar: { isOpen: false } });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [showSidebar]);

  const closeSidebar = () => {
    setModalState({ showSidebar: { isOpen: false } });
  };

  const comingSoon = (
    <span className="ml-2 rounded-md border border-[#5097D9] px-2 py-[0.2rem] text-[14px] text-[#8CC8FF]">
      COMING SOON
    </span>
  );

  // TODO: move to redeem dialog file
  // const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  // const { useUseRedeemCode, useCheckRedeemCodeAvailability } = useRepositories();

  // const { mutateAsync: useRedeemCode } = useUseRedeemCode();
  // const { mutateAsync: checkRedeemCodeAvailability } = useCheckRedeemCodeAvailability();
  // end TODO

  const menuItems = [
    {
      category: <span>HOME</span>,
      callback: () => {
        navigate('/');
      },
      items: [],
    },
    {
      category: <span>LOCKER</span>,
      callback: () => {
        navigate('/lobby');
        setLobbyState({ matchStatus: MatchStatus.LIVE });
      },
      items: [
        {
          label: <span>Upcoming Match</span>,
          callback: () => {
            navigate('/lobby');
            setLobbyState({ matchStatus: MatchStatus.UPCOMING });
          },
        },
        {
          label: <span>Live Match</span>,
          callback: () => {
            navigate('/lobby');
            setLobbyState({ matchStatus: MatchStatus.LIVE });
          },
        },
        {
          label: <span>Past Match</span>,
          callback: () => {
            navigate('/lobby');
            setLobbyState({ matchStatus: MatchStatus.PAST });
          },
        },
      ],
    },
    {
      category: <span className="">INVOKE</span>,
      callback: () => {
        navigate('/invoke');
      },
      items: [],
    },
    // {
    //   category: <span className="">INVOKE {comingSoon}</span>,
    //   callback: () => {},
    //   category: <span className="">INVOKE {comingSoon}</span>,
    //   callback: () => {},
    //   items: [],
    // },
    {
      category: <span>STORE</span>,
      callback: () => {
        navigate('/store');
      },
      items: [
        {
          label: <span className="">Booster Packs</span>,
          callback: () => {
            navigate('/store');
          },
        },
        {
          label: <span className="">Redeem Code</span>,
          callback: () => {
            navigate('/redeem');
          },
        },
      ],
    },
    {
      category: <span>OTHERS</span>,
      callback: () => {},
      items: [
        {
          label: <span className="">Vault</span>,
          callback: () => {
            navigate('/vault');
          },
        },
        {
          label: <span className="text-[#848484]">Refinement {comingSoon}</span>,
          callback: () => {
            // navigate('/refinement');
          },
        },
        {
          label: <span className="">Leaderboard</span>,
          callback: () => {
            navigate('/leaderboard');
          },
        },
        // {
        //   label: <span className="text-[#848484]">Leaderboard {comingSoon}</span>,
        //   callback: () => {
        //     // navigate('/leaderboard');
        //   },
        // },
        {
          label: <span className="text-[#848484]">Marketplace {comingSoon}</span>,
          callback: () => {},
        },
        {
          label: <span className="">Refer A Friend</span>,
          callback: () => {
            navigate('/referral');
          },
        },
        {
          label: <span className="">Support</span>,
          callback: () => {
            navigate('/support');
          },
        },
      ],
    },
    {
      category: <span>EXTERNAL</span>,
      callback: () => {},
      items: [
        {
          label: (
            <Link to={'https://eion.gg/'} target="_blank">
              <span>
                Visit <span className="threat ml-4">EION.GG</span>
              </span>
            </Link>
          ),
          callback: () => {},
        },
        {
          label: (
            <Link to={'https://discord.gg/W2UfXf7NsU'} target="_blank">
              <span>
                Join our <span className="threat ml-4">Eion Discord</span>
              </span>
            </Link>
          ),
          callback: () => {},
        },
        {
          label: (
            <Link to={'https://www.facebook.com/play.eion'} target="_blank">
              <span>
                Like our <span className="threat ml-4">Facebook</span>
              </span>
            </Link>
          ),
          callback: () => {},
        },
        {
          label: (
            <Link to={'https://instagram.com/play.eion'} target="_blank">
              <span>
                Follow our <span className="threat ml-4">Instagram</span>
              </span>
            </Link>
          ),
          callback: () => {},
        },
        {
          label: (
            <Link to={'https://twitter.com/playeion'} target="_blank">
              <span>
                Follow our <span className="threat ml-4">Twitter</span>
              </span>
            </Link>
          ),
          callback: () => {},
        },
      ],
    },
  ];

  const onClickSidebarMenu = (label: string, callback: () => void) => {
    setMenuState({ sidebarMenu: label });
    setModalState({ showSidebar: { isOpen: false } });
    if (callback) callback();
  };

  const renderMenu = (menuItems: any) => (
    <>
      {menuItems.map((menuItem: any, index: number) => (
        <div key={index}>
          <button
            onClick={() => {
              menuItem.callback();
              closeSidebar();
            }}
            className={`mx-4 ${menuItem.items.length > 0 ? 'text-[#0185FF]' : 'text-[#0185FF]'}`}
          >
            {menuItem.category}
          </button>
          <div className="my-2">
            {menuItem.items.map((item: any, i: number) => (
              <button
                onClick={() => onClickSidebarMenu(item.label, item.callback)}
                key={i}
                className={`roboto-condensed flex px-4 py-1 ${
                  menu.sidebarMenu === item.label ? 'w-full bg-gradient-to-r from-[#00519B]/70 to-[#5097D9]/0' : ''
                }`}
              >
                <p>{item.label}</p>
              </button>
            ))}
          </div>
          {index !== menuItems.length - 1 && <div className="m-5 border" />}
        </div>
      ))}
    </>
  );

  return (
    <>
      {showSidebar.isOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-80" />}
      <div
        ref={sidebarRef}
        className={`roboto scrollbar-hidden fixed inset-0 z-50 overflow-auto bg-opacity-70 ${
          showSidebar.isOpen
            ? 'translate-x-0 transform transition-transform duration-300 ease-in-out'
            : '-translate-x-full transform transition-transform duration-300 ease-in-out'
        }`}
      >
        <div className="z-50 min-h-screen w-3/4 overflow-auto border-x border-[#FFFFFF] bg-gradient-to-b from-[#0D0D0D] via-[#072138] to-[#00498C] text-[16px]">
          <div className="py-4">
            {/* <h1 className="threat mx-4 mb-6 text-[20px]">EION</h1> */}
            <img className="mx-4 mb-4" width={'80px'} src={EION} alt="" />
            {renderMenu(menuItems)}
          </div>
        </div>
      </div>
    </>
  );
}
