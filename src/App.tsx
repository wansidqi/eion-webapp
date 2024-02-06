import './css/index.css';
import './css/color.css';
import './css/font.css';
import './css/animation.css';
import './css/debug.css';
import './css/bg.css';
import './css/button.css';
import './css/user.css';
import './css/title.css';
import './css/shape.css';
import './css/registration.css';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';

import {
  LobbyPage,
  ProfilePage,
  Setting,
  StorePage,
  PlaymatPage,
  LeaderboardPage,
  VaultPage,
  GamePage,
  Home,
  LoginPage,
  Register,
  ResetPassword,
  SuccessVerification,
  SuccessGoogle,
  RedeemCode,
  Welcome,
  ReferralPage,
  ForgePage,
  InvokePage,
  // SuccessRegister,
} from './pages/';

import {
  BoosterPackOpen,
  PaymentGateway,
  PurchaseConfirmation,
  ReceivedCard,
  ErrorMessage,
  SuccessMessage,
  ResultDraft,
  ShareDraft,
  HomeOB,
  ShareInvoke,
  PreviewShareInvoke,
} from './components';

import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from './repositories';
import { useBoundStore } from './store';
import FAQ from './pages/faq';
// import { Shop } from './pages/ShopPage';

function App() {
  const { useGetAuth } = useRepositories();
  const { isLoading } = useGetAuth();
  const { alert } = useBoundStore();

  ReactGA.initialize('UA-290973702-1');

  if (isLoading) return <>{/* <p>Loading...</p> */}</>;

  return (
    <>
      <div className="absolute inset-x-0 top-10 z-[100] flex justify-center">
        {alert.message && (
          <>
            {alert.type === 'error' && <ErrorMessage message={alert.message} />}
            {alert.type === 'success' && <SuccessMessage message={alert.message} />}
          </>
        )}
      </div>

      <Routes>
        <Route path="/img/:draftID" element={<ShareDraft />} />
        <Route path="/share/invoke/:id" element={<ShareInvoke />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route element={<RequireNotAuth />}>
          <Route path="/register/affiliate/:affiliateID" element={<Register />} />
          <Route path="/register/referral/:referralID" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/success-verification" element={<SuccessVerification />} />
          <Route path="/google-auth-success" element={<SuccessGoogle />} />
        </Route>

        <Route element={<RequireAuth />}>
          {/* <Route path="*" element={<SuccessRegister />} /> */}
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/setting" element={<Setting />} />
          {/* <Route path="/refinement" element={<ForgePage />} /> */}
          <Route path="/47021a3c" element={<ForgePage />} />
          <Route path="/invoke" element={<InvokePage />} />
          <Route path="/invoke/share/:id" element={<PreviewShareInvoke />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userID" element={<ProfilePage />} />
          <Route path="/match/:matchID" element={<GamePage />} />
          <Route path="/game/:userID/:matchID" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/draft/:matchID/:gameID" element={<PlaymatPage />} />
          <Route path="/purchase" element={<PurchaseConfirmation />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/boosterPack" element={<BoosterPackOpen />} />
          <Route path="/received" element={<ReceivedCard />} />
          <Route path="/received" element={<ReceivedCard />} />
          <Route path="/result/:matchID/:gameID" element={<ResultDraft />} />
          <Route path="/support" element={<FAQ />} />
          {/* ON BOARD */}
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/homeOB" element={<HomeOB />} />
        </Route>
      </Routes>
    </>
  );
}

function RequireNotAuth() {
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  if (data?.user?.isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
}

function RequireAuth() {
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  // DEV: comment out line below to access guarded route without auth
  if (!data?.user?.isAuthenticated) return <Navigate to="/sign-in" />;
  return <Outlet />;
}

export default App;
