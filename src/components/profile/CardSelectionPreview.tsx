import { useRef, useEffect } from 'react';
import { useBoundStore } from '../../store';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../../repositories';
import { FavCardData, FavCards, UserCardInterface } from '../../interface';

export function CardSelectionPreview(): JSX.Element {
  const { profile, setProfileState } = useBoundStore();
  const { previewCard, selectCard } = profile;
  const modalRef = useRef<HTMLDivElement>(null);

  const user = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user;
  const favCard = useGetQueryData<FavCardData>([RQ_KEY.FAV_CARD])?.cards;
  const { useSetFavCard } = useRepositories();
  const { mutateAsync: setFavCard } = useSetFavCard();

  const checkFavCards = favCard?.includes(selectCard as UserCardInterface);

  const addData: FavCards = {
    userCardId: selectCard?.id,
    favourite: true,
  };

  const removeData: FavCards = {
    userCardId: selectCard?.id,
    favourite: false,
  };

  const addToFav = async () => {
    try {
      await setFavCard({ userId: user.id, data: addData });
      setProfileState({ showInventory: false, previewCard: false, selectCard: null });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const RemoveFromFav = async () => {
    try {
      await setFavCard({ userId: user.id, data: removeData });
      setProfileState({ showInventory: false, previewCard: false, selectCard: null });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (previewCard) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    const handleClick = (event: any) => {
      if (modalRef.current && event.target === modalRef.current) {
        setProfileState({ previewCard: false, selectCard: null });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [previewCard]);

  return (
    <div>
      {previewCard && (
        <>
          <div ref={modalRef} className="fixed inset-0 z-50 bg-[#000000] bg-opacity-90">
            <div className="w-full bg-opacity-90 text-[16px]">
              <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">
                <div className="flexcenter h-[500px] w-[350px]">
                  <img
                    src={(selectCard?.card?.details?.image && selectCard?.card?.details.image) ?? ''}
                    className="h-full w-full"
                    alt=""
                  />
                </div>
                {checkFavCards ? (
                  <button onClick={RemoveFromFav} className="flexcenter mt-10 w-[335px] rounded-sm bg-red-600 py-3">
                    Remove from Favourite
                  </button>
                ) : (
                  <button onClick={addToFav} className="fav-btn flexcenter mt-10 w-[335px] rounded-sm py-3">
                    Set as Favourite
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
