import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';

const getResult = async (gameId: string) => {
  const response = await datasource({ method: 'get', url: `/result/game/${gameId}` });
  return response.data;
};

const useGetResult = (gameId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.RESULT, gameId],
    queryFn: async () => getResult(gameId),
    retry: false,
  });
};

const getTotalLP = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/users/loyalty-point/balance/${userId}` });
  return response.data;
};

const useGetTotalLP = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.LP],
    queryFn: () => getTotalLP(userId),
    retry: false,
  });
};

export const ResultRepository = { useGetResult, useGetTotalLP };
