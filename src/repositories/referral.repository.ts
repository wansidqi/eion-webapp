import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { ReferralInterface } from '../interface';

const getReferral = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/referral/user/${userId}` });
  return response.data as ReferralInterface;
};

const useGetReferral = (userId: string) => {
  return useQuery({
    queryFn: async () => getReferral(userId),
    retry: false,
  });
};

export const ReferralRepository = { useGetReferral };
