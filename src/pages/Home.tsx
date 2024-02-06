import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';
import { Navigation } from '../layout';
import { CardObtainedWindow, HomeInfo, HomeRedirector, MainPageOB, SetUsername } from '../components';
import '../css/home.css';
import { useEffect } from 'react';
import { useBoundStore } from '../store';
import diamond from '/assets/images/Store/diamond.png';
// import { Welcome } from './WelcomePage';
import ReactGA from 'react-ga';

export const Home = () => {
  ReactGA.pageview('/home');
  const { setModalState, modal, resetAllSlices, setAlertState } = useBoundStore();
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;
  const { useGetTotalLP } = useRepositories();
  const { data: totalLP } = useGetTotalLP(user.id);
  const { useGetInventory } = useRepositories();
  const inventories = useGetInventory(user.id).data;
  const totalCards = inventories?.cards?.length;
  const { setOnboardingState } = useBoundStore();

  useEffect(() => {
    if (totalCards === 0) {
      setOnboardingState({ welcomeMessage: true });
    }
  }, [totalCards]);

  useEffect(() => {
    resetAllSlices();
    setAlertState({ message: null, type: null });
    if (!user.username) setModalState({ setUsername: { isOpen: true } });
  }, []);

  return (
    <>
     <CardObtainedWindow />
      {modal.setUsername.isOpen && <SetUsername />}

      {!modal.setUsername.isOpen && (
        <>
          <div className="home-bg">
            <MainPageOB />

            <>
              <Navigation />
              <div className="roboto-condensed relative m-6">
                <div className="flex justify-between">
                  <b className="deadjim text-[20px]">{user?.username?.toUpperCase()}</b>
                  <div className="flexcenter gap-5">
                    <div className="flexcenter">
                      <p>{totalLP?.loyaltyPoints ?? 0}</p>
                      <img src={diamond} alt="" />
                    </div>
                  </div>
                </div>
                <HomeInfo />
                <HomeRedirector />
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};
