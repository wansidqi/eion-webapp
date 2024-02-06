import {
  CardsObtained,
  FilterPack,
  FilterStore,
  PackOverwiew,
  StoreWindow,
  Team,
  VideoStore,
} from '../components';
import { Navigation } from '../layout';
import '../css/store.css';
import diamond from '/assets/images/Store/diamond.png';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';

export function StorePage() {
  const data = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]);
  const { user } = data;
  const { useGetTotalLP, useGetInventory, useGetStripePublishableKey } = useRepositories();
  const { data: totalLP } = useGetTotalLP(user.id);
  useGetStripePublishableKey();

  // TODO: uncomment for production, only display onboarding dialog if inventory is empty
  const inventory = useGetInventory(user.id).data;
  // end TODO

  return (
    <>
      {/* <CardObtainedWindow /> */}
      <div className="home-bg">
        <Navigation />
        {/* TODO: uncomment for production, only display onboarding dialog if inventory is empty */}
        {/* display only if user inventory is empty */}
        {/* end TODO */}
        {inventory?.cards && inventory.cards.length <= 0 ? (
          <div className="flexcenter h-screen bg-[#0D0D0D]">
            <Team />
          </div>
        ) : (
          <>
            <StoreWindow />
            <div className="mr-0 mt-2 flex items-center justify-end">
              <p className="deadjim text-[16px] text-white">{totalLP?.loyaltyPoints ?? 0}</p>
              <img src={diamond} alt="Shards" className="ml-1" />
            </div>
            <div className="relative mx-4">
              <div className="my-4">
                <FilterStore />
              </div>
              <div className="my-5 flex items-center justify-between">
                <p className="deadjim text-[20px]">STORE</p>
              </div>
              <div className="my-4">
                <FilterPack />
              </div>
            </div>
            <PackOverwiew />
          </>
        )}
      </div>
      <CardsObtained />
      <VideoStore />
    </>
  );
}
