import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { useBoundStore } from '../../store';
import { useParams } from 'react-router-dom';
// import cardA from '/assets/images/Player/PH/Emann Up.png';

export function FeaturedCards() {
  const { userID } = useParams();
  const cardSize = 'w-[263px] h-[364px] flex-shrink-0';
  const { setProfileState } = useBoundStore();
  const { useGetFavCard, useGetOtherFavCard } = useRepositories();
  const user = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;

  const { data: favCard } = useGetFavCard(user.id);
  const { data: otherFavCard } = useGetOtherFavCard(userID || '');

  const openInventory = () => setProfileState({ showInventory: true });
  const previewCard = (card: any) => {
    setProfileState({ previewCard: true, selectCard: card });
  };

  return (
    <div className="">
      <div className="game-info mt-10">Featured Card</div>

      <div className="mb-12 mt-4 flex w-full gap-4 overflow-scroll">
        {Array.from({ length: 3 }, (_, i) => (
          <button
            disabled={Boolean(userID)}
            key={i}
            onClick={
              favCard && favCard.cards && favCard?.cards[i]
                ? //@ts-ignore
                  () => previewCard(favCard?.cards[i])
                : () => openInventory()
            }
            className={cardSize}
          >
            {userID && (
              <img
                src={otherFavCard && otherFavCard.cards && otherFavCard?.cards[i]?.card?.details?.image}
                className="h-full w-full"
                alt=""
              />
            )}
            {!userID && (
              <img
                src={favCard && favCard.cards && favCard?.cards[i]?.card?.details?.image}
                className="h-full w-full"
                alt=""
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
