import hamburger from '/assets/images/Sidebar/hamburger.svg';
import profile from '/assets/images/Sidebar/profile.svg';
import { Profilebar, Sidebar } from '../components/';
import { useBoundStore } from '../store';
import EION from '/assets/images/eion-logo.png';
import { useNavigate } from 'react-router-dom';

export function Navigation() {
  const { setModalState, setMenuState } = useBoundStore();
  const navigate = useNavigate();
  return (
    <>
      <div className="title-layout flex justify-between gap-x-4 bg-opacity-80">
        <div className="flex gap-x-4 py-2">
          <button onClick={() => setModalState({ showSidebar: { isOpen: true } })}>
            <img src={hamburger} alt="" />
          </button>
          <img onClick={() => navigate('/')} className="cursor-pointer absolute left-12 top-3" width={'70px'} src={EION} alt="" />
        </div>
        <button onClick={() => setMenuState({ profileMenu: { isOpen: true } })}>
          <img src={profile} alt="" />
        </button>
        <Sidebar />
        <Profilebar />
      </div>
    </>
  );
}
