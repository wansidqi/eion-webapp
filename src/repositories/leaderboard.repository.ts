import { useMutation, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { LeaderboardData, LeaderboardInterface } from '../interface';

const getLeaderboard = async (data: LeaderboardData) => {
  const response = await datasource({ method: 'post', url: 'result/leaderboard', data });
  return response.data as LeaderboardInterface[];
};

const getGlobalRank = async (userId: string) => {
  const response = await datasource({ method: 'post', url: `result/leaderboard/${userId}` });
  type GlobalRankType = {
    success: boolean;
    leaderboard: LeaderboardInterface;
  };
  return response.data as GlobalRankType;
};

const useGetGlobalRank = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RQ_KEY.GLOBAL_RANK],
    mutationFn: async (userId: string) => getGlobalRank(userId),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.GLOBAL_RANK]);
    },
  });
};

const useGetLeaderboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RQ_KEY.LEADERBOARD],
    mutationFn: async (data: LeaderboardData) => getLeaderboard(data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.LEADERBOARD]);
    },
  });
};

export const LeaderboardRepository = { useGetLeaderboard, useGetGlobalRank };
