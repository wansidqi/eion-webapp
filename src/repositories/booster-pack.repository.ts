import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { BoosterPackCard, BoosterPackInterface } from '../interface';

async function getAllBoosterPack() {
  const response = await datasource({
    method: 'get',
    url: `/booster-pack`,
  });
  return response.data as BoosterPackInterface[];
}

function useGetAllBoosterPack() {
  return useQuery({
    queryKey: [RQ_KEY.BOOSTER_PACK],
    queryFn: async () => getAllBoosterPack(),
    retry: false,
  });
}

async function getBoosterPackByID(id: number) {
  const response = await datasource({
    method: 'get',
    url: `/booster-pack/${id}`,
  });
  return response.data as BoosterPackInterface;
}

function useGetBoosterPackById(boosterPackId: number) {
  return useQuery({
    queryKey: [RQ_KEY.BOOSTER_PACK, boosterPackId],
    queryFn: async () => getBoosterPackByID(boosterPackId),
    retry: false,
    enabled: boosterPackId > 0,
  });
}

type OpenBoosterPackArgs = {
  userId: string;
  inventoryId: string;
  boosterPackId: number;
  numberOfPack: number;
  totalAmount: number;
};

async function openBoosterPack({ boosterPackId, numberOfPack, inventoryId, userId, totalAmount }: OpenBoosterPackArgs) {
  const response = await datasource({
    method: 'post',
    url: `/booster-pack/open/${boosterPackId}`,
    data: {
      userId,
      inventoryId,
      numberOfPack,
      totalAmount,
    },
  });
  return response.data as { success: boolean; cards: BoosterPackCard[] };
}

function useOpenBoosterPack() {
  return useMutation({
    mutationFn: async (data: OpenBoosterPackArgs) => openBoosterPack(data),
  });
}

type OpenOnboardingPackArgs = { teams: string[]; inventoryId: string };

async function openOnboardingPack({ teams, inventoryId }: OpenOnboardingPackArgs) {
  const response = await datasource({
    method: 'post',
    url: `/booster-pack/onboarding/${inventoryId}`,
    data: {
      teams,
    },
  });

  return response.data as { success: boolean; cards: BoosterPackCard[] };
}

function useOpenOnboardingPack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: OpenOnboardingPackArgs) => openOnboardingPack(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([RQ_KEY.INVENTORY]);
    },
  });
}
export const BoosterPackRepository = {
  useGetAllBoosterPack,
  useGetBoosterPackById,
  useOpenBoosterPack,
  useOpenOnboardingPack,
};
