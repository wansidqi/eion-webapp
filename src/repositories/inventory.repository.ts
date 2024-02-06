import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { CardGeneral, FavCardData, FavCards, InventoryInterface, UserCardInterface } from '../interface';

const getInventory = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/inventory/user/${userId}` });
  return response.data as InventoryInterface;
};

const addUserCard = async (userId: string, data: CardGeneral) => {
  const response = await datasource({ method: 'post', url: `/inventory/user/${userId}/card/add`, data });
  return response.data;
};

const addUserCards = async (userId: string, data: CardGeneral[]) => {
  const response = await datasource({ method: 'post', url: `/inventory/user/${userId}/card/add/bulk`, data });
  return response.data;
};

const useGetInventory = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.INVENTORY],
    queryFn: async () => getInventory(userId),
    retry: false,
  });
};

const useGetOtherInventory = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.OTHER_INVENTORY],
    queryFn: async () => getInventory(userId),
    retry: false,
  });
};

const usePostUserCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: CardGeneral }) => addUserCard(userId, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVENTORY]);
    },
  });
};

const usePostUserCards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: CardGeneral[] }) => addUserCards(userId, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVENTORY]);
    },
  });
};

const getFavCard = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/inventory/user/${userId}/card/favourite` });
  return response.data as FavCardData;
};

const setFavCard = async (userId: string, data: FavCards) => {
  const response = await datasource({ method: 'patch', url: `/inventory/user/${userId}/card/favourite`, data });
  return response.data as FavCardData;
};

const useGetFavCard = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.FAV_CARD],
    queryFn: async () => getFavCard(userId),
    retry: false,
  });
};

const useGetOtherFavCard = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.OTHER_FAV_CARD],
    queryFn: async () => getFavCard(userId),
    retry: false,
  });
};

const useSetFavCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: FavCards }) => setFavCard(userId, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.FAV_CARD]);
    },
  });
};

export async function updateSingleUseUserCard(userId: string, data: Omit<UserCardInterface, 'card' | 'skins'>[]) {
  const response = await datasource({
    method: 'patch',
    url: `/inventory/user/${userId}/single-use-only`,
    data: { cards: data },
  });
  return response.data;
}

function useUpdateSingleUseUserCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Omit<UserCardInterface, 'card' | 'skins'>[] }) =>
      updateSingleUseUserCard(userId, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVENTORY]);
    },
  });
}

type RefineCardArgs = {
  cardId: string;
  userId: string;
  targetCardId: string;
  cardToConsumeIds: string[];
};

export async function refineCard({ userId, targetCardId, cardId, cardToConsumeIds }: RefineCardArgs) {
  const response = await datasource({
    method: 'post',
    url: `/inventory/user/${userId}/card/${targetCardId}/refine`,
    data: { cardId, sourceIds: cardToConsumeIds },
  });
  return response.data;
}

function useRefineCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RefineCardArgs) => refineCard(data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVENTORY]);
    },
  });
}

export const InventoryRepository = {
  useGetInventory,
  usePostUserCard,
  usePostUserCards,
  useGetFavCard,
  useSetFavCard,
  useUpdateSingleUseUserCard,
  useGetOtherInventory,
  useRefineCard,
  useGetOtherFavCard,
};
